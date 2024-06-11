import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean; // Flag per indicare se l'utente è autenticato
  redirectTo: string; // Percorso di reindirizzamento per la pagina di accesso
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectTo,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
