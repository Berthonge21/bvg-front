import { IStateModule } from '_store/src/main/types';
import * as Constant from './constants';
import { manageStudentSaga } from '_store/src/modules/client/manage-student/saga';
import ManageStudentReducer from '_store/src/modules/client/manage-student/reducer';

export class StudentManagement implements IStateModule {
  getRootKeyInStore(): string {
    return Constant.MANAGE_STUDENT_KEY_IN_STORE;
  }
  getSagas() {
    return manageStudentSaga();
  }
  getReducers() {
    return ManageStudentReducer;
  }
}

export const manageStudentModule = new StudentManagement();
