import React from 'react'

import {View,Text} from '@tarojs/components'

export default function MyTabs(refs) {
  const {titles,current,onClick}=refs;

  return <View style={{display:'flex',height:40}}>
    {titles.map((item,index)=>{
      return <View style={{flex:1,display:'flex',flexDirection:'column'}} onClick={()=>onClick&&onClick(index)}>
           <Text style={{height:39,flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:14}}>{item.title}</Text>
           <View style={{height:1,backgroundColor:current===index?'#f33':'transparent',width:'100%'}}/>
      </View>
    })}
  </View>
}
