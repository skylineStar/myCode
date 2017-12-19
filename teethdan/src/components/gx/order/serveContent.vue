<!--个险渠道--服务内容页面-->
<template>
	<div id="serall" style="-webkit-overflow-scrolling:touch;overflow:scroll;">
		<div class="serfix">
			<div class="sergap"></div>
			<div class="serve_tap">
						<!--<a  class="ptap active" href="#product_info" @click="tap1">
							产品介绍
						</a>
						<a class="stap" href="#serve_info" @click="tap2">
							服务说明
						</a>		
						<a class="qtap" href="#question" @click="tap3">
							常见问题
						</a>	-->
						<a  class="ptap active" @click="tap1">
							产品介绍
						</a>
						<a class="stap"  @click="tap2">
							服务说明
						</a>		
						<a class="qtap"  @click="tap3">
							常见问题
						</a>	
			</div>
		</div>
			<!--产品介绍-->
		  <div class="product_info" id="product_infoall">
		  		<div id="product_info"></div>
				<p class="p1f">
					1、泰康专享洗牙套餐主要为您提供在指定口腔诊所的挂号建档、成人口腔全面检查、超声波洁牙和口腔全景片检查四项服务，各一次（不可拆分使用）。
				</p>
				<p class="p1">
					2、本产品有效期为1年，自保单犹豫期后生效，齿科服务有效期内预约有效。保单失效或退保，服务权益失效。
				</p>
				<p class="p1 p1b">
					3、本产品仅限投保泰康人寿相关保险产品的被保险人或投保人使用。
				</p>
				<div class="sergap"></div>
		  </div>
		  <!--服务说明-->
		  <div class="serve_info" id="serve_infoall">
		  	<div id="serve_info"></div>
				<p class="ptitle">服务咨询及投诉</p><!--<a class="telc" href="tel:4000895522">4000895522</a>-->
				<p class="p1f">您可拨打<a class="telc" href="tel:95522">95522</a>对齿科服务相关事项进行咨询以及投诉。</p>
				<p class="p1 p1b">服务咨询及投诉时间：人工服务基础工作时间为8点至20点，每周工作7天，如遇特殊情况可调整人工服务时间。20点至次日8点为语音提示时间。</p>
				<div class="sergap"></div>
				<p class="ptitle">服务预约规则</p>
				<p class="p1f">泰康医生APP泰康专享洗牙套餐的卡券为本服务预约的唯一入口。</p>
				<p class="p1">您在预约时需确认身份信息，并提供正确联系方式。</p>
				<p class="p1">请您按照齿科诊所页面上显示的营业时间进行服务预约，诊所将在1小时内完成订单处理；如您在诊所营业时间之外提交订单的，诊所将在第二日开业后1小时内完成订单处理。</p>
				<p class="p1 weit">由于医生工作时间变化较大，您所选定的时间为意向就诊时间，最终服务时间将以诊所确认为准，我们将尽力安排最合适的时间为您提供服务。</p>
				<p class="p1">为保证预约顺畅，请至少提前1-5日提交订单，最久可预约时间为1个月。</p>
				<p class="p1">预约确认后，我们将在泰康医生APP消息中心正式通知您。</p>
				<p class="p1">在您就诊前一天或就诊当天，诊所将联系您提醒就诊安排，并提示相关注意事项。</p>
				<p class="p1">就诊当日，请您携带有效的身份证明，按指定时间前往诊所，到达后在前台出示相关证明验证身份后方可接受服务。如因未提供准确的身份证明而无法享受服务，我们将不承担责任。</p>
				<p class="p1 p1b">如您因特殊情况无法按时就诊，须在就诊当日0：00之前进行线上“取消预约”。如未按规定进行取消，且未到店使用服务，相关资格自动作废，客户因此产生的损失我们不承担责任。</p>
				<div class="sergap"></div>
				<p class="ptitle">诊所服务</p>
				<p class="p1f">您在诊所服务期间，诊所将严格按照《标准洁牙流程规范》为您提供标准服务。</p>
				<p class="p1">其中，由于齿科全景片具有一定辐射性，您可自愿放弃相关服务，诊所在您确定放弃后，须在您的口腔健康档案中明确记录相关事项，并请您签字确认。</p>
				<p class="p1">如您接受齿科全景片服务，诊所将在您拍摄完全景照片后，将相关照片上传至您的口腔健康档案，您可在泰康医生齿科服务卡券中进行档案查询。</p>
				<p class="p1 p1b">我们严禁诊所在洁牙过程中对您进行过度营销，但如果您因自身需要，要求诊所提供进一步齿科治疗服务，诊所可根据实际情况为您酌情提供相关服务，诊所须在提供服务前，与您进行明确沟通，并在您的口腔健康档案中明确记录相关事项，请您签字确认。</p>
				<div class="sergap"></div>
		  </div>
		  <!--常见问题-->
		  <div class="question" id="questionall">
		  	<div id="question"></div>
					<!--常见问题-->
			<p class="ptitle">常见问题</p>
			<div class="questions">
				<p class="p3 iconq">什么情况下不能洗牙？ </p>
				<div class="p4 icona">
					<p class="p5">1) 有传染性疾病的患者：如结核、乙肝表面抗原阳性、艾滋病等。</p>
					<p class="p5">2) 使用心脏人工起搏器的患者。</p>
					<p class="p5">3) 口腔局部软组织炎症急性期患者（急性坏死性牙龈炎除外）。</p>
					<p class="p5">4) 患有牙龈部恶性肿瘤的患者。</p>
					<p class="p5">5) 患有各种出血性疾病的患者。</p>
					<p class="p5">6) 孕妇。应该在怀孕前接受彻底的口腔治疗。</p>
					<p class="p5">7) 活动性心绞痛。</p>
				</div>
				
			</div>
  </div>
	</div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'serveContent',
    data() {
      return {
        source:'1',
        reload:''//是否是刷新的页面：首次进入为0，刷新后为1
      }
    },
    beforeCreate () {document.title = '服务内容 '},
    mounted() {
      var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));//  获取ordersession对象
      if(orderInfo)this.source = orderInfo.source;
      this.reload=sessionStorage.getItem('reload');
//    this.init();
	  document.body.addEventListener("scroll",this.init);
	  this.reloadfun();//刷新后的scrollTop方法
	  sessionStorage.setItem('reload','1');
    },
    destroyed(){//页面返回时执行
		document.body.removeEventListener("scroll",this.init);//销毁scroll
		sessionStorage.setItem('reload','0');
    },
    methods:{
    	init(){
//			$('body').scroll(function () {
//  			alert('首次进入');
                var a = document.getElementById("product_infoall").offsetTop;
                var b = document.getElementById("serve_infoall").offsetTop;
                var c = document.getElementById("questionall").offsetTop;
               var h=document.getElementById("serall").getBoundingClientRect();
               var h1 = document.getElementById("serve_infoall").getBoundingClientRect();
               console.log(-h.top);
//              if (a >= (-h.top+30)) {
//                  $(".ptap").addClass("active");
//					$(".stap,.qtap").removeClass("active");
//              }
                if (-h.top>180) {
                    $(".stap").addClass("active");
					$(".ptap,.qtap").removeClass("active");
                }
                if (-h.top>1160) {
                    $(".qtap").addClass("active");
					$(".ptap,.stap").removeClass("active");
                }
                if(-h.top<150){
                	 $(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
//          });
    	},
    	reloadfun(){
    		if(this.reload){
    			$(window).scroll(function () {
//          	alert('刷新后');
                var a = document.getElementById("product_infoall").offsetTop;
                var b = document.getElementById("serve_infoall").offsetTop;
                var c = document.getElementById("questionall").offsetTop;
               var h=document.getElementById("serall").getBoundingClientRect();
               console.log($(window).scrollTop());
//              if (a >= $(window).scrollTop()+30) {
//                  $(".ptap").addClass("active");
//					$(".stap,.qtap").removeClass("active");
//              }
                if ($(window).scrollTop()>180 ) {
                    $(".stap").addClass("active");
					$(".ptap,.qtap").removeClass("active");
                }
                if ($(window).scrollTop()>1160) {
                    $(".qtap").addClass("active");
					$(".ptap,.stap").removeClass("active");
                }
                if($(window).scrollTop()<150){
                	$(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
            });	
    		}
    	},
	    tap1(){
					$(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
//					$(".product_info").css("display","block");
//					$(".serve_info,.question").css("display","none");
					return document.getElementById('product_info').scrollIntoView(true);
					
	    },
	    tap2(){
					$(".stap").addClass("active");
					$(".ptap,.qtap").removeClass("active");
//					$(".serve_info").css("display","block");
//					$(".product_info,.question").css("display","none");
				return document.getElementById('serve_info').scrollIntoView(true);
	    },
	    tap3(){		
					$(".qtap").addClass("active");
					$(".ptap,.stap").removeClass("active");
//					$(".question").css("display","block");
//					$(".product_info,.serve_info").css("display","none");
				return document.getElementById('question').scrollIntoView(true);
	    },
    }
  }
</script>
<style scoped>
/*body{background: #fff!important;}*/
.serfix{position: fixed;top: 0;width: 100%;background: #fff;z-index: 10;}
#serall{color: #4e4e4e;font-size: 0.78rem;line-height: 1.17rem;background: #fff;}
.sergap{height: 0.55rem;background: #f3f3f3;}
.serve_tap{display:flex;justify-content:space-between;font-size: 0.89rem;border-bottom: 0.5px solid #ececec;}
.serve_tap a{display: inline-block; width: 32%;padding:0.58rem 0;text-align: center;/*float: left;*/}
/*.serve_tap a:last-child{float: right;}*/
.serve_tap a.active{border-bottom:0.14rem solid #fd9d2c;color: #fd9d2c;}
.product_info{display:block;padding-top: 3.05rem;position: relative;}
/*.serve_info{padding-bottom: 1.17rem;}*/
.serve_info,.question{position: relative;}
#product_info,#serve_info{position: absolute;top:-3.4rem;}
#question{position: absolute;top:-8rem;}
.question{padding-bottom: 3rem;}
.p_all{padding: 0.61rem 0.83rem;border-bottom: 0.5px solid #cfcfcf;font-weight: 700;}
.p1{
	padding: 0.38rem 0.83rem 0;
	font-size: 0.78rem;line-height: 1.17rem;
}
.p1f{
	padding: 0.61rem 0.83rem 0;
	font-size: 0.78rem;line-height: 1.17rem;
}
.p1b{
	padding-bottom:0.61rem;
}
.ptitle{font-size: 0.89rem;padding: 0.64rem 0.83rem;border-bottom: 0.5px solid #cfcfcf;font-weight: 700;}
.ptp{padding:0.61rem 0.83rem;}
.telc{color:#2b9af4}
.weit{font-weight: 700;}
.p2{padding: 0.38rem 0.83rem 0 1.94rem;font-size: 0.78rem;line-height: 1.17rem;}
.questions{
	padding: 1.17rem 0.83rem;
}
.p3{font-size: 0.78rem;font-weight: 700;padding-bottom: 0.38rem;}
.p4{font-size: 0.78rem;padding-bottom: 0.89rem;}
.iconq{padding-left:1.17rem;background: url(../../../assets/images/order/Q.png) 0 3px no-repeat;background-size:0.83rem 0.83rem;}
.icona{padding-left:1.17rem;background: url(../../../assets/images/order/A.png) 0 0.55rem no-repeat;background-size:0.83rem 0.83rem;}
.p5{padding-top: 0.38rem;}
.child{color: #fd9d2c;}
</style>