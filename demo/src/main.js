// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'weui/dist/style/weui.min.css'
import 'weui/dist/style/weui.css'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store.js'
//引入element-ui
import ElementUI from 'element-ui'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
