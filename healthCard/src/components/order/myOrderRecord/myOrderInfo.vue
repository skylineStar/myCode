<template>
  <div class='orderMsg'>
    <div class="body">  
      <!--基本信息-->
      <div class='basemsg'>
        <div class="">
        	<mt-cell title="体检机构" :value="pageBaseData.managecom">
          </mt-cell>
          <mt-cell title="体检站点" :value="pageBaseData.station">
          </mt-cell>
          <mt-cell  title="体检套餐":value="pageBaseData.producname">  
          </mt-cell>
          <mt-cell title="体检时间" :value="pageBaseData.appointmentdate"></mt-cell>
        </div>
        <div class='tipsword'>
          <div>体检人信息</div>
        </div>
        <div class='userMsg'>
          <mt-cell title="姓名" :value="pageBaseData.name"></mt-cell>
          <mt-cell title="性别" :value="pageBaseData.sex"></mt-cell>
          <mt-cell title="出生日期" :value="pageBaseData.birthday"></mt-cell>
          <mt-cell title="手机号" :value="pageBaseData.phone"></mt-cell>
          <mt-cell title="证件类型" :value="pageBaseData.cardtype"></mt-cell>
          <mt-cell title="证件号码" :value="pageBaseData.idcard"></mt-cell>
        </div>
      </div>
      <!--基本信息===end===-->
    </div>
    <!--<div class="stepact" >-->
      <div class="stepact" v-if="stateM =='2'">
      	<div @click="cancel()">
          <button href="javascript:void(0)" class="backstep btncancel ">取消预约</button>
        </div>
        <div>
          <a href="javascript:history.go(-1);" class="next btn-gradient">返回</a>
        </div>
      </div>
      <div class="stepact" v-if="stateM =='3'">
        <a href="javascript:history.go(-1);" class="next btn-gradient nocancel">返回</a>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
import $jquery from 'jquery'
import API from '../../../api/API'
const api = new API();
import {hideaddress} from '../../../assets/js/BaseJS.js'
  export default {
    data () {
      return {
        orderidBysession: "",
        pageBaseData: {},
        baseData: {},
        CardTypeDeal: '', // 证件类型判断
        sexDeal: '',
        stateM:'' // 状态编码
      }
    },
    beforeCreate () {document.title = '我的预约' },
    created: function () {
      var aa =sessionStorage.getItem('orderIdData');
      this.orderidBysession = JSON.parse(aa).orderid;
    },
    mounted: function () {this.queryOrderInfoFn();hideaddress();},
    methods: {
      queryOrderInfoFn: function () {
        var _this = this;
        var param = {"orderid": this.orderidBysession};
        console.log(param)
        var response = api.queryOrderInfoBaseDate(param);
        response.then(function(res){
          console.log("回参============")
          console.log(res)
          if(res.data.status=='1'){
            var queryData = res.data.data;
            console.log(queryData);
            // 证件类型判断
              if (queryData.cardtype == 1) {
                _this.CardTypeDeal = '身份证';
              } else if (queryData.cardtype == 2) {
                _this.CardTypeDeal = '护照';
              } else if (queryData.cardtype == 3) {
                _this.CardTypeDeal = '军官证';
              } else if (queryData.cardtype == 4) {
                _this.CardTypeDeal = '驾驶证';
              }
            // 性别 判断
            if (queryData.sex == "M") {
              _this.sexDeal = '男';
            } else if (queryData.sex == "F") {
              _this.sexDeal = '女';
            }
            _this.pageBaseData = {
              "managecom": queryData.managecom, // 机构名称
              "station": queryData.station,
              "producname": queryData.producname, // 套餐名称
              "appointmentdate": queryData.appointmentdate,
              "name": queryData.name,
              "sex": _this.sexDeal,
              "birthday": queryData.birthday,
              "phone": queryData.phone,
              "cardtype": _this.CardTypeDeal,
              "idcard": queryData.idcard
            }
            // 订单状态编码
            _this.stateM = queryData.state
            //取消按钮 置灰显示
            var orderDays = _this.compareStart(queryData.appointmentdate);
            if(orderDays > -1 && orderDays < 3){
              $jquery('.btncancel').attr('disabled',true);
              $jquery('.btncancel').addClass('btngray');
            }else{
              if(queryData.isgetreport=="1"){
                $jquery('.btncancel').attr('disabled',true);
                $jquery('.btncancel').addClass('btngray');
              }
            }
            console.log(orderDays);
            // 储存取消预约页面所需参数
            var argu_cancelAppointment = {};
              argu_cancelAppointment.contId=queryData.contId; // 客户号
              argu_cancelAppointment.contid=queryData.contid; // 预约订单号
            sessionStorage.setItem('argu_cancelAppointment',JSON.stringify(argu_cancelAppointment))
          }else{
            if(res.data.message){Toast({message:res.data.message})}else{Toast({message:"发生内部错误"})}
          }
        }).catch(function(err){console.log(err); });
      },
      // 开始有效期比较
      compareStart:function(strDateStart){
        var d= new Date();
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;
        oDate1= strDateStart.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        iDays = parseInt((strDateE - strDateS) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
        return iDays ;
      },
      cancel:function(){window.location.replace('#/order/myOrderRecord/cancelOrder')}
    }
  }
</script>

<style stoped>
  .nocancel{
    width: 100%;
  }
  .btngray{
    background-color: #b4b3a3;
    color: #fff!important;
  }
  .btncancel{
    display: block;
    font-size: 1rem;
    color: #666;
    padding: .67rem;
    outline: none;
    border: 0;
  }
  .next{font-size: 1rem;}
.mint-cell-title {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #666666;
    font-size: .667rem;
}
.mint-cell-value {
    color: #333333;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: .667rem;
}
  .mint-cell-wrapper{padding: 0 .83rem;}
/*mint字体颜色设置===end===*/
  /*提示语*/
 .tipsword{
    padding: .833rem .5rem;
    font-size: .667rem;
    margin: 0;
  }
  .tipsword div{
    margin: 0;
    color: #999999;
  }
  .tiph5{color:#5C9EDC;}
  .tiph5:before{
    content: ' ';
    background-color: #000;
    content: " ";
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 100px;
    left: 0;
    position: absolute;
  }
 /*提示语===end===*/
  .clear{clear: both;overflow: hidden;}
  /*输入列表===start===*/
 .userMsg{margin-bottom: 49px;}
 .userinput{background-color: #FFFFFF;margin-bottom: 10px;}
 .sexbox{
   display: inline-block;
   width: 80%;
   text-align: right;
   color: #666666;
   margin-top: -15px;
    font-size: .667rem;
 }
 .sexbox span{
   height: 40px;
    line-height: 40px;
    padding: 10px 0;
 }
 .sexbox img{
   width:1rem;
   margin-right: .5rem;
   vertical-align: middle;
 }
 .boy{margin-right: 2.4rem;}
 .cardtype{
   background: url(../../../assets/images/order/ss01.png) no-repeat 0 0;
   background-size: 12px 7px;
   background-position: 95% 45%;
 }
 fieldset {
  margin: 0;
  padding: .35rem 1.1rem .75em;
  border:0;
  border-top: 1px solid #e6e6e6;
}
 legend {
    padding: 0;
    border: 0;
    color: #5c9edc;
    padding: .88rem .61rem;
}
 .inputlist{
    width: 100%;
    background-color: #FFFFFF;
    padding: 1rem 0;
  }
  .inputlist input{
    width: 80%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 15px;
    padding: 10px 15px;
    font-size: .667rem;
    border-radius: 3px;
    border: 1px solid #BBBBBB;
    outline: 0;
    color: #666666;
  }
  .inputlist span.label{
    display: inline-block;
    width: 15%;
    font-size: .667rem;
    margin-right:12px;
    color: #333333;
    text-align-last: justify;
  }
 /*输入列表===end===*/
/*分享===start===*/
.mui-backdrop {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background:rgba(0,0,0,0.8) url(../../../assets/images/order/share.png) no-repeat 0 0;
    background-size: 100% 100%;
}
/*分享===start===*/
</style>
