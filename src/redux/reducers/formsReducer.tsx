import { actionIds } from 'redux/types/actionsType';

const formState = {
  response: null,
  error: null,
};

const formReducer = (state = formState, action) => {
  switch (action.type) {
    case actionIds.FORM_SUBMIT_SUCCESS:
      const data = action.payload;
      return { ...state, response: data };
    case actionIds.FORM_SUBMIT_FAILURE:
      const bdata = action.payload;
      return { ...state, error: bdata };
    default:
      return state;
  }
};

export default formReducer;
