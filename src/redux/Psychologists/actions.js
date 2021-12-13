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

export const getPsychologistsFetching = () => {
  return {
    type: GET_PSYCHOLOGISTS_FETCHING
  };
};

export const getPsychologistsFulfilled = (data) => {
  return {
    type: GET_PSYCHOLOGISTS_FULFILLED,
    payload: data
  };
};

export const getPsychologistsRejected = (error) => {
  return {
    type: GET_PSYCHOLOGISTS_REJECTED,
    payload: error
  };
};

export const getPsychologistByIdFetching = () => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_FETCHING
  };
};

export const getPsychologistByIdFulfilled = (data) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_FULFILLED,
    payload: data
  };
};

export const getPsychologistByIdRejected = (error) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_REJECTED,
    payload: error
  };
};

export const createPsychologistFetching = () => {
  return {
    type: CREATE_PSYCHOLOGIST_FETCHING
  };
};

export const createPsychologistFulfilled = (data) => {
  return {
    type: CREATE_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const createPsychologistRejected = (error) => {
  return {
    type: CREATE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const updatePsychologistFetching = () => {
  return {
    type: UPDATE_PSYCHOLOGIST_FETCHING
  };
};

export const updatePsychologistFulfilled = (data) => {
  return {
    type: UPDATE_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const updatePsychologistRejected = (error) => {
  return {
    type: UPDATE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const deletePsychologistFetching = () => {
  return {
    type: DELETE_PSYCHOLOGIST_FETCHING
  };
};

export const deletePsychologistFulfilled = (id) => {
  return {
    type: DELETE_PSYCHOLOGIST_FULFILLED,
    payload: id
  };
};

export const deletePsychologistRejected = (error) => {
  return {
    type: DELETE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_PSYCHOLOGISTS
  };
};
