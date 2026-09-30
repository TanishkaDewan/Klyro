const { supabaseAdmin } = require('../config/supabase');

/**
 * GET /api/teams/current
 * Fetch the user's current team (whether PROPOSED or CONFIRMED) and see teammate statuses
 */
const getCurrentTeam = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Find which team the user belongs to right now
    const { data: myMembership, error: membershipError } = await supabaseAdmin
      .from('team_members')
      .select('team_id, consent_status, teams(*)')
      .eq('profile_id', userId)
      .in('teams.status', ['PROPOSED', 'CONFIRMED'])
      .single();

    if (membershipError && membershipError.code !== 'PGRST116') throw membershipError;

    if (!myMembership) {
      return res.status(200).json({ hasTeam: false, message: 'You are not currently in an active team.' });
    }

    const teamId = myMembership.team_id;

    // 2. Fetch all members of this team so the frontend can display them
    const { data: allMembers, error: membersError } = await supabaseAdmin
      .from('team_members')
      .select('profile_id, role_in_team, consent_status, profiles(username, avatar_url, experience_level)')
      .eq('team_id', teamId);

    if (membersError) throw membersError;

    return res.status(200).json({
      hasTeam: true,
      team: myMembership.teams,
      myStatus: myMembership.consent_status,
      members: allMembers
    });
  } catch (err) {
    console.error('[GetCurrentTeam Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to fetch team.' });
  }
};

/**
 * POST /api/teams/:id/accept
 * Player accepts the proposed team
 */
const acceptTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;

    // 1. Update this user's consent to ACCEPTED
    await supabaseAdmin
      .from('team_members')
      .update({ consent_status: 'ACCEPTED', responded_at: new Date().toISOString() })
      .eq('team_id', teamId)
      .eq('profile_id', userId);

    // 2. Check if EVERYONE in the team has now accepted
    const { data: members } = await supabaseAdmin
      .from('team_members')
      .select('consent_status')
      .eq('team_id', teamId);

    const allAccepted = members.every(m => m.consent_status === 'ACCEPTED');

    // 3. If everyone accepted, lock the team in as CONFIRMED
    if (allAccepted) {
      await supabaseAdmin
        .from('teams')
        .update({ status: 'CONFIRMED' })
        .eq('id', teamId);
      
      return res.status(200).json({ message: 'You accepted! Team is now CONFIRMED.', teamStatus: 'CONFIRMED' });
    }

    return res.status(200).json({ message: 'You accepted. Waiting for teammates...', teamStatus: 'PROPOSED' });
  } catch (err) {
    console.error('[AcceptTeam Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to accept team.' });
  }
};

/**
 * POST /api/teams/:id/reject
 * Player rejects the team. The team is destroyed, and other players go back to the queue.
 */
const rejectTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;

    // 1. Mark team as REJECTED
    await supabaseAdmin
      .from('teams')
      .update({ status: 'REJECTED' })
      .eq('id', teamId);

    await supabaseAdmin
      .from('team_members')
      .update({ consent_status: 'REJECTED', responded_at: new Date().toISOString() })
      .eq('team_id', teamId)
      .eq('profile_id', userId);

    // 2. Find the OTHER innocent teammates
    const { data: otherMembers } = await supabaseAdmin
      .from('team_members')
      .select('profile_id, role_in_team')
      .eq('team_id', teamId)
      .neq('profile_id', userId); // Not the guy who rejected

    // 3. Put the other teammates back into the matchmaking queue automatically
    if (otherMembers && otherMembers.length > 0) {
      const queuePayload = otherMembers.map(m => ({
        profile_id: m.profile_id,
        skill_category: m.role_in_team,
        entered_at: new Date().toISOString()
      }));
      
      await supabaseAdmin.from('matchmaking_queue').upsert(queuePayload, { onConflict: 'profile_id' });
    }

    return res.status(200).json({ message: 'You rejected the team. You are no longer in a team.' });
  } catch (err) {
    console.error('[RejectTeam Error]:', err.message);
    return res.status(500).json({ error: 'InternalServerError', message: 'Failed to reject team.' });
  }
};

module.exports = {
  getCurrentTeam,
  acceptTeam,
  rejectTeam
};