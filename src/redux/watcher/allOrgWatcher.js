import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/allOrgAction";
import {
  allOrg,
  singleOrg,
  approveDeny,
  enableDisable,
  userList,
  addUser,
  byRole,
  addProduct,
  verifyKey,
  generateKey,
  getProduct,
  enabledDisableProductOwner,
  dependentProduct,
  updateProduct,
  updateUser,
  updateThershold,
  updatePaymentGateWay,
  getPaymentCharge,
  updatePaymentProviders,
  fetchPaymentProviders,
  getPaymentProviderReports,
  fetchPrefrence,
  createWebHookURL,
  getWebHookURL,
  getSalesHeader,
} from "../worker/allOrgWorker";

export function* allOrgWatcher() {
  yield takeLatest(actions.ALL_ORG_GET, allOrg);
}
export function* singleOrgWatcher() {
  yield takeLatest(actions.SINGLE_ORG_GET, singleOrg);
}

export function* approveDenyWatcher() {
  yield takeLatest(actions.APPROVE_DENY_ORG, approveDeny);
}

export function* enableDisableWatcher() {
  yield takeLatest(actions.ENABLE_DISABLE_ORG, enableDisable);
}

export function* addUserWatcher() {
  yield takeLatest(actions.ADD_USER, addUser);
}

export function* userListWatcher() {
  yield takeLatest(actions.USER_LIST, userList);
}

export function* addProductWatcher() {
  yield takeLatest(actions.ADD_PRODUCT, addProduct);
}

export function* verifyKeyWatcher() {
  yield takeLatest(actions.VERIFY_KEY, verifyKey);
}

export function* getProductWatcher() {
  yield takeLatest(actions.GET_PRODUCT, getProduct);
}

export function* generateKeyWatcher() {
  yield takeLatest(actions.GENERATE_KEY, generateKey);
}
export function* byRoleWatcher() {
  yield takeLatest(actions.BY_ROLE, byRole);
}
export function* enabledDisableProductOwnerWatcher() {
  yield takeLatest(
    actions.ENABLE_DISABLE_PRODUCT_OWNER,
    enabledDisableProductOwner
  );
}

export function* dependentProductWatcher() {
  yield takeLatest(actions.DEPENDENT_PRODUCT, dependentProduct);
}

export function* updateProductWatcher() {
  yield takeLatest(actions.UPDATE_PRODUCT, updateProduct);
}

export function* updateUserWatcher() {
  yield takeLatest(actions.UPDATE_USER, updateUser);
}

export function* updateThersholdWatcher() {
  yield takeLatest(actions.UPDATE_THERSHOLD, updateThershold);
}

export function* updatePaymentGateWayWatcher() {
  yield takeLatest(actions.UPDATE_PAYMENT_GATEWAY_CUT, updatePaymentGateWay);
}

export function* getPaymentChargeWatcher() {
  yield takeLatest(actions.GET_PAYMENT_CHARGE, getPaymentCharge);
}

export function* updatePaymentProvidersWatcher() {
  yield takeLatest(actions.UPDATE_PAYMENT_PROVIDERS, updatePaymentProviders);
}

export function* fetchPaymentWatcher() {
  yield takeLatest(actions.FETCH_PAYMENT_PROVIDERS, fetchPaymentProviders);
}

export function* getPaymentProviderReportWatcher() {
  yield takeLatest(
    actions.GET_PAYMENT_PROVIDERS_REPORTS,
    getPaymentProviderReports
  );
}

export function* fetchPrefrenceWatchers() {
  yield takeLatest(actions.FETCH_PREFRENCE_LIST, fetchPrefrence);
}

export function* createWebHookURLWatchers() {
  yield takeLatest(actions.CREATE_WEBHOOK_URL, createWebHookURL);
}

export function* getWebHookURLWatchers() {
  yield takeLatest(actions.GET_WEBHOOK_URL, getWebHookURL);
}

export function* getSalesHeaderWatchers() {
  yield takeLatest(actions.GET_SALES_HEADER, getSalesHeader);
}
