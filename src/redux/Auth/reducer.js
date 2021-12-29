import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SET_AUTHENTICATION,
  CLOSE_ERROR_MODAL_AUTH
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: {
    show: false,
    message: ''
  },
  user: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case LOGIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        user: action.payload
      };
    }
    case LOGIN_REJECTED: {
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
