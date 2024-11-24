import { IStateModule } from '_store/src/main/types';
import * as Constants from './constants';
import UserPackManagementReducer from '_store/src/modules/client/user-pack-management/reducer';
import { userPackManagementSaga } from '_store/src/modules/client/user-pack-management/saga';

export class UserPackManagementModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constants.USER_PACK_KEY_IN_STORE;
  }
  getReducers() {
    return UserPackManagementReducer;
  }
  getSagas() {
    return userPackManagementSaga;
  }
}

export const userPackManagementModuleInstance = new UserPackManagementModule();
