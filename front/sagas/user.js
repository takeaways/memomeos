import {all,takeLatest,throttle,fork,call, put, delay} from 'redux-saga/effects'
import axios from 'axios';
import {
  LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE,
  SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
  LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
} from '../reducers/user';

// load
function loadUserAPI(){
  return axios.get('/user', {
    withCredentials:true,
  })
}

function* loadUser(action){
    try{
        const result = yield call(loadUserAPI)
        yield put({
            type:LOAD_USER_SUCCESS,
            data:result.data
        })
    }catch(e){
        yield put({
            type:LOAD_USER_FAILURE,
            error:e.response.data
        })
    }
}

function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

// signup
function signupAPI(signupData){
  return axios.post('/user', signupData, {
    withCredentials:true,
  })
}

function* signup(action){
    try{
        const result = yield call(signupAPI, action.data)
        yield put({
            type:SIGN_UP_SUCCESS,
            data:result.data
        })
    }catch(e){
        yield put({
            type:SIGN_UP_FAILURE,
            error:e.response.data
        })
    }
}

function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup)
}

// login
function loginAPI(loginData){
  return axios.post('/user/login', loginData, {
    withCredentials:true,
  })
}

function* login(action){
    try{
        const result = yield call(loginAPI, action.data)
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data
        })
    }catch(e){
        yield put({
            type:LOG_IN_FAILURE,
            error:e.response.data
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}


export default function* postSaga(){
    yield all([
        fork(watchSignup),
        fork(watchLogin),
        fork(watchLoadUser),
    ])
}
