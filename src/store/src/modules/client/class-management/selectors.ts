import * as Constant from './constants';

export const getClassManagementModuleSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE]?.entityClass;

export const getClassManagementLoadingSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE]?.isLoading;

export const classManagementCreateSuccessSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE]?.isCreateSuccess;

export const classManagementUpdateSuccessSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE]?.isUpdateSuccess;

export const classManagementDeleteSuccessSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE]?.isDeleteSuccess;

export const classManagementSelector = (state: any) =>
  state[Constant.CLASS_MANAGEMENT_KEY_IN_STORE];
