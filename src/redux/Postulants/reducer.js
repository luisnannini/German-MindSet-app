import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_POSTULANT_BY_ID_FETCHING,
  GET_POSTULANT_BY_ID_FULFILLED,
  GET_POSTULANT_BY_ID_REJECTED,
  GET_POSTULANT_BY_EMAIL_FETCHING,
  GET_POSTULANT_BY_EMAIL_FULFILLED,
  GET_POSTULANT_BY_EMAIL_REJECTED,
  CREATE_POSTULANT_FETCHING,
  CREATE_POSTULANT_FULFILLED,
  CREATE_POSTULANT_REJECTED,
  UPDATE_POSTULANT_FETCHING,
  UPDATE_POSTULANT_FULFILLED,
  UPDATE_POSTULANT_REJECTED,
  DELETE_POSTULANT_FETCHING,
  DELETE_POSTULANT_FULFILLED,
  DELETE_POSTULANT_REJECTED,
  CLOSE_ERROR_MODAL_POSTULANTS
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false, message: '' }
};

const reducerPostulants = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_POSTULANTS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_POSTULANTS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_POSTULANT_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_POSTULANT_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_POSTULANT_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_POSTULANT_BY_EMAIL_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_POSTULANT_BY_EMAIL_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_POSTULANT_BY_EMAIL_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_POSTULANT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_POSTULANT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_POSTULANT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_POSTULANT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_POSTULANT_FULFILLED: {
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
    case UPDATE_POSTULANT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_POSTULANT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case DELETE_POSTULANT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_POSTULANT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_POSTULANTS: {
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

export default reducerPostulants;
