import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ExternalLink, 
  Search, 
  Sparkles, 
  GitBranch, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export default function ShowcasePage() {
  const [selectedTech, setSelectedTech] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const techFilters = ['ALL', 'Rust', 'Go', 'TypeScript', 'Python', 'C++'];

  const showcaseProjects = [
    {
      id: 'sc-1',
      title: 'High-Throughput WebSocket Telemetry Engine',
      challengeCategory: 'Distributed Systems',
      difficulty: 'EXPERT',
      teamName: 'TEAM CYPHERS',
      authors: ['Alex Vance', 'Elena Rostova', 'Marcus Chen'],
      score: 94.2,
      githubUrl: 'https://github.com/team-cyphers/telemetry-hub',
      tags: ['Rust', 'WebSocket', 'gRPC', 'Tokyo'],
      aiHighlight: 'Engineered a ring-buffer backpressure mechanism capable of streaming 100k events/sec without event drop.',
      verdict: 'Best Concurrency Model & Test Coverage',
    },
    {
      id: 'sc-2',
      title: 'Distributed Vector Similarity Indexer',
      challengeCategory: 'AI & Inference',
      difficulty: 'HARD',
      teamName: 'NEURAL FORGE',
      authors: ['David Thorne', 'Marcus Chen'],
      score: 91.8,
      githubUrl: 'https://github.com/neuralforge/vector-indexer',
      tags: ['Python', 'FastAPI', 'SIMD', 'PyTorch'],
      aiHighlight: 'Custom SIMD cosine distance kernels providing sub-millisecond retrieval on 1M embeddings.',
      verdict: 'Highest Algorithmic Innovation',
    },
    {
      id: 'sc-3',
      title: 'Lock-Free High-Frequency Order Book',
      challengeCategory: 'Fintech & Systems',
      difficulty: 'EXPERT',
      teamName: 'ZERO LATENCY GUILD',
      authors: ['Kaito Tanaka', 'Sarah Jenkins'],
      score: 93.5,
      githubUrl: 'https://github.com/zerolatency/orderbook-engine',
      tags: ['C++', 'Lock-Free', 'Linux-Kernel'],
      aiHighlight: 'Single-digit microsecond order matching determinism with memory-mapped circular queues.',
      verdict: 'Top Hardware Optimization',
    },
  ];

  const filtered = showcaseProjects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'ALL' || p.tags.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 mb-3">
          <Trophy size={13} className="text-[#22d3ee]" />
          <span className="font-mono text-xs text-[#22d3ee] font-bold uppercase tracking-wider">
            HALL OF FAME
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Winning Codebase Showcase
        </h1>
        <p className="text-sm text-white/60 mt-2 font-sans">
          Curated battle-winning repositories verified and scored by the KLYRO AI Arbiter.
        </p>
      </div>

      {/* Search & Tech Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search showcases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070b12] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#22d3ee] font-mono placeholder:text-white/30"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#070b12] border border-white/10 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {techFilters.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors whitespace-nowrap ${
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

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-7 rounded-2xl bg-[#070b12]/80 border border-white/10 hover:border-[#22d3ee]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[#22d3ee]/10 text-[#22d3ee] font-bold border border-[#22d3ee]/30">
                  {proj.verdict}
                </span>
                <div className="text-right font-mono font-black text-xl text-[#22d3ee]">
                  {proj.score}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#22d3ee] transition-colors mb-1">
                {proj.title}
              </h3>
              <div className="text-xs font-mono text-white/40 mb-3">
                Squad: <span className="text-white/70 font-semibold">{proj.teamName}</span>
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
                {proj.aiHighlight}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
                <ExternalLink size={12} />
              </a>

              <Link
                to="/results"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#22d3ee] hover:underline"
              >
                <span>AI Breakdown</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
