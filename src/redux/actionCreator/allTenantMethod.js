import actions from "../actionTypes/allTenantAction";
export const allTenant = (payload) => ({
  type: actions.ALL_TENANT_GET,
  payload,
});
