"use client";
import axios from "axios";
import config from "../config/envURL";
import Auth from "../config/auth";
import CONSTANTS from "../constant/constant";

const {
  API_TIME_OUT,
  HTTP_REQ_DEFAULT_HEADERS,
  HTTP_STATUS: { UNAUTHORISED, FORBIDDEN },
  PAGE_ROUTES: { LOGIN, NOT_AUTH },
} = CONSTANTS;

const customAxios = axios.create({
  baseURL: config.API.baseURL,
  timeout: API_TIME_OUT,
  headers: {
    Authorization: Auth.getAuthToken(),
    post: {
      Accept: HTTP_REQ_DEFAULT_HEADERS.Accept,
      "Content-Type": HTTP_REQ_DEFAULT_HEADERS["Content-Type"],
    },
  },
});

const requestHandler = (request) => {
  request.headers.Authorization = Auth.getAuthToken();
  return request;
};

const responseHandler = (response) => {
  const { status } = response;
  if (status === UNAUTHORISED || status === FORBIDDEN) {
    window.location.replace(LOGIN);
  }
  return response;
};

const errorHandler = (error = "") => {
  const { response = "" } = error || "";
  const { status } = response;
  if (
    status === UNAUTHORISED ||
    status === FORBIDDEN ||
    response?.data?.ResponseCode === "SessionExpired" ||
    response?.data?.ErrorMessage?.ResponseCode === "SessionExpired"
  ) {
    window.location.replace(NOT_AUTH);
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
