<template>
  <div>
    <div>
      <div class="mealInfoBox">
        <div class="title_img">
          <img :src="pageContent_M.srcLoader" alt="" />
        </div>
      </div>
      <div class="info_contentPanel">
        <fieldset class="info_content">
          <legend class="colorOrg yahei fs13 blue">套餐内容</legend>
          <div class="info_content_title c333 fs155">基础综合套餐{{pageContent_M.infoTitle}}</div>
          <ul>
            <li class="yahei fs125 c666" style="color: #403b3b; font-size: 14.5px;">
              {{pageContent_M.type1}}
              <div class="tiaoshi">{{pageContent_M.text1}}</div>
            </li>
            <li class="yahei fs125 c666" style="color: #403b3b; font-size: 14.5px;">
              {{pageContent_M.type2}}
              <div class="tiaoshi">{{pageContent_M.text2}}</div>
            </li>
            <li class="yahei fs125 c666" style="color: #403b3b; font-size: 14.5px;">
              {{pageContent_M.type3}}
              <div class="tiaoshi">{{pageContent_M.text3}}</div>
            </li>
            <li class="yahei fs125 c666" style="color: #403b3b; font-size: 14.5px;">
              {{pageContent_M.type4}}
              <div class="tiaoshi">{{pageContent_M.text4}}</div>
            </li>
          </ul>
        </fieldset>
      </div>
      <div class="readMore">
        <button type="button" class="mui-btn centerBtn" @click="seeMore">点击查看更多&nbsp<span class="triangleDown"></span></span>
        </button>
      </div>
      <div class="noteTips">
        <fieldset class="info_content2">
          <legend class="colorOrg yahei blue fs13">注意事项</legend>
          <ul>
            <li class="yahei fs125">1、体检卡有效期截止至2018-07-31，请您在有效期内使用。</li>
            <li class="yahei fs125">2、购买前请注意体检服务城市说明，以免给您带来不便。</li>
            <li class="yahei fs125">3、本卡不记名、不挂失、不退换请您妥善保管。</li>
            <li class="yahei fs125">4、本体检卡只可以给18周岁（含）以上的用户预约使用。</li>
            <li class="yahei fs125">5、本卡最终解释权归泰康健康管理公司所有。</li>
          </ul>
        </fieldset>
      </div>
    </div>
    <!--【footer】-->
    <div class="buyPanel positionBottomF">
      <div class="buyPanel_L">
        <!--<div class="heji"><span>合计：</span> <span class="blue">￥{{orderPrice}}</span></div>
        <div class="prePrice"><s>￥{{originalPrice}}</s></div>-->
        <div class="youhuis" v-show="isMemberPrice.yesorno==='0'">
        	<div class="heji extra">
        		<span >合计：¥{{originalPrice}}</span>
        		<span>会员价：¥{{orderPrice}}</span>
        	</div>
        	<div @click="bemember"  id="member">
        		<!--<img src="../../../../static/img/vip.png" style="width: 0.944rem;height:0.694rem;"/>-->
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
import { MessageBox } from 'mint-ui';
import {share_seed} from '../../../assets/js/wxConfig.js'
import {config_param} from '../../../assets/js/config_param.js'
import API from '../../../api/API'
import {bemember} from '../../../assets/js/mealfunc.js'
const api = new API();
export default {
  data () {
    return {
    	isMemberPrice:{'yesorno':'0'},//是否已选择会员价
    	shengyu:{'yesorno':'1'},//是否已选择会员价
      mealType: '',  // 1 男性 2 女未 3 女已
      pageContent_M: {},
      originalPrice: '',
      orderPrice: ''
    }
  },
  beforeCreate () {
    document.title = '套餐详情';
  },
  mounted: function () {
  	share_seed();
    window.scrollTo(0,0);
    this. init();
    this.pageInit();
  },
  methods: {
  	init:function() {
  		var isMemberPrice= JSON.parse(sessionStorage.getItem('isMemberPrice'));
  		this.isMemberPrice = isMemberPrice;
  		var shengyu=JSON.parse(sessionStorage.getItem('shengyu'));
  		this.shengyu = shengyu;
  	},
    bemember:function() {
    	var that=this;
    	bemember(that,MessageBox,api);	
		},
    pageInit: function () {
      var mealSearchData =sessionStorage.getItem('mealSearchData');
      this.mealType = JSON.parse(mealSearchData).type;
      this.pageContent_M = {
          "type1": "第一类：临床体检项目",
          "type2": "第二类：实验室检查项目",
            "text2": "血常规、尿常规、肝功能、肾功能、血糖、血脂、肿瘤标志物检测",
          "type3": "第三类：器械检查项目",
            "text3": "静态心电图（ECG）、B超、X光检查",
          "type4": "第四类：其他",
            "text4": "体检报告、营养早餐"
        }
      if (this.mealType == "男性") {
        this.pageContent_M.infoTitle="（男性）";
        this.pageContent_M.srcLoader="../../../../static/img/mealTop.png";
        this.pageContent_M.text1="一般检查、内科、外科";
      } else if (this.mealType == "女未") {
        this.pageContent_M.infoTitle="（女性未婚）";
        this.pageContent_M.srcLoader="../../../../static/img/mealTop2.png";
        this.pageContent_M.text1="一般检查、内科、外科、妇科";
      } else if (this.mealType == "女已") {
         this.pageContent_M.infoTitle="（女性已婚）";
        this.pageContent_M.srcLoader="../../../../static/img/mealTop3.png";
        this.pageContent_M.text1="一般检查、内科、外科、妇科";
      }
      // 底部购买
      var homePriceSave=sessionStorage.getItem('homePriceSave');
      this.originalPrice = JSON.parse(homePriceSave).originalPrice;
      this.orderPrice = JSON.parse(homePriceSave).orderPrice;
    },
    seeMore: function () {
      window.location.href="#/meal/mealSearch/popImg";
    },
    tobuypage:function(){
      window.location=config_param.buy_oauth2;
     }
  }
}
</script>
<style scoped>
/*p{*/
  /*margin-bottom: 0;*/
/*}*/
.title_img{
  /*width:100%;*/
  height: 8.89rem;
  padding: 3% 4% 0;
  background: #ffffff;
}
.title_img img{
width: 100%;
/*height: 100%;*/
}
/*.title_img_info{*/
/*width: 100%;*/
/*height: 42px;*/
/*background: #5d5d5d;*/
/*color: #ffffff;*/
/*line-height: 42px;*/
/*padding-left:0.625rem;*/
/*}*/
.info_contentPanel{
background: #ffffff;
  padding-top: 0.3rem;
}
.info_content{
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.readMore{
/*width:100%;*/
/*height: auto;*/
background: #ffffff;
}
.centerBtn{
  width: 100%;
  /*height: auto;*/
  display: inline-block;
  /*text-align: center;*/
}
.noteTips{
background: #ffffff;
margin-top: 0.83rem;
padding-top: 0.55rem;
/*margin-bottom:20%;*/
padding-bottom: 3.6rem;
}
.info_content2{
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.info_content2 ul li{
  /*width: 100%;*/
  color: #999999;
  /*white-space: nowrap;*/
}
.info_content_title{
  padding: 0.28rem 0;
  font-weight: 900;
}
.tiaoshi{
  font-size: 0.7rem;
  color: #8f8f94;
}
</style>
