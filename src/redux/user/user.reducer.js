import {
  SIGN_IN_INPROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS,
  // SIGN_IN_SUCCESS,
  // SIGN_IN_FAILURE,
} from './user.types';

const initialState = {
  user: null,
  token: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_INPROGRESS:
      return {
        ...state,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

export default usersReducer;
