import  React,{useState,useEffect}  from 'react'
import  {useSelector,useDispatch} from 'react-redux'
import { View, Text} from '@tarojs/components'
import {clearData, getBanner, getStatusBarHeight,} from "../../actions/home";
import Item from "./Item";
import MyTabs from "../common/MyTabs";
import Taro from '@tarojs/taro'
import {userInfo} from "../../constants/common";
import {LOGIN_INFO} from "../../constants/counter";
export default function Home() {
  const {banner,statusBarHeight,windowHeight}= useSelector(state => state.home);
  const [current,setCurrent]=useState(0);
  const dispatch = useDispatch();
  const tabList = [{ title: '热门' }, { title: '最新' }, { title: '广场' }];
  Taro.getStorage({
       key: userInfo,
       success: function (res) {
         dispatch(
           {
             type:LOGIN_INFO,
             payload:res,
           }
         )
       }
     });

  function changeCurrent(index) {
    clearData(dispatch);
    setCurrent(index)
  }


  function goSearchPage(){
    Taro.navigateTo({
      url:'/pages/search/Search'
    })
  }

  useEffect(()=>{
    getStatusBarHeight(dispatch);
  },[]);

  console.log("current"+current);
  return <View >
              <View style={{height:statusBarHeight}}/>
               <Text  onClick={()=>goSearchPage()} style={{display:'flex',height:26,width:240,backgroundColor:'#ccc',marginLeft:10, borderRadius:26,marginTop:10,marginBottom:10,justifyContent:'center',alignItems:'center',fontSize:14}}>搜索</Text>
               {/*<Swiper*/}
                {/*indicatorColor='#999'*/}
                {/*indicatorActiveColor='#0f0'*/}
                {/*circular*/}
                {/*indicatorDots*/}
                {/*autoplay>*/}
                {/*{banner.map((item,index)=>{*/}
                  {/*return <SwiperItem >*/}
                    {/*<Image*/}
                      {/*mode='heightFix'*/}
                      {/*src={item.imagePath}*/}
                    {/*/>*/}
                  {/*</SwiperItem>*/}
                {/*})}*/}
              {/*</Swiper>*/}
                {/*<View>*/}
                   {/*<Menu style={{marginTop:40}}/>*/}
                {/*</View>*/}
                <MyTabs titles={tabList} current={current} onClick={(index)=>changeCurrent(index)}/>
                <Item index={current}/>
               {/*<AtTabs  animated current={current} tabList={tabList} onClick={(index)=>changeCurrent(index)}>*/}
                 {/*{tabList.map((item,index)=>{*/}
                  {/*return <AtTabsPane current={current} index={index} >*/}
                        {/*<Item index={index}/>*/}
                   {/*</AtTabsPane>*/}
                 {/*})}*/}
               {/*</AtTabs>*/}
  </View>
}
