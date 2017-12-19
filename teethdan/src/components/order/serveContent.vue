<!--微保渠道--服务内容页面-->
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
		<div v-if="source=='14'">
			<!--产品介绍-->
		  <div class="product_info" id="product_infoall">
		  	<div id="product_info"></div>
				<p class="p_all">
					   本产品为<span class="child">未满14岁儿童</span>提供的服务包括，建立专属口腔档案、口腔全面检查1次、窝沟封闭2颗牙或全口涂氟（二选一，具体请遵从诊所医嘱安排）。
				</p>
				<p class="p1f">
					1．建立客户专属档案，指为每位客户建立专属的口腔健康档案。
				</p>
				<p class="p1">
					2．口腔全面检查，即口腔专科一般检查，包括：咬合关系检查、牙周检查、颞颌关节检查、一对一口腔宣教。
				</p>
					<p class="p1">
					3．窝沟封闭，是指不损伤牙体组织，由儿童口腔专科医生将窝沟封闭材料涂布于牙冠咬合面、颊舌面的窝沟点隙，当它流入并渗透窝沟后固化变硬，形成一层保护性的屏障，覆盖在窝沟上，能够阻止致龋菌及酸性代谢产物对牙体的侵蚀，以达到预防窝沟龋的方法。
				</p>
					<p class="p1 p1b">
					4．涂氟，是儿童口腔专科医生使用一种含氟化物的制剂，给口腔内每一颗牙齿的表面进行氟化处理，含氟制剂在牙齿的表面停留，从而形成一层牙齿的“保护膜”，可有效预防龋齿的发生。
				</p>
				<div class="sergap"></div>
		  </div>
		  <!--服务说明-->
		  <div class="serve_info" id="serve_infoall">
		  		<div  id="serve_info"></div>
				<p class="ptitle">1．产品有效期</p>
				<p class="ptp">1年，自《微医保》保单生效之日起至保单终止日止，有效期内预约有效。保单失效或退保，服务权益失效，将不再可预约。</p>
				<div class="sergap"></div>
				<p class="ptitle">2．服务对象</p>
				<p class="ptp">仅限投保《微医保》保险产品的被保险人本人。</p>
				<div class="sergap"></div>
				<p class="ptitle">3．查询方式</p>
				<p class="p1f">微保为本服务权益查询、服务预约的唯一入口。</p>
				<p class="p1 p1b">客户也可拨打微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>进行服务权益查询</p>
				<div class="sergap"></div>
				<p class="ptitle">4．咨询及投诉</p>
				<p class="p1f weit">1）咨询及投诉方式</p>
				<p class="p1">客户可拨打微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>对本服务相关事项进行咨询或投诉。</p>
				<p class="p1 weit">2）咨询及投诉内容</p>
				<p class="p1 p1b">客户可就本服务的权益获取方式、服务内容、服务基本流程、诊所信息、相关注意事项等进行咨询。若你服务体验异常，如预约响应超时、系统无法预约、诊所爽约、服务延时、服务遗漏、过度营销、医疗事故等问题，可进行投诉。</p>
				<div class="sergap"></div>
				<p class="ptitle">5．咨询及投诉时间</p>
				<p class="ptp">人工服务基础工作时间为8点至20点，每周工作7天。20点至次日8点为语音提示时间。</p>
				<div class="sergap"></div>
				<p class="ptitle">6．服务流程</p>
				<p class="p1f weit">1）提交预约</p>
				<p class="p1">— 预约提交方式</p>
				<p class="p2">客户通过微保入口，链接泰康健康齿科服务预约平台进行预约。</p>
				<p class="p1">— 预约提交内容</p>
				<p class="p2">客户基本信息：我们会根据保单号信息自动带出被保险人的身份信息，客户需填写联系方式，以便诊所联系沟通。</p>
				<p class="p1">— 诊所营业时间</p>
				<p class="p2">客户可参考预约平台上显示的诊所营业时间进行服务预约，一般为9：00~18：00。</p>
				<p class="p1">— 服务预约时间</p>
				<p class="p2">客户预约时，可根据预约平台上展示的可预约时段进行预约，一般需至少提前1-5日提交订单，最久可提前的预约时间为1个月。</p>
				<p class="p1 weit">2）预约确认</p>
				<p class="p1">若你在诊所营业时间内提交订单，诊所将在30分钟内响应订单需求，并在1小时内完成处理；若你在诊所非营业时间提交订单，诊所将在下一个工作日营业时间30分钟内响应订单需求，并在1小时内完成处理。</p>
				<p class="p1">若你选择的诊所服务时段无法满足，诊所将在时效内与你联系，协商其他服务时间。若你提供的联系方式有误，或诊所长时间无法与你联系上，我们将先自动为你取消预约订单，并为你发送微信服务通知，提醒你重新选择预约。预约时间确认后，我们将以微信服务通知方式正式通知你。</p>
				<p class="p1 weit">3）诊前提醒</p>
				<p class="p1">在你就诊前一天上午十点，我们将再次给你发送微信服务通知，提醒就诊安排及相关注意事项。</p>
				<p class="p1 weit">4）预约取消</p>
				<p class="p1">若你因特殊情况无法按时就诊，请在就诊前一日24时前，在预约平台进行预约取消，约定的就诊当日0点后将不再支持预约取消。如你未按规定进行取消，且未到店使用服务，本服务权益自动作废，因此产生的损失我们将不承担责任，敬请谅解。</p>
				<p class="p1 weit">5）到店服务</p>
				<p class="p1">你应按确认的预约时间前往诊所接受服务，并在前台出示身份证明以确认身份。否则无法享受服务，因此造成的损失，我们将不承担责任，敬请谅解。</p>
				<p class="p1 weit">6）服务放弃</p>
				<p class="p1">若因实际情况，你无法使用或选择放弃部分服务内容，需在诊所书面确认。</p>
				<p class="p1 weit">7）服务加项</p>
				<p class="p1 p1b">我们严禁诊所在服务过程中对客户进行二次营销。但若你因自身需要，要求诊所提供进一步齿科服务，诊所可根据客户需求及实际情况，酌情提供相关服务，并且诊所应在提供服务前，在客户口腔健康档案中明确记录相关事项，并需得到你的签字确认。</p>
		  		<div class="sergap"></div>
		  </div>
		  <!--常见问题-->
		  <div class="question" id="questionall">
		  	<div id="question"></div>
					<!--常见问题-->
			<p class="ptitle">常见问题</p>
			<div class="questions">
				<p class="p3 iconq"><!--<span class="iconq"></span>-->可以直接到诊所不预约吗？ </p>
				<p class="p4 icona"><!---->
					你好，本服务为预约式服务，就诊前你必须与诊所预约确认就诊时间。如未预约直接到诊所就诊，我们将无法提供本服务。</p>
				<p class="p3 iconq">我到诊所要带什么吗？</p>
				<p class="p4 icona"> 你好，就诊时需向诊所出示预约成功的微信服务通知，并出示你本人身份的有效证件。</p>
				<p class="p3 iconq">在全国都有诊所网点吗？</p>
				<p class="p4 icona"> 你好，全国一二线城市均有合作诊所，并且在不断更新扩充中。如你所在城市暂无合作诊所，请选择已开通诊所的城市申请服务或咨询客服微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>。</p>
				<p class="p3 iconq">到诊所还需要付费吗？</p>
				<p class="p4 icona">你好，你可以免费享受该次服务，诊所不得向你额外收取任何费用，或推销产品。但若你当日有其他口腔服务需求，需向诊所支付费用。</p>
				<p class="p3 iconq">儿童适宜进行牙齿涂氟的年龄？</p>
				<p class="p4 icona">你好，儿童最好从3岁开始，每半年涂一次，直到6岁为止。</p>
				<p class="p3 iconq">涂氟有什么作用？</p>
				<p class="p4 icona">你好，涂氟可以起到抑制有害细菌、增强牙齿抵抗力、坚固牙齿、修复蛀牙、减少过敏的作用。</p>
				<p class="p3 iconq">儿童事宜进行窝沟封闭的年龄？</p>
				<p class="p4 icona">你好，窝沟封闭是以预防龋病（虫牙）为主要目的的，因此它主要是针对儿童与青少年新萌出的恒磨牙，一般情况下，6-8岁是最适合做窝沟封闭的年龄。</p>
				<p class="p3 iconq">为什么做窝沟封闭？</p>
				<p class="p4 icona">你好，窝沟封闭后牙齿的窝沟被填平，使牙面变得光滑易清洁，一方面窝沟内原有的细菌断绝了营养的来源，逐渐死亡；另一方面外面的致龋细菌不能再进入，能够有效防龋。</p>
				<p class="p3 iconq">儿童多长时间需要进行一次齿科检查？</p>
				<p class="p4 icona">你好，建议每隔3个月、6个月，或1年复查。</p>
				<p class="p3 iconq">什么情况下不建议进行窝沟封闭或涂氟？ </p>
				<div class="p4 icona">
					你好，以下情况不建议为未满14岁儿童进行窝沟封闭或涂氟，具体请遵从医嘱：
					<p class="p5">1）对树脂或其他任何成分过敏。</p>
					<p class="p5">2）溃疡性牙龈炎。</p>
					<p class="p5">3）口腔炎。</p>
					<p class="p5">4）支气管哮喘。</p>
				</div>
				
			</div>
  </div>
 		</div>
 		<div v-if="source=='1'">
			<!--产品介绍-->
		  <div class="product_info" id="product_infoall">
		  		<div id="product_info"></div>
				<p class="p_all">
					   本产品包括建立专属口腔档案、口腔全面检查、超声波洁牙和口腔全景片检查，四项服务，各一次。
				</p>
				<p class="p1f">
					1．建立客户专属档案，指为每位客户建立专属的口腔健康档案。
				</p>
				<p class="p1">
					2．口腔全面检查，即口腔专科一般检查，包括：咬合关系检查、牙周检查、颞颌关节检查、一对一口腔宣教。
				</p>
					<p class="p1">
					3．超声波洁牙，又名龈上洁治术（俗称洗牙），指用洁治器械去除龈上牙石，菌斑和色泽并磨光牙面，以延迟菌斑和牙石的再沉积。包括超声龈上洁治、抛光、冲洗、国产上药（碘甘油）。
				</p>
					<p class="p1 p1b">
					4．口腔全景片，又叫曲面断层片，是利用仪器提供各种的X光射线给牙齿，牙周，整个口腔结构及头颅“拍照”，一次拍摄即将全口牙齿和颌骨的影像清晰的显示在一张X光片上，目的是精确测定牙齿倾斜角度、牙周软组织情况、牙根情况、牙槽骨质情况，解剖形态的精确测量为医生术前的诊断分析与设计提供全景样图像依据。
				</p>
				<div class="sergap"></div>
		  </div>
		  <!--服务说明-->
		  <div class="serve_info" id="serve_infoall">
		  	<div id="serve_info"></div>
				<p class="ptitle">1．产品有效期</p>
				<p class="ptp">1年，自《微医保》保单生效之日起至保单终止日止，有效期内预约有效。保单失效或退保，服务权益失效，将不再可预约。</p>
				<div class="sergap"></div>
				<p class="ptitle">2．服务对象</p>
				<p class="ptp">仅限投保《微医保》保险产品的被保险人本人。</p>
				<div class="sergap"></div>
				<p class="ptitle">3．查询方式</p>
				<p class="p1f">微保为本服务权益查询、服务预约的唯一入口。</p>
				<p class="p1 p1b">客户也可拨打微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>进行服务权益查询</p>
				<div class="sergap"></div>
				<p class="ptitle">4．咨询及投诉</p>
				<p class="p1f weit">1）咨询及投诉方式</p>
				<p class="p1">客户可拨打微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>对本服务相关事项进行咨询或投诉。</p>
				<p class="p1 weit">2）咨询及投诉内容</p>
				<p class="p1 p1b">客户可就本服务的权益获取方式、服务内容、服务基本流程、诊所信息、相关注意事项等进行咨询。若你服务体验异常，如预约响应超时、系统无法预约、诊所爽约、服务延时、服务遗漏、过度营销、医疗事故等问题，可进行投诉。</p>
				<div class="sergap"></div>
				<p class="ptitle">5．咨询及投诉时间</p>
				<p class="ptp">人工服务基础工作时间为8点至20点，每周工作7天。20点至次日8点为语音提示时间。</p>
				<div class="sergap"></div>
				<p class="ptitle">6．服务流程</p>
				<p class="p1f weit">1）提交预约</p>
				<p class="p1">— 预约提交方式</p>
				<p class="p2">客户通过微保入口，链接泰康健康齿科服务预约平台进行预约。</p>
				<p class="p1">— 预约提交内容</p>
				<p class="p2">客户基本信息：我们会根据保单号信息自动带出被保险人的身份信息，客户需填写联系方式，以便诊所联系沟通。</p>
				<p class="p1">— 诊所营业时间</p>
				<p class="p2">客户可参考预约平台上显示的诊所营业时间进行服务预约，一般为9：00~18：00。</p>
				<p class="p1">— 服务预约时间</p>
				<p class="p2">客户预约时，可根据预约平台上展示的可预约时段进行预约，一般需至少提前1-5日提交订单，最久可提前的预约时间为1个月。</p>
				<p class="p1 weit">2）预约确认</p>
				<p class="p1">若你在诊所营业时间内提交订单，诊所将在30分钟内响应订单需求，并在1小时内完成处理；若你在诊所非营业时间提交订单，诊所将在下一个工作日营业时间30分钟内响应订单需求，并在1小时内完成处理。</p>
				<p class="p1">若你选择的诊所服务时段无法满足，诊所将在时效内与你联系，协商其他服务时间。若你提供的联系方式有误，或诊所长时间无法与你联系上，我们将先自动为你取消预约订单，并为你发送微信服务通知，提醒你重新选择预约。预约时间确认后，我们将以微信服务通知方式正式通知你。</p>
				<p class="p1 weit">3）诊前提醒</p>
				<p class="p1">在你就诊前一天上午十点，我们将再次给你发送微信服务通知，提醒就诊安排及相关注意事项。</p>
				<p class="p1 weit">4）预约取消</p>
				<p class="p1">若你因特殊情况无法按时就诊，请在就诊前一日24时前，在预约平台进行预约取消，约定的就诊当日0点后将不再支持预约取消。如你未按规定进行取消，且未到店使用服务，本服务权益自动作废，因此产生的损失我们将不承担责任，敬请谅解。</p>
				<p class="p1 weit">5）到店服务</p>
				<p class="p1">你应按确认的预约时间前往诊所接受服务，并在前台出示身份证明以确认身份。否则无法享受服务，因此造成的损失，我们将不承担责任，敬请谅解。</p>
				<p class="p1 weit">6）服务放弃</p>
				<p class="p1">若因实际情况，你无法使用或选择放弃部分服务内容，需在诊所书面确认。</p>
				<p class="p1 weit">7）档案管理</p>
				<p class="p1">你在诊所接受服务，并拍摄口腔全景照片后，诊所将上传口腔全景片，你可通过预约平台进行查阅。</p>
				<p class="p1 weit">8）服务加项</p>
				<p class="p1 p1b">我们严禁诊所在服务过程中对客户进行二次营销。但若你因自身需要，要求诊所提供进一步齿科服务，诊所可根据客户需求及实际情况，酌情提供相关服务，并且诊所应在提供服务前，在客户口腔健康档案中明确记录相关事项，并需得到你的签字确认。</p>
		  		<div class="sergap"></div>
		  </div>
		  <!--常见问题-->
		  <div class="question" id="questionall">
		  	<div id="question"></div>
					<!--常见问题-->
			<p class="ptitle">常见问题</p>
			<div class="questions">
				<p class="p3 iconq"><!--<span class="iconq"></span>-->可以直接到诊所不预约吗？ </p>
				<p class="p4 icona"><!---->
					你好，本服务为预约式服务，就诊前你必须与诊所预约确认就诊时间。如未预约直接到诊所就诊，我们将无法提供本服务。</p>
				<p class="p3 iconq">我到诊所要带什么吗？</p>
				<p class="p4 icona"> 你好，就诊时需向诊所出示预约成功的微信服务通知，并出示你本人身份的有效证件。</p>
				<p class="p3 iconq">在全国都有诊所网点吗？</p>
				<p class="p4 icona"> 你好，全国一二线城市均有合作诊所，并且在不断更新扩充中。如你所在城市暂无合作诊所，请选择已开通诊所的城市申请服务或咨询客服微医保专属服务热线<a class="telc" href="tel:400-069-5522">400-069-5522</a>。</p>
				<p class="p3 iconq">我是第一次洗牙需要注意哪些事项？</p>
				<p class="p4 icona">你好，洗牙时间可能会稍长，洗牙后最好不要喝有色饮料，如茶、咖啡等，洗牙后医生也会提醒你的，请遵医嘱即可。</p>
				<p class="p3 iconq">洗牙后牙齿会松动吗？</p>
				<p class="p4 icona">你好，对于健康的牙齿，洗牙不会导致牙齿松动。如果洗牙后出现牙齿松动的症状，则非洗牙所致，而是患者本来已有牙周病，牙槽骨已吸收，牙齿早已松动。牙结石的“夹板效应”使牙齿得到“支撑”假象，牙石被“洗掉”后，重新出现了松动。</p>
				<p class="p3 iconq">洗牙会损伤牙齿吗？</p>
				<p class="p4 icona">你好，洗牙是通过超声波高频振动将牙石击碎，超声洗牙机头本身对牙齿没有切削功能，洗牙是不会损伤牙齿的。</p>
				<p class="p3 iconq">拍全景片有什么用？可以不拍吗？</p>
				<p class="p4 icona">你好，拍全景片是可以精确测定牙齿倾斜角度、牙周软组织情况、牙根情况、牙槽骨质情况，可以让医生全面的了解你的口腔状况。如果你有所顾虑，也可以选择放弃，诊所会尊重你的意愿。如选择放弃全景片，请你在诊所签署放弃声明。</p>
				<p class="p3 iconq">洗牙后牙齿是否会变的敏感？ </p>
				<p class="p4 icona">你好，因洗牙前牙结石长期存在而导致牙龈萎缩，洗牙后牙结石被清除，可能牙根有部分暴露出来，让牙齿变得有些许敏感，故洗牙后不能吃刺激性食物。2-3天后可恢复正常饮食。</p>
				<p class="p3 iconq">洗牙后为什么我牙缝变大了？ </p>
				<p class="p4 icona">你好，因为洗牙前牙结石长期存在而导致牙龈萎缩，洗牙后牙结石被清除，可能让你感觉牙缝变大。</p>
				<p class="p3 iconq">什么情况下不能洗牙？  </p>
				<div class="p4 icona">
					你好，一般存在以下几种情况的，不建议进行洗牙，具体请遵从医嘱：
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
      var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));//  获取ordersession对象
      if(orderInfo)this.source = orderInfo.source;
	  document.body.addEventListener("scroll",this.init);
	  this.reloadfun();//刷新后的scrollTop方法
    },
    destroyed(){
		document.body.removeEventListener("scroll",this.init);//销毁scroll
    },
    methods:{
    	init(){
//		$(document).ready(function () {//首次进入页面未加载方法
//			$('body').scroll(function () {
    			//console.log('2222');
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
//          });
//         });
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
.iconq{padding-left:1.17rem;background: url(../../assets/images/order/Q.png) 0 3px no-repeat;background-size:0.83rem 0.83rem;}
.icona{padding-left:1.17rem;background: url(../../assets/images/order/A.png) 0 3px no-repeat;background-size:0.83rem 0.83rem;}
.p5{padding-top: 0.38rem;}
.child{color: #fd9d2c;}
</style>