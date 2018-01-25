import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import mintDemo from '@/components/test/mintDemo'
import picker from '@/components/test/picker'
import msgBox from '@/components/test/msgBox'
import loadMore from '@/components/test/loadMore'
import upLoadImg from '@/components/test/upLoadImg'
import weUI from '@/components/test/weUI'
import vRouter from '@/components/test/vRouter'

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
    // picker
    {
      path: '/test/picker',
      name: 'picker',
      component: picker
    },
    // teeth
    {
      path: '/test/msgBox',
      name: 'msgBox',
      component: msgBox
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
    //weUI
    {
      path: '/test/weUI',
      name: 'weUI',
      component: weUI
    },
    //vRouter
    {
      path: '/test/vRouter',
      name: 'vRouter',
      component: vRouter
    },
  ]
})
