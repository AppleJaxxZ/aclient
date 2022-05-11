import {
  //SIGN IN
  SIGN_IN_SUCCESS,
  SIGN_IN_INPROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_INPROGRESS,
  SIGN_OUT_SUCCESS,
} from './user.types';
import {
  deleteUser,
  postSignIn,
  postSignUp,
  postToGetSubscription,
} from '../api/user';

import jwt_decode from 'jwt-decode';

export const signIn = (values, navigate) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_INPROGRESS,
  });
  try {
    const { data } = await postSignIn(values);

    const decoded_user = jwt_decode(data.token);

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: {
        user: {
          ...data.user,
          exp: decoded_user.exp,
          iat: decoded_user.iat,
        },
        token: data.token,
      },
    });
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  } catch (err) {
    alert(JSON.stringify(err.response.data));
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const signUp = (values, navigate) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_INPROGRESS,
  });
  try {
    const { data } = await postSignUp(values);

    const decoded_user = jwt_decode(data.token);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: {
        user: {
          ...data.user,
          exp: decoded_user.exp,
          iat: decoded_user.iat,
        },
        token: data.token,
      },
    });
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  } catch (err) {
    alert(JSON.stringify(err.response.data));
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch({ type: SIGN_OUT_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const deleteAccount = (email, token) => async (dispatch) => {
  try {
    await deleteUser({
      email,
    });
    localStorage.removeItem('token');
    dispatch({ type: SIGN_OUT_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const getSubscription = (customer_id) => async (dispatch) => {
  try {
    await postToGetSubscription(customer_id);
  } catch (err) {
    console.log(err.response);
  }
};
