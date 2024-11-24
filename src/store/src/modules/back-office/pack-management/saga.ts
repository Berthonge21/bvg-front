import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { ToastStatus } from '_components/toast/model/toast';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

function* findAll(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().PACKS.GET_ALL_PACKS;
    const response = yield call(apiCall, apiConfig, action.payload);
    yield put({
      type: Constants.GET_ALL_PACKS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.GET_ALL_PACKS_FAILED,
        payload: error.message || error,
      });
    }
  }
}

function* getOnePackSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().PACKS.GET_ONE_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.GET_ONE_PACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.GET_ONE_PACK_FAILED,
        payload: error.message || error,
      });
    }
  }
}

function* createPackSaga(action: {
  type: string;
  payload: any;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().PACKS.CREATE_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_PACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.CREATE_PACK_FAILED,
        payload: error.message || error,
      });
    }
  }
}

function* updatePackSaga(action: {
  type: string;
  payload: any;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().PACKS.UPDATE_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_PACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.UPDATE_PACK_FAILED,
        payload: error.message || error,
      });
    }
  }
}

function* deletePackSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().PACKS.DELETE_PACK;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.WARN);
    yield put({
      type: Constants.DELETE_PACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.DELETE_PACK_FAILED,
        payload: error.message || error,
      });
    }
  }
}

export function* packsManagementSagas(): Generator {
  yield takeLatest(Constants.GET_ALL_PACKS, findAll);
  yield takeLatest(Constants.CREATE_PACK, createPackSaga);
  yield takeLatest(Constants.GET_ONE_PACK, getOnePackSaga);
  yield takeLatest(Constants.UPDATE_PACK, updatePackSaga);
  yield takeLatest(Constants.DELETE_PACK, deletePackSaga);
}
