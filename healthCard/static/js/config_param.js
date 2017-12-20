/*公共的配置参数文件--方便生产和测试环境的切换kyy20170905*/
var config_param={//测试
	'buy_oauth2':'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx429607bc9b14625f&redirect_uri=http://weixin.taikanglife.com/oauth/redirect%3FeventId=sale&response_type=code&scope=snsapi_base&state=null#wechat_redirect',
	'wx_pay':'http://wxpt-t.taikang.com/bizpay/wxpay.html',
	'base_path':'http://saletest.wx.tkzj.taikang.com',
	'isTest':true,
	'isLog':true
}

var config_param_1={//生产
	'buy_oauth2':'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx429607bc9b14625f&redirect_uri=http://weixin.taikanglife.com/oauth/redirect%3FeventId=sale-t&response_type=code&scope=snsapi_base&state=null#wechat_redirect',
	'wx_pay':'http://wxpt.taikang.com/bizpay/wxpay.html',
	'base_path':'http://app.healthsale.mobile.taikang.com',
	'isTest':false,
	'isLog':false
}
//公共变量的配置环境 上生产时 须将变量 变为生产变量
export {config_param}