export const initialState = {
  me:null,
  isSigningUp:false,
  isLoggingIn:false,
  isLoggingOut:false,
}

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:{
      return{
        ...state,
      }
    }
    case SIGN_UP_SUCCESS:{
      return{
        ...state,
      }
    }
    case SIGN_UP_FAILURE:{
      return{
        ...state,
      }
    }
    case LOG_IN_REQUEST:{
      return{
        ...state,
        me:{
          nickname:"홍길동",
        }
      }
    }
    case LOG_IN_SUCCESS:{
      return{
        ...state,
      }
    }
    case LOG_IN_FAILURE:{
      return{
        ...state,
      }
    }
    case LOG_OUT_REQUEST:{
      return{
        ...state,
      }
    }
    case LOG_OUT_SUCCESS:{
      return{
        ...state,
      }
    }
    case LOG_OUT_FAILURE:{
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
