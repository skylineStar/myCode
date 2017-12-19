<!--xurr
	微保内容：爽约页面
-->
<template>
	<div class="unorder">
		<div class="order_progress">
			<div class="order3">
				<img src="../../assets/images/user/order3.png" alt="" />
			</div>
			<div class="order_txt">
				<span class="orders order_txt1">提交申请</span>
				<span class="orders order_txt2">预约成功</span>
				<span class="orders order_txt3">已完成</span>
			</div>
		</div>
		<div class="order_warn">
			<img src="../../assets/images/user/order_icons1.png" alt="" />
			<p>已爽约，视为自动放弃本服务</p>
		</div>
		<p class="order_line"></p>
		<div class="order_body">
			<div class="b_orname">
				<img src="../../assets/images/user/icon_service.png" alt="" />
				<p class="ad_name">{{objKey}}</p>
			</div>
			<div class="b_address">
				<img src="../../assets/images/user/order_icons2.png" alt="" />
				<p class="ad_name">{{unorderMsg.orgName}}</p>
				<p class="ad_txt">{{unorderMsg.orgAddress}}</p>
			</div>
			<div class="b_date">
				<img src="../../assets/images/user/order_icons3.png" alt="" />
				<p class="date_txt">
					{{unedate}}   
					<span v-if='unorderMsg.endTime' >{{unorderMsg.beginTime+'-'+unorderMsg.endTime}}</span>
					<span v-else='unorderMsg.endTime' >{{unorderMsg.beginTime}}</span>
				</p>
				</p>
			</div>
			<div class="b_name">
				<img src="../../assets/images/user/order_icons4.png" alt="" />
				<p class="name_txt">{{unorderMsg.name}}</p>
			</div>
		</div>
		<p class="order_line"></p>
		<p class="unorder_footer">如果有任何疑问，可联系微医保专属服务热线<a class="atel" href="tel:400-069-5522">400-069-5522</a></p>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { MessageBox,Toast,Popup } from 'mint-ui';
		import { config_param } from '../../assets/js/config_param'
	import { getUrl,GetDateDiff,requeryUsJS } from '../../assets/js/BaseJS.js';
	import API from '../../api/API';
	const api =new API();
	export default {
		data () {
			return{
				unorderMsg:{},
				orderId:"",
				unedate:'',
				source:'',
				objKey:''
			}
		},
		beforeCreate () {document.title = '齿科预约';sessionStorage.setItem('back_ticketURI','1')},
		beforeRouteLeave:(to, from, next) => {
//      alert('back'+sessionStorage.getItem('back_ticketURI'));
	      if(sessionStorage.getItem('back_ticketURI')){//返回卡券标记
	          let back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
	          if(back_ticketURI=='1'){//返回卡券
	              next(false);
			      sessionStorage.setItem('back_ticketURI','0');
//	              window.location.href=config_param.ticketURI;
					WeixinJSBridge.invoke('invokeMiniProgramAPI', {
	                    name: 'navigateBack',
	                    arg: {}
	                });
				  WeixinJSBridge.call('closeWindow');
	          }else{
	              next();
	          }
	      }else{
	          next()
	      }
	    },
		
		mounted () {
			this.onLoading();//接口交互
		},
		methods: {
			onLoading:function(){
				var that = this;
				var link=window.location.href;
				var parseUrl = getUrl(link);
				that.orderId = parseUrl.orderId;
				var param = {
				  "orderId":that.orderId //截取URL
				}
				var parResult = api.selectOrder(param);
				parResult.then(function(res){
					var data = res.data;
					that.unorderMsg = data.data;
					that.unedate = that.unorderMsg.encounterDate.replace(/\-/g, ".");
					that.source = that.unorderMsg.serviceType;//预约时的服务
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
				})
			},
		}
	}
</script>

<style>
	@import '../../assets/css/orderPro.css'
</style>