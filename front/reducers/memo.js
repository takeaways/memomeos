export const initialState = {
  memos : [],
  isAddingMemo:false,
  addedMemo:false,
}

export const ADD_MEMO_REQUEST = "ADD_MEMO_REQUEST";
export const ADD_MEMO_SUCCESS = "ADD_MEMO_SUCCESS";
export const ADD_MEMO_FAILURE = "ADD_MEMO_FAILURE";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMO_REQUEST:{
      return{
        ...state,
        memos:state.memos.concat(action.data)
      }
    }
    case ADD_MEMO_SUCCESS:{
      return{
        ...state,
      }
    }
    case ADD_MEMO_FAILURE:{
      return{
        ...state,
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
