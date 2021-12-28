import { loginPending, loginFulfilled, loginRejected } from './actions';
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
        return dispatch(loginFulfilled());
      })
      .catch((error) => {
        return dispatch(loginRejected(error.toString()));
      });
  };
};
