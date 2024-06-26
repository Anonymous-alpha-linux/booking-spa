import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    getServiceSuccess,
    getServiceError,
    postServiceSuccess,
    postServiceError,
    putServiceSuccess,
    putServiceError,
    deleteServiceSuccess,
    deleteServiceError,
} from './action';

import { GET_SERVICE_LIST, POST_SERVICE, PUT_SERVICE, DELETE_SERVICE } from './actionType';

// API
import {
    getServiceList as getServiceListAPI,
    postService as postServiceAPI,
    putService as updateServiceAPI,
    deleteService as deleteServiceAPI,
} from '../../api';

function* getService({ payload }) {
    try {
        const response = yield call(getServiceListAPI, payload);

        yield put(getServiceSuccess(GET_SERVICE_LIST, response || []));
    } catch (error) {
        yield put(getServiceError(GET_SERVICE_LIST, error));
    }
}

function* onAddNewService({
    payload: { parentId, createdDate, serviceName, description, duration, price, promotion },
}) {
    try {
        const response = yield call(postServiceAPI, {
            parentId,
            createdDate,
            serviceName,
            description,
            duration,
            price,
            promotion,
        });

        yield put(postServiceSuccess(response));
        toast.success('Service Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postServiceError(error));
        toast.error('Service Added Failed', {
            autoClose: 3000,
        });
    }
}

function* onUpdateService({ payload: { id, updatedService } }) {
    try {
        const response = yield call(updateServiceAPI, id, updatedService);

        yield put(putServiceSuccess(response));

        toast.success('Edited Service Success', { autoClose: 3000 });
    } catch (error) {
        yield put(putServiceError(error));
        toast.error('Edited Service Failed', { autoClose: 3000 });
    }
}

function* onDeleteService({ payload: { serviceId } }) {
    try {
        yield call(deleteServiceAPI, serviceId);
        yield put(deleteServiceSuccess(serviceId));
    } catch (error) {
        yield put(deleteServiceError(error));
    }
}

export function* watchGetService() {
    yield takeEvery(GET_SERVICE_LIST, getService);
}

export function* watchPostNewService() {
    yield takeEvery(POST_SERVICE, onAddNewService);
}

export function* watchUpdateService() {
    yield takeEvery(PUT_SERVICE, onUpdateService);
}

export function* watchDeleteService() {
    yield takeEvery(DELETE_SERVICE, onDeleteService);
}

function* serviceSaga() {
    yield all([fork(watchGetService), fork(watchPostNewService), fork(watchUpdateService), fork(watchDeleteService)]);
}

export default serviceSaga;
