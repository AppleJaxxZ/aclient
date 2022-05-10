import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoute } from './routes';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Button from './components/Button/Button';
import { useDispatch } from 'react-redux';
import { signOut } from './redux/user/user.action';
const App = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(({ user }) => user.token);
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<PublicRoute />}>
          <Route
            exact
            path="/dashboard"
            element={
              <div>
                We are launching our data platform soon stand by
                <Button
                  onClick={() => {
                    dispatch(signOut());
                  }}
                >
                  Sign out
                </Button>
              </div>
            }
          />
        </Route>

        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
