import { TYPES } from '_store/src';
import * as Constants from './constants';

export const getAllStudentRequestAction = (payload: any) => ({
  type: Constants.GET_ALL_STUDENT,
  payload,
});

export const createStudentRequestAction = (
  payload: TYPES.MODELS.STUDENTS.ICreateStudent,
) => ({
  type: Constants.CREATE_STUDENT,
  payload,
});

export const updateStudentRequestAction = (
  payload: TYPES.MODELS.STUDENTS.ICreateStudent,
) => ({
  type: Constants.UPDATE_STUDENT,
  payload,
});

export const deleteStudentRequestAction = payload => ({
  type: Constants.DELETE_STUDENT,
  payload,
});

export const getStudentByIdRequestAction = payload => ({
  type: Constants.GET_STUDENT_BY_ID,
  payload,
});

export const getTransactionHistoryRequestAction = (
  payload: TYPES.MODELS.STUDENTS.ITransactionHistory,
) => ({
  type: Constants.GET_TRANSACTION_LIST,
  payload,
});

export const createTransactionRequestAction = (
  payload: TYPES.MODELS.STUDENTS.ITransactionDto,
) => ({
  type: Constants.CREATE_TRANSACTION,
  payload,
});

export const updateTransactionRequestAction = (
  payload: TYPES.MODELS.STUDENTS.ITransactionDto,
) => ({
  type: Constants.UPDATE_TRANSACTION,
  payload,
});

export const clearTransactionRequestAction = () => ({
  type: Constants.CLEAR_TRANSACTION_LIST,
});
export const clearAllStudentRequestAction = () => ({
  type: Constants.CLEAR_ALL_STUDENT,
});

export const clearUpdateStudentRequestAction = () => ({
  type: Constants.CLEAR_UPDATE_STUDENT,
});

export const clearDeleteStudentRequestAction = () => ({
  type: Constants.CLEAR_DELETE_STUDENT,
});

export const clearAddStudentRequestAction = () => ({
  type: Constants.CLEAR_CREATE_STUDENT,
});
