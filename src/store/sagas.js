import { all, fork } from 'redux-saga/effects';

// Blog
import BlogSaga from './blog/saga';
// Upload
import UploadSaga from './upload/saga';
// Service
import ServiceSaga from './service/saga';

import CustomerSaga from './customer/saga';

import BookingSaga from './booking/saga';

export default function* rootSaga() {
    yield all([fork(BlogSaga), fork(UploadSaga), fork(ServiceSaga), fork(CustomerSaga), fork(BookingSaga)]);
}
