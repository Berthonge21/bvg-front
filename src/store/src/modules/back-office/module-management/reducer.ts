import { TYPES } from '../../../index';
import * as Constants from './constants';

const initialState: TYPES.MODELS.MODULE_MANAGEMENT.ModuleManagementState = {
  entityModule: [],
  isLoading: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

const ModuleManagementReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.MODULE_MANAGEMENT.ModuleManagementState => {
  switch (action.type) {
    case Constants.MODULE_MANAGEMENT_FIND_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.MODULE_MANAGEMENT_FIND_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityModule: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_FIND_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_FIND_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.MODULE_MANAGEMENT_FIND_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityModule: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_FIND_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isCreateSuccess: false,
      };
    case Constants.MODULE_MANAGEMENT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityModule: [],
        isCreateSuccess: true,
      };
    case Constants.MODULE_MANAGEMENT_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isCreateSuccess: false,
        error: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_UPDATE_REQUEST:
      return {
        ...state,
        entityModule: action.payload,
        isLoading: true,
        isUpdateSuccess: false,
      };
    case Constants.MODULE_MANAGEMENT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: true,
      };
    case Constants.MODULE_MANAGEMENT_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: false,
        error: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDeleteSuccess: false,
      };
    case Constants.MODULE_MANAGEMENT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
      };
    case Constants.MODULE_MANAGEMENT_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.MODULE_MANAGEMENT_CLEAR_LIST:
      return {
        ...state,
        entityModule: [],
      };
    case Constants.MODULE_MANAGEMENT_CLEAR_ADD_MODULE:
      return {
        ...state,
        isCreateSuccess: false,
      };
    case Constants.MODULE_MANAGEMENT_CLEAR_UPDATE_MODULE:
      return {
        ...state,
        isUpdateSuccess: false,
      };
    case Constants.MODULE_MANAGEMENT_CLEAR_DELETE_MODULE:
      return {
        ...state,
        isDeleteSuccess: false,
      };
    default:
      return state;
  }
};

export default ModuleManagementReducer;
