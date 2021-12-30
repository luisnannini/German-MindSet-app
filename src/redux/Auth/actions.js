import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  SET_AUTHENTICATION,
  CLOSE_ERROR_MODAL_AUTH
} from '../../constants/actionTypes';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginFulfilled = (data) => {
  return {
    type: LOGIN_FULFILLED,
    payload: data
  };
};

export const loginRejected = (error) => {
  return {
    type: LOGIN_REJECTED,
    payload: error
  };
};

export const registerPending = () => {
  return {
    type: REGISTER_PENDING
  };
};

export const registerFulfilled = (data) => {
  return {
    type: REGISTER_FULFILLED,
    payload: data
  };
};

export const registerRejected = (error) => {
  return {
    type: REGISTER_REJECTED,
    payload: error
  };
};

export const setAuthentication = () => {
  return {
    type: SET_AUTHENTICATION
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_AUTH
  };
};
