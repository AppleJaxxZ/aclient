import axios from 'axios';

export const postSignUp = async ({
  name,
  email,
  password,
  phone,
  pin,
  dateOfBirth,
}) =>
  await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/register`, {
    name,
    email,
    password,
    phone,
    pin,
    dateOfBirth,
  });

export const postSignIn = async ({ email, password }) =>
  await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
    email,
    password,
  });
