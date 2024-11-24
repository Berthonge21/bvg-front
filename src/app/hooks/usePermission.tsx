import { useSelector } from 'react-redux';
import { AuthModule } from '_store/src/modules';

interface IPermission {
  id: string;
  moduleId: string;
  canAccess: boolean;
  moduleName: string;
}

interface IFeaturePermission {
  id: string;
  featureId: string;
  canExecute: boolean;
  featureName: string;
}

interface ICurrentUser {
  permissions: IPermission[];
  permissionsFeatures: IFeaturePermission[];
}

interface IPermissionHooks {
  hasModuleAccess: (moduleName: string) => boolean;
  hasFeatureAccess: (moduleName: string, featureName: string) => boolean;
}

const usePermission = (): IPermissionHooks => {
  const currentUser: ICurrentUser | any = useSelector(
    AuthModule.selectors.getAuthUserSelector,
  );

  const permissions = currentUser?.permissions || [];
  const featurePermissions = currentUser?.permissionsFeatures || [];

  /**
   * Check if the user has access to the specified module
   * @param moduleName
   */
  function hasModuleAccess(moduleName: string) {
    return permissions.some(
      (perm: { moduleName: string; canAccess: any }) =>
        perm.moduleName === moduleName && perm.canAccess,
    );
  }

  /**
   * Check if the user has access to the specified feature
   * @param moduleName
   * @param featureName
   */
  function hasFeatureAccess(moduleName: string, featureName: string) {
    const module = permissions.find(
      (perm: { moduleName: string; canAccess: any }) =>
        perm.moduleName === moduleName && perm.canAccess,
    );
    if (module) {
      return featurePermissions.some(
        (perm: { featureName: string; canExecute: any }) =>
          perm.featureName === featureName && perm.canExecute,
      );
    }
    return false;
  }

  return { hasModuleAccess, hasFeatureAccess };
};

export default usePermission;
