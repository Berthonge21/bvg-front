import { IStateModule } from '_store/src/main/types';
import * as Constants from './constants';
import PacksManagementReducer from '_store/src/modules/back-office/pack-management/reducer';
import { packsManagementSagas } from '_store/src/modules/back-office/pack-management/saga';

export class PackManagement implements IStateModule {
  getRootKeyInStore(): string {
    return Constants.PACKS_KEY_IN_STORE;
  }

  getSagas(): any {
    return packsManagementSagas();
  }

  getReducers() {
    return PacksManagementReducer;
  }
}

export const packManagementInstance = new PackManagement();
