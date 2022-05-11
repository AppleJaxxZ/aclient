import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  const token = useSelector(({ user }) => user.token);
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
