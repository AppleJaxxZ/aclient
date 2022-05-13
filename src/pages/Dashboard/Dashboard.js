import React, { useEffect, useState } from 'react';
import { signOut } from '../../redux/user/user.action';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import styles from './Dashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import InputMask from '../../components/Input/InputMask';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';
import valid from 'card-validator';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  credit_card_number: Yup.string()
    .required('Card number is required.')
    .test(
      'testCardMinLength',
      'Card number can not be less than 13 numbers',
      (value) => value && value.replace(/-/g, '').trim().length >= 13
    )
    .test(
      'testCardMaxLength',
      'Card number can not be longer than 16 numbers',
      (value) => value && value.replace(/-/g, '').trim().length <= 16
    )
    .test(
      'ValidCardNumber',
      'Not a valid Credit card number',
      (val) => valid.number(val).isValid
    ),

  credit_card_cvv: Yup.string()
    .required('CVV is required.')
    .test(
      'testCvvNumsOnly',
      'CVV must only contain numbers',
      (value) => value && /^[0-9]{1,45}$/.test(value)
    )
    .test(
      'testCvvLength',
      'CVV must be 3 numbers in length',
      (value) => value && value.length === 3
    )
    .test(
      'isValidCvvNumber',
      'Not a valid CVV number',
      (value) => value && valid.cvv(value).isValid
    ),
  credit_card_exp_month_year: Yup.string()
    .required('Expiration date is required.')
    .test('testMonthNumsOnly', 'Month must only contain numbers.', (value) => {
      const val = value && value.split('/')[0];
      return val && /^[0-9]{1,45}$/.test(val);
    })
    .test(
      'testMonthLength',
      'Expiration month can not be longer than 2 numbers',
      (value) => {
        const val = value && value.split('/')[0];
        return val && val.length < 3;
      }
    )
    .test(
      'testMonthMax',
      'Expiration month can not be larger than 12',
      (value) => {
        const val = value && value.split('/')[0];
        return val && parseInt(val) < 13;
      }
    )
    .test('testMonthMax', 'Year must only contain numbers.', (value) => {
      const val = value && value.split('/')[1];
      return val && /^[0-9]{1,45}$/.test(val);
    })
    .test('expiration-date', 'Not a valid expiration date', (value) => {
      const val = value && value.split('/')[1];
      return val && valid.expirationDate(value).isValid;
    })
    .test(
      'testMonthMax',
      'Expiration year must be exactly 2 or 4 number long.',
      (value) => {
        const val = value && value.split('/')[1];
        return val && [2, 4].includes(val.length);
      }
    ),
});
const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [mySubscription, setMySubscription] = useState(null);
  const customer_id = useSelector(({ user }) => user.user.customer_id);
  const user = useSelector(({ user }) => user.user);
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
  }, [mySubscription]);

  const {
    handleSubmit,
    // watch,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    validate: ['onSubmit'],
    revalidate: ['onSubmit', 'onBlur', 'onChange'],
    defaultValues: {
      credit_card_number: '',
      credit_card_cvv: '',
      credit_card_exp_month_year: '',
      credit_card_exp_month: '',
      credit_card_exp_year: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    const payment = {
      email: user.email,
      payment: {
        type: 'card',
        card: {
          number: data.credit_card_number.replace(/-/g, ''),
          exp_month: parseInt(data.credit_card_exp_month.replace(/0/g, '')),
          exp_year: parseInt(data.credit_card_exp_year),
          cvc: data.credit_card_cvv,
        },
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/checkout/`,
        payment
      );
      if (data.createdSubscription) {
        setMySubscription(data.createdSubscription.status);
        toast.success('Payment success!');
      } else {
        toast.error(
          'Payment failed. Please check your card details and try again.'
        );
      }
      console.log('This is data', data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className={styles.container}>
      {mySubscription ? (
        <h1>Subscription : {mySubscription}</h1>
      ) : (
        <div className={styles.container}>
          <h1>You currently do not have a subscription</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <InputMask
              type={'cc-number'}
              format="####-####-####-####"
              name="credit_card_number"
              id="credit_card_number"
              label="Credit Card Number"
              control={control}
              error={errors.credit_card_number}
            />
            <InputMask
              type={'cc-cvc'}
              id="credit_card_cvv"
              name="credit_card_cvv"
              format="###"
              label="CVV"
              control={control}
              error={errors.credit_card_cvv}
            />
            <Input
              label="Cardholder Name"
              name={'billing_name'}
              id="billing_name"
              register={register}
            />
            <InputMask
              type={'cc-exp'}
              id="credit_card_exp_month_year"
              name="credit_card_exp_month_year"
              format="##/##"
              label="Expiration Date"
              control={control}
              error={errors.credit_card_exp_month_year}
              onChange={(event) => {
                const value = event.target.value
                  .split('/')
                  .map((v) => v.trim());
                if (value[0] === '0' || value[0] === '00') {
                  value[0] = '01';
                } else if (value[0].split('')[0] > 1) {
                  value[0] = `0${value[0]}`;
                } else if (parseInt(value[0]) > 12) {
                  value[0] = 12;
                }
                setValue('credit_card_exp_month', value[0]);
                setValue('credit_card_exp_year', value[1]);
              }}
            />
            <br />
            <Button type={'submit'}>Pay</Button>
          </form>
        </div>
      )}

      <br />
      <Button
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign out
      </Button>
      <br />

      <br />
      <Button
        onClick={() => {
          navigate('/account');
        }}
      >
        UnSubscribe
      </Button>
    </div>
  );
};

export default Dashboard;
