import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Terminal, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import GlassForm from '../components/GlassForm';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleLogin = (formData) => {
    const email = formData['Email'] || 'engineer@klyro.dev';
    const username = email.split('@')[0] || 'klyro_gladiator';

    login({
      username: username,
      fullName: username.charAt(0).toUpperCase() + username.slice(1),
      email: email,
      role: 'Fullstack / Systems Engineer',
      experienceLevel: 'ADVANCED',
      rating: 1850,
      xp: 4300,
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/arena');
    }, 1200);
  };

  const handleGithubOAuth = () => {
    login({
      username: 'octocat_dev',
      fullName: 'Verified GitHub Engineer',
      githubUsername: 'octocat',
      role: 'Backend & Distributed Systems',
      experienceLevel: 'ADVANCED',
      rating: 1920,
      xp: 5100,
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/arena');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Top back button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 text-xs font-mono tracking-wider uppercase transition-all backdrop-blur-md"
        >
          <ArrowLeft size={14} />
          <span>Back to KLYRO</span>
        </Link>
      </div>

      <GlassForm
        title="Arena Authentication"
        subtitle="Enter your credentials to enter the engineering arena."
        icon={<Terminal className="text-[#22d3ee] w-6 h-6" />}
        fields={[
          { placeholder: 'Email', type: 'email', required: true },
          { placeholder: 'Password', type: 'password', required: true },
        ]}
        buttonText={success ? 'Authenticated! Redirecting...' : 'Enter Arena'}
        onSubmit={handleLogin}
        maxWidth="30rem"
        backgroundGradientFrom="#070b12"
        backgroundGradientVia="#0f172a"
        backgroundGradientTo="#070b12"
        blob1Color="#22d3ee"
        blob2Color="#6366f1"
        blob3Color="#38bdf8"
        cardBgColor="rgba(15, 23, 42, 0.65)"
        cardBorderColor="rgba(255, 255, 255, 0.15)"
        iconBgColor="rgba(34, 211, 238, 0.12)"
        iconColor="#22d3ee"
        extraContent={
          <div className="mt-6 pt-5 border-t border-white/10 space-y-4 text-center">
            {/* Quick GitHub Auth */}
            <button
              type="button"
              onClick={handleGithubOAuth}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white font-sans text-xs font-semibold tracking-wide transition-all duration-200 group"
            >
              <GithubIcon size={16} className="text-white group-hover:text-[#22d3ee] transition-colors" />
              <span>Continue with GitHub Passport</span>
              <span className="ml-auto text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded border border-[#22d3ee]/20">
                Fast Pass
              </span>
            </button>

            {/* Status note */}
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-white/50">
              <ShieldCheck size={13} className="text-[#22d3ee]" />
              <span>Cryptographic Proof & Skill Identity Verified</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
