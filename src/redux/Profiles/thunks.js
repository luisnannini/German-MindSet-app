import {
  getProfilesFetching,
  getProfilesFulfilled,
  getProfilesRejected,
  createProfileFetching,
  createProfileFulfilled,
  createProfileRejected,
  updateProfileFetching,
  updateProfileFulfilled,
  updateProfileRejected,
  getProfileByIdFetching,
  getProfileByIdFulfilled,
  getProfileByIdRejected,
  deleteProfileFetching,
  deleteProfileFulfilled,
  deleteProfileRejected
} from './actions';

// Async Actions definition
export const getProfiles = () => {
  return (dispatch) => {
    // Dispatch (execute) the redux action to indicate the request will start
    dispatch(getProfilesFetching());
    // Make the backend request
    return fetch(`${process.env.REACT_APP_API}/profiles`)
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
        // Dispatch (execute) the redux action to save the response in Redux
        dispatch(getProfilesFulfilled(response.data));
      })
      .catch((error) => {
        // Dispatch (execute) the redux action to save the error in Redux
        // Remember always save an string, it is guaranteed using "error.toString()"
        dispatch(getProfilesRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

// See the comments above for reference.
// On this case, we are passing an "id" params to send it to the backend
export const getProfileById = (id) => {
  return (dispatch) => {
    dispatch(getProfileByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/profiles?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getProfileByIdFulfilled(response.data[0]));
        // it is necessary to return the response to get it on the ".then" in
        // the component when the action is dispatched
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getProfileByIdRejected(error.toString()));
      });
  };
};

export const createProfile = (values) => {
  return (dispatch) => {
    dispatch(createProfileFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/profiles`, options)
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
        dispatch(createProfileFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createProfileRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updateProfile = (id, values) => {
  return (dispatch) => {
    dispatch(updateProfileFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, options)
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
        dispatch(updateProfileFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updateProfileRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch) => {
    dispatch(deleteProfileFetching());
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deleteProfileFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deleteProfileRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
