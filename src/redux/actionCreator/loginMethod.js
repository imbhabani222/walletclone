import actions from  "../actionTypes/loginAction";
export  const login = payload => ({
    type: actions.LOGIN,
    payload
})


export  const loginClear = () => ({
    type: actions.LOGIN_CLEAR
})

export const resentOtp = payload => ({
    type: actions.RESENT_OTP,
    payload
})

export const resendOTPClear = () => ({
    type: actions.RESENT_OTP_CLEAR
})