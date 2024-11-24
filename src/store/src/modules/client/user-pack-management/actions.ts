import * as Constants from './constants';
import { TYPES } from '_store/src';

export const userFindMyPackRequestAction = (
  payload: TYPES.MODELS.USER_PACK_MANAGEMENT.IUserPackDto,
) => ({
  type: Constants.USER_PACK_FIND_MY_PACK_REQUEST,
  payload,
});
