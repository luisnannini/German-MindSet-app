import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  GET_PROFILE_BY_ID_FETCHING,
  GET_PROFILE_BY_ID_FULFILLED,
  GET_PROFILE_BY_ID_REJECTED,
  CREATE_PROFILE_FETCHING,
  CREATE_PROFILE_FULFILLED,
  CREATE_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED
} from '../../constants/actionTypes';

export const getProfilesFetching = () => {
  return {
    type: GET_PROFILES_FETCHING
  };
};

export const getProfilesFulfilled = (data) => {
  return {
    type: GET_PROFILES_FULFILLED,
    payload: data
  };
};

export const getProfilesRejected = (error) => {
  return {
    type: GET_PROFILES_REJECTED,
    payload: error
  };
};

export const getProfileByIdFetching = () => {
  return {
    type: GET_PROFILE_BY_ID_FETCHING
  };
};

export const getProfileByIdFulfilled = (data) => {
  return {
    type: GET_PROFILE_BY_ID_FULFILLED,
    payload: data
  };
};

export const getProfileByIdRejected = (error) => {
  return {
    type: GET_PROFILE_BY_ID_REJECTED,
    payload: error
  };
};

export const createProfileFetching = () => {
  return {
    type: CREATE_PROFILE_FETCHING
  };
};

export const createProfileFulfilled = (data) => {
  return {
    type: CREATE_PROFILE_FULFILLED,
    payload: data
  };
};

export const createProfileRejected = (error) => {
  return {
    type: CREATE_PROFILE_REJECTED,
    payload: error
  };
};

export const updateProfileFetching = () => {
  return {
    type: UPDATE_PROFILE_FETCHING
  };
};

export const updateProfileFulfilled = (data) => {
  return {
    type: UPDATE_PROFILE_FULFILLED,
    payload: data
  };
};

export const updateProfileRejected = (error) => {
  return {
    type: UPDATE_PROFILE_REJECTED,
    payload: error
  };
};

export const deleteProfileFetching = () => {
  return {
    type: DELETE_PROFILE_FETCHING
  };
};

export const deleteProfileFulfilled = (id) => {
  return {
    type: DELETE_PROFILE_FULFILLED,
    payload: id
  };
};

export const deleteProfileRejected = (error) => {
  return {
    type: DELETE_PROFILE_REJECTED,
    payload: error
  };
};
