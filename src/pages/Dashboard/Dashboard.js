import React from 'react';
import { signOut } from '../../redux/user/user.action';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
const Dashboard = () => {
  const dispatch = useDispatch();
  return (
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
  );
};

export default Dashboard;
