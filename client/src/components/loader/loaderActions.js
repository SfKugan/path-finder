export const OPEN_LOADER = "LOADER@OPEN_LOADER";
export const CLOSE_LOADER = "LOADER@CLOSE_LOADER";
export const SET_LOADER_STATE = "LOADER@SET_LOADER_STATE";

export const openLoader = () => ({ type: OPEN_LOADER });
export const closeLoader = () => ({ type: CLOSE_LOADER });
export const setLoaderState = state => ({ type: SET_LOADER_STATE, payload: state });