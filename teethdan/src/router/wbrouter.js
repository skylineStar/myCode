/*微保渠道的路由配置*/

//test 模块【康燕燕】
import getcurrLocation from '@/components/test/getcurrLocation'
import uploadImg from '@/components/test/uploadImg'
import elementUploadImg from '@/components/test/elementUploadImg'
import testInterface from '@/components/test/testInterface'
import testCloseWX from '@/components/test/testCloseWX'
import errorPage from '@/components/common/errorPage'//错误页面
import errorPstate from '@/components/common/errorPstate'//保单错误页面
import enterRouter from '@/components/common/enterRouter'//空白页面
import toMapEmpty from '@/components/common/toMapEmpty'//接入地图的空白路由

//order 模块【王云召】
import Place from '@/components/order/Place'
import checkStation from '@/components/order/checkStation'
import checkTime from '@/components/order/checkTime'
import toOrder from '@/components/order/toOrder'
import toPage from '@/components/order/toPage'
import agreeServe from '@/components/order/agreeServe'
import serveContent from '@/components/order/serveContent'

//user 预约信息【徐瑞瑞】
import orderDetail from '@/components/user/orderDetail'
//user 评价填写【徐瑞瑞】
import evalFill from '@/components/user/evalFill'
//import evalDetail from '@/components/user/evalDetail'
import shopDetail from '@/components/user/shopDetail'//门店详情
import teethImg from '@/components/user/teethImg'//口腔全景
import unorder from '@/components/user/unorder'//爽约

let  wbroutes = [
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
    },//test 模块【康燕燕】 elementUploadImg
    {
      path: '/test/elementUploadImg',
      name: 'elementUploadImg',
      component: elementUploadImg
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
    //order 模块【王云召】 //1206晚 生产打包注释入口
    {// 去页面
      path: '/order/toPage',
      name: 'toPage',
      component: toPage
    }, 
    {// 选择地点
      path: '/order/Place',
      name: 'Place',
      component: Place
    },
    {// 选择门诊
      path: '/order/checkStation',
      name: 'checkStation',
      component: checkStation
    },
    {// 选择日期
      path: '/order/checkTime',
      name: 'checkTime',
      component: checkTime
    },
    {// 服务内容
      path: '/order/serveContent',
      name: 'serveContent',
      component: serveContent
    },
    {// 同意服务意向书
      path: '/order/agreeServe',
      name: 'agreeServe',
      component: agreeServe
    },
    {// 预约信息
      path: '/order/toOrder',
      name: 'toOrder',
      component: toOrder
    },
    //user 预约信息【徐瑞瑞】
    {
      path: '/user/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    //user 评价填写【徐瑞瑞】
    {
      path: '/user/evalFill',
      name: 'evalFill',
      component: evalFill
    },
//  {
//    path: '/user/evalDetail',
//    name: 'evalDetail',
//    component: evalDetail
//  },
     //user 门店详情【徐瑞瑞】
    {
      path: '/user/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    },
     //user 口腔全景【徐瑞瑞】
    {
      path: '/user/teethImg',
      name: 'teethImg',
      component: teethImg
    },
    //user 爽约【徐瑞瑞】
    {
      path: '/user/unorder',
      name: 'unorder', 
      component: unorder
    }
  ];

export default wbroutes;