import * as Constants from './constants';
import { TYPES } from '_store/src';

const initialState: TYPES.MODELS.COMMON_TYPES.BvgCommonState = {
  showLoader: false,
};

const BVGCommonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Constants.SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      };
    case Constants.HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    default:
      return state;
  }
};

export default BVGCommonReducer;
