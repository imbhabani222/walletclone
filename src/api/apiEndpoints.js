import CONSTANTS from "../constant/constant";

const {
  HTTP_REQUEST_METHODS: { POST, PUT, GET },
} = CONSTANTS;

const API_ENDPOINTS = {
  login: {
    endPoint: "auth/api/v1.0/authenz/identities/?action=signin",
    method: POST,
  },
  resendOTP: {
    endPoint: "auth/api/v1.0/authenz/",
    method: POST,
  },
  signUp: {
    endPoint: "auth/api/v1.0/authenz/identities",
    method: POST,
  },
  verifyOTP: {
    endPoint: "auth/api/v1.0/authenz/identities/",
    method: POST,
  },
  createOrganisations: {
    endPoint: "wallet/api/v1.0/organisations",
    method: POST,
  },
  kycVerify: {
    endPoint: "wallet/api/v1.0",
    method: PUT,
  },
  updateOrg: {
    endPoint: "auth/api/v1.0/authenz/identities",
    method: PUT,
  },
  allOrg: {
    endPoint: "wallet/api/v1.0/organisations",
    method: GET,
  },
  singleOrg: {
    endPoint: "wallet/api/v1.0",
    method: GET,
  },
  allTenant: {
    endPoint: "auth/api/v1.0/authenz/identities/getTenantInfo",
    method: GET,
  },
  // allTenant: {
  //   endPoint: "auth/api/v1/authenz/identities/getTenants",
  //   method: GET,
  // },
  enableDisableOrg: {
    endPoint: "wallet/api/v1.0",
    method: POST,
  },
  approveDisapprove: {
    endPoint: "wallet/api/v1.0/kycStatus",
    method: POST,
  },
  addUser: {
    endPoint: "auth/api/v1.0/authenz/onboardUsers",
    method: POST,
  },
  userList: {
    endPoint: "auth/api/v1.0/authenz/identities/getUsers",
    method: GET,
  },
  byRole: {
    endPoint: "product/api/v1.0/products/byRole",
    method: GET,
  },
  addProduct: {
    endPoint: "product/api/v1.0/products",
    method: POST,
  },
  getProduct: {
    endPoint: "product/api/v1.0/products",
    method: GET,
  },
  generateKey: {
    endPoint: "auth/api/v1.0/authenz/identities",
    method: POST,
  },
  enableDisableProductOwner: {
    endPoint: "auth/api/v1.0/authenz/identities",
    method: PUT,
  },
  getDepedentProduct: {
    endPoint: "product/api/v1.0/products/dependentProducts",
    method: GET,
  },
  updateUser: {
    endPoint: "auth/api/v1.0/authenz/identities",
    method: PUT,
  },
  updateProduct: {
    endPoint: "product/api/v1.0/products",
    method: PUT,
  },
  paymentReport: {
    endPoint: "payments/api/v2.0/payment",
    method: GET,
  },
  settlmentReport: {
    endPoint: "orders/api/v2.0/fetchorders",
    method: POST,
  },
  auditReport: {
    endPoint: "audit/api/v1.0/events/tenants",
    method: GET,
  },
  getCustomerList: {
    endPoint: "customer/api/v2.0",
    method: GET,
  },
  getClientList: {
    endPoint: "customer/api/v2.0/customers",
    method: GET,
  },
  panAadharLink: {
    endPoint: "customer/api/v2.0/customers/panstatusSingle",
    method: POST,
  },
  getSearchList: {
    endPoint: "orders/api/v2.0/orders/",
    method: GET,
  },
  getSearchList: {
    endPoint: "orders/api/v2.0/orders/",
    method: GET,
  },
  reportFilter: {
    endPoint: "payments/api/v2.0/payment/product?filter=product",
    method: GET,
  },
  updatePaymentGateWay: {
    endPoint: "payments/api/v2.0",
    method: PUT,
  },
  updateThershold: {
    endPoint: "product/api/v1.0/products",
    method: PUT,
  },
  getPaymentMethod: {
    endPoint: "payments/api/v2.0/payment",
    method: GET,
  },
  updatePaymentProviders: {
    endPoint: "payments/api/v2.0/updatepaymentpreference",
    method: PUT,
  },
  getPaymentProviderReport: {
    endPoint: "payments/api/v2.0/fetchproviderreports",
    method: GET,
  },
  fetchPaymentProviders: {
    endPoint: "payments/api/v2.0/getproviders",
    method: GET,
  },
  fetchPrefrence: {
    endPoint: "payments/api/v2.0/fetchpreferences",
    method: GET,
  },
  createWebHookURL: {
    endPoint: "payments/api/v2.0/payment/setting",
    method: POST,
  },
  getWebHookURL: {
    endPoint: "payments/api/v2.0/payment/webhook",
    method: GET,
  },
  getSalesHeader: {
    endPoint: "orders/api/v2.0/downloadsalesfiles",
    method: GET,
  },
  getInvoice: {
    endPoint: "orders/api/v2.0/getInvoice",
    method: GET,
  },
  generateInvoice: {
    endPoint: "orders/api/v2.0/invoices",
    method: POST,
  },
  cancelInvoice: {
    endPoint: "orders/api/v2.0/cancelInvoice",
    method: POST,
  },
  getTransactionReport: {
    endPoint: "orders/api/v2.0/transactionReport",
    method: GET,
  },
  getSettlementReport: {
    endPoint: "orders/api/v2.0/financeReport",
    method: GET,
  },
  updateSettlement: {
    endPoint: "orders/api/v2.0/invoiceSettlement",
    method: POST,
  },
};

export default API_ENDPOINTS;
