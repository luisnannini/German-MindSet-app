import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
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

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutFulfilled = (data) => {
  return {
    type: LOGOUT_FULFILLED,
    payload: data
  };
};

export const logoutRejected = (error) => {
  return {
    type: LOGOUT_REJECTED,
    payload: error
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL_AUTH
  };
};
