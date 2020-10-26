import {
  Banner,
  StatusBarHeight,
  HOME_CHANGE_TAB_REFRESH_STATE,
  HOME_LIST,
  HOME_CLEAR_DATA
} from '../constants/counter'
import {RefreshState} from '../pages/common/MyScrollView'
const INITIAL_STATE = {
  banner: [],
  statusBarHeight:0,
  windowHeight:0,
  list:[],
  pageIndex:0,
  refreshState:RefreshState.Idle
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_CHANGE_TAB_REFRESH_STATE:
      return {
        ...state,
        refreshState: action.payload
      };
    case Banner:
      return {
        ...state,
        banner: action.payload.data
      };
    case StatusBarHeight:
      return {
        ...state,
        statusBarHeight: action.payload.statusBarHeight|| 0,
        windowHeight: action.payload.windowHeight || 0
      };
    case HOME_CLEAR_DATA:
      return {
        ...state,
        list:[],
        pageIndex:0,
        refreshState:RefreshState.Idle
      };
    case HOME_LIST:
      let data_list=action.payload.data.data.datas;
      let loadMore= action.payload.isLoadMore;
      state.pageIndex=action.payload.data.data.curPage;
      if(data_list.length!==0){
        state.refreshState=RefreshState.Idle;
      }else{
        state.refreshState=RefreshState.NoMoreData;
      }
      return {
        ...state,
        list:loadMore?state.list.concat(data_list):data_list,
      };
     default:
       return state
  }
}
