import actions from "../actionTypes/signupAction";

export  const signup = payload => ({
    type: actions.SIGNUP,
    payload
})

export  const storeOrgDetails = payload => ({
    type: actions.ORG_DETAILS,
    payload
})

export const verifyOtp = payload => ({
    type: actions.VERIFY_OTP,
    payload
})

export const createOrg = payload => ({
    type: actions.CREATE_ORG,
    payload
})

export const kycVerify = payload => ({
    type: actions.KYC_VERIFY,
    payload
})

export const updateOrg = payload => ({
    type: actions.UPDATE_ORG,
    payload
})

export const kycVerifyclear = () => ({
    type: actions.KYC_VERIFY_CLEAR,
})

export const signUpData = payload => ({
    type: actions.SIGNUP_DATA,
    payload
})

export const verifyOtpClear = () => ({
    type: actions.VERIFY_OTP_CLEAR,
})

export const getAAdhar = payload => ({
    type: actions.GET_AADHAR,
    payload
})

export const createOrgClear = () => ({
    type: actions.CREATE_ORG_CLEAR,
    
})

export const ClearAAdhar = () => ({
    type: actions.GET_AADHAR_CLEAR
})

export const clearSignup = () => ({
    type: actions.SIGNUP_CLEAR
})