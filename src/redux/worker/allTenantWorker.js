import { call } from "redux-saga/effects";
import { axiosApiRequestForplainText, httpRequestForData } from "@/src/api/api";
import apiInfo from "@/src/api/apiEndpoints";
import actions from "../actionTypes/allTenantAction";

export function* allTenant({ payload }) {
  const {
    allTenant: { endPoint, method },
  } = apiInfo;
  const requestParameters = {
    url: `${endPoint}/${payload?.params}`,
    apiMethod: method,
    successAction: actions.ALL_TENANT_GET_SUCCESS,
    errorAction: actions.ALL_TENANT_GET_ERROR,
  };
  yield call(httpRequestForData, requestParameters);
}
