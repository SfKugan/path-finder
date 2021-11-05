import { SET_THEME_STATE, SET_NOTIFICATIONS_STATE } from './settingsActions';

const initState = {
    isDarkTheme: true,
    isNotificationsEnable: true
}

export const settingsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SET_THEME_STATE:
            return {...state, isDarkTheme: payload };
        case SET_NOTIFICATIONS_STATE:
            return {...state, isNotificationsEnable: payload };
        default: 
            return {...state};
    }
}