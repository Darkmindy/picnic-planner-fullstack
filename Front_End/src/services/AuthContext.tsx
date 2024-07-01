// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import { AuthContextType, Temp } from '../types/roles';
import { fetchNewToken } from '../api/userApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Temp | null>(null);
  const accessToken = useRef<string>('');
  const refreshToken = useRef<string>('');
  const accessTokenExp = useRef<number>(0);
  const isLoggedIn = useRef<boolean>(false);

  useEffect(() => {
    console.log(accessToken)
  }, [accessToken.current])

  useEffect(() => {
    console.log(refreshToken)
  }, [refreshToken.current])

  const handleTokenRefresh = (expirationDate: number) => {
    setTimeout(async () => {
      if(!isLoggedIn.current) return;
      try {
        const data = await fetchNewToken(refreshToken.current)
        if (data) {
          accessToken.current = data[1].split(" ")[1];
          refreshToken.current = data[0].refreshToken;
          accessTokenExp.current = data[0].accessTokenExp;
          console.log(accessToken.current)
          console.log(refreshToken.current)
        }
        handleTokenRefresh(accessTokenExp.current);
      } catch (error) {
        console.error(error)
      }
    }, expirationDate - 2000);
  };


  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, refreshToken, accessTokenExp, handleTokenRefresh, isLoggedIn }}>
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
