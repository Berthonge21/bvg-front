import { RootState } from '_store/store';
import * as Constant from './constants';

export const getAllStudents = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.entityStudent;

export const getTransactionHistory = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.transactionHistory;

export const createTransaction = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.transactionHistory
    ?.createTransaction;
export const studentListLoading = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.isLoading;

export const createStudentSuccess = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.addStudent;

export const updateSuccess = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.updateStudent;

export const deleteSuccess = (state: RootState) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE]?.deleteStudent;

export const studentSelector = (state: any) =>
  state[Constant.MANAGE_STUDENT_KEY_IN_STORE];
