import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

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

export const deleteUser = async ({ email, token }) => {
  return await authAxios.delete(
    `${process.env.REACT_APP_BACKEND}/api/auth/deleteaccount`,
    {
      data: {
        email,
      },
    }
  );
};

export const postToGetSubscription = async (customer_id) => {
  return await authAxios
    .post(`${process.env.REACT_APP_BACKEND}/api/subscription/my-subscription`, {
      customer_id,
    })
    .then((res) => {
      console.log(res);
    });
};
