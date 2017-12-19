<!-- 个险预约页面
@ wyz
功能：预约信息提交
1、预约人身份信息查询；2、预约信息填充；3、提交预约请求
 -->
<template>
  <div class='toOrder'>
    <!--------------------基本信息---------------->
    <div class='basemsg'>
      <div class="orderInfo">
        <p class="errtip">{{tipWords}}</p>
        <div class='tipsMsg padd083'>
          <p class="fs078">预约服务</p>
        </div>
        <div @click="toCheckHospital" v-if="hospitalName == ''">
          <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title "><span class="mint-cell-text">预约门诊</span></div>
              <div class="mint-cell-value">
                <span type="text" class="timeInput myblurs padd0 cd2">请选择门诊</span>
              </div>
            </div>
            <div class="mint-cell-allow-right pro"></div>
          </a>
        </div>
        <div class="fsqqq" @click="toCheckHospital" v-else>
          <a class="mint-cell minthg">
            <div class="menzh mint-cell-wrapper paddl0 title_r">
              <div class="fs089 left positop">
                <span class="c4e fs089 fx">预约门诊</span>
              </div>
              <div class="right lright mint-cell-value">
                <div class="toCheck timeInput">
                  <div class="lineh1">{{hospitalName}}</div>
                  <div class="fs078 c9a lineh2">
                    {{hospitalAddr}}
                  </div>
                </div>
              </div>
              
            </div>
          </a>
        </div>
        <div class='pro_content'>
            <div class="pro_title" @click='toServeContent()'>
                              服务内容
            </div>
          <ul class='pro_txt'>
            <li class='s_first'><span class='s_content'>建立专属口腔档案 </span><span class='s_content'>口腔全面检查1次</span></li>
            <li><span class='s_content'>口腔全景摄片1张 </span><span class='s_content'>超声洁牙抛光1次</span></li>
            <!--<li v-show="orderInfo.source=='14'"><span>窝沟封闭2颗牙或全口涂氟（二选一）</span></li>-->
          </ul>
        </div>
      </div>
      <div class='tipsMsg padd083'>
        <p class="fs078">就诊人信息</p>
      </div>
      <div class='userMsg'>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title "><span class="mint-cell-text">姓名</span></div>
            <div class="mint-cell-value">
              <span class="mint-field-core phone myblur fs089 c4e">{{user.patientName}}</span>
            </div>
          </div>
        </a>
        <p class="line_p"></p>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><span class="mint-cell-text">身份证</span></div>
            <div class="mint-cell-value">
              <span class="mint-field-core phone myblur fs089 c4e">{{user.cardNo}}</span>
            </div>
          </div>
        </a>
        <p class="line_p"></p>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper nobord">
            <div class="mint-cell-title"><span class="mint-cell-text">手机号</span></div>
            <div class="mint-cell-value cursor_module" @click="openKey()">
              <div class="mint-field-core phone fs089 phc c4e p_cursor">{{mobile}}<s class='hid_s'><i v-if='isOpenKey'>0</i>{{mobile}}</s></div>
              <img src="../../../assets/images/order/order_war.png" class='errbtn' alt="" />
            </div>
          </div>
        </a>
      </div>
      <div class='tipsMsg1'>
        <p class="fs067">手机号为预约审核电话，请确保填写正确</p>
        <span class="triangle-up"></span>
      </div>
      <div class="toCheckTime" @click='toCheckTime'>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper nobord">
            <div class="mint-cell-title "><span class="mint-cell-text">预约时间</span></div>
            <div class="mint-cell-value">
              <span type="text" class="timeInput myTime padd0 cd2">{{bookDateTime}}</span>
            </div>
          </div>
          <div class="mint-cell-allow-right pro"></div>
        </a>
      </div>
      <!--基本信息===end===-->
      <div class='serve padd083'>
        <div class=" mint-cell-title">
          <i class='icon icon1' :class="{check:isCheck}" @click='checkTip()'></i> 我已了解并确认<a @click='toServeNotice' class="c2f">服务知情同意书</a>
        </div>
      </div>
    </div>
    <!----------输入手机号弹出层---------->
    <mt-popup v-model="isOpenKey" position="bottom" :modal='false'>
      <ul class='key_body'>
        <li v-for='(n,i) in keyInfo' class="k_item" @touchstart='inputTel(n,i)' v-if='i < 11':id="'key'+n">{{n}}</li>
        <li class="k_item" @touchstart='gtouchStart(i)'@touchend='gtouchend(n,i)' v-else :id="'key'+n">{{n}}</li>
      </ul>
    </mt-popup>
    <div @click='closeKey' class="key_modal" v-if='isOpenKey'style="z-index: 1000;"></div>
    <!--底部按钮-->
    <footer class='loging'>
      <input type="button" value='提交' disabled="disabled" class='loginact' @click='toOrderAct' />
    </footer>
    <div class="fheight" style="height: 2.78rem;">
    		
    </div>
    <!--底部按钮==end===-->
  </div>
</template>

<script>
  import API from '../../../api/API'
  const api = new API();
  import $ from 'jquery'
  import { config_param } from '../../../assets/js/config_param'
  import { tkWX } from '../../../assets/js/wxConfig.js'
  import { MessageBox, Indicator, Toast, DatetimePicker } from 'mint-ui'
  import { getUrl, hideaddress } from '../../../assets/js/BaseJS.js'
  export default {
    name: 'toOrder',
    data() {
      return {
        isCheck: false, // 服务同意书是否勾选
        hospitalName: '',
        hospitalAddr:'',
        productName: '',
        mobile: "请输入手机号",
        user: {
          "patientName": "",
          "cardNo": "",
          "age":""
        }, //输入信息对象
        orderTime: {
          "encounterDate": ""
        }, //预约时间对象
        phoneflag: false, // 电话号码校验状态
        tipWords:'',
        orderInfo: {},
        source:'',
        bookDateTime: '请选择预约时间',
        orderFlag: 1, // 是否已经预约的状态
        isCheckStore: false, // 是否已选门诊
        isOrder: false, // 即将跳转预约页面
        isOpenKey: false, // 是否输入电话号码
        keyInfo: [], // 键盘内容
        selfClose: false,// 手动点击弹层
        timeOutEvent:0,//定时器   
        longdel:'',// 长按删除
        onLoadFlag:false,// onLoadFlag标记
      }
    },
    beforeRouteLeave:(to, from, next) => {
      if(sessionStorage.getItem('back_ticketURI')){//返回卡券标记
          var back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
          if(back_ticketURI=='1'){//返回卡券
              if(config_param.isLog)console.log('卡券');
              next(false);
              sessionStorage.setItem('back_ticketURI','0');
//			      tkWX.closeWindow();
			      window.location.href=encodeURI('http://js2ios/?param='+JSON.stringify({"functionname":"toothsevieceback","success":"onSuccess","error":"onError","args":["toothsevieceback"]}));
          }else{
              next();
          }
      }else{
          next()
      }
    },
    beforeCreate() {
      document.title = '预约';sessionStorage.setItem('back_ticketURI','1');
    },
    created() {tkWX.init({});},
    mounted() {
      sessionStorage.setItem('backFlag', false)// 是否为医院列表返回城市页
      sessionStorage.setItem('back_ticketURI','1')
      this.fillOrderPage(); // 填充预约页面
      $(document).height($(window).height())
      this.showbtn();
      this.anios();
      $('.key_body').on('touchstart',function(e) { 
          e.preventDefault(); 
      })
    },
    methods: {
      // 填充预约页面
      fillOrderPage: function() {
        this.backFlag = JSON.parse(sessionStorage.getItem('isCheckStore')) || false // 页面是否是返回页面
        var url = window.location.href; // 当前路由
        var linkUrl = getUrl(url); // 解析路由为JSON格式
        var orderInfo;
        if(this.backFlag == false) {
          orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
        }
        orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
        this.orderInfo = orderInfo; //  获取ordersession对象
        // 初始填充医院站点
        if(orderInfo.hospitalName) {
          this.hospitalName = orderInfo.hospitalName
          this.hospitalAddr = orderInfo.orgAddress
        } else {
          this.hospitalName = ''
        }
        // 初始填充预约时间
        if(orderInfo.orderTime == undefined) {
          this.bookDateTime = "请选择预约时间";
        } else {
          if(orderInfo.orderTime.encounterDate != undefined) {
            this.bookDateTime = orderInfo.orderTime.bookTime + " " + orderInfo.orderTime.startTime
            $('.myTime').removeClass('cd2').addClass('t_c4e');
          }
        }
        // 初始填充验证手机号码
        if(orderInfo.mobile != undefined) {
          this.mobile = orderInfo.mobile
          this.phoneBlur();
        } else {
          if(this.mobile == '请输入手机号') {
            $('.p_cursor').addClass('pcd2')
          }
        }
        
        if(config_param.isLog)console.log(orderInfo.user);
        // 填充页面用户信息
        if(orderInfo.user) {
            this.user = orderInfo.user
            // 是否跳转页面
            if(this.orderInfo.orderId && this.orderInfo.orderId.length){
              this.onLoading();
            }
          } else {
            this.fillOrderInfo();
          }
        this.isCheck = this.orderInfo.isCheck?this.orderInfo.isCheck:false;// 服务同意书是否已选
        this.onLoadFlag = this.orderInfo.onLoadFlag?this.orderInfo.onLoadFlag:false;// 是否有订单详情
      },
      // 填充客户身份信息
      fillOrderInfo: function() {
        let _this = this;
        var param = {
          "platform": "HealthManage", // 平台
          "policyNo": _this.orderInfo.policyNo, // 保单号
          "cpnTicketNo": _this.orderInfo.cpnTicketNo // 卡券号 920修改卡券名称cpnTicketNo
        }
        let response = api.getCorePolicyDetail(param); // 根据保单号获取用户详情
        response.then(function(res) {
          if(config_param.isLog) console.log(res);

          if(res.status == '200') {
            var data = res.data.data
            if(data == null) {
              Toast({
                message: res.data.message,
                duration: 1000,
                className: 'mToast'
              })
            }
            _this.user.patientName = data.insuredName; // 页面展用户姓名
            _this.user.cardNo = data.identifyNumber; // 页面展示身份证号
            _this.user.aesInfo = data.aesInfo; // 加密身份证号
            _this.user.identifyTypea = data.identifyTypea; // 证据类型
            _this.user.age = data.age; // 被保人年龄 
            if(config_param.isLog)console.log(_this.user.age)
            _this.orderInfo.source = '1'
            // 是否跳转页面
            if(_this.orderInfo.orderId && _this.orderInfo.orderId.length ){
              _this.onLoading();
            }
            _this.orderInfo.user = _this.user;
            sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo))
          } else {
            if(res.data.message) {
              Toast({
                message: res.data.message,
                duration: 1000,
                className: 'mToast'
              })
            }
          }
        }).catch(function(err) {
          if(config_param.isLog)console.log(err);
//        window.location.replace("#/common/errorPage");
        });
      },
      // 是否跳转页面
      onLoading:function(orderId,channel){
        var that = this;
        that.orderId = orderId;//||'15785';
        var param = {
          "orderId":that.orderInfo.orderId,//截取URL
          "channelType":that.orderInfo.channelType
        }
        var parResult = api.selectOrder(param);
        parResult.then(function(res){
          var data = res.data;
          if(config_param.isLog)console.log(data)
          if(data.status=="1"){
            var orderMsg = data.data;
            var omstate = orderMsg.orderState;
            if(omstate=="4" ||omstate=="0"){// 已经预约
              sessionStorage.setItem('back_ticketURI','0')
              window.location.href = "#/gx/user/orderDetail?orderId=" +that.orderInfo.orderId + "&policyNo=" + that.orderInfo.policyNo + '&channelType=' + that.orderInfo.channelType + '&cpnTicketNo=' + that.orderInfo.cpnTicketNo
            }else if(omstate=="3"||omstate=="1"){// 已完成
              sessionStorage.setItem('back_ticketURI','0')
              window.location.href='#/gx/user/evalFill?orderId='+that.orderInfo.orderId+'&policyNo='+that.orderInfo.policyNo+'&channelType='+that.orderInfo.channelType+'&cpnTicketNo='+that.orderInfo.cpnTicketNo
            }else if(omstate=="5"){// 爽约
              sessionStorage.setItem('back_ticketURI','0')
              window.location.href='#/gx/user/unorder?orderId='+that.orderInfo.orderId
            }else if(omstate=="2"){ // 取消预约
              if(orderMsg.orgSource==1){// orgSource==1 为乐牙
                
              }else{
                // 展示订单详情的出参
                if(config_param.isLog)console.log(orderMsg.serviceType,that.orderInfo.source);
                if(that.orderInfo.hospitalName){// session中没有选择医院时使用接口数据填充页面医院
                  
                }else{
                  if(orderMsg.serviceType == that.orderInfo.source){
                    that.hospitalName = orderMsg.orgName
                    that.hospitalAddr = orderMsg.orgAddress
                  }else{
                    that.hospitalName = ''
                  }
                  that.mobile = orderMsg.mobile
  
                  that.orderInfo.hospitalId = orderMsg.orgId
                  that.orderInfo.doctorId = orderMsg.doctorId
                  that.orderInfo.mobile = orderMsg.mobile
                  that.orderInfo.contactTel = orderMsg.contactTel
                  that.orderInfo.hospitalName = orderMsg.orgName
                  that.orderInfo.orgAddress = orderMsg.orgAddress
                  that.orderInfo.orgCode = orderMsg.orgCode
                  that.orderInfo.orgSource = orderMsg.orgSource
                  that.orderInfo.onLoadFlag = true;
                  $('.p_cursor').removeClass('pcd2')
                  sessionStorage.setItem('isCheckStore',true)
                  sessionStorage.setItem('orderInfo', JSON.stringify(that.orderInfo))
                }
                
              }
              
//            that.bookDateTime = orderMsg.encounterDate.replace('-','.')+" "+orderMsg.beginTime
//            $('.myTime').removeClass('cd2').addClass('t_c4e');
//            window.location.href='#/gx/order/toOrder?policyNo='+that.policyNo+'&channelType='+channel+'&cpnTicketNo='+cpnTicketNo
            }
          }else{
            Toast (data.message);
          }
        })
      },
      // 去服务内容页面
      toServeContent:function(){
        sessionStorage.setItem('back_ticketURI','0')
        window.location.href = '#/gx/order/serveContent'
      },
       // 服务知情同意书
      toServeNotice:function(){
        sessionStorage.setItem('back_ticketURI','0')
        window.location.href = '#/gx/order/agreeServe'
      },
      // 去选择医院信息
      toCheckHospital: function() {
        sessionStorage.setItem('isCheckStore', true)
        if(this.orderInfo.cityId && this.onLoadFlag==false) {
          sessionStorage.setItem('back_ticketURI','0')
          window.location.href = "#/gx/order/checkStation"
        } else {
          if(this.orderInfo.channelType) {
            sessionStorage.setItem('back_ticketURI','0')
            window.location.href = "#/gx/order/Place"
          } 
        }
      },
      // 去选择预约时间
      toCheckTime: function() {
        if(this.orderInfo.hospitalId) {
          sessionStorage.setItem('back_ticketURI','0')
          window.location.href = "#/gx/order/checkTime"
        } else {
          $('.errtip').html("请先选择预约门诊信息");
          $('.errtip').show();
          setTimeout(function(){$('.errtip').hide()},1500);
        }
      },
      // css设置
      anios: function() { //判断移动设备，更改样式
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        /*position: absolute;top: 0;left:0;z-index:20;*/
        if(isAndroid){
          $('.toOrder').css({'position':'absolute','top': '0','left':'0'})
        }
        if(isiOS) { // ios系统样式设置
          $('.toCheck').css('top', '28%')
          $('.myblur').blur();
        }
      },
      // 提交按钮显示状态更改
      showbtn: function() {
//      if(this.isCheck == true && this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) { // 手机验证通过且已选体检时间 按钮可用
        if(this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) { // 手机验证通过且已选体检时间 按钮可用
          $('.loginact').attr('disabled', false)
          $('.loginact').css('background-color', '#f49e23');
        }
//      if(this.isCheck == false || this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) { // 手机验证失败或未选体检时间 按钮置灰
        if(this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) { // 手机验证失败或未选体检时间 按钮置灰
          $('.loginact').css('background-color', '#ffd18d');
          $('.loginact').attr('disabled', "disabled")
        }
        return true;
      },
      // 输入电话号码
      inputTel: function(n, id) {
        var len = (this.mobile).length
        $('.hid_s')[0].offsetWidth
          
        if(id != 9 && id != 11 && len < 11) {
          this.mobile = this.mobile + n;
          $('.cursor').css('left', $('.hid_s')[0].offsetWidth+1);
          $('#key'+n).addClass('click_num');
          setTimeout(function(){$('#key'+n).removeClass('click_num')},150);
        }
      },
      // 点击删除键
      gtouchStart:function(id){
        if(id == 11) {
          let _this = this;
          _this.timeOutEvent = setTimeout(function(){
            _this.longPress()
            },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        
          return false;
        }
      },
      // 放开删除键
      gtouchend:function(n,id){
        var len = (this.mobile).length
        if(id == 11){
          let _this = this;
          clearTimeout(_this.timeOutEvent);//清除定时器   
          clearInterval(_this.longdel);// 清除长按删除
          if(_this.timeOutEvent!=0){   
              //这里写要执行的内容（尤如onclick事件）   
            if(len > 0) {
              _this.mobile = _this.mobile.slice(0, len - 1);
              $('.cursor').css('left', $('.hid_s')[0].offsetWidth-16);
            }
          }   
          return false;
        }
      },
      // 长按删除键
      longPress:function(){
        let _this = this;
        _this.timeOutEvent = 0;   
        //执行长按要执行的内容，如弹出菜单   
        var len = (_this.mobile).length
          if(len > 0){
            _this.longdel = setInterval(function(){
                _this.mobile = _this.mobile.slice(0, --len);
                $('.cursor').css('left', $('.hid_s')[0].offsetWidth-16);
                if(len==0)clearInterval(_this.longdel);// 清除长按删除
            },100)
          }else{
            clearTimeout(_this.timeOutEvent);//清除定时器
            clearInterval(_this.longdel);// 清除长按删除
          }
      },
      // 关闭键盘
      closeKey: function() {
        let _this = this;
          $('.cursor').remove();// 移除光标
          _this.isOpenKey = false;
          _this.selfClose = true; // 手动点击弹层
          _this.phoneBlur();
          $("html, body").animate({scrollTop: 0}, { duration: 500, easing: "swing" })
      },
      // 打开键盘
      openKey: function() {
        this.isOpenKey = true;
        setTimeout(function() {$('.v-modal').attr("style","opacity: 0")}, 1);
        $('.p_cursor').after("<i class='cursor'></i>");
        var top_h = $('.p_cursor')[0].offsetHeight; // 手机号码元素高度
        $('.p_cursor').removeClass('pcd2')
        if(this.phoneflag == false && this.mobile != '请输入手机号') {
          $('.cursor').css({'left':$('.hid_s')[0].offsetWidth })
        }else if(this.phoneflag == true && this.mobile != '请输入手机号'){
          $('.cursor').css({'left':$('.hid_s')[0].offsetWidth})
        }else{
          if(this.selfClose == false) {this.mobile = ''; }
        }
        if(this.selfClose == true) {$('.cursor').css('left', $('.hid_s')[0].offsetWidth); }
        $("html, body").animate({scrollTop: 150}, { duration: 500, easing: "swing" })
//      $("html, body").css('padding-bottom',150)
        var delimg = "<img src = '../../../assets/images/order/key_delete.png'>"
        var tel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', "space", '0', 'del'];
        this.keyInfo = tel;
        $("#key11").append(delimg)
      },
      // 验证手机号
      phoneBlur: function() {
        this.mobile = $.trim(this.mobile)
        var phone = this.mobile;
        if(phone == '') {
          $('.p_cursor').removeClass('pcd2')
          this.phoneflag = false;
        } else {
          if(!(/^1[34578]\d{9}$/.test(phone))) {
            this.phoneflag = false
          } else {
            this.phoneflag = true
          }
        }
        if(this.phoneflag == false) {
          this.tipWords = '请输入正确的手机号'
          var _this = this;
          $('.errtip').show();$('.errbtn').show();
          setTimeout(function(){_this.tipWords='';$('.errbtn').hide();$('.errtip').hide()},1500);
          $('.phc').addClass('c6e');
        } else {
          $('.errtip').hide();
          $('.errbtn').hide();
          $('.phone').removeClass('errNum');
          $('.phc').removeClass('c6e');
        }
        this.orderInfo.mobile = this.mobile
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
        this.showbtn();
      },
      // 勾选服务同意书
      checkTip: function() {
        this.isCheck = !this.isCheck
        this.showbtn();
//      if(this.isCheck == false) {
//        this.tipWords = "请先阅读并同意服务知情同意书"
//        var _this = this;
//        $('.errtip').show();
//        setTimeout(function(){_this.tipWords='';$('.errtip').hide()},1500);
//      }
        if(this.isCheck == true) {$('.errtip').hide();}
        this.orderInfo.isCheck = this.isCheck
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
      },
      // 去预约
      toOrderAct: function() {
        this.phoneBlur();
        if(this.isCheck == false) {
          Toast({message:'请先阅读并同意服务知情同意书',duration: 1500,className: 'mToast'})
//        $('.errtip').html("请先阅读并同意服务知情同意书");
//        $('.errtip').show();
//        setTimeout(function(){$('.errtip').hide()},1500);
        }
        let _this = this;

        if(_this.user.cardNo == "") { // 未请求到体检人信息提示
          Toast({ message: "未查到您的身份信息"});
          return false;
        }
        if(config_param.isLog) console.log(_this.orderInfo)
        var param = {
          "contactTel": _this.orderInfo.contactTel, // 机构电话
          'orgAddress': _this.orderInfo.orgAddress, // 机构地址
          "doctorId": _this.orderInfo.doctorId,
          "encounterDate": _this.orderInfo.orderTime.encounterDate,
          "endTime": "", //_this.orderInfo.orderTime.endTime,
          "hospitalId": _this.orderInfo.hospitalId,
          "hospitalName": _this.orderInfo.hospitalName,
          "orgSource": _this.orderInfo.orgSource, // 机构来源
          "orgCode": _this.orderInfo.orgCode?_this.orderInfo.orgCode:'', // 第三方平台医院id
          "idCardNo": _this.user.cardNo, // _this.user.cardNo
          "idType": _this.user.identifyTypea, // 证件类型
          "aesInfo": _this.user.aesInfo,
          "mobile": _this.mobile,
          "patientName": _this.user.patientName,
          "startTime": _this.orderInfo.orderTime.startTime,
          "timeSlotId": _this.orderInfo.orderTime.timeSlotId,
          "twtId": _this.orderInfo.policyNo != null ? _this.orderInfo.policyNo : "",
          "wesurePolicyNo":_this.orderInfo.wesurePolicyNo != null ? _this.orderInfo.wesurePolicyNo: _this.orderInfo.policyNo,// 微宝内部保单号
          "channelType": sessionStorage.getItem('channelType'), //   _this.orderInfo.channelType,//渠道类型
          //          "ticketNo":_this.orderInfo.ticketNo// 卡券号
          "ticketId": _this.orderInfo.cpnTicketNo, // 卡券号 920修改卡券名称cpnTicketNo  922将提交卡券号改为ticketId
          "source":_this.orderInfo.source // 套餐类别1--洗牙 6--14岁以下
        }
        if(_this.orderFlag > 1) {
          Toast({ message: "您已提交预约，请勿重复操作"})
        }
        if(_this.isCheck == true && _this.phoneflag == true && _this.bookDateTime != "" && _this.orderFlag == 1) {
          let response = api.order(param);
          ++_this.orderFlag;
          _this.showbtn();
          response.then(function(res) {
            if(config_param.isLog) console.log(res);
            if(res.data.status == '1') {
              _this.orderInfo.orderId = res.data.orderId;
              _this.orderInfo.tradeNo = res.data.tradeNo;
              sessionStorage.setItem('isCheckStore', false)
              sessionStorage.setItem('isOrder', true)
              sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo))
              $('.loginact').attr('disabled', "disabled")
              setTimeout(function() {
                sessionStorage.setItem('back_ticketURI','0')
                window.location.href = "#/common/enterRouter?page="+encodeURIComponent("gx/user/orderDetail&orderId=") + res.data.orderId + "&policyNo=" + _this.orderInfo.policyNo + '&channelType=' + _this.orderInfo.channelType + '&cpnTicketNo=' + _this.orderInfo.cpnTicketNo+'&wesurePolicyNo='+ _this.orderInfo.wesurePolicyNo;
              }, 100)

            } else {
              //按钮点亮
              _this.orderFlag = 1
              _this.showbtn();
              if(res.data.message) {
                Toast({message: res.data.message,duration: 1000,className: 'mToast'})
              } else {
                Toast({message: "发生内部错误",duration: 1000,className: 'mToast'})
              }

            }
          }).catch(function(err) {
            //按钮变亮
            _this.orderFlag = 1
            _this.showbtn();
            if(config_param.isLog)console.log(err);
//          window.location.replace("#/gx/common/errorPage");
          });
        }

      }

    }
  }
</script>

<style stoped>
  @import '../../../assets/css/gx/order.css'
</style>