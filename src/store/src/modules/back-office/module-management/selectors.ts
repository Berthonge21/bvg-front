import * as Constant from './constants';

export const getModuleManagementModuleSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE]?.entityModule;

export const getModuleManagementLoadingSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE]?.isLoading;

export const moduleManagementCreateSuccessSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE]?.isCreateSuccess;

export const moduleManagementUpdateSuccessSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE]?.isUpdateSuccess;

export const moduleManagementDeleteSuccessSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE]?.isDeleteSuccess;

export const moduleManagementSelector = (state: any) =>
  state[Constant.MODULE_MANAGEMENT_KEY_IN_STORE];
