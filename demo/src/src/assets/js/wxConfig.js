import { Indicator,Toast } from 'mint-ui'
import {BaseJS} from './BaseJS.js'
import API from '../../api/API'
const api = new API();
/**
 * 微信设置
 * @type {Object}
 */
var tkWX = {
    //加载weixinJS
    requeryWXJS: function(cb) {
        if (typeof wx === "undefined") {
            var scriptEle = document.createElement("script");
              scriptEle.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
//          scriptEle.src = "../../../static/js/jweixin-1.2.0.js";
//			scriptEle.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
            document.head.appendChild(scriptEle);
            scriptEle.onload = function() {
            	if (wx) wx.ready(function(){wx.hideOptionMenu();});
                if(cb)cb();
            }
        }else{
    		if(cb)cb();
        }  
    },
    //获取签名
    WXConfigMenu: function(obj) {
    	var url_curr = (window.location.href).split('#')[0];
    	console.log(url_curr)
//  	{"mpType": "life","url": "string"}
	  	let response = api.wxconfig({"url":url_curr});
	  	response.then(function(res){
	  		console.log(res);
	        var data=res.data;
	        if(data.status=='1'){
	        	console.log(data.data);
		        tkWX.WXconfig(data.data, obj);
		        var share=obj.share;
		        if(share)tkWX.WXready(share);
	        }else{
	        	Toast(data.message);
	        }
	      })
	      .catch(function(err){
	          console.log(err);
	          //Toast("获取签名connect fail!");
	      });
    },
    //配置微信接口
    WXconfig: function(wc,obj) {
//  	Toast("配置微信接口======");
		console.log(wc)
//		alert('WXconfig 配置微信接口');
        wx.config({
            debug:false,//'true', false
            appId: wc.appId, 
            timestamp: wc.timestamp,
            nonceStr:  wc.nonceStr ,
            signature: wc.signature ,
            jsApiList: [
	            'checkJsApi','chooseImage','uploadImage',
				'onMenuShareTimeline','onMenuShareAppMessage'
//				'hideAllNonBaseMenuItem','hideMenuItems',''
	        ]
        });
    },
    WXready: function(obj) {
        wx.ready(function() {
            wx.showOptionMenu();
			wx.hideMenuItems({
				menuList : [ 'menuItem:share:QZone', 'menuItem:share:qq',
						'menuItem:copyUrl', 'menuItem:favorite',
						'menuItem:openWithQQBrowser',
						"menuItem:share:email"]
			});
			wx.onMenuShareAppMessage({
				title : obj.title,
				desc : obj.desc,
				link : obj.shareURL,
				imgUrl : obj.shareImageURL
			});
			wx.onMenuShareTimeline({
				title : obj.desc,
				link : obj.shareURL,
				imgUrl : obj.shareImageURL
			});
		});
	},
    //微信接口准备完毕执行--地理位置
    WXreadyLocation: function(obj, cb) {
        wx.ready(function() {
            wx.showOptionMenu();
			wx.hideMenuItems({
				menuList : [ 'menuItem:share:QZone', 'menuItem:share:qq',
//						'menuItem:copyUrl', 
						'menuItem:favorite',
						'menuItem:openWithQQBrowser',
						"menuItem:share:email"],
			});
        	alert("=======================地理位置========================");
            wx.getLocation({
			  type:'wgs84',//默认为wgs84的gps坐标，//如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			  success:function(res){
			    var latitude=res.latitude;
			    var longitude=res.longitude;
			    var speed=res.speed;
			    var accuracy=res.accuracy;
			    alert('经度：'+latitude+'，纬度：'+longitude);
			  }
			});
        })
    },
    chooseimg: function(cb) { //微信选择图片，
        wx.ready(function() {
            /*调用接口*/
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original'], // 'original', 'compressed'可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    var b = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
            });
        })

    },
    uploadimg: function(locimgs, cb) { //微信选择图片，
        var loc = locimgs;
        var serverId = [];
        wx.ready(function() {
            var i = 0,
                length = loc.length;
            function upload() {
                wx.uploadImage({
                    localId: loc[i],
                    success: function(res) {
                        i++;
                        serverId.push(res.serverId);
                        if (i < length) {
                            upload();
                        } else {
                            if (BaseJS.isFunc(cb)) {
                                cb(serverId);
                            } else {
                                return;
                            }
                        }
                    },
                    fail: function(res) {
                    }
                });
            }
            upload();
        })
    },
    hideOptionMenu: function() {
        wx.hideOptionMenu();
    },
    // 8.7 关闭当前窗口
    closeWindow: function() {
        wx.closeWindow();
    },
    init: function(obj) {
	    tkWX.requeryWXJS(function(){
	    	console.log(obj);
//	    	if(obj&&obj.share)
	    	tkWX.WXConfigMenu(obj)
//	    	if(obj.share)
	    })
    }
}


export {tkWX,chooseImage}