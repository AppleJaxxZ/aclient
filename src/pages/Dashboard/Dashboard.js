import React, { useEffect, useState } from 'react';
import { signOut } from '../../redux/user/user.action';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import styles from './Dashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [mySubscription, setMySubscription] = useState(null);
  const customer_id = useSelector(({ user }) => user.user.customer_id);
  const getmysub = async (customer_id) => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/subscription/my-subscription`,
      { customer_id: customer_id },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const fetchData = async () => {
        try {
          const {
            data: { active },
          } = await getmysub(customer_id);

          setMySubscription(active);
        } catch (err) {
          setMySubscription(null);
        }
      };

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {mySubscription ? (
        <h1>Subscription : {mySubscription}</h1>
      ) : (
        <h1>You currently do not have a subscription</h1>
      )}
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
