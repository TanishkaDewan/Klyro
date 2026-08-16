import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Trophy, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Award, 
  Clock, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  Sparkles,
  GitCommit
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user ? user.fullName : 'Alex Vance',
    role: user ? user.role : 'Backend & Systems Engineer',
    githubUsername: user ? user.githubUsername : 'alexvance-dev',
  });

  if (!user) {
    return (
      <div className="pt-36 pb-20 text-center max-w-md mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-3">No Profile Connected</h2>
        <p className="text-xs text-white/50 mb-6 font-sans">
          Please authenticate or create a KLYRO identity to view your competitive skill passport.
        </p>
        <Link
          to="/"
          className="btn-arena inline-block px-8 py-3 rounded-full bg-[#22d3ee] text-[#070b12] font-bold text-xs uppercase"
        >
          Return to Arena
        </Link>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      fullName: formData.fullName,
      role: formData.role,
      githubUsername: formData.githubUsername,
    }));
    setEditing(false);
  };

  const battleHistory = [
    {
      id: 'BTL-8492',
      title: 'Distributed Real-Time WebSocket Telemetry Engine',
      difficulty: 'EXPERT',
      rank: '#1 VICTORY',
      score: 92.4,
      xpGained: '+200 XP',
      eloGained: '+42 ELO',
      date: 'Aug 16, 2026',
      contribution: '52% (Lead Backend Architect)',
      repoUrl: 'https://github.com/team-cyphers/telemetry-hub',
    },
    {
      id: 'BTL-8104',
      title: 'Async Lock-Free Task Scheduler',
      difficulty: 'HARD',
      rank: '#1 VICTORY',
      score: 89.6,
      xpGained: '+200 XP',
      eloGained: '+35 ELO',
      date: 'Aug 09, 2026',
      contribution: '60% (Core Concurrency Engine)',
      repoUrl: 'https://github.com/alexvance-dev/lockfree-scheduler',
    },
    {
      id: 'BTL-7720',
      title: 'Zero-Copy Protocol Buffer Parser',
      difficulty: 'HARD',
      rank: '#2 RUNNER-UP',
      score: 84.1,
      xpGained: '+150 XP',
      eloGained: '+18 ELO',
      date: 'Jul 28, 2026',
      contribution: '45% (Buffer Deserializer)',
      repoUrl: 'https://github.com/alexvance-dev/zerocopy-parser',
    },
  ];

  return (
    <div className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Top Profile Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#070b12]/90 border border-white/10 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#22d3ee]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#22d3ee]/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-[#22d3ee] text-[#070b12] font-mono text-[10px] font-black uppercase">
                {user.streak}🔥 STREAK
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.fullName}</h1>
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-white/40 hover:text-white p-1 rounded transition-colors"
                  title="Edit Profile"
                >
                  <Edit3 size={15} />
                </button>
              </div>

              <div className="text-xs font-mono text-[#22d3ee] font-semibold mt-0.5">
                @{user.username} · {user.role}
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-white/50">
                <a
                  href={`https://github.com/${user.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>{user.githubUsername}</span>
                </a>
                <span>·</span>
                <span className="text-emerald-400 font-bold uppercase">{user.experienceLevel}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Counter */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
            <div className="p-3.5 px-4 sm:px-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">ELO Rating</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-[#22d3ee]">{user.rating}</div>
              <div className="text-[9px] font-mono text-[#22d3ee] uppercase mt-0.5">Tier 1 Arbiter</div>
            </div>

            <div className="p-3.5 px-4 sm:px-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Total XP</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-[#6366f1]">{user.xp.toLocaleString()}</div>
              <div className="text-[9px] font-mono text-white/40 uppercase mt-0.5">Level 18</div>
            </div>

            <div className="p-3.5 px-4 sm:px-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Record</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-white">{user.wins}W - {user.losses}L</div>
              <div className="text-[9px] font-mono text-emerald-400 uppercase mt-0.5">82.3% Winrate</div>
            </div>
          </div>
        </div>

        {/* Inline Edit Form */}
        {editing && (
          <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/60 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#070b12] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/60 mb-1">Specialty Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#070b12] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/60 mb-1">GitHub Username</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.githubUsername}
                  onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                  className="w-full bg-[#070b12] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                />
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#22d3ee] text-[#070b12] text-xs font-bold font-jakarta uppercase">
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Verified Skill Passport (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#070b12]/80 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldCheck size={16} className="text-[#22d3ee]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-jakarta">
                Verified Skill Passport
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase text-white/40 mb-2">Core Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {user.primaryStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20 text-xs font-mono font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[10px] font-mono uppercase text-white/40">Verified Arena Competencies</div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-white/80">Lock-Free Concurrency</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">VERIFIED ✓</span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-white/80">WebSocket Backpressure</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">VERIFIED ✓</span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-white/80">Distributed Consensus</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">VERIFIED ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Verifiable Battle History Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#6366f1]" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-jakarta">
                Verifiable Battle History
              </h3>
            </div>
            <span className="text-xs font-mono text-white/40">{battleHistory.length} Battles Logged</span>
          </div>

          <div className="space-y-4">
            {battleHistory.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-[#070b12]/80 border border-white/10 hover:border-[#22d3ee]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#22d3ee]">{b.rank}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                      {b.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{b.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1">{b.title}</h4>
                  <div className="text-xs font-mono text-white/50">
                    Contribution: <span className="text-white/80 font-semibold">{b.contribution}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xl font-mono font-black text-[#22d3ee]">{b.score}</div>
                    <div className="text-[10px] font-mono text-emerald-400">{b.xpGained} · {b.eloGained}</div>
                  </div>

                  <Link
                    to="/results"
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white border border-white/10 transition-colors"
                  >
                    View Audit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
