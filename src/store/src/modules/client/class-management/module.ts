import { IStateModule } from '_store/src/main/types';
import { CLASS_MANAGEMENT_KEY_IN_STORE } from './constants';
import { classManagementSaga } from '_store/src/modules/client/class-management/saga';
import ClassManagementReducer from '_store/src/modules/client/class-management/reducers';

export class ClassManagement implements IStateModule {
  getRootKeyInStore(): string {
    return CLASS_MANAGEMENT_KEY_IN_STORE;
  }
  getSagas() {
    return classManagementSaga();
  }
  getReducers() {
    return ClassManagementReducer;
  }
}

export const classManagementInstance = new ClassManagement();
