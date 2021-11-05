export const CLEAR_ALL = "MAP@CLEAR_ALL";
export const ADD_MARKER = "MAP@ADD_MARKER";
export const REMOVE_MARKER = "MAP@REMOVE_MARKER"; 
export const SET_PATH = "MAP@SET_PATH";
export const START_PATH_FETCH = "MAP@START_PATH_FETCH";

export const clearAll = () => ({ type: CLEAR_ALL });
export const startPathFetch = () => ({ type: START_PATH_FETCH });
export const setPath = path => ({ type: SET_PATH, payload: path });
export const addMarker = marker => ({ type: ADD_MARKER, payload: marker });
export const removeMarker = marker => ({ type: REMOVE_MARKER, payload: marker });