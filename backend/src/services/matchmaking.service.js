const { supabaseAdmin } = require('../config/supabase');

/**
 * Core algorithm to form teams from the matchmaking queue.
 * For MVP: Groups 2 players together, prioritizing different skill categories.
 */
const runMatchmaking = async () => {
  try {
    console.log('[Matchmaking Engine] Scanning queue...');

    // 1. Fetch everyone in the queue, ordered by who waited longest
    const { data: queue, error: queueError } = await supabaseAdmin
      .from('matchmaking_queue')
      .select('*')
      .order('entered_at', { ascending: true });

    if (queueError) throw queueError;

    if (!queue || queue.length < 2) {
      console.log('[Matchmaking Engine] Not enough players to form a team yet.');
      return { success: false, message: 'Not enough players in queue.' };
    }

    // 2. Select Player 1 (the one waiting the longest)
    let player1 = queue[0];
    
    // Select Player 2 (try to find someone with a DIFFERENT skill, otherwise take the next person)
    let player2 = queue.find(p => p.profile_id !== player1.profile_id && p.skill_category !== player1.skill_category);
    if (!player2) {
      player2 = queue[1]; // Fallback to whoever is next in line
    }

    // 3. Create a PROPOSED Team
    const teamName = `Team-${Math.floor(Math.random() * 9000) + 1000}`; // e.g., Team-4592
    
    const { data: team, error: teamError } = await supabaseAdmin
      .from('teams')
      .insert([{ name: teamName, status: 'PROPOSED' }])
      .select()
      .single();

    if (teamError) throw teamError;

    // 4. Add both players to the team with status 'PENDING' (waiting for them to click Accept)
    const teamMembers = [
      { team_id: team.id, profile_id: player1.profile_id, role_in_team: player1.skill_category, consent_status: 'PENDING' },
      { team_id: team.id, profile_id: player2.profile_id, role_in_team: player2.skill_category, consent_status: 'PENDING' }
    ];

    const { error: membersError } = await supabaseAdmin
      .from('team_members')
      .insert(teamMembers);

    if (membersError) throw membersError;

    // 5. Remove both players from the matchmaking queue
    const { error: deleteError } = await supabaseAdmin
      .from('matchmaking_queue')
      .delete()
      .in('profile_id', [player1.profile_id, player2.profile_id]);

    if (deleteError) throw deleteError;

    console.log(`[Matchmaking Engine] Successfully proposed ${teamName} for 2 players.`);
    return { success: true, team, message: `Proposed ${teamName}` };

  } catch (err) {
    console.error('[Matchmaking Engine Error]:', err.message);
    throw err;
  }
};

module.exports = { runMatchmaking };