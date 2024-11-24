import * as Constants from './constants';

export interface ISchoolState {
  schoolId: string;
}

const initialState: ISchoolState = {
  schoolId: '',
};

const SchoolReducer = (state = initialState, action: any): ISchoolState => {
  switch (action.type) {
    case Constants.SCHOOL_SET_ID:
      return {
        ...state,
        schoolId: action.payload,
      };
    default:
      return state;
  }
};

export default SchoolReducer;
