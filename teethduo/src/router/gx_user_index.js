/*个险渠道_预约模块_的路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

//user 预约信息【徐瑞瑞】gxUser.html#/
import gxorderDetail from '@/components/gx/user/orderDetail'//user 预约信息【徐瑞瑞】
import gxevalFill from '@/components/gx/user/evalFill'//user 评价填写【徐瑞瑞】
import gxshopDetail from '@/components/gx/user/shopDetail'//门店详情
import gxteethImg from '@/components/gx/user/teethImg'//口腔全景
import gxunorder from '@/components/gx/user/unorder'//爽约

Vue.use(Router);
var  gx_user_routes = [
    {//user 预约信息【徐瑞瑞】
      path: '/gx/user/orderDetail',
      name: 'gxorderDetail',
      component: gxorderDetail
    },
    {//user 评价填写【徐瑞瑞】
      path: '/gx/user/evalFill',
      name: 'gxevalFill',
      component: gxevalFill
    },
    {//user 门店详情【徐瑞瑞】
      path: '/gx/user/shopDetail',
      name: 'gxshopDetail',
      component: gxshopDetail
    },
    {//user 口腔全景【徐瑞瑞】
      path: '/gx/user/teethImg',
      name: 'gxteethImg',
      component: gxteethImg
    },
    {//user 爽约【徐瑞瑞】
      path: '/gx/user/unorder',
      name: 'gxunorder', 
      component: gxunorder
    }
  ];

let routes=gx_user_routes.concat(common_router);
//let routes=gx_user_routes;
const router = new Router({
  history: false,
  routes : routes
});

router.beforeEach((to, from, next) => {
	console.log(to)
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router;