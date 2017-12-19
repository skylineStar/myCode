/*个险渠道的路由配置*/

//order 模块【王云召】
import gxPlace from '@/components/gx/order/Place'
import gxcheckStation from '@/components/gx/order/checkStation'
import gxcheckTime from '@/components/gx/order/checkTime'
import gxtoOrder from '@/components/gx/order/toOrder'
import gxtoPage from '@/components/gx/order/toPage'
import gxagreeServe from '@/components/gx/order/agreeServe'
import gxserveContent from '@/components/gx/order/serveContent'

//user 预约信息【徐瑞瑞】
import gxorderDetail from '@/components/gx/user/orderDetail'
//user 评价填写【徐瑞瑞】
import gxevalFill from '@/components/gx/user/evalFill'
//import gxevalDetail from '@/components/gx/user/evalDetail'
import gxshopDetail from '@/components/gx/user/shopDetail'//门店详情
import gxteethImg from '@/components/gx/user/teethImg'//口腔全景
import gxunorder from '@/components/gx/user/unorder'//爽约

let  gxroutes = [
    //order 模块【王云召】
    {// 去页面
      path: '/gx/order/toPage',
      name: 'gxtoPage',
      component: gxtoPage
    },
    {// 选择地点
      path: '/gx/order/Place',
      name: 'gxPlace',
      component: gxPlace
    },
    {// 选择门诊
      path: '/gx/order/checkStation',
      name: 'gxcheckStation',
      component: gxcheckStation
    },
    {// 选择日期
      path: '/gx/order/checkTime',
      name: 'gxcheckTime',
      component: gxcheckTime
    },
    {// 预约信息
      path: '/gx/order/toOrder',
      name: 'gxtoOrder',
      component: gxtoOrder
    },
    {// 服务内容
      path: '/gx/order/serveContent',
      name: 'serveContent',
      component: gxserveContent
    },
    {// 同意服务意向书
      path: '/gx/order/agreeServe',
      name: 'gxagreeServe',
      component: gxagreeServe
    },
    //user 预约信息【徐瑞瑞】
    {
      path: '/gx/user/orderDetail',
      name: 'gxorderDetail',
      component: gxorderDetail
    },
    //user 评价填写【徐瑞瑞】
    {
      path: '/gx/user/evalFill',
      name: 'gxevalFill',
      component: gxevalFill
    },
//  {
//    path: '/gx/user/evalDetail',
//    name: 'gxevalDetail',
//    component: gxevalDetail
//  },
     //user 门店详情【徐瑞瑞】
    {
      path: '/gx/user/shopDetail',
      name: 'gxshopDetail',
      component: gxshopDetail
    },
     //user 口腔全景【徐瑞瑞】
    {
      path: '/gx/user/teethImg',
      name: 'gxteethImg',
      component: gxteethImg
    },
    //user 爽约【徐瑞瑞】
    {
      path: '/gx/user/unorder',
      name: 'gxunorder', 
      component: gxunorder
    }
  ];

export default gxroutes;