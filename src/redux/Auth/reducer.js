import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  SET_AUTHENTICATION,
  GET_POSTULANT_DATA_FETCHING,
  GET_POSTULANT_DATA_FULFILLED,
  GET_POSTULANT_DATA_REJECTED,
  CLOSE_ERROR_MODAL_AUTH
} from '../../constants/actionTypes';

const initialState = {
  isLoading: true,
  authenticated: undefined,
  data: {},
  error: {
    show: false,
    message: ''
  }
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
        authenticated: action.payload
      };
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
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
        authenticated: action.payload
      };
    }
    case REGISTER_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case LOGOUT_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case LOGOUT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: initialState.authenticated,
        data: initialState.data
      };
    }
    case LOGOUT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isLoading: false
      };
    }
    case GET_POSTULANT_DATA_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        data: initialState.data
      };
    }
    case GET_POSTULANT_DATA_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }
    case GET_POSTULANT_DATA_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
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
