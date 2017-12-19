<!-- 
@ wyz
功能：选择预约日期时间
1、可预约日期选择；2、日期对应的时间段选择
 -->
<template>
  <div class='checkTime'>
    <div class='searchbox left'>
        <i class='searchicon'></i>
        <div class="inputbox">
          <input type="search"  id="searchtext" readonly="readonly"  @focus="searchFoucus()"   @keyup.enter='searchHospital()' placeholder="门店名称"/>
          <a class='cancelbtn' @click='searchHospital()' v-if='searchWord'>搜索</a>
          <a class='cancelbtn' @click='searchHospital()' v-else-if= "searchWord==''">取消</a>
        </div>
      </div>
    <div class="body">
      <div class='head_week clear'>
        <span   class='week mo'>日</span>
        <span class='week'>一</span>
        <span class='week'>二</span>
        <span class='week'>三</span>
        <span class='week'>四</span>
        <span class='week'>五</span>
        <span class='week mo'>六</span>
      </div>
      <!--日历-->
      <div class='dateTable'>
        <div class='clear'>
          
          
          <ul class='datebody'>
            
            <!---->
            <div v-for="(days,mon) in dateList" v-if='mon == curMon'>
              <h3 class="datehead">{{curYear}}年{{curMon}}月</h3>
              <ol >
                <li class='disable' v-for='day in days'   :id='mon+day' @click='checkDate(mon,day)' >
                  <span v-if='day==today'>今天</span><span v-else>{{day}}</span>
                  <div class='unorderFlag' v-if='day==today'>不可约</div>
                  <div class='unorderFlag' v-if="ableId.indexOf(mon+day)==-1 && oldId.indexOf(mon+day)==-1 && mon== nextMon">约满</div>
                </li>
              </ol>
            </div>
            <div v-for="(days,mon) in dateList" v-if='mon == curMon+1' class='monbody clear'>
              <h3 class="datehead" v-if='nextYear == curYear'>{{curYear}}年{{nextMon}}月</h3>
              <h3 class="datehead" v-if='nextYear == curYear+1'>{{nextYear}}年{{nextMon}}月</h3>
              <ol >
                <li class='disable' v-for='day in days'   :id='mon+day' @click='checkDate(mon,day)' >
                  <span v-if='day<today'>{{day}}</span>
                  <div class='unorderFlag' v-if="ableId.indexOf(mon+day)==-1 && oldId.indexOf(mon+day)==-1 && mon== curMon">约满</div>
                </li>
              </ol>
            </div>
          </ul>
        </div>
      </div>
      <!--日历==end===-->
    </div>
    <mt-popup v-model="showTime" position="bottom">
      <div id="timeBox clear">
        <div class='timeTitle'><i class='close'@click='showTime = false'></i><h1>预约时间</h1></div>
        <ul class="timeList clear">
          <li class='left timeli' v-for='(item,index) in items' @click='checkTime(item,index)'>
            <!--<button class='mybtn disableCss' :id='index'  disabled="disabled">{{item.sTime}}-{{item.eTime}}</button>-->
            <button class='mybtn disableCss' :id='index'  disabled="disabled">{{item.sTime}}</button>
          </li>
        </ul>
      </div>
      
    </mt-popup>
  </div>
  
</template>

<script>
  import  $ from 'jquery'
  import { Indicator,Toast,MessageBox } from 'mint-ui'
  import {getDayList,hideaddress} from '../../assets/js/BaseJS.js'
  import {config_param} from '../../assets/js/config_param'
  export default {
    name: 'checkTime',
    data () {
      return {
        orderTime:{},// 存入session的预约时间对象
        curMonList:[],// 当前月份数组
        dateList:[],// 日期数组
        ableId:[],// 可用日期id$
        timeAbleId:[],// 可用时间id
        curYear:'',// 当前年份
        nextYear:'',// 下一年
        curMon:'',// 当前月份
        nextMon:'',// 下一月
        myTime:{},// 预约时间对象
        todayId:'',// 当前日期id
        today:'',
        oldId:[],// 过期日期id
        scheduleIdObj:{},// scheduleId对象
        showTime:false, // 显示时间弹层
        timeObj:{},// 乐牙预约时间对象
        items:[{"sTime":"07:00","eTime":"08:00"},{"sTime":"08:00","eTime":"09:00"},{"sTime":"09:00","eTime":"10:00"},{"sTime":"10:00","eTime":"11:00"},{"sTime":"11:00","eTime":"12:00"},{"sTime":"12:00","eTime":"13:00"},{"sTime":"13:00","eTime":"14:00"},{"sTime":"14:00","eTime":"15:00"},{"sTime":"15:00","eTime":"16:00"},{"sTime":"16:00","eTime":"17:00"},{"sTime":"17:00","eTime":"18:00"},{"sTime":"18:00","eTime":"19:00"},{"sTime":"19:00","eTime":"20:00"},{"sTime":"20:00","eTime":"21:00"},{"sTime":"21:30","eTime":"22:00"}],// 时间对象
      }
    },
    beforeCreate () {document.title = '选择日期'},
    mounted () {
      var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
          this.orderInfo = orderInfo; //  获取ordersession对象
      this.fillDate();
      $(document).height($(window).height())
      $('.checkTime').css({'height':$(window).height()+"px"})
      console.log($(window).height())
      console.log($(document).height())
      $("#searchtext").blur();
    },
    methods: {
      // 填充页面数据
      fillDate: function () {
        var day = new Date();//日期对象
        
        var week =day.getDay();
        var month = day.getMonth();
        this.curMon =month+1; //当前月份
        
        this.curYear = day.getFullYear();
//      this.curMon = 12
        if(this.curMon == 12){
          this.nextMon = 1;
          this.nextYear = this.curYear+1;
          
        }else{
          this.nextYear = this.curYear
          this.nextMon = this.curMon+1;
        }
        console.log(this.nextMon,this.nextYear);
        var dd= day.getDate();
        this.today = dd;
//      for(var d=1;d<dd;d++){
//        this.filldays.push(d)
//      }
        // 当前日期
        var curDate = this.curYear+"-"+this.curMon+"-"+dd;
        var clist = getDayList();  // 日期数据
        console.log("初次拿到日期数据")
        console.log(clist[this.curMon+1])
        var today = day.getDate();// 今日日期
        // 本月一日星期几
        var firstday = this.curYear+"-"+this.curMon+"-"+1;
        var nextday = this.curYear+"-"+(this.curMon+1)+"-"+1;
        var tswk = new Date(firstday);//当月一日日期对象
        var nswk = new Date(nextday);//次月一日日期对象
        console.log(tswk)
        var first_week =tswk.getDay();
        var next_week =nswk.getDay();
        
        //今日前日期
        for(var i=(today-1);i>0;i--){
          if(i<1){
            clist[this.curMon].unshift(" ");
          }else{
            clist[this.curMon].unshift(i);
          }
        }
        for(var w=0;w<first_week;w++){
          clist[this.curMon].unshift("&nbsp;");
        }
        for(var n=0;n<next_week;n++){
          clist[this.curMon+1].unshift("&nbsp;");
        }
         
        let that =this;
//      setTimeout(function(){$("#"+that.curMon+today).addClass('curdate')},'100');
        that.dateList = clist;// 时间数组
//      var param ={
//        "doctorId": that.orderInfo.doctorId,
//        "hospitalId": that.orderInfo.hospitalId,
//        "orgSource":that.orderInfo.orgSource,// 机构来源
//        "storeId" :that.orderInfo.orgCode // 第三方平台医院id
//      }
//      if(config_param.isLog)console.log(param);
//      let response = api.getDoctorSchedule (param); // 获取一个门店的排班列表
//      var able=[];//可用数组
//      response.then(function(res){
//        if(config_param.isLog)console.log(res)
//        var data = res.data
//        var d,m;
//        if(data.status=='1'){ // 请求成功数据处理
////        that.dateInfo= data.getDoctorScheduleResponseVoList; 
//
//
//          var Arr= data.getDoctorScheduleResponseVoList;
////          var Arr=[{"am":"07:00-12:00","count":"5","outpDate":"2017-10-22","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-23","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-24","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-25","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-26","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-27","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-28","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-29","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-30","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-31","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-01","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-02","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-03","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-04","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-05","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-06","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-07","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-08","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-09","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-10","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-11","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-12","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-13","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-14","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-15","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-16","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-17","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-18","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-19","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-20","pm":"12:00-21:30"}]
//        if(config_param.isLog)console.log("===============Arr")
//        if(config_param.isLog)console.log(Arr)
//        var len =Arr.length;// 数组长度
//        var staFlag,list;
//        for(var a=0;a<len;a++){
//           staFlag = Arr[a].reserveFlag;// 预约状态
//           list = Arr[a].outpDate; // 可预约日期
//           var days = that.compareStart(list);
//            if(days > 0){
//                if(list.split('-')[1].indexOf(0) == 0){ // 月份以0开始
//                  m = list.split('-')[1].substring(1);
//                }else{ // 月份为10、11、12
//                  m = list.split('-')[1];
//                }
//                if(list.split('-')[2].indexOf(0) == 0){// 日期以0开始
//                  d = list.split('-')[2].substring(1);
//                }else{
//                  d = list.split('-')[2]
//                }
//                able.push((m+d));// 可用日期id
//                that.scheduleIdObj[(m+d)]= Arr[a].scheduleId;// scheduleId存储
//                that.timeObj[(m+d)] = Arr[a]
//                
//                setTimeout(function(){
//                  for(var i=0;i<able.length;i++){
//                    $("#"+able[i]).addClass('able');// 有效日期设置样式
//                  }
//                },100)
//            }
//          }
//        console.log("本月一日星期几")
//      console.log(that.timeObj)
//        $("#"+(that.curMon+1)+"00").css("visibility","hidden");
//        var cur_id = that.curMon+that.today;
//        var x,o;// 当天前的日期 去除的可用id
//        for(x=1;x<that.today+1;x++){
//          o = ""+that.curMon+x
//          
//          for(var i=0; i<able.length; i++) {
//            if(able[i] == o) {
//              able.splice(i, 1);
//              break;
//            }
//          }
//          that.oldId.push(o)
//        }
//        console.log("去除的可用id")
//        console.log(able)
//      that.ableId = able; // 可预约的数据id
//      }else{ // 显示报错信息
//        if(data.message){
//          Toast({message:data.message});
//        }else{
//          Toast({message:"发生内部错误"});
//        }
//        
//      }
//      }).catch(function(err){console.log(err);});
      },
      // 选择预约时间
      checkDate: function(curmon,curday){
        console.log(curday)
          this.timeAbleId=[];// 置空所选日期id
          $('.mybtn').css({'padding-bottom':'1rem'});// 按钮样式微调
          $('.disableCss').after("<span class='unTimeFlag'>约满</span>");// 不可约样式微调
          $(".timeli").find(".unTimeFlag").css({'bottom':'.5rem'});// 不可约样式微调
          $(".timeli").find("button").attr('disabled','disabled');// 按钮不可用初始化
          var day =new Date(); //日期对象
          var month = curmon;//当前月份
  //      this.curMon = curmon;// 页面展示当前月份
          var year = this.curYear; // 当前年份
          this.orderTime.encounterDate = year+"-"+curmon+"-"+curday
          var ID=curmon+curday;// 所选日期的id值
          if(this.ableId.indexOf(ID)>-1&&curday != ""){
            this.showTime=true;// 显示时间弹层
            $("li").find('span').removeClass('checkdate');// 移除多余选中样式
            $("#"+ID).find('span').addClass('checkdate');//为所点击的可用日期添加选中样式
            if(config_param.isLog)console.log(this.orderInfo.orgCode)
            if(this.orderInfo.orgCode == 1){
              if(config_param.isLog)console.log(this.timeObj[ID])
              var am = this.timeObj[ID].am.split("-");
              var pm = this.timeObj[ID].pm.split("-");
              if(config_param.isLog)console.log(pm)
              var timeId = this.items;// 页面时间对象
              var len1 = timeId.length;
              for(var j=0;j<len1;j++){// 获取时间对象的序号
                    var s_tId = timeId[j].sTime;
                    if(s_tId ==am[0]){// 上午时间开始序号
                      var s1 = j
                    }
                    if(s_tId==am[1]){// 上午时间结束序号
                      var s2 = j
                    }
                    if(s_tId ==pm[0]){// 下午时间开始序号
                      var e1 = j
                    }
                    if(s_tId==pm[1]){// 下午时间结束序号
                      var e2 = j
                    }
                      
                  }
              this.timeAbleId=[];
              for(var c=0;c<len1;c++){
                if(c>(s1-1)&&c<(s2+1)){// 上午去除约满标记
                  $("#"+c).attr('disabled',false)
                  $("#"+c).siblings(".unTimeFlag").remove();
                  $("#"+c).css({'padding-bottom':'.2rem'})
                }
                if(c>(e1-1) && c<(e2+1)){// 下午去除约满标记
                  $("#"+c).attr('disabled',false)
                  $("#"+c).siblings(".unTimeFlag").remove();
                  $("#"+c).css({'padding-bottom':'.2rem'})
                }
                this.timeAbleId.push(c)
              }
              
            }else{
              // 分时排班表入参
              var param={
                  "hospitalId": this.orderInfo.hospitalId,// 医院编码
                  "scheduleId": this.scheduleIdObj[ID]//日排班ID
                  }
              let _this = this;
//            let response = api.getSchedulePartTime(param);// 分时排班表接口
//            response.then(function(res){
//              if(config_param.isLog)console.log(res);
//              if(res.data.status=='1'){
//                var time = res.data.getSchedulePartTimeResponseVoList;
//  //            $('.mybtn').css({'padding-bottom':'1rem'});// 按钮样式微调
//  //            $(".timeli").find(".unTimeFlag").css({'bottom':'.5rem'});// 不可约样式微调
//                var timeId = _this.items;// 页面时间对象
//                _this.timeAbleId=[];
//                for(var t=0,l=timeId.length;t<l;t++){
//                  var s_tId = timeId[t].sTime;
//                  for(var i=0,len= time.length;i<len;i++){
//                    if(s_tId == time[i].startTime){
//  //                  console.log(time[i].startTime,t);
//                      _this.timeAbleId.push(t);// 日期所用id
//                      $("#"+t).attr('disabled',false)
//                      $("#"+t).siblings(".unTimeFlag").remove();
//                      $("#"+t).css({'padding-bottom':'.2rem'})
//                    }
//                  }
//                }
//              }else{// 显示报错信息
//                if(res.data.message){
//                  Toast({message:res.data.message});
//                }else{
//                  Toast({message:"发生内部错误"});
//                }
//              }
//            }).catch(function(err){console.log(err);});
            }
            
          }
        
//      this.strDate = year+"-"+month+"-"+curday; // 拼接所选预约日期格式
      },
      checkTime:function (time,index) {
        var id = index;// 所选时间id
        console.log();
        if((this.timeAbleId).indexOf(id) > -1){
//        this.strDate += " "+this.items[id].sTime+"-"+this.items[id].eTime
          $(".mybtn").removeClass('timeChecked');// 移除多余选中时间样式
          $("#"+id).addClass('timeChecked');// 添加选中时间样式
          this.orderTime.startTime = this.items[id].sTime;// 存开始时间
          this.orderTime.endTime = this.items[id].eTime;// 存结束时间
          if(id < 4){
            this.orderTime.timeSlotId = 1;// 上午时间段编码
          }else{
            this.orderTime.timeSlotId = 2;// 下午时间段编码
          }
          this.orderInfo.orderTime = this.orderTime;
          sessionStorage.setItem('orderInfo',JSON.stringify(this.orderInfo))
          setTimeout(function(){
            window.location.href = '#/order/toOrder'
          },100)
        }
        
      },
      // 开始有效期比较
      compareStart:function(strDateStart){
        var d= new Date();
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;// 相差的天数
        oDate1= strDateStart.split(strSeparator); // 需要比较的日期
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(d.getFullYear(), d.getMonth(), d.getDate());// 当前日期
        iDays = parseInt((strDateS - strDateE) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
        return iDays ;
      },
    }
}
</script>

<style stoped>
  @import '../../assets/css/order.css'
</style>

