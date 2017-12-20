<!--@wyz
预约时间选择页面：展示可选预约日期；客户选择、修改预约日期
  最后修改时间：2017.9.8
-->
<template>
  <div class='dateCheck'>
    <div class="body">
      <!--步骤导航-->
          <div class='stepnav' v-if ='pageTag !="mod"'>
           <ul class="steplist">
            <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>所在城市</p></li>
            <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>体检地址</p></li>
            <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>体检日期</p></li>
            <li class='txtnav'><span class='ws'><i class='wi'></i></span><p>基本信息</p></li>
           </ul>
           <div class='dateline'></div>
          </div>
        <!--步骤导航===end====-->
      <!--日期颜色标志-->
      <div class='dateicon'>
        <i class='bluebg coloricon'></i>
        <span class='colortxt'>蓝色为可选日期</span>
        <i class='orangebg coloricon'></i><span class='colortxt'>黄色为已选日期</span>
      </div>
      <!--日期颜色标志==end==-->
      <!--日历-->
      <div class='dateTable'>
        <div class='clear'>
          <h3 class="datehead">{{curYear}}年 - {{curMon}}月</h3>
          <ul class='datebody'>
            <li class='week'>日</li>
            <li class='week'>一</li>
            <li class='week'>二</li>
            <li class='week'>三</li>
            <li class='week'>四</li>
            <li class='week'>五</li>
            <li class='week'>六</li>
            <!---->
            <ol v-for="(days,mon) in dateList">
              <li  class='disable' v-for='day in days'  :id='mon+day' @click='checkTime(mon,day)'>{{day}}</li>
            </ol>
          </ul>
        </div>
      </div>
      <div class="tipsword">
        <p>预约时间范围：您可预约未来30天内的体检；</p>
        <p>其他注意事项：以上数据均来自与第三方体检机构，体检日期将会根据体检机构、 站点的不同发生变化，由此为您带来的不便敬请谅解。</p>
      </div>
      <!--日历==end===-->
    </div>
    <!--底部按钮-->
    <div class="Time_stepact" v-if='pageTag == "new"'>
      <router-link to='/order/osGover'>
        <a href="javascript:void(0);" class="backstep">上一步</a>
      </router-link>
        <a href="javascript:void(0);" @click = 'nextAction' class="next btn-gradient">下一步</a>
    </div>
    <div class="Time_stepact"  v-if='pageTag == "mod"'>
        <a href="javascript:void(0);" class="backstep" @click='cancelAction'>取消</a>
        <a href="javascript:void(0);" @click = 'nextAction' class="next btn-gradient">确定</a>
    </div>
    <!--底部按钮==end===-->
  </div>
</template>

<script>
  import $jquery from 'jquery'
  import API from '../../api/API'
  const api = new API();
  import { Indicator,Toast,MessageBox } from 'mint-ui'
  import {getDayList,hideaddress} from '../../assets/js/BaseJS.js'
  export default {
    name: 'dateCheck',
    data () {
      return {
        pageTag:'',// 页面标记
        dateList:[],// 日期数组
        cardInfo:{},// 卡信息对象
        ableId:[],// 可用日期id
        curYear:'',// 当前年份
        curMon:'',// 当前月份
        myTime:{},// 预约时间对象
        todayId:'',// 当前日期id
        witch:'' // 修改页面标志
      }
    },
    beforeCreate () {document.title = '体检日期选择'},
    mounted () {this.fillPage();hideaddress();},
    methods: {
      // 页面所需数据判断
      fillPage:function(){
          var cardInfo = sessionStorage.getItem('cardInfo');
              cardInfo = JSON.parse(cardInfo);
              var url = window.location.href;
         let that  = this;
         // 判断是否已选择体检卡
        if(cardInfo){
          that.cardInfo = cardInfo;
          // 判断是否选择了城市
            if(cardInfo.City){
              that.cardInfo.City = cardInfo.City;
              //判断是否已选择机构
              if(cardInfo.Gover){
                that.cardInfo= cardInfo;
                if(cardInfo.Gover.mod){
                  that.pageTag = cardInfo.Gover.mod
                }
                that.fillDate ();
                //判断时间是否已选
                if(cardInfo.myTime ==null || cardInfo.myTime==undefined){
                  setTimeout(function(){
                    $jquery('.Time_stepact').css({'display':'none'});
                  },'100');
                }else{
                  if(cardInfo.myTime.bookDate){
                    that.pageTag = 'new'
                  }
                  if(url.split('?')[1] != undefined){ //判断是否为修改动作
                    that.pageTag = url.split('?')[1].split('&')[0];
                    that.witch = url.split('?')[1].split('&')[1];
                  }
                }
              }else{
                $jquery(".dateCheck").hide();
                MessageBox({title: '温馨提示',message: '您还没有选择体检中心',showCancelButton: true,showCancelButton: false
              }).then(action => {window.location.href = "#/order/osGover"});
              }
            }else{
              $jquery(".osGover").hide();
              MessageBox({title: '温馨提示',message: '您还没有选择体检城市，去选择...',showCancelButton: true,showCancelButton: false
            }).then(action => {window.location.href = "#/order/City"});
            }
        }else{
          $jquery(".dateCheck").hide();
          MessageBox({title: '温馨提示',message: '您还没有选择体检卡',showCancelButton: true,showCancelButton: false
          }).then(action => {window.location.href = "#/order/UserManage"});
        }
      },
      // 填充页面数据
      fillDate: function () {
        var card = this.cardInfo;
        var day = new Date();//日期对象
        var week =day.getDay();
        var month = day.getMonth();
        this.curMon =month+1; //当前月份
        this.curYear = day.getFullYear();
        var clist=getDayList();  // 日期数据
        var begin = card.startTime; //卡有效期开始时间
        var cend = card.endTime;  //卡有效期结束时间
        var today = day.getDate();// 今日日期
        //今日前日期
        for(var i=(today-1);i>(today-1-week);i--){
          if(i<1){
            clist[this.curMon].unshift(" ");
          }else{
            clist[this.curMon].unshift(i);
          }
        }
        let that =this;
        that.dateList = clist;// 时间数组
        setTimeout(function(){$jquery("#"+that.curMon+today).addClass('curdate')},'100');
        if(card.myTime){
          var id = card.myTime.ID;
          setTimeout(function(){$jquery("#"+id).addClass('checkdate')},'100');
          this.myTime = card.myTime;
        }
        var param ={"orgNo": card.Gover.orgNo,"orgSvcPkgNoAs":card.Gover.orgSvcPkgNoAs,"startDate":card.startTime,"endDate":card.endTime}
        let response = api.queryDateByMedicalCenter (param); // 调取预约时间接口
        var able=[];//可用数组
        var dddd=[];// 可用日期
        var d1 = new Date();
        d1.setFullYear(begin.split(".")[0],begin.split(".")[1],begin.split(".")[2])
        var d2 = new Date();  
        d2.setFullYear(cend.split(".")[0],cend.split(".")[1],parseInt(cend.split(".")[2])+1)
        response.then(function(res){
          var data=res.data;
          var d3=new Date();
          var d,m;
          if(data.status=='1'){ // 请求成功数据处理
            data = data.data
            data = data.scheduleDateList;
          var cc;
          var len =data.length;
          if(len === 0){
             MessageBox({title: '温馨提示',message: '该网点本月已约满，请选择其他网点进行预约，或联系客服：95522',showCancelButton: true,showCancelButton:false
              }).then(action => {window.location.href='#/order/osGover'});
          }
          var num,list;
          for(var a=0;a<len;a++){
             num= data[a].personCount;// 可预约人数
             list = data[a].sheduleDate; // 可预约日期
              if(num>0){
                d3.setFullYear((list.split('-')[0]),(list.split('-')[1]),(list.split('-')[2]))
                if(d3>d1 && d3 <d2){// 可预约日期与卡有效期比较
                  if(list.split('-')[1].indexOf(0) == 0){ // 月份以0开始
                    m = list.split('-')[1].substring(1);
                  }else{ // 月份为10、11、12
                    m = list.split('-')[1];
                  }
                  if(list.split('-')[2].indexOf(0) == 0){// 日期以0开始
                    d = list.split('-')[2].substring(1);
                  }else{
                    d = list.split('-')[2]
                  }
                  dddd.push(d)
                  able.push((m+d));
                  $jquery("#"+(m+d)).addClass('able');// 有效日期设置蓝色字
                }
              }
            }
        that.ableId = able; // 可预约的数据id
        }else{ // 显示报错信息
//        that.mui.toast(data.message);
          MessageBox({title: '温馨提示',message: '该体检中心没有可预约日期，请重新选择！',showCancelButton: true,showCancelButton:false
              }).then(action => {window.location.href='#/order/osGover'});
          $jquery('.Time_stepact').css({'display':'none'});
        }
      }).catch(function(err){console.log(err);});
      },
      // 选择预约时间
      checkTime: function(curmon,curday){
        var day =new Date(); //日期对象
        var bookDate='';
        var month = curmon;//当前月份
        this.curMon = curmon;// 页面展示当前月份
        var year = this.curYear; // 当前年份
        var ID=curmon+curday;// 所选日期的id值
        var result = $jquery.inArray(ID,this.ableId) //判断所点击日期是否为可用日期
        if(result==-1){ // 不可用弹出提示
          Toast({ message: '您选择的日期不可预约，请重新选择',duration: 2000,className:'mToast'})
        }else{
          $jquery("li").removeClass('checkdate');
          $jquery("#"+ID).addClass('checkdate');//为所点击的可用日期添加选中样式
          bookDate = year+"-"+month+"-"+curday; // 拼接所选预约日期格式
          var myTime =this.myTime;
          myTime.bookDate = bookDate;
          myTime.ID = ID;
          if(this.pageTag!="mod"){ // 按钮显示判断
            this.pageTag = "new";
          }
        }
      },
      nextAction: function(){ // 下一步或修改操作
        var cardInfo = this.cardInfo;
            cardInfo.myTime =this.myTime;
            sessionStorage.setItem('cardInfo',JSON.stringify(cardInfo));// 存预约时间信息
            window.location.href='#/order/orderMsg'
      },
      cancelAction: function(){ // 上一步或取消操作
        if(this.witch !='time'){
          window.location.href = '#/order/osGover?mod&'+this.witch
        }
        if(this.witch=='time'){
          window.location.href = '#/order/orderMsg'
        }
      },
    }
}
</script>

<style stoped>
.body{height:calc(100% - 2.77rem)}
.Time_stepact{font-size:1rem;height:2.77rem;line-height:2.77rem;width:100%;text-align:right;background-color:#FFF;position:fixed;z-index:10;right:0;bottom:0}
.mToast{font-size:.72rem;width:100%}
  /*步骤导航修改*/
.dateline{display:inline-block;position:absolute;z-index:0;top:1.123rem;left:12%;width:63%!important;height:1px;background-color:#5c9edc}
.stepnav{margin-bottom:0}
 /*步骤导航修改===end===*/
  /*日期颜色标志*/
.dateicon{width:100%;background-color:#f8f8f8;padding:15px 5px 10px;overflow:auto;text-align:right}
.coloricon{display:inline-block;width:10px;height:10px;margin-right:6px}
.colortxt{display:inline-block;margin-right:15px;font-size:.61rem}
   /*日期颜色标志==end==-->*/
  /*日历*/
.dateTable{width:100%;background-color:#FFF}
.dateTable .datehead{width:100%;text-align:center;font-size:.889rem;margin:0;padding:.4rem 0}
.datebody{width:100%}
.datebody li{float:left;width:14%;font-size:.889rem;text-align:center;padding:.55rem 0;vertical-align:middle;margin-bottom:2px;border:1px solid transparent}
.datebody li.week{font-size:.55rem;font-weight:400}
.clear{clear:both;overflow:hidden}
.checkdate{width:42px;text-align:center;background-color:#ffe0c1;border:1px solid #ffc183!important;color:#FF5300!important;vertical-align:middle}
.disable{color:#cbcbcb}
.able{color:#4dacd6}
.curdate{color:#cbcbcb;position:relative}
.curdate:after{content:'';display:block;width:5px;height:5px;background-color:#FF5300;border-radius:50%;position:absolute;bottom:0;left:45%}
.tipsword{background-color:#F8F8F8;padding:.833rem;font-size:.55rem;margin-bottom:28px}
  /*日历===end====*/
 .backstep a{color: #666666;}
</style>

