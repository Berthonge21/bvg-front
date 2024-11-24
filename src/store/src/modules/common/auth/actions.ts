import {
  AuthErrorPayload,
  ForgotPasswordPayload,
  PasswordPayload,
} from '../../../types/models/auth';
import * as Constants from './constants';

export const authLoginRequestAction = (payload: any) => ({
  type: Constants.AUTH_LOGIN_REQUEST,
  payload,
});

export const authLoginErrorAction = (payload: AuthErrorPayload) => ({
  type: Constants.AUTH_LOGIN_FAILURE,
  payload,
});

export const authLogoutRequestAction = () => ({
  type: Constants.AUTH_LOGOUT_REQUEST,
});

export const authClearSessionAction = () => ({
  type: Constants.AUTH_CLEAR_SESSION,
});

export const confirmUserPassword = () => ({
  type: Constants.AUTH_CONFIRM_PASSWORD,
});

export const confirmPasswordSuccess = (payload: PasswordPayload) => ({
  type: Constants.AUTH_CONFIRM_PASSWORD_SUCCESS,
  payload,
});

export const confirmPasswordFailure = (payload: any) => ({
  type: Constants.AUTH_CONFIRM_PASSWORD_FAILURE,
  payload,
});

export const updatePassword = (payload: PasswordPayload) => ({
  type: Constants.AUTH_UPDATE_PASSWORD,
  payload,
});

export const updatePasswordSuccess = (payload: any) => ({
  type: Constants.AUTH_UPDATE_PASSWORD_SUCCESS,
  payload,
});

export const updatePasswordFailure = (payload: any) => ({
  type: Constants.AUTH_UPDATE_PASSWORD_FAILURE,
  payload,
});

export const forgotPassword = (payload: ForgotPasswordPayload) => ({
  type: Constants.AUTH_FORGOT_PASSWORD,
  payload,
});

export const forgotPasswordSuccess = (payload: any) => ({
  type: Constants.AUTH_FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailure = (payload: any) => ({
  type: Constants.AUTH_FORGOT_PASSWORD_FAILURE,
  payload,
});
