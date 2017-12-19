import 'babel-polyfill'

import Vue from 'vue'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill();
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import LoadMore from './components/loadmore'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'

//引入element-ui
import {Upload,Progress,Dialog} from 'element-ui'
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Progress);

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
