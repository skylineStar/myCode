import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import mintDemo from '@/components/test/mintDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    // mint-ui
    {
      path: '/test/mintDemo',
      name: 'mintDemo',
      component: mintDemo
    }
  ]
})
