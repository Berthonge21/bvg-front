import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { ToastStatus } from '_components/toast/model/toast';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

export function* getAllRoles(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MANAGE_ROLES.GET_ALL_ROLES;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.GET_ALL_ROLES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.GET_ALL_ROLES_FAILURE, payload: error });
  }
}

export function* createRole(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MANAGE_ROLES.CREATE_ROLE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_ROLE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.CREATE_ROLE_FAILURE, payload: error });
  }
}

export function* updateRole(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MANAGE_ROLES.UPDATE_ROLE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_ROLE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.UPDATE_ROLE_FAILURE, payload: error });
  }
}

export function* deleteRole(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MANAGE_ROLES.DELETE_ROLE;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.WARN);
    yield put({
      type: Constants.DELETE_ROLE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.DELETE_ROLE_FAILURE, payload: error });
  }
}

export function* manageRolesSaga() {
  yield takeLatest(Constants.GET_ALL_ROLES, getAllRoles);
  yield takeLatest(Constants.CREATE_ROLE, createRole);
  yield takeLatest(Constants.UPDATE_ROLE, updateRole);
  yield takeLatest(Constants.DELETE_ROLE, deleteRole);
}
