import { SEARCH,CLEAR_DATA_SEARCH} from '../constants/counter'
import {post} from "../utils/api";
import apiUrl from "../constants/apiUrl";




/**
 * 获取搜索内容
 * @param dispatch
 * @param index
 * @param searchContent
 */
export function search (dispatch,index,searchContent) {
  post(apiUrl.search+index+"/json",{"k":searchContent}).then(
    res=>{
      console.log("res"+res.data)
      dispatch({
        type:SEARCH,
        payload:res.data,
      })
    }
  ).catch(err=>{
  })
}


/**
 * 清除搜索内容
 */
export function clearData (dispatch) {
  dispatch({
    type:CLEAR_DATA_SEARCH,
  })
}
