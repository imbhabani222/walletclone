import { combineReducers } from "redux";
import {
  isLoadingStateReducer,
  createReducer,
  successStateReducer,
  errorStateReducer,
  resetStateReducer,
} from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/reportAction";

const paymentReport = createReducer(defaultState, {
  [actions.PAYMENT_REPORT]: isLoadingStateReducer,
  [actions.PAYMENT_REPORT_SUCCESS]: successStateReducer,
  [actions.PAYMENT_REPORT_ERROR]: errorStateReducer,
  [actions.PAYMENT_REPORT_CLEAR]: resetStateReducer,
});

const settlementReport = createReducer(defaultState, {
  [actions.SETTLEMENT_REPORT]: isLoadingStateReducer,
  [actions.SETTLEMENT_REPORT_SUCCESS]: successStateReducer,
  [actions.SETTLEMENT_REPORT_ERROR]: errorStateReducer,
  [actions.SETTLEMENT_REPORT_CLEAR]: resetStateReducer,
});

const auditReport = createReducer(defaultState, {
  [actions.AUDIT_REPORT]: isLoadingStateReducer,
  [actions.AUDIT_REPORT_SUCCESS]: successStateReducer,
  [actions.AUDIT_REPORT_ERROR]: errorStateReducer,
  [actions.AUDIT_REPORT_CLEAR]: resetStateReducer,
});

const customerList = createReducer(defaultState, {
  [actions.GET_CUSTOMER_LIST]: isLoadingStateReducer,
  [actions.GET_CUSTOMER_LIST_SUCCESS]: successStateReducer,
  [actions.GET_CUSTOMER_LIST_ERROR]: errorStateReducer,
  [actions.GET_CUSTOMER_LIST_CLEAR]: resetStateReducer,
});

const searchReportList = createReducer(defaultState, {
  [actions.GET_SEARCH_LIST]: isLoadingStateReducer,
  [actions.GET_SEARCH_LIST_SUCCESS]: successStateReducer,
  [actions.GET_SEARCH_LIST_ERROR]: errorStateReducer,
  [actions.GET_SEARCH_LIST_CLEAR]: resetStateReducer,
});

const clientList = createReducer(defaultState, {
  [actions.GET_CLIENT_LIST]: isLoadingStateReducer,
  [actions.GET_CLIENT_LIST_SUCCESS]: successStateReducer,
  [actions.GET_CLIENT_LIST_ERROR]: errorStateReducer,
  [actions.GET_CLIENT_LIST_CLEAR]: resetStateReducer,
});

export default combineReducers({
  paymentReport,
  auditReport,
  settlementReport,
  customerList,
  searchReportList,
  clientList,
});
