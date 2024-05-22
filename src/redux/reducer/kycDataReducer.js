import actions from "../actionTypes/signupAction";

const initialState = {
    
  };


  const orgDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case actions.ORG_DETAILS:
        return { ...state, data: payload };
      case actions.ORG_DETAILS_CLEAR:
        return state;
      default:
        return state;
    }
  };
  const signupDataReducer = (state = {data: null}, { type, payload }) => {
    switch (type) {
      case actions.SIGNUP_DATA:
        return { ...state, data: payload };
      case actions.SIGNUP_DATA_CLEAR:
        return state;
      default:
        return state;
    }
  };
  export {
    orgDataReducer,
    signupDataReducer
  }