<!--泰康养老渠道--服务内容页面-->
<template>
	<div id="serall" style="-webkit-overflow-scrolling:touch;overflow:scroll;">
		<div class="serfix">
			<div class="sergap"></div>
			<div class="serve_tap">
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
		<div>
			<!--产品介绍-->
		  <div class="product_info" id="product_infoall">
		  		<div id="product_info"></div>
		  		<p class="ptitle">一、齿科服务介绍</p>
				<p class="p_all">
					本服务为您提供包含挂号建档、口腔基础检查、超声波洁牙和口腔全景片检查四项服务，各一次。
				</p>
				<p class="p1f">
					口腔基础检查，即口腔专科一般检查，包括：咬合关系检查、牙周检查、颞颌关节检查、一对一口腔宣教。
				</p>
				<p class="p1">
					超声波洁牙，又名龈上洁治术（俗称洗牙），指的是用洁治器械去除龈上牙石，菌斑和色泽并磨光牙面，以延迟菌斑和牙石的再沉积。包括超声龈上洁治、抛光、冲洗、国产上药（碘甘油）。
				</p>
				<p class="p1 p1b">
					口腔全景片，又叫曲面断层片，其利用仪器提供的X光射线给牙齿、牙周、整个口腔结构及头颅“拍照”，一次拍摄即将全口牙齿和颌骨的影像清晰的显示在一张X光片上，目的是精确测定牙齿倾斜角度、牙周软组织情况、牙根情况、牙槽骨质情况，解剖形态的精确测量为医生术前的诊断分析与设计提供全景样图像依据。
				</p>
				<div class="sergap"></div>
		  </div>
		  <!--服务说明-->
		  <div class="serve_info" id="serve_infoall">
		  	<div id="serve_info"></div>
		  		<p class="ptitle">二、客户服务权益</p>
				<p class="ptitle">1、产品有效期</p>
				<p class="ptp">
					自在泰康养老购买所对应保单生效且过犹豫期之日起1年内有效。保单失效或退保，服务权益失效，将不可再预约。
				</p>
				<div class="sergap"></div>
				<p class="ptitle">2、服务对象</p>
				<p class="ptp">仅限投保泰康养老所对应保险产品的被保险人本人。</p>
				<div class="sergap"></div>
				<p class="ptitle">3、查询方式</p>
				<p class="p1f">泰康养老官方微信平台为本服务权益查询及服务预约的唯一入口。</p>
				<p class="p1 p1b">客户也可拨打<a class="telc" href="tel:4006695522">4006695522</a>进行服务权益查询</p>
				<div class="sergap"></div>
				<p class="ptitle">4、咨询及投诉</p>
				<p class="p1f weit">a、咨询及投诉方式</p>
				<p class="p1">客户可拨打泰康养老服务热线<a class="telc" href="tel:4006695522">4006695522</a>对齿科服务相关事项进行咨询以及投诉。</p>
				<p class="p1 weit">b、咨询及投诉内容</p>
				<p class="p1 p1b">
					客户可就本服务的服务权益获取方式、服务内容、服务基本流程、诊所信息、相关注意事项等进行咨询，若存在服务体验异常，如：预约响应超时、诊所改约爽约、系统无法预约、服务延时、服务遗漏、过度营销、医疗事故等问题，可进行投诉。
				</p>
				<div class="sergap"></div>
				<p class="ptitle">5、服务咨询及投诉时间</p>
				<p class="ptp">
					人工服务工作时间为24小时，每周工作7天，如遇特殊情况可调整人工服务时间。
				</p>
				<div class="sergap"></div>
				<p class="ptitle">三、客户服务流程</p>
				<p class="p1f weit">1、提交预约</p>
				<p class="p1">A、预约提交方式</p>
				<p class="p2">客户收到泰康养老赠送的专享齿科服务券，根据卡券上的编号和密码可通过泰康养老官方微信平台进行预约。</p>
				<p class="p1">B、 预约提交内容</p>
				<p class="p2">客户基本信息：我们会根据客户绑定泰康养老官方微信的信息自动带出被保险人的姓名，客户需填写身份证号、联系方式，以便诊所核实与联系沟通。</p>
				<p class="p2">就诊信息：拟就诊诊所品牌和门店、拟就诊日期和时间。</p>
				<p class="p1">C、诊所营业时间</p>
				<p class="p2">客户可参考微信齿科服务预约平台上显示的诊所营业时间进行服务预约，一般为9：00~18：00。</p>
				<p class="p1">D、服务预约时间</p>
				<p class="p2">客户预约时，可根据泰康养老官方微信平台上展示的可预约时段进行预约，一般需至少提前1-5日提交订单，最久可提前预约时间为1个月。</p>
				<p class="p1 weit">2、预约确认</p>
				<p class="p1">若客户在诊所营业时间内提交订单，诊所在30分钟内响应订单需求，并在1小时内完成订单处理；若客户在诊所非营业时间内提交订单，诊所将在下一个工作日开业30分钟内响应订单需求，并在1小时内完成订单处理。</p>
				<p class="p1">若客户选择的服务时间诊所无法满足，诊所将在1小时内与客户联系协商其他服务时间。若客户提供的联系方式有误，或诊所长时间无法与客户取得联系，将先自动为客户取消预约订单，并为客户发送服务通知，提醒客户重新选择预约。</p>
				<p class="p1">服务确认将以微信推送的方式正式通知客户。</p>
				<p class="p1 weit">3、诊前提醒</p>
				<p class="p1">在客户就诊前一天或就诊当天，诊所将联系客户提醒就诊安排，并提示客户相关注意事项。</p>
				<p class="p1 weit">4、预约取消</p>
				<p class="p1">若客户因特殊情况无法按时就诊，请在就诊前一日24时前，在泰康养老官方微信平台进行预约取消，约定的就诊当日0时后将不再支持服务预约取消。如客户未按规定进行取消，且未到店使用服务，本服务权益自动作废，因此造成的损失，泰康养老将不承担责任，敬请谅解。</p>
				<p class="p1 weit">5、到店服务</p>
				<p class="p1">客户应按确认的预约时间前往诊所接受服务，并在前台出示身份证以确认客户身份。否则无法享受服务，因此造成的损失，泰康养老将不承担责任，敬请谅解。</p>
				<p class="p1 weit">6、口腔全景片查看</p>
				<p class="p1">诊所在为客户拍摄完口腔全景照片后，客户可通过泰康养老官方微信平台进行口腔全景片查询。诊所保证相关照片的真实性、完整性、准确性。</p>
				<p class="p1 weit">7、客户自愿放弃原则</p>
				<p class="p1">若因实际情况，客户无法使用或选择放弃部分服务内容，需在诊所书面确认。</p>
				<p class="p1 weit">8、客户自愿加项原则</p>
				<p class="p1 p1b">泰康养老严禁诊所在服务过程中对客户进行二次营销，但若客户因自身需要，要求诊所提供进一步齿科服务，诊所可根据客户需求及实际情况，酌情提供相关服务。</p>
		  		<div class="sergap"></div>
		  		<p class="ptitle">四、服务禁忌</p>
				<p class="p1f">1) 有传染性疾病的患者：如结核、乙肝表面抗原阳性、艾滋病等。</p>
				<p class="p1">2) 使用心脏人工起搏器的患者。</p>
				<p class="p1">3) 口腔局部软组织炎症急性期患者（急性坏死性牙龈炎除外）。</p>
				<p class="p1">4) 患有牙龈部恶性肿瘤的患者。</p>
				<p class="p1">5) 患有各种出血性疾病的患者。</p>
				<p class="p1 p1b">6) 孕妇。应该在怀孕前接受彻底的口腔治疗。</p>
				<div class="sergap"></div>
		  </div>
		  <!--常见问题-->
		  <div class="question" id="questionall">
		  	<div id="question"></div>
					<!--常见问题-->
			<p class="ptitle">五、常见问题</p>
			<div class="questions">
				<p class="p3 iconq"><!--<span class="iconq"></span>-->1）完成一次洗牙大约需要多少时间？ </p>
				<p class="p4 icona"><!---->
					一般需要40分种左右，牙石特别多或者同时需要其他治疗的客户可能需要更长的时间。</p>
				<p class="p3 iconq">2）洗牙后牙齿会变白吗？</p>
				<p class="p4 icona"> 洗牙使牙齿变白的作用是极其有限的。正常牙齿的颜色是略带黄色的。洗牙的一个重要目标是最大程度的去掉牙齿表面的牙石及色素沉着，从而暴露出牙齿本身的颜色，即淡淡的黄色。</p>
				<p class="p3 iconq">3）多久洗一次牙？</p>
				<p class="p4 icona"> 一般情况下建议每半年到一年洗一次牙。因每个人的牙周组织健康状况、口腔卫生状况、口腔清洁习惯、生活习惯不同，所以具体情况还应听取牙医的建议。</p>
				<p class="p3 iconq">4）洗牙对牙齿有损害吗？</p>
				<p class="p4 icona">正确的洗牙对牙齿是没有损害的。正常的牙齿表面是一层牙釉质，硬度非常高，完全可以忽略洗牙造成的影响。抛光用的橡皮轮材质较软，更不会对牙齿造成磨损。</p>
				<p class="p3 iconq">5）洗牙会导致牙缝变宽吗？</p>
				<p class="p4 icona">这种担心使很多人拒绝洗牙。实际上，牙石的堆积、牙龈的炎症会导致牙龈局部肿胀而填塞牙缝，而洗牙后去除了牙石，牙龈肿胀逐渐消退，所以牙缝就变得明显了，舌头舔起来牙齿的轮廓也更加明显了，感觉牙缝变宽了、牙齿变长了，这实际上是牙齿的真实面目，而不是洗牙所造成的。这正像戒烟的过程中肯定会出现各种不适的反应，但戒烟带给人们的益处是不言而喻的。同样，如果因为害怕牙缝看起来更大而拒绝洗牙，宁愿维持牙龈炎症肿胀的状态，是极不明智的，可能会导致更为严重的后果。</p>
				<p class="p3 iconq">6）洗牙会导致牙齿敏感吗？</p>
				<p class="p4 icona">牙石就像一层厚厚的棉袄，包裹在牙齿的外层。通过洗牙去除牙石后，牙齿暴露在久违的外界环境中，会产生种种异样的感觉。如果是健康的牙齿，这种敏感症状通常在洗牙后一到两周内会逐渐消失。</p>
				<p class="p3 iconq">7）洗牙后有哪些注意事项？</p>
				<p class="p4 icona">在洗牙后两周，不宜食冷、热、酸、甜等食品。洗牙后的牙齿对冷热会有点敏感而感到酸痛，这暂时的症状及原来刷牙容易出血的情形通常在一周左右会消失。若酸痛的症状一直存在，可考虑市面上的抗敏感牙膏，使用一个月左右多会改善。</p>
				<p class="p3 iconq">8）拍摄牙片有什么作用？ </p>
				<p class="p4 icona">牙片是牙病诊治过程中的重要手段，治疗前用于发现病变程度、范围;治疗中引导治疗、确定治疗范围和治疗深度;治疗后观察疗效。通过牙片，口腔医生可以了解到蛀牙范围有多大，牙痛是由于牙髓神经发炎还是根尖炎症或者是牙周炎症引起的，镶牙的条件是否足够，种植牙需要的骨量，发育畸形，某些肿瘤等等。另外，牙片为医患沟通提供了很好的依据。因此，在诊治过程中，拍牙片是必要的。</p>
				<p class="p3 iconq">9）拍摄牙片会对人体健康有损害吗？ </p>
				<p class="p4 icona">拍摄一次牙片患者接受的辐射量为0.005mSv（毫西弗），拍摄一次胸片为0.023mSv（毫西弗），做一次胸部CT为8mSv（毫西弗）。也就是说，拍摄4次牙片接受的辐射量相当于拍一次胸片接受的辐射量，拍摄1600次牙片与做一次胸部CT接受的辐射量相当。所以拍摄牙片所接受的辐射量相当小，可忽略不计。</p>
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
        source:''
      }
    },
    beforeCreate () {document.title = '服务内容 '},
    mounted() {
//    var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));//  获取ordersession对象
//    if(orderInfo)this.source = orderInfo.source;
	  document.body.addEventListener("scroll",this.init);
	  this.reloadfun();//刷新后的scrollTop方法
    },
    destroyed(){
		document.body.removeEventListener("scroll",this.init);//销毁scroll
    },
    methods:{
    	init(){
               var a = document.getElementById("product_infoall").offsetTop;
               var b = document.getElementById("serve_infoall").offsetTop;
               var c = document.getElementById("questionall").offsetTop;
               var h=document.getElementById("serall").getBoundingClientRect();
               var h1 = document.getElementById("serve_infoall").getBoundingClientRect();
                if (a >= (-h.top+30)) {
                    $(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
                if (c >= (-h.top+100) &&b <= (-h.top+100) ) {
                    $(".stap").addClass("active");
					$(".ptap,.qtap").removeClass("active");
                }
                if (c <= (-h.top+180)) {
                    $(".qtap").addClass("active");
					$(".ptap,.stap").removeClass("active");
                }
                if(-h.top<150){
                	 $(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
    	},
    	reloadfun(){
    		 $(window).scroll(function () {
                var a = document.getElementById("product_infoall").offsetTop;
                var b = document.getElementById("serve_infoall").offsetTop;
                var c = document.getElementById("questionall").offsetTop;
               var h=document.getElementById("serall").getBoundingClientRect();
                if (a >= $(window).scrollTop()+115) {
                    $(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
                if (c >= $(window).scrollTop()+150 &&b <= $(window).scrollTop()+115 ) {
                    $(".stap").addClass("active");
					$(".ptap,.qtap").removeClass("active");
                }
                if (c <= $(window).scrollTop()+115) {
                    $(".qtap").addClass("active");
					$(".ptap,.stap").removeClass("active");
                }
                if($(window).scrollTop()<100){
                	$(".ptap").addClass("active");
					$(".stap,.qtap").removeClass("active");
                }
            });
    	},
	    tap1(){
			$(".ptap").addClass("active");
			$(".stap,.qtap").removeClass("active");
			return document.getElementById('product_info').scrollIntoView(true);
	    },
	    tap2(){
			$(".stap").addClass("active");
			$(".ptap,.qtap").removeClass("active");
			return document.getElementById('serve_info').scrollIntoView(true);
	    },
	    tap3(){
			$(".qtap").addClass("active");
			$(".ptap,.stap").removeClass("active");
			return document.getElementById('question').scrollIntoView(true);
	    },
    }
  }
</script>
<style scoped>
.serfix{position: fixed;top: 0;width: 100%;background: #fff;z-index: 10;}
#serall{color: #4e4e4e;font-size: 0.78rem;line-height: 1.17rem;background: #fff;}
.sergap{height: 0.55rem;background: #f3f3f3;}
.serve_tap{display:flex;justify-content:space-between;font-size: 0.89rem;border-bottom: 0.5px solid #ececec;}
.serve_tap a{display: inline-block; width: 32%;padding:0.58rem 0;text-align: center;}
.serve_tap a.active{border-bottom:0.14rem solid #fd9d2c;color: #fd9d2c;}
.product_info{display:block;padding-top: 3.05rem;position: relative;}
/*.serve_info{padding-bottom: 1.17rem;}*/
.serve_info,.question{position: relative;}
#product_info,#serve_info,#question{position: absolute;top:-3.4rem;}
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
.icona{padding-left:1.17rem;background: url(../../../assets/images/order/A.png) 0 3px no-repeat;background-size:0.83rem 0.83rem;}
.p5{padding-top: 0.38rem;}
.child{color: #fd9d2c;}
</style>