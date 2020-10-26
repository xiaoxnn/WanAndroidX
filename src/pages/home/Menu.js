import React from 'react'
import {View,Image,Text} from '@tarojs/components'
import menu_1 from '../../asset/image/1.png'
import menu_2 from '../../asset/image/2.png'
import menu_3 from '../../asset/image/3.png'
import menu_4 from '../../asset/image/4.png'
export default function Menu(){
  return <View style={{display:'flex',justifyContent:'space-around',marginTop:10}}>
          <View style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Image
              style={{height:50,width:50}}
              src={menu_1}/>
              <Text>导航</Text>
          </View>
          <View style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Image
              style={{height:38,width:38,padding:7}}
              src={menu_2}/>
            <Text>体系</Text>
          </View>
          <View style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Image
              style={{height:38,width:38,padding:7}}
              src={menu_3}/>
            <Text>网站</Text>
          </View>
          <View style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Image
              style={{height:50,width:50}}
              src={menu_4}/>
            <Text>项目</Text>
          </View>
  </View>

}
