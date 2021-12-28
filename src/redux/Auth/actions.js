export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

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

export const setAuthentication = () => {
  return {
    type: SET_AUTHENTICATION
  };
};
