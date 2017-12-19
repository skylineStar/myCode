import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

//order 模块【王云召】
import Place from '@/components/order/Place'
import checkStation from '@/components/order/checkStation'
import checkTime from '@/components/order/checkTime'
import toOrder from '@/components/order/toOrder'
import toPage from '@/components/order/toPage'
import agreeServe from '@/components/order/agreeServe'
import serveContent from '@/components/order/serveContent'

//user 预约信息【徐瑞瑞】
import orderDetail from '@/components/user/orderDetail'//user 预约信息【徐瑞瑞】
import evalFill from '@/components/user/evalFill'//user 评价填写【徐瑞瑞】
import shopDetail from '@/components/user/shopDetail'//门店详情
import teethImg from '@/components/user/teethImg'//口腔全景
import unorder from '@/components/user/unorder'//爽约

Vue.use(Router);
let  wb_routes = [
    //order 模块【王云召】
    {// 去页面
      path: '/order/toPage',
      name: 'toPage',
      component: toPage
    },
    {// 选择地点
      path: '/order/Place',
      name: 'Place',
      component: Place
    },
    {// 选择门诊
      path: '/order/checkStation',
      name: 'checkStation',
      component: checkStation
    },
    {// 选择日期
      path: '/order/checkTime',
      name: 'checkTime',
      component: checkTime
    },
    {// 服务内容
      path: '/order/serveContent',
      name: 'serveContent',
      component: serveContent
    },
    {// 同意服务意向书
      path: '/order/agreeServe',
      name: 'agreeServe',
      component: agreeServe
    },
    {// 预约信息
      path: '/order/toOrder',
      name: 'toOrder',
      component: toOrder
    },
    //user 预约信息【徐瑞瑞】
    {
      path: '/user/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    //user 评价填写【徐瑞瑞】
    {
      path: '/user/evalFill',
      name: 'evalFill',
      component: evalFill
    },
     //user 门店详情【徐瑞瑞】
    {
      path: '/user/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    },
     //user 口腔全景【徐瑞瑞】
    {
      path: '/user/teethImg',
      name: 'teethImg',
      component: teethImg
    },
    //user 爽约【徐瑞瑞】
    {
      path: '/user/unorder',
      name: 'unorder', 
      component: unorder
    }
  ];
 
let routes=wb_routes.concat(common_router);
const router = new Router({
  history: false,
  routes : routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router;