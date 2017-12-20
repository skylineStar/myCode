<template>
	<div id="my_records" class="myReports">
		<div class="body">
      <ul class="listhead">
        <li class="listbtn btn-d" @click="searchModal.payDate = true">
          <a href="javascript:void(0)" class="result_time" id='payDate'>预约时间</a>
        </li>
        <li class="listbtn btn-d" @click="searchModal.keyword = true">
          <a href="javascript:void(0)" class="result_keyword" id='keyword'>关键字</a>
        </li>
        <li class="surebtn" @click='toSearchCard'>
          <a href="javascript:void(0);">搜索</a>
        </li>
      </ul>
      <!-- 弹出层-时间 -->
      <mt-popup v-model="searchModal.payDate" position="middle">
        <mt-picker :slots="timePick" @change="onPaydateChange" >
        </mt-picker>
        <div class='btngroup'>
          <mt-button type='default' size='normal' @click.native="cancel(2)">取消</mt-button>
          <mt-button type='primary' size='normal' @click.native="checkSearchInfo(2)">确定</mt-button>
        </div>
      </mt-popup>
      <!-- 弹出层-关键字 -->
      <mt-popup v-model="searchModal.keyword" position="middle">
        <mt-picker :slots="keywordPicck" @change="onKeywordChange" >
        </mt-picker>
        <div class='btngroup'>
          <mt-button type='default' size='normal' @click.native="cancel(3)">取消</mt-button>
          <mt-button type='primary' size='normal' @click.native="checkSearchInfo(3)">确定</mt-button>
        </div>
      </mt-popup>
      <!--<a href="http://saletest.wx.tkzj.taikang.com/showPDF/000199117072540779/1000411017.pdf"  download>获取体检报告</a>-->
      <div class="listbody" v-if='status'>
        <mt-loadmore :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  bottomPullText='上拉加载'>
        
          <ul  v-if='status == 1' v-for='item in reportInfo' class = 'fillList'>
            <!--<a :href='http://saletest.wx.tkzj.taikang.com/showPDF/item.orderid/item.orgNo.pdf'>-->
            <li  class='touse dotted bjBlue'  @click = 'toReadReport(item)'  v-if='item.ifread == "N"'>
              <!--<span v-if='item.ifread == "N"' class='newcard'>新</span>-->
              <div class="tolist row1">
                <div class='lineblock rl'><h5>卡名称：{{item.cardName}}</h5></div>       
                <div class='lineblock rt'><a href="javascript:void(0);" class='toSee'>去看看</a></div>
              </div>
              <div class="tolist row2">
                <div class='lineblock rl'>
                  <div class="contextTiao">体检人：{{item.name}}<span class="hide"></span></div>
                  <div class="contextTiao">体检日期：{{item.appointmentdate}}</div>
                </div >
              </div>
              <div class="row3">
                <div class="contextTiao">体检机构：{{item.managecom}}</div>
                <div class="contextTiao">体检套餐：{{item.producname}}</div>
              </div>
            </li>
            <!--</a>-->
            
            <!--<a :href="'http://saletest.wx.tkzj.taikang.com/showPDF/'+item.orderid+'/'+item.orgNo+'.pdf'"  download="">-->
            <!-- @click = 'toReadReport(item)' -->
            <li  class='touse dotted bjGrey' @click = 'toReadReport(item)' v-if='item.ifread == "Y"'>
              <div class="tolist row1">
                <div class='lineblock rl'><h5>卡名称：{{item.cardName}}</h5></div>       
                <div class='lineblock rt'><a href="javascript:void(0);" class='toSee'>去看看</a></div>
              </div>
              <div class="tolist row2">
                <div class='lineblock rl'>
                  <div class="contextTiao">体检人：{{item.name}}<span class="hide"></span></div>
                  <div class="contextTiao">体检日期：{{item.appointmentdate}}</div>
                </div >
              </div>
              <div class="row3">
                <div class="contextTiao">体检机构：{{item.managecom}}</div>
                <div class="contextTiao">体检套餐：{{item.producname}}</div>
              </div>
            </li>
            <!--</a>-->
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><mt-spinner :size='20' color="#26a2ff"type="fading-circle"></mt-spinner></span><!--↓-->
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
          <div slot = 'bottom'class="mint-loadmore-bottom"><span class="mint-loadmore-text">上拉加载</span></div>
            
        </mt-loadmore>
        <div v-if='status == 3' class='whiteList'><img src="../../../assets/images/order/searchbg.png"/><span class='whitetext'>没找到相关的匹配结果，请重试</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import $jquery from 'jquery'
import { Indicator,Toast,MessageBox } from 'mint-ui'
import API from '../../../api/API'
const api = new API();
import {hideaddress} from '../../../assets/js/BaseJS.js'
import {tkWX} from '../../../assets/js/wxConfig.js'
export default {
  name: 'myReports',
  data () {
    return {
      status:'',
      topStatus: '',
      allLoaded:false,
      pageIndex:0,
      results:[],
      reportInfo:{},
      searchModal:{payDate:false,keyword:false},
      searchInfo:{payDate:'',keyword:'',payValue:'',keyValue:''},
      // 购买时间
      timePick: [{flex: 1,values: ["默认",'一周内','三个月内','一年以内','一年或更久'],className: 'timePick',textAlign: 'center'}],
      // 关键字
      keywordPicck: [{flex: 1,values: ['默认','基础', '男性', '女性', '肿瘤'],className: 'keywordPicck',textAlign: 'center'}],
      "radiobox": true,
      "bjGrey": false,
      openid:''
    }
  },
  beforeCreate () {document.title = '体检报告'},
  mounted(){
    hideaddress();
    var r =JSON.parse(sessionStorage.getItem('uInfo'));
    console.log(r)
    this.openid = r.id;
    var param = {"openid":r.id,'keyword':'','dateType':''}; // "openid": r.id 'ovyq3jrclHTC7fgtKkxOqYZlgGcI'
    this.fillReport (param);
    
  },
  methods: {
    fillReport: function (param) {
      var that = this;
      that.allLoaded = false; // 设置可以上拉加载
      that.pageIndex = 0; // 默认展示第一页数据
      var response = api.getStateByOrderid(param); //  调后台获取提交报告数据
      response.then(function(res){
        var data= res.data;
        that.status = data.status;
        if(data.status=='1'){
          var list  = data.data;
//        console.log(list);
          that.results = that.sliceArr(list, 4);// 分割数组
          that.reportInfo= that.results[0];// 展示分割后的第一个数组
          var len = data.length;
        }else{
          if(data.message){
            Toast({message:data.message})
            that.status = data.status;
          }else{
            Toast({message:'发生内部错误'})
          }
        }
      }).catch(function(err){
          console.log(err);
      });
    },
    sliceArr:function(array, size){
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
        }
        return result;
      },
    handleTopChange(status) {this.topStatus = status;},
    loadTop:function(){
      var param = {"openid":this.openid,'keyword':'','dateType':''}; // "openid": r.id 'ovyq3jrclHTC7fgtKkxOqYZlgGcI'
      this.fillReport (param);
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom:function(){
        if(this.results.length ===1){
          Toast({message:'没有更多了',duration: 1000});
        }else{
          if(this.pageIndex == this.results.length-1){
            this.allLoaded = true;
            Toast({message:'没有更多了',duration: 1000});
          }
          this.reportInfo.push.apply(this.reportInfo,this.results[++this.pageIndex]);
        }
        // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
    // 去读取体检报告
    toReadReport:function(item){
//    var flag = this.getNetworkType ();
//    if(flag== false){
//      MessageBox.confirm('您正处于移动数据连接状态','温馨提示').then(action => {
//        window.location.href="http://saletest.wx.tkzj.taikang.com/showPDF/"+item.orderid+"/"+item.orgNo+".pdf"
//      })
//    }else{
        window.location.href="http://saletest.wx.tkzj.taikang.com/showPDF/"+item.orderid+"/"+item.orgNo+".pdf"
//    }
    },
    // 获取当前网络连接类型
    getNetworkType (){
      var wifi = true;
      var ua = window.navigator.userAgent;
      var con = window.navigator.connection;
      // 如果是微信
      if(/MicroMessenger/.test(ua)){
        // 如果是微信6.0以上版本，用UA来判断
        if(/NetType/.test(ua)){
          if(ua.match(/NetType\/(\S*)/)[1] != 'WIFI'){ wifi = false;}
        // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
        }else{
          document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
            WeixinJSBridge.invoke('getNetworkType',{},function(e){
              if(e.err_msg != "network_type:wifi"){ wifi = false;}
            });
          });
        }
      // 如果支持navigator.connection
      }else if(con){
        var network = con.type;
        if(network != "wifi" && network != "2" && network != "unknown"){  // unknown是为了兼容Chrome Canary
          wifi = false;
        }
      }
      window.networkWIFI = wifi;
      return window.networkWIFI;
    },
    // 支付时间picker
    onPaydateChange(picker, values){
      picker.setSlotValues(1, values[0])
      var arrpayDate = {'默认':'','一周内':'0', '三个月内':'1', '一年以内':'2', '一年或更久':'3'}
       this.searchInfo.payValue = arrpayDate[values[0]]
      this.searchInfo.payDate = values[0]
    },
    // 关键字picker
    onKeywordChange(picker, values) {
      picker.setSlotValues(1, values[0])// 设置选中的值
      var arrpayKey = {'默认':'','基础':'基础', '男性':'男', '女性':'女', '肿瘤':'肿瘤'}
      this.searchInfo.keyValue = arrpayKey[values[0]]// 页面所选对应的值赋给参数
      this.searchInfo.keyword = values[0] // 页面展示值
    },
    // 选择搜索条件
    checkSearchInfo: function (index) {
      if(index===2){
        this.searchModal.payDate = false
        $jquery("#payDate").html(this.searchInfo.payDate)
      }
      if(index===3){
        this.searchModal.keyword = false
        $jquery("#keyword").html(this.searchInfo.keyword)
      }
    },
    // 取消选项
    cancel:function(index){
      if(index===2){this.searchModal.payDate = false}
      if(index===3){this.searchModal.keyword = false}
    },
    // 搜索卡片
    toSearchCard:function () {
      var param={"openid":this.openid,"dateType":this.searchInfo.payValue,"keyword":this.searchInfo.keyValue}
      this.fillReport (param)
    },
  }
}
</script>

<style scoped>
   .newcard{
  position: absolute;
  right: .5rem;
  top: 0;
  z-index: 100;
  color: #FF0000;
  font-size: .67rem;
}
  .mint-loadmore-top{
    text-align: center;
    padding:0 45%;
    font-size: .72rem;
    color: #666;
  }
.mint-loadmore-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: .72rem!important;
    color: #999!important;
}
.myReports{
  background-color: #F8F8F8;
}
.new{
  position: absolute;
  right: .5rem;
  top: 0;
  z-index: 100;
  color: #FF0000;
  font-size: .67rem;
}
.contextTiao{
  font-size: 12px;
  color: #333333;
}
.bjBlue{
  background-color:#d9e6f2 ;
  border-bottom: 1px solid #8ab9e4;
  border-top: 1px solid #8ab9e4;
}
.bjGrey{
  background-color:#ffffff ;
  border: 0;
}
/*tiaoshi*/
.listbody ul{
  width: 100%;
}
.listbody ul li{
  width: 100%;
}
/*-----*/
.listhead {
  width: 100%;
  padding: .583rem .83rem;
  background-color: #EAEAEA;
  overflow: hidden;
}
.listhead li {
  float: left;
  height: 1.8rem;
  line-height: 1.8rem;
}

.listbtn {
  padding: 0 1rem 0 .55rem;
  background-color: #FFFFFF;
  margin-right: .83rem;
  border-radius: 3px;
}

.btn-d {
  background: #FFFFFF url(../../../assets/images/order/icons01.png) no-repeat;
  background-size: 10px;
  background-position: 91% 0.65rem;
  width: 40%;
}
.listbtn a {
  color: #a9a9a9;
  font-size: .667rem;
}
.surebtn a {
    display: inline-block;
    color: #5c9edc;
    padding: 0 4px;
    text-align: center;
    font-size: .667rem;
    border-radius: 3px;
  }
  .surebtn a:active{
    /*border: 1px solid #5c9edc;*/
    background-color: #5c9edc;
    color: #fff;
    box-sizing: border-box;
  }

/*有效卡的样式*/
.touse{
  width: 100%;
  height: 10.83rem;
  margin-bottom: .833rem;
}

.white{
 background-color: #FFFFFF;
 border-bottom: 1px solid #eef1f1;
  border-top: 1px solid #eef1f1;
}
.white .tolist{
  margin: 0 .611rem;
  border-bottom: 1px #eef1f1 dashed;
}
.tolist{
  margin: 0 .611rem;
  border-bottom: 1px #FFFFFF dashed;
}
.lineblock{
  display: inline-block;
}
p{
  font-size: .72rem;
}
.row1{
 height: 3rem;
 line-height: 3rem;
 color: #333333;
 font-size: .72rem;
 position: relative;
}
.lineblock.rt {
    position: absolute;
    right: .83rem;
}

.row1 .rl{
 width: 82%;
 color: #333333;
 
}
.row1 .rl h5{
  font-size: .72rem !important;
}
.row1 .rt a{
  color: #7086e4;
  font-size: .72rem !important;
}
.row1 .rt a:after{
border: solid 1px #5c9edc;
border-bottom-width: 0;
border-left-width: 0;
content: " ";
top: 50%;
/*right: 20px;*/
position: absolute;
width: 6px;
height: 6px;
-webkit-transform: translateY(-50%) rotate(45deg);
transform: translateY(-50%) rotate(45deg);
}
.mui-icon-forward:before {
  content: '\E470';
  font-size: .72rem !important;
}
.row2{
 padding: .5rem 0;
 height: 4rem;
 font-size: .778rem;
}
.row2 p{
 margin: 0;
 color: #333333;
}
.row2 .rl{
  line-height: 1.5rem;
  width: 68%;
}
.row2 .rt{
  height: 100%;
  line-height: 1rem;
}
.row2 .rt p{
 padding:.66rem 0 .72rem 1.12rem;
 margin-left: 1.16rem;
}
.row2 .rt p.icond{
 background: url(../../../assets/images/order/icond.png) no-repeat 0 0;
 background-size: 1rem;
 background-position: 0 .556rem;
}
.row2 .rt p.icond1{
 background: url(../../../assets/images/order/icond01.png) no-repeat 0 0;
 background-size: 1rem;
 background-position: 0 .556rem;
}
.row2 a{
 color: #333333;
}
.row3{
 margin: 0 .611rem;
 padding-top: .4rem;
}
.row3 p{
 margin: 0;
 line-height: 1.5rem;
 color: #333333;
}
.notuse {
  width: 100%;
  height: 10.83rem;
  background-color: #dedede;
  border-bottom: 1px solid #d0d0d0;
  border-top: 1px solid #d0d0d0;
  margin-bottom: .833rem;
}
.notuse p,.row1{
  color: #9e9e9e;
}
.usedbg{
  background:#dedede url(../../../assets/images/order/zz.png) no-repeat 0 0 ;
  background-size: 4.83rem;
  background-position:61.6% 1.88rem;
}
.disablebg{
  background:#dedede url(../../../assets/images/order/zz01.png) no-repeat 0 0 ;
  background-size: 4.83rem;
  background-position:61.6% 1.88rem;
}
/*以下为poppick的样式调整*/
.mint-popup.mint-popup-middle {
  width: 84%;
  border-radius: 4px;
}
/*文字*/
.mt-picker .picker-item.self {
  height: 2.2rem;
  color: red;
  font-size: .67rem !important;
  line-height: 2rem;
}
.picker-item.picker-selected {
  color: #333333;
  -webkit-transform: translate3d(0, 0, 0) rotateX(0);
  transform: translate3d(0, 0, 0) rotateX(0);
}
/*按钮*/
.btngroup {
  padding: .8rem;
}
label.mint-button-text {
  font-size: .89rem !important;
}
.mint-button--normal {
  display: inline-block;
  margin: .11rem;
  padding: 0 12px;
  width: 46%;
  height: 2.3rem;
}
.mint-button--default {
  margin-right: .5rem;
  border: 1px solid #dedede;
  background-color: #f6f8fa;
  box-shadow: none;
  color: #999999;
}
.mint-button--primary {
  background: linear-gradient(to right, #56b0d8, #6f81e4);
  color: #fff;
}
</style>
