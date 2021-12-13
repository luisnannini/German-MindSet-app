import {
  getPositionsFetching,
  getPositionsFulfilled,
  getPositionsRejected,
  createPositionFetching,
  createPositionFulfilled,
  createPositionRejected,
  updatePositionFetching,
  updatePositionFulfilled,
  updatePositionRejected,
  getPositionByIdFetching,
  getPositionByIdFulfilled,
  getPositionByIdRejected,
  deletePositionFetching,
  deletePositionFulfilled,
  deletePositionRejected
} from './actions';

export const getPositions = () => {
  return (dispatch) => {
    dispatch(getPositionsFetching());
    return fetch(`${process.env.REACT_APP_API}/positions`)
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
        dispatch(getPositionsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getPositionsRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const getPositionById = (id) => {
  return (dispatch) => {
    dispatch(getPositionByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/positions?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPositionByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getPositionByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createPosition = (values) => {
  return (dispatch) => {
    dispatch(createPositionFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/positions`, options)
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
        dispatch(createPositionFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createPositionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updatePosition = (id, values) => {
  return (dispatch) => {
    dispatch(updatePositionFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/positions/${id}`, options)
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
        dispatch(updatePositionFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updatePositionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch) => {
    dispatch(deletePositionFetching());
    return fetch(`${process.env.REACT_APP_API}/positions/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deletePositionFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deletePositionRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
