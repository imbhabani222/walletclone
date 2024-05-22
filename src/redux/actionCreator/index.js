import actions from "../actionTypes/index" 

export const apiFailureAlert = payload => ({
    type: actions.API_FAILURE_MSG,
    payload
  });


  export const clearApiMessage = () => ({
    type: actions.API_MSG_CLEAR
  })