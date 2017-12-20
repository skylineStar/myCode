<template>
  <div class="containerBox ">
    <div style="padding-bottom: 50px;">
      <div class="mui-content">
        <div class="panelTop1">
          <ul class="proInfo">
            <li >
              <span class="leftText line1_L">名称</span>
              <span class="rightText line1_R">{{baseData.productname}}</span>
              <div class="clear"></div>
            </li>
            <li>
              <span class="leftText line2_L">数量</span>
              <!--<div class="mui-numbox rightText line2_R">
                <button class="mui-btn mui-btn-numbox-minus blue" type="button" @click="changeNumber(-1)">-</button>
                <input class="mui-input-numbox blue selectnum" type="number" name="numname" v-model="num" min='1'onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" @keyup="changeNum ()" @blur="changeNums ()"/>
                <button class="mui-btn mui-btn-numbox-plus blue" type="button" @click="changeNumber(1)">+</button>
              </div>-->
              <div class="fenshu">	
              	<span class="nocheckClass1 yescheckClass1" @click="fenshuFn(1)">1份</span>
              	<span  class="nocheckClass1" @click="fenshuFn(2)">2份</span>
              	<span class="nocheckClass1" @click="fenshuFn(3)">3份</span>
              </div>
              <div class="clear"></div>
            </li>
          </ul>
          <div class="pricePanel">
            <span class="leftText priceLine1">价格</span>
            <!--<div class="rightText Number">
              <span class="nowPrice1 blue">￥{{totalPrice}}</span>
              <span class="prePrice2 c999999"><s>￥{{totalOriginalPrice}}</s></span>
              <span class="shengPrice3" style="color: #ffbf26;">优惠：￥{{totalOriginalPrice - totalPrice}}</span>
            </div>-->
            <div v-show="isMemberPrice.yesorno==='0'">
            	<p class="buy_p1">¥{{totalOriginalPrice}}</p> 
            	<p class="buy_p2">会员价：¥{{totalPrice}}</p> 
            		<p @click="bemember" style=" margin-top:0.1rem;text-decoration:underline;font-size: 0.7rem;color:#5c9edc;text-align: right;" id="member">
            	<img src="../../../../static/img/vip.png" style="width: 0.944rem;height:0.694rem;margin-bottom: -0.06rem;"/>
            			点我成为泰康会员，享受超值会员价
            		</p>
            </div>
            <div v-show="isMemberPrice.yesorno==='2'||shengyu.yesorno==='0'">
            	<p style="margin: 5px 0;text-align: right;padding-top: 5%;color: #000;">¥{{totalOriginalPrice}}</p>         
            </div>
            <div v-show="isMemberPrice.yesorno==='1'&&shengyu.yesorno!=='0'">
            	<p style="margin-top:0.5rem;margin-bottom:0;text-align: right;color: #000;"><span style="font-size: 0.69rem;">会员价：</span><span style="font-size: 1.39rem;color:#5c9edc;">¥{{totalPrice}}</span></p>         
            		<p  style="font-size: 0.69rem;color:#ffbf26;text-align: right;margin-bottom: 0;">优惠：¥{{youhuiPrice}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="panelTop2">
        <fieldset class="fieldset_css">
          <legend class="blue fs13">个人信息填写</legend>
            <div class="infoPad">
              <span class="leftPanel cs40">姓名</span>
              <input type="text" name="username" class="rightPanel cs41" placeholder="请输入您的姓名" maxlength="20" v-model="customerName" @blur="validName(customerName)" @focus="keybordFn"
               />
              <div class="clear"></div>
            </div>
            <div class="infoPad">
              <span class="leftPanel cs45">联系电话</span>
              <input type="tel" id="phone" name="phone" class="rightPanel cs46" placeholder="请输入联系电话" v-model="customerPhone" @blur="validPhone(customerPhone)" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" @change="phoneChange()"/>
              <div class="clear"></div>
            </div>
            <div class="infoPad">
              <span class="leftPanel cs50">验证码</span>
              <input type="tel" id="verityCode"  class="centerPanel cs51" placeholder="请输入验证码" name="verityCode" v-model="yzCode"  @blur="validCode(yzCode)"
               />
              <input type="button" id="btnSendCode" class="rightP blue" :value="tipsText" @click="getAuthCode"/>
              <div class="clear"></div>
            </div>
            <div class="tiaoshi infoPad" style="margin-bottom: 0px;">注：手机号码是您接收短信及链接的唯一渠道，请确认您是否正确填写。</div>
        </fieldset>
      </div>
      <div class="invoiceBox">
        <span style="line-height: 250%;">是否开具发票</span>
        <div class="invoiceChoose">
          <span class="fp_n nocheckClass" @click="piaoChooseFn(-1)"
          :class="{'yescheckClass': faPiao2}">
          不开发票
          </span>
           <span class="fp_y nocheckClass" @click="piaoChooseFn(1)"
                 :class="{'yescheckClass': faPiao1}">
            <a class="fapiaoCRoutoer piaoChoose">
              开发票&nbsp;&nbsp;&nbsp;
            </a>
          </span>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="buyPanel positionBottomF">
      <div class="buyPanel_L">
        <!--<div class="heji"><span>合计：</span> <span class="blue">￥{{totalPrice}}</span></div>
        <div class="prePrice"><s>￥{{totalOriginalPrice}}</s></div>-->
        <div class="sumdiv" v-show="isMemberPrice.yesorno!=='1'||shengyu.yesorno=='0'">
        	<div class="heji"><span>合计：</span> <span class="blue">¥{{totalOriginalPrice}}</span></div>
        </div>
        <div class="youhui" v-show="isMemberPrice.yesorno==='1'&&shengyu.yesorno!=='0'" >
        	<div class="members"><span>会员价：</span> <span class="blue mprice">¥{{totalPrice}}</span></div>
        	<div ><s>原价：¥{{totalOriginalPrice}}</s></div>
        </div>
      </div>
      <span class="buyBtn" @click="buyHalthyCard" :class="{'heightLight': heightLight}">立即购买</span>
    </div>
  </div>
</template>
<script>
	import { MessageBox} from 'mint-ui'
	import {hideaddress} from '../../../assets/js/BaseJS.js'
  import $ from 'jquery'
  import { Indicator,Toast } from 'mint-ui'
  import {config_param} from '../../../assets/js/config_param.js'
  import API from '../../../api/API'
  import {bemember} from '../../../assets/js/mealfunc.js'
  const api = new API();
  export default {
    data () {
      return {
      	isMemberPrice:{'yesorno':'0'},//是否已选择会员价
      	shengyu:{'yesorno':'1'},//是否已选择会员价
        "wHeight": '',
        "faPiao1": false,
        "faPiao2": true,
        "num": 1, //
        "heightLight": false,  // true渐变色  false为灰色heightLight controBuyBtnGray
        "customerName": '', // 姓名
        "customerPhone": '', // 手机号
        "yzCode": '', // 表单验证码
        "tipsText": '获取验证码',
        "InterValObj": '',   // timer变量，控制时间
        "count" : 60,         // 间隔函数，1秒执行
        "curCount": '',     // 当前剩余秒数
        "code" : "",         // 验证码
        "baseData":{},
        // 发票
        "invoicetype": "0", // 发票类型 0不开 1普通 2专票
				invoiceInfo:'',
        //必要标记
        // "verityCodeControl": false, // 验证码控制
        "sendCodeed": false,
        "tip1": false, // 控制颜色 条件1
        "tip2": false, // 控制颜色 条件2
        "tip3": false, // 控制颜色 条件3
        "totalPrice":'',
        "totalOriginalPrice":'',
        "youhuiPrice":''
      }
    },
    beforeCreate(){
      document.title = '体检套餐购买';
    },
    mounted () {
			hideaddress();
			this.init();      //初始化
			this.showLineHeight();
      this.wHeight = window.innerHeight;   //获取初始可视窗口高度

    },
    beforeUpdate(){
    	this.totalPrice =this.baseData.orderPrice*this.num;//现价
      this.totalOriginalPrice=this.baseData.originalPrice*this.num;//原价
      this.youhuiPrice=this.totalOriginalPrice-this.totalPrice;//优惠的钱
    },
    methods: {
    	init:function() {
    		//会员储存信息
	  		var isMemberPrice=JSON.parse(sessionStorage.getItem('isMemberPrice'));
	  		this.isMemberPrice = isMemberPrice;
	  		var shengyu=JSON.parse(sessionStorage.getItem('shengyu'));
	  		this.shengyu = shengyu;
	  		// 获取页面信息
	      var homePriceSave=JSON.parse(sessionStorage.getItem('homePriceSave'));
	      this.baseData = homePriceSave;
	      // 获取个人信息及立即购买的tip状态
	      var personData=JSON.parse(sessionStorage.getItem('personalInfo'));
	      if (personData) {
	        this.customerName = personData.customerName;
	        this.customerPhone = personData.customerPhone;
	        this.yzCode = personData.yzCode;
	        this.num = personData.num;
	        this.tip1 = personData.tip1;
	        this.tip2 = personData.tip2;
	        this.tip3 = personData.tip3;
	      }
	     this.numChoose(this.num);//数量选框渲染
	      var currentCont = sessionStorage.getItem('currrentCount');
	      if(currentCont) {//如果有剩余秒数
	        this.curCount = currentCont;
	        sessionStorage.removeItem('currrentCount');
	        this.tipsText = "请在" + this.curCount + "秒内输入";
	        this.InterValObj = window.setInterval(this.SetRemainTime, 1000); //启动计时器，1秒执行一次
	      }
	      this.showLineHeight();
	      // 发票打钩
	      var invoicetype =sessionStorage.getItem('invoicetype');
				if(invoicetype){this.invoicetype=invoicetype;}//有缓存再赋值
	      if(invoicetype==1||invoicetype==2){
	          this.faPiao1 = true;
	          this.faPiao2 = false;
	      }else{
	      		this.faPiao1 = false;
	          this.faPiao2 = true;
	      }
  	},
	   bemember:function() {
	    	var that=this;
	    	bemember(that,MessageBox,api);	
			},
      keybordFn: function () {
        $(window).resize(function () {
          var hh = window.innerHeight;     //当前可视窗口高度
          var viewTop = $(window).scrollTop();   //可视窗口高度顶部距离网页顶部的距离
          if(this.wHeight > hh){           //可以作为虚拟键盘弹出事件
              $(".panelTop2").animate({scrollTop:viewTop+210});    //调整可视页面的位置
          }else{         //可以作为虚拟键盘关闭事件
              $(".panelTop2").animate({scrollTop:viewTop-210});
          }
          this.wHeight = hh;
        });
      },
      changeNumber: function (abb) {
        if (abb>0) {this.num ++;
        	if (this.num >10) {this.num = 10}
        }
        else {
          this.num --;
          if (this.num < 1) {this.num = 1}
        }
      },
      changeNum: function () {
          if (this.num >10) {
            Toast({message:"限购10张"})
            this.num = 10}
      },
      changeNums: function () {
        if (this.num ==''||this.num<1) {
          this.num = 1;
        }
      },
      phoneChange: function () {
        window.clearInterval(this.InterValObj);//停止计时器
        $("#btnSendCode").removeAttr("disabled");//启用按钮
        this.tipsText= '获取验证码';
        this.yzCode = '';
        this.tip3 = false;
        this.showLineHeight();
      },
      showLineHeight: function () {
        if (this.tip1 && this.tip2 && this.tip3) {
          this.heightLight = true; // 渐变色
        } else {
          this.heightLight = false;
        }
      },
      // 姓名input-验证
      validName: function (txt) {
        var _this = this;
 //       console.log(txt)
        if(txt==""){
          _this.mui.toast('请输入您的姓名');
          _this.tip1 = false;
        }else{
          var username = /[\d\s]+/;
          if(username.test(txt)){
             _this.mui.toast('请填入正确的姓名');
            _this.tip1 = false;
            _this.customerName='';
          }else{
            _this.tip1 = true;
          }
        }
        _this.showLineHeight();
      },
      // 手机号input-验证
      validPhone: function(txt){
        var _this = this;
//        console.log(txt)
        if(txt==""){
          _this.mui.toast('请输入手机号');
          _this.tip2 = false;
        }else{
          var phonereg = /^1[34578]\d{9}$/;
          if(!phonereg.test(txt)){
            _this.mui.toast('请输入正确的手机号');
          }else{
            _this.tip2 = true;
          }
        }
        _this.showLineHeight();
 //       return _this.tip2;
      },
      // 验证码input-验证
      validCode: function(txt){
        var _this = this;
//        console.log(txt)
        if(txt==""){
          _this.mui.toast('请输入验证码');
          _this.tip3 = false;
        }else{
          var param  = {
            "phone": _this.customerPhone, // 客户手机号
            "validCode": _this.yzCode
          };
          //console.log(param);
          var response = api.checkYZcode(param);
          response.then(function(res){
//            console.log(res);
            var data = res.data;
            if(data.status=='1'){
              _this.tip3 = true;
            }else{
              _this.mui.toast('请输入正确的验证码');
              _this.tip3 = false;
            }
            _this.showLineHeight();
          }).catch(function(err){
             // _this.mui.toast('网络异常！');
          });
        }

      },
      // 获取验证码 60s（1）
      getAuthCode: function () {
        var _this = this;
        _this.sendCodeed = false;
        _this.curCount = _this.count;
        if (_this.tip2) {
          var param  = {
            "phone": _this.customerPhone // 客户手机号
          };
          // console.log(param)
          var response = api.getYZcode(param);
          response.then(function(res){
            // console.log(res)
            var data = res.data;
            if(data.status=='1'){
              _this.mui.toast('验证短信发送成功');
              // _this.ifCode = true; // 是否发送验证码
              $("#btnSendCode").attr("disabled", "true");
              _this.tipsText = "请在" + _this.curCount + "秒内输入";
              _this.InterValObj = window.setInterval(_this.SetRemainTime, 1000); //启动计时器，1秒执行一次
              _this.yzCode = "";
              _this.sendCodeed = true; // 已发送验证码
//              return true;
            }else{
              _this.mui.toast('验证码请求失败');
 //             return false;
            }
          })
          .catch(function(err){
            //_this.mui.toast('网络异常');
            return false;
          });
        } else {
          _this.mui.toast('请输入正确的手机号');
          return false;
        }
      },
        // 验证码60s（2）timer处理函数
        SetRemainTime: function () {
            if (this.curCount == 0) {
                window.clearInterval(this.InterValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled");//启用按钮
                this.tipsText = '重新发送验证码';
//                this.code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
									this.tip3=false;
            }else {
                this.curCount--;
                this.tipsText = "请在" + this.curCount + "秒内输入";
            }
        },
        fenshuFn: function (t) {
						this.numChoose(t);
        },
        numChoose:function(t){
        	var $childs=$(".fenshu").children();
						$childs.removeClass("yescheckClass1");
        	$childs.eq(t-1).addClass("yescheckClass1");
						this.num=t;
						//console.log(this.num);
        },
      piaoChooseFn: function (type) {
        var _this = this;
        if (type>0) {
          _this.faPiao1 = true;
          _this.faPiao2 = false;  // 打钩
          // 存储个人信息
          this.saveInfo(_this);
          sessionStorage.setItem('invoicetype',_this.invoicetype);//重新存储发票状态
          window.location.href="#/meal/buyNow/invoices";
        } else if (type < 0) {
          _this.faPiao1 = false;
          _this.faPiao2 = true;
          _this.invoicetype='0';
        }
      },
      saveInfo:function(_this){
      	// 存储个人信息
          var personalInfo = {};
          personalInfo.customerName=_this.customerName;
          personalInfo.customerPhone=_this.customerPhone;
          personalInfo.yzCode=_this.yzCode;
          personalInfo.num=_this.num; // 数量
          sessionStorage.setItem('personalInfo',JSON.stringify(personalInfo));
          // 存储验证码 秒
          sessionStorage.setItem('currrentCount',_this.curCount);
      },
      // 【 query interface】
      buyHalthyCard: function () {
        var _this = this;
        //console.log(this.invoicetype);
        var r =JSON.parse(sessionStorage.getItem('uInfo'));
      if (this.heightLight) {
//        // 保存个人信息
						this.saveInfo(_this);
          	var param={
	          	"authcode": this.yzCode,
	            "custOpenId":r.id,
	            "homeid": r.homeid||sessionStorage.getItem('ooid'),
		          "userType": r.userType,//////
	            "mssid": r.mssid,
	            "tsropenid":r.ssid||"",
	//          "orderPrice": this.totalOriginalPrice, // 实际价格
	            "originalPrice": this.totalOriginalPrice, // 原价
	            "productNo": this.baseData.productcode, // 产品编号
	            "productName": this.baseData.productname, // 产品名称
	            "num": this.num, // 购买数量
	            "customerName": this.customerName, // 客户姓名
	            "customerPhone": this.customerPhone, // 客户手机号
	            "invoicetype":this.invoicetype, // 是否开发票 0不开 1普通 2 增值
	            "isvip":this.isMemberPrice.yesorno,
	            "channel":r.channel||""//926新链接新增channel kyy
	          }
          if(this.faPiao1){//开发票时
          	if (this.invoicetype == 1) {
              this.invoiceInfo =JSON.parse(sessionStorage.getItem('saveFormData1'));
	          }else if(this.invoicetype == 2){
	          	this.invoiceInfo =JSON.parse(sessionStorage.getItem('saveFormData2'));
          	}
	          var invInfo=this.invoiceInfo;
	          param = Object.assign(param,this.invoiceInfo);//合并两个对象
          }            	          
          if(this.isMemberPrice.yesorno!=='1'||this.shengyu.yesorno=='0'){
							param["orderPrice"]=this.totalOriginalPrice;
          }else{
  	          param["orderPrice"]=this.totalPrice;// 实际价格
          }
          console.log(JSON.stringify(param))
          var response = api.byitNow(param);
          response.then(function(res){
            console.log(res)
            var data = res.data
            if(data.Success=='1'){
               sessionStorage.setItem('ooid',r.homeid||sessionStorage.getItem('ooid'));
               data=data.Data;
              var wspTradeNo = data.wspTradeNo;
              var tradeNo = data.tradeNo;
             if(wspTradeNo != "FAIL"){
                window.location.href = config_param.wx_pay+"?temId="+
                wspTradeNo +"&showwxpaytitle=1";
             }
            }else{
               _this.mui.toast(data.Message?data.Message:data.message);
            }
          })
          .catch(function(err){
              console.log(err);
          });
        } else {
          return;
        }
      }
    }
  }
</script>
<style scoped>
#verityCode{width: 38%;}
#btnSendCode{
  /*padding: 6px !important;*/
  width: 35%;
}
.buyBtn{
  width: 33%;
  height: 100%;
  background: #c3c4c5;
  float: right;
  color: #ffffff;
  font-size: 0.833rem;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
  text-align: center;
  line-height: 2.72rem;
}
.heightLight{
  background: linear-gradient(to right, #56b0d8 , #6f81e4);
}
.rightTex.Number{
  width: 65%;
}
.bjGray{
  background: #b4b3a3;
}
.fapiaoCRoutoer{
  /*display:inline-block;*/
  /*width:100%;*/
  /*height:100%;*/
  color: #000;
}
/*invoiceBox*/
.invoiceBox{
  /*width: 100%;*/
  /*height: 41px;*/
  background: #ffffff;
  margin-top: 0.83rem;
  /*margin-bottom: 85px;*/
  padding: 0.4rem 1.2rem;
  font-size: 0.72rem;
}
.invoiceChoose{
  /*display: inline-block;*/
  float: right;
  width: 63%;
}
.invoiceChoose span{
  display: inline-block;
  width: 42%;
}
.fp_y{
  /*display: inline-block;*/
    float: right;
    /*width: 30%;*/
    line-height: 1.78rem;
    text-indent: 8%;
  text-align: right;
}
.fp_n{
   /*display: inline-block;*/
    /*width: 38%;*/
    float: right;
    line-height: 1.78rem;
    text-indent: 12%;
  text-align: right;
  margin-left: 0.56rem;
}
.nocheckClass{
  /*height: 100%;*/
  background: url('../../../../static/img/nocheck.png') center left no-repeat;
  background-size: 0.89rem 0.89rem;
}
.yescheckClass{
  /*height: 100%;*/
  background: url('../../../../static/img/yescheck.png') center left no-repeat;
  background-size: 0.89rem 0.89rem;
}
/*----*/
.containerBox{
  width: 100%;
  background: #f8f8f8;
}
.mui-content{
  /*width: 100%;*/
  /*height: auto;*/
  /*height: calc(100% - 59px);*/
  padding: 0 1.2rem;
}
.panelTop1{
  font-size: 0.83rem;
  /*width: 100%;*/
  /*background: #ffffff;*/
}
  .proInfo{
    /*width: 100%;*/
    min-height: 5.83rem;
    border-bottom: solid 1px #f8f8f8;
    padding-bottom: 0.4rem;
  }
    .leftText{
      /*display: inline-block;*/
      float: left;
      width: 20%;
      /*text-align: left;*/
    }
    .rightText{
      /*display: inline-block;*/
      float: right;
      width: 60%;
      text-align: right
    }
    .line1_L,.line2_L{
      font-weight: bold;
      /*font-size: 15px;*/
      margin-top: 8%;
      /*margin-left: 7px;*/
    }
    .line1_R{
      /*font-size: 15px;*/
      margin-top: 8%;
      /*margin-right: 7px;*/
    }
    .line2_R{
      width: 7.23rem;
      height: 1.72rem;
      margin-top: 1.06rem;
      /*margin-right: 7px;*/
    }
  .pricePanel{
    width: 100%;
/*    height: 3.67rem;*/
    overflow: auto;
  }
  .priceLine1{
    margin-top: 1.28rem;
    /*margin-left: 7px;*/
    font-weight: bold;
    font-size: 0.83rem;
  }
  .Number{
    margin-top: 0.94rem;
    /*margin-right: 10px;*/
  }
  .nowPrice1,.prePrice2,.shengPrice3{
    /*display: inline-block;*/
    float: right;
    width: 46%;
    /*height: auto;*/
  }
  .nowPrice1{
    font-size: 1.39rem;
  }
  .prePrice2{
    font-size: 0.68rem;
  }
  .shengPrice3{
    /*display: block;*/
    font-size: 0.68rem;
    width: 85%;
  }
.panelTop2{
  /*width: 100%;*/
  /*height: auto;*/
  margin-top: 0.83rem;
  background: #ffffff;
  padding-top: 0.72rem;
  /*border: solid 1px;*/
}
/*个人信息*/
.fieldset_css{
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.infoPad{
  padding: 0 0.464rem;
}
.cs41,.cs46,.cs51{
  height: 1.68rem;
  font-size: 0.68rem !important;
  text-align: left;
  line-height: 1.68rem;
  padding: 0.56rem 0.28rem;
}
.cs40,.cs45,.cs50{
  font-size: 0.78rem;
  line-height: 1.68rem;
}
.centerPanel{
  width: 30%;
  height: 1.68rem;
  font-size: 0.72rem;
  /*text-align: left;*/
  line-height: 1.68rem;
}
.rightP{
  float: right;
  width: 38%;
  height: 1.68rem;
  font-size: 0.68rem;
  text-align: center;
  line-height: 100%;
  margin-left: 1%;
  border-color: #5c9edc;
}
#btnSendCode.rightP{
  padding: 0;
}
.tiaoshi{
  font-size: 0.68rem;
  color: #8f8f94;
}
.leftPanel{
  width: 25%;
}
.rightPanel{
  width: 75% !important;
}
.nocheckClass1{
  background: url('../../../../static/img/nocheck.png') center left no-repeat;
  background-size: 0.89rem 0.89rem;
}
.yescheckClass1{
  background: url('../../../../static/img/yescheck.png') center left no-repeat;
  background-size: 0.89rem 0.89rem;
}
.fenshu{
text-align: right;
}
.fenshu span{
	display:inline-block ;
	margin-top: 8%;
	padding-left: 1.6rem;
	margin-left: 0.8rem;
}
</style>
