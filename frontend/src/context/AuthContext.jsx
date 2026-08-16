import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'usr-klyro-01',
    username: 'alex_cipher',
    fullName: 'Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    githubUsername: 'alexvance-dev',
    role: 'Backend & Systems Engineer',
    primaryStack: ['Rust', 'Go', 'PostgreSQL', 'Docker'],
    experienceLevel: 'ADVANCED',
    rating: 1845,
    rankTier: 'TIER 1 ARBITER',
    xp: 4250,
    wins: 14,
    losses: 3,
    battlesPlayed: 17,
    streak: 4,
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const login = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
