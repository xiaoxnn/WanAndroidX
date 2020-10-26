import {
  SEARCH,
  CLEAR_DATA_SEARCH
} from '../constants/counter'
import {RefreshState} from '../pages/common/MyScrollView'
const INITIAL_STATE = {
  list:[],
  pageIndex:0,
  refreshState:RefreshState.Idle
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH:
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

    case CLEAR_DATA_SEARCH:
      return{
        ...state,
        list:[],
        pageIndex:0,
        refreshState:RefreshState.Idle
      }
     default:
       return state
  }
}
