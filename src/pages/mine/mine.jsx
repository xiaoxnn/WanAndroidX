import  React,{useState,}  from 'react'
import  {useSelector} from 'react-redux'
import { View, Button, Text,Image} from '@tarojs/components'
import {AtTextarea ,AtAvatar } from 'taro-ui'
import MyListTile from "../common/MyListTile";
import rank  from '../../asset/image/rank.png'
import coin  from '../../asset/image/coin.png'
import collect  from '../../asset/image/collect.png'
import setting  from '../../asset/image/setting.png'
import Taro from '@tarojs/taro'

function Mine() {

  const {info,isLogin}=useSelector(state=>state.appAll);

  const [value,setValue] =useState();


  function goLoginPage() {
    if(info!=null){
      return;
    }
    Taro.navigateTo({
      url:'/pages/login/Login'
    })
  }


  function goCoinPage() {
    if(isLogin){
      Taro.navigateTo({
        url:'/pages/coin/Coin'
      })
    }else{
      goLoginPage()
    }
  }

  function goCoinRankPage() {
    if(isLogin){
      Taro.navigateTo({
        url:'/pages/coinRank/CoinRank'
      })
    }else{
      goLoginPage()
    }
  }

  function goCollectPage() {
    if(isLogin){
      Taro.navigateTo({
        url:'/pages/collect/Collect'
      })
    }else{
      goLoginPage()
    }
  }

  function goSettingPage() {
    if(isLogin){
      Taro.navigateTo({
        url:'/pages/setting/Setting'
      })
    }else{
      goLoginPage()
    }
  }



  return <View >
             <View style={{height:6,backgroundColor:'#ddd'}}/>
             <View style={{display:'flex',height:70, alignItems:'center',paddingLeft:10,paddingRight:10}} onClick={()=>goLoginPage()}>
                <AtAvatar   circle  image='https://jdc.jd.com/img/200'/>
               {!isLogin?
                 <View style={{fontSize:16,marginLeft:10}}>登录</View>:
                 <View  style={{marginLeft:10}}>
                   <View>{info.nickname}</View>
                   <View>{info.id}</View>
                 </View>
               }
             </View>
             <View style={{height:6,backgroundColor:'#ddd'}}/>
             <MyListTile title={'我的积分'} src={coin} onClick={()=>goCoinPage()}/>
             <View style={{height:1,backgroundColor:'#eee'}}/>
             <MyListTile title={'积分排行'} src={rank} onClick={()=>goCoinRankPage()} />
             <View style={{height:6,backgroundColor:'#ddd'}}/>

             <MyListTile title={'我的收藏'} src={collect} onClick={()=>goCollectPage()}/>
             <View style={{height:1,backgroundColor:'#eee'}}/>
             <MyListTile title={'系统设置'} src={setting} onClick={()=>goSettingPage()}/>
             <View style={{height:6,backgroundColor:'#ddd'}}/>
   </View>
}
export default Mine;



