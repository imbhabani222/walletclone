import { combineReducers } from "redux";
import { isLoadingStateReducer, createReducer, successStateReducer, errorStateReducer, resetStateReducer } from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/loginAction";

const login =  createReducer(defaultState, {
    [actions.LOGIN] :  isLoadingStateReducer,
    [actions.LOGIN_SUCCESS] : successStateReducer,
    [actions.LOGIN_FAILURE] : errorStateReducer,
    [actions.LOGIN_CLEAR] : resetStateReducer
});

const resentOTP =  createReducer(defaultState, {
    [actions.RESENT_OTP] :  isLoadingStateReducer,
    [actions.RESENT_OTP_SUCCESS] : successStateReducer,
    [actions.RESENT_OTP_FAILURE] : errorStateReducer,
    [actions.RESENT_OTP_CLEAR] : resetStateReducer
})

export default combineReducers({
    login,
    resentOTP
})