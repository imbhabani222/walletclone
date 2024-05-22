import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/invoiceAction";
import {
  getInvoiceFun,
  generateInvoiceFun,
  cancelInvoiceFun,
  getTransactionReportFun,
  getSettlementReportFun,
  updateSettlementReportFun,
  panAadharLinkFun,
} from "../worker/invoiceWorker";

export function* getInvoiceWatcher() {
  yield takeLatest(actions.GET_INVOICE, getInvoiceFun);
}
export function* getTransactionWatcher() {
  yield takeLatest(actions.GET_TRANSACTION_REPORT, getTransactionReportFun);
}
export function* getSettlementWatcher() {
  yield takeLatest(actions.GET_SETTLEMENT_REPORT, getSettlementReportFun);
}
export function* generateInvoiceWatcher() {
  yield takeLatest(actions.CREATE_INVOICE, generateInvoiceFun);
}
export function* cancelInvoiceWatcher() {
  yield takeLatest(actions.CANCEL_INVOICE, cancelInvoiceFun);
}
export function* updateSettlementWatcher() {
  yield takeLatest(actions.UPDATE_SETTLEMENT_REPORT, updateSettlementReportFun);
}
export function* panAadharLinkWatcher() {
  yield takeLatest(actions.PAN_AADHAR_LINK, panAadharLinkFun);
}
