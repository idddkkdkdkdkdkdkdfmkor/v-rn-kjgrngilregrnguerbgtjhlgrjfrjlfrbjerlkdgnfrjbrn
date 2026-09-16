import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getSession, PortalRole } from '../../lib/portalAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: PortalRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const location = useLocation();
  const session = getSession();

  if (!session) {
    return <Navigate to="/portal/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && session.role !== requiredRole) {
    const redirect =
      session.role === 'superadmin' ? '/portal/superadmin' : '/portal/dashboard';
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};
