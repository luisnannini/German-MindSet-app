import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  createSessionFetching,
  createSessionFulfilled,
  createSessionRejected,
  updateSessionFetching,
  updateSessionFulfilled,
  updateSessionRejected,
  getSessionByIdFetching,
  getSessionByIdFulfilled,
  getSessionByIdRejected,
  deleteSessionFetching,
  deleteSessionFulfilled,
  deleteSessionRejected
} from './actions';

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
    return fetch(`${process.env.REACT_APP_API}/sessions`, {
      headers: { token: sessionStorage.getItem('token') }
    })
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
        dispatch(getSessionsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getSessionsRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const getSessionById = (id) => {
  return (dispatch) => {
    dispatch(getSessionByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/sessions?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getSessionByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getSessionByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createSession = (values) => {
  return (dispatch) => {
    dispatch(createSessionFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/sessions`, options)
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
        dispatch(createSessionFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createSessionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updateSession = (id, values) => {
  return (dispatch) => {
    dispatch(updateSessionFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/sessions/${id}`, options)
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
        dispatch(updateSessionFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updateSessionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    dispatch(deleteSessionFetching());
    return fetch(`${process.env.REACT_APP_API}/sessions/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deleteSessionFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deleteSessionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
