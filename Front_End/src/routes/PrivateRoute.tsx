// src/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Role } from '../types/roles';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: Role[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Utente non autenticato
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!allowedRoles.includes(auth.user.role?.valueOf() as Role)) {
    // Utente non autorizzato
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
