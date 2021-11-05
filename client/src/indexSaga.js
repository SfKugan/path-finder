import { spawn } from 'redux-saga/effects';

import { watchPathFetch } from './components/Map';
import { watchNotificationAdding } from './components/notifications';

export default function* rootSaga() {
    yield spawn(watchPathFetch);
    yield spawn(watchNotificationAdding);
}