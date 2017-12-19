/*个险渠道_订单模块_的路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

//order 模块【王云召】
import Place from '@/components/yl/order/Place'
import checkStation from '@/components/yl/order/checkStation'
import checkTime from '@/components/yl/order/checkTime'
import toOrder from '@/components/yl/order/toOrder'
import toPage from '@/components/yl/order/toPage'
import agreeServe from '@/components/yl/order/agreeServe'
import serveContent from '@/components/yl/order/serveContent'

Vue.use(Router);
//Vue.use(LoadMore)
var  yl_order_routes = [
    {// 去页面
      path: '/yl/order/toPage',
      name: 'toPage',
      component: toPage
    },
    {// 选择地点
      path: '/yl/order/Place',
      name: 'Place',
      component: Place
    },
    {// 选择门诊
      path: '/yl/order/checkStation',
      name: 'checkStation',
      component: checkStation
    },
    {// 选择日期
      path: '/yl/order/checkTime',
      name: 'checkTime',
      component: checkTime
    },
    {// 预约信息
      path: '/yl/order/toOrder',
      name: 'toOrder',
      component: toOrder
    },
    {// 服务内容
      path: '/yl/order/serveContent',
      name: 'serveContent',
      component: serveContent
    },
    {// 同意服务意向书
      path: '/yl/order/agreeServe',
      name: 'agreeServe',
      component: agreeServe
    }
  ];
  
let routes=yl_order_routes.concat(common_router);
//let routes=yl_order_routes;
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