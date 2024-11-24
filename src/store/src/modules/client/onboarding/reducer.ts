import { TYPES } from '../../../index';
import * as Constants from './constants';

const initialState: TYPES.MODELS.ONBOARDING.OnboardingState = {
  currentUser: null,
  schoolInfo: null,
  isSuccess: false,
  isLoading: false,
  startOnboarding: false,
  stepOneSuccess: false,
  stepTwoSuccess: false,
  error: null,
};

const onboardingReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.ONBOARDING.OnboardingState => {
  switch (action.type) {
    case Constants.START_ONBOARDING_PROCESS:
      return {
        ...state,
        startOnboarding: true,
        error: null,
      };
    case Constants.SET_DATA_USER:
      return {
        ...state,
        currentUser: action.payload,
        stepOneSuccess: true,
      };
    case Constants.RESET_SET_DATA_USER:
      return {
        ...state,
        stepOneSuccess: false,
      };
    case Constants.SET_DATA_SCHOOL:
      return {
        ...state,
        schoolInfo: action.payload,
        stepTwoSuccess: true,
      };
    case Constants.RESET_SET_DATA_SCHOOL:
      return {
        ...state,
        stepTwoSuccess: false,
      };
    case Constants.ONBOARDING_PROCESS_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        startOnboarding: false,
        isLoading: false,
        error: null,
      };
    case Constants.SUBMIT_ONBOARDING_PROCESS:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: null,
      };
    case Constants.ONBOARDING_PROCESS_ERROR:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        isLoading: false,
      };
    case Constants.CLEAR_ONBOARDING_PROCESS:
      return initialState;
    default:
      return state;
  }
};

export default onboardingReducer;
