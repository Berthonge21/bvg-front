import { IStateModule } from '_store/src/main/types';
import * as Constants from './constants';
import CollaboratorReducer from '_store/src/modules/client/collaborator-management/reducer';
import { collaboratorSaga } from '_store/src/modules/client/collaborator-management/saga';

export class CollaboratorManagementModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constants.COLLABORATOR_MANAGEMENT_KEY_IN_STORE;
  }
  getReducers() {
    return CollaboratorReducer;
  }
  getSagas() {
    return collaboratorSaga;
  }
}

export const collaboratorModuleInstance = new CollaboratorManagementModule();
