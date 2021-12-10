import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  GET_PROFILE_BY_ID_FETCHING,
  GET_PROFILE_BY_ID_FULFILLED,
  GET_PROFILE_BY_ID_REJECTED,
  CREATE_PROFILE_FETCHING,
  CREATE_PROFILE_FULFILLED,
  CREATE_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED,
  CLOSE_ERROR_MODAL_PROFILES
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  profile: {},
  error: { show: false }
};

const reducerProfiles = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES_FETCHING: {
      return {
        ...state,
        isLoading: true,
        // Reset the error value with the initial error value
        error: initialState.error
      };
    }
    case GET_PROFILES_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_PROFILES_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_PROFILE_BY_ID_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        profile: initialState.profile
      };
    }
    case GET_PROFILE_BY_ID_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      };
    }
    case GET_PROFILE_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CREATE_PROFILE_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case CREATE_PROFILE_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        // Add the new profile created into the previous admin list
        list: [...state.list, action.payload]
      };
    }
    case CREATE_PROFILE_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_PROFILE_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case UPDATE_PROFILE_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        // Update the updated profile into the previous profile list
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };
    }
    case UPDATE_PROFILE_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DELETE_PROFILE_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState
      };
    }
    case DELETE_PROFILE_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        // Remove the removed profile into the previous profile list
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_PROFILE_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLOSE_ERROR_MODAL_PROFILES: {
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
