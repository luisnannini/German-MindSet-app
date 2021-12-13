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
  CLOSE_ERROR_MODAL_SESSIONS
} from '../../constants/actionTypes';

export const getSessionsFetching = () => {
  return {
    type: GET_SESSIONS_FETCHING
  };
};

export const getSessionsFulfilled = (data) => {
  return {
    type: GET_SESSIONS_FULFILLED,
    payload: data
  };
};

export const getSessionsRejected = (error) => {
  return {
    type: GET_SESSIONS_REJECTED,
    payload: error
  };
};

export const getSessionByIdFetching = () => {
  return {
    type: GET_SESSION_BY_ID_FETCHING
  };
};

export const getSessionByIdFulfilled = (data) => {
  return {
    type: GET_SESSION_BY_ID_FULFILLED,
    payload: data
  };
};

export const getSessionByIdRejected = (error) => {
  return {
    type: GET_SESSION_BY_ID_REJECTED,
    payload: error
  };
};

export const createSessionFetching = () => {
  return {
    type: CREATE_SESSION_FETCHING
  };
};

export const createSessionFulfilled = (data) => {
  return {
    type: CREATE_SESSION_FULFILLED,
    payload: data
  };
};

export const createSessionRejected = (error) => {
  return {
    type: CREATE_SESSION_REJECTED,
    payload: error
  };
};

export const updateSessionFetching = () => {
  return {
    type: UPDATE_SESSION_FETCHING
  };
};

export const updateSessionFulfilled = (data) => {
  return {
    type: UPDATE_SESSION_FULFILLED,
    payload: data
  };
};

export const updateSessionRejected = (error) => {
  return {
    type: UPDATE_SESSION_REJECTED,
    payload: error
  };
};

export const deleteSessionFetching = () => {
  return {
    type: DELETE_SESSION_FETCHING
  };
};

export const deleteSessionFulfilled = (id) => {
  return {
    type: DELETE_SESSION_FULFILLED,
    payload: id
  };
};

export const deleteSessionRejected = (error) => {
  return {
    type: DELETE_SESSION_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_SESSIONS
  };
};
