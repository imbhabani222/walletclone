import store  from "../store/index";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}