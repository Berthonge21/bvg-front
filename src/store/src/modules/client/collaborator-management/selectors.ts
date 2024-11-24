import * as Constant from './constants';

export const getCollaboratorManagementModuleSelector = (state: any) =>
  state[Constant.COLLABORATOR_MANAGEMENT_KEY_IN_STORE]?.entityCollaborator;

export const getCollaboratorManagementLoadingSelector = (state: any) =>
  state[Constant.COLLABORATOR_MANAGEMENT_KEY_IN_STORE]?.isLoading;

export const addCollaborator = (state: any) =>
  state[Constant.COLLABORATOR_MANAGEMENT_KEY_IN_STORE]?.addCollaborator;

export const collaboratorManagementSelector = (state: any) =>
  state[Constant.COLLABORATOR_MANAGEMENT_KEY_IN_STORE];
