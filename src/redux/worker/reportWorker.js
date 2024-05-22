import { call } from "redux-saga/effects";
import { httpRequestForData, axiosApiRequestForplainText } from "@/src/api/api";
import apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/reportAction";

export function* paymentReport({ payload }) {
  const {
    paymentReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload?.params}`,
    apiMethod: method,
    headers: payload.headers,
    apiPayload: payload.body,
    successAction: actions.PAYMENT_REPORT_SUCCESS,
    errorAction: actions.PAYMENT_REPORT_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* settlementReport({ payload }) {
  const {
    settlmentReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}?${payload?.params}`,
    apiMethod: method,
    headers: payload.headers,
    apiPayload: payload.body,
    successAction: actions.SETTLEMENT_REPORT_SUCCESS,
    errorAction: actions.SETTLEMENT_REPORT_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* auditReport({ payload }) {
  const {
    auditReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}`,
    apiMethod: method,
    successAction: actions.AUDIT_REPORT_SUCCESS,
    errorAction: actions.AUDIT_REPORT_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* customerList({ payload }) {
  const {
    getCustomerList: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.GET_CUSTOMER_LIST_SUCCESS,
    errorAction: actions.GET_CUSTOMER_LIST_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* searchReportList({ payload }) {
  const {
    getSearchList: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}?${payload.params}`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.GET_SEARCH_LIST_SUCCESS,
    errorAction: actions.GET_SEARCH_LIST_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* clientList({ payload }) {
  const {
    getClientList: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.GET_CLIENT_LIST_SUCCESS,
    errorAction: actions.GET_CLIENT_LIST_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* paymentReportFilter({ payload }) {
  const {
    reportFilter: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}&productId=${payload.params.productId}&customerId=${payload.params.customerId}&startdate=${payload.params.startdate}&enddate=${payload.params.enddate}&role=${payload.params.role}`,
    apiMethod: method,
    headers: payload.headers,
    apiPayload: payload.body,
    successAction: actions.PAYMENT_REPORT_SUCCESS,
    errorAction: actions.PAYMENT_REPORT_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}
