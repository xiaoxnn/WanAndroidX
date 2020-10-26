import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text,Swiper,SwiperItem} from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.css'

import {get} from "../../utils/api";
import apiUrl from "../../constants/apiUrl";
import Home from "../home/Home";


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {
    console.log("test","componentWillUnmount");
  }

  componentDidShow () {
   // get(apiUrl.home+"1/json")
    get(apiUrl.banner);
    console.log("test","componentDidShow");

  }

  componentDidHide () {
    console.log("test","componentDidHide");
  }

  goHome(){
    console.log("tes");
    // Taro.navigateTo({
    //   url: '/pages/home/home'
    // })
    get(apiUrl.home+"1/json")
  }


  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <Home/>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, WorlddF</Text></View>
        <View style={{height:600}}/>
        <Button onClick={()=>this.goHome()} >跳转去home</Button>
      </View>
    )
  }
}

export default Index

