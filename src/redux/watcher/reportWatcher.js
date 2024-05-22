import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/reportAction";
import {
  auditReport,
  customerList,
  paymentReport,
  paymentReportFilter,
  settlementReport,
  searchReportList,
  clientList,
} from "../worker/reportWorker";

export function* paymentReportWatcher() {
  yield takeLatest(actions.PAYMENT_REPORT, paymentReport);
}

export function* settlementReportWatcher() {
  yield takeLatest(actions.SETTLEMENT_REPORT, settlementReport);
}

export function* auditReportWatcher() {
  yield takeLatest(actions.AUDIT_REPORT, auditReport);
}

export function* customerListWatcher() {
  yield takeLatest(actions.GET_CUSTOMER_LIST, customerList);
}
export function* clientListWatcher() {
  yield takeLatest(actions.GET_CLIENT_LIST, clientList);
}

export function* searchReportListWatcher() {
  yield takeLatest(actions.GET_SEARCH_LIST, searchReportList);
}

export function* paymentreportFilterWatcher() {
  yield takeLatest(actions.PAYMENT_REPORT_FILTER, paymentReportFilter);
}
