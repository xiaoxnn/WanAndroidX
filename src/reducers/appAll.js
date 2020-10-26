import {
 LOGIN_INFO,
  CLEAR_INFO
} from '../constants/counter'

const INITIAL_STATE = {
  info:null,
  isLogin:false,
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_INFO:
      return {
        ...state,
        info:action.payload.data,
        isLogin:true,
      };
    case CLEAR_INFO:
      return {
        ...state,
        info:null,
        isLogin:false,
      };
    default:
      return state
  }
}
