type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type APIObjectType = {
  url: string;
  method: MethodType;
  responseType?: string;
};
export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
};
type PathBaseKeys = keyof typeof API_BASIC_URL;
export enum PlatformType {
  WEB = 'WEB',
}
const API_BASIC_URL_MAP: Record<PlatformType, typeof API_BASIC_URL> = {
  [PlatformType.WEB]: API_BASIC_URL,
};
type ApiActionProps = {
  pathBase?: PathBaseKeys;
  path: string;
  method: MethodType;
  platformType?: PlatformType;
  baseUrl?: string;
  responseType?: string;
};

const createApiAction = ({
  pathBase = 'SECURED_API',
  method,
  path,
  platformType = PlatformType.WEB,
  baseUrl = 'https://bvg-saas-backend-staging.up.railway.app/_api',
  responseType,
}: ApiActionProps): APIObjectType => {
  const url = baseUrl?.concat(
    ...[API_BASIC_URL_MAP[platformType][pathBase], path],
  );
  return {
    url,
    method,
    responseType,
  };
};

const APIS = (
  platformType: PlatformType = PlatformType.WEB,
  baseUrl?: string,
) => {
  return {
    AUTH: {
      SIGN_IN: createApiAction({
        pathBase: 'SECURED_API',
        path: '/auth/login',
        method: 'POST',
        baseUrl,
      }),
      SIGN_UP: createApiAction({
        pathBase: 'SECURED_API',
        path: '/auth/onboarding',
        method: 'POST',
        baseUrl,
      }),
      FORGOT_PASSWORD: createApiAction({
        pathBase: 'SECURED_API',
        path: '/auth-forgotPassword',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_PASSWORD: createApiAction({
        pathBase: 'SECURED_API',
        path: '/auth-updatePassword',
        method: 'POST',
        baseUrl,
      }),
      GET_TERMS_AND_CONDITIONS: createApiAction({
        pathBase: 'UNSECURED_API',
        platformType,
        path: 'legal-notice',
        method: 'GET',
        baseUrl,
      }),
      GET_SECURITY_MENTION: createApiAction({
        pathBase: 'UNSECURED_API',
        platformType,
        path: 'security-mention',
        method: 'GET',
        baseUrl,
      }),
    },
    PACKS: {
      GET_ALL_PACKS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs',
        method: 'GET',
        baseUrl,
      }),
      CREATE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/create-pack',
        method: 'POST',
        baseUrl,
      }),
      GET_ONE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/find-pack',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/update-pack',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/delete-pack',
        method: 'DELETE',
        baseUrl,
      }),
    },
    MODULE_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules',
        method: 'POST',
        baseUrl,
      }),
      FIND_ONE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/find-module',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/create-module',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/update-module',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/delete-module',
        method: 'DELETE',
        baseUrl,
      }),
    },
    USERS_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users',
        method: 'POST',
        baseUrl,
      }),
      FIND_ONE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/find-user',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/create-user',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/update-user',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/delete-user',
        method: 'DELETE',
        baseUrl,
      }),
      GET_STATS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/get-user-subscription-packs',
        method: 'GET',
        baseUrl,
      }),
      GET_ACTIVE_INACTIVE_COUNT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/get-user-active-inactive-count',
        method: 'GET',
        baseUrl,
      }),
      SCHOOLS_STATS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/schools/schools-stats',
        method: 'GET',
        baseUrl,
      }),
    },
    CLASS_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/create-class',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/update-class',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/delete-class',
        method: 'DELETE',
        baseUrl,
      }),
    },
    MANAGE_STUDENT: {
      GET_ALL_STUDENTS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management',
        method: 'POST',
        baseUrl,
      }),
      CREATE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/create-student',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/update-student',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/delete-student',
        method: 'DELETE',
        baseUrl,
      }),
      GET_TRANSACTION_LIST: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/get-transaction',
        method: 'POST',
        baseUrl,
      }),
      CREATE_TRANSACTION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/create-transaction',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_TRANSACTION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/update-transaction',
        method: 'POST',
        baseUrl,
      }),
    },
    MANAGE_ROLES: {
      GET_ALL_ROLES: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles',
        method: 'POST',
        baseUrl,
      }),
      CREATE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/create-role',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/update-role',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/delete-role',
        method: 'DELETE',
        baseUrl,
      }),
    },
    USER_PACK_MANAGEMENT: {
      GET_USER_PACK_INFO: createApiAction({
        pathBase: 'SECURED_API',
        path: '/user-pack-module/get-user-pack-info',
        method: 'POST',
        baseUrl,
      }),
      RENEW_USER_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/user-pack-management/renew-user-pack',
        method: 'POST',
        baseUrl,
      }),
      PAY_USER_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/user-pack-management/pay-user-pack',
        method: 'POST',
        baseUrl,
      }),
    },
    COLLABORATOR: {
      GET_MY_COLLABORATOR: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/get-all-collaborator',
        method: 'GET',
        baseUrl,
      }),
      CREATE_COLLABORATOR: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/create-new-collaborator',
        method: 'POST',
        baseUrl,
      }),
    },
  };
};

export default APIS;
