import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_BY_ID_FETCHING,
  GET_ADMIN_BY_ID_FULFILLED,
  GET_ADMIN_BY_ID_REJECTED,
  ADD_ADMIN_FETCHING,
  ADD_ADMIN_FULFILLED,
  ADD_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED,
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  SET_ADMIN,
  ADMIN_CLOSE_ERROR_MODAL
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  admins: [],
  admin: {},
  error: { show: false }
};

const reducerProfiles = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_ADMINS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        admins: action.payload
      };
    }
    case GET_ADMINS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_ADMIN_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        admin: initialState.admin
      };
    }
    case GET_ADMIN_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        admin: action.payload
      };
    }
    case GET_ADMIN_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ADD_ADMIN_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case ADD_ADMIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        admins: [...state.admins, action.payload]
      };
    }
    case ADD_ADMIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_ADMIN_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_ADMIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        admins: state.admins.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };
    }
    case UPDATE_ADMIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_ADMIN_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState
      };
    }
    case DELETE_ADMIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        admins: state.admins.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_ADMIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SET_ADMIN: {
      return {
        ...state,
        admin: action.payload
      };
    }
    case ADMIN_CLOSE_ERROR_MODAL: {
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

export default reducerProfiles;
