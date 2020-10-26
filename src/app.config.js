export default {
  pages: [
    'pages/home/home',
    'pages/mine/mine',
    'pages/detail/Detail',
    'pages/search/Search',
    'pages/login/Login',
    'pages/setting/Setting',
    'pages/coin/Coin',
    'pages/coinRank/CoinRank',
    'pages/collect/Collect',
  ],
  tabBar:{
    list:[
      {
        pagePath:'pages/home/home',
        text:'首页'
      },
      {
        pagePath:'pages/mine/mine',
        text:'我的'
      },

    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  }
}
