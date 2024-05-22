"use client";
import { put, call } from "redux-saga/effects";
import axios from "./axiosSetup";
import CONSTANTS from "../constant/constant";
import { apiFailureAlert } from "../redux/actionCreator";

const {
  HTTP_REQUEST_METHODS: { GET },
  API_ERROR
} = CONSTANTS;

export const defaultPayload = {
  url: null,
  apiPayload: {},
  apiMethod: GET,
  successAction: null,
  errorAction: null,
  additionalInfo: {},
};

export const createDispatchObject = (
  actionType,
  result = null,
  additionalInfo = {},
  error = null,
  fetching = false
) => ({
  type: actionType,
  result,
  fetching,
  ...additionalInfo,
  error,
});

export const axiosApiRequest = ({ url, apiMethod, apiPayload = "", headers }) => {
  return axios({
    method: apiMethod,
    url,
    data: apiPayload,
    headers
  });
};

export const axiosApiRequestForplainText = ({url, apiMethod, apiPayload = "", headers}) => {
  return axios({
    method: apiMethod,
    url,
    data: apiPayload,
    headers,
  });
};

export function* httpRequestForData(payLoad = defaultPayload) {
  const {
    url,
    apiMethod,
    apiPayload,
    successAction,
    errorAction,
    additionalInfo,
    headers,
    axiosRequest = axiosApiRequest,
  } = payLoad;
  try {
    const result = yield call(axiosRequest, {
      url,
      apiMethod,
      apiPayload,
      headers
    });

    yield put(createDispatchObject(successAction, result.data, additionalInfo));
    return result;
  } catch (error) {
    const errorMsg = error?.response?.data?.message || API_ERROR
    yield put(
      createDispatchObject(
        errorAction,
        {
          ...error,
        },
        additionalInfo,
        error
      )
    );
    yield put(apiFailureAlert(errorMsg));
    return error;
    // throw new Error(error);
  }
}

export default axiosApiRequest;
