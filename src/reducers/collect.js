import {
 COIN_RANK_CLEAR, COLLECT
} from '../constants/counter'
import {RefreshState} from '../pages/common/MyScrollView'
const INITIAL_STATE = {
  pageIndex:0,
  list:[],
  refreshState:RefreshState.Idle
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COIN_RANK_CLEAR:
      return {
        ...state,
        coinInfo:null,
        pageIndex:0,
        list:[],
        refreshState:RefreshState.Idle
      };
    case COLLECT:
      let data_list=action.payload.data.datas;
      state.pageIndex=action.payload.data.curPage;
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
