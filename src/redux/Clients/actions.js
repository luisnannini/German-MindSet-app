import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  GET_CLIENT_BY_ID_FETCHING,
  GET_CLIENT_BY_ID_FULFILLED,
  GET_CLIENT_BY_ID_REJECTED,
  CREATE_CLIENT_FETCHING,
  CREATE_CLIENT_FULFILLED,
  CREATE_CLIENT_REJECTED,
  UPDATE_CLIENT_FETCHING,
  UPDATE_CLIENT_FULFILLED,
  UPDATE_CLIENT_REJECTED,
  DELETE_CLIENT_FETCHING,
  DELETE_CLIENT_FULFILLED,
  DELETE_CLIENT_REJECTED,
  CLOSE_ERROR_MODAL_CLIENTS,
  CLEAR_SELECTED_ITEM
} from '../../constants/actionTypes';

export const getClientsFetching = () => {
  return {
    type: GET_CLIENTS_FETCHING
  };
};

export const getClientsFulfilled = (data) => {
  return {
    type: GET_CLIENTS_FULFILLED,
    payload: data
  };
};

export const getClientsRejected = (error) => {
  return {
    type: GET_CLIENTS_REJECTED,
    payload: error
  };
};

export const getClientByIdFetching = () => {
  return {
    type: GET_CLIENT_BY_ID_FETCHING
  };
};

export const getClientByIdFulfilled = (data) => {
  return {
    type: GET_CLIENT_BY_ID_FULFILLED,
    payload: data
  };
};

export const getClientByIdRejected = (error) => {
  return {
    type: GET_CLIENT_BY_ID_REJECTED,
    payload: error
  };
};

export const createClientFetching = () => {
  return {
    type: CREATE_CLIENT_FETCHING
  };
};

export const createClientFulfilled = (data) => {
  return {
    type: CREATE_CLIENT_FULFILLED,
    payload: data
  };
};

export const createClientRejected = (error) => {
  return {
    type: CREATE_CLIENT_REJECTED,
    payload: error
  };
};

export const updateClientFetching = () => {
  return {
    type: UPDATE_CLIENT_FETCHING
  };
};

export const updateClientFulfilled = (data) => {
  return {
    type: UPDATE_CLIENT_FULFILLED,
    payload: data
  };
};

export const updateClientRejected = (error) => {
  return {
    type: UPDATE_CLIENT_REJECTED,
    payload: error
  };
};

export const deleteClientFetching = () => {
  return {
    type: DELETE_CLIENT_FETCHING
  };
};

export const deleteClientFulfilled = (id) => {
  return {
    type: DELETE_CLIENT_FULFILLED,
    payload: id
  };
};

export const deleteClientRejected = (error) => {
  return {
    type: DELETE_CLIENT_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_CLIENTS
  };
};

export const clearSelectedItem = () => {
  return {
    type: CLEAR_SELECTED_ITEM
  };
};
