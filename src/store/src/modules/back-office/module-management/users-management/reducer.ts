import { TYPES } from '../../../../index';
import * as Constants from './constants';

const initialState: TYPES.MODELS.USERS.IUserState = {
  entityUser: [],
  userStats: [],
  activeInactive: { activeUsers: 0, inactiveUsers: 0 },
  isLoading: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  isLoadingStats: false,
  isSchoolStatsLoading: false,
  isLoadingActiveInactive: false,
  schoolStats: [],
  errorStats: null,
  error: null,
};

const UsersReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.USERS.IUserState => {
  switch (action.type) {
    case Constants.USERS_FIND_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USERS_FIND_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityUser: action.payload,
      };
    case Constants.USERS_FIND_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.USERS_FIND_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USERS_FIND_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityUser: action.payload,
      };
    case Constants.USERS_FIND_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.USERS_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isCreateSuccess: false,
      };
    case Constants.USERS_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityUser: [],
        isCreateSuccess: true,
      };
    case Constants.USERS_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isCreateSuccess: false,
        error: action.payload,
      };
    case Constants.USERS_UPDATE_REQUEST:
      return {
        ...state,
        entityUser: action.payload,
        isLoading: true,
        isUpdateSuccess: false,
      };
    case Constants.USERS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: true,
      };
    case Constants.USERS_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isUpdateSuccess: false,
        error: action.payload,
      };
    case Constants.USERS_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDeleteSuccess: false,
      };
    case Constants.USERS_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
      };
    case Constants.USERS_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.USERS_CLEAR_LIST:
      return {
        ...state,
        entityUser: [],
        error: null,
      };
    case Constants.USERS_PACKS_STATS:
      return {
        ...state,
        isLoadingStats: true,
      };
    case Constants.USERS_PACKS_STATS_SUCCESS:
      return {
        ...state,
        isLoadingStats: false,
        userStats: action.payload,
      };
    case Constants.USERS_PACKS_STATS_FAILURE:
      return {
        ...state,
        isLoadingStats: false,
        errorStats: action.payload,
      };
    case Constants.USERS_SCHOOL_STATS:
      return {
        ...state,
        isSchoolStatsLoading: true,
      };
    case Constants.USERS_SCHOOL_STATS_SUCCESS:
      return {
        ...state,
        isSchoolStatsLoading: false,
        schoolStats: action.payload,
      };
    case Constants.USERS_SCHOOL_STATS_FAILURE:
      return {
        ...state,
        isSchoolStatsLoading: false,
        errorStats: action.payload,
      };
    case Constants.USERS_ACTIVE_INACTIVE_COUNT:
      return {
        ...state,
        isLoadingActiveInactive: true,
      };
    case Constants.USERS_ACTIVE_INACTIVE_COUNT_SUCCESS:
      return {
        ...state,
        isLoadingActiveInactive: false,
        activeInactive: action.payload,
      };
    case Constants.USERS_ACTIVE_INACTIVE_COUNT_FAILURE:
      return {
        ...state,
        isLoadingActiveInactive: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
