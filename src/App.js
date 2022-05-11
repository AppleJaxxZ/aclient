import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes';

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Account/Account';

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
        </Route> */}

        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
