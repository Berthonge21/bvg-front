import { TYPES } from '_store/src';
import * as Constants from './constants';

export const usersFindAllRequestAction = (
  payload: TYPES.MODELS.USERS.IUserGetList,
) => ({
  type: Constants.USERS_FIND_ALL_REQUEST,
  payload,
});

export const usersFindAllSuccessAction = (payload: any) => ({
  type: Constants.USERS_FIND_ALL_SUCCESS,
  payload,
});

export const usersFindOneRequestAction = (payload: any) => ({
  type: Constants.USERS_FIND_ONE_REQUEST,
  payload,
});

export const usersFindOneSuccessAction = (payload: any) => ({
  type: Constants.USERS_FIND_ONE_SUCCESS,
  payload,
});

export const usersCreateRequestAction = (payload: any) => ({
  type: Constants.USERS_CREATE_REQUEST,
  payload,
});

export const usersCreateSuccessAction = (payload: any) => ({
  type: Constants.USERS_CREATE_SUCCESS,
  payload,
});

export const usersUpdateRequestAction = (payload: any) => ({
  type: Constants.USERS_UPDATE_REQUEST,
  payload,
});

export const usersUpdateSuccessAction = (payload: any) => ({
  type: Constants.USERS_UPDATE_SUCCESS,
  payload,
});

export const usersDeleteRequestAction = (payload: any) => ({
  type: Constants.USERS_DELETE_REQUEST,
  payload,
});

export const usersDeleteSuccessAction = (payload: any) => ({
  type: Constants.USERS_DELETE_SUCCESS,
  payload,
});

export const usersClearList = () => ({
  type: Constants.USERS_CLEAR_LIST,
});

export const getUserPackInfo = (payload: any) => ({
  type: Constants.USERS_GET_USER_PACK_INFO,
  payload,
});

export const usersStatsRequestAction = () => ({
  type: Constants.USERS_PACKS_STATS,
});

export const usersStatsSchoolsAction = () => ({
  type: Constants.USERS_SCHOOL_STATS,
});

export const usersActiveInactiveCountRequestAction = () => ({
  type: Constants.USERS_ACTIVE_INACTIVE_COUNT,
});
// export const usersClearCreateUser = () => ({
//   type: Constants.USERS_CLEAR_ADD_USER,
// });
//
// export const usersClearUpdateUser = () => ({
//   type: Constants.USERS_CLEAR_UPDATE_USER,
// });
//
// export const usersClearDeleteUser = () => ({
//   type: Constants.USERS_CLEAR_DELETE_USER,
// });
