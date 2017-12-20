<template>
  <div style="width: 100% !important;">
    <div class="mui-content f8f8f8" style="width: 100% !important;">
      <div class="infoTitlePanel">
        <img :src="imgsrc" alt="" class="logoImg">
        <div class="infoTitleInfo">
          <span class="fs145">{{stationInfopageObj.orgName}}</span>
          <!-- <span class="blue">距我：200m</span> -->
          <div class="tiaoshi"><span class="tel_icon"></span>电话：{{stationInfopageObj.phone}}</div>
          <div class="tiaoshi"><span class="add_icon"></span>地址：{{stationInfopageObj.orgAddress}}</div>
        </div>
        <div class="clear"></div>
      </div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" @click="toMealDetail(1)">
          <a href="javascript:;" >
            <img class="mui-media-object mui-pull-left" src="../../../static/img/meal_man.png">
            <div class="mui-media-body">
              基础综合套餐-男性
              <div class='mui-ellipsis tiaoshi'>一般检查、内科、血常规、尿常规、肝功能、肾功能、血糖、血脂</div>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media" @click="toMealDetail(2)">
          <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../../../static/img/women1.png">
            <div class="mui-media-body">
              基础综合套餐-女性（未婚）
              <div class='mui-ellipsis tiaoshi'>一般检查、内科、血常规、尿常规、肝功能、肾功能、血糖、血脂</div>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media" @click="toMealDetail(3)">
          <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../../../static/img/women2.png">
            <div class="mui-media-body">
              基础综合套餐-女性（已婚）
              <div class='mui-ellipsis tiaoshi'>一般检查、内科、血常规、尿常规、肝功能、肾功能、血糖、血脂</div>
            </div>
          </a>
        </li>
      </ul>
      <ul class="check_tips">
        <li ><span >1、12项指标全面肿瘤筛查，风险早知道</span></li>
        <li ><span >2、全身脏器健康普查，心疼你的小心肝</span></li>
        <li ><span >3、专家解读体检报告，他们比你更懂你</span></li>
      </ul>
    </div>
    <!--【footer】-->
    <div class="buyPanel positionBottomF">
      <div class="buyPanel_L">
          <!--<div class="heji"><span>合计：</span> <span class="blue">￥{{baseData.orderPrice}}</span></div>
        <div class="prePrice"><s>￥{{baseData.originalPrice}}</s></div>-->
        <div class="youhuis" v-show="isMemberPrice.yesorno==='0'">
        	<div class="heji extra">
        		<span >合计：¥{{originalPrice}}</span>
        		<span>会员价：¥{{orderPrice}}</span>
        	</div>
        	<div @click="bemember"  id="member">
        	<!--	<img src="../../../static/img/vip.png" style="width: 0.944rem;height:0.694rem;"/>-->
        		点我成为泰康会员，享受超值会员价
        	</div>
        </div>
        <div class="sumdiv" v-show="isMemberPrice.yesorno==='2'||shengyu.yesorno==='0'">
        	<div class="heji"><span>合计：</span> <span class="blue">¥{{originalPrice}}</span></div>
        	<!--<div @click="bemember" style="font-size: 0.83rem;color:#5c9edc" id="member">点我成为泰康会员，享受超值会员价</div>-->
        </div>
        <div class="youhui" v-show="isMemberPrice.yesorno==='1'&&shengyu.yesorno!=='0'">
        	<div class="members"><span style="font-size: 0.7rem;">会员价：</span> <span class="blue">¥{{orderPrice}}</span></div>
        	<div><s>原价：¥{{originalPrice}}</s></div>
        </div>
        
      </div>
      <span class="buyPanel_R">
        <div  @click="tobuypage">立即购买</div>
      </span>
    </div>
  </div>
</template>
<script>
import { MessageBox} from 'mint-ui'
import {share_seed} from '../../assets/js/wxConfig.js'
import {config_param} from '../../assets/js/config_param.js'
import API from '../../api/API'
import {bemember} from '../../assets/js/mealfunc.js'
const api = new API();
export default {
  data () {
    return {
    	isMemberPrice:{'yesorno':'0'},//是否已选择会员价
    	shengyu:{'yesorno':'1'},//是否已选择会员价
      imgsrc: '',
      stationInfopageObj: {},//站点信息
      originalPrice: '',
      orderPrice: ''
    }
  },
  beforeCreate () {
    document.title = '机构详情';
  },
  mounted: function () {
  	this.init();
    this.getSessionData();
  },
  methods: {
  	init:function() {
  		var isMemberPrice=JSON.parse(sessionStorage.getItem('isMemberPrice'));
  		this.isMemberPrice = isMemberPrice;
  		var shengyu=JSON.parse(sessionStorage.getItem('shengyu'));
  		this.shengyu = shengyu;
  	},
    bemember:function() {
    	var that=this;
    	bemember(that,MessageBox,api);	
		},
    getSessionData: function () {
      var centerData =sessionStorage.getItem('saveCenterData');
      this.imgsrc = JSON.parse(centerData).imgsrc;
      var stationInfo=sessionStorage.getItem('saveStationInfo');
       this.stationInfopageObj=JSON.parse(stationInfo);
      // 底部购买
      var homePriceSave=sessionStorage.getItem('homePriceSave');
      this.originalPrice = JSON.parse(homePriceSave).originalPrice;
      this.orderPrice = JSON.parse(homePriceSave).orderPrice;
    },
    changeCity: function () {
      window.location.href="#/meal/location"
    },
    toMealDetail: function (type) {
      var mealSearchData = {};
      if (type == 1) {
        mealSearchData.type = "男性";
      }else if (type == 2) {
        mealSearchData.type = "女未";
      }else if (type == 3) {
        mealSearchData.type = "女已";
      }
      sessionStorage.setItem('mealSearchData',JSON.stringify(mealSearchData)); 
      window.location.href = "#/meal/mealSearch/mealInfo";
    },
    tobuypage:function(){
     	window.location=config_param.buy_oauth2;
     }
  }
}
</script>
<style scoped>
.tiaoshi{
  font-size: 14px;
  color: #8f8f94;
}
.mui-table-view li a .mui-media-body{width: 81%;}
.clear{
  clear: both;
}
.infoTitlePanel{
  padding: 12px 4% 10px 4%; 
  margin-bottom: 15px;
  background: #ffffff;
}
  .logoImg{
    display: inline-block;
    width: 23%;
    height: 75px;
    border: solid 1px #f8f8f8;
    float: left;
    background: url('../../../static/img/logo1.png');
    background-size: 100% 100%; 
}
  .infoTitleInfo{
    float: right;
    width: 74%;
    height: auto;
  }
    .infoTitleInfo p{
      margin-bottom: 0;
    }
    .tel_icon{
      display: inline-block;
      width: 8.5px;
      height: 9.5px;
      margin-right: 2%;
      background: url('../../../static/img/location.png') no-repeat; 
      /*名字和phone搞反了 现在是正确的*/
      background-size: 100% 100%;
    }
    .add_icon{
      display: inline-block;
      width: 8.5px;
      height: 9.5px;
      margin-right: 2%;
      background: url('../../../static/img/phone.png') no-repeat;
      background-size: 100% 100%; 
    }

.mui-table-view .reset1{
  max-width: 75px;
}
.check_tips{
  font-size: 14px;
  padding: 7px 15px; 
  margin: 0;
}
.footPrice{ float: left; width: 40%; /*height: 100%;*/ } 
.footPrice p{ margin: 0; }
/**/
.infoTitle li{
  height: auto;
}
.location_icon{
  display: inline-block;
  width: 8.5px;
  height: 9.5px;
  background: url('../../../static/img/phone.png');
  background-size: 100% 100%; 
}
.phone_icon{
  display: inline-block;
  width: 8.5px;
  height: 10px;
  background: url('../../../static/img/location.png');
  background-size: 100% 100%; 
}
.mui-table-view li a .mui-media-body{
  width: 82%;
}
.mui-media-body div{
  width: 100%;
  height: auto;
}
.tiaoshi{
  font-size: 14px;
  color: #8f8f94;
}
</style>
