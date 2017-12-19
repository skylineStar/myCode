/*个险渠道_订单模块_的路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

//order 模块【王云召】
import gxPlace from '@/components/gx/order/Place'
import gxcheckStation from '@/components/gx/order/checkStation'
import gxcheckTime from '@/components/gx/order/checkTime'
import gxtoOrder from '@/components/gx/order/toOrder'
import gxtoPage from '@/components/gx/order/toPage'
import gxagreeServe from '@/components/gx/order/agreeServe'
import gxserveContent from '@/components/gx/order/serveContent'

Vue.use(Router);
//Vue.use(LoadMore)
var  gx_order_routes = [
    {// 去页面
      path: '/gx/order/toPage',
      name: 'gxtoPage',
      component: gxtoPage
    },
    {// 选择地点
      path: '/gx/order/Place',
      name: 'gxPlace',
      component: gxPlace
    },
    {// 选择门诊
      path: '/gx/order/checkStation',
      name: 'gxcheckStation',
      component: gxcheckStation
    },
    {// 选择日期
      path: '/gx/order/checkTime',
      name: 'gxcheckTime',
      component: gxcheckTime
    },
    {// 预约信息
      path: '/gx/order/toOrder',
      name: 'gxtoOrder',
      component: gxtoOrder
    },
    {// 服务内容
      path: '/gx/order/serveContent',
      name: 'serveContent',
      component: gxserveContent
    },
    {// 同意服务意向书
      path: '/gx/order/agreeServe',
      name: 'gxagreeServe',
      component: gxagreeServe
    }
  ];
  
let routes=gx_order_routes.concat(common_router);
//let routes=gx_order_routes;
const router = new Router({
  history: false,
  routes : routes
});

router.beforeEach((to, from, next) => {
	console.log(from);
  console.log(to);
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router;