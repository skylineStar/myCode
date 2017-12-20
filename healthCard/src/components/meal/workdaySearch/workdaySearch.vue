﻿<template>
  <div class="WorkdaySearch">
    <div class="" id="workdaySearch">
      <ul class="selectArea">
        <li>
          <span class="fs125">城市选择</span>
          <input type="text" placeholder="请选择" id="CitySelectResultID" class="fs125" readonly="readonly"
          @click="showPopup(1,true)">
          <div class="clear"></div>
        </li>
        <li id="list2">
          <span class="fs125">体检机构</span>
          <input type="text" placeholder="请选择" id="CenterSelectResultID" class="fs125" readonly="readonly" 
          	@click="showPopup(2,pop2)">
          <div class="clear"></div>
        </li>
        <li>
          <span class="fs125">体检套餐</span>
          <input type="text" placeholder="请选择" id="MealSelectResultID" class="fs125" readonly="readonly"
          style="padding-right: 13%;" @click="showPopup(3,pop3)">
          <div class="clear"></div>
        </li>
        <li>
          <span class="fs125">体检站点</span>
          <input type="text" placeholder="请选择" id="StationSelectResultID" class="fs125" readonly="readonly"
          style="padding-right: 10%;" @click="showPopup(4,pop4)">
          <div class="clear"></div>
        </li>
      </ul>
      <div class="explain">
        <span class="explain_l fs11">蓝色为可选日期</span>
        <span class="explain_r fs11">黄色为已选日期</span>
      </div>
      <!-- wyz 日历 -->
      <div class='dateTable'>
        <div class='clear'>
          <h3 class="datehead">{{year}}年 - {{month}}月</h3>
          <ul class='datebody'>
            <li class='week'>日</li>
            <li class='week'>一</li>
            <li class='week'>二</li>
            <li class='week'>三</li>
            <li class='week'>四</li>
            <li class='week'>五</li>
            <li class='week'>六</li>
            <ol v-for="(d,m) in datelist" class="datelist">
              <li  class='disable' v-for="(item,i) in d" :id="m+item">{{item}}</li>
            </ol>
          </ul>
        </div>
      </div>
      <div class="fs115 f8f8f8 c999" style="padding:0.83rem 0.83rem 3.6rem;">
        以上数据均来自与第三方体检机构，可选体检日期将会根据体检机构、站点的不同发生变化，由此为您带来的不便敬请谅解。
      </div>
    </div>
    <!-- 弹出层-城市 -->
    <mt-popup v-model="searchModal.citySlect" position="middle">
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="SlectCancel(1)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="SlectTrue(1)">确定</mt-button>
      </div>
    </mt-popup>
    <!-- 弹出层-机构 -->
    <mt-popup v-model="searchModal.centerSlect" position="middle">
      <mt-picker :slots="centerSlectlist" @change="onCardstateChange2">
      </mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="SlectCancel(2)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="SlectTrue(2)">确定</mt-button>
      </div>
    </mt-popup>
    <!-- 弹出层-套餐meal -->
    <mt-popup v-model="searchModal.mealSlect" position="middle">
      <mt-picker :slots="mealSlectlist" @change="onCardstateChange3">
      </mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="SlectCancel(3)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="SlectTrue(3)">确定</mt-button>
      </div>
    </mt-popup>
    <!-- 弹出层 - 站点 -->
    <mt-popup v-model="searchModal.stationSlect" position="middle">
      <mt-picker :slots="stationSlectlist" @change="onCardstateChange4" value-key="name">
      </mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="SlectCancel(4)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="SlectTrue(4)">确定</mt-button>
      </div>
    </mt-popup>

    <!-- <p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }}</p> -->
    <!-- bottoms -->
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
  import {address,add} from '../../../assets/js/city_abc.js'
  import $ from 'jquery'
  import citydata from '../../../assets/js/citydata.js'
  import {getDayList} from '../../../assets/js/BaseJS.js'
  import { MessageBox,Indicator,Toast } from 'mint-ui'
  import {config_param} from '../../../assets/js/config_param.js'
  import API from '../../../api/API'
  import {bemember} from '../../../assets/js/mealfunc.js'
  const api = new API();
  export default {
    data () {
      return {
      	isMemberPrice:{'yesorno':'0'},//是否已选择会员价
    		shengyu:{'yesorno':'1'},//是否已选择会员价
        originalPrice: '',
        orderPrice: '',
        city_values:['','A'],
        searchModal:{
          citySlect: false,
          centerSlect: false,
          mealSlect: false,
          stationSlect: false
        },
        searchInfo:{
          citySelectResult: '',
          centerSlectResult: '',
          mealSlectResult: '',
          stationSlectResult: ''
        },
        addressSlots: [
          {
            flex: 1,
            values:  address['A'],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: Object.keys(address),//返回address的所有属性
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        num: 1,
        addressProvince: '北京',
        addressCity: '北京',
        // center
        centerSlectlist: [{
          flex: 1,
          // values: [],
          values: [],
          className: 'centerSlectlist',
          textAlign: 'center'
        }],
        // meal
        mealSlectlist: [{
          flex: 1,
          // values: [],
          values: [],
          className: 'mealSlectlist',
          textAlign: 'center'
        }],
        // 站点
        stationSlectlist: [{
          flex: 1,
          values: [],
          className: 'stationSlectlist',
          textAlign: 'center'
        }],
        focusCityId: '', // 所选城市id（唯一） 用以获取机构
        centerAllData: [],
        // focusCenterNo: [], // 所选机构编码 用以获取站点station信息
        focusCenterId: '',  // 机构编码（唯一）用以获取站点信息
        thirdNo: '', // 第三方套餐编码
        baseDateThird: [],
        mealSelectBox: [],
        orgNo: [], // 网点编码
        orgorg: '',
        datelist:{},
        year: '',
        month: '',
        scheduleDateList: [],
	      homePriceSave:'',//session體檢品牌信息
	      pop2:false,//控制弹出层是否弹出--机构
	      pop3:false,//套餐
	      pop4:false//站点	      
      }
    },
    beforeCreate(){
      document.title = '工作日查询';
    },
    mounted: function () {
    	this.init();
      this.pageInit();
    },
    methods: {
    	init:function() {
    			// 底部购买
      var homePriceSave=sessionStorage.getItem('homePriceSave');
      this.homePriceSave=JSON.parse(homePriceSave);
      this.originalPrice =this.homePriceSave.originalPrice;
      this.orderPrice =this.homePriceSave.orderPrice;
  		var isMemberPrice=JSON.parse(sessionStorage.getItem('isMemberPrice'));
  		this.isMemberPrice = isMemberPrice;
  		var shengyu=JSON.parse(sessionStorage.getItem('shengyu'));
  		this.shengyu = shengyu;
  	},
    bemember:function() {
    	var that=this;
    	bemember(that,MessageBox,api);	
    	},
      pageInit: function () {
        var _this = this;
        var date1 = new Date();
          this.year = date1.getFullYear();
          this.month = date1.getMonth()+1;
         _this.datelist=getDayList(null,'fill');

      },
      showPopup: function (type,nopop) {
        if (type == 1) {
          this.searchModal.citySlect = true;
        }
        if (type == 2) {
          if (nopop == false) {
            this.searchModal.centerSlect = false;
          } else {
            this.searchModal.centerSlect = true;
          }
        }
        if (type == 3) {
          if (nopop == false) {
            this.searchModal.mealSlect = false;
          } else {
            this.searchModal.mealSlect = true;
          }
        }
        if (type == 4) {
          if (nopop == false) {
            this.searchModal.stationSlect = false;
          } else {
            this.searchModal.stationSlect = true;
          }
        }
      },
      onAddressChange(picker, values) {
   console.log(this.num);
        this.city_values=values;//values=['北京市','B'] 保存城市选择项
        console.log(this.num);
        if(this.num>2){
          var cityval=address[values[1]];
          this.addressSlots[0].values=address[values[1]];
        }
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.num++;
      },
      // 机构选择piccker
      onCardstateChange2 (picker, values) {
        picker.setSlotValues(1, values[0])
        this.searchInfo.centerSlectResult = values[0];//保存机构选择项，给调用接口提供查询参数
      },
      // 套餐meal选择piccker
      onCardstateChange3 (picker, values) {
        picker.setSlotValues(1, values[0])
        this.searchInfo.mealSlectResult = values[0];//保存套餐选择项
      },
      // 站点选择piccker
      onCardstateChange4 (picker, values) {
        picker.setSlotValues(1, values[0])
        this.searchInfo.stationSlectResult = values[0];//保存站点选择项
      },
      // 确定 城市1 机构2 站点3
      SlectTrue: function (index) {
        var _this = this;
        if(index == 1){
          // 城市点击确定：该动作完成：
          // （1）关闭蒙板选择窗口（2）所选城市填到input（3）获取所选城市对应的城市id
          // （4）querycneter查到该城市对应的机构名称center 填到机构蒙板valus数组中
          //  （5）查到该机构对应的编码
          if(_this.city_values[1]){var add_arr=add[_this.city_values[1]]}
          else{ var add_arr=add['A']}
          var cityname=_this.city_values[0];// 城市名
          add_arr.forEach(function(item){
              if(item.CITYNAME==cityname){
                _this.focusCityId=item.CITY_ID;// 城市id
              }
          })
          this.searchModal.citySlect = false; // 关闭蒙版
          $("#CitySelectResultID").val(cityname); // 填充input
          $("#CenterSelectResultID").val(""); //  清空
          $("#MealSelectResultID").val(""); //  清空
          $("#StationSelectResultID").val(""); //  清空
          //不能选择套餐，站点
          _this.pop3=false;
          _this.pop4=false;
          $('.datelist').children().removeClass('able');
          // -----------------------------------
          // 【】根据所选城市查机构 center
           var param = {
            "cityCd": _this.focusCityId, // 城市id
            "orgSvcPkgNoMa": this.homePriceSave.productcode  // 泰康套餐编码
          };
          var response = api.queryOrgListByCity(param);
          response.then(function(res){
            console.log(res);
            if(res.data.status == '1'){
              _this.centerAllData = res.data.data;//保存数据，为下一个接口调用提供查询数据来源
               //console.log(_this.centerAllData)
              _this.centerSlectlist[0].values = []; // 清空
              _this.centerAllData.forEach(function (item) {
              	var num=item.parentOrgNo;
              	switch(num){
              		case "10001":
              		 item.parentOrgName="美年大健康";//替换数组里面的名称为全称
              		 break;
              		 case "10002":
              		 item.parentOrgName="瑞慈医疗";
              		 break;
              		 case "10003":
              		 item.parentOrgName="爱康国宾";
              		 break;
              		 case "10004":
              		 item.parentOrgName="慈铭体检";
              		 break;
              	}
                _this.centerSlectlist[0].values.push(item.parentOrgName);//为下一个popup提供数据列表
								_this.pop2=true;
               // console.log(_this.centerAllData)
              });
            }else{
              _this.mui.toast('您所选城市暂未提供体检服务,请重新选择');
              _this.pop2=false;
            }
          }).catch(function(err){
              console.log(err);
          });
        }else if(index == 2){
          this.searchModal.centerSlect = false; // 关闭蒙版
          $("#CenterSelectResultID").val(this.searchInfo.centerSlectResult);
          $("#MealSelectResultID").val(""); //  清空
          $("#StationSelectResultID").val(""); //  清空
          //不能选择站点
					_this.pop4=false;
					$('.datelist').children().removeClass('able');
          _this.centerAllData.forEach(function (item) {
             if (item.parentOrgName == _this.searchInfo.centerSlectResult) {
              _this.focusCenterId = item.parentOrgNo; // 机构编码
            }
          });
          // 把机构对应的套餐放到套餐meal的下拉框中
          var param = {
            "cityCd": _this.focusCityId, // 城市id
            "parentOrgNo": _this.focusCenterId, // 机构编码
            "orgSvcPkgNoMa": this.homePriceSave.productcode // 泰康体检套餐
          };
          var response = api.queryThirdNo(param);
          response.then(function(res){
            var data=res.data;
            if(data.status == '1'){
              var Bdata=data.data;
              console.log(Bdata);
              _this.mealSlectlist[0].values = []; //  清空
              _this.baseDateThird = Bdata;
              Bdata.forEach(function(item){
                _this.mealSlectlist[0].values.push(item.orgSvcPkgNameAs);
              });
              // 该机构下有套餐 就给套餐input注册点击事件
							_this.pop3=true;
            }else{
              _this.mui.toast('所选机构未提供套餐服务');
							_this.pop3=false;
            }
          }).catch(function(err){
              console.log(err);
          });
        }else if(index == 3){
          this.searchModal.mealSlect = false;
          $("#MealSelectResultID").val(this.searchInfo.mealSlectResult); // 填到meal input dom上
          $("#StationSelectResultID").val(""); //  清空
          $('.datelist').children().removeClass('able');

          var mealName = $("#MealSelectResultID").val();
          _this.baseDateThird.forEach(function (item) {
            if (item.orgSvcPkgNameAs == mealName) {
              _this.thirdNo = item.orgSvcPkgNoAs;//保存接口请求参数
            }
          });
          // 【请求站点信息】 queryStationList
          var param1 = {
            "cityCd": _this.focusCityId, // 城市id
            "parentOrgNo": _this.focusCenterId, // 机构编码
            "orgSvcPkgNoAs": _this.thirdNo // 第三方套餐编码
          };
          var response = api.queryStationList(param1);
          response.then(function(res){
            if(res.data.status=='1'){
              var Bdata = res.data.data;
              _this.orgNo = Bdata;
              _this.stationSlectlist[0].values = []; //  清空
              Bdata.forEach(function (item) {
                _this.stationSlectlist[0].values.push(item.orgName);
              });
							_this.pop4=true;
            }else{
              console.log(res.message);
							_this.pop4=false;
            }
          }).catch(function(err){
              console.log(err);
          });
        }else if(index == 4){
          this.searchModal.stationSlect = false;
          $("#StationSelectResultID").val(this.searchInfo.stationSlectResult);
          // 【请求站点体检时间】 queryDateByMedicalCenter
          var stationAA = $("#StationSelectResultID").val();
          _this.orgNo.forEach(function (item) {
            if (item.orgName == stationAA) {
              _this.orgorg = item.orgNo;
            }
          });
          var _this = this;
          var param1 = {
            "orgNo": _this.orgorg, // 体检网点
            "orgSvcPkgNoAs": _this.thirdNo, // 第三方套餐编码
            "startDate": '',
            "endDate": ''
          };
          var response = api.queryStationTime(param1);
          response.then(function(res){
            var data=res.data;
            console.log(data);
            if(data.status=='1'){
              data=data.data;
              console.log(data);
              var scheduleDateList =data.scheduleDateList;
              scheduleDateList.forEach(function(i){
                var c_date=i.sheduleDate;
                var c_day=c_date.split('-')[2];//[3,4,5,6]
                var use_d=Number(c_date.split('-')[1])+""+Number(c_date.split('-')[2]);
                  $('#'+use_d).addClass('able');
              });
            }else{
              console.log(res.message)
            }
          }).catch(function(err){
              console.log(err);
          });
        }
      },
      // 取消 城市1 机构2 站点3
      SlectCancel: function (index) {
   			switch(index){
        	case 1:
	    		this.searchModal.citySlect = false;
	    		break;
	    		case 2:
	    		this.searchModal.centerSlect = false;
	    		break;
	    		case 3:
	    		this.searchModal.mealSlect = false;
	    		break;
	    		case 4:
	    		this.searchModal.stationSlect = false;
	    		break;
        }
      },
    tobuypage:function(){
     	window.location=config_param.buy_oauth2;
     }
    }
  }
</script>
<style>
  #workdaySearch{
    background: #f8f8f8;
  }
  .selectArea{
    width: 100%;
    padding:0.83rem 0.83rem 0;
    background: #ffffff;
  }
  .selectArea li{
    line-height:1.78rem;
  }
  .selectArea li span{
    width: 20%;
    float: left;
  }
  .selectArea li input{
    width: 76%;
    height:1.78rem;
    float: right;
    background: url('../../../../static/img/tobottom.png') no-repeat center right;
    background-size: 6% 19%;
    background-position-x: 96%;
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
    padding: 0 0.67rem;
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
  .explain{
    /*width: 100%;*/
    padding-right:0.83rem;
    height:2.06rem;
    line-height: 2.17rem;
  }
  .explain_l{
    width: 63%;
    /*line-height: 2.17rem;*/
    float: left;
    text-align: right;
    background: url('../../../../static/img/blueBlock.png') no-repeat 51% 50%;
    background-size: 9% 46%;
  }
  .explain_r{
    width: 36%;
    /*line-height: 2.17rem;*/
    float: right;
    /*text-align: left;*/
    text-indent: 6%;
    background: url('../../../../static/img/yellowBlock.png') no-repeat 0% 50%;
    background-size: 15% 44%;
  }
  /*日历*/
    .dateTable{
      /*width: 100%;*/
      background-color: #FFFFFF;
    }
    .dateTable .datehead{
      /*width:100%;*/
      text-align: center;
      font-size: .889rem;
      margin: 0;
      padding: .4rem 0;
    }
    .datebody li{
      float: left;
      width: 14%;
      font-size: .889rem;
      text-align: center;
      padding: .55rem 0;
      vertical-align: middle;
      margin-bottom: 0.11rem;
      border: 1px solid transparent;
    }
    .datebody li.week{
      font-size: .7rem;
    }
    .clear{
      clear: both;
      overflow: hidden;
    }
    .disable{
      color: #cbcbcb;
    }
    .able{
      color: #4dacd6;
    }
</style>
