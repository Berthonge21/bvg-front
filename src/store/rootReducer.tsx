import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authModuleInstance } from '_store/src/modules/common/auth';
import { onboardingModuleInstance } from '_store/src/modules/client/onboarding';
import { usersModuleInstance } from '_store/src/modules/back-office/module-management/users-management';
import { moduleManagementInstance } from '_store/src/modules/back-office/module-management';
import { packManagementInstance } from '_store/src/modules/back-office/pack-management';
import { classManagementInstance } from '_store/src/modules/client/class-management';
import { manageStudentModule } from '_store/src/modules/client/manage-student';
import { roleManagementInstance } from '_store/src/modules/client/role-management';
import { userPackManagementModuleInstance } from '_store/src/modules/client/user-pack-management';
import { collaboratorModuleInstance } from '_store/src/modules/client/collaborator-management';
import { bvgCommonModuleInstance } from '_store/src/modules/common/bvg-common';
import { schoolManagementInstance } from '_store/src/modules/client/school-management';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers<any>({
  [authModuleInstance.getRootKeyInStore()]: authModuleInstance.getReducers(),
  [onboardingModuleInstance.getRootKeyInStore()]:
    onboardingModuleInstance.getReducers(),
  [usersModuleInstance.getRootKeyInStore()]: usersModuleInstance.getReducers(),
  [moduleManagementInstance.getRootKeyInStore()]:
    moduleManagementInstance.getReducers(),
  [packManagementInstance.getRootKeyInStore()]:
    packManagementInstance.getReducers(),
  [classManagementInstance.getRootKeyInStore()]:
    classManagementInstance.getReducers(),
  [manageStudentModule.getRootKeyInStore()]: manageStudentModule.getReducers(),
  [roleManagementInstance.getRootKeyInStore()]:
    roleManagementInstance.getReducers(),
  [userPackManagementModuleInstance.getRootKeyInStore()]:
    userPackManagementModuleInstance.getReducers(),
  [collaboratorModuleInstance.getRootKeyInStore()]:
    collaboratorModuleInstance.getReducers(),
  [bvgCommonModuleInstance.getRootKeyInStore()]:
    bvgCommonModuleInstance.getReducers(),
  [schoolManagementInstance.getRootKeyInStore()]:
    schoolManagementInstance.getReducers(),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
