import {all, call} from 'redux-saga/effects'
import axios from 'axios';

import user from './user';
import memo from './memo';

axios.defaults.baseURL = 'http://localhost:8080/api'

export default function* rootSaga(){
    yield all([
        call(user),
        call(memo)
    ])
}
