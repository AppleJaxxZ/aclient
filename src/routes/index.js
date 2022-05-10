import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(({ user }) => user.token);

  return token ? <Outlet /> : <Navigate to="/signup" />;
};

// const CanAccessComponent = ({ children, shouldRedirect = true }) => {
//   if (shouldAllow) {
//     return children;
//   }
//   if (shouldRedirect) {
//     return (
//       <Navigate
//         exact
//         to={{
//           pathname: redirectUrl,
//         }}
//       />
//     );
//   }
//   return null;
// };
