import { combineReducers } from 'redux';
import memo from './memo';
import user from './user';


const rootReducer = combineReducers({memo,user})

export default rootReducer;
