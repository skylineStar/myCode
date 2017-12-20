<template>
  <div class="marginB49px">
    <div class="mui-content" style="height: calc(100% - 79px);">
      <div style="padding: 10px 10px;" class="f8f8f8">
        <div id="segmentedControl" class="mui-segmented-control" >
          <a class="mui-control-item item1 mui-active" href="#item1" iid="1">增值税普通发票</a>
          <a class="mui-control-item item2" href="#item2" iid="2">增值税专票</a>
        </div>
      </div>
      <div>
        <div id="item1" class="mui-control-content mui-active">
        	<form action="">
          <ul class="f8f8f8">
            <li class="mui-table-view-cells">
              <div>
                <span class="table_left fs125 yahei">发票抬头</span>
                <input class="table_right fs115 yahei" name="item1_1" type="text" placeholder="请输入" v-model="item1.invoicetittle" maxlength="50"  @blur="itemFn(item1.invoicetittle,'发票抬头','0',$event)">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">发票内容</span>
                <input class="table_right fs115 yahei" name="item1_2" type="text"  v-model="item1.invoicecontent" :value="item1.invoicecontent" readonly="readonly" >
                <div class="clear"></div>
              </div>
            </li>
            <li class="mui-table-view-cells" style="margin-bottom: 0px;">
              <div>
                <span class="table_left fs125 yahei">发票邮寄地址</span>
                <input class="table_right fs115 yahei" name="item1_3" type="text" placeholder="请输入" v-model="item1.PostAddress"  @blur="itemFn(item1.PostAddress,'邮寄地址','1',$event)" maxlength="100">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">联系人姓名</span>
                <input class="table_right fs115 yahei" name="item1_4" type="text" placeholder="请输入" v-model="item1.contactname"  @blur="itemFn(item1.contactname,'联系人姓名','2',$event)" maxlength="20">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">联系人电话</span>
                <input class="table_right fs115 yahei" name="item1_5" type="tel" placeholder="请输入" v-model="item1.contactphone" @blur="validPhoneItem(item1.contactphone,tip1,'3',$event)"
                maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')">
                <div class="clear"></div>
              </div>
            </li>
            <li class="mui-table-view-cells f8f8f8" style="padding: 15px;">
              <div class="tiaoshi">注：本产品为电子体检卡，我们会在15个工作日后，以到付的形式将发票邮寄给您</div>
            </li>
          </ul>
          </form>
        </div>
        <div id="item2" class="mui-control-content" >
          <ul class="f8f8f8">
            <li class="mui-table-view-cells f8f8f8 fs11 yahei c999 pd_b0">
              我公司将依法开具发票，如果您购买的商品按税法规定属于不得从增值税销项税种抵扣的项目（例如集体福利和个人消费等），请您选择普通发票。
            </li>
            <li class="mui-table-view-cells">
              <div>
                <span class="table_left fs125 yahei">发票抬头</span>
                <input class="table_right fs115 yahei" name="item2_1" type="text" placeholder="请输入" v-model="item2.invoicetittle" @blur="item2Fn(item2.invoicetittle,'发票抬头','0',$event)" maxlength="50">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">发票内容</span>
                <input class="table_right fs115 yahei" name="item2_2" type="text" :value="item2.invoicecontent" v-model="item2.invoicecontent" readonly="readonly" >
                <div class="clear"></div>
              </div>
            </li>
            <li class="mui-table-view-cells">
              <div>
                <span class="table_left fs125 yahei">纳税人识别号</span>
                <input class="table_right fs115 yahei" name="item2_3" v-model="item2.identifynumber" type="tel" placeholder="请输入" @blur="tipNumberFn(item2.identifynumber,$event)" maxlength="20">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">注册地址</span>
                <input class="table_right fs115 yahei" name="item2_4" v-model="item2.registeraddress" @blur="item2Fn(item2.registeraddress,'注册地址','2',$event)" type="text" placeholder="请输入" maxlength="100">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">注册电话</span>
                <input class="table_right fs115 yahei" name="item2_5" v-model="item2.registerphone" type="tel" placeholder="请输入" @blur="validTel(item2.registerphone,$event)"
                maxlength="12">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">开户银行</span>
                <input class="table_right fs115 yahei" name="item2_6" v-model="item2.bankname" @blur="item2Fn(item2.bankname,'开户银行','4',$event)" type="text" placeholder="请输入" maxlength="20">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">银行账号</span>
                <input class="table_right fs115 yahei" name="item2_7" v-model="item2.banknumber" type="tel" placeholder="请输入" onkeyup="value=value.replace(/[^\d]/g,'')"
                @blur="bankNo(item2.banknumber,$event)" maxlength="20">
                <div class="clear"></div>
              </div>
            </li>
            <li class="mui-table-view-cells" style="margin-bottom: 0px;">
              <div>
                <span class="table_left fs125 yahei">发票邮寄地址</span>
                <input class="table_right fs115 yahei" name="item2_8" type="text" @blur="item2Fn(item2.PostAddress,'发票邮寄地址','6',$event)" placeholder="请输入" v-model="item2.PostAddress" maxlength="100">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">联系人姓名</span>
                <input class="table_right fs115 yahei" name="item2_9" type="text" placeholder="请输入" v-model="item2.contactname"  @blur="item2Fn(item2.contactname,'联系人姓名','7',$event)" maxlength="20">
                <div class="clear"></div>
              </div>
              <div>
                <span class="table_left fs125 yahei">联系人手机</span>
                <input class="table_right fs115 yahei" name="item2_10" type="tel" placeholder="请输入" v-model="item2.contactphone" @blur="validPhoneItem(item2.contactphone,tip2,'8',$event)" 
                 maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')">
                <div class="clear"></div>
              </div>
            </li>
            <li class="mui-table-view-cells f8f8f8" style="margin-bottom: 19%; padding: 15px;">
              <div class="tiaoshi">注：本产品为电子体检卡，我们会在15个工作日后，以到付的形式将发票邮寄给您</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="submitBtn fs15 positionBottomF" @click="submitFormInvoice">
        <a>提交</a>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { Indicator,Toast } from 'mint-ui'
import {hideaddress} from '../../../assets/js/BaseJS.js'
export default {
  data () {
    return {
      item1:{
        "invoicetittle": "", // 发票抬头
        "invoicecontent": "服务费", // 发票内容
        "PostAddress": "", // 邮寄地址
        "contactname": "", // 邮寄人姓名
        "contactphone": "" // 邮寄人电话
      },
      item2:{
        "invoicetittle": "", // 发票抬头
        "invoicecontent": "服务费", // 发票内容
        "PostAddress": "", // 邮寄地址
        "contactname": "", // 邮寄人姓名
        "contactphone": "", // 邮寄人电话
        // --
        "identifynumber": "", // 纳税人识别号
        "registeraddress": "", // 注册地址
        "registerphone": "", // 注册电话
        "bankname": "", // 开户银行
        "banknumber": "" // 银行账号
      },
      "invoicetype": "", // 发票类型 0不开 1普通 2专票
      tip:'',
			tip1:[false,false,false,false],
			tip2:[false,false,false,false,false,false,false,false,false],	
      "item1FomeOK": false,
      "item2FomeOK": false
    }
  },
  beforeCreate () {
    document.title = '发票';
  },
  mounted: function () {
  	hideaddress();
    this.pageInit();
//    this.tip=this.tip1;
    var tip1 = JSON.parse(sessionStorage.getItem('tip1'));
      if (tip1) {
        this.tip1 = tip1.tip;
      }
    var tip2 = JSON.parse(sessionStorage.getItem('tip2'));
      if (tip2) {
				this.tip2 = tip2.tip;
      }
    // 重新返回页面不修改表单的情况下可以直接提交
    var sassionItem2 = sessionStorage.getItem('item2FomeStatus');
    if (sassionItem2) {
      this.item2FomeOK = sassionItem2;
    }
    var sassionItem1 = sessionStorage.getItem('item1FomeStatus');
    if (sassionItem1) {
      this.item1FomeOK = sassionItem1;
    }
  },
  methods: {
    pageInit: function () {
          var FormData1 =JSON.parse(sessionStorage.getItem('saveFormData1'));
          if (FormData1) {
            this.item1 = FormData1;
          }
          // [FormData2]
          var FormData2 =JSON.parse(sessionStorage.getItem('saveFormData2'));
          if (FormData2) {
            this.item2 = FormData2;
          }
    },
      itemFn: function (txt,str,i,$event) {//普票，非空验证
        var _this = this;
        var $el=$($event.target);
        if($.trim(txt)==""){
        _this.mui.toast(str+'不能为空');
        _this.tip1[i] = false;
				$el.addClass('sinRed');
        } else {
         _this.tip1[i] = true;
         $el.removeClass('sinRed');
        }
        _this.submitItem1CheckFn();
      },
      item2Fn: function (txt,str,i,$event) {//专票，非空验证
        var _this = this;
        var $el=$($event.target);
        if($.trim(txt)==""){
        _this.mui.toast(str+'不能为空');
        _this.tip2[i] = false;
				$el.addClass('sinRed');
        } else {
         _this.tip2[i] = true;
         $el.removeClass('sinRed');
        }
        _this.submitItem2CheckFn();
      },
      validPhoneItem: function(txt,tip,i,$event){
        var _this = this;
        var $el=$($event.target);
        if($.trim(txt)==""){
          _this.mui.toast('手机号不能为空');
          tip[i] = false;
          $el.addClass('sinRed');
          
        }else{
          var phonereg = /^1[34578]\d{9}$/;
          if(!phonereg.test(txt)){
            _this.mui.toast('请输入正确的手机号');
            tip[i] = false;
            $el.addClass('sinRed');
          }else{
            tip[i] = true;
            $el.removeClass('sinRed');
          }
        }
				if(i==8){
					_this.submitItem2CheckFn();
				}else{ 
					_this.submitItem1CheckFn();
				}
       
      },
      submitItem1CheckFn: function () {
      	this.item1FomeOK=this.tip1.reduce(function(prevResult, next) {
		    	return prevResult=(prevResult&&next);
				});
//				console.log(this.item1FomeOK);
      },
      submitItem2CheckFn: function () {
      	this.item2FomeOK=this.tip2.reduce(function(prevResult, next) {
		    	return prevResult=(prevResult&&next);
				});
//				console.log(this.item2FomeOK);
      },
      // 纳税人识别号 23
      tipNumberFn: function (txt,$event) {
        var _this = this;
        var $el=$($event.target);
        if($.trim(txt)==""){
          _this.mui.toast('请输入纳税人识别号');
          _this.tip2[1] = false;
          $el.addClass('sinRed');
        }else{
          var phonereg =/^\d{15}(\d{3}(\d{2})?)?$/
          if(!phonereg.test(txt)){
            _this.mui.toast('请输入正确的纳税人识别号');
            _this.tip2[1] = false;
            $el.addClass('sinRed');
          }else{
            _this.tip2[1] = true;
            $el.removeClass('sinRed');
          }
        }
        _this.submitItem2CheckFn();
      },
      // 注册电话 25 - 专票校验
      validTel: function (txt,$event) {
        var _this = this;
        var telLength = txt.length;
        var $el=$($event.target);
//        console.log(txt)
        if($.trim(txt)==""){
          _this.mui.toast('注册电话不能为空');
          $el.addClass('sinRed');
          _this.tip2[3]=false;
        }else{
          var firstNo = txt.charAt(0);
          var phonereg = /^1[34578]\d{9}$/;
          var tel =/^0\d{10,11}$/;
	        if(!(phonereg.test(txt)||tel.test(txt))){//两个验证都不通过
	          _this.mui.toast('请输入11或12位注册电话,座机需带区号');
	          $el.addClass('sinRed');
	          _this.tip2[3]=false;
	        } else {
	          $el.removeClass('sinRed');
	          _this.tip2[3]=true;
	        }
        _this.submitItem2CheckFn();
      }
        },
      // 银行账号 27
      bankNo: function (txt,$event) {
        var _this = this;
        var $el=$($event.target);
        if($.trim(txt)==""){
          _this.mui.toast('请输入银行账号');
          _this.tip2[5]=false;
          $el.addClass('sinRed');
        }else{
            $el.removeClass('sinRed');
            _this.tip2[5]=true;
        }
        _this.submitItem2CheckFn();
      },
    submitFormInvoice: function () {
      // 发票类型
      var _this = this;
      _this.invoicetype = $(".mui-active").attr("iid");     
      // 普通发票
      if (_this.invoicetype == '1') {
      	  // 【保存发票表单信息-再次进入后从内存中获取】
            sessionStorage.setItem('saveFormData1',JSON.stringify(this.item1));
            // 保存tips数据
          	var tip1 ={};
						tip1.tip=_this.tip1;
            sessionStorage.setItem('tip1',JSON.stringify(tip1));
            // 保存 item1FomeOK
            sessionStorage.setItem('item1FomeStatus',_this.item1FomeOK);
          if (_this.item1FomeOK) {
             console.log(1);  
             sessionStorage.setItem('invoicetype',_this.invoicetype);//发票信息填写验证通过才保存发票种类
            _this.mui.toast('发票信息保存成功');
            window.location.href="#/meal/buyNow/buyNow";
          }else { 
          	_this.mui.toast('请完善发票信息');
       			}
      }
        // 专用发票
      if (_this.invoicetype == '2') {
      	  sessionStorage.setItem('saveFormData2',JSON.stringify(this.item2));
            // 保存tips数据
            var items2 = {};
            items2.tip=this.tip2;
            sessionStorage.setItem('tip2',JSON.stringify(items2));
            // 保存 item2FomeOK
            sessionStorage.setItem('item2FomeStatus',_this.item2FomeOK);
          if (_this.item2FomeOK) {
          	sessionStorage.setItem('invoicetype',_this.invoicetype);
            _this.mui.toast('发票信息保存成功');
            window.location.href="#/meal/buyNow/buyNow";
          }else{
          	_this.mui.toast('请完善发票表单信息');
          }
      }
    }
  }
}
</script>
<style scoped>
  .sinRed{
    border-color: red !important;
    color: red !important;
  }
  .submitBtn a{
    color: #ffffff;
  }
  .mainPanel{
    margin-top: 40px;
    padding: 15px;
    width: 100%;
    /*border: solid 1px;*/
  }
  .mui-segmented-control .mui-control-item.mui-active{
    color: #fff;
    background: linear-gradient(to right, #56b0d8 , #6f81e4);
    /*color: #ffffff;*/
  }
  .mui-segmented-control{
    border: solid 1px #4dacd6;
    margin: 0 auto;
    width: 80%;
  }
  .mui-segmented-control .mui-control-item{
    border-left: none;
    color: #4dacd6;
  }
  /*.mui-table-view-cells:after{height: 0px;}*/
  .mui-table-view-cells{
    margin-bottom: 0.83rem;
    padding: 0.83rem 0.83rem 0;
    background: #ffffff;
  }
  /*普通发票 专票*/
  .table_left{
    display: inline-block;
    width: 28%;
    height:1.78rem;
    line-height:1.78rem;
    /*text-align: left;*/
    font-weight: bold;
  }
  .table_right{
    /*display: inline-block;*/
    float: right;
    width: 69%;
    height: 1.78rem;
    /*line-height:1.78rem;*/
    border-color: #bbbbbb;
    color: #666666;
  }
  .submitBtn{
    width: 100%;
    height: 2.75rem;
    background: linear-gradient(to right, #56b0d8 , #6f81e4);
    color: #ffffff;
    text-align: center;
    line-height: 2.75rem;
  }
  .mui-content{
    background: #f8f8f8;
    /*margin-top: 40px;*/
  }
</style>
