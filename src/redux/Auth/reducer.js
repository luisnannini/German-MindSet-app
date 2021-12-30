import {
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  SET_AUTHENTICATION,
  CLOSE_ERROR_MODAL_AUTH
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: {
    show: false,
    message: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case REGISTER_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    }
    case REGISTER_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true
      };
    }
    case CLOSE_ERROR_MODAL_AUTH: {
      return {
        ...state,
        error: {
          show: false
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
