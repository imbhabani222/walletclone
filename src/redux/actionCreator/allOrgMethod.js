import actions from "../actionTypes/allOrgAction";
export const allOrg = (payload) => ({
  type: actions.ALL_ORG_GET,
  payload,
});
export const singleorg = (payload) => ({
  type: actions.SINGLE_ORG_GET,
  payload,
});

export const enableDisableOrg = (payload) => ({
  type: actions.ENABLE_DISABLE_ORG,
  payload,
});

export const approveDEnyOrg = (payload) => ({
  type: actions.APPROVE_DENY_ORG,
  payload,
});

export const userList = (payload) => ({
  type: actions.USER_LIST,
  payload,
});

export const addUser = (payload) => ({
  type: actions.ADD_USER,
  payload,
});

export const byRole = (payload) => ({
  type: actions.BY_ROLE,
  payload,
});

export const addProduct = (payload) => ({
  type: actions.ADD_PRODUCT,
  payload,
});

export const getProduct = (payload) => ({
  type: actions.GET_PRODUCT,
  payload,
});

export const verifyKey = (payload) => ({
  type: actions.VERIFY_KEY,
  payload,
});

export const generateKey = (payload) => ({
  type: actions.GENERATE_KEY,
  payload,
});

export const clearallOrg = () => ({
  type: actions.ALL_ORG_GET_CLEAR,
});

export const enableDisableProductOwner = (payload) => ({
  type: actions.ENABLE_DISABLE_PRODUCT_OWNER,
  payload,
});

export const dependentProduct = (payload) => ({
  type: actions.DEPENDENT_PRODUCT,
  payload,
});

export const updateProduct = (payload) => ({
  type: actions.UPDATE_PRODUCT,
  payload,
});

export const updateUser = (payload) => ({
  type: actions.UPDATE_USER,
  payload,
});

export const updateThershold = (payload) => ({
  type: actions.UPDATE_THERSHOLD,
  payload,
});

export const updatePaymentGateWayCut = (payload) => ({
  type: actions.UPDATE_PAYMENT_GATEWAY_CUT,
  payload,
});

export const clearupdatePaymentGateWayCut = () => ({
  type: actions.UPDATE_PAYMENT_GATEWAY_CUT_CLEAR,
});

export const clearUpdateThershold = () => ({
  type: actions.UPDATE_THERSHOLD_CLEAR,
});

export const getPaymentMethod = (payload) => ({
  type: actions.GET_PAYMENT_CHARGE,
  payload,
});

export const getPaymentMethodClear = () => ({
  type: actions.GET_PAYMENT_CHARGE_CLEAR,
});

export const fetchPaymentProviders = (payload) => ({
  type: actions.FETCH_PAYMENT_PROVIDERS,
  payload,
});

export const getPaymentProviderReport = (payload) => ({
  type: actions.GET_PAYMENT_PROVIDERS_REPORTS,
  payload,
});

export const updatePaymentProviders = (payload) => ({
  type: actions.UPDATE_PAYMENT_PROVIDERS,
  payload,
});

export const ClearGenerateKey = () => ({
  type: actions.GENERATE_KEY_CLEAR,
});

export const fetchPrefrenceList = (payload) => ({
  type: actions.FETCH_PREFRENCE_LIST,
  payload,
});

export const clearUpdatePaymentProviders = () => ({
  type: actions.UPDATE_PAYMENT_PROVIDERS_CLEAR,
});

export const clearFetchPrefrenceList = () => ({
  type: actions.FETCH_PREFRENCE_LIST_CLEAR,
});

export const verificationReport = (payload) => ({
  type: actions.VERIFICATION_REPORT,
  payload,
});

export const getKycPrefrence = (payload) => ({
  type: actions.GET_KYC_PREFRENCE,
  payload,
});

export const updateKycPrefrence = (payload) => ({
  type: actions.UPDATE_KYC_PREFRENCE,
  payload,
});

export const fetchKycProvider = (payload) => ({
  type: actions.FETCH_KYC_PREFRENCE_PROVIDERS,
  payload,
});

export const getWebHookURL = (payload) => ({
  type: actions.GET_WEBHOOK_URL,
  payload,
});

export const createWebHookURL = (payload) => ({
  type: actions.CREATE_WEBHOOK_URL,
  payload,
});

export const ClearcreateWebHookURL = () => ({
  type: actions.CREATE_WEBHOOK_URL_CLEAR,
});

export const getSalesHeader = (payload) => ({
  type: actions.GET_SALES_HEADER,
  payload,
});
export const CleargetSalesHeader = () => ({
  type: actions.GET_SALES_HEADER_CLEAR,
});
