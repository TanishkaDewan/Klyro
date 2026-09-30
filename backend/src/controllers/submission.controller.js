const { supabaseAdmin } = require('../config/supabase');

/**
 * POST /api/submissions
 * Submit a completed challenge with the GitHub link
 */
const submitChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { battle_id, github_url, live_url } = req.body;

    if (!battle_id || !github_url) {
      return res.status(400).json({ error: 'BadRequest', message: 'battle_id and github_url are required.' });
    }

    // 1. Ensure the user is currently in a team
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('team_members')
      .select('team_id')
      .eq('profile_id', userId)
      .single();

    if (membershipError || !membership) {
      return res.status(403).json({ error: 'Forbidden', message: 'You must be in a team to submit.' });
    }

    // 2. Create the submission record in the database
    const { data: submission, error: submissionError } = await supabaseAdmin
      .from('submissions')
      .insert([{
        battle_id,
        team_id: membership.team_id,
        github_url,
        live_url,
        submitted_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (submissionError) throw submissionError;

    // 3. Mark the battle as SUBMITTED so the clock stops
    await supabaseAdmin
      .from('battles')
      .update({ status: 'SUBMITTED' })
      .eq('id', battle_id);

    return res.status(200).json({ 
      message: 'Challenge submitted successfully! Great work.', 
      submission 
    });

  } catch (err) {
    console.error('[SubmitChallenge Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to submit challenge.' });
  }
};

module.exports = {
  submitChallenge
};