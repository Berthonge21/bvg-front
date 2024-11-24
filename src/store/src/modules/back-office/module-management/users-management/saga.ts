import APIS from '_store/src/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '_store/src/services/apiService';
import * as Constants from './constants';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

function* findAll(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USERS_MANAGEMENT.FIND_ALL;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.USERS_FIND_ALL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.USERS_FIND_ALL_FAILURE,
        payload: error.message || error,
      });
    }
  }
}

function* usersStats(): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USERS_MANAGEMENT.GET_STATS;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, null, token);
    yield put({
      type: Constants.USERS_PACKS_STATS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.USERS_PACKS_STATS_FAILURE,
        payload: error.message || error,
      });
    }
  }
}
function* schoolStats(): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USERS_MANAGEMENT.SCHOOLS_STATS;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, null, token);
    yield put({
      type: Constants.USERS_SCHOOL_STATS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.USERS_SCHOOL_STATS_FAILURE,
        payload: error.message || error,
      });
    }
  }
}

function* activeInactiveCount(): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().USERS_MANAGEMENT.GET_ACTIVE_INACTIVE_COUNT;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, null, token);
    yield put({
      type: Constants.USERS_ACTIVE_INACTIVE_COUNT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      handleApiError(error);
      yield put({
        type: Constants.USERS_ACTIVE_INACTIVE_COUNT_FAILURE,
        payload: error.message || error,
      });
    }
  }
}
export function* usersSagas(): Generator {
  yield takeLatest(Constants.USERS_FIND_ALL_REQUEST, findAll);
  yield takeLatest(Constants.USERS_PACKS_STATS, usersStats);
  yield takeLatest(Constants.USERS_SCHOOL_STATS, schoolStats);
  yield takeLatest(Constants.USERS_ACTIVE_INACTIVE_COUNT, activeInactiveCount);
}
