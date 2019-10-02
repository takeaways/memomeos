export const initialState = {
  memos : [],
  isAddingMemo:false,
  addedMemo:false,
  addMemoError:null,
  deletedMemo:false,
  editedMemo:false,
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

export const EDIT_MEMO_REQUEST = "EDIT_MEMO_REQUEST";
export const EDIT_MEMO_SUCCESS = "EDIT_MEMO_SUCCESS";
export const EDIT_MEMO_FAILURE = "EDIT_MEMO_FAILURE";

export const DELETE_MEMOS_ME = "DELETE_MEMOS_ME";

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
        memos:action.data,
        deletedMemo:false,
        editedMemo:false,
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
        deletedMemo:false,
      }
    }
    case DELETE_MEMO_SUCCESS:{
      return{
        ...state,
        memos:state.memos.filter( v=> v.id !== action.data),
        deletedMemo:true,
      }
    }
    case DELETE_MEMO_FAILURE:{
      return{
        ...state,
        deletedMemo:true,
      }
    }
    case ADD_MEMO_REQUEST:{
      return{
        ...state,
        addMemoError:null,
        addedMemo:false,
        deletedMemo:false,
      }
    }
    case ADD_MEMO_SUCCESS:{
      return{
        ...state,
        addedMemo:true,
        memos:[...state.memos, action.data]
      }
    }
    case ADD_MEMO_FAILURE:{
      return{
        ...state,
        addMemoError:action.error
      }
    }
    case EDIT_MEMO_REQUEST:{
      return{
        ...state,
        editedMemo:false,
      }
    }
    case EDIT_MEMO_SUCCESS:{
      const index = state.memos.findIndex( m => m.id === action.data.id);
      const memo = state.memos[index];
      memo.content = action.data.text;
      const memos = [...state.memos]
      memos[index] = memo;
      return{
        ...state,
        editedMemo:true,
        memos
      }
    }
    case EDIT_MEMO_FAILURE:{
      return{
        ...state,
        editedMemo:false,
      }
    }
    case DELETE_MEMOS_ME:{
      return{
        ...state,
        memos:[]
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
