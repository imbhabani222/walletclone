import { call } from "redux-saga/effects";
import {
  axiosApiRequestForplainText,
  httpRequestForData,
  axiosApiRequest,
} from "@/src/api/api";
import apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/allOrgAction";

export function* allOrg({ payload }) {
  const {
    allOrg: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    successAction: actions.ALL_ORG_GET_SUCCESS,
    errorAction: actions.ALL_ORG_GET_ERROR,
    headers: payload.headers,
  };
  // requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}
export function* singleOrg({ payload }) {
  const {
    singleOrg: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}/organisation`,
    apiMethod: method,
    successAction: actions.SINGLE_ORG_GET_SUCCESS,
    errorAction: actions.SINGLE_ORG_GET_ERROR,
    headers: payload.headers,
  };

  requestParameters.axiosRequest = axiosApiRequestForplainText;
  yield call(httpRequestForData, requestParameters);
}

export function* enableDisable({ payload }) {
  const {
    enableDisableOrg: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}?action=${payload.flag}`,
    apiMethod: method,
    successAction: actions.ENABLE_DISABLE_ORG_SUCCESS,
    errorAction: actions.ENABLE_DISABLE_ORG_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequest;

  yield call(httpRequestForData, requestParameters);
}

export function* approveDeny({ payload }) {
  const {
    approveDisapprove: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}?action=${payload.flag}`,
    apiMethod: method,
    successAction: actions.APPROVE_DENY_ORG_SUCCESS,
    errorAction: actions.APPROVE_DENY_ORG_ERROR,
  };
  requestParameters.axiosRequest = axiosApiRequest;
  yield call(httpRequestForData, requestParameters);
}

export function* userList({ payload }) {
  const {
    userList: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    successAction: actions.USER_LIST_SUCCESS,
    errorAction: actions.USER_LIST_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* addUser({ payload }) {
  const {
    addUser: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.ADD_USER_SUCCESS,
    errorAction: actions.ADD_USER_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* byRole({ payload }) {
  const {
    byRole: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    successAction: actions.BY_ROLE_SUCCESS,
    errorAction: actions.BY_ROLE_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* addProduct({ payload }) {
  const {
    addProduct: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.ADD_PRODUCT_SUCCESS,
    errorAction: actions.ADD_PRODUCT_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* getProduct({ payload }) {
  const {
    getProduct: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    successAction: actions.GET_PRODUCT_SUCCESS,
    errorAction: actions.GET_PRODUCT_ERROR,
    headers: payload.headers,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* generateKey({ payload }) {
  const {
    generateKey: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload?.params}/key?action=generateKey`,
    apiMethod: method,
    apiPayload: payload.body,
    headers: payload.headers,
    successAction: actions.GENERATE_KEY_SUCCESS,
    errorAction: actions.GENERATE_KEY_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* verifyKey({ payload }) {
  const {
    generateKey: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}/token?action=verify`,
    apiMethod: method,
    successAction: actions.VERIFY_KEY_SUCCESS,
    errorAction: actions.VERIFY_KEY_ERROR,
    headers: payload.headers,
    apiPayload: payload.body,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* enabledDisableProductOwner({ payload }) {
  const {
    enableDisableProductOwner: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}/updateStatus`,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.ENABLE_DISABLE_PRODUCT_OWNER_SUCCESS,
    errorAction: actions.ENABLE_DISABLE_PRODUCT_OWNER_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* dependentProduct({ payload }) {
  const {
    getDepedentProduct: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: endPoint,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.DEPENDENT_PRODUCT_SUCCESS,
    errorAction: actions.DEPENDENT_PRODUCT_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* updateProduct({ payload }) {
  const {
    updateProduct: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload?.params}`,
    apiMethod: method,
    successAction: actions.UPDATE_PRODUCT_SUCCESS,
    errorAction: actions.UPDATE_PRODUCT_ERROR,
    apiPayload: payload.body,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* updateUser({ payload }) {
  const {
    updateUser: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload?.params}/updateUsers`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.UPDATE_USER_SUCCESS,
    errorAction: actions.UPDATE_USER_ERROR,
    apiPayload: payload.body,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* updatePaymentGateWay({ payload }) {
  const {
    updatePaymentGateWay: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.UPDATE_PAYMENT_GATEWAY_CUT_SUCCESS,
    errorAction: actions.UPDATE_PAYMENT_GATEWAY_CUT_ERROR,
    apiPayload: payload.body,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* updateThershold({ payload }) {
  const {
    updateThershold: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}/updateThreshold`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.UPDATE_THERSHOLD_SUCCESS,
    errorAction: actions.UPDATE_THERSHOLD_ERROR,
    apiPayload: payload.body,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* getPaymentCharge({ payload }) {
  const {
    getPaymentMethod: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}/${payload.params}`,
    apiMethod: method,
    headers: payload.headers,
    successAction: actions.GET_PAYMENT_CHARGE_SUCCESS,
    errorAction: actions.GET_PAYMENT_CHARGE_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* getPaymentProviderReports({ payload }) {
  const {
    getPaymentProviderReport: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: payload?.params ? `${endPoint}${payload.params}` : `${endPoint}`,
    apiMethod: method,
    successAction: actions.GET_PAYMENT_PROVIDERS_REPORTS_SUCCESS,
    errorAction: actions.GET_PAYMENT_PROVIDERS_REPORTS_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* updatePaymentProviders({ payload }) {
  const {
    updatePaymentProviders: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}`,
    apiMethod: method,
    apiPayload: payload,
    successAction: actions.UPDATE_PAYMENT_PROVIDERS_SUCCESS,
    errorAction: actions.UPDATE_PAYMENT_PROVIDERS_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* fetchPaymentProviders() {
  const {
    fetchPaymentProviders: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}`,
    apiMethod: method,
    successAction: actions.FETCH_PAYMENT_PROVIDERS_SUCCESS,
    errorAction: actions.FETCH_PAYMENT_PROVIDERS_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* fetchPrefrence({ payload }) {
  const {
    fetchPrefrence: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}${payload.query}`,
    apiMethod: method,
    successAction: actions.FETCH_PREFRENCE_LIST_SUCCESS,
    errorAction: actions.FETCH_PREFRENCE_LIST_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* createWebHookURL({ payload }) {
  const {
    createWebHookURL: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}`,
    apiMethod: method,
    apiPayload: payload.body,
    successAction: actions.CREATE_WEBHOOK_URL_SUCCESS,
    errorAction: actions.CREATE_WEBHOOK_URL_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* getWebHookURL({ payload }) {
  const {
    getWebHookURL: { endPoint, method },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}${payload.params}`,
    apiMethod: method,
    successAction: actions.GET_WEBHOOK_URL_SUCCESS,
    errorAction: actions.GET_WEBHOOK_URL_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}

export function* getSalesHeader({ payload }) {
  const {
    getSalesHeader: { endPoint, method, responseType },
  } = apiInfo;

  const requestParameters = {
    url: `${endPoint}${payload.query}`,
    apiMethod: method,
    responseType: responseType,
    successAction: actions.GET_SALES_HEADER_SUCCESS,
    errorAction: actions.GET_SALES_HEADER_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}
