<template>
  <div>
  	<div class="compensation">
			<div class="up_tit">相关问卷</div>
			<ul class="cost">
				<li class="cos_in">
					<div class="cos_box">
						<input type="radio" class="name_radio"><span></span>
					</div>
				</li>
				<li class="costin_line clearfix">
					<div class="upload_pic">
						<span class="one_pic">
							<input accept="image/*" type="file" capture="camera" multiple="" class="file_but">
							<input type="button" class="fl_but">
						</span>
					</div>
				</li>
			</ul>
			<input type="button" value="确认" class="claOK">
		</div>
		<div class="pic_fix" style="display:none;">
			<!--<img src="http://msstest.95522.cn/gxmss/insurePicsUp/toPage/choosePics/">-->
			<img src=""/>	
			<button class="del_ico"></button>
		</div>
	</div>
</template>
<script>
import {Toast} from 'mint-ui'
import $ from 'jquery'
import {tkWX} from '../../assets/js/wxConfig.js'
import {changeWXImgURL} from '../../assets/js/BaseJS.js'
import API from '../../api/API'
const api = new API();
export default {
  beforeCreate () {
    document.title = '获取当前地位';//包括 城市 经度 维度
  },
  mounted:function () {
  	tkWX.init({});
		this.optImg();
  	
  },
  methods: {
  	optImg:function(){
  		var t=this;
  		//上传
			$('.upload_pic>.one_pic input:first-child').click(function(e){
				e.preventDefault();
				console.log($(this))
				t.chooseImage($(this),$(this).parent('.one_pic')[0]);
//				t.setImg(null,null,function(sid){//单张上传到本地  test
//					alert(sid);
//  	 		$(rplaceObj).before("<img src='"+changeWXImgURL(localId)+"' fileName='' ecmImgId='"+sid+"'>");
//      });
			});
			
			//大图浏览当前图片
			var currOptImg;
			$('.upload_pic').on('click','img',function(){
				currOptImg=$(this);
				$('.compensation').hide();
				$('.pic_fix img').attr('src',$(this).attr('src'));
				$('.pic_fix').show();
			});
			
			//结束大图浏览
			$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
				$('.pic_fix').hide();
				$('.compensation').show();
			});
			
			//删除当前浏览的选择图片
			$('.pic_fix .del_ico').click(function(){
				currOptImg.remove();
				$('.pic_fix').hide();
				$('.compensation').show();
				$('.pic_fix img').attr('src','');
			});
    },
		chooseImage:function (_this,rplaceObj){//调用微信上传图片并且抓取到服务器
			var t=this;
			alert("method  chooseImage--");
			wx.chooseImage({
					//count: 2, // 默认9
		  		sizeType:['compressed'], //'original', 可以指定是原图还是压缩图，默认二者都有
		  		//sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
		    		if(res.localIds){
							var localIds =res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							var syncUpload = function(localIds,_this,rplaceObj){
								var localId = localIds.pop();
								wx.uploadImage({
			    				    localId: localId,  //需要上传的图片的本地ID，由chooseImage接口获得				    
			    				    isShowProgressTips: 1, //默认为1，显示进度提示				   
			    				    success: function (res) {
			    				    	alert(res.serverId);
												//其他对serverId做处理的代码
		            				if(localIds.length > 0) syncUpload(localIds,_this,rplaceObj);
		    				        var serverId = res.serverId;  //返回图片的服务器端ID	
		    				        t.setImg({"serverId":serverId},null,function(sid){//单张上传到本地
						        	 		$(rplaceObj).before("<img src='"+changeWXImgURL(localId)+"' fileName='' ecmImgId='"+sid+"'>");
		    				        });
							    	}
								});
							};
						syncUpload(localIds,_this,rplaceObj);
		    		}
			    }
			});
		},
		setImg:function (data,fileName,sucFun){
//			alert("setImg: "+data.serverId)
			var param={"uploadImageRequestVoList": 
								[{"module": "common","mpType": "life","name": "","serverId":data.serverId
//      						"RkLfv4Yvy_P2HcRh9cCTqQGZAIyazeqHn1u4SEeNi6V60OY1aTTC956qGcdWfJGu"
    						}]}
			let response = api.setImg(param);
		  	response.then(function(res){
		  		console.log(res);
	        var data=res.data;
	        if(data.status=='1'){
	        	var k=(data.data.uploadImageRequestVoList)[0].key;
	        	console.log(k);
      			if(sucFun)sucFun(k);
	        }else{
	        	Toast(data.message);
	        }
	      })
	      .catch(function(err){
          console.log(err);//Toast("获取签名connect fail!");
      });
		},
    topage:function(){
    	var start=JSON.parse(sessionStorage.getItem('ifGetLocation')).data//||{"lon":"116.407526","lat":"39 90403","addr":"泰康人寿"}
    	alert(JSON.stringify(start));
    	var dest={"eword":"故宫博物馆","epointx":"116.39710","epointy":"39.917200"}
    	var url="http://apis.map.qq.com/tools/routeplan/eword="+
    	dest.eword+"&epointx="+dest.epointx+"&epointy="+dest.epointx+
    	"&sword="+start.addr+"&epointx="+start.lon+"&epointy="+start.lat+
    	"?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B"
    	window.location.href=url
    }
  }
}
</script>
<!--<style scoped src="../../assets/csms.css"></style>-->
<style >
  /*@import '../../assets/css/csms.css'*/ 
</style>
