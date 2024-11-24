import { IStateModule } from '../../../main/types';
import { ONBOARDING_KEY_STORE } from './constants';
import OnboardingReducer from './reducer';
import { onboardingSaga } from '_store/src/modules/client/onboarding/saga';

export class OnboardingUser implements IStateModule {
  getRootKeyInStore(): string {
    return ONBOARDING_KEY_STORE;
  }
  getSagas() {
    return onboardingSaga();
  }
  getReducers() {
    return OnboardingReducer;
  }
}

export const onboardingModuleInstance = new OnboardingUser();
