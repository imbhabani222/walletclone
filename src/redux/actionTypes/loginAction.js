import { keyMirror } from "@/src/utils/keymirror";
const actions = {
    LOGIN : null,
    LOGIN_SUCCESS: null,
    LOGIN_FAILURE: null,
    LOGIN_CLEAR: null,

    VERIFY_OTP : null,
    VERIFY_OTP_SUCCESS: null,
    VERIFY_OTP_ERROR: null,
    VERIFY_OTP_CLEAR: null,

    RESENT_OTP: null,
    RESENT_OTP_SUCCESS: null,
    RESENT_OTP_ERROR: null,
    RESENT_OTP_CLEAR: null
}

export default keyMirror(actions);