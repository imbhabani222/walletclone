import { keyMirror } from "@/src/utils/keymirror";
const actions = {
  GET_INVOICE: null,
  GET_INVOICE_SUCCESS: null,
  GET_INVOICE_ERROR: null,
  GET_INVOICE_CLEAR: null,

  CREATE_INVOICE: null,
  CREATE_INVOICE_SUCCESS: null,
  CREATE_INVOICE_ERROR: null,
  CREATE_INVOICE_CLEAR: null,

  CANCEL_INVOICE: null,
  CANCEL_INVOICE_SUCCESS: null,
  CANCEL_INVOICE_ERROR: null,
  CANCEL_INVOICE_CLEAR: null,

  GET_TRANSACTION_REPORT: null,
  GET_TRANSACTION_REPORT_SUCCESS: null,
  GET_TRANSACTION_REPORT_ERROR: null,
  GET_TRANSACTION_REPORT_CLEAR: null,

  GET_SETTLEMENT_REPORT: null,
  GET_SETTLEMENT_REPORT_SUCCESS: null,
  GET_SETTLEMENT_REPORT_ERROR: null,
  GET_SETTLEMENT_REPORT_CLEAR: null,

  UPDATE_SETTLEMENT_REPORT: null,
  UPDATE_SETTLEMENT_REPORT_SUCCESS: null,
  UPDATE_SETTLEMENT_REPORT_ERROR: null,
  UPDATE_SETTLEMENT_REPORT_CLEAR: null,

  PAN_AADHAR_LINK: null,
  PAN_AADHAR_LINK_SUCCESS: null,
  PAN_AADHAR_LINK_ERROR: null,
  PAN_AADHAR_LINK_CLEAR: null,
};

export default keyMirror(actions);
