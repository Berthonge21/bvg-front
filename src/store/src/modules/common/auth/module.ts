import { IStateModule } from '../../../main/types';
import { AUTH_KEY_IN_STORE } from './constants';
import AuthReducer from './reducer';
import { authSagas } from '_store/src/modules/common/auth/saga';

export class AuthModule implements IStateModule {
  getRootKeyInStore(): string {
    return AUTH_KEY_IN_STORE;
  }
  getSagas() {
    return authSagas();
  }
  getReducers() {
    return AuthReducer;
  }
}

export const authModuleInstance = new AuthModule();
