/*公共的配置参数文件--方便生产和测试环境的切换 kyy*/
var config_param={//测试healthservice
  'base_path':'http://apptest.healthservice.mobile.taikang.com',
  'isTest':true,
  'isLog':true,
  //入口页面 统一的返回页面地址，正式环境应该换成微保卡券入口地址
  'ticketURI':'http://apptest.healthservice.mobile.taikang.com/webApp/#/order/toPage'
}
var config_param_3={//本地测试
'base_path':'http://localhost:8090',
//'base_path':'http://127.0.0.1:8082',
//  'base_path':'http://172.24.245.1:8082',
  'isTest':true,
  'isLog':true,
  'ticketURI':'http://localhost:8090/webApp/#/order/toPage'
}

var config_param_1={//生产
  'base_path':'http://app.healthservice.mobile.taikang.com',
  'isTest':false,
  'isLog':false,
  'ticketURI':'http://app.healthservice.mobile.taikang.com/webApp/#/order/toPage'
}

var config_param_2={//测试mhc
	'base_path':'https://app-t.mhc.mobile.taikang.com',//20171211 修改mhc访问链接
//'base_path':'http://apptest.mhc.mobile.taikang.com',
  'isTest':true,
  'isLog':true,
  'ticketURI':'http://apptest.mhc.mobile.taikang.com/webApp/#/order/toPage'
}
//公共变量的配置环境 上生产时 须将变量 变为生产变量
export {config_param}
//http://apptest.healthservice.mobile.taikang.com/webApp/#/order/checkStation