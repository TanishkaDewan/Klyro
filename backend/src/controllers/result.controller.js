const { supabaseAdmin } = require('../config/supabase');

/**
 * GET /api/results/teams/:teamId
 * Fetches the battle results, AI evaluation status, and XP for a specific team.
 */
const getTeamResults = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ error: 'BadRequest', message: 'teamId is required.' });
    }

    // Fetch the team's submissions along with the battle details and contributions
    const { data: results, error } = await supabaseAdmin
      .from('submissions')
      .select(`
        id, 
        github_url, 
        status, 
        team_xp_awarded,
        submitted_at,
        battles (
          id,
          challenges ( title, difficulty )
        ),
        submission_contributions (
          profile_id,
          contribution_percentage,
          individual_xp_awarded,
          profiles ( github_username )
        )
      `)
      .eq('team_id', teamId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      message: 'Team results fetched successfully',
      results
    });

  } catch (err) {
    console.error('[GetTeamResults Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to fetch team results.' });
  }
};

module.exports = {
  getTeamResults
};