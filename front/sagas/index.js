import {all, call} from 'redux-saga/effects'
import axios from 'axios';

import user from './user';
import memo from './memo';

axios.defaults.baseURL = 'http://api.geonil.shop/api'

export default function* rootSaga(){
    yield all([
        call(user),
        call(memo)
    ])
}
