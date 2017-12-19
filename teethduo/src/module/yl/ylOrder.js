//gxOrder模块的打包入口文件  author:kyy

//import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from '../../router/yl_order_index.js'
import LoadMore from '../../components/loadmore'
 
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(LoadMore)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})