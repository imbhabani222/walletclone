import { combineReducers } from "redux";
import {
  isLoadingStateReducer,
  createReducer,
  successStateReducer,
  errorStateReducer,
  resetStateReducer,
} from "./config/higherOrderReducer";
import { defaultState } from "./config/defaultState";
import actions from "../actionTypes/allTenantAction";

const allTenant = createReducer(defaultState, {
  [actions.ALL_TENANT_GET]: isLoadingStateReducer,
  [actions.ALL_TENANT_GET_SUCCESS]: successStateReducer,
  [actions.ALL_TENANT_GET_FAILURE]: errorStateReducer,
  [actions.ALL_TENANT_GET_CLEAR]: resetStateReducer,
});

export default combineReducers({
  allTenant,
});
