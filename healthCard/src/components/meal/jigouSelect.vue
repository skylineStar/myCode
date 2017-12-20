<template>
	<div style="width: 100% !important;">
    <div class="mui-content mui_content_bj" style="width: 100% !important;">
      <div class="pleaseChoose yaHei fs125">请选择一个体检机构</div>
      <div class="JGlogoArea">
        <ul class="JGlogo">
          <li v-for="(item, index) in jigouUiArr" @click="saveCenterData(item)">
            <a class="linkClass">
              <img :src="item.imgsrc" alt="">
              {{item.centerName}}
            </a>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
	</div>
</template>
<script>
import {hideaddress} from '../../assets/js/BaseJS.js'
import {share_seed} from '../../assets/js/wxConfig.js'
import citydata from '../../assets/js/citydata.js'
import API from '../../api/API'
const api = new API();
export default {
  data () {
    return {
//      aa: "sq",
      cityName: '',
      cityId: '',
      jigouUiArr: [],
      jigouUiArrList: {}
    }
  },
  beforeCreate () {
    document.title = '机构选择';
  },
  mounted: function () {
  	this.init();   
  },
  methods: {
  	init:function(){
  	var _this = this;
    var getLocation = sessionStorage.getItem('ifGetLocation');
    var citySlectData =sessionStorage.getItem('citySlectData');
     // [1] 定位成功
    if (getLocation) {
      var cyName = JSON.parse(getLocation).data1;
      if (cyName) {
        this.cityname = cyName.city;
		// [1] 定位成功 获取城市名字 进而获取城市id 
       if (this.cityname) {
        citydata.forEach(function (items) {
          items.forEach(function (item) {
             if ( item.CITYNAME.indexOf(_this.cityname)!=-1) {
              _this.cityId= item.CITY_ID;
            }
          });
        });
      }
      }
    } 
		// [2]手动定位 
      if (citySlectData) {
        this.cityId= JSON.parse(citySlectData).cityId;      
      } 
      this.queryPageInfo(); // 查询该城市下的机构，页面渲染
  	},
    queryPageInfo: function (type) {
      var _this = this;
      var homePriceSave=JSON.parse(sessionStorage.getItem('homePriceSave'));
        var param = {
          "cityNumber": _this.cityId,
          "cardNumber": homePriceSave.productcode   // 泰康套餐
        };
//        console.log(param)
        var response = api.fromCitySearchCenter(param);
        response.then(function(res){
//          console.log(res)
          var data=res.data;
          if(data.status=='1'){
            var bData = data.data;
            _this.jigouUiArr=bData;
          _this.jigouUiArr.forEach(function (item) {
              if (item.centerNumber == "10001") {
                item.imgsrc = '../../../static/img/logo1.png';
              }
              if (item.centerNumber == "10002") {
                item.imgsrc = '../../../static/img/logo3.png';
              }
              if (item.centerNumber == "10003") {
                item.imgsrc = '../../../static/img/logo4.png';
              }
              if (item.centerNumber == "10004") {
                item.imgsrc = '../../../static/img/logo2.png';
              }
			  });
//            console.log(_this.jigouUiArr)
          }else{
            _this.mui.toast(res.message);
          }
        }).catch(function(err){
            _this.mui.toast('网络异常！');
        });
    },
    saveCenterData: function (item) {
	    item.jigouNo=item.centerNumber;
	    item.cityidFromSelectClick=this.cityId;
	    sessionStorage.setItem('saveCenterData',JSON.stringify(item));
      window.location.href="#/meal/jigouStation";
    }
  }
}
</script>
<style scoped>
.JGlogo a{color: #333333;}
.mui_content_bj{
  background: #f8f8f8 !important;
  width: 100%;
  height: auto;
  padding: 0 4%;
}
.clear{clear: both;}
.pleaseChoose{
  width: 100%;
  height: auto;
    padding: .35em .625em .05em;
}
.JGlogoArea{
  width: 100%;
}
  .JGlogo{
    width: 100%;
    padding: 0;
    margin: 0;
  }
    .JGlogo li{
      width: 46%;
      height: 203px;
      float: left;
      margin-bottom: 35px;
      font-size: 17px;
      border: solid 1px #ebebeb;
      text-align: center;
      line-height: 31px;
    }
      .JGlogo li:nth-child(1){
        margin-right: 7%;
        margin-bottom: 9%;
      }
      .JGlogo li:nth-child(2){
        margin-bottom: 9%;
      }
      .JGlogo li:nth-child(3){
        margin-right: 7%;
      }
    .JGlogo li img{
      display: inline-block;
      width: 100%;
      height: 172px;
      float: left;
    }
    .logo_1{
      background: url(../../../static/img/logo1.png);
      background-size: 100% 100%;
    }
    .logo_2{
      background: url(../../../static/img/logo2.png);
      background-size: 100% 100%;
    }
    .logo_3{
      background: url(../../../static/img/logo3.png);
      background-size: 100% 100%;
    }
    .logo_4{
      background: url(../../../static/img/logo4.png);
      background-size: 100% 100%;
    }
</style>
