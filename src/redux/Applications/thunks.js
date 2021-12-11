import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  getApplicationByIdFetching,
  getApplicationByIdFulfilled,
  getApplicationByIdRejected,
  createApplicationFetching,
  createApplicationFulfilled,
  createApplicationRejected,
  deleteApplicationFetching,
  deleteApplicationFulfilled,
  deleteApplicationRejected
} from './actions';

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    return fetch(`${process.env.REACT_APP_API}/applications`)
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
        dispatch(getApplicationsFulfilled(response.data));
      })
      .catch((error) =>
        dispatch(
          getApplicationsRejected({ show: true, message: error.message, title: error.status })
        )
      );
  };
};

export const getApplicationById = (id) => {
  return (dispatch) => {
    dispatch(getApplicationByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/applications?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getApplicationByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getApplicationByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createApplication = (values) => {
  return (dispatch) => {
    dispatch(createApplicationFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/applications`, options)
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
        dispatch(createApplicationFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createApplicationRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deleteApplication = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationFetching());
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deleteApplicationFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deleteApplicationRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
