import actions from "../actionTypes/invoiceAction";
export const getInvoice = (payload) => ({
  type: actions.GET_INVOICE,
  payload,
});

export const getTransactionReport = (payload) => ({
  type: actions.GET_TRANSACTION_REPORT,
  payload,
});

export const getSettlementReport = (payload) => ({
  type: actions.GET_SETTLEMENT_REPORT,
  payload,
});

export const generateInvoice = (payload) => ({
  type: actions.CREATE_INVOICE,
  payload,
});
export const cancelInvoice = (payload) => ({
  type: actions.CANCEL_INVOICE,
  payload,
});

export const ClearInvoice = () => ({
  type: actions.GET_INVOICE_CLEAR,
});

export const ClearTransactionReport = () => ({
  type: actions.GET_TRANSACTION_REPORT_CLEAR,
});

export const ClearSettlementReport = () => ({
  type: actions.GET_SETTLEMENT_REPORT_CLEAR,
});

export const ClearGenerateInvoice = () => ({
  type: actions.CREATE_INVOICE_CLEAR,
});
export const ClearCancelInvoice = () => ({
  type: actions.CANCEL_INVOICE_CLEAR,
});

export const updateSettlement = (payload) => ({
  type: actions.UPDATE_SETTLEMENT_REPORT,
  payload,
});
export const panAadharLink = (payload) => ({
  type: actions.PAN_AADHAR_LINK,
  payload,
});
export const clearPanAadharLink = () => ({
  type: actions.PAN_AADHAR_LINK_CLEAR,
});
