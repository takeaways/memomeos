export const initialState = {
  me:null,
  isSigningUp:false,
  isLoggingIn:false,
  isLoggingOut:false,
  signupError:null,
  signedup:false,
  loginError:null,
}

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
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
    case LOAD_USER_REQUEST:{
      return{
        ...state,
      }
    }
    case LOAD_USER_SUCCESS:{
      return{
        ...state,
        me:action.data
      }
    }
    case LOAD_USER_FAILURE:{
      return{
        ...state,
      }
    }
    case SIGN_UP_REQUEST:{
      return{
        ...state,
        isSigningUp:true,
        signupError:null,
        signedup:false,
      }
    }
    case SIGN_UP_SUCCESS:{
      return{
        ...state,
        isSigningUp:false,
        signedup:true,
      }
    }
    case SIGN_UP_FAILURE:{
      return{
        ...state,
        isSigningUp:false,
        signupError:action.error,
        signedup:false
      }
    }
    case LOG_IN_REQUEST:{
      return{
        ...state,
        isSigningUp:true,
        loginError:null,
      }
    }
    case LOG_IN_SUCCESS:{
      return{
        ...state,
        isSigningUp:false,
        me:action.data
      }
    }
    case LOG_IN_FAILURE:{
      return{
        ...state,
        isSigningUp:false,
        loginError:action.error
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
