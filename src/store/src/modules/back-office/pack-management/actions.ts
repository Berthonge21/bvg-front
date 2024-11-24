import * as Constants from './constants';
import { TYPES } from '_store/src';

export const getAllPackRequestAction = () => ({
  type: Constants.GET_ALL_PACKS,
});

export const createPackRequestAction = (pack: TYPES.MODELS.PACKS.IPacks) => ({
  type: Constants.CREATE_PACK,
  payload: pack,
});

export const updatePackRequestAction = (
  payload: TYPES.MODELS.PACKS.IPacks,
) => ({
  type: Constants.UPDATE_PACK,
  payload,
});

export const getOnePackRequestAction = (
  payload: TYPES.MODELS.PACKS.IPacks,
) => ({
  type: Constants.GET_ONE_PACK,
  payload,
});

export const deletePackRequestAction = (
  payload: TYPES.MODELS.PACKS.IPacks,
) => ({
  type: Constants.DELETE_PACK,
  payload,
});

export const clearCreatePack = () => ({
  type: Constants.CLEAR_ADD_PACKS,
});

export const clearUpdatePack = () => ({
  type: Constants.CLEAR_UPDATE_PACK,
});

export const clearDeletePack = () => ({
  type: Constants.CLEAR_DELETE_PACK,
});

export const clearPacksList = () => ({
  type: Constants.CLEAR_PACKS_LIST,
});
