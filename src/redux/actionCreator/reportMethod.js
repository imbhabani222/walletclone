import actions from "../actionTypes/reportAction";

export const paymentReport = (payload) => ({
  type: actions.PAYMENT_REPORT,
  payload,
});

export const settlementReport = (payload) => ({
  type: actions.SETTLEMENT_REPORT,
  payload,
});

export const auditReport = (payload) => ({
  type: actions.AUDIT_REPORT,
  payload,
});

export const getCustomerList = (payload) => ({
  type: actions.GET_CUSTOMER_LIST,
  payload,
});
export const getSearchList = (payload) => ({
  type: actions.GET_SEARCH_LIST,
  payload,
});

export const clearSearchList = () => ({
  type: actions.GET_SEARCH_LIST_CLEAR,
});

export const getClientList = (payload) => ({
  type: actions.GET_CLIENT_LIST,
  payload,
});

export const paymentReportFilter = (payload) => ({
  type: actions.PAYMENT_REPORT_FILTER,
  payload,
});

export const clearCustomerList = () => ({
  type: actions.GET_CUSTOMER_LIST_CLEAR,
});

export const clearClientList = () => ({
  type: actions.GET_CLIENT_LIST_CLEAR,
});
