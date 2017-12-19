<!--xurr
	微保内容：查看预约状态，此页可操作是否取消预约
-->
<template>
	<!--提交预约-->
	<div class="orderDetail">
		<div class="order_progress" >
			<div class="order1">
				<img src="../../assets/images/user/order1.png" alt="" v-if="orderMsg.orderState==0" />
				<img src="../../assets/images/user/order2.png" alt="" v-if="orderMsg.orderState==4" />
			</div>
			<div class="order_txt">
				<span class="order_txt1">提交申请</span>
				<span class="order_txt2">预约成功</span>
				<span class="order_txt3">已完成</span>
			</div>
		</div>
		<mt-popup v-model="isordert" position="middle" class='popmodal' :closeOnClickModal=false>  <!--非工作时间从提交订单处进入时提示-->
		    <div class='call-box1'>
		        <div class="call-title1">温馨提示</div>
		        <div class="call-text1">你在非工作时间申请预约，诊所将于下一个工作日完成处理</div>
		        <div class="call-btn1">
		          	我知道了
		        </div>
		    </div>
    	</mt-popup>
    	<!--<div @click='closepop' class="wbpop_modal" v-if='isordert' style="z-index: 1001;"></div>-->
		<div class="order_warn order_warnp" v-if="orderMsg.orderState==0&&!isDoTime">
			<img class="vtime" src="../../assets/images/user/ordert_icons1.png" alt="" />
			<p class="out_time">你在非工作时间申请预约，诊所将于下一个工作日完成处理</p>
		</div>
		<div class="order_warn" v-if="orderMsg.orderState==0&&isDoTime">
			<img src="../../assets/images/user/order_icons1.png" alt="" />
			<p >已提交预约申请，需要等待30分钟审核时间</p>
		</div>
		<div class="order_warn warn_content" v-if="orderMsg.orderState==4">
			<img src="../../assets/images/user/order_icons1.png" alt="" />
			<p class="orw_succ">预约成功,请按时携带身份证前往门诊使用服务</p>
			<p class="order_add">逾期将视为自动放弃本服务</p>
		</div>
		<p class="order_line"></p>
		<div class="order_body">
			<div class="b_orname">
				<img src="../../assets/images/user/icon_service.png" alt="" />
				<p class="ad_name">{{objKey}}</p>
			</div>
			<div class="b_address">
				<img src="../../assets/images/user/order_icons2.png" alt="" />
				<p class="ad_name">{{orderMsg.orgName}}</p>
				<p class="ad_txt">{{orderMsg.orgAddress}}</p>
			</div>
			<div class="b_date">
				<img src="../../assets/images/user/order_icons3.png" alt="" />
				<p class="date_txt"> {{orendate}} 
					<span v-if='orderMsg.endTime' >{{orderMsg.beginTime+'-'+orderMsg.endTime}}</span>
					<span v-else='orderMsg.endTime' >{{orderMsg.beginTime}}</span>
				</p>
			</div>
			<div class="b_name">
				<img src="../../assets/images/user/order_icons4.png" alt="" />
				<p class="name_txt">{{orderMsg.name}}</p>
			</div>
		</div>
		<div class="order_banner">
			<a :href="phone" class="or_tap1" v-if="this.phones.length<=1">
				<img src="../../assets/images/user/order_icons5.png" alt="" />
				客服电话 
			</a>
			<a @click="telphone" class="or_tap1" v-else><!--多个电话时展示-->
				<img src="../../assets/images/user/order_icons5.png" alt="" />
				客服电话 
			</a>
			<a class="or_tap2" @click="toPage()">
				<img src="../../assets/images/user/order_icons6.png" alt="" />
				门诊导航
			</a>
			 <mt-popup v-model="istel" position="bottom" v-if="this.phones.length>1" :closeOnClickModal=false><!--多个电话时展示-->
				<div class="telmodal">
				</div>
			</mt-popup>
			<p><img src="../../assets/images/user/lines.png" class="fenge"></img></p>
		</div> 
		<p class="order_line"></p>
		<div class="order_num">
			<span>预约编号</span>
			<span class="orderid">{{orderMsg.tradeNo}}</span>
		</div>
		<div>
		</div>
			<div class="footeror">
				<div class="order_btn" @click="orderClick()" v-show="orderMsg.orderState==0||ifshow">
					<div class="orclick">
						<img src="../../assets/images/user/cansel.png" alt=""/>
						<span class="spanmar">取消预约</span>
					</div>
				</div>
				<p class="order_footer">就诊当日0:00起不支持取消预约</p>
			</div>
		<!--<p class="order_footer">就诊前一天20点之后不支持线上取消,你可拨打客服电话修改时间</p>-->
	</div>
</template>

<script>
	import $ from 'jquery';
	import {tkWX} from '../../assets/js/wxConfig.js'
	import { getUrl,GetDateDiff,requeryUsJS } from '../../assets/js/BaseJS.js';
	import { MessageBox,Toast,Popup,Indicator } from 'mint-ui';
	import { getPosition } from '../../assets/js/getLocation.js';
	import {config_param} from '../../assets/js/config_param.js';
	import API from '../../api/API';
	const api =new API();
	export default {
		data () {
			return{
				orderMsg:{},//预约信息查询
				localData:{}, //定位信息对象
				phone:"",//机构手机号
				orderId:"",
				policyNo:'',//保单号
				endTime:'',//结束时间
				inTime:'',
				back_f:true,//物理返回
				orendate:'',
				orgid:'',//机构id，hospitalId
				shengname:'',//城市名
				lon:'',//经度
				lat:'',//weidu
				phones:'',//客服电话
				enddate:'',//结束时间
				locatimes:'',//本地时间
				ordertime:'',//预约时间
				istel:false,
				isTime:'',
				isDoTime:'',
				isordert:false,
				source:'',
				objKey:'',
				userId:'',
				clo:'',
				ifshow:''
				
			}
		},
		beforeCreate () {document.title = '齿科预约';sessionStorage.setItem('back_ticketURI','1');},
		beforeRouteLeave:(to, from, next) => {
	      	 var back_ticketURI=sessionStorage.getItem('back_ticketURI');
	      	 var toMap=sessionStorage.getItem('toMap')||"";
	      	 if(toMap)toMap=JSON.parse(toMap);
//	      	 alert("toMap"+toMap+"---back_ticketURI:"+back_ticketURI);
		    if(back_ticketURI){//返回卡券标记
		    	var clo,dis;
		      	$('.mint-msgbox-wrapper')?clo = $('.mint-msgbox-wrapper').length:"";
				$(".mint-msgbox")? dis=$(".mint-msgbox").css("display"):"";
		    	if(dis=='block'&&clo=='1'){//关闭弹出层 &&diswrap=='block'
					$('.v-modal,.mint-msgbox').hide();
					next(false);
					return;
				}else{
					back_ticketURI = JSON.parse(back_ticketURI);
			        if(back_ticketURI=='1'||(back_ticketURI=='0'&&toMap=='1')){//返回卡券
			            next(false);
//			            if(back_ticketURI=='1')sessionStorage.setItem('back_ticketURI','0');
//						wx.ready(function() {WeixinJSBridge.call('closeWindow');}
						//小程序关闭
						WeixinJSBridge.invoke('invokeMiniProgramAPI', {
		                    name: 'navigateBack',
		                    arg: {}
		                });
						tkWX.closeWindow();
			        }else{
			            next();
			        }
				}
		    }else{
		        next();
		    }
	    },
		
		mounted () {
			this.onLoading();//接口交互
			//this.location();
			var _this=this;
			tkWX.init({});
//			setInterval(function(){/***每1分钟发生一次请求 **/
////				console.log(_this.timeOut)
//				_this.timeOut();
//			},60000);		
		},
		methods: {
			location:function(){ 
			  	// 定位信息 
		    	var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
		    	if(qqlocation&&qqlocation.yesOrNo==1){
		    		var t=qqlocation.time;
			      	var outtime=new Date().getTime()-t>600000?true:false; //数据缓存10分钟  10*60*1000 1800000
			      	if(outtime){
			  				sessionStorage.removeItem('ifGetLocation');
			      	}else{
			      		 this.localData = JSON.parse(sessionStorage.getItem('ifGetLocation')).data
//							return;
			      	}
		    	}
	      		var _this = this;
			    var ifGetLocation = {}; 
			   	requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',function(){
			        getPosition(
				       	function(data){
				            if(config_param.isLog)console.log("------------成功--------------");
				              _this.localData = data;
				           ifGetLocation={"yesOrNo":1,"data1":data,"time":new Date().getTime()}
				           sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
				        },
				        function(){
				           if(config_param.isLog)console.log("-----定位失败-----");
				          sessionStorage.setItem('ifGetLocation',JSON.stringify({"YoN":2}));
				        }
			        )
			    })
		    },
			toPage:function(){
				var start={"lon":this.lon,"lat":this.lat,"addr":""};
		    	var dest={"eword":this.orderMsg.orgName,"epointx":this.lon,"epointy":this.lat,'address':this.orderMsg.orgAddress}//机构地址
			    var url = "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(dest.address) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
			    sessionStorage.setItem('back_ticketURI','0');
			    var u = navigator.userAgent;
		      	if (u.indexOf('iPhone') > -1) {//苹果手机
			    	sessionStorage.setItem('toMap','1');
			    	window.location.href=url
			    }else{
			    	sessionStorage.setItem('mapRouter',JSON.stringify({'toMap':'1','toMapURI':url,'title':'齿科预约','backURI':window.location.href}));
				    window.location.href='#/common/toMapEmpty';
			    }
			},
			timeOut:function(){
				var that = this;
				var link=window.location.href;
				var parseUrl = getUrl(link);
				that.orderId = parseUrl.orderId;//||'15785';
				this.policyNo = parseUrl.policyNo;
				var channel = parseUrl.channelType;
				var cpnTicketNo = parseUrl.cpnTicketNo;
				var userId = parseUrl.userId;
				var param = {
				  "orderId":that.orderId,//截取URL
				  "channelType":channel
				}
				var parResult = api.timeoutOrderState(param);
				parResult.then(function(res){
					var orderState = res.data.data.orderState;
					if(res.data.status=="1"){
						if(orderState == that.omstate){
							return;
						}else{
							that.onLoading(); 
						}
					}else{
						Toast (data.message);
					}
				})
			},
			onLoading:function(){
				var that = this;
				var link=window.location.href;
				var parseUrl = getUrl(link);
				that.orderId = parseUrl.orderId;
				this.policyNo = parseUrl.policyNo;
				var channel = parseUrl.channelType;
				var cpnTicketNo = parseUrl.cpnTicketNo;
				var wesurePolicyNo = parseUrl.wesurePolicyNo;
				that.isTime = JSON.parse(sessionStorage.getItem("isOrder"));
				var param = {
				  "orderId":that.orderId,//截取URL
				  "channelType":channel
				}
				var parResult = api.selectOrder(param);
				parResult.then(function(res){
					var data = res.data;
					if(data.status=="1"){
						that.orderMsg = data.data;
						that.orgid = that.orderMsg.orgId
						that.userId = that.orderMsg.userId;
						that.userId?that.userId:that.userId = parseUrl.userId;
						that.source = that.orderMsg.serviceType;//预约时的服务
//						that.source = '7'
						that.isDoTime = that.orderMsg.isDoBusinessTime
						var omstate = that.orderMsg.orderState;
						if(omstate=="4"){//已确认预约
							$(".order_txt1").addClass("orders");
							$(".order_txt2").addClass("orders");
						}else if(omstate=="0"){//已提交申请
							$(".order_txt1").addClass("orders");
						}else if(omstate=="3"||omstate=="1"){//已完成
							sessionStorage.setItem('back_ticketURI','0');
							window.location.href='#/user/evalFill?orderId='+that.orderId+'&policyNo='+that.policyNo+'&channelType='+channel+'&cpnTicketNo='+cpnTicketNo+'&userId='+that.userId
						}else if(omstate=="5"){//已爽约
							sessionStorage.setItem('back_ticketURI','0');
							window.location.href='#/user/unorder?orderId='+that.orderId
						}else if(omstate=="2"){//已取消预约
							sessionStorage.setItem('back_ticketURI','0');
							window.location.href='#/order/toOrder?orderId='+that.orderId+'&policyNo='+that.policyNo+'&channelType='+channel+'&cpnTicketNo='+cpnTicketNo+'&wesurePolicyNo='+wesurePolicyNo
						}
						that.endTime = that.orderMsg.encounterDate+" "+that.orderMsg.beginTime+":00";
						that.enddate = that.orderMsg.encounterDate;
						var phone=that.orderMsg.contactTel;
						that.phones = phone.split(",");
						that.phones.length<=1?that.phone="tel:"+that.orderMsg.contactTel:that.phone=that.orderMsg.contactTel;
						that.locatimes = new Date()
						that.ordertime = new Date(Date.parse(that.orderMsg.encounterDate))
						that.orendate = that.orderMsg.encounterDate.replace(/\-/g, ".");
						that.cityname();//调用城市接口，获取经纬度
						that.isTime&&!that.isDoTime?that.isordert=true:that.isordert=false;
						that.ifshow = that.orderMsg.orderState==4&&that.locatimes!=that.ordertime&&that.locatimes<that.ordertime;
						$(".call-btn1").click(function(){
							that.isordert=false
							sessionStorage.removeItem("isOrder");
						})
						var sourObj = {
							'1':'微保专享洗牙套餐券',
							'2':'微医保专属涂氟',
							'3':'微保专享洗牙套餐、涂氟',
							'4':'微医保专属窝沟封闭',
							'5':'微保专享洗牙套餐、窝沟封闭',
							'6':'微医保专属窝沟封闭或涂氟',
							'7':'微保专享洗牙套餐、窝沟封闭或涂氟'
						}
						that.source?that.source:that.source='1'
						var soukey = that.source;
						$.each(sourObj, function(soukey,val) {
							that.objKey = sourObj['1'];
						});
					}else{
						Toast (data.message);
					}
				})
			},
			orderClick:function(){
				$('.v-modal,.mint-msgbox').show();
				var that = this;
				if(that.locatimes!=that.ordertime){
					var ts='';
					var orState = that.orderMsg.orderState;
					if(orState == "0"){
						ts = '即将完成预约,请确认操作';
					}else if(orState == "4"){
						ts = '确定取消预约';
					}
					MessageBox.confirm('',{
		                message:ts,
		                title: '',
		                confirmButtonText: '我再想想',
		                cancelButtonText: '取消预约',
		                closeOnClickModal:false
		           }).then(action =>  {
						
					},action =>  {
						var link=window.location.href;
						var parseUrl = getUrl(link);
						this.orderId = parseUrl.orderId;
						var orderIds = parseUrl.orderId;
						this.policyNo = parseUrl.policyNo;
						var channelType = parseUrl.channelType;
						var cpnTicketNo = parseUrl.cpnTicketNo;
						var wesurePolicyNo = parseUrl.wesurePolicyNo
						var param = {
							"cancelReason":"",
							"hospitalId":that.orderMsg.orgId,
							"orderId":this.orderId,//截取URL中的orderId
							"cpnTicketNo":cpnTicketNo,
							"policyNo":this.policyNo	
						}
						var parResult = api.cancelOrder(param);
						parResult.then(function(res){
							var data = res.data;
							if(data.status=="1"){
								that.back_f=false
								Toast ({
					    			className:'eval_btntxt',
									message: '取消成功',
									iconClass:'eval_succ',
									position: 'middle',
									duration: 1000
								})
								setTimeout(function(){
									var toMap=sessionStorage.getItem('toMap')||"";
									var back_ticketURI=sessionStorage.getItem('back_ticketURI');
	      	 						if(toMap)toMap=JSON.parse(toMap);
	      	 						if(toMap=='1') sessionStorage.setItem('toMap','0');
									if(back_ticketURI=='1')sessionStorage.setItem('back_ticketURI','0');
									window.location.href='#/common/enterRouter?page='+encodeURIComponent('order/toOrder&orderId=')+orderIds+'&policyNo='+that.policyNo+'&channelType='+channelType+'&cpnTicketNo='+cpnTicketNo+'&wesurePolicyNo='+wesurePolicyNo},1000)
							}else{
								Toast (data.message);
							}
						})
					})
		       }
			},
			cityname:function(){
				var that = this;
				var link=window.location.href;
				var parseUrl = getUrl(link);
				var channel = parseUrl.channelType;
				var param = {
				  "hospitalId":that.orgid,//截取URL
				  "channelType":channel
				}
				var parResult = api.hospitalInCity(param);
				parResult.then(function(res){
					var cityDate = res.data;
					that.shengname = cityDate.shengName
						if(cityDate.hospitalLongitudeLatitude && cityDate.hospitalLongitudeLatitude.length){
							that.lon = cityDate.hospitalLongitudeLatitude.split(",")[0];// 终点经度
		      				that.lat = cityDate.hospitalLongitudeLatitude.split(",")[1];// 终点纬度
						}else{
							that.lon = "";that.lat = "";
						}
					})
			},
			telphone:function(){
				this.istel = true;
				this.phones = this.phone.split(",");
				this.phones = this.phone.split(",");
				$('.telmodal').parent().css("width","100%")
				$(".telmodal").html("");
				for(var i=0;i<this.phones.length;i++){
					var telphone = "tel:"+this.phones[i];
					var aht = '<a href='+telphone+' class="adisplay">'+this.phones[i]+'</a>'
					$(".telmodal").append(aht);
				}
				$(".telmodal a:last-child").after('<a class="adisplay teldis">取消</a>')
				var _this=this;
				$(".telmodal a").click(function(){
					_this.istel = false;
				})
			},
		}
	}
</script>

<style>
	@import '../../assets/css/orderPro.css'
	
</style>