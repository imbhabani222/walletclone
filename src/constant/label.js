const ALL_LABELS = {
  SIGNIN_SIGNUP_LABELS: {
    LOGIN_HEADER: "Welcome back",
    LOGIN_TEXT: "Please enter your details",
    NAME: "Name",
    PHONENUMBER: "Phone Number",
    EMAIL: "Email  Address",
    OTP: "OTP",
    LOGIN_SUBMIT_BTN: "Continue",
    LOGIN: "Sign In",
    SIGNUPL: "Signup",
    EMAILPHONE: "Email / Phone",
    EMAILPHONEKEY: "emailOrPhone",
    DONT_HAVE_ACCOUNT: "Don’t have an account?",
    SIGNUP_FOOTER_TEXT: "Signup",
    ALREADY_HAVE_ACCOUNT: "Already have an account?",
    SIGNIN_FOOTER_TEXT: "SignIn",
    SIGNUP_HEADER: "Create Account",
  },
  VERIFYOTP: {
    VERIFYOTP_HEADER: "Verify",
    VERIFYOTP_TEXT: "Please enter the OTP, ",
    VERIFYOTP: "OTP",
    VERIFYOTP_BTN: "Verify",
    DONT_RECEIVED_OTP: "Didn’t receive OTP ?",
    RESEND: "Resend",
  },
  CREATE_ORG: {
    ORG_NAME: "Organisation Name",
    ORG_CODE: "Organisation Code",
    INDUSTRY_TYPE: "Industry Type",
    BUSSINESS_TYPE: "Business Type",
    ORG_HEADER: "Organisation Details",
    GST_REGISTERED: "Are you a GST registered company?",
    YES: "Yes",
    NO: "No",
  },
  INDUSTRY_TYPE_OPTION: [
    {
      label: "E-commerce and Retail",
      value: "E-commerce and Retail",
    },
    {
      label: "Energy and Utilities",
      value: "Energy and Utilities",
    },
    {
      label: "Gaming and Entertainment",
      value: "Gaming and Entertainment",
    },
    {
      label: "Healthcare",
      value: "Healthcare",
    },
    {
      label: "D2C",
      value: "D2C",
    },
    {
      label: "Manufacturing & Industrial",
      value: "Manufacturing & Industrial",
    },
    {
      label: "Technology",
      value: "Technology",
    },
    {
      label: "Transportation",
      value: "Transportation",
    },
    {
      label: "Logistics",
      value: "Logistics",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  BUSINESS_TYPE_OPTION: [
    {
      label: "Individual",
      value: "Individual",
    },
    {
      label: "Proprietorship",
      value: "Proprietorship",
    },
    {
      label: "Private Limited",
      value: "Private Limited",
    },
    {
      label: "Public Limited",
      value: "Public Limited",
    },
    {
      label: "LLP",
      value: "LLP",
    },
    {
      label: "Partnership",
      value: "Partnership",
    },
  ],
  KYC: {
    GST_TITLE: "1. Proof of Business",
    KYC_SUBTEXT: "Enter the below details for verification",
    GST_LABEL: "GSTIN",
    SEARCH_BTN: "Search",
    SUBMIT_BTN: "Submit",
    CONTINUE_BTN: "Continue",
    PAN_TITLE: "2. Proof of Identity",
    PAN_TITLE_1: "1. Proof of Identity",
    PAN_LABEL: "PAN",
    BUSSINESS_PAN_LABEL: "Business PAN",
    ADHAR_TITLE: "3. Additional Proof",
    ADHAR_TITLE_1: "2. Additional Proof",
    ADHAR_LABEL: "Aadhar",
    SIGNATORY_ADHAR_TAB_NAME: "1. Signatory Aadhar",
    SIGNATORY_PAN_TAB_NAME: "1. Signatory PAN",
    BUSSINESS_PAN_TAB_NAME: "1. Business PAN",
    GST_TAB_NAME: "1. GSTIN",
    ADHAR_TAB_NAME: "1. Aadhar",
    SIGNATORY_PAN_TAB_NAME_2: "2. Signatory PAN",

    VERIFICATION_TITLE: "Your KYC Verification Completed!",
    PROOF_OF_IDENTITY: "Proof of Identity",
    ADDITIONAL_PROOF: "Additional Proof",
    PROOF_OF_BUSSINESS: "Proof of Business",
    SUCCESS_DATA: "Success!",
    SUCCESS_MSG:
      "Thank you for submitting KYC details, your account will be approved soon.",
  },
};

const LABELS = Object.freeze(ALL_LABELS);

export default LABELS;
