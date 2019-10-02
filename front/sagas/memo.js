import {all,takeLatest,throttle,fork,call, put, delay} from 'redux-saga/effects'
import axios from 'axios';
import {
  LOAD_MAIN_MEMO_REQUEST,LOAD_MAIN_MEMO_SUCCESS,LOAD_MAIN_MEMO_FAILURE,
  ADD_MEMO_REQUEST,ADD_MEMO_SUCCESS,ADD_MEMO_FAILURE,
  DELETE_MEMO_REQUEST,DELETE_MEMO_SUCCESS,DELETE_MEMO_FAILURE,
  EDIT_MEMO_REQUEST,EDIT_MEMO_SUCCESS,EDIT_MEMO_FAILURE,
} from '../reducers/memo';


//addmemo
function addMemoAPI(postData){
  return axios.post('/memo/', postData, {
    withCredentials:true,
  })
}

function* addMemo(action){
    try{
        const result = yield call(addMemoAPI, action.data)
        yield put({
            type:ADD_MEMO_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:ADD_MEMO_FAILURE,
            error:e.response.data
        })
    }
}

function* watchMemo(){
    yield takeLatest(ADD_MEMO_REQUEST, addMemo)
}

//loadMemo
function loadMemoAPI(){
  return axios.get(`/memo/`, {
    withCredentials:true,
  })
}

function* loadMemo(){
    try{
        const result = yield call(loadMemoAPI)
        yield put({
            type:LOAD_MAIN_MEMO_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_MAIN_MEMO_FAILURE,
            error:e.response.data
        })
    }
}

function* watchLoadMemo(){
    yield takeLatest(LOAD_MAIN_MEMO_REQUEST, loadMemo)
}

//deletememo
function deleteMemoAPI(id){
  return axios.delete(`/memo/${id}`,{
    withCredentials:true,
  })
}

function* deleteMemo(action){
    try{
        const result = yield call(deleteMemoAPI, action.data )
        yield put({
            type:DELETE_MEMO_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:DELETE_MEMO_FAILURE,
            error:e.response.data
        })
    }
}

function* watchDelete(){
    yield takeLatest(DELETE_MEMO_REQUEST, deleteMemo)
}

//editMemo
function editMemoAPI(editData){
  return axios.patch(`/memo/`,editData, {
    withCredentials:true,
  })
}

function* editMemo(action){
    try{
        const result = yield call(editMemoAPI, action.data)
        yield put({
            type:EDIT_MEMO_SUCCESS,
            data:{
              id:action.data.id,
              text:action.data.text
            }
        })
    }catch(e){
        console.error(e);
        yield put({
            type:EDIT_MEMO_FAILURE,
            error:e.response.data
        })
    }
}

function* watchEditMemo(){
    yield takeLatest(EDIT_MEMO_REQUEST, editMemo)
}


export default function* postSaga(){
    yield all([
        fork(watchMemo),
        fork(watchLoadMemo),
        fork(watchDelete),
        fork(watchEditMemo),
    ])
}
