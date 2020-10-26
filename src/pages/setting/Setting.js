import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {View,Text,Button} from '@tarojs/components'
import {AtModal,AtModalAction} from 'taro-ui'
import Taro from '@tarojs/taro'
import {CLEAR_INFO} from "../../constants/counter";
import {userInfo} from "../../constants/common";
export default function Setting() {

  const [isOpened,setIsOpened]=useState(false);
  const dispatch=useDispatch();
  function handleShow(isOpen) {
     setIsOpened(isOpen);
  }
  function handleConfirm() {
    dispatch({
      type:CLEAR_INFO
    });
    Taro.removeStorageSync(userInfo);
    Taro.navigateBack();
  }

  return <View >
         <View style={{height:10,backgroundColor:'#ddd',}}/>
         <View style={{display:'flex',justifyContent:'space-between' ,marginLeft:10,marginRight:10, height:40,alignItems:'center',fontSize:14}}>
           <Text>关于我们</Text>
           <Text>当前版本1.0</Text>
         </View>
         <View style={{height:10,backgroundColor:'#ddd'}}/>
         <View style={{display:'flex',justifyContent:'center' , height:40,alignItems:'center',fontSize:14}} onClick={()=>handleShow(true)}>
           退出登录
         </View>
         <View style={{height:10,backgroundColor:'#ddd'}}/>

        <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
          <View style={{margin:20}}>确定要退出登录吗?</View>
          <AtModalAction>
            <Button onClick={()=>handleShow(false)}>取消</Button>
            <Button onClick={()=>handleConfirm()}>确定</Button>
          </AtModalAction>
        </AtModal>
  </View>
}
