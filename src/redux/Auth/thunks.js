import {
  loginPending,
  loginFulfilled,
  loginRejected,
  registerPending,
  registerFulfilled,
  registerRejected,
  logoutPending,
  logoutFulfilled,
  logoutRejected
} from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
        const {
          claims: { role, id }
        } = await response.user.getIdTokenResult();
        return dispatch(loginFulfilled({ role, token, id }));
      })
      .catch((error) => {
        return dispatch(loginRejected(error.toString()));
      });
  };
};

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

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return dispatch(logoutFulfilled());
      })
      .catch((error) => {
        return dispatch(logoutRejected(error.toString()));
      });
  };
};
