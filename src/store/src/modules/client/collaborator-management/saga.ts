import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

export function* getCollaborator(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().COLLABORATOR.GET_MY_COLLABORATOR;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.GET_ALL_COLLABORATORS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.GET_ALL_COLLABORATORS_FAILURE,
      payload: error,
    });
  }
}

export function* createCollaborator(
  action,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().COLLABORATOR.CREATE_COLLABORATOR;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_COLLABORATOR_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({
      type: Constants.CREATE_COLLABORATOR_FAILURE,
      payload: error,
    });
  }
}

export function* collaboratorSaga() {
  yield takeLatest(Constants.GET_ALL_COLLABORATORS, getCollaborator);
  yield takeLatest(Constants.CREATE_COLLABORATOR, createCollaborator);
}
