import { RootState } from '_store/store';
import * as Constant from './constants';

export const startOnboardingSelector = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.startOnboarding;

export const stepOneSuccess = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.stepOneSuccess;

export const stepTwoSuccess = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.stepTwoSuccess;

export const isLoading = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.isLoading;

export const onboardingIsSuccess = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.isSuccess;

export const getCurrentUserSelector = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.currentUser;

export const getSchoolInfoSelector = (state: RootState) =>
  state[Constant.ONBOARDING_KEY_STORE]?.schoolInfo;

export const onboardingSelector = (state: any) =>
  state[Constant.ONBOARDING_KEY_STORE];
