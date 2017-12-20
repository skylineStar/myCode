import { Indicator,Toast } from 'mint-ui'
import {config_param} from './config_param.js'
import {BaseJS,oauth2_url,getUrl} from './BaseJS.js'
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
            //scriptEle.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
            scriptEle.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
            document.head.appendChild(scriptEle);
            scriptEle.onload = function() {
            	wx.ready(function(){wx.hideOptionMenu();});
                if(cb)cb();
            }
        }else{
    		if(cb)cb();
        }  
    },
    //获取签名
    WXConfigMenu: function(obj) {
    	var url_curr = window.location.href;
	  	let response = api.wxconfig({"url":url_curr.split('?')[0]});
	  	response.then(function(res){
	        var data=res.data;
	        if(data.state=='1'){
	        	console.log(data);
		        tkWX.WXconfig(data, obj);
		        var share=obj.share;
		        console.log(share);
		        tkWX.WXready(share);
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
        wx.config({
            debug: false,//'true',
            appId: wc.appId, 
            timestamp: wc.timestamp,
            nonceStr:  wc.noncestr ,
            signature: wc.signature ,
            jsApiList: [
//	            'checkJsApi','chooseImage','uploadImage',
				'onMenuShareTimeline','onMenuShareAppMessage',
				'hideAllNonBaseMenuItem','hideMenuItems'
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
						"menuItem:share:email"
						]
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
						"menuItem:share:email"]
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
	    	if(obj&&obj.share)tkWX.WXConfigMenu(obj)
//	    	if(obj.share)
	    })
    }
}
var share_seed=function(seed_info){
	var curr_href=window.location.href;
	if(curr_href.indexOf('meal')==-1&&curr_href.indexOf('runDevPage')==-1)return;//当前只允许 购买模块 和首页转发
	//if(curr_href.indexOf('buyNow')!=-1)return;
	var seed_info=seed_info||JSON.parse(sessionStorage.getItem('seed_info'));
	if(!seed_info&&curr_href.indexOf('seedId')!=-1){//首次进入 打开种子初始页面
		var cur_link=curr_href.split('&openid')[0]
//		if(cur_link.indexOf('localhost')!=-1){//本地测试 容错处理
//			cur_link=cur_link.replace('http://localhost:8080/',config_param.base_path)
//			cur_link=cur_link.split('&openid')[0]
//		}
		var seed_url=oauth2_url(cur_link,config_param.isTest);//.replace(/^\s+|\s+$/g, '');
		var seed_info={"seedId":getUrl(cur_link).seedId,'seed_url':seed_url,'img_url':config_param.base_path+'/static/img/share_seed.png'}
		sessionStorage.setItem('seed_info',JSON.stringify(seed_info));
	}
	if(!seed_info)return;//由于非正常跳转，导致转发参数无法获得的容错处理
  	console.log('seed_info-------')
	console.log(seed_info)
  	var obj = {
    	share:{
      		title:'四折领取体检卡，速来！',
      		desc: "我们不是来推销体检的，我们只是好福利的搬运工",
//    		desc: "种子编码："+seed_info.seedId+"别怕，我们不是来推销体检的，我们只是好福利的搬运工",
      		//shareURL :seed_info.seed_url,
      		shareURL :config_param.base_path+'/#/common/common_share?shareUri='+encodeURIComponent(seed_info.seed_url),
      		shareImageURL : seed_info.img_url
      	}
  	}
  	tkWX.init(obj);
}
share_seed();
export {tkWX,share_seed}