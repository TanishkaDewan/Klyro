import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  GitBranch, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Share2, 
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function BattleResultsPage() {
  const { user } = useAuth();
  const [showcaseOptIn, setShowcaseOptIn] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const battleData = {
    id: 'BTL-8492',
    challengeTitle: 'Distributed Real-Time WebSocket Telemetry Engine',
    difficulty: 'EXPERT',
    status: 'EVALUATION COMPLETE',
    evaluatedAt: 'Just now · Engine v2.4.1 (Consensus)',
    teamName: 'TEAM CYPHERS',
    repoUrl: 'https://github.com/team-cyphers/telemetry-hub',
    compositeScore: 92.4,
    rank: '#1 VICTORY',
    rewards: {
      xp: '+200 XP',
      elo: '+42 ELO',
    },
    scores: [
      { name: 'Requirement Completion', score: 96, weight: '25%', desc: 'All core event streams & catch-up buffers functional' },
      { name: 'Technical Quality', score: 94, weight: '20%', desc: 'Clean non-blocking async architecture & zero memory leak' },
      { name: 'Feasibility & Reliability', score: 90, weight: '20%', desc: 'Resilient reconnect sequence verified under stress' },
      { name: 'Innovation & Architecture', score: 92, weight: '15%', desc: 'Novel ring-buffer backpressure mechanism' },
      { name: 'Code Quality & Typing', score: 88, weight: '10%', desc: 'Strong Rust types & error enum classification' },
      { name: 'Documentation & Tests', score: 85, weight: '10%', desc: 'Comprehensive README & integration test suite' },
    ],
    requirements: [
      { id: 'REQ-1', title: 'Concurrent Socket Ingestion (1,000+ subscribers)', status: 'MET', detail: 'Stress tested to 4,500 socket clients with zero event dropping.' },
      { id: 'REQ-2', title: 'Fault-Tolerant Reconnect Catch-Up Buffer', status: 'MET', detail: 'Monotonic sequence buffer successfully replays missed packets upon client disconnect.' },
      { id: 'REQ-3', title: 'Automated Stress Integration Suite', status: 'MET', detail: 'Unit and load tests present in /tests with 89% coverage.' },
      { id: 'REQ-4', title: 'Performance Exporter & Telemetry CLI', status: 'PARTIAL', detail: 'CLI exporter works but lacks prometheus scrape endpoint format.' },
    ],
    contributions: [
      {
        name: 'Alex Vance (You)',
        github: 'alexvance-dev',
        role: 'Backend & Systems Engineer',
        percentage: 52,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        evidence: [
          'Authored core WebSocket ring-buffer & monotonic sequence engine (14 commits)',
          'Designed async backpressure concurrency pipeline in src/engine/socket.rs',
          'Resolved critical packet ordering race condition in PR #3',
        ],
      },
      {
        name: 'Elena Rostova',
        github: 'elenarostova',
        role: 'Frontend & Telemetry HUD Specialist',
        percentage: 48,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        evidence: [
          'Built high-performance WebGL time-series metrics canvas in src/ui/dashboard.tsx',
          'Integrated real-time socket client with exponential reconnect backoff',
          'Authored comprehensive setup & benchmark markdown documentation',
        ],
      },
    ],
    aiFeedback: {
      strengths: [
        'Exceptional lock-free queue architecture handling high throughput without blocking the event loop.',
        'Extensive automated test suite proving packet order determinism under synthetic network jitter.',
        'Clean separation between the socket ingest layer and metric aggregation pipelines.',
      ],
      weaknesses: [
        'Prometheus metric exporter endpoint was only partially implemented.',
        'Memory buffer configuration is hardcoded rather than dynamically configurable via environment variables.',
      ],
      recommendations: [
        'Expose /metrics standard Prometheus scrape route for standard Grafana compatibility.',
        'Add a circular buffer overflow alert when connected client bandwidth drops below 10kb/s.',
      ],
    },
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Top Victory Banner */}
      <div className="mb-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#070b12] via-[#0f172a] to-[#070b12] border border-[#22d3ee]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#22d3ee]/20 via-[#6366f1]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#22d3ee]/10 text-[#22d3ee] font-bold border border-[#22d3ee]/30">
                {battleData.rank}
              </span>
              <span className="font-mono text-xs text-white/50">{battleData.id}</span>
              <span className="font-mono text-xs text-white/40">·</span>
              <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} />
                {battleData.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              {battleData.challengeTitle}
            </h1>
            <p className="text-xs text-white/50 font-mono mt-1">
              Repository: <a href={battleData.repoUrl} target="_blank" rel="noreferrer" className="text-[#22d3ee] underline underline-offset-2">{battleData.repoUrl}</a>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center p-4 px-6 rounded-2xl bg-[#070b12]/90 border border-white/10 shadow-lg">
              <div className="text-[11px] font-mono text-white/40 uppercase">AI Composite Score</div>
              <div className="text-4xl sm:text-5xl font-mono font-black text-[#22d3ee] tracking-tight">
                {battleData.compositeScore}
              </div>
              <div className="text-[10px] font-mono text-white/30">OUT OF 100</div>
            </div>

            <div className="space-y-2">
              <div className="p-3 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                {battleData.rewards.xp} GAINED
              </div>
              <div className="p-3 px-5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1] text-xs font-mono font-bold">
                {battleData.rewards.elo} RATING
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: 6-Dimension Score Matrix & Requirement Compliance */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. 6-Dimension Breakdown */}
          <div className="p-7 rounded-2xl bg-[#070b12]/80 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-[#22d3ee]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-jakarta">
                  6-Dimension Weighted Evaluation
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">Weights Configured in <code>scoring.service.js</code></span>
            </div>

            <div className="space-y-5">
              {battleData.scores.map((dim) => (
                <div key={dim.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{dim.name}</span>
                      <span className="text-[10px] font-mono text-white/40">({dim.weight} weight)</span>
                    </div>
                    <div className="font-mono font-bold text-[#22d3ee]">{dim.score} / 100</div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#22d3ee] to-[#6366f1] rounded-full transition-all duration-1000"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-white/50 font-sans">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Requirement Compliance Matrix */}
          <div className="p-7 rounded-2xl bg-[#070b12]/80 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#6366f1]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-jakarta">
                  Requirement Audit Verification
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">Static AST & Test Evidence</span>
            </div>

            <div className="space-y-3">
              {battleData.requirements.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white">{req.title}</div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        req.status === 'MET'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : req.status === 'PARTIAL'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans">{req.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. AI Qualitative Feedback */}
          <div className="p-7 rounded-2xl bg-[#070b12]/80 border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <Sparkles size={16} className="text-[#22d3ee]" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-jakarta">
                AI Arbiter Qualitative Diagnosis
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <h4 className="font-mono text-emerald-400 font-bold uppercase mb-2">Key Strengths</h4>
                <ul className="space-y-1.5 list-disc list-inside text-white/70">
                  {battleData.aiFeedback.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-amber-400 font-bold uppercase mb-2">Areas for Optimization</h4>
                <ul className="space-y-1.5 list-disc list-inside text-white/70">
                  {battleData.aiFeedback.weaknesses.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[#22d3ee] font-bold uppercase mb-2">Actionable Recommendations</h4>
                <ul className="space-y-1.5 list-disc list-inside text-white/70">
                  {battleData.aiFeedback.recommendations.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI-Assisted Estimated Contribution & Actions */}
        <div className="space-y-8">
          {/* AI-Assisted Estimated Contribution */}
          <div className="p-7 rounded-2xl bg-[#070b12]/80 border border-white/10 shadow-xl">
            <div className="mb-4">
              <span className="text-[10px] font-mono text-[#22d3ee] uppercase font-bold tracking-wider">
                SIGNATURE TELEMETRY
              </span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-jakarta mt-0.5">
                AI-Assisted Estimated Contribution
              </h3>
              <p className="text-[11px] text-white/50 mt-1 font-sans">
                Estimated from commit complexity, architectural ownership, and PR velocity (not raw commit counts).
              </p>
            </div>

            <div className="space-y-6">
              {battleData.contributions.map((member) => (
                <div key={member.github} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                      <div>
                        <div className="text-xs font-bold text-white">{member.name}</div>
                        <div className="text-[10px] font-mono text-white/40">@{member.github}</div>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-lg text-[#22d3ee]">
                      {member.percentage}%
                    </div>
                  </div>

                  {/* Contribution Bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-[#22d3ee] rounded-full"
                      style={{ width: `${member.percentage}%` }}
                    />
                  </div>

                  <div className="space-y-1 text-[11px] font-sans text-white/60">
                    <div className="text-[10px] font-mono uppercase text-white/40">Repository Evidence:</div>
                    {member.evidence.map((ev, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-[#22d3ee]">•</span>
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Winner Showcase Opt-in Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#070b12] border border-[#22d3ee]/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] font-bold uppercase">
              <Trophy size={16} />
              <span>VICTORY SHOWCASE PRIVILEGE</span>
            </div>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              As the winning squad, you can opt to publish this project in the <strong>KLYRO Hall of Fame Showcase</strong> for public peer review.
            </p>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={showcaseOptIn}
                onChange={(e) => setShowcaseOptIn(e.target.checked)}
                className="w-4 h-4 accent-[#22d3ee] rounded"
              />
              <span className="text-xs font-medium text-white">
                Showcase repository on KLYRO Public Hall of Fame
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold font-jakarta uppercase tracking-wider border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                <span>{copiedLink ? 'LINK COPIED!' : 'SHARE RESULT'}</span>
              </button>

              <Link
                to="/arena"
                className="btn-arena flex-1 py-3 rounded-xl bg-[#22d3ee] text-[#070b12] text-xs font-bold font-jakarta uppercase tracking-wider hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2"
              >
                <span>NEXT BATTLE</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
