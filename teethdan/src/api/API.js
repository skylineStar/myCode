import {config_param} from './../assets/js/config_param'
import axios from './http'
import config from './config'
import qs from 'qs'

class API {
  // [康燕燕] 微信配置
  wxconfig (param) {//
    config.data.method="mp/signature";
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [康燕燕] 将页面图片保存到本地数据库
  setImg (param) {//
    config.data.method="mp/upload/ecm";
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }

    // [王云召] 用户输入表单号 页面跳转
  indexre (param) {///webApp/insurance/indexre?policyNo=600000510132017060110004138246
    //http://apptest.healthservice.mobile.taikang.com/webApp/insurance/indexre?timestamp=
    //http://apptest.healthservice.mobile.taikang.com/webApp/insurance/indexre?policyNo=600000510132017060110004138246
    config.data.method="indexre";
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    console.log(config.baseURL);
    var url=(config.baseURL).replace('call/','insurance/indexre');
    console.log(url);
    return axios.post(url,{},config);
  }
  
  // [王云召] 城市列表
  ckcity (param) {
    config.data.method="ckcity";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召] 根据条件模糊查询医院列表 
  getOrgListBySolr (param) {//
    config.data.method="getOrgListBySolr";
    param.retrieveArgs.channelType=config.channelType;// 医院列表请求参数添加
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召]  接入乐牙跳转链接 
  toStoreDetailOrOrder (param) {//
    config.data.method="toStoreDetailOrOrder";
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召] 获取一个门店的排班列表
  getDoctorSchedule (param) {
    config.data.method="getDoctorSchedule";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召] 获取一个日排班的分时信息
  getSchedulePartTime (param) {
    config.data.method="getSchedulePartTime";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召] 根据保单号查询客户信息
  getCorePolicyDetail (param) {
    config.data.method="getCorePolicyDetail";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [王云召] 预约
  order (param) {
    config.data.method="order";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
   // [徐瑞瑞] 预约列表
  selectOrder (param) {//
    config.data.method="selectOrder";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [徐瑞瑞] 提交评价
  valuationSave (param) {//
    config.data.method="valuationSave";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
  // [徐瑞瑞] 就诊意见，影像
  fileList (param) {//
    config.data.method="fileList";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
// [徐瑞瑞] 评价查询
  selectValuationByOrderId (param) {
    config.data.method="selectValuationByOrderId";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
// [徐瑞瑞] 取消预约
  cancelOrder (param) {
    config.data.method="cancelOrder";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }	
//[徐瑞瑞] 自动更新
timeoutOrderState (param) {
    config.data.method="timeoutOrderState";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }	
hospitalInCity(param) {//获取地址
    config.data.method="hospitalInCity";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }	
//请求图片地址数组
imgArr (url) {
    return axios.get(url,{},config);
}	
	  // [王昆] 门诊详情
  getHospitalList  (param) {//
    config.data.method="getHospitalList";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
    // [王昆] 评价列表
  selectValuation  (param) {//
    config.data.method="selectValuation";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
    // [王昆] 门诊图片
  getPicture  (param) {//
    config.data.method="getPicture";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
      // [王昆] locationInfo  城市门店查询信息储存接口
  locationInfo  (param) {//
    config.data.method="locationInfo";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
      // [王昆] phoneConsultInfo 电话咨询信息储存接口
  phoneConsultInfo  (param) {//
    config.data.method="phoneConsultInfo";
    param.channelType=config.channelType;
    config.data.custData = param;
    if(config_param.isLog)console.log(param);
    return axios.post(config.url,{},config);
  }
}
export default API;
