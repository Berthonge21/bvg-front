export const APP_ROUTES = {
  PUBLIC: {
    HOME: '/',
    FORGOT_PASSWORD: '/auth/forgot-password',
    FAQS: {
      LIST: '/public-private/faqs',
    },
    LEGAL_NOTICE: '/public-private/legal-notice',
    SECURITY_MENTION: '/public-private/security-mention',
    SIGN_UP: '/auth/register',
    SIGN_IN: '/auth/login',
  },
  PRIVATE: {
    BACK_OFFICE: {
      DASHBOARD: '/private/back-office/dashboard',
      MODULES: '/private/back-office/manage-modules',
      MODULES_ADD_EDIT: '/private/back-office/manage-modules/add-edit',
      OFFERS: '/private/back-office/manage-packs',
      OFFERS_ADD_EDIT: '/private/back-office/manage-packs/add-edit',
      MANAGE_USERS: '/private/back-office/manage-users',
      PROFILE: '/private/back-office/profile',
      HELP_CENTER: '/private/back-office/profile',
      SETTINGS: '/private/back-office/settings',
      LOG_OUT: '',
      NOTIFICATION: {
        LIST: '/private/back-office/notifications',
      },
    },
    CLIENT: {
      PRIVATE: '/',
      DASHBOARD: '/private/dashboard',
      MANAGE_STUDENTS: {
        LIST: '/private/manage-students',
        ADD_EDIT: '/private/manage-students/add-edit',
        TRANSACTION: {
          INFO: '/private/manage-students/transaction/info',
          ADD_EDIT: '/private/manage-students/transaction/add-edit',
        },
      },
      MANAGE_CLASSES: {
        LIST: '/private/manage-class',
        ADD_EDIT: '/private/manage-class/add-edit',
        DETAIL: '/private/manage-class/detail',
      },
      MANAGE_STAFF: {
        ADMIN: {
          LIST: '/private/manage-staff/administration',
          ADD_EDIT: '/private/manage-staff/administration/add-edit',
        },
        TEACHER: '/private/manage-staff/list/teacher',
        DETAIL: '/private/manage-staff/detail',
      },
    },
  },
};
