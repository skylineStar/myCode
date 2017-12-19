<!-- 微保渠道---选择城市页面
@ wyz
功能：选择预约城市
1、手动选择城市；2、选择城市对应区县；3、定位选择城市并跳转
-->
<template>
  <div class="Place">
    <div class='localbox '>
    	<div class="blink">{{hua_val}}</div>   <!--闪现的字母 -->
      <span :id="'top'+curCityId" ></span>
      <!--------------------顶部显示--------------------->
      <div class="localtitle clear mar1">
        <div class='local-l left'> 当前<span v-if='checkCityName'>:&nbsp;{{checkCityName}}{{checkDistrict}}</span></div>
        <div class='local-r right'> 选择县区 <i class='toup' @click="shouqi"></i></div>
      </div>
      <!--<div class='city_t'></div>-->
      <!----------------------区域显示----------------------------->
      <div class='localarea clear localarea1'>
        <a class='district firstChild left  district1 all c4e' @click='toList()'>全城</a>
        <!--<a class='district left district1 c4e' v-for='(addr,index) in  districtArr' @click='checkDisc(addr,index)' :id='index'>{{addr.name}}</a>-->
        <!--区县后台返回数据变化修改-->
        <a class='district left district1 c4e' v-for='(addr,index) in  districtArr' @click='checkDisc(addr.ckCityVo,addr.code)' :id='addr.code'>{{addr.ckCityVo.name}}</a>
      </div>
    </div>
    <!------------------------------城市列表---------------------------->
    <div class="cityListArea">
      <!----------------------------字母索引---------------------------->
      <div class="indexlist-bar">
        <a class='mar3'><span @click="curIndex(curid)">当前</span></a>
        <div class="slide" @touchend="touchEnd()" @touchmove="move($event)"> <!--包裹字母用来滑动 -->
        <a v-for='(str,id) in cityObj' v-if="JSON.stringify(str)!='{}'" ><span @click="letterIndex(id,$event)" class="fontColor" :class="{zimu : id==hua_val}">{{id}}</span></a>
        </div>
      </div>
      <!----------------------------城市显示-------------------------------->
      <div class="cityListAZ">
        <ul class="cityItems">
          <li :id='index' v-for='(items,index) in cityObj'>
            <ol class="citiBlocks citiBlocks1">
              <li class="indexlist-index" v-if="JSON.stringify(items)!='{}'">{{index}}</li>
              <li class='cityli' v-for='(item,cityId) in items' @click='checkCity(item,cityId,index)' :id='cityId'>{{item.name}}</li>
            </ol>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import $ from 'jquery'
  import { getUrl, requeryUsJS, hideaddress } from '../../assets/js/BaseJS.js'
  import {config_param} from '../../assets/js/config_param'
  import { getPosition } from '../../assets/js/getLocation.js'
  import { Indicator, Toast, MessageBox } from 'mint-ui'
  import API from '../../api/API'
  const api = new API();
  export default {
    name: 'Place',
    data() {
      return {
        curid: '', // 当前索引的id
        checkCityName: '', // 所选城市
        checkDistrict: '', // 所在区
        localcity: '', // 定位城市
        districtArr: [], // 地区数组
        localcity: '', // 定位城市
        cityObj: {}, // 城市数据对象
        orderInfo: {districtCode: ''}, // 卡信息对象
        City: {}, //  城市信息对象
        willClick: false, // 手动选择标记
        backFlag: false, // 页面是否返回标志
        localFlag:false, // 定位成功的标记
        curCityId:'',//当前城市id
        hua_val:'',//索引字母
        allCode:false,// 选中全城
        s_cityId:'',//session中的城市id
      }
    },
    beforeCreate() {
      document.title = '选择地点';sessionStorage.setItem('back_ticketURI','1');
    },
    beforeRouteLeave:(to, from, next) => {
      if(sessionStorage.getItem('back_ticketURI')){//返回卡券标记
          var back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
          if(back_ticketURI=='1'){//返回卡券
              next(false);
              sessionStorage.setItem('back_ticketURI','0');
              window.location.href='#/order/toOrder';
          }else{
              next();
          }
      }else{
          next()
      }
    },
    mounted() {
//    hideaddress();
      this.backFlag = JSON.parse(sessionStorage.getItem('backFlag')) || false // 页面是否是返回页面
      this.fillCityPage();
    },
    methods: {
      fillCityPage:function(){
        var url = window.location.href; // 当前路由
        var linkUrl = getUrl(url); // 解析路由为JSON格式
        var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
        var localYoN = JSON.parse(sessionStorage.getItem('ifGetLocation'));
//      alert(JSON.stringify(localYoN))
        if(orderInfo){
          this.orderInfo = $.extend({}, orderInfo, linkUrl);
        }else{
          sessionStorage.setItem('isCheckStore', true)
          orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
          orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
          this.orderInfo = orderInfo;
        }
          this.localFlag = orderInfo.localFlag?orderInfo.localFlag:false;
          this.willClick = orderInfo.willClick || false;
          var param = {"code": "","source":this.orderInfo.source?this.orderInfo.source:'' } // 初始化城市页面
          this.fillCity(param); // 页面填充城市数据  
          if(this.willClick == false) { // 非手动操作  调动定位方法
            if(localYoN){
              if(localYoN.YoN == 2){
              
              }else{
                this.fillLocation();
              }
            }else{
              this.location();
            }
          }
        if(this.orderInfo.isToDetail || this.orderInfo.isSureCheck){
          this.orderInfo.isToDetail = false;
          this.orderInfo.isSureCheck = false;
          this.orderInfo.currentPage= 1;
        }
      },
      // 返回后页面填充
      backFill: function() {
        if(this.backFlag == true) { // 是否为返回页面的标记
          this.checkCityName = this.orderInfo.cityName?this.orderInfo.cityName:" " // 返回后展示城市
          this.checkDistrict = this.orderInfo.district?this.orderInfo.district:" " // 返回展示地区
          this.willClick = true; // 将要手动修改  取消定位
          var cityN = this.orderInfo.cityName; // session中取的城市名
          var cityI = this.orderInfo.cityId; // session取出的城市Id
          this.s_cityId = cityI;
          var disId = this.orderInfo.districtCode // session取出的地区编码
          this.allCode = this.orderInfo.allCode;
          sessionStorage.setItem('backFlag', false)
          // 返回页面填充地区
          if(this.orderInfo.cityId){
            this.fillDisc(cityI, disId) // 返回页面填充地区
          }
        }
      },
      // 定位缓存
      fillLocation: function() {
        // 定位信息 
        var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
        if(qqlocation && qqlocation.yesOrNo == 1) {
          var t = qqlocation.time;
          var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
          if(outtime) { // 定位超时
            sessionStorage.removeItem('ifGetLocation'); // 移除session
            this.location(); // 重新定位
          } else { // 定位在缓存时间内
            this.backFill(); // 填充页面信息
            this.orderInfo.localFlag = true; // 是否为定位标记
          }
        }
      },
      // 定位方法
      location: function() {
        Indicator.open({text: '正在定位', spinnerType: 'fading-circle'});
        var _this = this;
        var ifGetLocation = {};
        requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function() {
          getPosition(
            function(data) {
              Indicator.close();
              if(_this.willClick) return
              _this.localcity = data.city; // 定位城市
//            _this.checkCityName = _this.localcity; // 页面砖石定位城市
              _this.orderInfo.cityName = data.city; // 存入session的城市名
              _this.orderInfo.latiude = data.lat; // 存入session的纬度
              _this.orderInfo.longitude = data.lon; // 存入session的经度
              // 查找定位城市对应的城市编码
              if(_this.localcity != "" && _this.willClick == false) { _this.findCity();}
              ifGetLocation = {"yesOrNo": 1,"data": data, "time": new Date().getTime()};
              sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation)); // 成功存定位session
            },
            function() {
              Indicator.close();
              sessionStorage.setItem('ifGetLocation', JSON.stringify({"YoN": 2})); // 失败存定位session
            }
          )
        })
      },
      // 获取城市数据
      fillCity: function(param) {
        let _this = this;
        let response = api.ckcity(param); // 获取城市列表
        response.then(function(res) {
          if(res.data.state == '1') {
            _this.cityObj = res.data.data; // 页面展示城市对象赋值
            _this.backFill(); // 返回后页面填充
            // 页面返回后 添加已选城市样式及当前id设置
            if(_this.backFlag == true||_this.localFlag == true) { 
              setTimeout(function() {$("#" + _this.orderInfo.cityId).addClass('cityChecked')}, 100);// 添加城市选中样式
              _this.curid = _this.orderInfo.curid // 页面返回后为当前索引赋id值
            }
          } else {
            if(res.data.Message) {
              Toast({ message: res.data.Message,duration: 1000,className: 'mToast'})
            }
          }
        }).catch(function(err) {
          if(config_param.isLog)console.log(err);
//        window.location.href = "#/common/errorPage"
        });
      },
      // 选择城市
      checkCity: function(item, cityId, indexId) {
        this.orderInfo.districtCode = '';
        this.checkDistrict = '';
        this.allCode = false;
        let _this = this;
        _this.willClick = true; // 手动点击城市 取消定位
        _this.orderInfo.willClick = true; // 手动点击城市 取消定位
        if(item.field == 1) {if(config_param.isLog)console.log("field--1为乐牙") }
        if(item.field == "") {if(config_param.isLog)console.log('" "--为微保') }
        _this.checkCityName = item.name; // 页面展示城市 cityName
        _this.orderInfo.cityName = item.name; // session存储城市名 cityName
        _this.orderInfo.cityId = cityId; // session存储城市id
        _this.orderInfo.curid = indexId // 为当前索引赋值
        _this.curid = indexId;
        $('.localarea').show(); // 显示地区列表
        $('.toup').removeClass("todown"); // 移除向下的箭头
        $('.citiBlocks').find("li").removeClass('cityChecked');
        $("#" + cityId).addClass('cityChecked');
        this.fillDisc(cityId, "")
      },
      // 填充地区数据
      fillDisc: function(cityId, discId) {
        this.curCityId = cityId;
        let _this = this;
        var param = { "code": cityId,"source":_this.orderInfo.source?_this.orderInfo.source:''}
        let response = api.ckcity(param); // 获取区域列表
        response.then(function(res) {
          if(res.data.state == '1') {
            _this.districtArr = res.data.data;
            $('.district').removeClass('check');
            if(discId != "") {
              setTimeout(function() {$("#" + discId).addClass('check');}, 100);
            }else{
              setTimeout(function() {if(_this.allCode == true&&_this.s_cityId == cityId){$(".all").addClass('check');}}, 100);
            }
          } else {
            if(res.data.Message) {
              Toast({message: res.data.Message,duration: 1000,className: 'mToast'})
            }
          }
        }).catch(function(err) {
          if(config_param.isLog)console.log(err);
//        window.location.href = "#/common/errorPage"
        });
        // 跳转到页面顶部
        setTimeout(function(){_this.topIndex('top'+cityId);},300)
        return false
      },
      // 选择地区
      checkDisc: function(disc, id) { // 选择地区
        this.checkDistrict = disc.name; //页面展示地区名
        $(".district").removeClass('check'); // 移除多余的选中样式
        $("#" + id).addClass('check'); // 所选区域添加显示样式
        this.orderInfo.district = this.checkDistrict; // 存入session的地区名
        this.orderInfo.districtCode = id; // 存入session的地区id
        // 是否为定位标记
        if(this.localFlag==false){this.orderInfo.localFlag = false;}
        this.orderInfo.willClick = true; // 是否手动点击
        var orderInfo = this.orderInfo; // 将orderInfo对象存入session
        sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo)); // 将orderInfo对象存入session
        // 跳转到医院列表页面
        setTimeout(function() {sessionStorage.setItem('back_ticketURI','0');window.location.href = "#/order/checkStation";}, 100)
      },
      // 索引当前跳转设置
      curIndex: function() {
        if(this.curid != "") {
          return document.getElementById(this.curid).scrollIntoView(true)
        }
      },
      // 字母索引
      letterIndex: function(curid,e) {
      	$('.blink').css({display:'block'});
        $('.blink').css({'opacity': 1})
        this.hua_val=$(e.target).text();
      	this.touchEnd();
		    $('.fontColor').removeClass('zimu');
		    $(e.target).addClass('zimu'); 
        return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
      },
      topIndex: function(curid) {
        return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
      },
      // 收起县区
      shouqi: function() {
        $(".localarea").animate({height: 'toggle'},300); // 地区块toggle
        $(".toup").toggleClass("todown"); // 箭头方向toggle
//      setTimeout(()=>{$(".cityListArea").toggleClass("city_top");},200)
        
        
      },
      // 地区为空跳转页面
      toList: function() {
        if(this.checkCityName != "") {
          this.orderInfo.districtCode = ""; // 地区编码
          this.orderInfo.district = "全城"; // 地区名
          // 是否为定位标记
          if(this.localFlag==false){this.orderInfo.localFlag = false;}
          this.orderInfo.willClick = true; // 是否手动点击
		      this.orderInfo.allCode = true;
          sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
          var place = JSON.parse(sessionStorage.getItem('orderInfo'));
          if(config_param.isLog)console.log('-----------------quancheng-------------')
          if(config_param.isLog)console.log(place)
          if(place.cityId) {
            setTimeout(function() { sessionStorage.setItem('back_ticketURI','0');window.location.href = "#/order/checkStation"}, 100)
          }else{
            Toast({message:'请选择您要预约的城市'})
          }
        } else {
          Toast({ message: "请先选择城市",duration: 1500,className: 'mToast'})
        }
      },
      // 查找城市数据
      findCity: function() {
        var _this = this
        var val = _this.localcity; //定位城市名
        var cityArr = _this.cityObj; // 城市数据对象
        var i, j, city;
        for(i in cityArr) {
          var c_a = cityArr[i]; // 每个字母索引对应的对象
          for(j in c_a) {
            if(c_a[j].name == val) {
              _this.orderInfo.curid = i; //定位城市字母的id
              _this.orderInfo.cityId = j; // 定位城市的城市id
              _this.orderInfo.cityName = val; // 定位城市名
              _this.checkCityName = val; // 页面砖石定位城市
              _this.orderInfo.districtCode = ""; // 定位地区编码为空
              _this.orderInfo.localFlag = true; // 是否定位标记
              _this.orderInfo.willClick = false; // 是否手动点击
            }
          }
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo)) // 定位信息存入session
        var place = JSON.parse(sessionStorage.getItem('orderInfo'));
        // 跳转医院列表页面
        if(_this.localFlag == false && place.cityId){ sessionStorage.setItem('back_ticketURI','0');window.location.href = "#/order/checkStation" }
      },
//    滑动结束
      touchEnd(){
       	 var opcityNum = 1;
          setInterval(function () {
              opcityNum -= 0.1;
              if (opcityNum > 0) {
                  $('.blink').css({'opacity': opcityNum})
              } else {
                  clearInterval();
              }
          },50);
       setTimeout(function(){ $('.blink').css({display:'none'})},200);

      },
//    滑动开始
      move(event){
       	event.preventDefault();
       	  $('.blink').css({display:'block'});
       	   $('.blink').css({'opacity': 1})
       	   var x=event.changedTouches[0].clientX;
       	   var y=event.changedTouches[0].clientY;
       	   	var xx=document.elementFromPoint(x,y);
       	   	 var word=$(xx).text();
       	   	 if(/^[A-Z]$/.test(word)){
       	   	 	this.hua_val=word;
       	   	 }
      		this.topIndex(this.hua_val);
        }
      },
      
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/order.css'
</style>