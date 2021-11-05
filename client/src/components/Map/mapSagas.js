import { put, select, takeLeading, call } from 'redux-saga/effects';

import { openLoader, closeLoader } from '../loader';
import { setPath, START_PATH_FETCH } from './mapActions';
import { tryNotify } from '../notifications';
import { pathTransformer } from '../objectTransformers';
import { apiClient } from '../../api';

export function* watchPathFetch () {
    yield takeLeading(START_PATH_FETCH, pathFetch);
}

function* pathFetch () {
    const markers = yield select(({ map }) => map.markers);

    yield put(openLoader());

    try {
        if (markers.length < 3) {
            throw new Error ('недостаточно точек для построения пути');
        }

        const { path } = yield call(
            apiClient.mapApi.fetchPath, 
            markers.map(item => ([ item.lat, item.lng ]))
        )

        if (!path.length) {
            throw new Error ("путь не был построен");
        }

        const buildedPath = pathTransformer(path, markers);

        yield put(setPath(buildedPath));
    } catch ({ message }) {
        yield put(tryNotify(message));
    } finally { 
        yield put(closeLoader());
    }
}