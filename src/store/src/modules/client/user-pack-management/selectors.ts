import * as Constant from './constants';

export const getUserPackManagementModuleSelector = (state: any) =>
  state[Constant.USER_PACK_KEY_IN_STORE]?.entityUserPack;

export const getUserPackManagementLoadingSelector = (state: any) =>
  state[Constant.USER_PACK_KEY_IN_STORE]?.isLoading;

export const userPackManagementRenewSuccessSelector = (state: any) =>
  state[Constant.USER_PACK_KEY_IN_STORE]?.isRenewSuccess;

export const userPackManagementPaySuccessSelector = (state: any) =>
  state[Constant.USER_PACK_KEY_IN_STORE]?.isPaySuccess;

export const userPackManagementSelector = (state: any) =>
  state[Constant.USER_PACK_KEY_IN_STORE];
