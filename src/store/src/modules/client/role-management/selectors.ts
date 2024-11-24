import * as Constant from './constants';

export const getRoleManagementModuleSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE]?.entityRole;

export const getRoleManagementLoadingSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE]?.isLoading;

export const roleManagementCreateSuccessSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE]?.createRole;

export const roleManagementUpdateSuccessSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE]?.updateRole;

export const roleManagementDeleteSuccessSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE]?.deleteRole;

export const roleManagementSelector = (state: any) =>
  state[Constant.ROLE_MANAGEMENT_KEY_IN_STORE];
