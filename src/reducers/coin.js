import {
  COIN_INFO, COIN_MY_RANK, COIN_RANK_CLEAR
} from '../constants/counter'
import {RefreshState} from '../pages/common/MyScrollView'
const INITIAL_STATE = {
  coinInfo:null,
  pageIndex:1,
  list:[],
  refreshState:RefreshState.Idle
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COIN_INFO:
      return {
        ...state,
        coinInfo:action.payload.data,
      };
    case COIN_RANK_CLEAR:
      return {
        ...state,
        coinInfo:null,
        pageIndex:1,
        list:[],
        refreshState:RefreshState.Idle
      };
    case COIN_MY_RANK:
      let data_list=action.payload.data.datas;
      state.pageIndex=action.payload.data.curPage+1;
      if(data_list.length!==0){
        state.refreshState=RefreshState.Idle;
      }else{
        state.refreshState=RefreshState.NoMoreData;
      }
      return {
        ...state,
        list:state.list.concat(data_list),
      };
    default:
      return state
  }
}
