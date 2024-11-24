import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

function* onboardUser(action: any): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().AUTH.SIGN_UP;
    const response = yield call(apiCall, apiConfig, action.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.ONBOARDING_PROCESS_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    handleApiError(error);
    yield put({
      type: Constants.ONBOARDING_PROCESS_ERROR,
      payload: error.message || 'Une erreur est survenue.',
    });
  }
}

export function* onboardingSaga() {
  yield takeLatest(Constants.SUBMIT_ONBOARDING_PROCESS, onboardUser);
}
