// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types/roles';
import { signIn as signInApi } from '../api/api'; // Assumiamo che esista una funzione API di sign-in

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const response = await signInApi({ email, password });
    setUser(response.user); // Supponendo che l'API restituisca l'oggetto utente
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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
