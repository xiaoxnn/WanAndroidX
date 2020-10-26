import React from 'react'
import {ScrollView,View} from '@tarojs/components'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
};

export default function MyScrollView(props) {

  const {loadMore,refreshState}=props;

  /**
   * 加载更多
   */
  function onScrollToLower() {
    if(shouldStartFooterRefreshing()){
        loadMore && loadMore(RefreshState.FooterRefreshing)
    }
  }

  function shouldStartFooterRefreshing(){
     return refreshState === RefreshState.Idle
  }

  function renderFootView(state) {
    switch (state) {
      case RefreshState.Idle:
        return <View style={{height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          加载数据中...
        </View>
      case RefreshState.FooterRefreshing:
        return <View style={{height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          加载数据中...
        </View>
      case RefreshState.HeaderRefreshing:
        return null
      case RefreshState.Failure:
        return <View style={{height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          加载失败...
        </View>
      case RefreshState.NoMoreData:
        return <View style={{height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          没有更多数据!
        </View>
    }
  };


  return <ScrollView {...props}  onScrollToLower={()=>onScrollToLower()}>
    {props.children}
    {
      renderFootView(refreshState)
    }
  </ScrollView>
}

