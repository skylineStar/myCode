/*个险渠道_预约模块_的路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

//user 预约信息【徐瑞瑞】User.html#/
import orderDetail from '@/components/yl/user/orderDetail'//user 预约信息【徐瑞瑞】
import evalFill from '@/components/yl/user/evalFill'//user 评价填写【徐瑞瑞】
import shopDetail from '@/components/yl/user/shopDetail'//门店详情
import teethImg from '@/components/yl/user/teethImg'//口腔全景
import unorder from '@/components/yl/user/unorder'//爽约

Vue.use(Router);
var  yl_user_routes = [
    {//user 预约信息【徐瑞瑞】
      path: '/yl/user/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {//user 评价填写【徐瑞瑞】
      path: '/yl/user/evalFill',
      name: 'evalFill',
      component: evalFill
    },
    {//user 门店详情【徐瑞瑞】
      path: '/yl/user/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    },
    {//user 口腔全景【徐瑞瑞】
      path: '/yl/user/teethImg',
      name: 'teethImg',
      component: teethImg
    },
    {//user 爽约【徐瑞瑞】
      path: '/yl/user/unorder',
      name: 'unorder', 
      component: unorder
    }
  ];

let routes=yl_user_routes.concat(common_router);
//let routes=yl_user_routes;
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