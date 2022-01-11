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

export const getPostulantsFetching = () => {
  return {
    type: GET_POSTULANTS_FETCHING
  };
};

export const getPostulantsFulfilled = (data) => {
  return {
    type: GET_POSTULANTS_FULFILLED,
    payload: data
  };
};

export const getPostulantsRejected = (error) => {
  return {
    type: GET_POSTULANTS_REJECTED,
    payload: error
  };
};

export const getPostulantByIdFetching = () => {
  return {
    type: GET_POSTULANT_BY_ID_FETCHING
  };
};

export const getPostulantByIdFulfilled = (data) => {
  return {
    type: GET_POSTULANT_BY_ID_FULFILLED,
    payload: data
  };
};

export const getPostulantByIdRejected = (error) => {
  return {
    type: GET_POSTULANT_BY_ID_REJECTED,
    payload: error
  };
};

export const getPostulantByEmailFetching = () => {
  return {
    type: GET_POSTULANT_BY_EMAIL_FETCHING
  };
};

export const getPostulantByEmailFulfilled = (data) => {
  return {
    type: GET_POSTULANT_BY_EMAIL_FULFILLED,
    payload: data
  };
};

export const getPostulantByEmailRejected = (error) => {
  return {
    type: GET_POSTULANT_BY_EMAIL_REJECTED,
    payload: error
  };
};

export const createPostulantFetching = () => {
  return {
    type: CREATE_POSTULANT_FETCHING
  };
};

export const createPostulantFulfilled = (data) => {
  return {
    type: CREATE_POSTULANT_FULFILLED,
    payload: data
  };
};

export const createPostulantRejected = (error) => {
  return {
    type: CREATE_POSTULANT_REJECTED,
    payload: error
  };
};

export const updatePostulantFetching = () => {
  return {
    type: UPDATE_POSTULANT_FETCHING
  };
};

export const updatePostulantFulfilled = (data) => {
  return {
    type: UPDATE_POSTULANT_FULFILLED,
    payload: data
  };
};

export const updatePostulantRejected = (error) => {
  return {
    type: UPDATE_POSTULANT_REJECTED,
    payload: error
  };
};

export const deletePostulantFetching = () => {
  return {
    type: DELETE_POSTULANT_FETCHING
  };
};

export const deletePostulantFulfilled = (id) => {
  return {
    type: DELETE_POSTULANT_FULFILLED,
    payload: id
  };
};

export const deletePostulantRejected = (error) => {
  return {
    type: DELETE_POSTULANT_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_POSTULANTS
  };
};
