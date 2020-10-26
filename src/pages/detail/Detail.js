import React from 'react'
import {View,WebView} from '@tarojs/components'
import Taro,{getCurrentInstance} from '@tarojs/taro'

export default  function Detail() {

  Taro.showShareMenu({
    withShareTicket: true
  });
  Taro.setNavigationBarTitle({
    title: getCurrentInstance().router.params.title
  });

  return <View>
       <WebView  src={getCurrentInstance().router.params.url}/>
  </View>
}
