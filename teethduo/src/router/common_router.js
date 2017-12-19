/*项目公共的路由配置*/

//test 模块【康燕燕】
import getcurrLocation from '@/components/test/getcurrLocation'
import uploadImg from '@/components/test/uploadImg'
import testInterface from '@/components/test/testInterface'
import testCloseWX from '@/components/test/testCloseWX'
//common 模块【康燕燕】
import errorPage from '@/components/common/errorPage'//错误页面
import errorPstate from '@/components/common/errorPstate'//保单错误页面
import enterRouter from '@/components/common/enterRouter'//空白页面
import toMapEmpty from '@/components/common/toMapEmpty'//接入地图的空白路由
let  common_routes = [
    {
      path: '/',
      name: 'errorPage',
      component: errorPage
    },
    {
      path: '/common/errorPage',  // 错误页面
      name: 'errorPage',
      component: errorPage
    },
    {
      path: '/common/errorPstate',  // 保单错误页面
      name: 'errorPstate',
      component: errorPstate
    },{
      path: '/common/enterRouter',  // 空白页面
      name: 'enterRouter',
      component: enterRouter
    },{
      path: '/common/toMapEmpty',  // 接入地图的空白路由
      name: 'toMapEmpty',
      component: toMapEmpty
    },
    {//test 模块【康燕燕】 getcurrLocation
      path: '/test/getcurrLocation',
      name: 'getcurrLocation',
      component: getcurrLocation
    },//test 模块【康燕燕】 uploadImg
    {
      path: '/test/uploadImg',
      name: 'uploadImg',
      component: uploadImg
    },
    {
      path: '/test/testInterface',
      name: 'testInterface',
      component: testInterface
    },
    {
      path: '/test/testCloseWX',
      name: 'testCloseWX',
      component: testCloseWX
    },
  ];

export default common_routes;