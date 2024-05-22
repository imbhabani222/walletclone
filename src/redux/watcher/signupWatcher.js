import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/signupAction";
import { signup, verifyOTP, createOrg, kycVerify, updateOrg, getAAdhar } from "../worker/signupWorker";

export function* signupWatcher() {
    yield takeLatest(actions.SIGNUP, signup)
}
export function* verifyOTPWatcher() {
    yield takeLatest(actions.VERIFY_OTP, verifyOTP)
}
export function* createOrgWatcher() {
    yield takeLatest(actions.CREATE_ORG, createOrg)
}

export function* kycVerifyWatcher(){
    yield takeLatest(actions.KYC_VERIFY, kycVerify)
}

export function* updateOrgWatcher(){
    yield takeLatest(actions.UPDATE_ORG, updateOrg)
}

export function* getAAdharWatcher(){
    yield takeLatest(actions.GET_AADHAR, getAAdhar)
}