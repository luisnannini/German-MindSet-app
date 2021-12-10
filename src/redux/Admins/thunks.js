import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
  getAdminByIdFetching,
  getAdminByIdFulfilled,
  getAdminByIdRejected,
  addAdminFetching,
  addAdminFulfilled,
  addAdminRejected,
  deleteAdminFetching,
  deleteAdminFulfilled,
  deleteAdminRejected,
  updateAdminFetching,
  updateAdminFulfilled,
  updateAdminRejected
} from '../../constants/actionTypes';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getAdminsFulfilled(response.data));
      })
      .catch((err) =>
        dispatch(
          getAdminsRejected({
            show: true,
            message: err.message,
            title: 'GET request failed: ' + err.status
          })
        )
      );
  };
};

export const getAdmin = (id) => {
  return (dispatch) => {
    dispatch(getAdminByIdFetching());
    fetch(`${process.env.REACT_APP_API}/admins?id=${id}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getAdminByIdFulfilled(response.data[0]));
      })
      .catch((err) =>
        dispatch(
          getAdminByIdRejected({
            show: true,
            message: err.message,
            title: 'GET request failed: ' + err.status
          })
        )
      );
  };
};

export const addAdmin = (url, options) => {
  return (dispatch) => {
    dispatch(addAdminFetching());
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(addAdminFulfilled());
        window.location.href = '/admins';
      })
      .catch((err) => {
        dispatch(
          addAdminRejected({
            show: true,
            message: err.message,
            title: `${options.method} request failed: ${err.status}`
          })
        );
      });
  };
};

export const updateAdmin = (url, options) => {
  return (dispatch) => {
    dispatch(updateAdminFetching());
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(updateAdminFulfilled());
        window.location.href = '/admins';
      })
      .catch((err) => {
        dispatch(
          updateAdminRejected({
            show: true,
            message: err.message,
            title: `${options.method} request failed: ${err.status}`
          })
        );
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminFetching());
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deleteAdminFulfilled());
        dispatch(getAdmins());
      })
      .catch((err) => {
        dispatch(
          deleteAdminRejected({
            show: true,
            message: err.message,
            title: 'DELETE request failed: ' + err.status
          })
        );
      });
  };
};
