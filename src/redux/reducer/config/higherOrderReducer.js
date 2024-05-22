export const createReducer = (initialState, handlers) => {
  return function baseReducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export const isLoadingStateReducer = (state) => ({
  ...state,
  isLoading: true,
  resultData: null,
  errorData: null,
});

export const successStateReducer = (state, { result }) => ({
  ...state,
  isLoading: false,
  resultData: result.result || result,
  errorData: null,
});

export const errorStateReducer = (state, { error }) => ({
  ...state,
  isLoading: false,
  resultData: null,
  errorData: error,
});

export const resetStateReducer = (state) => ({
  ...state,
  isLoading: false,
  resultData: null,
  errorData: null,
});
