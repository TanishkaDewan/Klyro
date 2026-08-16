import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  User, 
  Users 
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export default function LeaderboardPage() {
  const [tab, setTab] = useState('PLAYERS'); // 'PLAYERS' | 'TEAMS'
  const [selectedTech, setSelectedTech] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const techFilters = ['ALL', 'Rust', 'Go', 'TypeScript', 'Python', 'C++'];

  const players = [
    {
      rank: 1,
      name: 'Elena Rostova',
      username: 'elena_ui',
      github: 'elenarostova',
      tier: 'TIER 1 ARBITER',
      rating: 2480,
      xp: 14200,
      record: '24W - 2L',
      winRate: '92.3%',
      primaryStack: ['TypeScript', 'React', 'Three.js'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      streak: 9,
    },
    {
      rank: 2,
      name: 'Alex Vance',
      username: 'alex_cipher',
      github: 'alexvance-dev',
      tier: 'GRANDMASTER',
      rating: 2390,
      xp: 12850,
      record: '21W - 3L',
      winRate: '87.5%',
      primaryStack: ['Rust', 'Go', 'gRPC'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      streak: 5,
    },
    {
      rank: 3,
      name: 'Marcus Chen',
      username: 'marcus_ml',
      github: 'marcuschen-ai',
      tier: 'GRANDMASTER',
      rating: 2315,
      xp: 11400,
      record: '19W - 4L',
      winRate: '82.6%',
      primaryStack: ['Python', 'PyTorch', 'FastAPI'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      streak: 3,
    },
    {
      rank: 4,
      name: 'Kaito Tanaka',
      username: 'kaito_sys',
      github: 'kaitotanaka',
      tier: 'CONTENDER',
      rating: 2190,
      xp: 9800,
      record: '16W - 5L',
      winRate: '76.2%',
      primaryStack: ['C++', 'Rust', 'Linux Kernel'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      streak: 2,
    },
    {
      rank: 5,
      name: 'Sarah Jenkins',
      username: 'sjenkins_dev',
      github: 'sarahjenkins',
      tier: 'CONTENDER',
      rating: 2140,
      xp: 9250,
      record: '15W - 6L',
      winRate: '71.4%',
      primaryStack: ['Go', 'Kubernetes', 'Docker'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      streak: 1,
    },
  ];

  const teams = [
    {
      rank: 1,
      name: 'TEAM CYPHERS',
      members: ['Elena Rostova', 'Alex Vance', 'Marcus Chen'],
      rating: 2650,
      battlesWon: 12,
      winRate: '92.3%',
      topChallenge: 'WebSocket Telemetry Hub',
      primaryStack: ['Rust', 'TypeScript', 'FastAPI'],
    },
    {
      rank: 2,
      name: 'NEURAL FORGE',
      members: ['David Thorne', 'Marcus Chen'],
      rating: 2490,
      battlesWon: 9,
      winRate: '81.8%',
      topChallenge: 'Distributed Vector Indexer',
      primaryStack: ['Python', 'C++', 'PyTorch'],
    },
    {
      rank: 3,
      name: 'ZERO LATENCY GUILD',
      members: ['Kaito Tanaka', 'Sarah Jenkins'],
      rating: 2410,
      battlesWon: 8,
      winRate: '72.7%',
      topChallenge: 'Order Book Execution Engine',
      primaryStack: ['C++', 'Rust', 'Go'],
    },
  ];

  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'ALL' || p.primaryStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 mb-3">
          <Trophy size={13} className="text-[#6366f1]" />
          <span className="font-mono text-xs text-[#6366f1] font-bold uppercase tracking-wider">
            GLOBAL COMPETITIVE STANDINGS
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Arena Leaderboard
        </h1>
        <p className="text-sm text-white/60 mt-2 font-sans">
          Verifiable rankings based on challenge outcomes, ELO performance, and AI-evaluated development evidence.
        </p>
      </div>

      {/* Tabs & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Tab switcher */}
        <div className="inline-flex p-1 rounded-xl bg-[#070b12] border border-white/10">
          <button
            onClick={() => setTab('PLAYERS')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-jakarta font-bold uppercase tracking-wider transition-all ${
              tab === 'PLAYERS'
                ? 'bg-[#22d3ee] text-[#070b12] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <User size={14} />
            <span>Individual Engineers</span>
          </button>
          <button
            onClick={() => setTab('TEAMS')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-jakarta font-bold uppercase tracking-wider transition-all ${
              tab === 'TEAMS'
                ? 'bg-[#22d3ee] text-[#070b12] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Users size={14} />
            <span>Competitive Squads</span>
          </button>
        </div>

        {/* Search & Tech Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search handle or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#070b12] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#22d3ee] placeholder:text-white/30 font-mono w-48 sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#070b12] border border-white/10 p-1 rounded-xl">
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors ${
                  selectedTech === tech
                    ? 'bg-white/15 text-[#22d3ee] font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PLAYERS TABLE */}
      {tab === 'PLAYERS' && (
        <div className="rounded-2xl bg-[#070b12]/80 border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase text-white/40">
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Gladiator / Handle</th>
                  <th className="py-4 px-6">Tier Status</th>
                  <th className="py-4 px-6">ELO Rating</th>
                  <th className="py-4 px-6">Win Rate</th>
                  <th className="py-4 px-6">Total XP</th>
                  <th className="py-4 px-6 text-right">Specialty Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-sans">
                {filteredPlayers.map((player) => (
                  <tr
                    key={player.rank}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Rank Badge */}
                    <td className="py-4 px-6 font-mono font-bold">
                      {player.rank === 1 && (
                        <span className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center font-black">
                          #1
                        </span>
                      )}
                      {player.rank === 2 && (
                        <span className="w-7 h-7 rounded-lg bg-slate-300/10 border border-slate-300/40 text-slate-300 flex items-center justify-center font-black">
                          #2
                        </span>
                      )}
                      {player.rank === 3 && (
                        <span className="w-7 h-7 rounded-lg bg-amber-600/10 border border-amber-600/40 text-amber-600 flex items-center justify-center font-black">
                          #3
                        </span>
                      )}
                      {player.rank > 3 && (
                        <span className="w-7 h-7 text-white/40 flex items-center justify-center">
                          #{player.rank}
                        </span>
                      )}
                    </td>

                    {/* Gladiator Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-[#22d3ee]/50 transition-colors"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-[#22d3ee] transition-colors flex items-center gap-2">
                            <span>{player.name}</span>
                            {player.streak >= 3 && (
                              <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                                {player.streak}🔥
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                            <GithubIcon size={10} />
                            <span>{player.github}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20 font-bold uppercase tracking-wider">
                        {player.tier}
                      </span>
                    </td>

                    {/* ELO Rating */}
                    <td className="py-4 px-6 font-mono font-black text-white text-sm">
                      {player.rating}
                    </td>

                    {/* Win Rate */}
                    <td className="py-4 px-6 font-mono text-white/70">
                      <div>{player.winRate}</div>
                      <div className="text-[10px] text-white/30">{player.record}</div>
                    </td>

                    {/* XP */}
                    <td className="py-4 px-6 font-mono text-[#6366f1] font-bold">
                      {player.xp.toLocaleString()} XP
                    </td>

                    {/* Tech Stacks */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {player.primaryStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TEAMS TABLE */}
      {tab === 'TEAMS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.name}
              className="p-6 rounded-2xl bg-[#070b12]/80 border border-white/10 hover:border-[#22d3ee]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#22d3ee]/10 text-[#22d3ee]">
                    RANK #{team.rank}
                  </span>
                  <span className="font-mono text-xs text-white/50">{team.winRate} Win Rate</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>

                <div className="space-y-1 mb-4 text-xs font-mono text-white/60">
                  <div className="text-white/40 text-[10px] uppercase">Roster:</div>
                  {team.members.map((m) => (
                    <div key={m} className="flex items-center gap-1 text-white/80">
                      <span>•</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs mb-4">
                  <div className="text-white/40 text-[10px] font-mono uppercase">Signature Victory:</div>
                  <div className="font-semibold text-white mt-0.5">{team.topChallenge}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">Squad Rating</div>
                  <div className="text-xl font-mono font-black text-[#22d3ee]">{team.rating}</div>
                </div>
                <div className="flex gap-1">
                  {team.primaryStack.map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
