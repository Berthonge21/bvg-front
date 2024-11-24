import { ILink } from './types';
import {
  HomeIcon,
  UserIcon,
  NewPaperIcon,
  UserGroup,
  HelpCenterIcon,
  SettingsIcon,
  ModuleIcon,
  GraduationIcon,
  SchoolIcon,
} from '_assets/svg';
import { UTILS } from '_store/src';
import { APP_ROUTES } from '_/app/config/routes';

export const adminMenu: ILink[] = [
  {
    icon: HomeIcon,
    label: 'SIDE_BAR.DASHBOARD',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.DASHBOARD,
  },
  {
    icon: ModuleIcon,
    label: 'SIDE_BAR.MANAGE_MODULE',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.MODULES,
  },
  {
    icon: NewPaperIcon,
    label: 'SIDE_BAR.MANAGE_OFFERS',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.OFFERS,
  },
  {
    icon: UserGroup,
    label: 'SIDE_BAR.MANAGE_USERS',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.MANAGE_USERS,
  },
  {
    icon: UserIcon,
    label: 'SIDE_BAR.PROFILE',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.PROFILE,
  },
  {
    icon: HelpCenterIcon,
    label: 'SIDE_BAR.HELP_CENTER',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.HELP_CENTER,
  },
  {
    icon: SettingsIcon,
    label: 'SIDE_BAR.SETTINGS',
    path: APP_ROUTES.PRIVATE.BACK_OFFICE.SETTINGS,
  },
];

export const clientMenu: ILink[] = [
  {
    icon: HomeIcon,
    label: 'SIDE_BAR.DASHBOARD',
    path: APP_ROUTES.PRIVATE.CLIENT.DASHBOARD,
  },
  {
    icon: GraduationIcon,
    label: 'SIDE_BAR.MANAGE_STUDENTS',
    path: APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.LIST,
    menuKey:
      UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS.name,
  },
  {
    icon: SchoolIcon,
    label: 'SIDE_BAR.MANAGE_CLASSES',
    path: APP_ROUTES.PRIVATE.CLIENT.MANAGE_CLASSES.LIST,
  },
  {
    icon: UserGroup,
    label: 'SIDE_BAR.MANAGE_USERS',
    path: APP_ROUTES.PRIVATE.CLIENT.PRIVATE,
    menuKey: UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STAFF.name,
    subItems: [
      {
        label: 'SIDE_BAR.MANAGE_ADMIN',
        path: APP_ROUTES.PRIVATE.CLIENT.MANAGE_STAFF.ADMIN.LIST,
        permissionSubLink:
          UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STAFF
            .LIST_STAFF,
      },
      {
        label: 'SIDE_BAR.MANAGE_STAFF',
        path: APP_ROUTES.PRIVATE.CLIENT.MANAGE_STAFF.TEACHER,
        permissionSubLink:
          UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STAFF
            .LIST_STAFF,
      },
    ],
  },
];
