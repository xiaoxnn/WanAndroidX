import {post} from "../utils/api";
import apiUrl from "../constants/apiUrl";
import {LOGIN_INFO} from "../constants/counter";
import Taro from '@tarojs/taro'
import {cookiesInfo, userInfo} from "../constants/common";

/**
 * 登录
 * @param dispatch
 * @param username
 * @param password
 */
export function login (dispatch,username,password) {
  post(apiUrl.login,{"username":username,"password":password}).then(
    res=>{
      let cookies = res.header['Set-Cookie'].replace(/,/g, ';');
      console.log('=======', cookies)

      if(res.data.errorCode===0){
        dispatch({
          type:LOGIN_INFO,
          payload:res.data,
        });
        Taro.setStorageSync(userInfo,res.data.data);
        Taro.setStorageSync(cookiesInfo,cookies);
        Taro.navigateBack();
      }else{
        Taro.showToast({
          title:res.data.errorMsg
        });
      }
    }
  ).catch(err=>{
  })
}
