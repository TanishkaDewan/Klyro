const axios = require('axios');
const { supabaseAdmin } = require('../config/supabase');
const { calculateRatingChange } = require('./rating.service');

// Configurable Scoring Weights (Must total 100)
const SCORING_WEIGHTS = {
  requirement_completion: 0.25,
  technical_quality: 0.20,
  feasibility: 0.20,
  innovation: 0.15,
  code_quality: 0.10,
  documentation: 0.10
};

/**
 * Orchestrates the evaluation of a submission
 */
const runEvaluation = async (submissionId) => {
  try {
    // 1. Fetch submission, battle, and challenge details
    const { data: submission, error: subErr } = await supabaseAdmin
      .from('submissions')
      .select('*, battles(challenge_id, challenges(title, requirements, constraints))')
      .eq('id', submissionId)
      .single();

    if (subErr || !submission) throw new Error('Submission not found');

    // 2. Fetch Team Members
    const { data: members, error: memErr } = await supabaseAdmin
      .from('team_members')
      .select('profile_id, profiles(github_username)')
      .eq('team_id', submission.team_id);

    if (memErr || !members.length) throw new Error('Team members not found');

    // 3. Call Member 3's FastAPI AI Service
    const aiServiceUrl = process.env.AI_SERVICE_URL;
    if (!aiServiceUrl) throw new Error('AI_SERVICE_URL is not configured');

    const aiPayload = {
      team_id: submission.team_id,
      repo_url: submission.github_url,
      challenge_id: submission.battles.challenge_id,
      challenge_details: submission.battles.challenges,
      team_members: members.map(m => m.profiles.github_username)
    };

    console.log(`[Evaluation] Sending to AI Service: ${submission.github_url}`);
    
    const response = await axios.post(`${aiServiceUrl}/api/evaluate`, aiPayload);
    const aiResult = response.data;

    // 4. Calculate Final Weighted Score
    const finalScore = (
      (aiResult.scores.requirement_completion * SCORING_WEIGHTS.requirement_completion) +
      (aiResult.scores.technical_quality * SCORING_WEIGHTS.technical_quality) +
      (aiResult.scores.feasibility * SCORING_WEIGHTS.feasibility) +
      (aiResult.scores.innovation * SCORING_WEIGHTS.innovation) +
      (aiResult.scores.code_quality * SCORING_WEIGHTS.code_quality) +
      (aiResult.scores.documentation * SCORING_WEIGHTS.documentation)
    );

    // 5. Calculate Team XP (Simple Base logic)
    const teamXpAwarded = finalScore >= 80 ? 200 : finalScore >= 50 ? 100 : 50;

    // 6. Save Evaluation & Distribute XP
    await supabaseAdmin
      .from('submissions')
      .update({ status: 'EVALUATED', team_xp_awarded: teamXpAwarded })
      .eq('id', submissionId);

    // Add XP to Team's Total
    const { data: teamData } = await supabaseAdmin.from('teams').select('total_xp').eq('id', submission.team_id).single();
    await supabaseAdmin
      .from('teams')
      .update({ total_xp: (teamData.total_xp || 0) + teamXpAwarded })
      .eq('id', submission.team_id);

    // 7. Distribute Individual XP and Update Ratings
    const { ratingChange, battleResult } = calculateRatingChange(finalScore);

    for (const member of members) {
      const contributionData = aiResult.contributions.find(c => c.username === member.profiles.github_username);
      const percentage = contributionData ? contributionData.percentage : Math.floor(100 / members.length);
      
      const individualXp = Math.floor(teamXpAwarded * (percentage / 100));

      // Log Contribution
      await supabaseAdmin.from('submission_contributions').insert([{
        submission_id: submissionId,
        profile_id: member.profile_id,
        contribution_percentage: percentage,
        individual_xp_awarded: individualXp
      }]);

      // Fetch current profile stats
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('total_xp, rating, wins, losses')
        .eq('id', member.profile_id)
        .single();

      // Calculate new stats
      const newXp = (profileData.total_xp || 0) + individualXp;
      const newRating = Math.max(0, (profileData.rating || 1000) + ratingChange);
      const newWins = battleResult === 'WIN' ? (profileData.wins || 0) + 1 : (profileData.wins || 0);
      const newLosses = battleResult === 'LOSS' ? (profileData.losses || 0) + 1 : (profileData.losses || 0);

      // Update Profile
      await supabaseAdmin
        .from('profiles')
        .update({ 
          total_xp: newXp,
          rating: newRating,
          wins: newWins,
          losses: newLosses
        })
        .eq('id', member.profile_id);
    }

    return { success: true, finalScore, teamXpAwarded };

  } catch (err) {
    console.error('[Evaluation Orchestration Error]:', err.message);
    throw err;
  }
};

module.exports = { runEvaluation };