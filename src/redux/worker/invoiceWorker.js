import { call } from "redux-saga/effects";
import { httpRequestForData, axiosApiRequestForplainText } from "@/src/api/api";
import apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/invoiceAction";

export function* getInvoiceFun({ payload }) {
  const {
    getInvoice: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}?${payload?.params}`,
    apiMethod: method,
    successAction: actions.GET_INVOICE_SUCCESS,
    errorAction: actions.GET_INVOICE_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}

export function* getTransactionReportFun({ payload }) {
  const {
    getTransactionReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}?${payload?.params}`,
    apiMethod: method,
    successAction: actions.GET_TRANSACTION_REPORT_SUCCESS,
    errorAction: actions.GET_TRANSACTION_REPORT_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}

export function* getSettlementReportFun({ payload }) {
  const {
    getSettlementReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}?${payload?.params}`,
    apiMethod: method,
    successAction: actions.GET_SETTLEMENT_REPORT_SUCCESS,
    errorAction: actions.GET_SETTLEMENT_REPORT_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}

export function* updateSettlementReportFun({ payload }) {
  const {
    updateSettlement: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.UPDATE_SETTLEMENT_REPORT_SUCCESS,
    errorAction: actions.UPDATE_SETTLEMENT_REPORT_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* panAadharLinkFun({ payload }) {
  const {
    panAadharLink: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.PAN_AADHAR_LINK_SUCCESS,
    errorAction: actions.PAN_AADHAR_LINK_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* generateInvoiceFun({ payload }) {
  const {
    generateInvoice: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.CREATE_INVOICE_SUCCESS,
    errorAction: actions.CREATE_INVOICE_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}

export function* cancelInvoiceFun({ payload }) {
  const {
    cancelInvoice: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.CANCEL_INVOICE_SUCCESS,
    errorAction: actions.CANCEL_INVOICE_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}
