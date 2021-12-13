import {
  GET_PSYCHOLOGISTS_FETCHING,
  GET_PSYCHOLOGISTS_FULFILLED,
  GET_PSYCHOLOGISTS_REJECTED,
  GET_PSYCHOLOGIST_BY_ID_FETCHING,
  GET_PSYCHOLOGIST_BY_ID_FULFILLED,
  GET_PSYCHOLOGIST_BY_ID_REJECTED,
  CREATE_PSYCHOLOGIST_FETCHING,
  CREATE_PSYCHOLOGIST_FULFILLED,
  CREATE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  CLOSE_ERROR_MODAL_PSYCHOLOGISTS
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false, message: '' }
};

const reducerPsychologists = (state = initialState, action) => {
  switch (action.type) {
    case GET_PSYCHOLOGISTS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_PSYCHOLOGISTS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_PSYCHOLOGISTS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_PSYCHOLOGIST_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_PSYCHOLOGIST_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_PSYCHOLOGIST_FULFILLED: {
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
    case UPDATE_PSYCHOLOGIST_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case DELETE_PSYCHOLOGIST_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_PSYCHOLOGIST_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_PSYCHOLOGISTS: {
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

export default reducerPsychologists;
