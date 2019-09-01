import * as actionTypes from "../actions/actionTypes";

const initialState = {
  fileContent: [],
  isLoading: false,
  error: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FILE_CONTENT_REQUEST:
      return { ...state, isLoading: true, error: null, fileContent: [] };
    case actionTypes.FETCH_FILE_CONTENT_SUCCESS:
      return {
        ...state,
        fileContent: action.fileContent,
        isLoading: false,
        error: null
      };
    case actionTypes.FETCH_FILE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        fileContent: []
      };
    default:
      return state;
  }
};

export default fileReducer;
