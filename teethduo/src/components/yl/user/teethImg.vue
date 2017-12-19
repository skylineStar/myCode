<!--xurr
	泰康养老内容：口腔全景图展示
-->
<template>
	<div class="teethImg">
		<div class="others">
			<p class="order_line"></p>
			<div class="teethim_context">
				<p class="teethim_txt">口腔全景图</p>
				<div class="teethim_img">
					<!--<img :src='"http://msstest.95522.cn/gxmss/insurePicsUp/toPage/choosePics/"+teethId' alt="" />-->
					<!--<img class="otherimg" src="../../../assets/images/user/noimg.png">-->
					<img class="noimg" src="../../../assets/images/user/noimg.png" alt="" />
				</div>
			</div>
			<p class="order_line"></p>
			<p class='give_up'>你已放弃口腔全景照片拍摄</p>
		</div>
		<!--<div class="pic_fix" style="display:none;" @click='hide_this($event)'>-->
		<div class="pic_fix" style="display:none;">
			<div class="chahead"><!--右上角小关闭-->
				<div class="cha">
				</div>
			</div>
			<img src="" class="img"/>	
			
		</div>
	</div> 
</template>

<script>
	import $ from 'jquery';
	import {getUrl} from '../../../assets/js/BaseJS.js';
	import API from '../../../api/API';
	import config from '../../../api/config.js';
	import { config_param } from '../../../assets/js/config_param';
	import { Toast } from 'mint-ui';
	const api =new API();
	export default {
		data () {
			return{
				teethMsg:{},
				orderId:'',
				teethId:'',
				keyId:'',  
				urlImg:'',//图片地址z
//				remark:'',
				big:''
			}
		},
		beforeCreate () {document.title = '口腔全景图'},
		beforeRouteLeave:(to, from, next) => {
		    if(sessionStorage.getItem('back_ticketURI')){//返回卡券标记
		      	var pic = $('.pic_fix').css("display");
		    	if(pic!='none'){//关闭弹出层 &&diswrap=='block'
					$('.pic_fix').hide();
					$('.others').show();
					next(false);
					sessionStorage.setItem('back_ticketURI','0');
				}else{
			            next();
				}
		    }else{
		        next();
		    }
	    },
		mounted () {
			this.teethLoading();
			this.optImg();
	    },
	    methods: {
	    	teethLoading:function(){
	    		var that = this;
	    		var orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	    		that.orderId = orderInfo.orderId;
	    		var remark = orderInfo.remark;
	    		var uploadFlag = orderInfo.uploadFlag;
				var param = {
					"orderId":that.orderId //截取URL中的orderId
				}
				var parResult = api.fileList(param);
				parResult.then(function(res){
					var data = res.data;
					if(data.status=="1"){
						that.teethMsg = data.tpflrvList;
						if(uploadFlag==0){
							$(".noimg").css("display","block");
						}else if(uploadFlag==1){
							$(".noimg").css("display","none");
							for(var j=0;j<that.teethMsg.length;j++){
								var abc = that.teethMsg[j];
								that.teethId = abc.fileId;
								that.urlImg = config_param.base_path+'/webApp/ecm/taiYiYun/'+that.teethId;
								var arrImg = api.imgArr(that.urlImg);
								arrImg.then(function(res){
									var teethimg = "";
									var datas = res.data;
									for(var k=0;k<datas.length;k++){
										teethimg+="<img class='otherimg' src='"+that.urlImg+'/'+datas[k]+"' />"
									}
									setTimeout(function(){$(".teethim_img").append(teethimg)},30)
								})
							}
							
						}else if(uploadFlag==2){
							$(".noimg").css("display","block");
							$(".give_up").show();
						}
					}else{
						$(".noimg").css("display","block");
						Toast (data.message);
					}
				})
			
			},
			optImg:function(){
		  		var t=this;
				//大图浏览当前图片
				var currOptImg;
				$('.others').on('click','.teethim_context .otherimg',function(){//
//					t.big = true;
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
					currOptImg=$(this);
					$('.others').hide();
					$('.pic_fix img').attr('src',$(this).attr('src'));
					$('.pic_fix').show();
				});
				//结束大图浏览
//				$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
////					t.big = false;
//					$('.pic_fix').hide();
//					$('.others').show();
//				});
				$('.chahead').click(function(){
					$('.pic_fix').hide();
					$('.others').show();
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");  		

				});
				
	    	},
	    	/*hide_this:function(event){
	    		event.cancelBubble = true; 
	    		alert('11')
	    		var t=this;//event.currentTarget
	    		//alert(event.path[0]);
	    		alert(event.currentTarget);
	    		console.log(event.currentTarget);
	    		
	    		var isImg=$(event.currentTarget).hasClass('otherimg');
	    		alert(isImg);
	    		alert($(event.currentTarget).parent('.pic_fix').length);
	    		if(isImg){
	    			
	    		}else{
//	    			history.go('-1');
					t.big = false;
					$('.pic_fix').hide();
					$('.others').show();
	    		}
	    	}*/
			
	    }
	}
</script>

<style>
	@import '../../../assets/css/yl/orderPro.css'
</style>