import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { ToastStatus } from '_components/toast/model/toast';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

export function* getAllClassesSaga(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().CLASS_MANAGEMENT.FIND_ALL;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.CLASS_MANAGEMENT_FIND_ALL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.CLASS_MANAGEMENT_FIND_ALL_FAILURE,
      payload: error,
    });
  }
}

export function* createClassSaga(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().CLASS_MANAGEMENT.CREATE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CLASS_MANAGEMENT_CREATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.CLASS_MANAGEMENT_CREATE_FAILURE,
      payload: error,
    });
  }
}

export function* updateClassSaga(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().CLASS_MANAGEMENT.UPDATE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.CLASS_MANAGEMENT_UPDATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.CLASS_MANAGEMENT_UPDATE_FAILURE,
      payload: error,
    });
  }
}

export function* deleteClassSaga(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().CLASS_MANAGEMENT.DELETE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.WARN);
    yield put({
      type: Constants.CLASS_MANAGEMENT_DELETE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.CLASS_MANAGEMENT_DELETE_FAILURE,
      payload: error,
    });
  }
}

export function* classManagementSaga() {
  yield takeLatest(
    Constants.CLASS_MANAGEMENT_FIND_ALL_REQUEST,
    getAllClassesSaga,
  );
  yield takeLatest(Constants.CLASS_MANAGEMENT_CREATE_REQUEST, createClassSaga);
  yield takeLatest(Constants.CLASS_MANAGEMENT_UPDATE_REQUEST, updateClassSaga);
  yield takeLatest(Constants.CLASS_MANAGEMENT_DELETE_REQUEST, deleteClassSaga);
}
