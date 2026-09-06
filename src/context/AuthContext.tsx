'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mabadi_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: User = {
      name: name || email.split('@')[0],
      email,
      role: 'Student / Applicant',
    };
    setUser(newUser);
    localStorage.setItem('mabadi_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const signup = (name: string, email: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mabadi_user');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
