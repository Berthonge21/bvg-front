import { TYPES } from '_store/src';
import * as Constants from './constants';

const initialState: TYPES.MODELS.PACKS.PacksState = {
  entityPacks: [],
  isLoadingPacks: false,
  addPackSuccess: false,
  updatePackSuccess: false,
  deletePackSuccess: false,
  error: null,
};

const PacksManagementReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.PACKS.PacksState => {
  switch (action.type) {
    case Constants.GET_ALL_PACKS:
      return {
        ...state,
        isLoadingPacks: true,
      };
    case Constants.GET_ALL_PACKS_SUCCESS:
      return {
        ...state,
        isLoadingPacks: false,
        entityPacks: action.payload,
      };
    case Constants.GET_ALL_PACKS_FAILED:
      return {
        ...state,
        isLoadingPacks: false,
        error: action.payload,
      };
    case Constants.GET_ONE_PACK:
      return {
        ...state,
        isLoadingPacks: true,
      };
    case Constants.GET_ONE_PACK_SUCCESS:
      return {
        ...state,
        isLoadingPacks: false,
        entityPacks: action.payload,
      };
    case Constants.GET_ONE_PACK_FAILED:
      return {
        ...state,
        isLoadingPacks: false,
        error: action.payload,
      };
    case Constants.CREATE_PACK:
      return {
        ...state,
        isLoadingPacks: true,
      };

    case Constants.CREATE_PACK_SUCCESS:
      return {
        ...state,
        isLoadingPacks: false,
        entityPacks: [],
        addPackSuccess: true,
      };

    case Constants.CREATE_PACK_FAILED:
      return {
        ...state,
        isLoadingPacks: false,
        addPackSuccess: false,
        error: action.payload,
      };
    case Constants.UPDATE_PACK:
      return {
        ...state,
        isLoadingPacks: true,
      };
    case Constants.UPDATE_PACK_SUCCESS:
      return {
        ...state,
        isLoadingPacks: false,
        updatePackSuccess: true,
      };
    case Constants.UPDATE_PACK_FAILED:
      return {
        ...state,
        isLoadingPacks: false,
        updatePackSuccess: false,
        error: action.payload,
      };
    case Constants.DELETE_PACK:
      return {
        ...state,
        isLoadingPacks: true,
      };
    case Constants.DELETE_PACK_SUCCESS:
      return {
        ...state,
        isLoadingPacks: false,
        deletePackSuccess: true,
      };
    case Constants.DELETE_PACK_FAILED:
      return {
        ...state,
        isLoadingPacks: false,
        deletePackSuccess: false,
        error: action.payload,
      };
    case Constants.CLEAR_ADD_PACKS:
      return {
        ...state,
        addPackSuccess: false,
        error: null,
      };
    case Constants.CLEAR_UPDATE_PACK:
      return {
        ...state,
        updatePackSuccess: false,
        error: null,
      };
    case Constants.CLEAR_DELETE_PACK:
      return {
        ...state,
        deletePackSuccess: false,
        error: null,
      };
    case Constants.CLEAR_PACKS_LIST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default PacksManagementReducer;
