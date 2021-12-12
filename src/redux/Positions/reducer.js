import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_POSITION_BY_ID_FETCHING,
  GET_POSITION_BY_ID_FULFILLED,
  GET_POSITION_BY_ID_REJECTED,
  CREATE_POSITION_FETCHING,
  CREATE_POSITION_FULFILLED,
  CREATE_POSITION_REJECTED,
  UPDATE_POSITION_FETCHING,
  UPDATE_POSITION_FULFILLED,
  UPDATE_POSITION_REJECTED,
  DELETE_POSITION_FETCHING,
  DELETE_POSITION_FULFILLED,
  DELETE_POSITION_REJECTED,
  CLOSE_ERROR_MODAL_POSITIONS
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: { show: false }
};

const reducerPositions = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITIONS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_POSITIONS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_POSITIONS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_POSITION_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_POSITION_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    }
    case GET_POSITION_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_POSITION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_POSITION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_POSITION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_POSITION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_POSITION_FULFILLED: {
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
    case UPDATE_POSITION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_POSITION_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState
      };
    }
    case DELETE_POSITION_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_POSITION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_POSITIONS: {
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

export default reducerPositions;
