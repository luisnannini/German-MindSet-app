import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_SESSION_BY_ID_FETCHING,
  GET_SESSION_BY_ID_FULFILLED,
  GET_SESSION_BY_ID_REJECTED,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  CLOSE_ERROR_MODAL_SESSIONS,
  CLEAR_SELECTED_ITEM
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false, message: '' }
};

const reducerSessions = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_SESSIONS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_SESSIONS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_SESSION_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_SESSION_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_SESSION_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_SESSION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_SESSION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_SESSION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_SESSION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_SESSION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };
    }
    case UPDATE_SESSION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_SESSION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case DELETE_SESSION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_SESSION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_SESSIONS: {
      return {
        ...state,
        error: {
          show: false
        }
      };
    }
    case CLEAR_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    default: {
      return state;
    }
  }
};

export default reducerSessions;
