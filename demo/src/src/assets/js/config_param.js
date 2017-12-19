/*公共的配置参数文件--方便生产和测试环境的切换 kyy*/
var config_param={//测试
	'base_path':'http://apptest.healthservice.mobile.taikang.com',
	'isTest':true,
	'isLog':true
}
var config_param_2={//本地测试
	'base_path':'http://localhost:8090',
	'isTest':true,
	'isLog':true
}

var config_param_1={//生产
	'base_path':'http://app.healthservice.mobile.taikang.com',
	'isTest':false,
	'isLog':false
}
//公共变量的配置环境 上生产时 须将变量 变为生产变量
export {config_param}
//http://apptest.healthservice.mobile.taikang.com/webApp/#/order/checkStation