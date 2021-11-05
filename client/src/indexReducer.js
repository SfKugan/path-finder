import { combineReducers } from 'redux';

import { mapReducer } from './components/Map';
import { loaderReducer } from './components/loader';
import { settingsReducer } from './components/settings';
import { notificationsReducer } from './components/notifications';

export default combineReducers({
    map: mapReducer,
    loader: loaderReducer,
    settings: settingsReducer,
    notifications: notificationsReducer
})