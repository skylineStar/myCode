<template>
  <div class="City" style="width:100% !important;">
    <!--搜索框-->
    <div class='searchbox'>
      <div class="searchboxArea">
        <i class="iconbox"></i>
        <input class='searchInput' type="search" v-model='searchWord' @focus="searchFoucus" @keyup='searchCity()' placeholder="查找城市">
      </div>
      <div class="searchboxCancel">取消</div>
      <div class="clear"></div>
    </div>
    <div class='modal'>
      <ul class="searchList">
        <li v-for='item in searchInfo' @click='checkCity(item,1)' :id='item.CITY_ID'>{{item.CITYNAME}}</li>
      </ul>
      <div class="noResultShow">
        <div class="div1">匹配结果</div>
        <div class="div2">暂时没有找到您想要的结果哦，请你重新输入</div>
      </div>
    </div>
    <!--搜索框-->
    <div class="recommendCity recommendCitys">
      <div class="tiaoshi" style="margin-bottom: 2%;">推荐城市：</div>
      <div class="recommendCity_list">
        <ul>
          <!-- 北京 上海 广州 深圳 成都 武汉 -->
          <li v-for="item in recommendCityData" :id="item.cityid" @click='checkCity(item,3)'></li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
    <!--城市列表===start====-->
    <div class="cityListArea">
      <div class="mui-indexed-list-bar">
      	<a v-for='(item,index) in citydata' @click='toIndex(item[0].LETTER)' v-if='item.length> 0'>{{item[0].LETTER}}</a>
      </div>
      <div class="cityListAZ">
        <ul class="cityItems" >
        	<!--index为数组索引：1,2...-->
          <li :id='items[0].LETTER' v-for = '(items,index) in citydata' v-if='items.length > 0'>
            <div class="tiaoshi">{{items[0].LETTER}}</div>
            <ol class="citiBlocks" >
              <li v-for='item in items' @click='checkCity(item,2)' :id='item.CITY_ID'>{{item.CITYNAME}}</li>
            </ol>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
    </div>
    <!--城市列表=====end===-->
  </div>
</template>
<script type="text/javascript">
	import {share_seed} from '../../assets/js/wxConfig.js'
  import {getUrl,requeryUsJS} from '../../assets/js/BaseJS.js'
  import {getPosition} from '../../assets/js/getLocation.js'
  import {add} from '../../assets/js/city_abc.js'
  import citydata from '../../assets/js/citydata.js'
  import $  from 'jquery'
  import API from '../../api/API'
  const api = new API();
  export default {
    data () {
      return {
        searchWord:'',
        searchInfo:[],
        localcity:'北京',
        citydata:citydata,
        orderInfo: {},
        recommendCityData: [
          {"name": "北京", "cityid": "119900"},
          {"name": "上海", "cityid": "319900"},
          {"name": "广州", "cityid": "440100"},
          {"name": "深圳", "cityid": "440300"},
          {"name": "成都", "cityid": "510100"},
          {"name": "武汉", "cityid": "420100"}
        ]
      }
    },
    beforeCreate () {
      document.title = '城市选择';
    },
    methods: {
    	toIndex:function(index){
//  		if(index!='I'&&index!='O'&&index!='U'&&index!='V'){
    		return document.getElementById(index).scrollIntoView(true);// 字母索引跳转
//    	}
    	},
      checkCity: function (item,cur) {
      	  if(cur==2){// 选中城市加样式
              $(".citiBlocks").find('li').removeClass('checkCity');
              $("#"+item.CITY_ID).addClass('checkCity');
            }
      	var citySlectData = {};
        var homePriceSave=JSON.parse(sessionStorage.getItem('homePriceSave'));
        var _this = this;
        // 点击跳转前先判断 该城市是否提供体检服务
        var cityIdAndtargetId = event.currentTarget.id;
        var param = {
          "cityNumber": cityIdAndtargetId,
          "cardNumber": homePriceSave.productcode
        };
        //console.log(param)
        var response = api.fromCitySearchCenter(param);
        response.then(function(res){
          //console.log(res)
          var data=res.data;
          if(data.status == '1'){
          	if(cur == 1||cur==2){
          		citySlectData.cityPick=item.CITYNAME;
              citySlectData.cityId=item.CITY_ID;
              if(cur == 1){
              	$('.modal').hide();
              _this.searchWord = "";
              }
          	}
            if(cur==3){ // 推荐城市
              citySlectData.cityId=item.cityid;
              citySlectData.cityPick=item.name;
            }
            sessionStorage.setItem('citySlectData',JSON.stringify(citySlectData));//存储已选城市信息
	          sessionStorage.removeItem('ifGetLocation');
	          sessionStorage.removeItem('saveCenterData');
	          window.location.href="#/meal/jigouSelect";
          }else{
            _this.mui.toast('所选城市未提供体检服务，请选择其他城市')
          }
        }).catch(function(err){
            console.log(err);
        });
      },
      searchCity: function(){
        let that = this;
        var val = that.searchWord;
        //console.log(val);
        var arr = [];
      for(var i=0,len=this.citydata.length;i<len;i++){
	 			//for(var key in this.citydata){
          var list = this.citydata[i];
          for(var j=0,l=list.length;j<l;j++){
            if(list[j].CITYNAME.indexOf(val)>=0){
                arr.push(list[j]);
            }
          }
        }
        if (arr.length == 0) {
         $(".noResultShow").css({"display":"block"});
        } else {
          $(".noResultShow").css({"display":"none"});
        }
        that.searchInfo = arr;
        $('.modal').css({'display':'block'});
        //console.log(arr);
      },
      searchFoucus: function(){
        $(".modal").show();
        $(".searchboxArea").css({"width":"88%"});
        $(".searchboxCancel").css({"display":"block"});
        $("body").css({'overflow':"hidden",'position':'fixed'});
        //点击取消、弹层，弹层收起
        $("body").on('click','.modal,.searchboxCancel',function () {
          $(".modal").hide();
          $(".searchboxCancel").css({"display":"none"});
          $(".searchboxArea").css({"width":"100%"});
          $("body").css({'overflow':"visible",'position':'relative'});
           $(".searchInput").val('');//搜索框清空
        });
      }
    }
}
</script>
<style scoped>
.noResultShow{
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 100;
  display: none;
  padding: 1.35rem 0.83rem;
  font-size: 0.72rem;
  background: #f5f5f5;
}
.noResultShow .div1{
  color: #121313;
}
.noResultShow .div2{
  color: #787d80;
  text-indent: 1em;
}
.searchboxArea{
  width: 100%;
}
.searchboxCancel{
  width: 12%;
  color: #13b0c1;
  background: #dce2e8;
  font-size: 0.9rem;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  text-align: center;
  height: 2.9rem;
  line-height: 2.9rem;
}
  .hideit{
    display: none;
  }
  .recommendCitys{
  padding-left: 0.72rem;
  padding-right: 0.72rem;
  background: #ffffff;
  }
  .recommendCity p{
    margin-bottom: 0.33rem;
  }
  .recommendCity_list a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .recommendCity{
  border-bottom: solid 1px #eaeaea;
  }
  .recommendCity_list ul li{
  float: left;
  }
.recommendCity_list ul li{
  background-size: 100% 100%;
  margin-bottom: 1.06rem;
}
  .recommendCity_list ul li:nth-child(1){
    background: url('../../../static/img/recoCity1.png');
    margin-right: 5%;
  }
  .recommendCity_list ul li:nth-child(2){
    background: url('../../../static/img/recoCity2.png');
    margin-right: 5%;
  }
  .recommendCity_list ul li:nth-child(3){
  background: url('../../../static/img/recoCity3.png');
  }
  .recommendCity_list ul li:nth-child(4){
  background: url('../../../static/img/recoCity4.png');
  margin-right: 5%;
  }
  .recommendCity_list ul li:nth-child(5){
  background: url('../../../static/img/recoCity5.png');
  margin-right: 5%;
  }
  .recommendCity_list ul li:nth-child(6){
  background: url('../../../static/img/recoCity6.png');
  }
  /*---*/
  .modal{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  position: absolute;
  top: 2.9rem;
  z-index: 100;
  }
  .searchList{
  background-color: #FFFFFF;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 100;
  padding-left: .833rem;
  }
  .modal li{
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: .67rem;
  color: #333;
  border-bottom: 1px solid #eee;
  }
  .stepnav {
  margin-bottom: 0;
  }
  /*搜索框*/
  .searchbox{
   padding: .58rem .833rem;
   height: 2.9rem;
   background-color: #eaeaea;
  }
  input.searchInput {
  background-color: #fff;
  font-size: .67rem;
  text-align: left;
  border-radius: .11rem;
  padding-left: 1.4rem;
  }
  .iconbox{
    display: block;
    width: 0.61rem;
    height: 0.61rem;
    background: url(../../assets/images/order/search.png) no-repeat 0 0;
    background-size: 100%;
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
  }
  .checkCity{
  border: solid 1px #5c9edc!important;
  color: #5c9edc;
  }

  /*搜索框*/
  /*搜索框===end===*/
  /*城市列表样式===start===*/
  .mui-indexed-list-bar {
  width: 3.5%;
  position: fixed;
  height: 69%;
  z-index: 10;
  right: 0;
  top:5.83rem;
  -webkit-transition: .2s;
  text-align: center;
  }
  .mui-indexed-list-bar a {
  display: block;
  /*text-align: left;*/
  font-size: 0.61rem;
  line-height: 0.83rem;
  color: #5c9edc!important;
  }
  .cityListArea{
  background: #ffffff !important;
  padding: 0 4%;
  }
  .recommendCity{
  padding-top: 0.56rem;
  border-bottom: solid 1px #eaeaea;
  }
  .recommendCity_list ul li{
  width: 30%;
  height: 3.33rem;
  float: left;
  }
  .recommendCity_list ul li:nth-child(1){
  background: url('../../../static/img/recoCity1.png');
  background-size: 100% 100%;
  margin-right: 4.5%;
  margin-bottom: 1.06rem;
  }
  .recommendCity_list ul li:nth-child(2){
  background: url('../../../static/img/recoCity2.png');
  background-size: 100% 100%;
  margin-right: 4.5%;
  margin-bottom: 1.06rem;
  }
  .recommendCity_list ul li:nth-child(3){
  background: url('../../../static/img/recoCity3.png');
  background-size: 100% 100%;
  margin-bottom: 1.06rem;
  }
  .recommendCity_list ul li:nth-child(4){
  background: url('../../../static/img/recoCity4.png');
  background-size: 100% 100%;
  margin-right: 4.5%;
  margin-bottom: 1.06rem;
  }
  .recommendCity_list ul li:nth-child(5){
  background: url('../../../static/img/recoCity5.png');
  background-size: 100% 100%;
  margin-right: 4.5%;
  margin-bottom: 1.06rem;
  }
  .recommendCity_list ul li:nth-child(6){
  background: url('../../../static/img/recoCity6.png');
  background-size: 100% 100%;
  margin-bottom: 1.06rem;
  }
  .cityListAZ{
  width: 100%;
  height: auto;
  }
  .cityListAZ ul{
  width: 100%;
  height: 100%;
  }
  .citiBlocks li{
     font-size: .89rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    float: left;
    border: solid 1px #eaeaea;
    border-radius: 0.17rem;
    margin: 1.5%;
    padding-left: 3%;
    padding-right: 3%;
  }
  .clear{
    clear: both;
    overflow: hidden;
  }
</style>
