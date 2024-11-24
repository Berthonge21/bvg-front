import * as Constants from './constants';

export const setSchoolId = (schoolId: string) => ({
  type: Constants.SCHOOL_SET_ID,
  payload: schoolId,
});
