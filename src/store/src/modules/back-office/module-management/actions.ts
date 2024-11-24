import * as Constants from './constants';
import { CreateModuleDto, ModuleDto } from '../../../types/models/module';

export const moduleManagementFindAllRequestAction = (payload: any) => ({
  type: Constants.MODULE_MANAGEMENT_FIND_ALL_REQUEST,
  payload,
});

export const moduleManagementClearList = () => ({
  type: Constants.MODULE_MANAGEMENT_CLEAR_LIST,
});

export const moduleManagementClearCreateModule = () => ({
  type: Constants.MODULE_MANAGEMENT_CLEAR_ADD_MODULE,
});

export const moduleManagementClearUpdateModule = () => ({
  type: Constants.MODULE_MANAGEMENT_CLEAR_UPDATE_MODULE,
});

export const moduleManagementClearDeleteModule = () => ({
  type: Constants.MODULE_MANAGEMENT_CLEAR_DELETE_MODULE,
});

export const moduleManagementFindByIdRequestAction = (payload: ModuleDto) => ({
  type: Constants.MODULE_MANAGEMENT_FIND_ONE_REQUEST,
  payload,
});

export const moduleManagementCreateRequestAction = (
  payload: CreateModuleDto,
) => ({
  type: Constants.MODULE_MANAGEMENT_CREATE_REQUEST,
  payload,
});

export const moduleManagementUpdateRequestAction = (payload: any) => ({
  type: Constants.MODULE_MANAGEMENT_UPDATE_REQUEST,
  payload,
});

export const moduleManagementDeleteRequestAction = (payload: any) => ({
  type: Constants.MODULE_MANAGEMENT_DELETE_REQUEST,
  payload,
});
