import {
  //SIGN IN
  SIGN_IN_SUCCESS,
  SIGN_IN_INPROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_INPROGRESS,
  SIGN_OUT_SUCCESS,
} from './user.types';
import { postSignIn, postSignUp } from '../api/user';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

export const signIn = (values) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_INPROGRESS,
  });
  try {
    const { data } = await postSignIn(values);
    setAuthToken(data);
    const decoded_user = jwt_decode(data.token);

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user: decoded_user, token: data.token },
    });
  } catch (err) {
    alert(JSON.stringify(err.response.data));
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const signUp = (values) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_INPROGRESS,
  });
  try {
    const { data } = await postSignUp(values);
    setAuthToken(data);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
  } catch (err) {
    alert(JSON.stringify(err.response.data));
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_OUT_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGN_UP_FAILURE, err: err.response });
  }
};
