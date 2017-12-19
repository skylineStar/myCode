import Vue from 'vue'
import Router from 'vue-router'

import GXrouter from './gxrouter.js'
import WBrouter from './wbrouter.js'

Vue.use(Router);
let  routes = GXrouter.concat(WBrouter);
//let  routes = WBrouter;
const router = new Router({
  history: false,
  routes : routes
});

router.beforeEach((to, from, next) => {
//	var enterRouter=sessionStorage.getItem('enterRouter');
	//if(enterRouter=='2'){}
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router;