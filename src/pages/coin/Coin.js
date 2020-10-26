import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {View} from '@tarojs/components'
import {clearCoinRank, getCoin, getCoinMyRank} from "../../actions/coin";
import MyScrollView,{RefreshState} from "../common/MyScrollView";
import {longToTime} from "../../utils/timeUtil";


export default function Coin() {
  const {statusBarHeight,windowHeight}= useSelector(state => state.home);
  const {coinInfo,list,refreshState,pageIndex}=useSelector(state=>state.coin);

  const dispatch=useDispatch();

  function onScrollToLower(RefreshState){
    console.log("onScrollToLower"+RefreshState+pageIndex);
    getCoinMyRank(dispatch,pageIndex)
  }

  useEffect(()=>{
     getCoin(dispatch);
     getCoinMyRank(dispatch,pageIndex);
     return componentWillUnmount;
  },[]);


  function componentWillUnmount() {
    // 组件销毁时你要执行的代码
    clearCoinRank(dispatch);
  }
  return <View>
    {coinInfo!==null&&list.length!==0?
      <MyScrollView
        scrollY
        style={{height:windowHeight-statusBarHeight}}
        loadMore={(RefreshState)=>onScrollToLower(RefreshState)}
        lowerThreshold={30}
        refreshState={refreshState}
        refresherTriggered={refreshState===RefreshState.HeaderRefreshing}
      ><View>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:30,marginBottom:30,alignItems:'center'}}>
          <View style={{fontSize:30,}}>
            {coinInfo&&coinInfo.coinCount}
          </View>
          <View style={{fontSize:14,marginTop:20,display:'flex'}}>
            <View>
              等级:{coinInfo&&coinInfo.level}
            </View>
            <View style={{marginLeft:30}}>
              排名: {coinInfo&&coinInfo.rank}
            </View>
          </View>
        </View>
        <View>
        </View>
        {list.map((item,index)=>{
          return <View style={{height:'140rpx',borderTop: '1px solid #ddd', alignItems:'center',display:'flex',justifyContent:'space-between',paddingLeft:'10rpx',paddingRight:'10rpx'}}>
            <View>
              <View>{item.reason}</View>
              <View style={{marginTop:'10rpx'}}>{longToTime(item.date)}</View>
            </View>
            <View>
              <View>+{item.coinCount}</View>
            </View>
          </View>
        })}
      </View>
      </MyScrollView>:null}
  </View>
}
