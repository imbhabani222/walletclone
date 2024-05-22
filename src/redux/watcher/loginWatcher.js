import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/loginAction";
import { login, reSendOTP } from "../worker/loginWorker";

export function* loginWatcher() {
    yield takeLatest(actions.LOGIN, login)
}

export function* resendOTPWatcher(){
    yield takeLatest(actions.RESENT_OTP, reSendOTP)
}