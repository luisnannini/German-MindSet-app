import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  GET_APPLICATION_BY_ID_FETCHING,
  GET_APPLICATION_BY_ID_FULFILLED,
  GET_APPLICATION_BY_ID_REJECTED,
  CREATE_APPLICATION_FETCHING,
  CREATE_APPLICATION_FULFILLED,
  CREATE_APPLICATION_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  CLOSE_ERROR_MODAL_APPLICATIONS
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false }
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_APPLICATIONS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_APPLICATIONS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_APPLICATION_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_APPLICATION_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_APPLICATION_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_APPLICATION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_APPLICATION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_APPLICATION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_APPLICATION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState
      };
    }
    case DELETE_APPLICATION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_APPLICATION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_APPLICATIONS: {
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

export default applicationsReducer;
