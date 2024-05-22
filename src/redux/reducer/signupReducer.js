import { combineReducers } from "redux";
import { isLoadingStateReducer, createReducer, successStateReducer, errorStateReducer, resetStateReducer } from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/signupAction";

const signup =  createReducer(defaultState, {
    [actions.SIGNUP] :  isLoadingStateReducer,
    [actions.SIGNUP_SUCCESS] : successStateReducer,
    [actions.SIGNUP_ERROR] : errorStateReducer,
    [actions.SIGNUP_CLEAR] : resetStateReducer
})

const verifyOTP =  createReducer(defaultState, {
    [actions.VERIFY_OTP] :  isLoadingStateReducer,
    [actions.VERIFY_OTP_SUCCESS] : successStateReducer,
    [actions.VERIFY_OTP_ERROR] : errorStateReducer,
    [actions.VERIFY_OTP_CLEAR] : resetStateReducer
})

const createOrg =  createReducer(defaultState, {
    [actions.CREATE_ORG] :  isLoadingStateReducer,
    [actions.CREATE_ORG_SUCCESS] : successStateReducer,
    [actions.CREATE_ORG_ERROR] : errorStateReducer,
    [actions.CREATE_ORG_CLEAR] : resetStateReducer
})

const kycVerify =  createReducer(defaultState, {
    [actions.KYC_VERIFY] :  isLoadingStateReducer,
    [actions.KYC_VERIFY_SUCCESS] : successStateReducer,
    [actions.KYC_VERIFY_ERROR] : errorStateReducer,
    [actions.KYC_VERIFY_CLEAR] : resetStateReducer
})

const updateOrg =  createReducer(defaultState, {
    [actions.UPDATE_ORG] :  isLoadingStateReducer,
    [actions.UPDATE_ORG_SUCCESS] : successStateReducer,
    [actions.UPDATE_ORG_ERROR] : errorStateReducer,
    [actions.UPDATE_ORG_CLEAR] : resetStateReducer
})

const getAAdharData =  createReducer(defaultState, {
    [actions.GET_AADHAR] :  isLoadingStateReducer,
    [actions.GET_AADHAR_SUCCESS] : successStateReducer,
    [actions.GET_AADHAR_FAILURE] : errorStateReducer,
    [actions.GET_AADHAR_CLEAR] : resetStateReducer
})

export default combineReducers({
    signup,
    verifyOTP,
    createOrg,
    kycVerify,
    updateOrg,
    getAAdharData
})