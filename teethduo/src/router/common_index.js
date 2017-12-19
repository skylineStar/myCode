/*个险渠道_订单模块_的路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
import common_router from './common_router.js'

Vue.use(Router);
const router = new Router({
  history: false,
  routes : common_router
});

router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router;