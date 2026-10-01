const { supabaseAdmin } = require('../config/supabase');

/**
 * GET /api/leaderboard/teams
 * Fetches the global team leaderboard
 */
const getTeamLeaderboard = async (req, res) => {
  try {
    const { data: teams, error } = await supabaseAdmin
      .from('teams')
      .select('id, name, total_xp')
      .order('total_xp', { ascending: false })
      .limit(100);

    if (error) throw error;

    return res.status(200).json(teams);
  } catch (err) {
    console.error('[Team Leaderboard Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to fetch team leaderboard.' });
  }
};

/**
 * GET /api/leaderboard/players
 * Fetches the global individual player leaderboard
 */
const getPlayerLeaderboard = async (req, res) => {
  try {
    const { data: players, error } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, github_username, total_xp')
      .order('total_xp', { ascending: false })
      .limit(100);

    if (error) throw error;

    return res.status(200).json(players);
  } catch (err) {
    console.error('[Player Leaderboard Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to fetch player leaderboard.' });
  }
};

module.exports = {
  getTeamLeaderboard,
  getPlayerLeaderboard
};