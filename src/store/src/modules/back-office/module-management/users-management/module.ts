import { IStateModule } from '_store/src/main/types';
import { USERS_KEY_IN_STORE } from './constants';
import UsersReducer from './reducer';
import { usersSagas } from './saga';

export class UserModule implements IStateModule {
  getRootKeyInStore(): string {
    return USERS_KEY_IN_STORE;
  }
  getSagas() {
    return usersSagas();
  }
  getReducers() {
    return UsersReducer;
  }
}

export const usersModuleInstance = new UserModule();
