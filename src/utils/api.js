import Taro from '@tarojs/taro'
import {baseUrl} from "../constants/baseUrl";
import {cookiesInfo} from "../constants/common";

const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams

  console.log(`http ${method || 'GET'} --> ${url} data: `, data)

  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
    })
}
Taro.addInterceptor(interceptor);


export function get(url,data={}) {
  let cookie = Taro.getStorageSync(cookiesInfo);
  return new Promise((resolve,reject)=>{
    Taro.request({
      url:baseUrl+url,
      data:data
      , header: {
        'Cookie': cookie,
        'Content-Type': 'application/json',
      },
      method:"GET",
      success: function (res) {
        resolve(res);
      },
      fail:function (error) {
        reject(error);
      }
    })
  });
}


export function post(url,data={}) {
  let cookie = Taro.getStorageSync(cookiesInfo);
  return Taro.request({
    url:baseUrl+url,
    data:data
    , header: {
      'Cookie': cookie,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method:"POST",
  }).then(res=>{

    const {statusCode,data}=res;
    if (statusCode >= 200 && statusCode < 300) {
      return res;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}





