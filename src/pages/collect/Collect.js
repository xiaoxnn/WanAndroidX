import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {View,Text} from '@tarojs/components'
import {clearCoinRank} from "../../actions/coinRank";
import MyScrollView,{RefreshState} from "../common/MyScrollView";
import {getCollect} from "../../actions/collect";
import Taro from "@tarojs/taro";
export default function Collect() {
  const {statusBarHeight,windowHeight}= useSelector(state => state.home);
  const {list,refreshState,pageIndex}=useSelector(state=>state.collect);

  const dispatch=useDispatch();

  function goDetail(url,title){
    Taro.navigateTo({
      url: '/pages/detail/Detail?url='+url+"&title="+title
    })
  }

  function onScrollToLower(RefreshState){
    console.log("onScrollToLower"+RefreshState+pageIndex);
    getCollect(dispatch,pageIndex)
  }

  useEffect(()=>{
    getCollect(dispatch,pageIndex);
    return componentWillUnmount;
  },[]);


  function componentWillUnmount() {
    // 组件销毁时你要执行的代码
    clearCoinRank(dispatch);
  }
  return <View>
    <MyScrollView
      scrollY
      style={{height:windowHeight-statusBarHeight}}
      loadMore={(RefreshState)=>onScrollToLower(RefreshState)}
      lowerThreshold={30}
      refreshState={refreshState}
      refresherTriggered={refreshState===RefreshState.HeaderRefreshing}
    >
      {list.map((item,index)=>{
        return <View  onClick={()=>goDetail(item.link,item.title)}>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10,color:'#333',fontSize:14}}>
            <Text>{item.author===""?"匿名":item.author}{item.shareUser}</Text>
            <Text>{item.chapterName}{item.superChapterName}</Text>
          </View>
          <View style={{marginLeft:10,marginRight:10,color:'#333',fontSize:14}}>
            <Text >{item.title}</Text>
          </View>
          <View style={{margin:10}}>
            <Text style={{color:'#999',fontSize:14}}>{item.niceDate}</Text>
          </View>
          <View style={{height:10,backgroundColor:'#ddd'}}/>
        </View>
      })}
    </MyScrollView>
  </View>
}
