import {all,takeLatest,throttle,fork,call, put, delay} from 'redux-saga/effects'
import axios from 'axios';
import {
  LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE,
  SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
  LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
  LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_FAILURE,
} from '../reducers/user';
import {DELETE_MEMOS_ME} from '../reducers/memo'

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

// logout
function logoutAPI(){
  return axios.post('/user/logout', {}, {
    withCredentials:true,
  })
}

function* logout(action){
    try{
        const result = yield call(logoutAPI)
        yield put({
            type:DELETE_MEMOS_ME,
        })
        yield put({
            type:LOG_OUT_SUCCESS,
            data:result.data
        })
    }catch(e){
        yield put({
            type:LOG_OUT_FAILURE,
            error:e.response.data
        })
    }
}

function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}


export default function* postSaga(){
    yield all([
        fork(watchSignup),
        fork(watchLogin),
        fork(watchLoadUser),
        fork(watchLogout),
    ])
}
