import { registerPending, registerFulfilled, registerRejected } from './actions';

export const register = (credentials) => {
  return (dispatch) => {
    dispatch(registerPending());
    return fetch(`${process.env.REACT_APP_API}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(registerFulfilled(response.data));
      })
      .catch(() => {
        dispatch(registerRejected());
      });
  };
};
