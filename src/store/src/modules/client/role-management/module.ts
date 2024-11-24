import RoleManagementReducer from './reducer';
import { IStateModule } from '_store/src/main/types';
import * as Constants from './constants';
import { manageRolesSaga } from './saga';

export class RoleManagement implements IStateModule {
  getRootKeyInStore(): string {
    return Constants.ROLE_MANAGEMENT_KEY_IN_STORE;
  }

  getSagas() {
    return manageRolesSaga();
  }

  getReducers() {
    return RoleManagementReducer;
  }
}
export const roleManagementInstance = new RoleManagement();
