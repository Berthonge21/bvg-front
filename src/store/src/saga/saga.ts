import { all, fork } from 'redux-saga/effects';
import { authSagas } from '_store/src/modules/common/auth/saga';
import { moduleManagementSaga } from '_store/src/modules/back-office/module-management/saga';
import { onboardingSaga } from '_store/src/modules/client/onboarding/saga';
import { usersSagas } from '_store/src/modules/back-office/module-management/users-management/saga';
import { packsManagementSagas } from '_store/src/modules/back-office/pack-management/saga';
import { classManagementSaga } from '_store/src/modules/client/class-management/saga';
import { manageStudentSaga } from '_store/src/modules/client/manage-student/saga';
import { manageRolesSaga } from '_store/src/modules/client/role-management/saga';
import { userPackManagementSaga } from '_store/src/modules/client/user-pack-management/saga';
import { collaboratorSaga } from '_store/src/modules/client/collaborator-management/saga';

function* rootSagaWithErrorHandling(saga) {
  try {
    yield saga();
  } catch (error) {
    console.error('Saga error:', error);
  }
}

export default function* rootSaga() {
  yield all([
    fork(rootSagaWithErrorHandling, authSagas),
    fork(rootSagaWithErrorHandling, moduleManagementSaga),
    fork(rootSagaWithErrorHandling, onboardingSaga),
    fork(rootSagaWithErrorHandling, usersSagas),
    fork(rootSagaWithErrorHandling, packsManagementSagas),
    fork(rootSagaWithErrorHandling, classManagementSaga),
    fork(rootSagaWithErrorHandling, manageStudentSaga),
    fork(rootSagaWithErrorHandling, manageRolesSaga),
    fork(rootSagaWithErrorHandling, userPackManagementSaga),
    fork(rootSagaWithErrorHandling, collaboratorSaga),
  ]);
}
