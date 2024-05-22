import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import { orgDataReducer, signupDataReducer } from "./kycDataReducer";
import apiMessageReducer from "./apiMessageReducer";
import allOrgReducer from "./allOrgReducer";
import allTenantReducer from "./allTenantReducer";
import reportReducer from "./reportReducer";
import invoiceReducer from "./invoiceReducer";

const RootReducer = combineReducers({
  loginReducer,
  orgDataReducer,
  signupReducer,
  signupDataReducer,
  allOrgReducer,
  allTenantReducer,
  apiMessageReducer,
  reportReducer,
  invoiceReducer,
});
export default RootReducer;
