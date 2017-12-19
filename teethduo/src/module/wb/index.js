//微保模块的打包入口文件  author:kyy

//import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from '../../router/wb_index.js'
 
Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})