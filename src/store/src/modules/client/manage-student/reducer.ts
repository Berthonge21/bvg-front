import { TYPES } from '_store/src';
import * as Constants from './constants';

const initialState: TYPES.MODELS.STUDENTS.IStudentState = {
  entityStudent: [],
  transactionHistory: {
    content: [],
    createTransaction: false,
    updateTransaction: false,
  },
  isLoading: false,
  addStudent: false,
  updateStudent: false,
  deleteStudent: false,
  error: null,
};

const ManageStudentReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.STUDENTS.IStudentState => {
  switch (action.type) {
    case Constants.GET_ALL_STUDENT:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.GET_ALL_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityStudent: action.payload,
      };
    case Constants.GET_ALL_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CREATE_STUDENT:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityStudent: [],
        addStudent: true,
      };
    case Constants.CREATE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        addStudent: false,
        error: action.payload,
      };
    case Constants.UPDATE_STUDENT:
      return {
        ...state,
        isLoading: true,
        updateStudent: false,
      };
    case Constants.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateStudent: true,
      };
    case Constants.UPDATE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        updateStudent: false,
        error: action.payload,
      };
    case Constants.DELETE_STUDENT:
      return {
        ...state,
        isLoading: true,
        deleteStudent: false,
      };
    case Constants.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteStudent: true,
      };
    case Constants.DELETE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        deleteStudent: false,
        error: action.payload,
      };
    case Constants.GET_TRANSACTION_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactionHistory: action.payload,
      };
    case Constants.GET_TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CREATE_TRANSACTION:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
        },
      };
    case Constants.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          createTransaction: true,
        },
      };
    case Constants.CREATE_TRANSACTION_FAILURE:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          createTransaction: false,
        },
      };
    case Constants.UPDATE_TRANSACTION:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
        },
      };
    case Constants.UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          updateTransaction: true,
        },
      };
    case Constants.UPDATE_TRANSACTION_FAILURE:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          updateTransaction: false,
        },
      };
    case Constants.CLEAR_TRANSACTION_LIST:
      return {
        ...state,
        transactionHistory: {
          content: [],
          createTransaction: false,
          updateTransaction: false,
        },
      };
    case Constants.CLEAR_ALL_STUDENT:
      return {
        ...state,
        entityStudent: [],
        error: null,
      };
    case Constants.CLEAR_UPDATE_STUDENT:
      return {
        ...state,
        updateStudent: false,
        error: null,
      };
    case Constants.CLEAR_DELETE_STUDENT:
      return {
        ...state,
        deleteStudent: false,
        error: null,
      };
    case Constants.CLEAR_CREATE_STUDENT:
      return {
        ...state,
        addStudent: false,
        error: null,
      };
    default:
      return state;
  }
};

export default ManageStudentReducer;
