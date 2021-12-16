import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  GET_CLIENT_BY_ID_FETCHING,
  GET_CLIENT_BY_ID_FULFILLED,
  GET_CLIENT_BY_ID_REJECTED,
  CREATE_CLIENT_FETCHING,
  CREATE_CLIENT_FULFILLED,
  CREATE_CLIENT_REJECTED,
  UPDATE_CLIENT_FETCHING,
  UPDATE_CLIENT_FULFILLED,
  UPDATE_CLIENT_REJECTED,
  DELETE_CLIENT_FETCHING,
  DELETE_CLIENT_FULFILLED,
  DELETE_CLIENT_REJECTED,
  CLOSE_ERROR_MODAL_CLIENTS
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false, message: '' }
};

const reducerClients = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_CLIENTS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_CLIENTS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_CLIENT_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_CLIENT_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_CLIENT_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_CLIENT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_CLIENT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_CLIENT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_CLIENT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_CLIENT_FULFILLED: {
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
    case UPDATE_CLIENT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_CLIENT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case DELETE_CLIENT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_CLIENT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_CLIENTS: {
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

export default reducerClients;
