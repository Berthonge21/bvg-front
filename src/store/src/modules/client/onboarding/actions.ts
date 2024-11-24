import * as Constant from './constants';
import { TYPES } from '../../../index';
import { OnboardingSubmitPayload } from '_store/src/types/models/onboarding';

export const startOnboarding = () => ({
  type: Constant.START_ONBOARDING_PROCESS,
});

export const submitOnboardingProcess = (
  payload: TYPES.MODELS.ONBOARDING.OnboardingSubmitPayload,
) => ({
  type: Constant.SUBMIT_ONBOARDING_PROCESS,
  payload,
});

export const setUserDataAction = (payload: TYPES.MODELS.ONBOARDING.IUser) => ({
  type: Constant.SET_DATA_USER,
  payload,
});

export const setSchoolUserDataAction = (
  payload: TYPES.MODELS.ONBOARDING.ISchoolInfo,
) => ({
  type: Constant.SET_DATA_SCHOOL,
  payload,
});

export const clearSetUserSchoolData = () => ({
  type: Constant.RESET_SET_DATA_SCHOOL,
});

export const clearSetUserData = () => ({
  type: Constant.RESET_SET_DATA_USER,
});

export const clearOnboardingProcess = () => ({
  type: Constant.CLEAR_ONBOARDING_PROCESS,
});
