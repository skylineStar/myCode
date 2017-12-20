import axios from './http'
import config from './config'
import qs from 'qs'

// axios(config);
class API {
	// [康燕燕] 用户管理--首页
	homePageRecordCount (param) {//
		console.log(config.data)
		config.data.method="homePageRecordCount";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [康燕燕] 微信配置
	wxconfig (param) {//
		config.data.method="wx/config/";
		config.data.custData = param;
		console.log(param);
		return axios.post(config.url,{},config);
	}
	// [康燕燕] 卡密登陆
	activateTJCard (param) {
		config.data.method="activateTJCard";
		config.data.custData = param;
		console.log(config)
		return axios.post(config.url,{},config);
	}
  	// [吴昊泉] 购买页面初始化
	byitPageInit (param) {
		config.data.method="customerlogin";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
    // [吴昊泉] 发票
	invoicesQuery (param) {
		config.data.method="comtjinvoice";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 立即购买 verityCode
	byitNow (param) {
		config.data.method="byCombo";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 发票
	verityCode (param) {
		config.data.method="comtjinvoice";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 我的预约记录
	queryMyOrdersList (param) {
		config.data.method="appointmentRecordByCustomerId";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 我的预约记录
	queryOrderInfoBaseDate (param) {
		config.data.method="setReadRecordByOrderId";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 工作日查询/套餐查询  通过城市查中心center
	fromCitySearchCenter (param) {
		config.data.method="queryAllMedicalCenterByCity";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 工作日查询，query站点信息之前先请求“第三方套餐编码” 
	queryThirdNo (param) {
		config.data.method="getOrgComboDetail";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 工作日查询，query站点信息  
	queryStationList (param) {
		config.data.method="queryMedicalCenterListByOrg";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 我的预约记录- 取消预约记录 
	cancelAppointment (param) {
		config.data.method="cancelAppointmentRecord";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 获取验证码
	getYZcode (param) {
		config.data.method="getValidCode";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 校验验证码
	checkYZcode (param) {
		config.data.method="toTestValidCode";
		config.data.custData = param;
		return axios.post(config.url,{},config);
	}
	// [吴昊泉] 查站点时间 queryStationTime
	queryStationTime (param) {
        config.data.method="queryDateByMedicalCenter";
        config.data.custData = param;
        return axios.post(config.url,{},config);
	}
	// [王昆] 成为会员
	isvip (param) {
        config.data.method="isvip";
        config.data.custData = param;
        return axios.post(config.url,{},config);
	}
	//===wangyz
	myCardHealthExamination (param) {
    config.data.method="myCardHealthExamination";
    config.data.custData = param;
    return axios.post(config.url,{},config);
  }
	queryOrgListByCity (param) {
	  config.data.method="queryOrgListByCity";
    config.data.custData = param;
    return axios.post(config.url,{},config);
	}
	getOrgComboDetail (param) { //套餐详情
	  config.data.method="getOrgComboDetail";
    config.data.custData = param;
    return axios.post(config.url,{},config);
	}
	queryMedicalCenterListByOrg (param) { //城市所对应体检中心接口
	    config.data.method="queryMedicalCenterListByOrg";
	    config.data.custData = param;
	    return axios.post(config.url,{},config);
	}
   	queryDateByMedicalCenter (param) { //体检时间接口
    config.data.method="queryDateByMedicalCenter";
    config.data.custData = param;
    return axios.post(config.url,{},config);
  }
  submitAppointmentBaseInfo (param) { //提交预约接口
    config.data.method="submitAppointmentBaseInfo";
    config.data.custData = param;
    return axios.post(config.url,{},config);
  }
	getStateByOrderid (param) { // 我的体检报告列表
    config.data.method="getStateByOrderid";
    config.data.custData = param;
    return axios.post(config.url,{},config);
  }
	// 短信分享
	shareCard (param) { 
	  config.data.method="shareCard";
	config.data.custData = param;
	return axios.post(config.url,{},config);
	}
	// 读取体检报告
	myMedicalRecord (param) {
	  config.data.method="myMedicalRecord";
    config.data.custData = param;
    return axios.post(config.url,{},config);
	}
}
export default API;
