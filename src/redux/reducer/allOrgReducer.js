import { combineReducers } from "redux";
import {
  isLoadingStateReducer,
  createReducer,
  successStateReducer,
  errorStateReducer,
  resetStateReducer,
} from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/allOrgAction";

const allOrg = createReducer(defaultState, {
  [actions.ALL_ORG_GET]: isLoadingStateReducer,
  [actions.ALL_ORG_GET_SUCCESS]: successStateReducer,
  [actions.ALL_ORG_GET_FAILURE]: errorStateReducer,
  [actions.ALL_ORG_GET_CLEAR]: resetStateReducer,
});
const singleOrg = createReducer(defaultState, {
  [actions.SINGLE_ORG_GET]: isLoadingStateReducer,
  [actions.SINGLE_ORG_GET_SUCCESS]: successStateReducer,
  [actions.SINGLE_ORG_GET_ERROR]: errorStateReducer,
  [actions.SINGLE_ORG_GET_CLEAR]: resetStateReducer,
});
const approveDeny = createReducer(defaultState, {
  [actions.APPROVE_DENY_ORG]: isLoadingStateReducer,
  [actions.APPROVE_DENY_ORG_SUCCESS]: successStateReducer,
  [actions.APPROVE_DENY_ORG_ERROR]: errorStateReducer,
  [actions.APPROVE_DENY_ORG_CLEAR]: resetStateReducer,
});
const enabledDisable = createReducer(defaultState, {
  [actions.ENABLE_DISABLE_ORG]: isLoadingStateReducer,
  [actions.ENABLE_DISABLE_ORG_SUCCESS]: successStateReducer,
  [actions.ENABLE_DISABLE_ORG_ERROR]: errorStateReducer,
  [actions.ENABLE_DISABLE_ORG_CLAER]: resetStateReducer,
});

const addUser = createReducer(defaultState, {
  [actions.ADD_USER]: isLoadingStateReducer,
  [actions.ADD_USER_SUCCESS]: successStateReducer,
  [actions.ADD_USER_ERROR]: errorStateReducer,
  [actions.ADD_USER_CLEAR]: resetStateReducer,
});

const userList = createReducer(defaultState, {
  [actions.USER_LIST]: isLoadingStateReducer,
  [actions.USER_LIST_SUCCESS]: successStateReducer,
  [actions.USER_LIST_ERROR]: errorStateReducer,
  [actions.USER_LIST_CLEAR]: resetStateReducer,
});

const byRole = createReducer(defaultState, {
  [actions.BY_ROLE]: isLoadingStateReducer,
  [actions.BY_ROLE_SUCCESS]: successStateReducer,
  [actions.BY_ROLE_ERROR]: errorStateReducer,
  [actions.BY_ROLE_CLEAR]: resetStateReducer,
});

const getProducts = createReducer(defaultState, {
  [actions.GET_PRODUCT]: isLoadingStateReducer,
  [actions.GET_PRODUCT_SUCCESS]: successStateReducer,
  [actions.GET_PRODUCT_ERROR]: errorStateReducer,
  [actions.GET_PRODUCT_CLEAR]: resetStateReducer,
});

const addProducts = createReducer(defaultState, {
  [actions.ADD_PRODUCT]: isLoadingStateReducer,
  [actions.ADD_PRODUCT_SUCCESS]: successStateReducer,
  [actions.ADD_PRODUCT_ERROR]: errorStateReducer,
  [actions.ADD_PRODUCT_CLEAR]: resetStateReducer,
});

const verifyKeys = createReducer(defaultState, {
  [actions.VERIFY_KEY]: isLoadingStateReducer,
  [actions.VERIFY_KEY_SUCCESS]: successStateReducer,
  [actions.VERIFY_KEY_ERROR]: errorStateReducer,
  [actions.VERIFY_KEY_CLEAR]: resetStateReducer,
});

const generateKeys = createReducer(defaultState, {
  [actions.GENERATE_KEY]: isLoadingStateReducer,
  [actions.GENERATE_KEY_SUCCESS]: successStateReducer,
  [actions.GENERATE_KEY_ERROR]: errorStateReducer,
  [actions.GENERATE_KEY_CLEAR]: resetStateReducer,
});

const enabledDisableProductOwner = createReducer(defaultState, {
  [actions.ENABLE_DISABLE_PRODUCT_OWNER]: isLoadingStateReducer,
  [actions.ENABLE_DISABLE_PRODUCT_OWNER_SUCCESS]: successStateReducer,
  [actions.ENABLE_DISABLE_PRODUCT_OWNER_ERROR]: errorStateReducer,
  [actions.ENABLE_DISABLE_PRODUCT_OWNER_CLEAR]: resetStateReducer,
});

const dependantProductData = createReducer(defaultState, {
  [actions.DEPENDENT_PRODUCT]: isLoadingStateReducer,
  [actions.DEPENDENT_PRODUCT_SUCCESS]: successStateReducer,
  [actions.DEPENDENT_PRODUCT_ERROR]: errorStateReducer,
  [actions.DEPENDENT_PRODUCT_CLEAR]: resetStateReducer,
});

const updateProductData = createReducer(defaultState, {
  [actions.UPDATE_PRODUCT]: isLoadingStateReducer,
  [actions.UPDATE_PRODUCT_SUCCESS]: successStateReducer,
  [actions.UPDATE_PRODUCT_ERROR]: errorStateReducer,
  [actions.UPDATE_PRODUCT_CLEAR]: resetStateReducer,
});

const updateUserData = createReducer(defaultState, {
  [actions.UPDATE_USER]: isLoadingStateReducer,
  [actions.UPDATE_USER_SUCCESS]: successStateReducer,
  [actions.UPDATE_USER_ERROR]: errorStateReducer,
  [actions.UPDATE_USER_CLEAR]: resetStateReducer,
});

const updatePaymentGateWay = createReducer(defaultState, {
  [actions.UPDATE_PAYMENT_GATEWAY_CUT]: isLoadingStateReducer,
  [actions.UPDATE_PAYMENT_GATEWAY_CUT_SUCCESS]: successStateReducer,
  [actions.UPDATE_PAYMENT_GATEWAY_CUT_ERROR]: errorStateReducer,
  [actions.UPDATE_PAYMENT_GATEWAY_CUT_CLEAR]: resetStateReducer,
});

const updateThershold = createReducer(defaultState, {
  [actions.UPDATE_THERSHOLD]: isLoadingStateReducer,
  [actions.UPDATE_THERSHOLD_SUCCESS]: successStateReducer,
  [actions.UPDATE_THERSHOLD_ERROR]: errorStateReducer,
  [actions.UPDATE_THERSHOLD_CLEAR]: resetStateReducer,
});

const getPaymentCharge = createReducer(defaultState, {
  [actions.GET_PAYMENT_CHARGE]: isLoadingStateReducer,
  [actions.GET_PAYMENT_CHARGE_SUCCESS]: successStateReducer,
  [actions.GET_PAYMENT_CHARGE_ERROR]: errorStateReducer,
  [actions.GET_PAYMENT_CHARGE_CLEAR]: resetStateReducer,
});

const fetchPaymentProviders = createReducer(defaultState, {
  [actions.FETCH_PAYMENT_PROVIDERS]: isLoadingStateReducer,
  [actions.FETCH_PAYMENT_PROVIDERS_SUCCESS]: successStateReducer,
  [actions.FETCH_PAYMENT_PROVIDERS_ERROR]: errorStateReducer,
  [actions.FETCH_PAYMENT_PROVIDERS_CLEAR]: resetStateReducer,
});

const updatePaymentProviders = createReducer(defaultState, {
  [actions.UPDATE_PAYMENT_PROVIDERS]: isLoadingStateReducer,
  [actions.UPDATE_PAYMENT_PROVIDERS_SUCCESS]: successStateReducer,
  [actions.UPDATE_PAYMENT_PROVIDERS_ERROR]: errorStateReducer,
  [actions.UPDATE_PAYMENT_PROVIDERS_CLEAR]: resetStateReducer,
});

const getPaymentProviderReport = createReducer(defaultState, {
  [actions.GET_PAYMENT_PROVIDERS_REPORTS]: isLoadingStateReducer,
  [actions.GET_PAYMENT_PROVIDERS_REPORTS_SUCCESS]: successStateReducer,
  [actions.GET_PAYMENT_PROVIDERS_REPORTS_ERROR]: errorStateReducer,
  [actions.GET_PAYMENT_PROVIDERS_REPORTS_CLEAR]: resetStateReducer,
});

const fetchPrefrenceList = createReducer(defaultState, {
  [actions.FETCH_PREFRENCE_LIST]: isLoadingStateReducer,
  [actions.FETCH_PREFRENCE_LIST_SUCCESS]: successStateReducer,
  [actions.FETCH_PREFRENCE_LIST_ERROR]: errorStateReducer,
  [actions.FETCH_PREFRENCE_LIST_CLEAR]: resetStateReducer,
});

const verificationReport = createReducer(defaultState, {
  [actions.VERIFICATION_REPORT]: isLoadingStateReducer,
  [actions.VERIFICATION_REPORT_SUCCESS]: successStateReducer,
  [actions.VERIFICATION_REPORT_ERROR]: errorStateReducer,
  [actions.VERIFICATION_REPORT_CLEAR]: resetStateReducer,
});

const updateKycPrefrence = createReducer(defaultState, {
  [actions.UPDATE_KYC_PREFRENCE]: isLoadingStateReducer,
  [actions.UPDATE_KYC_PREFRENCE_SUCCESS]: successStateReducer,
  [actions.UPDATE_KYC_PREFRENCE_ERROR]: errorStateReducer,
  [actions.UPDATE_KYC_PREFRENCE_CLEAR]: resetStateReducer,
});

const getKycPrefrence = createReducer(defaultState, {
  [actions.GET_KYC_PREFRENCE]: isLoadingStateReducer,
  [actions.GET_KYC_PREFRENCE_SUCCESS]: successStateReducer,
  [actions.GET_KYC_PREFRENCE_ERROR]: errorStateReducer,
  [actions.GET_KYC_PREFRENCE_CLEAR]: resetStateReducer,
});

const fetchKycProvider = createReducer(defaultState, {
  [actions.FETCH_KYC_PREFRENCE_PROVIDERS]: isLoadingStateReducer,
  [actions.FETCH_KYC_PREFRENCE_PROVIDERS_SUCCESS]: successStateReducer,
  [actions.FETCH_KYC_PREFRENCE_PROVIDERS_ERROR]: errorStateReducer,
  [actions.FETCH_KYC_PREFRENCE_PROVIDERS_CLEAR]: resetStateReducer,
});

const createWebHookURL = createReducer(defaultState, {
  [actions.CREATE_WEBHOOK_URL]: isLoadingStateReducer,
  [actions.CREATE_WEBHOOK_URL_SUCCESS]: successStateReducer,
  [actions.CREATE_WEBHOOK_URL_ERROR]: errorStateReducer,
  [actions.CREATE_WEBHOOK_URL_CLEAR]: resetStateReducer,
});

const getWebHookURL = createReducer(defaultState, {
  [actions.GET_WEBHOOK_URL]: isLoadingStateReducer,
  [actions.GET_WEBHOOK_URL_SUCCESS]: successStateReducer,
  [actions.GET_WEBHOOK_URL_ERROR]: errorStateReducer,
  [actions.GET_WEBHOOK_URL_CLEAR]: resetStateReducer,
});

const getSalesHeader = createReducer(defaultState, {
  [actions.GET_SALES_HEADER]: isLoadingStateReducer,
  [actions.GET_SALES_HEADER_SUCCESS]: successStateReducer,
  [actions.GET_SALES_HEADER_ERROR]: errorStateReducer,
  [actions.GET_SALES_HEADER_CLEAR]: resetStateReducer,
});

export default combineReducers({
  allOrg,
  singleOrg,
  enabledDisable,
  approveDeny,
  addUser,
  userList,
  byRole,
  generateKeys,
  verifyKeys,
  addProducts,
  getProducts,
  enabledDisableProductOwner,
  dependantProductData,
  updateProductData,
  updateUserData,
  updatePaymentGateWay,
  updateThershold,
  getPaymentCharge,
  fetchPaymentProviders,
  getPaymentProviderReport,
  updatePaymentProviders,
  fetchPrefrenceList,
  fetchKycProvider,
  getKycPrefrence,
  updateKycPrefrence,
  verificationReport,
  createWebHookURL,
  getWebHookURL,
  getSalesHeader,
});
