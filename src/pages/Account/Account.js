import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Account.module.scss';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';
import { deleteAccount } from '../../redux/user/user.action';
const Account = () => {
  const dispatch = useDispatch();
  const email = useSelector(({ user }) => user.user.email);

  return (
    <div className={styles.container}>
      Are you sure ? We will unsubscribe your account and all payments will
      stop.
      <Button
        onClick={() => {
          dispatch(deleteAccount(email));
        }}
      >
        UnSubscribe
      </Button>
    </div>
  );
};

export default Account;
