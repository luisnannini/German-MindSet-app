import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_BY_ID_FETCHING,
  GET_ADMIN_BY_ID_FULFILLED,
  GET_ADMIN_BY_ID_REJECTED,
  ADD_ADMIN_FETCHING,
  ADD_ADMIN_FULFILLED,
  ADD_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED,
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  SET_ADMIN,
  ADMIN_CLOSE_ERROR_MODAL
} from '../../constants/actionTypes';

export const getAdminsFetching = () => ({
  type: GET_ADMINS_FETCHING
});
export const getAdminsFulfilled = (payload) => ({
  type: GET_ADMINS_FULFILLED,
  payload
});
export const getAdminsRejected = (payload) => ({
  type: GET_ADMINS_REJECTED,
  payload
});

export const getAdminByIdFetching = () => ({
  type: GET_ADMIN_BY_ID_FETCHING
});
export const getAdminByIdFulfilled = (payload) => ({
  type: GET_ADMIN_BY_ID_FULFILLED,
  payload
});
export const getAdminByIdRejected = (payload) => ({
  type: GET_ADMIN_BY_ID_REJECTED,
  payload
});

export const addAdminFetching = () => ({
  type: ADD_ADMIN_FETCHING
});
export const addAdminFulfilled = (payload) => ({
  type: ADD_ADMIN_FULFILLED,
  payload
});
export const addAdminRejected = (payload) => ({
  type: ADD_ADMIN_REJECTED,
  payload
});

export const deleteAdminFetching = () => ({
  type: DELETE_ADMIN_FETCHING
});
export const deleteAdminFulfilled = () => ({
  type: DELETE_ADMIN_FULFILLED
});
export const deleteAdminRejected = (payload) => ({
  type: DELETE_ADMIN_REJECTED,
  payload
});

export const updateAdminFetching = () => ({
  type: UPDATE_ADMIN_FETCHING
});
export const updateAdminFulfilled = () => ({
  type: UPDATE_ADMIN_FULFILLED
});
export const updateAdminRejected = (payload) => ({
  type: UPDATE_ADMIN_REJECTED,
  payload
});

export const setAdmin = (payload) => ({
  type: SET_ADMIN,
  payload
});

export const adminCloseErrorModal = () => ({
  type: ADMIN_CLOSE_ERROR_MODAL
});
