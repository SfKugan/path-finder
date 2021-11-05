import { put, select, takeEvery } from 'redux-saga/effects';

import { pushNotification, TRY_NOTIFY } from './notificationsActions';

export function* watchNotificationAdding () {
    yield takeEvery(TRY_NOTIFY, ConditionalNotificationAdding);
}

function* ConditionalNotificationAdding ({ payload }) {
    const isNotificationsEnable = yield select(({ settings }) => settings.isNotificationsEnable);

    if (isNotificationsEnable) {
        yield put(pushNotification({ key: + new Date(), message: payload }));
    }
}