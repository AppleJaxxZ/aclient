import React from 'react'; // { useState }

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import axios from 'axios';
import styles from './Login.module.scss';
import logo from './united.png';
import earth from './m.jpg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/user/user.action';


const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Password is required'),
});
export const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const formOptions = { resolver: yupResolver(validationSchema) };
  // const [state, setstate] = useState(null);
  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (values) => {
    dispatch(signIn(values, navigate));
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__inner_container}>
        <div className={styles.container__inner_container__login_left_side}>
          <div
            className={
              styles.container__inner_container__login_left_side__login
            }
          >
            <div
              className={
                styles.container__inner_container__login_left_side__login__logo_container
              }
            >
              <img src={logo} alt="logo" />
            </div>
            <h1>Login</h1>
            <p>😎 Say never to login in again!</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register}
                name={'email'}
                label={'Email'}
                errors={errors.email?.message}
              />
              <Input
                register={register}
                name={'password'}
                label={'Password'}
                errors={errors.password?.message}
              />

              <Button type={'submit'}>Submit</Button>
            </form>
            <p>
              Don't Have an Account?{' '}
              <span onClick={() => navigate('/signup')}>Sign Up</span>
            </p>
          </div>
        </div>
        <div className={styles.container__inner_container__picture_right_side}>
          <img src={earth} alt="earth" />
          <h1>EasyLandings Software</h1>
          <h2>Change the world one idea at a time.</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
