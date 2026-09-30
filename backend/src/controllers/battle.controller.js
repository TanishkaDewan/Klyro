const { supabaseAdmin } = require('../config/supabase');

/**
 * POST /api/battles/start
 * A confirmed team starts a challenge. This creates a battle record and starts the countdown.
 */
const startBattle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { challenge_id } = req.body;

    if (!challenge_id) {
      return res.status(400).json({ error: 'BadRequest', message: 'challenge_id is required to start a battle.' });
    }

    // 1. Verify the user is currently in a CONFIRMED team
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('team_members')
      .select('team_id, teams(status)')
      .eq('profile_id', userId)
      .single();

    if (membershipError || !membership || membership.teams?.status !== 'CONFIRMED') {
      return res.status(403).json({ error: 'Forbidden', message: 'You must be in a CONFIRMED team to start a battle.' });
    }

    const teamId = membership.team_id;

    // 2. Fetch the challenge details to get the time limit
    const { data: challenge, error: challengeError } = await supabaseAdmin
      .from('challenges')
      .select('time_limit_minutes')
      .eq('id', challenge_id)
      .single();

    if (challengeError || !challenge) {
      return res.status(404).json({ error: 'NotFound', message: 'Challenge not found.' });
    }

    // 3. Calculate the exact deadline (start time + time_limit_minutes)
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + challenge.time_limit_minutes * 60000);

    // 4. Create the active Battle record
    const { data: battle, error: battleError } = await supabaseAdmin
      .from('battles')
      .insert([{
        team_id: teamId,
        challenge_id: challenge_id,
        status: 'IN_PROGRESS',
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      }])
      .select()
      .single();

    if (battleError) throw battleError;

    return res.status(200).json({ 
      message: 'Battle started successfully! The clock is ticking.', 
      battle 
    });

  } catch (err) {
    console.error('[StartBattle Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to start battle.' });
  }
};

module.exports = {
  startBattle
};