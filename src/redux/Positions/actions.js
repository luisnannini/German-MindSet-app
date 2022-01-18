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
  CLOSE_ERROR_MODAL_POSITIONS,
  CLEAR_SELECTED_ITEM
} from '../../constants/actionTypes';

export const getPositionsFetching = () => {
  return {
    type: GET_POSITIONS_FETCHING
  };
};

export const getPositionsFulfilled = (data) => {
  return {
    type: GET_POSITIONS_FULFILLED,
    payload: data
  };
};

export const getPositionsRejected = (error) => {
  return {
    type: GET_POSITIONS_REJECTED,
    payload: error
  };
};

export const getPositionByIdFetching = () => {
  return {
    type: GET_POSITION_BY_ID_FETCHING
  };
};

export const getPositionByIdFulfilled = (data) => {
  return {
    type: GET_POSITION_BY_ID_FULFILLED,
    payload: data
  };
};

export const getPositionByIdRejected = (error) => {
  return {
    type: GET_POSITION_BY_ID_REJECTED,
    payload: error
  };
};

export const createPositionFetching = () => {
  return {
    type: CREATE_POSITION_FETCHING
  };
};

export const createPositionFulfilled = (data) => {
  return {
    type: CREATE_POSITION_FULFILLED,
    payload: data
  };
};

export const createPositionRejected = (error) => {
  return {
    type: CREATE_POSITION_REJECTED,
    payload: error
  };
};

export const updatePositionFetching = () => {
  return {
    type: UPDATE_POSITION_FETCHING
  };
};

export const updatePositionFulfilled = (data) => {
  return {
    type: UPDATE_POSITION_FULFILLED,
    payload: data
  };
};

export const updatePositionRejected = (error) => {
  return {
    type: UPDATE_POSITION_REJECTED,
    payload: error
  };
};

export const deletePositionFetching = () => {
  return {
    type: DELETE_POSITION_FETCHING
  };
};

export const deletePositionFulfilled = (id) => {
  return {
    type: DELETE_POSITION_FULFILLED,
    payload: id
  };
};

export const deletePositionRejected = (error) => {
  return {
    type: DELETE_POSITION_REJECTED,
    payload: error
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_POSITIONS
  };
};

export const clearSelectedPosition = () => {
  return {
    type: CLEAR_SELECTED_ITEM
  };
};
