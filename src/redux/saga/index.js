import { all, fork } from "redux-saga/effects";
import * as loginWatcher from "../watcher/loginWatcher";
import * as signupWatcher from "../watcher/signupWatcher";
import * as allOrgWatcher from "../watcher/allOrgWatcher";
import * as allTenantWatcher from "../watcher/allTenantWatcher";
import * as reportWatcher from "../watcher/reportWatcher";
import * as invoiceWatcher from "../watcher/invoiceWatcher";

export default function* RootSaga() {
  yield all([
    fork(loginWatcher.loginWatcher),
    fork(signupWatcher.signupWatcher),
    fork(signupWatcher.verifyOTPWatcher),
    fork(signupWatcher.createOrgWatcher),
    fork(signupWatcher.kycVerifyWatcher),
    fork(signupWatcher.updateOrgWatcher),
    fork(allOrgWatcher.allOrgWatcher),
    fork(allOrgWatcher.singleOrgWatcher),
    fork(allTenantWatcher.allTenantWatcher),
    fork(allOrgWatcher.approveDenyWatcher),
    fork(allOrgWatcher.enableDisableWatcher),
    fork(allOrgWatcher.addUserWatcher),
    fork(allOrgWatcher.userListWatcher),
    fork(allOrgWatcher.byRoleWatcher),
    fork(allOrgWatcher.addProductWatcher),
    fork(allOrgWatcher.generateKeyWatcher),
    fork(allOrgWatcher.getProductWatcher),
    fork(allOrgWatcher.verifyKeyWatcher),
    fork(signupWatcher.getAAdharWatcher),
    fork(allOrgWatcher.enabledDisableProductOwnerWatcher),
    fork(allOrgWatcher.dependentProductWatcher),
    fork(allOrgWatcher.updateProductWatcher),
    fork(allOrgWatcher.updateUserWatcher),
    fork(reportWatcher.paymentReportWatcher),
    fork(reportWatcher.settlementReportWatcher),
    fork(reportWatcher.auditReportWatcher),
    fork(reportWatcher.customerListWatcher),
    fork(reportWatcher.searchReportListWatcher),
    fork(reportWatcher.clientListWatcher),
    fork(reportWatcher.paymentreportFilterWatcher),
    fork(allOrgWatcher.updatePaymentGateWayWatcher),
    fork(allOrgWatcher.updateThersholdWatcher),
    fork(allOrgWatcher.getPaymentChargeWatcher),
    fork(allOrgWatcher.getPaymentProviderReportWatcher),
    fork(allOrgWatcher.updatePaymentProvidersWatcher),
    fork(allOrgWatcher.fetchPaymentWatcher),
    fork(allOrgWatcher.fetchPrefrenceWatchers),
    fork(allOrgWatcher.getWebHookURLWatchers),
    fork(allOrgWatcher.createWebHookURLWatchers),
    fork(allOrgWatcher.getSalesHeaderWatchers),
    fork(loginWatcher.resendOTPWatcher),
    fork(invoiceWatcher.getInvoiceWatcher),
    fork(invoiceWatcher.getTransactionWatcher),
    fork(invoiceWatcher.getSettlementWatcher),
    fork(invoiceWatcher.updateSettlementWatcher),
    fork(invoiceWatcher.panAadharLinkWatcher),
    fork(invoiceWatcher.generateInvoiceWatcher),
    fork(invoiceWatcher.cancelInvoiceWatcher),
  ]);
}
