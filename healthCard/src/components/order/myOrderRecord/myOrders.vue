<template>
  <div id="my_records" class="MyRecords">
    <div class="body">
      <ul class="listhead">
        <li class="listbtn btn-d" @click="searchModal.time = true">
          <a href="javascript:void(0)" class="result_time">购买时间</a>
        </li>
        <li class="listbtn btn-d" @click="searchModal.keyword = true">
          <a href="javascript:void(0)" class="result_keyword">关键字</a>
        </li>
        <li class="surebtn" @click="searchitemFn">
          <a href="javascript:void(0);">搜索</a>
        </li>
      </ul>
      <!-- 弹出层-时间 -->
      <mt-popup v-model="searchModal.time" position="middle">
        <mt-picker :slots="timePick" @change="onCardstateChange1" >
        </mt-picker>
        <div class='btngroup'>
          <mt-button type='default' size='normal' @click.native="SlectCancel(1)">取消</mt-button>
          <mt-button type='primary' size='normal' @click.native="SlectTrue(1)">确定</mt-button>
        </div>
      </mt-popup>
      <!-- 弹出层-关键字 -->
      <mt-popup v-model="searchModal.keyword" position="middle">
        <mt-picker :slots="keywordPicck" @change="onCardstateChange2" >
        </mt-picker>
        <div class='btngroup'>
          <mt-button type='default' size='normal' @click.native="SlectCancel(2)">取消</mt-button>
          <mt-button type='primary' size='normal' @click.native="SlectTrue(2)">确定</mt-button>
        </div>
      </mt-popup>
      <div class="listbody">
        <ul v-if='status ==1' class = 'fillList'>
          <mt-loadmore :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  bottomPullText='上拉加载'>
        
            <li class='touse dotted ' v-for="(item, index) in baseData" @click="toOrderInfoPage(item)"
            :class="item.ifRead=='Y'?'bjGrey':'bjBlue'">
              <router-link to="" class="btnBlock">
                <div class="tolist row1">
                  <div class='lineblock rl'><h5>卡名称：{{item.cardName}}</h5></div>
                  <div class='lineblock rt'><a href="javascript:void(0);" >去看看</a><span class='toright'></span></div>
                </div>
                <div class="tolist row2">
                  <div class='lineblock rl'>
                    <div class="contextTiao">体检人：{{item.name}}<span class="hide">{{item.ifread}}</span></div>
                    <div class="contextTiao">体检日期：{{item.appointmentdate}}</div>
                  </div >
                </div>
                <div class="row3">
                  <div class="contextTiao">体检机构：{{item.managecom}}</div>
                  <div class="contextTiao">体检套餐：{{item.producname}}</div>
                </div>
              </router-link>
            </li>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><mt-spinner :size='20' color="#26a2ff"type="fading-circle"></mt-spinner></span><!--↓-->
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
            <div slot = 'bottom'class="mint-loadmore-bottom"><span class="mint-loadmore-text">上拉加载</span></div>
          </mt-loadmore>
        </ul>
        <div  v-if='status ==3' class='whiteList' ><img src="../../../assets/images/order/searchbg.png"/><span class='whitetext'>没找到相关的匹配结果，请重试</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { Indicator,Toast } from 'mint-ui'
import API from '../../../api/API'
const api = new API();
import {hideaddress} from '../../../assets/js/BaseJS.js'
export default {
  name: 'MyRecords',
  data () {
    return {
      searchModal:{
        time: false,
        keyword: false
      },
      searchInfo:{
        timeInfo: '',
        keywordInfo: '',
        timeInfoValue:"",
        keywordInfoValue:''
      },
      // 购买时间
      timePick: [{
        flex: 1,
        values: ['默认','一周内','三个月内','一年以内','一年或更久'],
        className: 'timePick',
        textAlign: 'center'
      }],
      // 关键字
      keywordPicck: [{
        flex: 1,
        values: ['默认','基础','男性','女性','肿瘤'],
        className: 'keywordPicck',
        textAlign: 'center'
      }],
      "baseData": [],
      topStatus: '',
      allLoaded:false,
      pageIndex:0,
      results:[],
      status:'',
      "appointDate": '', // 查询时间节点
      "keyWord": '', // 查询关键字
      'openid':""
    }
  },
  beforeCreate () {
    document.title = '我的预约'
  },
  mounted: function () {
    hideaddress();
    var r =JSON.parse(sessionStorage.getItem('uInfo'));
    this.openid=r.id;
    var param = {"openid": this.openid ,"dateType": "","keyWord": ""};
    this.queryMyOrder(param);
  },
  methods: {
    queryMyOrder: function (param) {
      var _this = this;
      _this.allLoaded=false;
      _this.pageIndex=0;
      var response = api.queryMyOrdersList(param);
      response.then(function(res){
        if(res.data.status=='1'){
          var bData = res.data.data;
          _this.status = res.data.status
          _this.results = _this.sliceArr(bData,4);
          _this.baseData = _this.results[0];
        }else {
          _this.baseData = [];
          if(res.data.message){
            Toast({message:res.data.message})
          }else{
            Toast({message:"发生内部错误"})
          }
         _this.status = res.data.status
          
        }
      }).catch(function(err){
//        _this.mui.toast('网络异常！');
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
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop:function(){
        var param = {"openid": this.openid ,"dateType": "","keyWord": ""};
        this.queryMyOrder(param);
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
          this.baseData.push.apply(this.baseData,this.results[++this.pageIndex]);
        }
        // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      
    toOrderInfoPage: function (e) {
      var str = {};
      str.orderid=e.orderid;
      str.orgNo=e.orgNo;
      sessionStorage.setItem('orderIdData',JSON.stringify(str));
      window.location.href="#/order/myOrderRecord/myOrderInfo";
    },
    // piccker-time
    onCardstateChange1 (picker, values) {
      picker.setSlotValues(1, values[0])
      this.searchInfo.timeInfo = values[0];
      var arrpayDate = {'默认':"",'一周内':'0', '三个月内':'1', '一年以内':'2', '一年或更久':'3'}
      this.searchInfo.timeInfoValue = arrpayDate[values[0]]
    },
    // piccker-keyword
    onCardstateChange2 (picker, values) {
      picker.setSlotValues(1, values[0])
      this.searchInfo.keywordInfo = values[0];
      var arrKey = {'默认':"",'基础':'基础', '男性':'男', '女性':'女', '肿瘤':'肿瘤'}
      this.searchInfo.keywordInfoValue = arrKey[values[0]]
    },
    // 点击确定
    SlectTrue: function (index) {
      var _this = this;
      if(index == 1){
        this.searchModal.time = false;
        $(".result_time").html(this.searchInfo.timeInfo);
      }if(index == 2){
        this.searchModal.keyword = false
        $(".result_keyword").html(this.searchInfo.keywordInfo);
      }
    }, 
    // 点击取消
    SlectCancel: function (index) {
      if(index == 1){ this.searchModal.time = false;}
      if(index == 2){this.searchModal.keyword = false;}
    },
    // 点击搜索 queryinterface
    searchitemFn: function () {
      var _this = this;
      var time1 = _this.searchInfo.timeInfoValue;
      var keyword1 = _this.searchInfo.keywordInfoValue;
      var param = {  "dateType": time1,"keyword": keyword1,"openid": _this.openid};
      this.queryMyOrder(param);
    }
  }
}
</script>
<style scoped>
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
/*tiaoshi*/
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
  border:0;
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
  text-align: center;
  font-size: .667rem;
  color: #5c9edc;
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
.toright:after{
border: solid 1px #5c9edc;
border-bottom-width: 0;
border-left-width: 0;
content: " ";
top: 50%;
right: 20px;
position: absolute;
width: 6px;
height: 6px;
-webkit-transform: translateY(-50%) rotate(45deg);
transform: translateY(-50%) rotate(45deg);
}
.row1 .rl{
 width: 73%;
 color: #333333;
 
}
.row1 .rl h5{
  font-size: .72rem !important;
}
.row1 .rt a{
  color: #7086e4;
  font-size: .72rem !important;
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
