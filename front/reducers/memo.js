export const initialState = {
  memos : [],
  isAddingMemo:false,
  addedMemo:false,
  addMemoError:null,
}

export const ADD_MEMO_REQUEST = "ADD_MEMO_REQUEST";
export const ADD_MEMO_SUCCESS = "ADD_MEMO_SUCCESS";
export const ADD_MEMO_FAILURE = "ADD_MEMO_FAILURE";

export const LOAD_MAIN_MEMO_REQUEST = "LOAD_MAIN_MEMO_REQUEST";
export const LOAD_MAIN_MEMO_SUCCESS = "LOAD_MAIN_MEMO_SUCCESS";
export const LOAD_MAIN_MEMO_FAILURE = "LOAD_MAIN_MEMO_FAILURE";

export const DELETE_MEMO_REQUEST = "DELETE_MEMO_REQUEST";
export const DELETE_MEMO_SUCCESS = "DELETE_MEMO_SUCCESS";
export const DELETE_MEMO_FAILURE = "DELETE_MEMO_FAILURE";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MAIN_MEMO_REQUEST:{
      return{
        ...state,
      }
    }
    case LOAD_MAIN_MEMO_SUCCESS:{
      return{
        ...state,
        memos:action.data
      }
    }
    case LOAD_MAIN_MEMO_FAILURE:{
      return{
        ...state,
      }
    }
    case DELETE_MEMO_REQUEST:{
      return{
        ...state,
      }
    }
    case DELETE_MEMO_SUCCESS:{
      return{
        ...state,
        memos:state.memos.filter( v=> v.id !== action.data)
      }
    }
    case DELETE_MEMO_FAILURE:{
      return{
        ...state,
      }
    }
    case ADD_MEMO_REQUEST:{
      return{
        ...state,
        addMemoError:null,
        addedMemo:false,
      }
    }
    case ADD_MEMO_SUCCESS:{
      return{
        ...state,
        addedMemo:true,
        memos:[action.data, ...state.memos]
      }
    }
    case ADD_MEMO_FAILURE:{
      return{
        ...state,
        addMemoError:action.error
      }
    }
    default:{
      return{
        ...state,
      }
    }
  }
}

export default reducer
