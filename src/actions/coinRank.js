import {get} from "../utils/api";
import apiUrl from "../constants/apiUrl";
import { COIN_RANK, COIN_RANK_CLEAR} from "../constants/counter";



/**
 * 积分排行
 * @param dispatch
 * @param page
 */
export function getCoinRank (dispatch,page) {
  get(apiUrl.coinRank+page+"/json").then(
    res=>{
      dispatch({
        type:COIN_RANK,
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

