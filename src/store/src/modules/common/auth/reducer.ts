import { TYPES } from '../../../index';
import * as Constants from './constants';

const initialState: TYPES.MODELS.AUTH.AuthState = {
  currentUser: null,
  isLoggedIn: false,
  isLoading: false,
  confirmPassword: null,
  updatePassword: null,
  updatePasswordFailure: null,
  forgotPassword: null,
  error: null,
};

const AuthReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.AUTH.AuthState => {
  switch (action.type) {
    case Constants.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Constants.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload.user,
      };
    case Constants.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Constants.AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case Constants.AUTH_CLEAR_SESSION:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      };

    case Constants.AUTH_UPDATE_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };

    case Constants.AUTH_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatePassword: action.payload,
      };

    case Constants.AUTH_UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        updatePasswordFailure: action.payload,
      };

    case Constants.AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };

    case Constants.AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        forgotPassword: action.payload,
      };

    case Constants.AUTH_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
