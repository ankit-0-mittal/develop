const errorState = {
  error: null,
};

const errorReducer = (state = errorState, action) => {
  switch (action.type) {
    case 'GETTING_ERROR':
      return { ...state, error: action.payload };
    case 'NULLING_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export default errorReducer;
