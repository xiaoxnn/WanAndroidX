import {get} from "../utils/api";
import apiUrl from "../constants/apiUrl";
import { COLLECT, COIN_RANK_CLEAR} from "../constants/counter";


/**
 * 我的收藏
 * @param dispatch
 * @param page
 */
export function getCollect (dispatch,page) {
  get(apiUrl.collect+page+"/json").then(
    res=>{
      dispatch({
        type:COLLECT,
        payload:res.data
      })
    }
  ).catch(err=>{
  })
}


/**
 * 清除积分排行
 * @param dispatch
 * @param page
 */
export function clearCoinRank (dispatch,page) {
  dispatch({
    type:COIN_RANK_CLEAR,
  })
}

