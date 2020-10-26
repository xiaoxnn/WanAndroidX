import React from 'react'

import {View,Text,Image} from '@tarojs/components'

export default function MyListTile(props) {
  const {title,src,onClick}=props;
  return <View style={{height:46,display:'flex',alignItems:'center',paddingLeft:18,paddingRight:10}} onClick={()=>onClick&&onClick()}>
      <Image src={src} style={{width:28,height:28}}/>
      <Text style={{marginLeft:16,fontSize:14}}>{title}</Text>
  </View>
}
