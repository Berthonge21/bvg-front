import * as Constants from './constants';
import { TYPES } from '_store/src';

const initialState: TYPES.MODELS.ROLE_MANAGEMENT.IRoleState = {
  entityRole: [],
  isLoading: false,
  createRole: false,
  updateRole: false,
  deleteRole: false,
  error: null,
};

const RoleManagementReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.ROLE_MANAGEMENT.IRoleState => {
  switch (action.type) {
    case Constants.GET_ALL_ROLES:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityRole: action.payload,
      };
    case Constants.GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CREATE_ROLE:
      return {
        ...state,
        createRole: false,
      };
    case Constants.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        createRole: true,
      };
    case Constants.CREATE_ROLE_FAILURE:
      return {
        ...state,
        createRole: false,
        error: action.payload,
      };
    case Constants.UPDATE_ROLE:
      return {
        ...state,
        updateRole: false,
      };
    case Constants.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updateRole: true,
      };
    case Constants.UPDATE_ROLE_FAILURE:
      return {
        ...state,
        updateRole: false,
        error: action.payload,
      };
    case Constants.DELETE_ROLE:
      return {
        ...state,
        deleteRole: false,
      };
    case Constants.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleteRole: true,
      };
    case Constants.DELETE_ROLE_FAILURE:
      return {
        ...state,
        deleteRole: false,
        error: action.payload,
      };
    case Constants.CLEAR_ALL_ROLES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default RoleManagementReducer;
