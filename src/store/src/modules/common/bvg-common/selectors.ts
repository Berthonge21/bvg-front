import * as Constants from './constants';

export const getLoaderSelector = (state: any) =>
  state[Constants.BVG_COMMON_KEY_IN_STORE]?.showLoader;

export const commonBvgSelector = (state: any) =>
  state[Constants.BVG_COMMON_KEY_IN_STORE];
