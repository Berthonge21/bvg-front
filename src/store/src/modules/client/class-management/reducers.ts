import * as Constants from './constants';
import { TYPES } from '_store/src';

export const initialState: TYPES.MODELS.CLASS_MANAGEMENT.IClassState = {
  entityClass: [],
  isLoading: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  error: null,
};

export const ClassManagementReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Constants.CLASS_MANAGEMENT_FIND_ALL_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_FIND_ALL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        entityClass: action.payload,
      };
    }
    case Constants.CLASS_MANAGEMENT_FIND_ALL_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case Constants.CLASS_MANAGEMENT_CREATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isCreateSuccess: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_CREATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isCreateSuccess: false,
        error: action.payload,
      };
    }
    case Constants.CLASS_MANAGEMENT_UPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_UPDATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: false,
        error: action.payload,
      };
    }
    case Constants.CLASS_MANAGEMENT_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_DELETE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
        error: null,
      };
    }
    case Constants.CLASS_MANAGEMENT_DELETE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: false,
        error: action.payload,
      };
    }
    case Constants.CLASS_MANAGEMENT_CLEAR_ACTION: {
      return {
        ...state,
        isCreateSuccess: false,
        isUpdateSuccess: false,
        isDeleteSuccess: false,
      };
    }
    case Constants.CLASS_MANAGEMENT_CLEAR_CLASSES_LIST: {
      return {
        ...state,
        entityClass: [],
      };
    }
    default:
      return state;
  }
};

export default ClassManagementReducer;
