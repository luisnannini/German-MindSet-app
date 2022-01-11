import {
  getClientsFetching,
  getClientsFulfilled,
  getClientsRejected,
  createClientFetching,
  createClientFulfilled,
  createClientRejected,
  updateClientFetching,
  updateClientFulfilled,
  updateClientRejected,
  getClientByIdFetching,
  getClientByIdFulfilled,
  getClientByIdRejected,
  deleteClientFetching,
  deleteClientFulfilled,
  deleteClientRejected
} from './actions';

export const getClients = () => {
  return (dispatch) => {
    dispatch(getClientsFetching());
    return fetch(`${process.env.REACT_APP_API}/Clients`, {
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
        dispatch(getClientsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getClientsRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const getClientById = (id) => {
  return (dispatch) => {
    dispatch(getClientByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/Clients?_id=${id}`, {
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
        dispatch(getClientByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getClientByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createClient = (values) => {
  return (dispatch) => {
    dispatch(createClientFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/Clients`, options)
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
        dispatch(createClientFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createClientRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const updateClient = (id, values) => {
  return (dispatch) => {
    dispatch(updateClientFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/Clients/${id}`, options)
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
        dispatch(updateClientFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateClientRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const deleteClient = (id) => {
  return (dispatch) => {
    dispatch(deleteClientFetching());
    return fetch(`${process.env.REACT_APP_API}/Clients/${id}`, {
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
        dispatch(deleteClientFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteClientRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};
