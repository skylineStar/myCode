var getWXUserInfo = function () {
  var isTest = false // 测试为true 生产为false
  if (isTest) {
     // 测试环境
    var appid = 'wxdbbe2c84a6e68304'// wx90b252e89d5742e3'' 家园app  生产
    var redirect_uri = ' http:// wxpt-t.taikang.com'
  } else {
    // 生产环境
    var appid = 'wx2f763d09aa9ca523'
    var redirect_uri = ' http:// wxpt.taikang.com'
  }

  var baseUrl = new Base64()
//管理中心  链接
//http://saletest.wx.tkzj.taikang.com/#/order/UserManage
//卡券列表 图片
//http://saletest.wx.tkzj.taikang.com/#/order/Cardlist
//预约列表图片
//http://saletest.wx.tkzj.taikang.com/#/order/myOrderRecord/myOrders
//体检报告列表 图片
//http://saletest.wx.tkzj.taikang.com/#/order/myReports/myReports

// 	var crruir = 'http://saletest.wx.tkzj.taikang.com/#/home'//
// 	var crruir = 'http://saletest.wx.tkzj.taikang.com/#/order/UserManage';
//var crruir = 'http://saletest.wx.tkzj.taikang.com/#/order/Cardlist';
//var crruir = 'http://saletest.wx.tkzj.taikang.com/#/order/myOrderRecord/myOrders';
///
//http://localhost:8082/#/order/UserManage?openid=ovyq3jiKQ-y6pMCdENk6ektI0jM4

//var crruir = 'http://saletest.wx.tkzj.taikang.com/#/order/myReports/myReports';
var curr_url=getUrl(window.location.href);
var crruir = 'http://app.healthsale.mobile.taikang.com/#/runDevPage?';

// 		var crruir = 'http://saletest.wx.tkzj.taikang.com/activity/pages/guide.html?homeId=101041485';//活动开始引导页
// 		var crruir = 'http://saletest.wx.tkzj.taikang.com/activity/pages/acover.html?homeId=101041485';//参加活动人员-活动 结束
  var newlink = baseUrl.encode(crruir)
//console.log(newlink)

  var isInfor = false  // 两种授权方式：false 只获取用户的openid  true  获取用户的基本信息 头像和微信号
  if (!isInfor) {
    // 静默授权获取用户的openid
    var fLink = ' https:// open.weixin.qq.com/connect/oauth2/authorize?appid =' + appid + '&redirect_uri = ' + redirect_uri + '/tkmap/wechat/oauth2/redirect/' + appid + '?other = ' + newlink + '&response_type = code&scope = snsapi_base&state=redict&connect_redirect=1#wechat_redirect'
  } else {
    // 公众号授权获取用户的基本信息（昵称 头像 地址 时间）
    var fLink = ' https:// open.weixin.qq.com/connect/oauth2/authorize?appid =' + appid + '&redirect_uri = ' + redirect_uri + '/tkmap/wechat/oauth2/redirectuser/' + appid + '?other = ' + newlink + '&response_type = code&scope = snsapi_userinfo&state=redict&connect_redirect=1#wechat_redirect'
  }
  console.log(fLink)
  return fLink
}

function Base64 () {
//  private property
  var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

//  public method for encoding
  this.encode = function (input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = _utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  }

//  public method for decoding
  this.decode = function (input) {
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = _utf8_decode(output)
    return output
  }

//  private method for UTF-8 encoding
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }

    }
    return utftext
  }

//  private method for UTF-8 decoding
  var _utf8_decode = function (utftext) {
    var string = ''
    var i = 0
    var c2, c3
    var c = c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}

function getUrl (linkUrl) {
	var linkUrl=linkUrl||getWXUserInfo();
  //var linkUrl="http://fansuat.serve.wx.taikang.com/hall_t/page/fans_hall.html?openid=ovyq3jtM6BA0N8Ib8ccU4kC3NRu4&userInfo=%7B%22city%22%3A%22%E6%B5%B7%E6%B7%80%22%2C%22country%22%3A%22%E4%B8%AD%E5%9B%BD%22%2C%22headImgUrl%22%3A%22http%3A%2F%2Fwx.qlogo.cn%2Fmmopen%2Fj2jGFibq7N67XaB4F5J7YCEsWExsOTGQXadNt6wNdRmkulbeDeerXvw1Picz7bZDqEfYDDq1LcEtIvF2W7VsQIfc6LMYcr8lOI%2F0%22%2C%22nickName%22%3A%22%E6%91%86%E6%B8%A1%E4%BA%BA%22%2C%22openId%22%3A%22ovyq3jtM6BA0N8Ib8ccU4kC3NRu4%22%2C%22province%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22sex%22%3A%221%22%2C%22unionId%22%3A%22oKS-Rt9WVm4JBPrgj-GB82wrAHng%22%7D"
  var str, arr, newArr, num, num2, i, j, newJson
  if (true) {
    str = decodeURIComponent (linkUrl.split('?')[1])
    arr = str.split('&')
    num = arr.length
    newJson = {}
    for (i = 0; i < num; i++) {
      newArr = arr[i].split('=')
      num2 = newArr.length
      newJson[newArr[0]] = newArr[1]
    }
    return newJson
  } else  return {}
}

/**
 * 在微信上隐藏地址 方法1隐藏
 */
var hideaddress = function (){
  //console.log("====");
  if (typeof WeixinJSBridge == "undefined"){
    console.log("==undefined==");
    if( document.addEventListener ){
         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }else{
    console.log("==else==");
    onBridgeReady();
  }
}()
var onBridgeReady = function (){
  //console.log("==hideOptionMenu==");
   WeixinJSBridge.call('hideOptionMenu');
}

/**
 * 在微信上显示地址  方法1显示
 */
var showaddress = function (){
  //console.log("==show==");
  if (typeof WeixinJSBridge == "undefined"){
    //console.log("==undefined==");
    if( document.addEventListener ){
         document.addEventListener('WeixinJSBridgeReady', showBridgeReady, false);
    }else if (document.attachEvent){
         document.attachEvent('WeixinJSBridgeReady', showBridgeReady); 
         document.attachEvent('onWeixinJSBridgeReady', showBridgeReady);
    }
  }else{
    //console.log("==else==");
    showBridgeReady();
  }
}
var showBridgeReady =  function (){
  //console.log("==showOptionMenu==");
   WeixinJSBridge.call('showOptionMenu');
}


export {getUrl,hideaddress,showaddress}
