import {
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
  createInterviewFetching,
  createInterviewFulfilled,
  createInterviewRejected,
  updateInterviewFetching,
  updateInterviewFulfilled,
  updateInterviewRejected,
  getInterviewByIdFetching,
  getInterviewByIdFulfilled,
  getInterviewByIdRejected,
  deleteInterviewFetching,
  deleteInterviewFulfilled,
  deleteInterviewRejected
} from './actions';

export const getInterviews = () => {
  return (dispatch) => {
    dispatch(getInterviewsFetching());
    return fetch(`${process.env.REACT_APP_API}/interviews`)
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
        dispatch(getInterviewsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(
          getInterviewsRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const getInterviewById = (id) => {
  return (dispatch) => {
    dispatch(getInterviewByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/interviews?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getInterviewByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(
          getInterviewByIdRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const createInterview = (values) => {
  return (dispatch) => {
    dispatch(createInterviewFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/interviews`, options)
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
        dispatch(createInterviewFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          createInterviewRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const updateInterview = (id, values) => {
  return (dispatch) => {
    dispatch(updateInterviewFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/interviews/${id}`, options)
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
        dispatch(updateInterviewFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(
          updateInterviewRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};

export const deleteInterview = (id) => {
  return (dispatch) => {
    dispatch(deleteInterviewFetching());
    return fetch(`${process.env.REACT_APP_API}/interviews/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        dispatch(deleteInterviewFulfilled(id));
      })
      .catch((error) => {
        dispatch(
          deleteInterviewRejected({ show: true, message: error.message, title: error.status })
        );
      });
  };
};
