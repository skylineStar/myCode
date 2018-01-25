import Qs from 'qs'
import {config_param} from '../assets/js/config_param'
import {getUrl} from '../assets/js/BaseJS.js'
var channelType=sessionStorage.getItem('channelType');
if(!channelType){
	var link=window.location.href;
	var parseUrl = getUrl(link);
	channelType=parseUrl.channelType
	if(channelType)sessionStorage.setItem('channelType',channelType)
}

export default{
	channelType:channelType,
	  url: '',  
	  baseURL: config_param.base_path+'/webApp/call/',//测试域名
	  method:'POST',
	  transformResponse: [function (data) {
	      return data
	  }],
	  headers: {'Content-Type':'application/json'},
	  params: {
	  	timestamp:''
	  },
	  paramsSerializer: function(params) {
	    return Qs.stringify(params)
	  },
	data: {
		openid:"",
		group:"",
		method:'',
		custData:{}
	},
	//timeout: 5000,
	withCredentials: false, // default
	responseType: 'json', // default
	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	maxContentLength: 10000,
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	},
	maxRedirects: 5 // default
}
