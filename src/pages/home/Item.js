import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {View,ScrollView,Text}  from '@tarojs/components'
import {changeTabState, clearData, getHot, getNewest, getPlaza} from "../../actions/home";
import MyScrollView,{RefreshState} from "../common/MyScrollView";
import Taro from '@tarojs/taro'
export default function Item(ref) {
  const {index}= ref;
  const {list,statusBarHeight,windowHeight,refreshState,pageIndex}= useSelector(state => state.home);
  const dispatch= useDispatch();


  function onRefresherRefresh(){
      changeTabState(dispatch,RefreshState.HeaderRefreshing);
      setTimeout(()=>{
        getData(0,false);
      },2000);

     // Taro.stopPullDownRefresh()
      console.log("onRefresherRefresh");
  }


  function onRefresherRestore() {
    console.log("onRefresherRestore");
  }


  function onScrollToLower(RefreshState){
    console.log("onScrollToLower"+RefreshState+pageIndex);
    changeTabState(dispatch,RefreshState);
    getData(pageIndex,true);
  }
  function getData (pageIndex_,isLoadMore)  {
    if(index===0) {
      getHot(dispatch,pageIndex_,isLoadMore)
    }
    if(index===1) {
      getNewest(dispatch, pageIndex_,isLoadMore)
    }
    if(index===2) {
      getPlaza(dispatch, pageIndex_,isLoadMore)
    }
  }


  function goDetail(url,title){
    Taro.navigateTo({
      url: '/pages/detail/Detail?url='+url+"&title="+title
    })
  }
  useEffect(()=>{
      getData(pageIndex,true);
  },[index]);
  console.log("Item"+index);
  return  <View>
              <MyScrollView refresherEnabled
                            scrollY
                            style={{height:windowHeight-statusBarHeight-46-46}}
                            onRefresherRefresh={()=>onRefresherRefresh()}
                            loadMore={(RefreshState)=>onScrollToLower(RefreshState)}
                            lowerThreshold={30}
                            refreshState={refreshState}
                            refresherTriggered={refreshState===RefreshState.HeaderRefreshing}
                            onRefresherRestore={()=>onRefresherRestore()}
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
