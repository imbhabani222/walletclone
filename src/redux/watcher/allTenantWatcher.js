import { takeLatest } from "redux-saga/effects";
import actions from "../actionTypes/allTenantAction";
import { allTenant } from "../worker/allTenantWorker";

export function* allTenantWatcher() {
  yield takeLatest(actions.ALL_TENANT_GET, allTenant);
}
