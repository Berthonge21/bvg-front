import { IStateModule } from '../../../main/types';
import { MODULE_MANAGEMENT_KEY_IN_STORE } from './constants';
import ModuleManagementReducer from './reducer';
import { moduleManagementSaga } from '_store/src/modules/back-office/module-management/saga';

export class ModuleManagement implements IStateModule {
  getRootKeyInStore(): string {
    return MODULE_MANAGEMENT_KEY_IN_STORE;
  }
  getSagas() {
    return moduleManagementSaga();
  }
  getReducers() {
    return ModuleManagementReducer;
  }
}

export const moduleManagementInstance = new ModuleManagement();
