import React, { useState } from 'react'; // { useState }

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import axios from 'axios';
import styles from './SignUp.module.scss';

import earth from './m.jpg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/user/user.action';
import InputMask from '../../components/Input/InputMask';
import NumberMask from '../../components/Input/NumberMask';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'must be at least 5 characters'),
  phone: Yup.string().required('Phone is required'),
  pin: Yup.string()
    .matches(/^[0-9]+$/, 'Must be exactly 7 digits')
    .max(7, 'Must be exactly 7 digits')
    .required('Pin is required'),
  birth_date: Yup.string().required('Required').length(2, 'Invalid Input'),
  birth_month: Yup.string().required('Required').length(2, 'Invalid Input'),
  birth_year: Yup.string().required('Required').length(4, 'Invalid Input'),
});
export const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = ({
    birth_date,
    birth_month,
    birth_year,
    phone,
    ...rest
  }) => {
    setLoading(true);
    dispatch(
      signUp(
        {
          dateOfBirth: `${birth_month}-${birth_date}-${birth_year}`,
          phone: phone.replace(/\s/g, ''),
          ...rest,
        },
        navigate
      )
    );
    setLoading(false);
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
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register}
                name={'name'}
                label={'Name'}
                errors={errors.name?.message}
              />

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
              <InputMask
                type={'phone'}
                label="Phone Number"
                id={`phone`}
                name={`phone`}
                error={errors.phone}
                control={control}
                format={'###########'}
              />
              <InputMask
                type={'pin'}
                label="pin"
                id={`pin`}
                name={`pin`}
                error={errors.pin}
                control={control}
                format={'#######'}
              />
              <div style={{ display: 'flex' }}>
                <NumberMask
                  type={'bday-month'}
                  label="Month"
                  placeholder="MM"
                  id={`birth_month`}
                  name={`birth_month`}
                  control={control}
                  error={errors.birth_month}
                />
                <NumberMask
                  type={'bday-day'}
                  label="Day"
                  placeholder="DD"
                  id={`birth_date`}
                  name={`birth_date`}
                  control={control}
                  error={errors.birth_date}
                />
                <NumberMask
                  type={'bday-year'}
                  label="Year"
                  placeholder="YYYY"
                  id={`birth_year`}
                  name={`birth_year`}
                  control={control}
                  error={errors.birth_year}
                />
              </div>

              <Button type={'submit'} isLoading={loading}>
                Submit
              </Button>
            </form>
            <p>
              Already Have An Account?{' '}
              <span onClick={() => navigate('/login')}>Sign In</span>
            </p>
          </div>
        </div>
        <div className={styles.container__inner_container__picture_right_side}>
          <img src={earth} alt="earth" />
          <h1>United Federation Of Earth!</h1>
          <h2>Turn Your Ideas Into Reality</h2>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
