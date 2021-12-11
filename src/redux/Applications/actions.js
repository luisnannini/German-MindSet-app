import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  CREATE_APPLICATION_FETCHING,
  CREATE_APPLICATION_FULFILLED,
  CREATE_APPLICATION_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  CLOSE_ERROR_MODAL_APPLICATIONS
} from '../../constants/actionTypes';

export const getApplicationsFetching = () => {
  return {
    type: GET_APPLICATIONS_FETCHING
  };
};

export const getApplicationsFulfilled = (data) => {
  return {
    type: GET_APPLICATIONS_FULFILLED,
    payload: data
  };
};

export const getApplicationsRejected = (error) => {
  return {
    type: GET_APPLICATIONS_REJECTED,
    payload: error
  };
};

export const createApplicationFetching = () => {
  return {
    type: CREATE_APPLICATION_FETCHING
  };
};

export const createApplicationFulfilled = (data) => {
  return {
    type: CREATE_APPLICATION_FULFILLED,
    payload: data
  };
};

export const createApplicationRejected = (error) => {
  return {
    type: CREATE_APPLICATION_REJECTED,
    payload: error
  };
};

export const deleteApplicationFetching = () => {
  return {
    type: DELETE_APPLICATION_FETCHING
  };
};

export const deleteApplicationFulfilled = (id) => {
  return {
    type: DELETE_APPLICATION_FULFILLED,
    payload: id
  };
};

export const deleteApplicationRejected = (error) => {
  return {
    type: DELETE_APPLICATION_REJECTED,
    payload: error
  };
};

export const applicationsErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_APPLICATIONS
  };
};
