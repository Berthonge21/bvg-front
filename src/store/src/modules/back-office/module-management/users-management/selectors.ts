import { RootState } from '_store/store';
import * as CONSTANTS from './constants';

export const getAllUsersSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.entityUser;

export const getAllUsersLoadingSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isLoading;

export const getAllUsersSuccessSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isCreateSuccess;

export const getAllUsersFailureSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isDeleteSuccess;

export const getAllUsersResetSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isDeleteSuccess;

export const userStatsSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.userStats;

export const getUserStatsLoadingSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isLoadingStats;

export const geSchoolStatsLoadingSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isSchoolStatsLoading;

export const getActiveInactiveCountLoadingSelector = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.isLoadingActiveInactive;

export const getInactiveUsers = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.activeInactive?.inactiveUsers;
export const getActiveUsers = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.activeInactive?.activeUsers;

export const getSchoolsStats = (state: RootState) =>
  state[CONSTANTS.USERS_KEY_IN_STORE]?.schoolStats;

export const usersSelector = (state: any) =>
  state[CONSTANTS.USERS_KEY_IN_STORE];
