import axios from 'axios';

export const postSignUp = async ({
  name,
  email,
  password,
  phone,
  pin,
  dateOfBirth,
}) =>
  await axios.post('http://localhost:8000/api/auth/register', {
    name,
    email,
    password,
    phone,
    pin,
    dateOfBirth,
  });

export const postSignIn = async ({ email, password }) =>
  await axios.post('http://localhost:8000/api/auth/login', {
    email,
    password,
  });
