import { combineReducers } from "redux";
import {
  isLoadingStateReducer,
  createReducer,
  successStateReducer,
  errorStateReducer,
  resetStateReducer,
} from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/invoiceAction";

const getInvoiceData = createReducer(defaultState, {
  [actions.GET_INVOICE]: isLoadingStateReducer,
  [actions.GET_INVOICE_SUCCESS]: successStateReducer,
  [actions.GET_INVOICE_FAILURE]: errorStateReducer,
  [actions.GET_INVOICE_CLEAR]: resetStateReducer,
});

const generateInvoiceData = createReducer(defaultState, {
  [actions.CREATE_INVOICE]: isLoadingStateReducer,
  [actions.CREATE_INVOICE_SUCCESS]: successStateReducer,
  [actions.CREATE_INVOICE_ERROR]: errorStateReducer,
  [actions.CREATE_INVOICE_CLEAR]: resetStateReducer,
});

const cancelInvoiceData = createReducer(defaultState, {
  [actions.CANCEL_INVOICE]: isLoadingStateReducer,
  [actions.CANCEL_INVOICE_SUCCESS]: successStateReducer,
  [actions.CANCEL_INVOICE_ERROR]: errorStateReducer,
  [actions.CANCEL_INVOICE_CLEAR]: resetStateReducer,
});

const getTransactionReportData = createReducer(defaultState, {
  [actions.GET_TRANSACTION_REPORT]: isLoadingStateReducer,
  [actions.GET_TRANSACTION_REPORT_SUCCESS]: successStateReducer,
  [actions.GET_TRANSACTION_REPORT_ERROR]: errorStateReducer,
  [actions.GET_TRANSACTION_REPORT_CLEAR]: resetStateReducer,
});

const getSettlementReportData = createReducer(defaultState, {
  [actions.GET_SETTLEMENT_REPORT]: isLoadingStateReducer,
  [actions.GET_SETTLEMENT_REPORT_SUCCESS]: successStateReducer,
  [actions.GET_SETTLEMENT_REPORT_ERROR]: errorStateReducer,
  [actions.GET_SETTLEMENT_REPORT_CLEAR]: resetStateReducer,
});

const updateSettlementReportData = createReducer(defaultState, {
  [actions.UPDATE_SETTLEMENT_REPORT]: isLoadingStateReducer,
  [actions.UPDATE_SETTLEMENT_REPORT_SUCCESS]: successStateReducer,
  [actions.UPDATE_SETTLEMENT_REPORT_ERROR]: errorStateReducer,
  [actions.UPDATE_SETTLEMENT_REPORT_CLEAR]: resetStateReducer,
});

const panAadharLinkData = createReducer(defaultState, {
  [actions.PAN_AADHAR_LINK]: isLoadingStateReducer,
  [actions.PAN_AADHAR_LINK_SUCCESS]: successStateReducer,
  [actions.PAN_AADHAR_LINK_ERROR]: errorStateReducer,
  [actions.PAN_AADHAR_LINK_CLEAR]: resetStateReducer,
});

export default combineReducers({
  getInvoiceData,
  generateInvoiceData,
  cancelInvoiceData,
  getTransactionReportData,
  getSettlementReportData,
  updateSettlementReportData,
  panAadharLinkData,
});
