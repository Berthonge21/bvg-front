import { TYPES } from '_store/src';
import * as Constant from './constants';

const initialState: TYPES.MODELS.COLLABORATOR.ICollaboratorState = {
  entityCollaborator: [],
  addCollaborator: false,
  isLoading: false,
  error: null,
};

const CollaboratorReducer = (
  state = initialState,
  action: any,
): TYPES.MODELS.COLLABORATOR.ICollaboratorState => {
  switch (action?.type) {
    case Constant.GET_ALL_COLLABORATORS:
      return {
        ...state,
        isLoading: true,
      };
    case Constant.GET_ALL_COLLABORATORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entityCollaborator: action.payload ?? [],
      };
    case Constant.GET_ALL_COLLABORATORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constant.CREATE_COLLABORATOR:
      return {
        ...state,
        isLoading: true,
      };
    case Constant.CREATE_COLLABORATOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addCollaborator: true,
      };
    case Constant.CREATE_COLLABORATOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        addCollaborator: false,
        error: action?.payload,
      };
    case Constant.COLLABORATOR_ADD_CLEAR:
      return {
        ...state,
        addCollaborator: false,
      };
    default:
      return state;
  }
};

export default CollaboratorReducer;
