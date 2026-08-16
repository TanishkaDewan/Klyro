import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  GitBranch, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Send,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function ArenaPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Matchmaking states: 'IDLE' | 'SEARCHING' | 'PROPOSED' | 'CONFIRMED_BATTLE'
  const [matchState, setMatchState] = useState('IDLE');
  const [searchTime, setSearchTime] = useState(0);
  const [rematchCount, setRematchCount] = useState(1);
  const [myConsent, setMyConsent] = useState(null); // null | 'ACCEPTED' | 'REJECTED'
  const [teammateConsents, setTeammateConsents] = useState({
    member2: false,
    member3: false,
  });

  // Battle states
  const [repoUrl, setRepoUrl] = useState('');
  const [repoSubmitted, setRepoSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Timer countdown simulation (47h 58m 22s)
  const [secondsLeft, setSecondsLeft] = useState(48 * 3600 - 120);

  useEffect(() => {
    let interval;
    if (matchState === 'SEARCHING') {
      interval = setInterval(() => setSearchTime((t) => t + 1), 1000);
      // Auto-find team after 3.5 seconds
      const timeout = setTimeout(() => {
        setMatchState('PROPOSED');
        setSearchTime(0);
      }, 3500);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    return () => clearInterval(interval);
  }, [matchState]);

  useEffect(() => {
    let timer;
    if (matchState === 'CONFIRMED_BATTLE') {
      timer = setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [matchState]);

  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const proposedTeam = [
    {
      id: 'm1',
      name: user ? user.fullName : 'Alex Vance (You)',
      username: user ? user.username : 'alex_cipher',
      github: user ? user.githubUsername : 'alexvance-dev',
      role: 'Backend & Systems Engineer',
      skills: ['Rust', 'Go', 'gRPC'],
      status: myConsent || 'PENDING',
      isMe: true,
      avatar: user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    {
      id: 'm2',
      name: 'Elena Rostova',
      username: 'elena_ui',
      github: 'elenarostova',
      role: 'Frontend & WebGL Specialist',
      skills: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
      status: teammateConsents.member2 ? 'ACCEPTED' : 'PENDING',
      isMe: false,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
    {
      id: 'm3',
      name: 'Marcus Chen',
      username: 'marcus_ml',
      github: 'marcuschen-ai',
      role: 'AI / Model Inference Architect',
      skills: ['Python', 'FastAPI', 'PyTorch', 'Vector DBs'],
      status: teammateConsents.member3 ? 'ACCEPTED' : 'PENDING',
      isMe: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  ];

  const handleStartQueue = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setMatchState('SEARCHING');
    setMyConsent(null);
    setTeammateConsents({ member2: false, member3: false });
  };

  const handleAcceptTeam = () => {
    setMyConsent('ACCEPTED');
    // Simulate teammates accepting shortly
    setTimeout(() => {
      setTeammateConsents((prev) => ({ ...prev, member2: true }));
    }, 800);
    setTimeout(() => {
      setTeammateConsents((prev) => ({ ...prev, member3: true }));
      setTimeout(() => {
        setMatchState('CONFIRMED_BATTLE');
      }, 1000);
    }, 1800);
  };

  const handleRejectTeam = () => {
    setMyConsent('REJECTED');
    if (rematchCount >= 3) {
      alert('Maximum rematch attempts reached (3/3). Queue resetting.');
      setMatchState('IDLE');
      setRematchCount(1);
    } else {
      setRematchCount((r) => r + 1);
      setTimeout(() => {
        setMatchState('SEARCHING');
        setMyConsent(null);
      }, 1200);
    }
  };

  const handleSubmitRepo = (e) => {
    e.preventDefault();
    if (!repoUrl.includes('github.com')) {
      setSubmissionError('Please provide a valid public GitHub repository URL.');
      return;
    }
    setSubmissionError('');
    setRepoSubmitted(true);
  };

  const handleTriggerEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      navigate('/results');
    }, 2500);
  };

  return (
    <div className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 mb-3">
          <Zap size={13} className="text-[#22d3ee]" />
          <span className="font-mono text-xs text-[#22d3ee] font-bold uppercase tracking-wider">
            COMPETITIVE ARENA COCKPIT
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Matchmaking & Battle Arena
        </h1>
        <p className="text-sm text-white/60 mt-2 font-sans">
          Rule-based matchmaking • Explicit team consent • 48h sprint • AI development evaluation
        </p>
      </div>

      {/* STATE 1: IDLE / QUEUE TRIGGER */}
      {matchState === 'IDLE' && (
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#070b12]/80 border border-white/10 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#22d3ee]/10 border border-[#22d3ee]/30 flex items-center justify-center text-[#22d3ee] mx-auto mb-6">
              <Users size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join Active Matchmaking Pool</h2>
            <p className="text-xs text-white/60 max-w-md mx-auto mb-8 font-sans">
              Our rule-based engine pairs complementary specialties (e.g., Frontend + Backend + AI) based on your declared skill passport.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left max-w-xl mx-auto text-xs font-mono text-white/70">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[#22d3ee] block font-bold">01. NO BLACK-BOX ML</span>
                <span className="text-white/40 text-[11px]">Strict skill synergy pairing</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[#22d3ee] block font-bold">02. DUAL CONSENT</span>
                <span className="text-white/40 text-[11px]">Both accept or auto-rematch</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[#22d3ee] block font-bold">03. 48H BATTLE</span>
                <span className="text-white/40 text-[11px]">Live countdown & AI judge</span>
              </div>
            </div>

            <button
              onClick={handleStartQueue}
              className="btn-arena px-10 py-4 rounded-full bg-[#22d3ee] text-[#070b12] font-jakarta text-sm font-bold uppercase tracking-wider hover:bg-[#38bdf8] inline-flex items-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <span>FIND SQUAD & START BATTLE</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: SEARCHING / QUEUE HUD */}
      {matchState === 'SEARCHING' && (
        <div className="max-w-2xl mx-auto">
          <div className="p-10 rounded-2xl bg-[#070b12]/90 border border-[#22d3ee]/40 text-center relative overflow-hidden shadow-2xl animate-pulse-slow">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#22d3ee] flex items-center justify-center text-[#22d3ee] mx-auto mb-6 animate-spin">
              <Activity size={28} />
            </div>
            <div className="text-xs font-mono text-[#22d3ee] uppercase tracking-widest mb-1">
              SEARCHING ARENA QUEUE...
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Complementary Profiles</h2>
            <div className="text-3xl font-mono font-black text-white my-4">
              00:{searchTime.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-white/50 font-sans max-w-sm mx-auto">
              Scanning active queue for Frontend, Backend, and AI specialists with matching ELO brackets.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() => setMatchState('IDLE')}
                className="text-xs font-mono text-red-400 hover:underline uppercase"
              >
                [ Cancel Matchmaking ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: PROPOSED TEAM CONSENT */}
      {matchState === 'PROPOSED' && (
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <div className="p-7 sm:p-9 rounded-2xl bg-[#070b12]/90 border border-white/10 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-[#22d3ee] font-bold uppercase tracking-wider">
                  TEAM PROPOSAL GENERATED
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">Review Squad Composition</h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                  Rematch Attempt: {rematchCount} of 3
                </span>
              </div>
            </div>

            {/* Teammates Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {proposedTeam.map((member) => (
                <div
                  key={member.id}
                  className={`p-5 rounded-xl border transition-all ${
                    member.status === 'ACCEPTED'
                      ? 'bg-[#22d3ee]/5 border-[#22d3ee]/40'
                      : member.status === 'REJECTED'
                      ? 'bg-red-500/5 border-red-500/40'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.isMe && (
                          <span className="text-[10px] font-mono text-[#22d3ee] font-bold">(YOU)</span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <GithubIcon size={11} />
                        <span>{member.github}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-[#22d3ee] mb-2 font-jakarta">{member.role}</div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40">CONSENT:</span>
                    <span
                      className={`font-bold ${
                        member.status === 'ACCEPTED'
                          ? 'text-[#22d3ee]'
                          : member.status === 'REJECTED'
                          ? 'text-red-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Consent Actions */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-white/60 font-sans">
                A battle starts ONLY if all 3 members explicitly click <strong className="text-white">ACCEPT</strong>. Rejection triggers an automatic rematch.
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleRejectTeam}
                  disabled={myConsent === 'ACCEPTED'}
                  className="px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold font-jakarta uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  REJECT & REMATCH
                </button>
                <button
                  onClick={handleAcceptTeam}
                  disabled={myConsent === 'ACCEPTED'}
                  className="btn-arena px-7 py-2.5 rounded-full bg-[#22d3ee] text-[#070b12] text-xs font-bold font-jakarta uppercase tracking-wider hover:bg-[#38bdf8] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50"
                >
                  <Check size={16} />
                  <span>{myConsent === 'ACCEPTED' ? 'CONSENT RECORDED' : 'ACCEPT TEAM'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE 4: CONFIRMED LIVE BATTLE COCKPIT */}
      {matchState === 'CONFIRMED_BATTLE' && (
        <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
          {/* Top Battle HUD Bar */}
          <div className="p-6 rounded-2xl bg-[#070b12] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] font-bold uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                <span>BATTLE CODE: #BTL-8492 · STATUS: ACTIVE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Distributed Real-Time WebSocket Telemetry Engine
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 px-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-[10px] font-mono text-white/50 uppercase">Time Remaining</div>
                <div className="text-2xl font-mono font-black text-[#22d3ee] tracking-wider">
                  {formatTime(secondsLeft)}
                </div>
              </div>
              <div className="p-3 px-5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 text-center">
                <div className="text-[10px] font-mono text-[#6366f1] uppercase font-bold">Reward</div>
                <div className="text-2xl font-mono font-black text-white">+250 XP</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Problem Statement & Requirements (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#070b12]/80 border border-white/10">
                <h3 className="text-sm font-mono font-bold text-[#22d3ee] uppercase tracking-wider mb-3">
                  PROBLEM STATEMENT
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans mb-6">
                  Build a high-throughput, fault-tolerant WebSocket telemetry aggregator that streams real-time system metrics (CPU, Memory, Event Delays) to connected clients with guaranteed monotonicity, reconnection backoff, and zero-drop backpressure handling.
                </p>

                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-3">
                  REQUIREMENTS CHECKLIST
                </h3>
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#22d3ee] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">REQ 1 — Concurrent Socket Ingestion:</strong> Support at least 1,000 active concurrent WebSocket subscribers without event lag.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#22d3ee] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">REQ 2 — Fault-Tolerant Reconnect:</strong> Client reconnection protocol with event sequence catch-up buffer.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#22d3ee] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">REQ 3 — Automated Test Coverage:</strong> Unit and stress integration suite verifying zero message loss during server restarts.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#22d3ee] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">REQ 4 — Architecture Documentation:</strong> Markdown README with architecture diagrams and performance benchmarks.
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mt-6 mb-3">
                  CONSTRAINTS
                </h3>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Language: Rust / Go / Node.js / Python</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">No closed proprietary SDKs</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Public GitHub Repo Only</span>
                </div>
              </div>
            </div>

            {/* Right Col: Team Roster & Submission Form (1 Col) */}
            <div className="space-y-6">
              {/* Squad HUD */}
              <div className="p-5 rounded-2xl bg-[#070b12]/80 border border-white/10">
                <h4 className="text-xs font-mono font-bold text-[#22d3ee] uppercase tracking-wider mb-4">
                  SQUAD ROSTER (CONFIRMED)
                </h4>
                <div className="space-y-3">
                  {proposedTeam.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02]">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-[#22d3ee]/40" />
                      <div className="text-xs">
                        <div className="font-bold text-white">{m.name}</div>
                        <div className="text-[10px] font-mono text-white/50">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Public GitHub Repo Submission */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#070b12] border border-[#22d3ee]/30 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] font-bold uppercase mb-2">
                  <GitBranch size={15} />
                  <span>REPO SUBMISSION</span>
                </div>
                <p className="text-xs text-white/60 font-sans mb-4">
                  Provide your team's public GitHub repository URL before the 48h deadline.
                </p>

                {repoSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/40 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] font-bold">
                      <CheckCircle2 size={16} />
                      <span>SUBMISSION CONFIRMED</span>
                    </div>
                    <div className="text-xs font-mono text-white/80 truncate">
                      {repoUrl}
                    </div>
                    <div className="text-[10px] font-mono text-white/40">
                      Timestamp: {new Date().toLocaleTimeString()}
                    </div>

                    <button
                      onClick={handleTriggerEvaluation}
                      disabled={isEvaluating}
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#6366f1] text-[#070b12] font-jakarta font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50"
                    >
                      {isEvaluating ? (
                        <>
                          <Activity size={16} className="animate-spin" />
                          <span>AI EVALUATION IN PROGRESS...</span>
                        </>
                      ) : (
                        <>
                          <span>TRIGGER AI EVALUATION</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitRepo} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-white/60 mb-1">
                        PUBLIC GITHUB REPOSITORY URL
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://github.com/team-cyphers/telemetry-hub"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full bg-[#070b12] border border-white/15 rounded-lg px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#22d3ee] transition-colors placeholder:text-white/20"
                      />
                    </div>

                    {submissionError && (
                      <div className="text-[11px] font-mono text-red-400 flex items-center gap-1.5">
                        <AlertCircle size={13} />
                        <span>{submissionError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#22d3ee] hover:bg-[#38bdf8] text-[#070b12] font-jakarta text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                      <Send size={14} />
                      <span>SUBMIT PUBLIC REPOSITORY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
