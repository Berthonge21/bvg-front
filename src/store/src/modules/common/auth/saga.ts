import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import {
  ForgotPasswordPayload,
  PasswordPayload,
} from '_store/src/types/models/auth';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

function* loginSaga(action: {
  type: string;
  payload: any;
}): Generator<any, void, ApiResponse<{ access_token: string; user: any }>> {
  try {
    const apiConfig = APIS().AUTH.SIGN_IN;
    const response: ApiResponse<{ access_token: string; user: any }> =
      yield call(apiCall, apiConfig, action.payload);
    const { access_token, user } = response;
    handleApiSuccess(response);
    yield put({
      type: Constants.AUTH_LOGIN_SUCCESS,
      payload: { access_token, user },
    });
    localStorage.setItem(Constants.STORAGE_CURRENT_USER, access_token);
  } catch (error: any) {
    handleApiError(error.response?.data || error);
    yield put({ type: Constants.AUTH_LOGIN_FAILURE, payload: error.message });
  }
}

function* logoutSaga() {
  try {
    localStorage.removeItem(Constants.STORAGE_CURRENT_USER);
    yield put({ type: Constants.AUTH_CLEAR_SESSION });
  } catch (error: any) {
    handleApiError(error);
    yield put({
      type: Constants.AUTH_CLEAR_SESSION_FAILURE,
      payload: error.message,
    });
  }
}

function* updatePasswordSaga(action: {
  type: string;
  payload: PasswordPayload;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().AUTH.UPDATE_PASSWORD;
    const response = yield call(apiCall, apiConfig, action.payload);
    yield put({
      type: Constants.AUTH_UPDATE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: Constants.AUTH_UPDATE_PASSWORD_FAILURE,
      payload: error.message,
    });
  }
}

function* forgotPasswordSaga(action: {
  type: string;
  payload: ForgotPasswordPayload;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().AUTH.FORGOT_PASSWORD;
    const response = yield call(apiCall, apiConfig, action.payload);
    yield put({
      type: Constants.AUTH_FORGOT_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: Constants.AUTH_FORGOT_PASSWORD_FAILURE,
      payload: error.message,
    });
  }
}

export function* authSagas(): Generator {
  yield takeLatest(Constants.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(Constants.AUTH_LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(Constants.AUTH_UPDATE_PASSWORD, updatePasswordSaga);
  yield takeLatest(Constants.AUTH_FORGOT_PASSWORD, forgotPasswordSaga);
}
