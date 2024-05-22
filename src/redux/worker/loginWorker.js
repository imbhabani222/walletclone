import { call } from  "redux-saga/effects";
import { httpRequestForData } from "@/src/api/api";
import  apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/loginAction";


export function*  login ({ payload }){
    
    const { login: { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: endPoint,
        apiMethod: method,
        apiPayload: payload,
        successAction: actions.LOGIN_SUCCESS,
        errorAction: actions.LOGIN_FAILURE,
    };
    yield call(httpRequestForData, requestParameters);


}

export function*  reSendOTP ({ payload }){
    
    const { resendOTP: { endPoint, method } } = apiInfo;

    const requestParameters = {
        url: `${endPoint}${payload.url}`,
        apiMethod: method,
        apiPayload: payload.body,
        successAction: actions.RESENT_OTP_SUCCESS,
        errorAction: actions.RESENT_OTP_FAILURE,
    };
    yield call(httpRequestForData, requestParameters);


}


