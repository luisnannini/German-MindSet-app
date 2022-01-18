import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  GET_INTERVIEW_BY_ID_FETCHING,
  GET_INTERVIEW_BY_ID_FULFILLED,
  GET_INTERVIEW_BY_ID_REJECTED,
  CREATE_INTERVIEW_FETCHING,
  CREATE_INTERVIEW_FULFILLED,
  CREATE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  CLOSE_ERROR_MODAL_INTERVIEWS,
  CLEAR_SELECTED_ITEM
} from '../../constants/actionTypes';

export const getInterviewsFetching = () => {
  return {
    type: GET_INTERVIEWS_FETCHING
  };
};

export const getInterviewsFulfilled = (data) => {
  return {
    type: GET_INTERVIEWS_FULFILLED,
    payload: data
  };
};

export const getInterviewsRejected = (error) => {
  return {
    type: GET_INTERVIEWS_REJECTED,
    payload: error
  };
};

export const getInterviewByIdFetching = () => {
  return {
    type: GET_INTERVIEW_BY_ID_FETCHING
  };
};

export const getInterviewByIdFulfilled = (data) => {
  return {
    type: GET_INTERVIEW_BY_ID_FULFILLED,
    payload: data
  };
};

export const getInterviewByIdRejected = (error) => {
  return {
    type: GET_INTERVIEW_BY_ID_REJECTED,
    payload: error
  };
};

export const createInterviewFetching = () => {
  return {
    type: CREATE_INTERVIEW_FETCHING
  };
};

export const createInterviewFulfilled = (data) => {
  return {
    type: CREATE_INTERVIEW_FULFILLED,
    payload: data
  };
};

export const createInterviewRejected = (error) => {
  return {
    type: CREATE_INTERVIEW_REJECTED,
    payload: error
  };
};

export const updateInterviewFetching = () => {
  return {
    type: UPDATE_INTERVIEW_FETCHING
  };
};

export const updateInterviewFulfilled = (data) => {
  return {
    type: UPDATE_INTERVIEW_FULFILLED,
    payload: data
  };
};

export const updateInterviewRejected = (error) => {
  return {
    type: UPDATE_INTERVIEW_REJECTED,
    payload: error
  };
};

export const deleteInterviewFetching = () => {
  return {
    type: DELETE_INTERVIEW_FETCHING
  };
};

export const deleteInterviewFulfilled = (id) => {
  return {
    type: DELETE_INTERVIEW_FULFILLED,
    payload: id
  };
};

export const deleteInterviewRejected = (error) => {
  return {
    type: DELETE_INTERVIEW_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_INTERVIEWS
  };
};

export const clearSelectedInterview = () => {
  return {
    type: CLEAR_SELECTED_ITEM
  };
};
