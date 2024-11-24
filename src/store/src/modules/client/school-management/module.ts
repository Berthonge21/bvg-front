import { IStateModule } from '_store/src/main/types';
import * as Constants from './constants';
import SchoolManagementReducer from './reducer';

export class SchoolManagement implements IStateModule {
  getRootKeyInStore(): string {
    return Constants.SCHOOL_KEY_IN_STORE;
  }
  getSagas() {
    return null;
  }
  getReducers() {
    return SchoolManagementReducer;
  }
}

export const schoolManagementInstance = new SchoolManagement();
