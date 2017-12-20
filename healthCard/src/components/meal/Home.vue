<!-- 
最后操作时间：
备注：
  1 底部购买条动态请求，
  2 代码优化
 -->
<template>
  <div id="container">
    <div class="mui-content"  style="width:100%; height: calc(100% - 59px);">
      <div class="home_titleImg">
      	<img src="../../../static/img/homeTitleimg.png" />
      </div>
      <div class="selectArea">
        <ul class="selectBtn">
        	<!--<li @click="testlocation" >-->
          <li @click="tolocationpage" >
            <span class="icon1"></span>体检机构
          </li>
          <li @click="toSearchPage(2)">
              <span class="icon2"></span>套餐查询
          </li>
          <li @click="toSearchPage(3)">
              <span class="icon3"></span>工作日查询
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="introArea">
        <div class="introTitle">
          <span class="proIcon"></span>
          <span class="introTitle_text blue">产品简介</span>
          <div class="clear"></div>
        </div>
        <ul>
            <li>1、四大权威体检机构倾情加盟
              <div style="color: #959798;">爱康国宾、美年大健康、慈铭体检、瑞慈医疗</div>
            </li>
            <li >2、76个城市，超过254家体检网点</li>
            <li >3、专业体检团队，全面体检项目</li>
            <li >4、随时随地、一键预约</li>
            <li >5、电子健康档案同步管理</li>
        </ul>
      </div>
      <div class="attentionArea">
        <div class="attentionAreaTitle">
          <span class="note"></span>
          <span class="noteText blue">注意事项</span>
          <div class="clear"></div>
        </div>
        <ul>
          <li >1、体检卡有效期截止到2018-07-31，请在有效期内使用；</li>
          <li >2、以免给您带来不便，购买前请注意体检服务城市说明；</li>
          <li >3、本卡不记名、不挂失、不退换、请您妥善保存；</li>
          <li >4、本体检卡只可以给18周岁（含）以上的用户预约使用；</li>
        	<li >5、本卡最终解释权归泰康健康管理公司所有。</li>
        </ul>
      </div>
    </div>
    <div class="buyPanel positionBottomF">
      <div class="buyPanel_L">
        <!--<div class="heji"><span>合计：</span> <span class="blue">￥{{baseData.orderPrice}}</span></div>
        <div class="prePrice"><s>￥{{baseData.originalPrice}}</s></div>-->
        <div class="youhuis" v-show="isMemberPrice.yesorno=='0'">
        	<div class="heji extra">
        		<span>合计：¥{{baseData.originalPrice}}</span>
        		<span>会员价：¥{{baseData.orderPrice}}</span>
        	</div>
        	<div @click="bemember" id="member">
        		<!--<img src="../../../static/img/vip.png" style="width: 0.944rem;height:0.694rem;"/>-->
        		点我成为泰康会员，享受超值会员价
        	</div>
        </div>
        <div class="sumdiv" v-show="isMemberPrice.yesorno==='2'||shengyu.yesorno==='0'">
        	<div class="heji"><span>合计：</span> <span class="blue">¥{{baseData.originalPrice}}</span></div>
        </div>
        <div class="youhui" v-show="isMemberPrice.yesorno==='1'&&shengyu.yesorno!=='0'">
        	<div class="members"><span style="font-size: 0.7rem;">会员价：</span> <span class="blue mprice">¥{{baseData.orderPrice}}</span></div>
        	<div><s>原价：¥{{baseData.originalPrice}}</s></div>
        </div>
        
      </div>
      <span class="buyPanel_R">
        <!--<router-link to="/meal/buyNow/buyNow">立即购买</router-link>-->
        <div  @click="tobuypage">立即购买</div>
      </span>
    </div>
  </div>
</template>
<script>
import { MessageBox} from 'mint-ui'
import {share_seed} from '../../assets/js/wxConfig.js'
import {hideaddress,requeryUsJS} from '../../assets/js/BaseJS.js'
import {getPosition} from '../../assets/js/getLocation.js'
import {config_param} from '../../assets/js/config_param.js'
import API from '../../api/API'
import {bemember} from '../../assets/js/mealfunc.js'
const api = new API();
export default {
  name: 'home',
  data () {
    return {
    	isMemberPrice:{'yesorno':''},//是否已选择会员价
    	shengyu:{'yesorno':''},//剩余会员卡数
      baseData: {}  // originalPrice 原价,orderPrice 现价 
    }
  },
  beforeCreate(){
    document.title = '青春版体检套餐';
  },
  mounted: function () {
  	share_seed();
  	var that=this;
  	// 获取页面信息
  	if(sessionStorage.getItem('isMemberPrice')){
  		var isMemberPrice=JSON.parse(sessionStorage.getItem('isMemberPrice'));
  		that.isMemberPrice = isMemberPrice;
  	}
  	if(sessionStorage.getItem('shengyu')){
  		var shengyu=JSON.parse(sessionStorage.getItem('shengyu'));
  		that.shengyu = shengyu;
  	}
//	hideaddress();
  	this.removeSession();
    this.scrollTo();
    this.pageInit();
    this.location();
  },
  methods: {
    scrollTo: function () {
      window.scrollTo(0,0);
    },   
    pageInit: function () {
    	var that=this;
      var r =JSON.parse(sessionStorage.getItem('uInfo'));
      var param = {
				"sid": 2,
				"custOpenId":r.id,
				"userType":r.userType,
				"mssid":r.mssid
      };
      var response = api.byitPageInit(param);
      response.then(function(res){
           console.log(res)
//         alert(res);
        var data=res.data;
        if(data.state=='1'){
          var bData = data.custData.productinfo;
          var homePriceSave={
            "originalPrice": bData.originalprice, // 原价
            "orderPrice": bData.currentprice,  // 现价
            "productname":bData.productname,
            "productcode":bData.productcode,
          }
   				that.baseData=homePriceSave;
   				var vip=data.custData.isvip;
          if(vip=='1'){
          	that.isMemberPrice.yesorno='1';
          }else if(vip=='2'){
          	that.isMemberPrice.yesorno='2';
          }else if(vip=='0'){
          	that.isMemberPrice.yesorno='0';
          }
          if(data.custData.vipCard=='0'){
          	that.shengyu.yesorno='0';
						sessionStorage.setItem('shengyu',JSON.stringify(that.shengyu));  //是否有剩余卡数
          }else{
          	that.shengyu.yesorno='1';
						sessionStorage.setItem('shengyu',JSON.stringify(that.shengyu));  //是否有剩余卡数
          }
	        sessionStorage.setItem('isMemberPrice',JSON.stringify(that.isMemberPrice));  //储存会员价的状态值
               // session存储 各页面底部购买条用  homePriceSave : originalPrice orderPrice productname
          sessionStorage.setItem('homePriceSave',JSON.stringify(homePriceSave));
        }else if(data.state=='-1'||data.state=='-2'){//-1错误状态 -2代理人离职状态
          console.log(data.message);
          window.location.replace("#/common/errorLink");//跳转至错误页面
        }
      }).catch(function(err){
          console.log(err);
      });
    },
    testlocation:function(){
    	var ifGetLocation = {}; 
    	var data={"lon": "116.407526", "lat": "39 90403", "city": "北京"}
	    console.log(data.city)
	   ifGetLocation.yesOrNo= 1;
	   ifGetLocation.data1= data;
	   sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
	   window.location.href="#/meal/jigouSelect";
    },
    location:function(){ 
	  	if(sessionStorage.getItem('citySlectData'))return;//手动选择
	  	// 定位信息 
    	var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
    	if(qqlocation&&qqlocation.yesOrNo==1){
    		var t=qqlocation.time;    		
      	var outtime=new Date().getTime()-t>1800000?true:false; //数据缓存半小时 30*60*1000 1800000
      	if(outtime){
				sessionStorage.removeItem('ifGetLocation');
      	}else{
      		 return;
      	}
    	}
      var _this = this;
      var ifGetLocation = {}; 
      requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',function(){
         getPosition(
          function(data){
          //console.log("------------成功--------------");
           ifGetLocation={"yesOrNo":1,"data1":data,"time":new Date().getTime()}
           sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
         },
         function(){
          ifGetLocation.yesOrNo= 2;
          sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
          //console.log("-----定位失败-----");
         }
         )
      })
    },
    tolocationpage:function(){
    	var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
    	var citySlectData=JSON.parse(sessionStorage.getItem('citySlectData'));
    	if(qqlocation&&qqlocation.yesOrNo==1||citySlectData){//有过定位或是手动选择过城市，直接跳转至机构页
    		window.location.href="#/meal/jigouSelect";
    	}else{
    		window.location.href="#/meal/location";
    	}
    },
    toSearchPage: function (type) {
      if (type == 2) {
        window.location.href="#/meal/mealSearch/mealSearch";
      }if (type == 3) {
        window.location.href="#/meal/workdaySearch/workdaySearch";
      }
    },
    removeSession:function(){
    	var removeList=["saveCenterData","saveStationInfo",
    	"mealSearchData","personalInfo","currrentCount","tips","csDataSuccess1",
    	"sendDataToBuynowPage","saveFormData1","saveFormData2"]
			removeList.forEach(function(i){
				sessionStorage.removeItem(i);
			})
    },
    bemember:function() {
    	var that=this;
    	bemember(that,MessageBox,api);	
		},
    tobuypage:function(){
     	window.location=config_param.buy_oauth2;
     }
  }
}
</script>
<style scoped>
/*searchBox 调整*/
.mint-search{margin-top: 40px; height: auto;}
.mint-searchbar-inner i{margin-left: 2%;}
.mint-searchbar-core{
  margin-top: 6%;
  height: 24px;
  padding-left: 2%;
}
#container{
  background: #ffffff !important;
  width: 100%;
}
.mui-bar{
  background-color: #1c1b20 !important;
}
.mui-title{
  color: #ffffff !important;
}
.mui-icon-back:before, .mui-icon-left-nav:before {
  content: '\E471';
  color: #ffffff !important;
}
.mui-content{
  background: #ffffff;
}
.clear{
  clear: both;
}
.home_titleImg{
  width: 100%;
  /*height: 389px;
  background: url(../../static/img/homeTitleimg.png);
  background-size: 100% 100%;*/
}
.selectArea{
  width: 100%;
  height: auto;
  padding-left: 0;
  padding-right: 0;
}
.selectBtn{
  width: 100%;
  height: 100%;
}
.selectBtn li{
  width: 20%;
  height: auto;
  float: left;
  margin-left: 10%;
  font-size: 12px;
  font-family: "Microsoft YaHei", '微软雅黑', Helvetica, Arial, sans-serif !important;
  color: #333333;
  text-align: center;
}
  .icon1{
    display: inline-block;
    width: 100%;
    height: 77px;
    background: url('../../../static/img/meal.png') top left;
    background-size: 100% 100%;
    text-indent: 0;
  }
  .icon2{
    display: inline-block;
    width: 100%;
    height: 77px;
    background: url('../../../static/img/mealSearch.png') top left;
    background-size: 100% 100%;
  }
  .icon3{
    display: inline-block;
    width: 100%;
    height: 77px;
    background: url('../../../static/img/workdaySearch.png') top left;
    background-size: 100% 100%;
  }
.introArea{
  height: auto;
  margin: 20px 6%;
  padding: 16px 4%;
  background: #f0f5fc;
}
  .introTitle{
    font-size: 15px;
  }
  .introArea ul li{
    /*height: 53px;*/
    padding: 0 !important;
    font-size: 13px;
    padding: 3% 0 !important;
    border-bottom: solid 1px #ffddce;
  }
.attentionArea{
  font-size: 11.5px;
  color: #666666;
  margin: 4%;
  margin-bottom: 25%;
}
  .attentionAreaTitle{
    font-size: 15px;
    font-family: "Microsoft YaHei", '微软雅黑', Helvetica, Arial, sans-serif !important;
    color: #ff5300;
  }
/*调整*/
.proIcon{
  display: inline-block;
  width: 16px;
  height: 17px;
  background: url('../../../static/img/productIcon1.png') top left;
  background-size: 100% 100%;
  float: left;
  margin-right: 2%;
}
  .introTitle_text,.noteText{
    display: inline-block;
    width: 30%;
    float: left;
  }
.note{
  display: inline-block;
  width: 16px;
  height: 17px;
  background: url('../../../static/img/notesIcon.png') top left;
  background-size: 100% 100%;
  float: left;
  margin-right: 2%;
}
.selectBtn li span{
  text-align: center !important;
}
</style>
