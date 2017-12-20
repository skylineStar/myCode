// The Vue build version to load with the `import` command
import './assets/common.css'
import './assets/css/blueStyle.css'
import './assets/css/whqStyle.css'

import Vue from 'vue'
import App from './App'
import mui from './../static/mui/mui.min.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'


Vue.config.productionTip = false
Vue.prototype.mui = mui
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
