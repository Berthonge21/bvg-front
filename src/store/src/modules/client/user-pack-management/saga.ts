import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { ToastStatus } from '_components/toast/model/toast';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

export function* getUserPackInfo(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USER_PACK_MANAGEMENT.GET_USER_PACK_INFO;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.USER_PACK_FIND_MY_PACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.USER_PACK_FIND_MY_PACK_FAILURE,
      payload: error,
    });
  }
}

export function* renewUserPack(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USER_PACK_MANAGEMENT.RENEW_USER_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.USER_PACK_RENEW_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.USER_PACK_RENEW_FAILURE, payload: error });
  }
}

export function* payUserPack(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USER_PACK_MANAGEMENT.PAY_USER_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.USER_PACK_PAY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.USER_PACK_PAY_FAILURE, payload: error });
  }
}

export function* userPackManagementSaga() {
  yield takeLatest(Constants.USER_PACK_FIND_MY_PACK_REQUEST, getUserPackInfo);
  yield takeLatest(Constants.USER_PACK_RENEW_REQUEST, renewUserPack);
  yield takeLatest(Constants.USER_PACK_PAY_REQUEST, payUserPack);
}
