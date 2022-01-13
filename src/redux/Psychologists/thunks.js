import {
  getPsychologistsFetching,
  getPsychologistsFulfilled,
  getPsychologistsRejected,
  createPsychologistFetching,
  createPsychologistFulfilled,
  createPsychologistRejected,
  updatePsychologistFetching,
  updatePsychologistFulfilled,
  updatePsychologistRejected,
  getPsychologistByIdFetching,
  getPsychologistByIdFulfilled,
  getPsychologistByIdRejected,
  deletePsychologistFetching,
  deletePsychologistFulfilled,
  deletePsychologistRejected
} from './actions';

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistsFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists`, {
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
        dispatch(getPsychologistsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(
          getPsychologistsRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const getPsychologistById = (id) => {
  return (dispatch) => {
    dispatch(getPsychologistByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getPsychologistByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createPsychologist = (values) => {
  return (dispatch) => {
    dispatch(createPsychologistFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/psychologists`, options)
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
        dispatch(createPsychologistFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createPsychologistRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updatePsychologist = (id, values) => {
  return (dispatch) => {
    dispatch(updatePsychologistFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, options)
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
        dispatch(updatePsychologistFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updatePsychologistRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deletePsychologist = (id) => {
  return (dispatch) => {
    dispatch(deletePsychologistFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deletePsychologistFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deletePsychologistRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
