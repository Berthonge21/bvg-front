import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { ToastStatus } from '_components/toast/model/toast';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

function* findAll(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MODULE_MANAGEMENT.FIND_ALL;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.MODULE_MANAGEMENT_FIND_ALL_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: Constants.MODULE_MANAGEMENT_FIND_ALL_FAILURE,
      payload: error.message || error,
    });
  }
}

function* findOne(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MODULE_MANAGEMENT.FIND_ONE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.MODULE_MANAGEMENT_FIND_ONE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.MODULE_MANAGEMENT_FIND_ONE_FAILURE,
      payload: error,
    });
  }
}

function* create(action: {
  type: string;
  payload: any;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MODULE_MANAGEMENT.CREATE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.MODULE_MANAGEMENT_CREATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.MODULE_MANAGEMENT_CREATE_FAILURE,
      payload: error,
    });
  }
}

function* update(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MODULE_MANAGEMENT.UPDATE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.MODULE_MANAGEMENT_UPDATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.MODULE_MANAGEMENT_UPDATE_FAILURE,
      payload: error,
    });
  }
}

function* deleteModule(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MODULE_MANAGEMENT.DELETE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.WARN);
    yield put({
      type: Constants.MODULE_MANAGEMENT_DELETE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.MODULE_MANAGEMENT_DELETE_FAILURE,
      payload: error,
    });
  }
}

export function* moduleManagementSaga(): Generator {
  yield takeLatest(Constants.MODULE_MANAGEMENT_FIND_ALL_REQUEST, findAll);
  yield takeLatest(Constants.MODULE_MANAGEMENT_FIND_ONE_REQUEST, findOne);
  yield takeLatest(Constants.MODULE_MANAGEMENT_CREATE_REQUEST, create);
  yield takeLatest(Constants.MODULE_MANAGEMENT_UPDATE_REQUEST, update);
  yield takeLatest(Constants.MODULE_MANAGEMENT_DELETE_REQUEST, deleteModule);
}
