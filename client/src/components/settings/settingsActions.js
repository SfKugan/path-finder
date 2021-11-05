export const SET_THEME_STATE = "SETTINGS@SET_THEME_STATE";
export const SET_NOTIFICATIONS_STATE = "SETTINGS@SET_NOTIFICATIONS_STATE";

export const setThemeState = state => ({ type: SET_THEME_STATE, payload: state }) 
export const setNotificationsState = state => ({ type: SET_NOTIFICATIONS_STATE, payload: state }) 