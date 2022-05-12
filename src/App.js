import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes';
import { Toaster } from "react-hot-toast";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Account/Account';
import { useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';


const App = () => {
  const token = useSelector(({ user }) => user.token);
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  return (
    <>
      <Toaster
        position="buttom-right"
        toastOptions={{
          duration: 2000,
        }}
      />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<Navigate to="/signup" replace />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
