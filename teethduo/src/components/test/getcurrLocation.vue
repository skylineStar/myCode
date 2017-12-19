<template>
  <div>
    <div class="runpage">
    	<span>
    		<div class="linkBlock" @click="getLocatPoint">去获取路线图 </div>
      </span>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import {requeryUsJS} from '../../assets/js/BaseJS.js'
import {getPosition} from '../../assets/js/getLocation.js'
export default {
  beforeCreate () {
    document.title = '获取当前地位';//包括 城市 经度 维度
  },
  mounted: function () {
  	this.location();
  },
  methods: {
  	location:function(){ 
	  	// 定位信息 
    	var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
    	if(qqlocation&&qqlocation.yesOrNo==1){
    		var t=qqlocation.time;
      	var outtime=new Date().getTime()-t>600000?true:false; //数据缓存10分钟  10*60*1000 1800000
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
           console.log("------------成功--------------");
              alert(JSON.stringify(data));//{lon: 116.407526, lat: 39 90403, city: "北京"}
//            console.log(data.city);
              alert("lon"+data.lon+"   lat"+data.lat);
           ifGetLocation={"yesOrNo":1,"data1":data,"time":new Date().getTime()}
           sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
         },
         function(){
          console.log("-----定位失败-----");
          sessionStorage.setItem('ifGetLocation',JSON.stringify({"YoN":2}));
         }
         )
      })
    },
    topage:function(){
    	var start=JSON.parse(sessionStorage.getItem('ifGetLocation')).data||{"lon":"133.407526","lat":"39 90403","addr":"222泰康人寿"}
    	alert(JSON.stringify(start));
    	var dest={"eword":"故宫博物馆","epointx":"116.39710","epointy":"39.917200"}
/*  	var url="http://apis.map.qq.com/tools/routeplan/eword="+
    	dest.eword+"&epointx="+dest.epointx+"&epointy="+dest.epointx+
   	"&sword="+start.addr+"&epointx="+start.lon+"&epointy="+start.lat+
    	"?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B"*/
    	//将腾讯导航改为地图
    	var url="http://apis.map.qq.com/tools/poimarker?type=1&keyword="+
//  	dest.eword+"&center="+start.epointy+","+start.epointx+"&region=北京"+
//酒店&center=39.908491,116.374328
    	dest.eword+"&center=null,null"+"&region=北京"+
    	"&bound=39.907293,116.368935,39.914996,116.379321"+
    	"&radius=1000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    	
    	//http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院|
    	window.location.href=url;
    },
    getLocatPoint:function(){
    	/*
    	 "hospitalAddr":"北京市东城区东长安街1号东方广场C3座E-（F1-F3层）","districtCode":"110101",
    	 "spellNo":"BJJMYYGLYXZRGSJMJDKQYY","provCode":"110000","lastModify":null,"distance":0.9,
    	 "cityCode":"110000","hospitalRule":"9:00-18:00","hospitalLongitudeLatitude":
    	 "116.4140600000,39.9096500000","hospitalName":"北京佳美医院管理有限责任公司佳美经典口腔医院",
    	 "avgQuality":4.0,"contactTel":"010-85186950","parentId":"6095","hospitalDes":"佳美目前在北京、上海、大连多个中心城市建立了数十家直营连锁门诊，终身会员突破百万。",
    	 "hospitalId":"6117","createTime":null,"doctorId":"230116","orgSource":"0",
    	 "orgCode":null,"hospitalImgId":null},
    	 * */
    	var hospitalAddr="北京市东城区东长安街1号东方广场C3座E-（F1-F3层）";
    	var hospitalLongitudeLatitude="116.4140600000,39.9096500000";
    	var coord=hospitalLongitudeLatitude.split(',')[1]+','+hospitalLongitudeLatitude.split(',')[0];
    	var city="北京";
    	var url=
    	"http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+coord+";title:"+city+";addr:"+hospitalAddr+
    	"&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    	window.location.href=url;
    	
    }
  }
}
</script>
<style scoped>
#container{
  background: #ffffff !important;
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
.runpage{
  width: 100%;
  position: relative;
}
.runpage span{
  width: 68%;
  height: 60px;
  display: inline-block;
  position: absolute;
      bottom: 33px;
    left: 17%;
    top: 10%;
    background: #ccc;
}
.linkBlock{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
