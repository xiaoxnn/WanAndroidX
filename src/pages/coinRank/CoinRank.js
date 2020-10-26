import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {View,Text} from '@tarojs/components'
import {clearCoinRank, getCoinRank} from "../../actions/coinRank";
import MyScrollView,{RefreshState} from "../common/MyScrollView";
export default function CoinRank() {
  const {statusBarHeight,windowHeight}= useSelector(state => state.home);
  const {list,refreshState,pageIndex}=useSelector(state=>state.coinRank);

  const dispatch=useDispatch();

  function onScrollToLower(RefreshState){
    console.log("onScrollToLower"+RefreshState+pageIndex);
    getCoinRank(dispatch,pageIndex)
  }

  useEffect(()=>{
    getCoinRank(dispatch,pageIndex);
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
        return <View style={{height:'100rpx',borderTop: '1px solid #ddd', alignItems:'center',display:'flex',justifyContent:'space-between',paddingLeft:'10rpx',paddingRight:'10rpx'}}>
          <View>
            <Text>{item.rank}</Text>
            <Text style={{marginLeft:'12rpx'}}>{item.username}</Text>
          </View>
          <View>+{item.coinCount}</View>
        </View>
      })}
    </MyScrollView>
  </View>
}
