
import {
  Banner,
  StatusBarHeight,
  HOME_LIST,
  HOME_CHANGE_TAB_REFRESH_STATE,
  HOME_CLEAR_DATA,
} from '../constants/counter'
import {get} from "../utils/api";
import apiUrl from "../constants/apiUrl";
import Taro from '@tarojs/taro'

/**
 * 改变tabs的上拉状态
 * @param dispatch
 * @param tabsState
 */
export function changeTabState(dispatch,tabsState) {
  dispatch({
    type:HOME_CHANGE_TAB_REFRESH_STATE,
    payload:tabsState,
  })
}



/**
 * 获取首页banner图
 * @param dispatch
 */
export function getBanner (dispatch) {
  get(apiUrl.banner).then(
    res=>{
      console.log("res"+res.data)
       dispatch({
         type:Banner,
         payload:res.data,
       })
    }
  ).catch(err=>{
  })
}

/**
 * 获取手机状态栏高度
 * @param dispatch
 */
export function getStatusBarHeight (dispatch) {

  Taro.getSystemInfo({})
    .then(res  => {
      dispatch({
        type:StatusBarHeight,
        payload: res,
      })
    });
}

/**
 * 清除首页tab数据
 * @param dispatch
 */
export function clearData (dispatch) {
  dispatch({
    type:HOME_CLEAR_DATA,
  })
}


/**
 * 获取首页热门
 * @param dispatch
 * @param pageIndex
 * @param isLoadMore
 */
export function getHot (dispatch,pageIndex,isLoadMore) {
  get(apiUrl.hot+`${pageIndex}`+'/json').then(
    res=>{
      console.log("res"+res.data);
      dispatch({
        type:HOME_LIST,
        payload:{"data":res.data,"isLoadMore":isLoadMore},
      })
    }
  ).catch(err=>{

  })
}

/**
 * 获取首页最新
 * @param dispatch
 * @param index
 */
export function getNewest (dispatch,index,isLoadMore) {
  get(apiUrl.newest+`${index}`+'/json').then(
    res=>{
      console.log("res"+res.data);
      dispatch({
        type:HOME_LIST,
        payload:{"data":res.data,"isLoadMore":isLoadMore},
      })
    }
  ).catch(err=>{
  })
}

/**
 * 获取首页广场
 * @param dispatch
 * @param index
 */
export function getPlaza (dispatch,index,isLoadMore) {
  get(apiUrl.plaza+`${index}`+'/json').then(
    res=>{
      console.log("res"+res.data);
      dispatch({
        type:HOME_LIST,
        payload:{"data":res.data,"isLoadMore":isLoadMore},
      })
    }
  ).catch(err=>{
  })
}

