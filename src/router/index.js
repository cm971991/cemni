export default {
  defaultTitle: '千年珠宝',
  // 将所有页面组件一次性加载是一个很浪费资源和考验用户耐心的做法，尤其在移动端
  // 异步加载组件
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/main.vue'], resolve)
      },
      meta: {title: '首页'}
    },
    {
      path: '/userInfo',
      component: function (resolve) {
        require(['../pages/userInfo.vue'], resolve)
      },
      meta: {title: '用户信息'}
    },
    {
      path: '/gift',
      component: function (resolve) {
        require(['../pages/lottoBear.vue'], resolve)
      },
      meta: {title: '抽奖'}
    },
    {
      path: '/ticket',
      component: function (resolve) {
        require(['../pages/lottoTicket.vue'], resolve)
      },
      meta: {title: '抽奖'}
    }
  ]
}
