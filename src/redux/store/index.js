import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createSagaMiddleware from "redux-saga";
import RootReducer from "../reducer";
import RootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

export default store;