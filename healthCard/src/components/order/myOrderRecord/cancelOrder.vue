<template>
  <div>
    <div class="containerPanel mui-content">
      <div class="mes c999 f8f8f8 fs11">
        <div style="text-align: center;">取消原因</div>
        <div>请至少选择一项取消原因，我们将更好的完善我们的服务</div>
      </div>
      <div class="chooseItem fff c333">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-left fs125 fangBox reason_1" :class="{'yesCheck': yesCheck1}" 
          @click="ifChange(1)">
            预约时间有误，需要重新预约
          </li>
          <li class="mui-table-view-cell mui-left fs125 fangBox reason_2" :class="{'yesCheck': yesCheck2}" 
          @click="ifChange(2)">
            不想参加体检了
          </li>
          <li class="mui-table-view-cell mui-left fs125 fangBox reason_3" :class="{'yesCheck': yesCheck3}" 
          @click="ifChange(3)">
            体检产品评价不好，失去兴趣
          </li>
          <li class="mui-table-view-cell mui-left fs125 fangBox reason_4" :class="{'yesCheck': yesCheck4}" 
          @click="ifChange(4)">
            预约错了
          </li>
          <li class="mui-table-view-cell mui-left fs125 fangBox reason_5" :class="{'yesCheck': yesCheck5}" 
          @click="ifChange(5)">
            其他
          </li>
        </ul>
        <div class="mui-input-row" style="margin: 10px 5px;">
          <textarea id="textarea" rows="3" placeholder="请输入原因" class="fs15"></textarea>
        </div>
      </div>
    </div>
    <button class="footSubmit fs165 positionBottomF cancelAppointmentBtn" @click="cancelAppointmentBtn">提交</button>
  </div>
</template>
<script>
import $ from 'jquery'
import API from '../../../api/API'
const api = new API();
import { Indicator,Toast,MessageBox } from 'mint-ui'
import {hideaddress} from '../../../assets/js/BaseJS.js'
export default {
  data () {
    return {
      yesCheck1: false,
      yesCheck2: false,
      yesCheck3: false,
      yesCheck4: false,
      yesCheck5: false,
      // 带过来的参数
      orderid: '',
      orgNo: '',
      contid: '',
      isCardUser: "1",
      endReasonS: [], // 取消原因数组
      endReason: ''  // 取消原因
    }
  },
  beforeCreate () {
    document.title = '取消预约'
  },
  created: function () {
    var orderIddata =sessionStorage.getItem('orderIdData');
    this.orderid = JSON.parse(orderIddata).orderid;   // orderid
    this.orgNo = JSON.parse(orderIddata).orgNo;   // orgNo
    var argu_cancelAppointment =sessionStorage.getItem('argu_cancelAppointment');
    this.contid = JSON.parse(argu_cancelAppointment).contid;    // contId
  },
  mounted: function () {
    hideaddress();
  },
  methods: {
    submitBox: function () {
    	MessageBox.confirm( '您已取消预约，请到 “我的体检卡” 查看该体检卡详情、并进行后续的预约操作。'
                ).then(action => {
                   window.location.replace("#/order/Cardlist");
//									 history.pushState('Cardlist', "我的体检卡", "#/order/Cardlist");
                   console.log(window.history)
//                 window.location.href = "#/order/Cardlist";
                },action => {
                	history.go('-2');
//                window.location.href = "#/order/UserManage";
                })
//    MessageBox(
//      '提示', 
//      '<div style="text-align: left; line-height: 24px;font-size: 12.5px;">您已取消预约，请到 “我的体检卡” 查看该体检卡详情、并进行后续的预约操作。</div>'
//    )
//    $('.mint-msgbox-confirm').click(function(){
////    	 history.back();//window.location="#/order/Cardlist"
//    	 history.go(-2);
//    })
    },
    ifChange: function (item) {
      if (item == 1) {this.yesCheck1 = !this.yesCheck1}
      if (item == 2) {this.yesCheck2 = !this.yesCheck2}
      if (item == 3) {this.yesCheck3 = !this.yesCheck3}
      if (item == 4) {this.yesCheck4 = !this.yesCheck4}
      if (item == 5) {this.yesCheck5 = !this.yesCheck5}
    },
    testcancel:function(){
    	this.mui.toast('uuuijkl;')
    },
    // 提交“取消预约”  先获取取消预约原因  
      // 释放一下：created中获取的session参数
  	cancelAppointmentBtn:function () {
  		var _this = this;
      	
        // 获取取消预约  先释放created中获取的session参数
        if (_this.yesCheck1) { _this.endReasonS.push($(".reason_1").text().trim()) }
        if (_this.yesCheck2) { _this.endReasonS.push($(".reason_2").text().trim()) }
        if (_this.yesCheck3) { _this.endReasonS.push($(".reason_3").text().trim()) }
        if (_this.yesCheck4) { _this.endReasonS.push($(".reason_4").text().trim()) }
        if (_this.yesCheck5) { _this.endReasonS.push($(".reason_5").text().trim()) }
        if ($("#textarea").val() != "") { _this.endReasonS.push($("#textarea").val()) }
        // console.log(_this.endReasonS)
        for (var i=0; i<_this.endReasonS.length;i++) {
          _this.endReason += _this.endReasonS[i] + '。';
        }
//      console.log(_this.endReason)
        if(_this.endReason==''){
          Toast({message:'请选择取消原因'});
          return false;
        }else{
          Indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
          });
          var param = {
            "orgNo": _this.orgNo, // orgNo 体检站点编码
            "contId":"", // contId 客户号
            "isCardUser": _this.isCardUser, // isCardUser 是否为持卡客户
            "orderid": _this.orderid, // orderId
            "endReason": _this.endReason // endReason 取消原因
          };
          console.log("=============取消预约入参===========")
          console.log(param)
          var response = api.cancelAppointment(param);
          response.then(function(res){
            setTimeout(Indicator.close(),'1000');
            console.log(res)
            var data = res.data;
            if(data.status=='1'){
              console.log("取消预约成功")
              console.log("取消预约成功")
              sessionStorage.removeItem('orderIdData');
              _this.submitBox()
            }else{
              _this.mui.toast(data.message)
            }
          }).catch(function(err){
              console.log(err);
          });
        }
      }
  }
}
</script>
<style scoped>
  .fangBox{
    text-indent: 3%;
    background: url(../../../../static/img/fang.png) no-repeat center left;
    background-size: 7% 49%;
  }
  .yesCheck{
    text-indent: 3%;
    background: url(../../../../static/img/dui.png) no-repeat center left;
    background-size: 7% 49%;
  }
  /**/
  .mui-content{
    margin: 0 !important;
  }
  .containerPanel{
  width: 100%;
  margin-top: 40px;
  }
  .mes{
    width: 100%;
    /*height: 62px;*/
    padding: 15px 0; 
  }
    .mes div{
      text-align: left;
      letter-spacing: 0px;
      padding-left: .83rem;
      margin-bottom: 0;
      font-size: .89rem;
    }
  .chooseItem{
    width: 100%;
    padding: 0 15px 15px 15px;
  }
  .mui-checkbox.mui-left input[type=checkbox]{
    left: 0px;
  }
  .mui-table-view-cell.mui-checkbox.mui-left{
    padding-left: 10%;
  }
  .footSubmit{
    display: inline-block;
    width: 100%;
    height: 50px;
    color: #ffffff;
    background: linear-gradient(to right, #56b0d8 , #6f81e4);
  }
</style>
