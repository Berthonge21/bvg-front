import * as Constant from './constants';
import { TYPES } from '_store/src';

export const getCollaboratorRequestAction = (payload: any) => ({
  type: Constant.GET_ALL_COLLABORATORS,
  payload,
});

export const createCollaborator = (
  payload: TYPES.MODELS.COLLABORATOR.ICollaboratorDto,
) => ({
  type: Constant.CREATE_COLLABORATOR,
  payload,
});

export const clearAddCollaborator = () => ({
  type: Constant.COLLABORATOR_ADD_CLEAR,
});
