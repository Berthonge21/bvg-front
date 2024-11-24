import * as Constant from './constants';

export const getAuthUserSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.currentUser;

export const getIsLoggedInSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoggedIn;

export const getAuthLoadingSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoading ?? false;

export const getUpdatePasswordSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.updatePassword;

export const getUpdatePasswordFailureSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.updatePasswordFailure;

export const getForgotPasswordSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.forgotPassword;

export const getAuthErrorSelector = (state: any) =>
  state[Constant.AUTH_KEY_IN_STORE]?.error;

export const authSelector = (state: any) => state[Constant.AUTH_KEY_IN_STORE];
