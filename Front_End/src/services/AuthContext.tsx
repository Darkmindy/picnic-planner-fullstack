// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthContextType, Temp } from '../types/roles';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Temp | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [accessTokenExp, setAccessTokenExp] = useState<number>(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(accessToken)
  }, [accessToken])

  useEffect(() => {
    console.log(refreshToken)
  }, [refreshToken])

  

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken, accessTokenExp, setAccessTokenExp, show, setShow }}>
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
