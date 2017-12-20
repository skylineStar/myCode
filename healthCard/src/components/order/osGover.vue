<!--@wyz
体检机构页面：1、选择体检机构；2、选择体检套餐；3、选择体检站点
  最后修改时间2017.9.7
-->
<template>
  <div class="osGover">
    <div class="govermain">
      <!--步骤导航-->
          <div class='stepnav' v-if='pageTag !="mod"'>
             <ul class="steplist">
              <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>所在城市</p></li>
              <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>体检地址</p></li>
              <li class='txtnav'><span class='ws'><i class='wi'></i></span><p>体检日期</p></li>
              <li class='txtnav'><span class='ws'><i class='wi'></i></span><p>基本信息</p></li>
             </ul>
             <div class='line'></div>
          </div>
        <!--步骤导航===end====-->
      <div class="meallist">
        <ul class='mealitems'>
          <li :class="{item:true,check:isCheck1}"><a :class='{check:isCheck5}' href="javascript:void(0);" @click = 'checkAction(1)'>体检机构选择&nbsp;&nbsp;<span v-if='collect.parentOrgName'>: {{collect.parentOrgName}}</span></a>
            <div class="mui_content_bj" v-if = 'isCheck1'>
              <div class="JGlogoArea">
                <ul class="JGlogo">
                  <li  v-for='item in goverInfo' :id = 'item.parentOrgNo' @click='checkGover(item)'><img :class = '{imgCheck:goverCheck[0]}' :src='item.imgsrc'/><span :class = '{txtCheck:goverCheck[0]}'>{{item.parentOrgName}}</span></li>
                </ul>
                <div class="clear"></div>
              </div>
            </div>
          </li>
          <!--性别套餐==========start==========-->
          <li class = 'pTitle' :class="{item:true,check:isCheck2}">
                <a  href="javascript:void(0);" :class='{check:isCheck6}' @click = 'checkAction(2)'>套餐性别选择&nbsp;&nbsp;<span v-if='collect.orgSvcPkgNameAs'>: {{collect.orgSvcPkgNameAs}}</span></a>
          <div v-if="isCheck2" class='mealbox'>
            <div class='lasttip'>
              <span>体检卡套餐选择:请您根据体检人的性别、婚否、身体状况选择 对应的套餐（女已代表女性已婚、女未代表女性未婚）</span>
            </div>
            <ul class='mealboxitems'>
                <li :class="{sonitems:true,check:isMeal1}"  v-for="(item,i) in mealInfo" @click='checkMeal(item)' :id='item.orgSvcPkgNoAs'>
                  <div class='sonitem'>
                      <a class='ordertitle' :class="{check:isMeal1}"  href="javascript:void(0);" >{{item.orgSvcPkgNameAs}}</a><i class='icon' @click.stop = 'mealAction(item.orgSvcPkgNoAs)'></i>
                    <div class="iteminfo"  v-if = 'item.orgSvcPkgNoAs'>
                    <h5>套餐内容</h5>
                    <div class='orderlist'>
                      <span class='detailtitle'>1、内科体检</span>
                      <span class='detailcontent'>心、肺听诊，腹部触诊</span>
                    </div>
                    <div class='orderlist'>
                      <span class='detailtitle'> 2、血常规</span>
                      <span class='detailcontent'>检查白细胞、红细胞、血小板等  </span>
                    </div>
                    <div class='orderlist'>
                      <span class='detailtitle'>3、尿常规 </span>
                      <span class='detailcontent'>尿胆素、尿胆原、胆红素、尿蛋白、亚硝酸盐、尿沉渣检查等  </span>
                    </div>
                    <div v-if='item.orgSvcPkgNoAs'>
                      <!--moreAction-->
                      <a class='more detailtitle' @click.stop= 'seeMore'>查看更多</a> 
                    </div>
                    
                  </div>
                  </div>
                </li>
              </ul>
          
          </div>
            </li> 
          <!--性别套餐============end===========-->
          <li :class="{item:true,check:isCheck3}" @click = 'checkAction(3)'>
              <a href="javascript:void(0);"  :class='{check:isCheck7}'>站点选择&nbsp;&nbsp;<span v-if='collect.orgName'>: {{collect.orgName}}</span></a>
            <ul class='stationlist' v-if="isCheck3"  >
              <li class='listitem showFive' v-for='(item,index) in station' @click='checkStation(item)' :id = 'item.orgNo' v-if='index < 5'>
                <span class='itemleft'>{{item.orgName}}</span><span class='itemright' v-if='item.distance != undefined'>距我：{{item.distance}}公里</span>
              </li>
              <li class='listitem showAll' v-else @click='checkStation(item)' :id = 'item.orgNo'>
                <span class='itemleft'>{{item.orgName}}</span><span class='itemright' v-if='item.distance != undefined'>距我：{{item.distance}}公里</span>
              </li>
              <li  v-if='stationLen >5' @click.stop='showMore' class="listitem morebtn"><span class='clickmore'>点击查看更多</span><span class='shouqi'>收起</span><i class='todown'></i></li>
            </ul>
          </li>
        </ul>
      </div>
      <!--更多男基础套餐-->
      <mt-popup v-model="normalMeal" position="middle">
        <img class = 'mealImg' src="../../assets/images/order/mealdetails.png"/>
      </mt-popup>  
      <!--更多男基础套餐==end===-->
    </div>
    
  <!--底部按钮-->
    <div class="c_stepact" v-if='pageTag =="new"'>
        <a href="javascript:void(0);" class="backstep" @click = 'backAction'>上一步</a>
        <a href="javascript:void(0);" @click = 'nextAction' class="next btn-gradient">下一步</a>
    </div>
    <div class="c_stepact" v-if='pageTag =="mod"'>
        <a href="javascript:void(0);" class="backstep" @click = 'cancelBack'>取消</a>
        <a href="javascript:void(0);" @click = 'nextAction' class="next btn-gradient">确认</a>
    </div>
    <!--底部按钮==end===-->    
    
    
    
  </div>
</template>

<script>
import {hideaddress} from '../../assets/js/BaseJS.js'
import {getPosition} from '../../assets/js/getLocation.js'
import API from '../../api/API'
const api = new API();
import { Indicator,Toast,MessageBox } from 'mint-ui'
import $jquery from 'jquery'
export default {
  name: 'osGover',
  data () {
    return {
      pageTag:'',// 页面标记
      which:'',// 修改对象标记
      isCheck1: false,// 机构是否展开
      isCheck2: false,// 套餐是否展开
      isCheck3: false,// 站点是否展开
      isCheck5:false,
      isCheck6:false,
      isCheck7:false,
      cardInfo:{},// 卡信息对象
      Gover:'',// 机构
      goverInfo:{},
      goverImg:{},
      goverCheck:[false,true,false,false],
      isMeal1: false, // 套餐
      isMeal2: false,
      isMeal3: false,
      Meal:'',
      mealNo:'',
      normalMeal:false,
      orderType2:false,
      orderType3:false,
      list:[1,2,3],
      mealInfo:{},
      station:{},  //站点
      latiude:'',  // 纬度
      longitude:'', //经度
      stationName:'',
      stationLen:'',
      collect:{"orgSvcPkgNoMa":"","parentOrgName":"","parentOrgNo":"","orgSvcPkgNameAs":"","orgSvcPkgNoAs":"","orgName":"","orgNo":""}  //汇总数据
    }
  },
  beforeCreate () {  document.title = '体检站点选择'  },
  mounted () {
    hideaddress();// 隐藏温馨分享
    this.fillPage();// 初始化页面
  },
  methods: { 
    // 初始填充页面
    fillPage:function(){
        var cardInfo = sessionStorage.getItem('cardInfo');
            cardInfo = JSON.parse(cardInfo);
          let that  = this;
          var url = window.location.href; // 获取跳转路径
      if(cardInfo){
        that.cardInfo = cardInfo;
      }else{
        $jquery(".osGover").hide();
        MessageBox({title: '温馨提示',message: '您还没有选择体检卡',showCancelButton: true,showCancelButton: false
        }).then(action => { window.location.href = "#/order/UserManage";   });
      }
      if(cardInfo.City){
        that.cardInfo.City = cardInfo.City;
          that.isCheck1 = true;
          that.fillGover ();
          if(cardInfo.Gover){ 
            if(cardInfo.Gover.parentOrgName){ 
            that.pageTag = 'new'}
            }
          // 根据路径判断修改信息
          if(url.split('?')[1] != undefined){
              that.pageTag = url.split('?')[1].split('&')[0];
              that.witch = url.split('?')[1].split('&')[1];
          }
        if(that.pageTag == 'mod'){
          that.collect = cardInfo.Gover;
          if(that.witch == 'gover'){
            that.isCheck1 = true;
            that.fillGover ();
          }
          if(that.witch == 'meal'){
            that.isCheck2=true;
            that.isCheck1 = false;
            that.fillMeal ();
          }
          if(that.witch == 'station'){
            that.isCheck3=true;
            that.isCheck1 = false;
            that.fillStation ();
          }
        }
      }else{
        $jquery(".osGover").hide();
        MessageBox({title: '温馨提示',message: '您还没有选择体检城市，去选择...',
            showCancelButton: true,
            showCancelButton: false
          })
          .then(action => {
            window.location.href = "#/order/City";
          });
      }
    },
   // 填充机构
    fillGover: function () {// 调取机构接口 渲染页面
      let that = this;
//    that.goverImg={'爱康':'/static/img/order/icon03.png','慈铭':'/static/img/order/icon.png','美年':'/static/img/order/icon02.png','瑞慈':'/static/img/order/icon01.png'}
      that.goverImg={'10003':'/static/img/order/icon03.png','10004':'/static/img/order/icon.png','10001':'/static/img/order/icon02.png','10002':'/static/img/order/icon01.png'}//review 20170913 kyy
      
      var cityCd = that.cardInfo.City.cityCd;
      var orgSvcPkgNoMa = that.cardInfo.orgSvcPkgNoMa;
      that.collect.orgSvcPkgNoMa = orgSvcPkgNoMa;
      if(this.cardInfo.City == null){ // 判断是否已选择城市
         $jquery(".body").css({'display':'none'});
        MessageBox({
          title: '温馨提示',message: '您还没有选择城市，去选城市吧！',showCancelButton: true,showCancelButton:false
        }).then(action => {
          window.location.href = "/order/City"
        });
      }
      var param ={'cityCd':cityCd,'orgSvcPkgNoMa':orgSvcPkgNoMa}// 机构入参
      let response = api.queryOrgListByCity(param);// 调接口查询体检机构
      response.then(function(res){
        var data=res.data;
        if (data.status=='1'){ // 访问成功
          data = data.data;
         $jquery(".mui_content_bj").css({'display':'block'}); // 机构模块展开           
           for(var i=0,len=data.length;i<len;i++){
//            data[i].imgsrc=that.goverImg[data[i].parentOrgName];// 添加机构logo图标
              data[i].imgsrc=that.goverImg[data[i].parentOrgNo];// 添加机构logo图标 review 20170913 kyy
              
           }
          that.goverInfo = data;
          if(that.cardInfo.Gover){// 修改页面已选机构 样式添加
            var sGover = that.cardInfo.Gover;
            that.collect = sGover;
            var sid = sGover.parentOrgNo;
            setTimeout(function(){
               var obj=$jquery("#"+sid).find('img');
                $jquery("#"+sid).find('img').addClass('imgCheck');
                $jquery("#"+sid).find('span').addClass('txtCheck');
            },'100');
          }
        }else{
          if(data.message){
            Toast({message:data.message,duration: 1000,className:'mToast'})
          }else{
            Toast({message:'发生内部错误',duration: 1000,className:'mToast'})
          }
        }
          
      })
      .catch(function(err){console.log(err);});
    },
   // 选择机构
    checkGover: function(item){
      let that = this;
      var collect =that.collect; // 机构数据集合
      if(that.cardInfo.Gover){// 修改页面重新选择机构后，置空套餐、站点、预约时间
        var sGover = that.cardInfo.Gover;
        var collect = {"orgSvcPkgNoMa":"","parentOrgName":"","parentOrgNo":"","orgSvcPkgNameAs":"","orgSvcPkgNoAs":"","orgName":"","orgNo":""};
        collect.parentOrgName = sGover.parentOrgName;
        collect.parentOrgNo = sGover.parentOrgNo;
        that.collect = collect;
        that.cardInfo.myTime={};
      }
      var id = item.parentOrgNo;// 根据id设置选中机构样式
      $jquery('.JGlogo').find('img').removeClass('imgCheck');
      $jquery('.JGlogo').find('span').removeClass('txtCheck');
      $jquery("#"+id).find('img').addClass('imgCheck');
      $jquery("#"+id).find('span').addClass('txtCheck');
      
      collect.parentOrgName=item.parentOrgName;
      collect.parentOrgNo=item.parentOrgNo;
      
      if(collect.parentOrgNo){// 展开套餐并填充套餐模块数据
            that.isCheck5=true;
            this.fillMeal ();
        }
      that.collect = collect;
      setTimeout(function(){that.isCheck1=false;that.isCheck2=true;},'100');     
    },
   // 填充套餐
    fillMeal: function () { // 性别套餐js
      let that =this;
      var card = that.cardInfo;
      var collect = that.collect;
      if(collect == null){// 判断机构是否已选择
        MessageBox({
          title: '温馨提示',
          message: '您还没有确定体检机构，去选体检机构吧！',
          showCancelButton: true,
          showCancelButton:false
        })
      }
      // 套餐入参
      var param = {"cityCd":card.City.cityCd,"orgSvcPkgNoMa":card.orgSvcPkgNoMa,"parentOrgNo":that.collect.parentOrgNo}
        let response = api.getOrgComboDetail(param);// 调接口填充套餐模块
        response.then(function(res){
        var data=res.data;
        if(data.status=='1'){ // 请求成功数据处理
          data = data.data;
          var len=data.length
          if(len>0){
            $jquery(".mealbox").show();
            that.mealInfo = data;
            var textlen,textid;
            for(var i=0,len = data.length;i<len;i++){
              textlen = data[i].orgSvcPkgNameAs.length;
              textid = data[i].orgSvcPkgNoAs;
            }
            if(that.cardInfo.Gover){// 修改页面设置选中样式
              var sGover = that.cardInfo.Gover;
              if(that.collect.orgSvcPkgNameAs){
                var mid = sGover.orgSvcPkgNoAs;
                setTimeout(function(){$jquery("#"+mid).find('.ordertitle').addClass('check')},'10');
              }
            }
          }else{
            Toast({ message: '没有对应的套餐信息',duration: 1000,className:'mToast'})
          }
        }else{ // 显示报错信息
          if(data.message){
            Toast({message:data.message,duration: 1000,className:'mToast'})
          }else{
            Toast({message:'发生内部错误',duration: 1000,className:'mToast'})
          }
        }
      })
      .catch(function(err){console.log(err)});
    },
    // 查看更多套餐详情
    seeMore: function () {
      MessageBox({
        title: '基础综合套餐',
        message: '<img src="../../../../static/img/mealChartImg.png" alt="1" style="width:95%; height:300px;">',
        showCancelButton: false
      });
    },
    // 选择套餐
    checkMeal:function(item){
      let that = this;
      var id = item.orgSvcPkgNoAs;
      var name = item.orgSvcPkgNameAs;
      $jquery("li").find('.ordertitle').removeClass('check');
      $jquery("#"+id).find('.ordertitle').addClass('check');// 设置选中样式
      var collect = that.collect;
          collect.orgSvcPkgNameAs = name
          collect.orgSvcPkgNoAs = id
      if(collect.orgSvcPkgNameAs){ //套餐选择完成  打开站点列表
            that.isCheck6=true
            this.fillStation ();
        }
      if(that.cardInfo.Gover){ // 二次选择或修改套餐
        if(that.collect.orgSvcPkgNameAs){
          that.cardInfo.myTime={};
          that.collect.orgName = "";
          that.collect.orgNo = "";
        }
      }
      setTimeout(function(){that.checkAction(2);that.isCheck3=true;},'100'); 
    },
    // 填充站点
    fillStation: function () {
      let that =this;
      var card = that.cardInfo;
      var collect =that.collect;
      var orgSvcPkgNoAs=collect.orgSvcPkgNoAs;
      var parentOrgNo = collect.parentOrgNo;
      // 站点入参
      var param ={"cityCd": card.City.cityCd,"orgSvcPkgNoAs":orgSvcPkgNoAs,"parentOrgNo":parentOrgNo, "latiude":card.City.latiude,"longitude":card.City.longitude}
      let response = api.queryMedicalCenterListByOrg(param);// 调接口填充站点模块数据
      response.then(function(res){
      var data=res.data;
       if(data.status=='1'){ // 请求成功数据处理
          data = data.data;
          that.station = data;
          that.stationLen = data.length;
        }else{ // 显示报错信息
          if(data.message){
            Toast({message:data.message,duration: 1000,className:'mToast'})
          }else{
            Toast({message:'发生内部错误',duration: 1000,className:'mToast'})
          }
        }
      })
      .catch(function(err){console.log(err); });
    },
    // 选择站点
    checkStation:function(item){ //选择站点
      let that = this;
      var id = item.orgNo;// 根据id设置选中样式
      $jquery("#"+id).addClass('check');
      $jquery("#"+id).find('a').addClass('check');
      var collect = that.collect;
          collect.orgName = item.orgName;
          collect.orgNo = item.orgNo;
          collect.orgAddress = item.orgAddress;
          collect.orgContactFixPhone = item.orgContactFixPhone;
      if(collect.orgName){
            that.isCheck7=true
        }
      if(that.pageTag=='mod'){
        that.witch = 'station'
      }
      if(that.cardInfo.Gover){
        that.cardInfo.myTime={};
      }
      setTimeout(function(){that.isCheck3=false;},'100'); 
      if(that.pageTag!="mod"){
        that.pageTag = "new"
      }
    },
    // 点击操作
    checkAction: function (cur) {
      if (cur == 1) { // 选体检机构
        this.isCheck1 = !this.isCheck1
        this.fillGover ();
          
      } else if (cur == 2) { // 选择套餐
        this.isCheck2 = !this.isCheck2
        this.fillMeal ();
        
      } else if (cur == 3) { // 选体检站点
        this.isCheck3 = !this.isCheck3
        this.fillStation ();
        
      } else if (cur == 4) { // 选体检站点
        this.isMeal1 = !this.isMeal1
      } else if (cur == 5) { // 选体检站点
        this.isMeal2 = !this.isMeal2
      } else if (cur == 6) { // 选体检站点
        this.isMeal3 = !this.isMeal3
      }
    },
    // 套餐title折叠按钮展开
    mealAction: function (id){
      var i=0;
      $jquery("#"+id).find('i').toggleClass('iconCheck')
      $jquery("#"+id).find(".iteminfo").toggle();
    },
    // 站点展示更多折叠展开
    showMore: function (){
      $jquery('.showAll').toggle();
      $jquery(".clickmore").toggle();
      $jquery(".shouqi").toggle();
    },
    // 页面跳转到城市页面
    backAction: function(){
      window.location.href='#/order/City'
    },
    // 修改页面取消跳转
    cancelBack:function(){
      window.location.href='#/order/orderMsg'
    },
    // 验证体检机构、套餐、站点是否已选择
    valiGover:function(){
      if(this.collect.parentOrgNo == '' || this.collect.parentOrgName ==''){
        Toast({ message:'请选择体检机构',duration: 1000,className:'mToast'})
        return  false;
      }else if(this.collect.orgSvcPkgNoAs == '' || this.collect.orgSvcPkgNameAs ==''){
        Toast({ message:'请选择体检套餐',duration: 1000,className:'mToast'})
        return false;
      }else if(this.collect.orgNo == '' || this.collect.orgName ==''){
        Toast({ message:'请选择体检站点',duration: 1000,className:'mToast'})
        return false;
      }else{
        return true;
      }
    },
    // 下一步操作
    nextAction: function(){
      var isNext = this.valiGover();
      if(isNext){
        this.cardInfo.Gover=this.collect;
        sessionStorage.setItem('cardInfo',JSON.stringify(this.cardInfo));// 存机构信息session
        if(this.pageTag == "mod"){// 修改页面跳转
          window.location.href='#/order/dateCheck?mod&'+this.witch;
        }else{// 初始选择后跳转到下一页面
          window.location.href='#/order/dateCheck'
        }
      }else{
        Toast({ message:'请确认是否已选择体检机构、体检套餐、体检站点',duration: 1000,className:'mToast'})
      }
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.govermain{width:100%;padding-bottom:3rem}
.osGover{width:100%;height:calc(100% - 2.77rem)}
.iteminfo{display:none}
.morebtn{text-align:center;color:#333}
.shouqi{display:none}
.showAll{display:none}
.clickmore:after{content:'';display:inline-block;margin-left:.2rem;margin-bottom:.1rem;width:.67rem;height:.389rem;background:url(../../assets/images/order/ss01.png) no-repeat 0 0;background-size:.67rem .389rem}
.shouqi:after{content:'';display:inline-block;margin-left:.2rem;margin-bottom:.1rem;width:.67rem;height:.389rem;background:url(../../assets/images/order/ss02.png) no-repeat 0 0;background-size:.67rem .389rem}
.body{height:calc(100%-2.77rem)}
.mint-popup{position:fixed;background:#fff;width:90%;height:90%;border-radius:3px}
  /*套餐详情弹层*/
.mealImg{width:100%;height:100%}
#mcover{position:fixed;top:0;left:0;z-index:20000;display:none;width:100%;height:100%;background:rgba(0,0,0,.8);background-size:100% 100%}
#mcover img{position:fixed;top:0;right:0;z-index:999;width:100%;height:100%}
  /*套餐详情弹层========end=========*/
.mealboxitems .ordertitle.check{background:url(../../assets/images/order/icond02.png) no-repeat 0 0;background-size:1rem;background-position:0 .75rem}
.icon{display:inline-block;position:absolute;right:0;top:0;width:18px;height:36px;background:url(../../assets/images/order/ss01.png) no-repeat 0 0;background-position:right .9rem;background-size:.67rem .389rem}
.iconCheck{background:url(../../assets/images/order/ss02.png) no-repeat 0 0;background-position:right .9rem;background-size:.67rem .38rem}
.Meal{line-height:2.5rem;min-height:2.5rem;overflow:hidden;border-bottom:1px solid #f1f1f1;position:relative}
.more{display:block;height:2.5rem;margin-top:1rem;line-height:2.5rem}
.mToast{font-size:.72rem;width:100%}
.listitem{height:2.5rem;line-height:2.5rem;border-top:1px solid #f1f1f1;overflow:hidden;font-size:.72rem}
.itemleft{float:left;color:#333}
.itemright{float:right;color:#999}
.stationlist{margin:0}
  /*站点样式====end============*/
.line{display:inline-block;position:absolute;z-index:0;top:1.123rem;left:12%;width:38%!important;height:1px;background-color:#5c9edc}
.detailcontent{text-overflow:ellipsis}
.mealitems .item a.check{display:block;font-size:.72rem;color:#4aaa3f}
.mealitems .item{font-size:.72rem;color:#5c9edc}
.lasttip{padding:0;width:100%;line-height:1.2rem;color:#999}
.mealboxitems{background-color:#f8f8f8;padding:0 .67rem}
.mint-popup{position:fixed;background:#fff;width:92%;border-radius:3px;padding-left:1.16rem}
.morebox{width:92%}
    /*套餐列表===start====*/
.mealitems .item a{display:block;font-size:.72rem;color:#333}
.mealitems .item a.check{display:block;font-size:.72rem;color:#4aaa3f}
.mealitems .item:last-child{border:0}
.mealboxitems .sonitems{display:block;padding-top:.67rem;position:relative;font-size:.72rem;color:#333}
.mealboxitems .ordertitle.check{background:url(../../assets/images/order/icond02.png) no-repeat 0 0;background-size:1rem;background-position:0 .2rem}
.more{text-decoration:underline;color:#5c9edc!important;font-size:.67rem}
   /*套餐列表===end====*/
  /*跳转按钮==start===*/
.c_stepact{font-size:1rem;height:2.77rem;line-height:2.77rem;width:100%;text-align:right;background-color:#FFF;position:fixed;z-index:10;right:0;bottom:0}
.backstep{color:#666}
  /*跳转按钮==end===*/
.mui_content_bj{display:none;background:#fff;width:100%;height:auto;padding-top:1.5rem;border-top:solid 1px #ebebeb}
.clear{clear:both}
.JGlogoArea{width:100%}
.JGlogo{width:100%;padding:0;margin:0}
.JGlogo li{width:46%;padding:0 1rem;float:left;font-size:.72rem;text-align:center;line-height:31px;overflow:hidden}
.JGlogo li img{border:solid 1px #ebebeb;box-sizing:border-box}
.imgCheck{border:solid 1px #5c9edc!important}
.txtCheck{color:#5c9edc!important}
.JGlogo li:nth-child(1){float:left;margin-right:1.2rem}
.JGlogo li:nth-child(3){float:left;margin-right:1.2rem}
.JGlogo li:nth-child(2){float:right}
.JGlogo li:nth-child(4){float:right}
.JGlogo li span{display:inline-block;width:100%;float:left;color:#333}
</style>
