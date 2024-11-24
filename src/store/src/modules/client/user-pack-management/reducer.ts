import * as Constants from './constants';
import { TYPES } from '_store/src';

const initialState: TYPES.MODELS.USER_PACK_MANAGEMENT.IUserPackState = {
  entityUserPack: [],
  isLoading: false,
  isRenewSuccess: false,
  isPaySuccess: false,
  error: null,
};

export const UserPackManagementReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.USER_PACK_MANAGEMENT.IUserPackState => {
  switch (action.type) {
    case Constants.USER_PACK_FIND_MY_PACK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USER_PACK_FIND_MY_PACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityUserPack: action.payload,
      };
    case Constants.USER_PACK_FIND_MY_PACK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.USER_PACK_RENEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USER_PACK_RENEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRenewSuccess: true,
      };
    case Constants.USER_PACK_RENEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isRenewSuccess: false,
        error: action.payload,
      };
    case Constants.USER_PACK_PAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USER_PACK_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isPaySuccess: true,
      };
    case Constants.USER_PACK_PAY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isPaySuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UserPackManagementReducer;
