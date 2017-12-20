<template>
  <div style="width: 100% !important;">
    <div class="mui-content" style="width: 100% !important;">
      <div class="staTitle">
        <img :src="centerDataArr.imgsrc" alt="" class="staTitle_L">
        <div class="staTitle_R">
          <span>{{centerDataArr.centerName}}</span>
          <div class="tiaoshi">共{{centerCount}}家店</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="bjColor panelBox">
        <span class="panelBox_L huiColor">附近推荐</span>
        <span class="panelBox_R">当前定位： {{cityName}} &nbsp<a @click="changeCity">切换</a></span>
      </div>
      <ul class="top5panel">
        <li class="" v-for="station in stationDataArr_Change" @click="toStationInfo(station)">
          <a to="/meal/jigouInfo" class="top5item">
            {{station.orgName}}
            <!-- <span v-if="getLocation != 0">(距我200m)</span> -->
          </a>
        </li>
      </ul>
      <!-- limitNum=addressList.length -->
      <button type="button" class="mui-btn mui-btn-outlined checkMore" @click="checkmoreFn">
        查看更多&nbsp<span class="triangleDown"></span>
      </button>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
	import {share_seed} from '../../assets/js/wxConfig.js'
import API from '../../api/API'
const api = new API();
export default {
  data () {
    return {
      cityName: '',
      centerCount: '', // 共？家店
      centerDataArr: {},//中心数据
      stationDataArr_Change: [],//页面展示的站点数据
      stationDataArr: [],   //所有的站点数据
      stationArr5: [],  //站点数据多于5条时，前5条数据
      limitNum5: false // true为全部数据 false为展示5条数据 
    }
  },
  beforeCreate () {
    document.title = '体检站点选择';
  },
  mounted: function () {
    this.getSessionData();
  },
  methods: {
    getSessionData: function () {
      var _this=this;
      var getLocation= sessionStorage.getItem('ifGetLocation');
      var citySlectData=sessionStorage.getItem('citySlectData'); // location页面存入的数据 获取cityName
     if(citySlectData) this.cityName = JSON.parse(citySlectData).cityPick;
     if(getLocation){
      var cyName = JSON.parse(getLocation).data1;
      if (cyName) {
          this.cityName = cyName.city;
        }
      } 
      // 
      var CenterData =sessionStorage.getItem('saveCenterData'); // 点击机构时存下的数据，获取 stationDataArr
		  _this.centerDataArr = JSON.parse(CenterData);
        _this.stationDataArr = _this.centerDataArr.centerList;
        _this.centerCount = _this.stationDataArr.length; // 共？家店
//        console.log(_this.stationDataArr);
        if (_this.centerCount <= 5) {
          $(".checkMore").css({"display":"none"});
          _this.stationDataArr_Change = _this.stationDataArr;
        }else{                         //站点数大于5条时
          $(".checkMore").show();      //显示“查看更多”
          _this.stationArr5 = _this.stationDataArr.slice(0,5); 
          _this.stationDataArr_Change = _this.stationArr5;  // 显示前5条
        }
//      console.log(_this.stationDataArr_Change);
    },
    checkmoreFn: function () {
        this.limitNum5 = !this.limitNum5;  // true为全部数据 ;false为展示5条数据 
        if (this.limitNum5) {
          this.stationDataArr_Change = this.stationDataArr;
          $(".checkMore").html("收起列表");
        } else {
          this.stationDataArr_Change = this.stationArr5
          $(".checkMore").html("查看更多 &nbsp;<span class='triangleDown'></span>");
        }
    },
    changeCity: function () {
      window.location.href="#/meal/location"
    },
    toStationInfo: function (station) {
      sessionStorage.setItem('saveStationInfo',JSON.stringify(station));
      window.location.href="#/meal/jigouInfo";
    }
  }
}
</script>
<style scoped>
.triangleDown {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 7px solid black;
}
.top5panel{
/*  width: 100%;*/
  padding: 0.28rem .83rem;
/*  background: #ffffff;*/
}
.top5panel li{
/*  width: 100%;*/
  height:2.28rem;
  border-bottom: solid 1px #f8f8f8;
  line-height:2.28rem;
}
.top5panel li a{
  font-size:0.67rem;
  color: #333333;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.huiColor{
  color: #888686;
}
/**/
.bjColor {
  background: #f8f8f8;
}
.panelBox {
/*  width: 100%;*/
  height: 2.39rem;
  line-height: 2.39rem;
  padding: 0 0.83rem;
  font-size: 0.78rem;
}
  .panelBox_L{
   /* display: inline-block;*/
    float: left;
  }
  .panelBox_R{
  /*  display: inline-block;*/
    float: right;
  }
.checkMore {
  width: 100%;
}
/*调整的css*/
.clear{clear: both;}
.staTitle{
 /* width: 100%;*/
  height: 5.5rem;
  background: #ffffff;
  padding: 0 4%; 
}
  .staTitle_L{
    width: 4.22rem;
    height: 4.22rem;
 /*   display: inline-block;*/
    float: left;
    /*background: url('../../../static/img/logo1.png');*/
    background-size: 100% 100%;
    margin-top: 0.72rem;
    border: solid 1px #f8f8f8; 
  }
  .staTitle_R{
    width: 65%;
    height: 2.22rem;
    float: right;
    margin-top: 1.67rem;
    margin-left: 1.28rem;
    margin-right: 1%;
  }
    .staTitle_R span{
      font-size: 0.83rem;
      color: #333333;
      font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
    }
 
</style>