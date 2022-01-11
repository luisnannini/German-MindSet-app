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

export const getProfiles = () => {
  return (dispatch) => {
    dispatch(getProfilesFetching());
    return fetch(`${process.env.REACT_APP_API}/profiles`, {
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
        dispatch(getProfilesFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getProfilesRejected({ show: true, message: error.message, title: error.status }));
      });
  };
};

export const getProfileById = (id) => {
  return (dispatch) => {
    dispatch(getProfileByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/profiles?_id=${id}`, {
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
        dispatch(getProfileByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getProfileByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createProfile = (values) => {
  return (dispatch) => {
    dispatch(createProfileFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
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
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
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
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, {
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
        dispatch(deleteProfileFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deleteProfileRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
