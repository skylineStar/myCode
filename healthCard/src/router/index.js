import Vue from 'vue'
import Router from 'vue-router'

//import MainPage from '@/components/mainPage'
import ErrorPage from '@/components/errorPage'
import errorLink from '@/components/common/errorLink'//错误链接页面
import common_share from '@/components/common/common_share'//公共分享页面


import RunDevPage from '@/components/runDevPage'
import Home from '@/components/meal/Home'
import LeadPage from '@/components/leadPage'
// 【1-1】体检套餐
import JigouSelect from '@/components/meal/jigouSelect'
import Location from '@/components/meal/location'
import JigouStation from '@/components/meal/jigouStation'
import JigouInfo from '@/components/meal/jigouInfo'
// 【1-2】套餐查询
import MealSearch from '@/components/meal/mealSearch/mealSearch'
import MealInfo from '@/components/meal/mealSearch/mealInfo'
import PopImg from '@/components/meal/mealSearch/popImg' // 弹出层
// 【立即购买】
import BuyNow from '@/components/meal/buyNow/buyNow'
import Invoices from '@/components/meal/buyNow/invoices' // 发票
// 【1-3】工作日查询
import WorkdaySearch from '@/components/meal/workdaySearch/workdaySearch'

// 【产品管理】
import UserManage from '@/components/order/UserManage' // 用户管理
import LoginCard from '@/components/order/LoginCard' // 卡密登录
import Cardlist from '@/components/order/Cardlist' // 卡券列表
import TestStart from '@/components/order/TestStart' // 启动预约
//import OrderStep2 from '@/components/order/OrderStep2' // 预约步骤2

import osGover from '@/components/order/osGover' // 机构展开
import City from '@/components/order/City' // 城市展开
//import osStation from '@/components/order/osStation' // 站点展开
import dateCheck from '@/components/order/dateCheck' // 日期展开
import orderMsg from '@/components/order/orderMsg' // 基本信息展开
import osShare from '@/components/order/osShare' // 分享页面
import cardShare from '@/components/order/cardShare' // 去分享

// 【我的预约记录】
import MyOrders from '@/components/order/myOrderRecord/myOrders'  // 我的预约记录
import MyOrderInfo from '@/components/order/myOrderRecord/myOrderInfo'  // 预约记录详情
import CancelOrder from '@/components/order/myOrderRecord/cancelOrder'  // 取消预约

// 【我的体检报告】
import myReports from '@/components/order/myReports/myReports'  // 我的预约记录
Vue.use(Router)
export default new Router({
  //mode: 'history',//'history',
  routes: [
//  {
//    path: '',  // 头页面
//    name: 'mainPage',
//    component: MainPage
//  },
    {
      path: '',  // 错误页面
      name: 'errorPage',
      component: ErrorPage
    },
    {
      path: '/common/errorLink',  // 错误页面
      name: 'errorLink',
      component: errorLink
    },
    {
      path: '/common/common_share',  // 分享页面
      name: 'common_share',
      component: common_share
    },
    {
      path: '/leadPage',  // 引导页
      name: 'leadPage',
      component: LeadPage
    },
    {
      path: '/runDevPage',  // 启动页【1】
      name: 'runDevPage',
      component: RunDevPage
    },

    {
      path: '/meal/Home',  // 主页 (三条线)
      name: 'Home',
      component: Home
    },
    {
      path: '/meal/buyNow/buyNow',  // [立即购买]
      name: 'buyNow',
      component: BuyNow
    },
    {
      path: '/meal/buyNow/invoices',  // [发票]
      name: 'invoices',
      component: Invoices
    },
    {
      path: '/meal/jigouSelect',  // （1-1）机构选择5
      name: 'jigouSelect',
      component: JigouSelect
    },
    {
      path: '/meal/location',  // （1-1）地址选择6
      name: 'location',
      component: Location
    },
    {
      path: '/meal/jigouStation',  // （1-1）机构站点7
      name: 'jigouStation',
      component: JigouStation
    },
    {
      path: '/meal/jigouInfo',  // （1-1）机构详情8
      name: 'jigouInfo',
      component: JigouInfo
    },
    {
      path: '/meal/mealSearch/mealSearch',  // （1-2）套餐查询
      name: 'mealSearch',
      component: MealSearch
    },
    {
      path: '/meal/mealSearch/mealInfo',  // （1-2）套餐详情
      name: 'mealInfo',
      component: MealInfo
    },{
      path: '/meal/mealSearch/popImg',  //（1-2套餐详情- 弹出层
      name: 'popImg',
      component: PopImg
    },
    {
      path: '/meal/workdaySearch/workdaySearch',  // （1-3） 工作日查询
      name: 'workdaySearch',
      component: WorkdaySearch
    },
    // 【王云召-产品管理】
    {
      path: '/order/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/order/LoginCard',
      name: 'LoginCard',
      component: LoginCard
    },
    {
      path: '/order/Cardlist',
      name: 'Cardlist',
      component: Cardlist
    },
    {
      path: '/order/TestStart',
      name: 'TestStart',
      component: TestStart
    },
//  {
//    path: '/order/OrderStep2',
//    name: 'OrderStep2',
//    component: OrderStep2
//  },
    {
      path: '/order/City', // 城市
      name: 'City',
      component: City
    },
    {
      path: '/order/osGover', // 机构展开
      name: 'osGover',
      component: osGover
    },
//  {
//    path: '/order/osStation', // 站点展开
//    name: 'osStation',
//    component: osStation
//  },
    {
      path: '/order/dateCheck', // 日期展开
      name: 'dateCheck',
      component: dateCheck
    },
    {
      path: '/order/orderMsg', // 基本信息展开
      name: 'orderMsg',
      component: orderMsg
    },
    {
      path: '/order/osShare', // 分享
      name: 'osShare',
      component: osShare
    },
    {
      path: '/order/cardShare',
      name: 'cardShare',
      component: cardShare
    },
    {
      path: '/order/myOrderRecord/myOrders', // 我的预约记录
      name: 'myOrders',
      component: MyOrders
    },
    {
      path: '/order/myOrderRecord/myOrderInfo', // 预约记录详情
      name: 'myOrderInfo',
      component: MyOrderInfo
    },
    {
      path: '/order/myOrderRecord/cancelOrder', // 取消预约
      name: 'cancelOrder',
      component: CancelOrder
    },
    {
      path: '/order/myReports/myReports', // 我的体检报告
      name: 'myReports',
      component: myReports
    }
  ]
})
