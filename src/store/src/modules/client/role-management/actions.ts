import * as Constants from './constants';
import {} from '_store/src';

export const getAllRolesRequestAction = (payload: any) => ({
  type: Constants.GET_ALL_ROLES,
  payload,
});

export const createRoleRequestAction = (payload: any) => ({
  type: Constants.CREATE_ROLE,
  payload,
});

export const updateRoleRequestAction = (payload: any) => ({
  type: Constants.UPDATE_ROLE,
  payload,
});

export const deleteRoleRequestAction = (payload: any) => ({
  type: Constants.DELETE_ROLE,
  payload,
});

export const clearAllRolesRequestAction = () => ({
  type: Constants.CLEAR_ALL_ROLES,
});
