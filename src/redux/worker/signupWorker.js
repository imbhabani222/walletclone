import { call } from  "redux-saga/effects";
import { httpRequestForData, axiosApiRequestForplainText } from "@/src/api/api";
import  apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/signupAction";


export function*  signup ({ payload }){
    
    const { signUp: { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: endPoint,
        apiMethod: method,
        apiPayload: payload,
        successAction: actions.SIGNUP_SUCCESS,
        errorAction: actions.SIGNUP_ERROR,
    };
    yield call(httpRequestForData, requestParameters);

}

export function*  verifyOTP ({ payload }){
    
    const { verifyOTP: { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: `${endPoint}${payload.params}?action=${payload.flag}`,
        apiMethod: method,
        apiPayload: payload.body,
        successAction: actions.VERIFY_OTP_SUCCESS,
        errorAction: actions.VERIFY_OTP_ERROR,
    };
    yield call(httpRequestForData, requestParameters);

}

export function*  createOrg ({ payload }){
    
    const { createOrganisations: { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: endPoint,
        apiMethod: method,
        apiPayload: payload,
        successAction: actions.CREATE_ORG_SUCCESS,
        errorAction: actions.CREATE_ORG_ERROR,
    };
    yield call(httpRequestForData, requestParameters);

}

export function*  kycVerify ({ payload }){
    
    const { kycVerify : { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: `${endPoint}/${payload.params}/kyc`,
        apiMethod: method,
        apiPayload: payload.body,
        successAction: actions.KYC_VERIFY_SUCCESS,
        errorAction: actions.KYC_VERIFY_ERROR,
    };
    requestParameters.axiosRequest = axiosApiRequestForplainText
    yield call(httpRequestForData, requestParameters);

}

export function*  updateOrg ({ payload }){
    
    const { updateOrg : { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: `${endPoint}/${payload.params}`,
        apiMethod: method,
        apiPayload: payload.body,
        successAction: actions.UPDATE_ORG_SUCCESS,
        errorAction: actions.UPDATE_ORG_ERROR,
    };
    requestParameters.axiosRequest = axiosApiRequestForplainText
    yield call(httpRequestForData, requestParameters);

}

export function*  getAAdhar ({ payload }){
    
    const { kycVerify : { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: `${endPoint}/${payload.params}/kyc`,
        apiMethod: method,
        apiPayload: payload.body,
        successAction: actions.GET_AADHAR_SUCCESS,
        errorAction: actions.GET_AADHAR_ERROR,
    };
    requestParameters.axiosRequest = axiosApiRequestForplainText
    yield call(httpRequestForData, requestParameters);

}