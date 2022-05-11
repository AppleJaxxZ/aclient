import React, { useEffect } from 'react';
import { getSubscription, signOut } from '../../redux/user/user.action';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import styles from './Dashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const customer_id = useSelector(({ user }) => user.user.customer_id);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getSubscription(customer_id));
    }
  }, []);

  return (
    <div className={styles.container}>
      We currently Only have one subscription!
      <Button
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign out
      </Button>
      Click here to unSubscribe and Delete account
      <Button
        onClick={() => {
          navigate('/account');
        }}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Dashboard;
