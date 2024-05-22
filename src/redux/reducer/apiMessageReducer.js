import actions from "../actionTypes/index";

const initialState = { successMessage: null, errorMessage: null };


const apiMessageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case actions.API_SUCCESS_MSG:
        return { ...state, successMessage: payload };
      case actions.API_FAILURE_MSG:
        return { ...state, errorMessage: payload };
      case actions.API_MSG_CLEAR:
        return { ...initialState };
      default:
        return state;
    }
  };
  
  export default apiMessageReducer;
  