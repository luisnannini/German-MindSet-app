import {
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  SET_AUTHENTICATION,
  CLOSE_ERROR_MODAL_AUTH
} from '../../constants/actionTypes';

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
