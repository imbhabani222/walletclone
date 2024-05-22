import { keyMirror } from "@/src/utils/keymirror";

const actions = {

    SIGNUP: null,
    SIGNUP_SUCCESS: null,
    SIGNUP_ERROR: null,
    SIGNUP_CLEAR: null,

    VERIFY_OTP: null,
    VERIFY_OTP_SUCCESS: null,
    VERIFY_OTP_ERROR: null,
    VERIFY_OTP_CLEAR: null,

    CREATE_ORG: null,
    CREATE_ORG_SUCCESS: null,
    CREATE_ORG_ERROR: null,
    CREATE_ORG_CLEAR: null,

    ORG_DETAILS: null,
    ORG_DETAILS_CLEAR: null,

    UPDATE_ORG: null,
    UPDATE_ORG_SUCCESS: null,
    UPDATE_ORG_ERROR: null,
    UPDATE_ORG_CLEAR: null,

    KYC_VERIFY: null,
    KYC_VERIFY_SUCCESS: null,
    KYC_VERIFY_ERROR: null,
    KYC_VERIFY_CLEAR: null,

    SIGNUP_DATA: null,
    SIGNUP_DATA_CLEAR: null,

    GET_AADHAR: null,
    GET_AADHAR_SUCCESS: null,
    GET_AADHAR_ERROR: null,
    GET_AADHAR_CLEAR: null

}

export default keyMirror(actions);