import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { ToastStatus } from '_components/toast/model/toast';
import { getTokenOrThrow } from '_utils/check.token.utils';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import { ApiResponse } from '_store/src/types/models/api.response';

export function* getAllStudents(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.GET_ALL_STUDENTS;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.GET_ALL_STUDENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.GET_ALL_STUDENT_FAILURE, payload: error });
  }
}

export function* createStudent(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.CREATE_STUDENT;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_STUDENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.CREATE_STUDENT_FAILURE, payload: error });
  }
}

export function* updateStudent(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.UPDATE_STUDENT;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_STUDENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.UPDATE_STUDENT_FAILURE, payload: error });
  }
}

export function* deleteStudent(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.DELETE_STUDENT;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.WARN);
    yield put({
      type: Constants.DELETE_STUDENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.DELETE_STUDENT_FAILURE, payload: error });
  }
}

export function* getTransactionHistory(
  action: any,
): Generator<any, void, ApiResponse<any>> {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.GET_TRANSACTION_LIST;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    yield put({
      type: Constants.GET_TRANSACTION_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.GET_TRANSACTION_LIST_FAILURE, payload: error });
  }
}
export function* createTransaction(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.CREATE_TRANSACTION;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_TRANSACTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.CREATE_TRANSACTION_FAILURE, payload: error });
  }
}

export function* updateTransaction(action: any) {
  try {
    const apiConfig = APIS().MANAGE_STUDENT.UPDATE_TRANSACTION;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, action.payload, token);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_TRANSACTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    handleApiError(error);
    yield put({ type: Constants.UPDATE_TRANSACTION_FAILURE, payload: error });
  }
}

export function* manageStudentSaga() {
  yield takeLatest(Constants.GET_ALL_STUDENT, getAllStudents);
  yield takeLatest(Constants.CREATE_STUDENT, createStudent);
  yield takeLatest(Constants.UPDATE_STUDENT, updateStudent);
  yield takeLatest(Constants.DELETE_STUDENT, deleteStudent);
  yield takeLatest(Constants.GET_TRANSACTION_LIST, getTransactionHistory);
  yield takeLatest(Constants.CREATE_TRANSACTION, createTransaction);
  yield takeLatest(Constants.UPDATE_TRANSACTION, updateTransaction);
}
