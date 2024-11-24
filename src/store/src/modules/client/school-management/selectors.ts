import * as Constants from './constants';

export const getSchoolId = (state: any) =>
  state[Constants.SCHOOL_KEY_IN_STORE].schoolId;
