import * as Constants from './constants';
import { TYPES } from '_store/src';

export const getAllClassesRequestAction = (
  payload: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto,
) => ({
  type: Constants.CLASS_MANAGEMENT_FIND_ALL_REQUEST,
  payload,
});

export const createClassRequestAction = (
  payload: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto,
) => ({
  type: Constants.CLASS_MANAGEMENT_CREATE_REQUEST,
  payload,
});

export const updateClassRequestAction = (
  payload: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto,
) => ({
  type: Constants.CLASS_MANAGEMENT_UPDATE_REQUEST,
  payload,
});

export const deleteClassRequestAction = (
  payload: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto,
) => ({
  type: Constants.CLASS_MANAGEMENT_DELETE_REQUEST,
  payload,
});

export const clearAllActions = () => ({
  type: Constants.CLASS_MANAGEMENT_CLEAR_ACTION,
});

export const clearClassesList = () => ({
  type: Constants.CLASS_MANAGEMENT_CLEAR_CLASSES_LIST,
});
