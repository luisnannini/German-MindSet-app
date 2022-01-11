import {
  getPostulantsFetching,
  getPostulantsFulfilled,
  getPostulantsRejected,
  createPostulantFetching,
  createPostulantFulfilled,
  createPostulantRejected,
  updatePostulantFetching,
  updatePostulantFulfilled,
  updatePostulantRejected,
  getPostulantByIdFetching,
  getPostulantByIdFulfilled,
  getPostulantByIdRejected,
  getPostulantByEmailFetching,
  getPostulantByEmailFulfilled,
  getPostulantByEmailRejected,
  deletePostulantFetching,
  deletePostulantFulfilled,
  deletePostulantRejected
} from './actions';

export const getPostulants = () => {
  return (dispatch) => {
    dispatch(getPostulantsFetching());
    return fetch(`${process.env.REACT_APP_API}/postulants`, {
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
        dispatch(getPostulantsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(
          getPostulantsRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const getPostulantById = (id) => {
  return (dispatch) => {
    dispatch(getPostulantByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/postulants?_id=${id}`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPostulantByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getPostulantByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const getPostulantByEmail = (email) => {
  return (dispatch) => {
    dispatch(getPostulantByEmailFetching());
    return fetch(`${process.env.REACT_APP_API}/postulants?_id=${email}`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPostulantByEmailFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getPostulantByEmailRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createPostulant = (values) => {
  return (dispatch) => {
    dispatch(createPostulantFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/postulants`, options)
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
        dispatch(createPostulantFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createPostulantRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updatePostulant = (id, values) => {
  return (dispatch) => {
    dispatch(updatePostulantFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/postulants/${id}`, options)
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
        dispatch(updatePostulantFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updatePostulantRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deletePostulant = (id) => {
  return (dispatch) => {
    dispatch(deletePostulantFetching());
    return fetch(`${process.env.REACT_APP_API}/postulants/${id}`, {
      method: 'DELETE',
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
        dispatch(deletePostulantFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deletePostulantRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
