import React,{useState} from 'react'
import {View,Image,Text,Button} from '@tarojs/components'
import {useDispatch, useSelector} from 'react-redux'
import { AtSearchBar,AtTag,AtModal,AtModalAction} from 'taro-ui'
import Taro from '@tarojs/taro'
import deleteIcon  from '../../asset/image/delete.png'
import {clearData, search} from "../../actions/search";
import {RefreshState} from "../common/MyScrollView";
import MyScrollView from "../common/MyScrollView";
import {changeTabState} from "../../actions/home";
export default  function Search() {
  const {statusBarHeight,windowHeight}= useSelector(state => state.home);
  const {list,pageIndex,refreshState}= useSelector(state => state.search);
  const [value,setValue]= useState();
  const [isOpened,setIsOpened]= useState();
  const [showSearchContent,setShowSearchContent]= useState(false);

  const dispatch=useDispatch();
  function onChange (value) {
    setValue(value)
  }

  function  onActionClick () {
    try {
      search(dispatch,0,value);
      setShowSearchContent(true);
      let value_history = Taro.getStorageSync('searchHistory');
      if (value_history) {
        let index=value_history.indexOf(value);
        if(index>-1){
          value_history.splice(index,1)
        }
        value_history.unshift(value);
        Taro.setStorageSync('searchHistory',value_history)
      }else{
        Taro.setStorageSync('searchHistory',[value])
      }
    } catch (e) {
      console.log("value"+e);
    }
  }

  /**
   * 清除搜索
   */
  function onClear() {
     setValue("");
     clearData(dispatch);
     setShowSearchContent(false)
  }

  /**
   * 标签点击
   * @param value
   */
  function atTagOnClick(value) {
    setShowSearchContent(true)
    setValue(value);
    search(dispatch,0,value);
  }



  function changeOpened(value) {
    setIsOpened(value)
  }

  function handleCancel() {
    changeOpened(false)
  }

  function handleConfirm() {
      Taro.removeStorageSync('searchHistory');
      setIsOpened(false)
  }
  function onScrollToLower(RefreshState){
    console.log("onScrollToLower"+RefreshState+pageIndex);
   // changeTabState(dispatch,RefreshState);
    search(dispatch,pageIndex,value);
  }

  function goDetail(url,title){
    Taro.navigateTo({
      url: '/pages/detail/Detail?url='+url+"&title="+title
    })
  }

  let value_history = Taro.getStorageSync('searchHistory');
  return <View >
            <AtSearchBar
              style={{marginLeft:10,marginRight:10}}
              showActionButton
              value={value}
              onChange={(value)=>onChange(value)}
              onActionClick={()=>onActionClick()}
              onClear={()=>onClear()}
            />
            <View style={{position:'relative'}}>
                 <View style={{display:showSearchContent?'none':null,marginLeft:10,marginRight:10}}>
                    {value_history?
                      <View style={{height:40, color:'#999',fontSize:14, display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <Text >最近搜索</Text>
                        <Image
                          onClick={()=>changeOpened(true)}
                          style={{height:24,width:24}}
                          src={deleteIcon}/>
                      </View>:null}
                    <View>
                      {value_history&&value_history.map((item,index)=>{
                        return <AtTag circle  onClick={()=>atTagOnClick(item)}>{item}</AtTag>
                      })}
                    </View>
                </View>
                <View style={{position: 'absolute',top:0,width:'100%',display:showSearchContent?null:'none'}}>
                  <MyScrollView
                                scrollY
                                style={{height:windowHeight-statusBarHeight-46}}
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
            </View>
            <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
              <View style={{margin:20}}>确定要删除历史记录吗?</View>
              <AtModalAction>
                <Button onClick={()=>handleCancel()}>取消</Button>
                <Button onClick={()=>handleConfirm()}>确定</Button>
              </AtModalAction>
            </AtModal>
    </View>
}
