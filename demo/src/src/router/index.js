import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import mintDemo from '@/components/test/mintDemo'
import teeth from '@/components/test/teeth'
import order from '@/components/test/order'
import loadMore from '@/components/test/loadMore'
import upLoadImg from '@/components/test/upLoadImg'


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
    },
    // teeth
    {
      path: '/test/teeth',
      name: 'teeth',
      component: teeth
    },
    // teeth
    {
      path: '/test/order',
      name: 'order',
      component: order
    },
    // teeth
    {
      path: '/test/loadMore',
      name: 'loadMore',
      component: loadMore
    },
   //upLoadImg
   {
      path: '/test/upLoadImg',
      name: 'upLoadImg',
      component: upLoadImg
    },
  ]
})
