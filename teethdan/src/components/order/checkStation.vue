<!-- 微保渠道---选择医院页面
@ wyz
功能：选择预约医院
1、选择医院；2、查看医院详情；3、地图导航；4、关键词搜索医院
 -->
<template>
  <div class="checkStation" :style="{'-webkit-overflow-scrolling':scrollMode}">
    <!------------------顶部搜索-------------->
    <div class='stationbox  clear searchFix' id='showSearchBox'>
      <span class='checkCity left' @click='backPlace()' v-if='isFoucus==false'>{{showCity}}</span>
      <div class='searchbox left'>
        <div class="inputbox">
          <i class='searchicon'></i>
          <input type="search" id="searchtext" v-model="searchWord" @focus="searchFoucus()" @keyup.enter='searchHospital()' placeholder="门店名称" />
          <a class='cancelbtn' @click='searchHospital()' v-if='searchWord'>搜索</a>
          <a class='cancelbtn' @click='searchHospital()' v-else-if="searchWord==''">取消</a>
        </div>
      </div>
    </div>
    <!---------------搜索历史记录------------------->
    <div class='modal'>
      <div class='histrybox'>
        <h2 class='histitle'><i class='hisicon'></i>历史记录</h2>
        <ul class="searchList">
          <li><span class='keywords' v-for='item in histryWord' @click='useHisWord(item)'>{{item}}</span></li>
        </ul>
        <div @click='clearHistory' class='clearbtn'>清除历史记录</div>
      </div>
    </div>
    <!--------------------医院列表---------------------->
    <div class='radioList padtop' >
      <!--<mt-loadmore  :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange">-->
      <load-more    :bottom-method="loadBottom"    :bottom-all-loaded="allLoaded"    :bottomPullText='bottomText'    :auto-fill="false"    @bottom-status-change="handleBottomChange"    ref="loadmore">
      <ul >
        <li class="stationli clear" v-for='(hosp,index) in hospitalInfo' :id='hosp.hospitalId'>
          <i class='radiobtn left' @click="shureCheck(index,hosp)" :id='index'></i>
          <div class='storeInfo left' @click='toshopDetail(index,hosp)'>
            <h2>{{hosp.hospitalName}}</h2>
            <p class='store Addr'>{{hosp.hospitalAddr}}</p>
            <p class='store Fen'>评分&nbsp;<span class='fNum' v-show="hosp.avgQuality !='--'">{{hosp.avgQuality}}分</span><span v-show="hosp.avgQuality =='--'" ><p class='hen'>&nbsp;</p><p class='hen'>&nbsp;</p></span></p><!--class='heng'<i class='h_mar'>-</i><i>-</i>-->
          </div>
          <div class='nearbox' v-if='index==0 && hosp.distance'><span v-show='index==0' class='near'  v-if='hosp.distance'>最近</span></div>
          <div class='nearbox' @click='toshopDetail(index,hosp)' v-else><span v-show='index==0' class='near' v-if='hosp.distance'>最近</span></div>
          <div class='navbox left' @click="gotoMap(hosp)">
            <div class='p_distance' >
              <p  class='distance' ><span v-if='hosp.distance'><span class='disNum' v-if="hosp.distance >'100'">&gt;100km</span><span class='disNum' v-show="hosp.distance < '100'">{{hosp.distance?hosp.distance:'0.0'}}km</span></span></p>
              <p class="navicon"><img src="../../assets/images/order/order_nav.png" alt="" /></p>
            </div>
          </div>
        </li>

      </ul>
      <!--<div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><mt-spinner :size='20' color="#26a2ff"type="fading-circle"></mt-spinner></span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div slot = 'bottom'class="mint-loadmore-bottom loading">
        <mt-spinner :size='25' color="#26a2ff"type="fading-circle"></mt-spinner>
      </div>-->
      <div v-show="loading" slot="bottom" class="loading"> 
        <mt-spinner :size='25' color="#26a2ff" type="fading-circle"></mt-spinner>
      </div>
      </load-more>
      <!--</mt-loadmore>-->
    </div>
    <mt-popup v-model="isCall" position="middle" :modal='false'>
      <div class='call-box'>
          <div class="call-title-tel">温馨提示</div>
          <div class="call-text-tel">很抱歉，您所在的城市暂未开通洗牙服务，请联系咨询具体开通时间</div>
          <div class="call-btn-container">
            <a id="callbtn" class="call-btn-tel" @click="telphone()">点击咨询</a>
            <span  class="call-btn-tel" @click="closeCall()">取消</span>
          </div>
      </div>
    </mt-popup >
    <div @click='closeCall()' class="call_modal" v-if='isCall'style="z-index: 1000;"></div>
    
    <!----------------------------空白页面---------------------------->
    <div class='whiteList'><img src="../../assets/images/order/searchbg.png" /><span class='whitetext'>没找到相关的匹配结果，请重试</span></div>
  </div>
</template>

<script type="text/javascript">
  import $ from 'jquery'
  import { getUrl, requeryUsJS, hideaddress } from '../../assets/js/BaseJS.js'
  import {config_param} from '../../assets/js/config_param'
  import { getPosition } from '../../assets/js/getLocation.js'
  import { Spinner,Toast, Loadmore, MessageBox } from 'mint-ui';
  import API from '../../api/API'
  const api = new API();
  export default {
    name: 'checkStation',
     props:{
    
        },
    data() {
      return {
        showCity: '', // 展示城市
        cityName: '', // 所选城市
        searchWord: '', // 搜索关键字
        searchFlag: '', // 是否为搜索状态
        orderInfo: {}, // 预约对象
        searchInfo: {}, // 搜索显示信息
        hospitalInfo: [], // 医院信息
        histryWord: [], // 历史记录关键词
        currentPage: 1, // 当前页码
        topStatus: '', // loadmore状态
        allLoaded: false, // loadmore是否加载
        localMsg: {}, // 定位信息
        isCall: false, // 拨打电话
        callAct:'',//去拨打电话
        isFoucus: false,
        isToDetail:false,// 去商品详情页面
        isSureCheck:false,// 去预约页面
        scrollMode:'auto', //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        //  上拉加载数据
                scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
      }
    },
    beforeCreate() {
      document.title = '选择门诊';$('#app,body').css({'height':'auto'})
    },
    created() {
      sessionStorage.setItem('backFlag', true)
      this.fillHospitalPage(); // 初始化医院列表页面
      this.fillLocation();
    },
    destroyed(){$('#app,body').css({'height':'100%'})},
    mounted() {
      this.anios();
    },
    watch: {
      isCall: function(newVal, oldVal) {
        if (newVal === true) {
          $('#app,body').css({'height':'100%'})
        }
      }
    },
    methods: {
       /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
      handleBottomChange(status) {// 下拉状态
        this.bottomStatus = status;
      },
      telphone(){
        var _this=this;
        var param = {
//                  "channelType":sessionStorage.getItem('channelType')||'',
                "cityCode":_this.orderInfo.cityId,
                "cityName":_this.cityName,
                "policyNo":_this.orderInfo.policyNo,
                "wesurePolicyNo":_this.orderInfo.wesurePolicyNo,
                "phone":'400-069-5522',
                "source":_this.orderInfo.source//新增加字段
              }
        api.phoneConsultInfo(param); // 电话咨询信息储存接口
        var call_num = '400-069-5522';
        _this.isCall = true;
        _this.callAct = 'tel:'+call_num;
        window.open(_this.callAct);
      },
      // 关闭电话弹层
      closeCall:function(){
        this.isCall = false;
        window.location.href = "#/order/Place"
      },
      anios: function() { //判断移动设备，更改样式
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
          $('.checkStation').css({'position':'absolute','bottom': '0','left':'0'})
        }
        if(isiOS) { // ios系统样式设置
          $(".near").css({'line-height':'0.83rem'});
        }
      },
      // 填充页面
      fillHospitalPage: function() {
        var url = window.location.href; // 当前路由
        var linkUrl = getUrl(url); // 解析路由为JSON格式
        var orderInfo = sessionStorage.getItem('orderInfo');
        orderInfo = JSON.parse(orderInfo);
        this.orderInfo = orderInfo; //  获取ordersession对象
        this.orderInfo = $.extend({}, orderInfo, linkUrl);
        this.cityName = orderInfo.cityName;
        if(orderInfo.cityName.length > 3) {
          this.showCity = orderInfo.cityName.slice(0, 3);
        } else {
          this.showCity = orderInfo.cityName;
        }
        this.isToDetail = orderInfo.isToDetail?orderInfo.isToDetail:false;
        this.isSureCheck = orderInfo.isSureCheck?orderInfo.isSureCheck:false;
        this.searchFlag = orderInfo.searchFlag?orderInfo.searchFlag:false;
        if(this.orderInfo.isToDetail || this.orderInfo.isSureCheck){
          this.currentPage = orderInfo.currentPage ? orderInfo.currentPage : 1;
        }
        var param = {
          "retrieveArgs": {
            "cityCode": this.orderInfo.cityId||'110000',
            "currentPage": "1",
            "districtCode": this.orderInfo.districtCode || "",
            "hospitalName": "",
            "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
            "longitude": this.orderInfo.longitude || "", // 经度 116.407526
            "provCode": "",
            "rowsPerPage": "",
            "source":this.orderInfo.source?this.orderInfo.source:''
          }
        }
        if(this.orderInfo.localFlag == true) {// 定位后不分页
          this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
          param.retrieveArgs.rowsPerPage = "300"
        }
        if(this.orderInfo.localFlag == false) {
          if(this.orderInfo.currentPage){
            param.retrieveArgs.currentPage = this.orderInfo.currentPage
            if(this.searchFlag==true){
              param.retrieveArgs.hospitalName = this.orderInfo.searchWord
            }
              
              this.orderInfo.currentPage = ''
              this.orderInfo.searchWord = ''
              sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
            }
          param.retrieveArgs.rowsPerPage = "10"
        }
        this.HospitalList(param, false);
      },
      // 回到Place页面
      backPlace: function() {
        window.location.href = "#/order/Place"
      },
      // 获取医院列表
      HospitalList: function(param, search) {
        var curPage = param.retrieveArgs.currentPage
        this.searchFlag = search;
        this.allLoaded = false;
        $(".whiteList").hide();
        let _this = this;
        let response = api.getOrgListBySolr(param); // 获取医院列表
        response.then(function(res) {
          if(res.data.status == '1') {// 请求成功
            var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
            var len = list.length;
            for(let i=0;i<len;i++){list[i].curPage = curPage}
            if(search == true) {// 设置搜索标记
              _this.hospitalInfo = [];
              _this.orderInfo.searchFlag = true;
            } else {
              _this.orderInfo.searchFlag = false;
            }
            _this.hospitalInfo = list;// 页面数据复制
            if(_this.isToDetail || _this.isSureCheck){// 选择门诊返回后页面样式处理
              if(_this.orderInfo.hospitalId){
                setTimeout(function(){
                  if(_this.isSureCheck){
                    $("#"+_this.orderInfo.hospitalId).find('.radiobtn').addClass('checkRadio');
                  }
                  if(_this.currentPage==1 && len>10){
                    var h_id =$("#"+_this.orderInfo.hospitalId)[0]
                    $("html, body").animate({scrollTop:h_id.offsetTop-40}, { duration: 500, easing: "swing" })
                  }
                return document.getElementById('showSearchBox').scrollIntoView(true)
                },100);
              }
            }
          } else {// 请求失败
            if(res.data.message) {
              if(search == true) {
                _this.hospitalInfo = {}
                if(res.data.status == -1) {
                  $(".whiteList").show();
                }
              } else {
                if(res.data.status == -1) {
                  if(_this.currentPage == 1) {
                    _this.isCall = true;//未开通洗牙服务提示框显示
                   var param = {
//                  "channelType":sessionStorage.getItem('channelType')||'',
                    "cityCode":_this.orderInfo.cityId,
                    "cityName":_this.cityName,
                    "policyNo":_this.orderInfo.policyNo,
                    "wesurePolicyNo":_this.orderInfo.wesurePolicyNo,
                    "source":_this.orderInfo.source//新增加字段
                  }
                  api.locationInfo(param); // 定位信息储存接口        
                  }
                } else {
                  Toast({message: res.data.message,duration: 1500,className: 'mToast'})
                }
              }
            } else {
              Toast({message: "发生内部错误",duration: 1500,className: 'mToast'})
            }

          }
        }).catch(function(err) {
          if(config_param.isLog)console.log(err);
//        window.location.replace("#/common/errorPage");
        });
      },
      // 下拉刷新样式设置
      handleTopChange(status) {
        this.topStatus = status;
      },
      // 下拉刷新方法
      loadTop: function() {
        this.$refs.loadmore.onTopLoaded();
      },
      // 上拉加载方法
      loadBottom: function() {
        this.loading = true;
        this.isPullup = true;
        var param = {
          "retrieveArgs": {
            "cityCode": this.orderInfo.cityId||'110000',
            "currentPage": ++this.currentPage,
            "districtCode": this.orderInfo.districtCode,
            "hospitalName": this.searchWord,
            "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
            "longitude": this.orderInfo.longitude || "", // 经度 116.407526
            "provCode": "",
            "rowsPerPage": "10",
            "source":this.orderInfo.source?this.orderInfo.source:''
          }
        }
        var curPage = param.retrieveArgs.currentPage
        if(this.searchFlag == true) {
          param.retrieveArgs.rowsPerPage = "10"
        }
        if(this.searchFlag == false) {
          if(this.orderInfo.localFlag == true) {
            param.retrieveArgs.rowsPerPage = "300"
          }
          if(this.orderInfo.localFlag == false) {
            param.retrieveArgs.rowsPerPage = "10"
          }
        }
        
        let _this = this;
        setTimeout(()=>{
          let response = api.getOrgListBySolr(param); // 获取医院列表
          response.then(function(res) {
            if(res.data.status == '1') {
              var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
              if(config_param.isLog)console.log(list)
              var len = list.length
              if(len<10 && _this.currentPage == 1){
                _this.allLoaded = true
              }
              for(let i=0;i<len;i++){
                list[i].curPage= curPage
              }
              _this.hospitalInfo = (_this.hospitalInfo).concat(list); // 页面追加展示数据
              _this.$nextTick(function () {  
                _this.loading = false; 
              });
            } else {
              if(res.data.message) {
                  if(res.data.status == -1) {
                    if(_this.currentPage != 1){
                      Toast({message: '没有更多了',duration: 1500,className: 'mToast'})
                      _this.allLoaded = true;
                      _this.loading = false;
                    }
                  } else {
                    Toast({message: res.data.message,duration: 1500,className: 'mToast'})
                  }
              } else {
                Toast({message: "发生内部错误",duration: 1500,className: 'mToast'})
              }
  
            }
          }).catch(function(err) {
            if(config_param.isLog)console.log(err);
  //        window.location.replace("#/common/errorPage");
          });
          _this.$refs.loadmore.onBottomLoaded();
        },500)
        
      },
      // 定位缓存
      fillLocation: function() {
        // 定位信息 
        var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
        if(qqlocation && qqlocation.yesOrNo == 1) {
          var t = qqlocation.time;
          var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
          if(outtime) {
            sessionStorage.removeItem('ifGetLocation');
            this.location();
          } else {
            this.orderInfo.localFlag = true;
            this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data
          }
        }
      },
      // 定位信息
      location: function() {
        var _this = this;
        var ifGetLocation = {};
        requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function() {
          getPosition(
            function(data) {
              if(config_param.isLog)console.log("------------成功--------------");
              if(config_param.isLog)console.log(data.city);
              _this.localMsg = data;
              _this.orderInfo.localFlag = true;
              ifGetLocation = {
                "yesOrNo": 1,
                "data": data,
                "time": new Date().getTime()
              }
              sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
            },
            function() {
              if(config_param.isLog)console.log("-----定位失败-----");
              sessionStorage.setItem('ifGetLocation', JSON.stringify({
                "YoN": 2
              }));
            }
          )
        })
      },
      // 确定选择
      shureCheck: function(cur, item) {
        if(config_param.isLog)console.log(item);
        var id = cur;
        var lon = item.hospitalLongitudeLatitude.split(",")[0];
        var lat = item.hospitalLongitudeLatitude.split(",")[1];
        this.orderInfo.doctorId = item.doctorId;
        this.orderInfo.hospitalId = item.hospitalId;
        this.orderInfo.hospitalName = item.hospitalName;
        this.orderInfo.contactTel = item.contactTel;
        this.orderInfo.orgAddress = item.hospitalAddr;
        this.orderInfo.lon = lon;
        this.orderInfo.lat = lat;
        this.orderInfo.orgSource = item.orgSource; // 机构来源
        this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
        this.orderInfo.orderTime = {}
        this.orderInfo.isSureCheck = true;
        this.orderInfo.isToDetail = false;
        this.orderInfo.currentPage =item.curPage
        this.orderInfo.searchWord = this.searchWord
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
        $(".radiobtn").removeClass('checkRadio');
        $("#" + id).addClass('checkRadio');
        var str = JSON.parse(sessionStorage.getItem('orderInfo'));
        if(item.orgSource == 1) {
          if(config_param.isLog)console.log("orgSource--1为乐牙")
          var param = {
            "flag": "2", //跳转标志，1:门诊详情 2 :预约 ,
            "insId": item.orgCode, //门店id  "0863cee2f86c11e4a09e02004c4f4f50"
            "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
            "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
            "wesurePolicyNo":this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo: this.orderInfo.policyNo,// 微宝内部保单号
          }
          let response = api.toStoreDetailOrOrder(param);
          response.then(function(res) {
            if(config_param.isLog)console.log(res.data.data);
            window.location.href = res.data.data;
          }).catch(function(err) {
            if(config_param.isLog)console.log(err);
//          window.location.replace("#/common/errorPage");
          })
        } else {
          if(config_param.isLog)console.log('orgSource--0--为微保')
          if(str.lon) {
            setTimeout(function() {
              window.location.href = "#/common/enterRouter?page="+encodeURIComponent("order/toOrder");
            }, 100)
          }
        }

      },
      // 去医院详情页
      toshopDetail: function(cur,item) {
        if(config_param.isLog)console.log(item);
        var id = cur;
        this.orderInfo.hospitalId = item.hospitalId;
        this.orderInfo.hospitalName = item.hospitalName;
        this.orderInfo.distance = item.distance;
        this.orderInfo.avgQuality = item.avgQuality;
        this.orderInfo.doctorId = item.doctorId;
        this.orderInfo.contactTel = item.contactTel;
        this.orderInfo.orgAddress = item.hospitalAddr;
        this.orderInfo.orgSource = item.orgSource; // 机构来源
        this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
        this.orderInfo.orderTime = {}
        this.orderInfo.isToDetail = true;
        this.orderInfo.isSureCheck = false;
        this.orderInfo.currentPage = item.curPage
        this.orderInfo.searchWord = this.searchWord
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
        var str = JSON.parse(sessionStorage.getItem('orderInfo'));
        if(item.orgSource == 1) {
          if(config_param.isLog)console.log("orgSource--1为乐牙")
          var param = {
            "flag": "1", //跳转标志，1:门诊详情 2 :预约 ,
            "insId": item.orgCode, //不清楚，需确认
            "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
            "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
            "wesurePolicyNo":this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo: this.orderInfo.policyNo,// 微宝内部保单号
          }
          let response = api.toStoreDetailOrOrder(param);
          response.then(function(res) {
            if(config_param.isLog)console.log(res.data.data);
            window.location.href = res.data.data;
          }).catch(function(err) {
            if(config_param.isLog)console.log(err);
//          window.location.replace("#/common/errorPage");
          })
        } else {
          if(config_param.isLog)console.log('orgSource--0--为微保')
          if(str) {
            setTimeout(function() {
              window.location.href = "#/user/shopDetail"}, 100)
          }
        }
      },
      // 调取地图
      gotoMap: function(item) {
        var startName = ""; // 起点名字
        if(this.orderInfo.localFlag == true) { // 定位后的起始经纬度
          var startX = this.localMsg.lon;
          var startY = this.localMsg.lat;
        } else { // 未定位经纬度为空
          var startX = "";
          var startY = "";
        }
        var cityName = this.cityName;
        var addr = item.hospitalAddr;
        var endName = item.hospitalName; // 终点名
        var lon = item.hospitalLongitudeLatitude.split(",")[0]; // 终点经度
        var lat = item.hospitalLongitudeLatitude.split(",")[1]; // 终点纬度
        var dest = {
          "eword": endName,
          "epointx": lon,
          "epointy": lat
        }
        var url = "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
        window.location.href = url // 跳转路径
        return false; // 阻止手机端冒泡
      },
      // 搜索医院
      searchHospital: function() {
        this.isFoucus = false;
        $(".searchbox").removeClass("foucusbox")
        $(".searchbox .searchicon").removeClass("foucusicon")
        $("#"+this.orderInfo.hospitalId).find('.radiobtn').removeClass('checkRadio');
        $(".inputbox").removeClass("foucusinput")
        $("#searchtext").blur(); // 输入框失去焦点
        this.searchWord = $.trim(this.searchWord); // 去除关键词两边的空格
        var histry = JSON.parse(localStorage.getItem("histry")) || []; // 获取历史记录
        if(this.searchWord != "") {
          histry.unshift(this.searchWord); // 向历史记录中添加新的关键词
        }
        histry = this.histryUnique(histry); // 历史记录去重处理
        if(histry.length > 6) histry.pop(); //多余历史记录清除
        localStorage.setItem("histry", JSON.stringify(histry)); // 历史记录存入localStorage
        var param = {
          "retrieveArgs": {
            "cityCode": this.orderInfo.cityId||'110000',
            "currentPage": '1',
            "districtCode": this.orderInfo.districtCode || "",
            "hospitalName": this.searchWord,
            "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
            "longitude": this.orderInfo.longitude || "", // 经度 116.407526
            "provCode": "",
            "rowsPerPage": "300",
            "source":this.orderInfo.source?this.orderInfo.source:''
          }
        }
        if(this.orderInfo.localFlag == true) {
          param.retrieveArgs.rowsPerPage = "300"
        }
        if(this.orderInfo.localFlag == false) {
          param.retrieveArgs.rowsPerPage = "10"
        }
        this.HospitalList(param, true); // 搜索医院 
        this.closeModal(); // 关闭弹层
      },
      // 历史记录搜索医院
      histrySearch: function(keyWord) {
        this.searchWord = keyWord;
        var param = {
          "retrieveArgs": {
            "cityCode": this.orderInfo.cityId||'110000',
            "currentPage": "1",
            "districtCode": this.orderInfo.districtCode,
            "hospitalName": this.searchWord,
            "latiude": this.orderInfo.latiude, // 纬度, lat: 39.90403
            "longitude": this.orderInfo.longitude, // 经度 116.407526
            "provCode": "",
            "rowsPerPage": "300",
            "source":this.orderInfo.source?this.orderInfo.source:''
          }
        }
        this.HospitalList(param, true);
        this.closeModal();
      },
      // 使用历史记录词汇搜索
      useHisWord: function(words) {
        this.searchWord = words
        this.searchHospital();
      },
      // 清除历史记录
      clearHistory: function() {
        var histry = JSON.parse(localStorage.getItem("histry"))
        var ary = [1, 2, 3, 4];
        histry.splice(0, histry.length); //清空数组 
        localStorage.setItem("histry", JSON.stringify(histry));
        this.histryWord = histry;
        if(config_param.isLog)console.log(histry); // 输出 []，空数组，即被清空了
      },
      // 搜索框聚焦
      searchFoucus: function() {
        this.isFoucus = true;
        $(".searchbox").addClass("foucusbox")
        $(".searchbox .searchicon").addClass("foucusicon")
        $(".inputbox").addClass("foucusinput")
        $('#searchtext').attr('placeholder', '请输入门诊关键搜索词')
        $('.cancelbtn').show();
        $("body").height($(window).height());
        $(".modal").css({'display': 'block'});
        $(".modal").height($(window).height())
        $("body").css({
          'overflow': "hidden",
          'position': 'fixed',
          'width': '100%'
        })
        var histry = JSON.parse(localStorage.getItem("histry")) || [];
        this.histryWord = histry
      },
      // 关闭搜索弹层
      closeModal: function() {
        $('#searchtext').css({'width': '100%'});
        $('.modal').hide();
        $('.cancelbtn').hide();
        $("body").css({
          'overflow': "auto",
          'position': 'static',
          'width': '100%',
          'height': '100%'
        })
      },
      // 历史记录去重
      histryUnique: function(arr) {
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++) {
          if(!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
          }
        }
        return res;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/order.css'
</style>
