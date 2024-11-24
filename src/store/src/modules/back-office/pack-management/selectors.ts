import * as Constant from './constants';

export const getIsLoadingPacks = (state: any): boolean =>
  state[Constant.PACKS_KEY_IN_STORE]?.isLoadingPacks ?? false;

export const getAllPackSelector = (state: any) =>
  state[Constant.PACKS_KEY_IN_STORE]?.entityPacks;

export const successAddPack = (state: any): boolean =>
  state[Constant.PACKS_KEY_IN_STORE]?.addPackSuccess ?? false;

export const successUpdatePack = (state: any): boolean =>
  state[Constant.PACKS_KEY_IN_STORE]?.updatePackSuccess ?? false;

export const successDeletePack = (state: any): boolean =>
  state[Constant.PACKS_KEY_IN_STORE]?.deletePackSuccess ?? false;

export const packsSelector = (state: any) => state[Constant.PACKS_KEY_IN_STORE];
