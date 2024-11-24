import { authModuleInstance } from '../modules/common/auth';
import { moduleManagementInstance } from '../modules/back-office/module-management';
import { onboardingModuleInstance } from '../modules/client/onboarding';
import { usersModuleInstance } from '../modules/back-office/module-management/users-management';
import { packManagementInstance } from '../modules/back-office/pack-management';

export const getActiveModules = () => {
  let activeModules = {
    ...authModuleInstance.getReducers(),
    ...moduleManagementInstance.getReducers(),
    ...onboardingModuleInstance.getReducers(),
    ...usersModuleInstance.getReducers(),
    ...packManagementInstance.getReducers(),
  };

  /*
   * Function to get active modules based on the environment
   */

  if (process.env.NODE_ENV === 'development') {
    activeModules = {
      ...activeModules,
    };
  }

  return activeModules;
};
