import {get} from "../utils/api";
import apiUrl from "../constants/apiUrl";
import {COIN_INFO, COIN_MY_RANK, COIN_RANK_CLEAR} from "../constants/counter";


/**
 * 获取我的积分
 * @param dispatch
 */
export function getCoin (dispatch) {
  get(apiUrl.coin).then(
    res=>{
      dispatch({
        type:COIN_INFO,
        payload:res.data
      })
    }
  ).catch(err=>{
  })
}


/**
 * 我的积分排行
 * @param dispatch
 * @param page
 */
export function getCoinMyRank (dispatch,page) {
  get(apiUrl.coinMyRank+page+"/json").then(
    res=>{
      dispatch({
        type:COIN_MY_RANK,
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

