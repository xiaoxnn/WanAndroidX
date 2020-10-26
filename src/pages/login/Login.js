import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {View,Input} from '@tarojs/components'
import { AtInput, AtButton ,AtToast } from 'taro-ui'
import {login} from "../../actions/login";
import Taro from '@tarojs/taro'
export default function Login() {

  const [name,setName]=useState();
  const [password,setPassword]=useState();
  const dispatch=useDispatch();


  function changeName(value) {
    setName(value);
  }

  function changePassword(value) {
    setPassword(value);
  }

  function Login() {
      if(name===undefined||name===''){
        Taro.showToast({
          title:'请输入用户名'
        });
        return
      }
    if(password===undefined||password===''){
      Taro.showToast({
        title:'请输入密码'
      });
      return
    }
      login(dispatch,name,password)
  }
  return <View style={{marginLeft:'10rpx',marginRight:'40rpx'}}>

      <View style={{marginLeft:'32rpx',marginTop:'50rpx'}}>用户名:</View>
      <AtInput   name='name' placeholder='请输入用户名' value={name} onChange={(value)=>changeName(value)} clear/>
      <View style={{marginLeft:'32rpx',marginTop:'30rpx'}}>密码:</View>
      <AtInput  name='password'  placeholder='请输入密码' value={password} onChange={(value)=>changePassword(value)}/>
      <View style={{paddingLeft:'32rpx',marginTop:'40rpx'}}>
        <AtButton  type='primary' onClick={()=>Login()}>登录</AtButton>
      </View>
  </View>
}
