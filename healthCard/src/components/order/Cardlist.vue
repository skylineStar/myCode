<!--@wyz
体检卡列表页面：1、展示体检卡信息；2、短信、微信分享体检卡信息；3、激活使用体检卡
最后修改时间：2017.9.8
-->
<template>
  <div class="cardlist">
    <div class="body">
      <ul class="listhead">
        <li class="listbtn btn-d" @click='searchModal.cardState = true'><a href="javascript:void(0)" id='cardState'>体检卡状态</a></li>
        <li class="listbtn btn-r" @click='searchModal.payDate = true'><a href="javascript:void(0)" id="payDate">购买时间</a></li>
        <li class="listbtn btn-r" @click='searchModal.keyword = true'><a href="javascript:void(0)" id='keyword'>关键词</a></li>
        <li class="surebtn"><a href="javascript:void(0);" @click='toSearchCard'>搜索</a></li>
      </ul>
      <div class="listbody" v-if='status'>
        <!--loadMore-->
        <mt-loadmore :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  bottomPullText='上拉加载'>
          <div v-if='status == 1' v-for = '(item,index) in items' >
            <div  v-for = 'state in stateAble' v-if='items[index].state== state'>
                <div class='touse dotted'  @click = 'touseCard(items[index])'>
                  <span  v-if='items[index].sDays < 8 && state=="1"' class='newcard'>新</span>
                  <div class="tolist row1">
                    <div class='lineblock rl'><h5>卡名称：{{items[index].cardName}}</h5><p>有效日期：{{items[index].startTime}}-{{items[index].endTime}}</p></div>
                    <div class='lineblock rt'><span class='cardstatus'>未预约</span></div>
                  </div>
                  <div class="tolist row2">
                    <div class='lineblock rl'><p>卡号：{{items[index].cardNo}}</p> <p>密码：{{items[index].cardPassword}}</p></div>
                    <div class='lineblock rt'>
                      <p class='icond'>预约体检</p>
                      <p class='icond1' @click.stop ='send(items[index])'>转赠卡券</p>
                    </div>
                  </div>
                  <div class="row3">
                    <p>注：体检卡有效期，指的是实际可以去体检机构体检的日期， 请提前做好预约，避免体检卡 </p>
                  </div>
                </div>
            </div>
            <!--失效卡-->
            <div v-if='items[index].state==4'>
              <div class='notuse dotted disablebg' @click = 'touseCard(items[index])'>
                <div class="tolist row1">
                  <div class='lineblock rl'><h5>卡名称：{{items[index].cardName}}</h5><p>有效日期：{{items[index].startTime}}-{{items[index].endTime}}</p></div>
                  <div class='lineblock rt'><span class='cardstatus'>已失效</span></div>
                </div>
                <div class="tolist row2">
                  <div class='lineblock rl'><p>卡号：{{items[index].cardNo}}</p> <p>密码：{{items[index].cardPassword}}</p></div>
                </div>
                <div class="row3">
                  <p>注：体检卡有效期，指的是实际可以去体检机构体检的日期， 请提前做好预约，避免体检卡 </p>
                </div>
              </div>
            </div>
          <!--失效卡-->
          <div v-for = 'state in stateUsed' v-if='items[index].state==state'>
              <div class='notuse dotted usedbg' @click = 'touseCard(items[index])'>
                <div class="tolist row1">
                  <div class='lineblock rl'><h5>卡名称：{{items[index].cardName}}</h5><p>有效日期：{{items[index].startTime}}-{{items[index].endTime}}</p></div>
                  <div class='lineblock rt'><span class='cardstatus'>已使用</span></div>
                </div>
                <div class="tolist row2">
                  <div class='lineblock rl'><p>卡号：{{items[index].cardNo}}</p> <p>密码：{{items[index].cardPassword}}</p></div>
                </div>
                <div class="row3">
                  <p>注：体检卡有效期，指的是实际可以去体检机构体检的日期， 请提前做好预约，避免体检卡 </p>
                </div>
              </div>
          </div>
          <!--卡列表渲染================end=====-->
          </div>
          <!--上拉加载样式配置-->
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><mt-spinner :size='20' color="#26a2ff"type="fading-circle"></mt-spinner></span><!--↓-->
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
          <div slot = 'bottom'class="mint-loadmore-bottom"><span class="mint-loadmore-text">上拉加载</span></div>
        </mt-loadmore>
        <div v-if='status == 3' class='whiteList'><img src="../../assets/images/order/searchbg.png"/><span class='whitetext'>没找到相关的匹配结果，请重试</span></div>
      </div>
    </div>
    <!--转增卡选项弹出层===start===-->
    <mt-popup v-model="sendCard" position="bottom">
      <div class='sharebox'>
        <div class='header'>分享</div>
        <ul class='share'>
          <li class='wx' @click.active="toshare"><img src="../../assets/images/order/shareicon.png" />
            <span class="txt">&nbsp;&nbsp;微 信&nbsp;&nbsp;</span></li>
          <li class='msg' @click="toSendmsg"><img src="../../assets/images/order/shareicon01.png" />
            <span class="txt">&nbsp;&nbsp;信 息&nbsp;&nbsp;</span></li>
        </ul>
        <div class='footer' @click='sendCard = false'>取消</div>
      </div>
    </mt-popup>
    <!--转增卡选项弹出层====end===-->
    <!--发送短信弹出层===start====-->
    <mt-popup v-model="isSendMsg" position="middle">
      <div v-if='isSendMsg'>
      <div class="mint-msgbox-header"><div class="s_title">短信分享</div></div>
      <div class='msgbody'>
        <div class="phoneBox">
          <span class='label'>联系电话</span>
          <input  type="tel" v-model="sendPhoneNum" placeholder="请输入手机号" class='sendphone' @blur="phoneBlur()"/>
        </div>
        <div class='messageBox'>
        	<span class='msgtitle'>短信内容</span>
        	<div class='contentbox'>
        	  <div class='msg'>{{cardInfo.share.cardName}}</div>
            <div class='msg'>卡号:{{cardInfo.share.cardNo}}<br/>密码:{{cardInfo.share.cardPassword}}<br/>有效期:{{cardInfo.share.startTime}}-{{cardInfo.share.endTime}}<br/></div>
        	</div>
        	
        </div>
      </div>
      <div class="mint-msgbox-btns"><button class="mint-msgbox-btn mint-msgbox-cancel " @click='isSendMsg = false' >取消</button> <button class="mint-msgbox-btn mint-msgbox-confirm " @click='sendMsgAction'>确定</button></div>
    </div>
    </mt-popup>
    <!--发送短信弹出层===end====-->
    <!--卡状态弹出层-->
    <mt-popup v-model="searchModal.cardState" position="middle">
      <mt-picker :slots="cardslots" @change="onCardstateChange">

      </mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="cancel(1)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="checkSearchInfo(1)">确定</mt-button>
      </div>
    </mt-popup>
    <!--卡状态弹出层===end===-->
    <!--时间弹出层-->
    <mt-popup v-model="searchModal.payDate" position="middle">
      <mt-picker :slots="timeslots" @change="onPaydateChange"></mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="cancel(2)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="checkSearchInfo(2)">确定</mt-button>
      </div>

    </mt-popup>
    <!--时间弹出层===end===-->
    <!--关键词弹出层-->
    <mt-popup v-model="searchModal.keyword" position="middle">
      <mt-picker :slots="keywordslots" @change="onKeywordChange"></mt-picker>
      <div class='btngroup'>
        <mt-button type='default' size='normal' @click.native="cancel(3)">取消</mt-button>
        <mt-button type='primary' size='normal' @click.native="checkSearchInfo(3)">确定</mt-button>
      </div>
    </mt-popup>
    <!--关键词弹出层===end===-->
  </div>
</template>
<script>
  import $jquery from 'jquery'
  import {tkWX} from '../../assets/js/wxConfig.js'
  import API from '../../api/API'
  const api = new API();
  import { Indicator,Toast,MessageBox,Loadmore } from 'mint-ui'
  import {hideaddress} from '../../assets/js/BaseJS.js'
  export default {
    name: 'cardlist',
    data() {
      return {
        topStatus: '',// loadmore状态
        allLoaded:false,// loadmore是否加载
        pageIndex:0,// 当前页码
        results:[],// 查询结果数组
        status:'',// 查询结果状态
        openid:'',// openid
        items:[],// 页面展示数组
        sendCard: false,// 转赠卡弹层是否显示
        isSendMsg: false,// 短信转赠是否显示
        sendPhoneNum:'',// 发短信手机
        stateAble:["1","5","7"],// 可用卡数组
        stateUsed:["2","3","6"],// 已使用卡数组
        cardInfo:{},// 卡信息对象
        searchModal:{cardState:false,payDate:false,keyword:false},// 搜索弹出层是否显示
        searchInfo:{cardState:'',payDate:'',keyword:'',stateValue:'',payValue:'',keywordval:""},// 搜索信息
        keywordslots: [{flex: 1,values: ["默认",'基础','肿瘤'],className: 'keywordslots',textAlign: 'center'}],// 关键词配置
        timeslots: [{flex: 1,values: ["默认",'一周内', '三个月内', '一年以内', '一年或更久'],className: 'timeslots',textAlign: 'center'}],//购买时间配置
        cardslots: [{flex: 1,values: ["默认",'未预约', '已使用', '已失效'],className: 'cardslots',textAlign: 'center'}],// 卡状态配置
        sendflag:false,// 手机号验证结果
      }
    },
    beforeCreate () {document.title = '我的体检卡'},
    created() {
      var uInfo = JSON.parse(sessionStorage.getItem('uInfo'));
        this.openid = uInfo.id;
    },
    mounted(){
    	hideaddress(); // 隐藏微信分享菜单
    	var param={"openid":this.openid,"payDate":"","keyword":"","state":[]}
      this.fillInfo (param);
    },
    methods: {
      // 填充页面
      fillInfo (param) {
        let that = this;
        that.allLoaded = false;
        that.pageIndex = 0;
        let response = api.myCardHealthExamination(param); // 调后台方法查卡列表数据
        response.then(function(res){
          var data=res.data;
          that.status = data.status; // 请求返回的状态
          if(data.status=='1'){
            var list=data.data;
//          console.log(list);
            // 获取卡购买天数
            for(var i=0,len=list.length;i<len;i++){
              list[i].sDays = that.compareStart(list[i].payDate.split(" ")[0]); // 新字显示判断条件
            }
            that.results = that.sliceArr(list, 5) // 分割数据
            that.items= that.results[0] // 页面展示分割后的第一条数据
          }else{
            if(data.message){  // 未成功返回数据Toast提示
              Toast({message:data.message})
              that.status = data.status;
            }else{
              Toast({message:'发生内部错误'})
            }
          }
        }).catch(function(err){console.log(err);});
      },
      // 分割大数组
      sliceArr:function(array, size){
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
        }
        return result;
      },
      // 下拉刷新样式设置
      handleTopChange(status) {this.topStatus = status;},
      // 下拉刷新方法
      loadTop:function(){
        var param={"openid":this.openid,"payDate":"","keyword":"","state":[]}
        this.fillInfo (param);
        this.$refs.loadmore.onTopLoaded();},
      // 上拉加载方法
      loadBottom:function(){
        if(this.results.length ===1){// 若数据已全部获取完毕
          Toast({message:'没有更多了',duration: 1000});
        }else{
          if(this.pageIndex == this.results.length-1){this.allLoaded = true;Toast({message:'没有更多了',duration: 1000});}
          this.items.push.apply(this.items,this.results[++this.pageIndex]);// 页面追加展示数据
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      // 转赠卡券
      send: function(item){
        var cardInfo = this.cardInfo;
            cardInfo.share =item;
            sessionStorage.setItem('cardInfo',JSON.stringify(cardInfo))
        this.sendCard = true;
      },
      // 激活所选卡片
      touseCard:function(item){//去使用体检卡
        var state = item.state
        var r1 = $jquery.inArray(state,this.stateUsed);
        var r2 = $jquery.inArray(state,this.stateAble);
        if(r1 > -1){Toast({ message: '该卡片已使用',duration: 1000,className:'mToast'});}
        if(state ==4){Toast({ message: '该卡片已失效',duration: 1000,className:'mToast'});}
        if(r2 > -1){
          var param = {"medicalCardNo":item.cardNo,"medicalcardPwd":item.cardPassword}
          let that =this;
          let response = api.activateTJCard(param)
          response.then(function(res){
          var data=res.data;
          if(data.status=='1'){
            var s_cardInfo =that.cardInfo;
            s_cardInfo= data.data[0]; //返回数据
            s_cardInfo.medicalCardNo = item.cardNo;//选中卡号
            s_cardInfo.medicalcardPwd = item.cardPassword;//选中密码
            s_cardInfo.startTime = item.startTime; // 卡有效期开始时间
            s_cardInfo.endTime = item.endTime; // 卡有效期结束时间
            s_cardInfo.isCardUser = '1'; // 是否是持卡人
            //设置cardInfo的session
            sessionStorage.setItem('cardInfo',JSON.stringify(s_cardInfo))
            setTimeout(function(){ window.location.href = '#/order/TestStart'},'100')
          }else{
            if(data.message){
              Toast({message:data.message})
            }else{Toast({message:'发生内部错误'});}
          }
        })
        .catch(function(err){console.log(err)});
       }
      },
      // 发送短信方法
      toSendmsg:function(){this.sendCard = false;this.isSendMsg = true;},
      sendMsgAction:function(){
        var cardInfo = JSON.parse(sessionStorage.getItem('cardInfo'));
        let that = this;
            that.phoneBlur()
        var param ={"phone": that.sendPhoneNum,"productName":cardInfo.share.cardName,"startDate":cardInfo.share.startTime,"endDate":cardInfo.share.endTime,"cardNo":cardInfo.share.cardNo,"password":cardInfo.share.cardPassword};
        if(that.sendflag){ // 验证手机号码状态
          that.isSendMsg = false; // 短信分享弹出层关闭
          let response = api.shareCard(param); // 调后台发短信接口
          response.then(function(res){
            var data=res.data;
            if(data.status=='1'){
              data = data.data
              Toast({message: '短信发送成功'})
            }else{
              if(data.message){
                Toast({message:data.message})
              }else{
                Toast({message:'发生内部错误'})
              }
            }
          }).catch(function(err){console.log(err);});
        }
      },
      // 去分享页面
      toshare: function() { this.sendCard = false; window.location.href = "#/order/cardShare" },
      // 卡状态picker
      onCardstateChange(picker, values){
        picker.setSlotValues(1, values[0])
        var arrCardState = {'默认':[],'未预约':this.stateAble,'已使用':this.stateUsed,'已失效':['4']}
        this.searchInfo.stateValue = arrCardState[values[0]]
        this.searchInfo.cardState = values[0]
      },
      // 支付时间picker
      onPaydateChange(picker, values){
        picker.setSlotValues(1, values[0])
        var arrpayDate = {'默认':'','一周内':'0', '三个月内':'1', '一年以内':'2', '一年或更久':'3'}
         this.searchInfo.payValue = arrpayDate[values[0]]
        this.searchInfo.payDate = values[0]
      },
      // 关键字picker
      onKeywordChange(picker, values) {
        picker.setSlotValues(1, values[0])
        this.searchInfo.keyword = values[0]
        var arrpayDate = {'默认':'','基础':'基础', '男性':'男', '女性':'女', '肿瘤':'肿瘤'}
        this.searchInfo.keywordval = arrpayDate[values[0]]
      },
      // 选择搜索条件
      checkSearchInfo: function (index) {
        if(index===1){ this.searchModal.cardState = false; $jquery("#cardState").html(this.searchInfo.cardState)}
        if(index===2){ this.searchModal.payDate = false; $jquery("#payDate").html(this.searchInfo.payDate)}
        if(index===3){ this.searchModal.keyword = false; $jquery("#keyword").html(this.searchInfo.keyword)}
      },
      // 取消选项
      cancel:function(index){
        if(index===1){this.searchModal.cardState = false}
        if(index===2){this.searchModal.payDate = false  }
        if(index===3){this.searchModal.keyword = false  }
      },
      // 搜索卡片
      toSearchCard:function () {
        var param={"openid":this.openid,"payDate":this.searchInfo.payValue,"keyword":this.searchInfo.keywordval,"state":this.searchInfo.stateValue}
        this.fillInfo (param);// 调取页面展示方法
      },
      // 验证手机号码
      phoneBlur:function(){
        var phone =this.sendPhoneNum;
        if(phone==""){
          Toast({ message: '请输入您的手机号码',duration: 1000,className:'mToast'})
          $jquery('.phone').addClass('blur');
          return this.sendflag = false;
        }else{
          if(!(/^1[34578]\d{9}$/.test(phone))){ 
              MessageBox({ message: '请输入正确的手机号码'})
              $jquery('.sendphone').addClass('blur');
              return this.sendflag = false; 
          } else{
            this.sendflag = true;
            $jquery('.sendphone').removeClass('blur');
          }
        }
      },
      // 开始有效期比较
      compareStart:function(strDateStart){
        var d= new Date();
        var strSeparator = "."; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;// 相差的天数
        oDate1= strDateStart.split(strSeparator); // 需要比较的日期
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(d.getFullYear(), d.getMonth(), d.getDate());// 当前日期
        iDays = parseInt((strDateE - strDateS) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
        return iDays ;
      },
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/*.cardlist{position: absolute;width: 100%;top: 0;bottom: 0;}*/
.mint-loadmore-top{text-align:center;padding:0 45%;font-size:.72rem;color:#666}
.mint-loadmore-bottom{text-align:center;height:50px;line-height:50px;font-size:.72rem!important;color:#999!important}
.newcard{position:absolute;right:.5rem;top:0;z-index:100;color:red;font-size:.67rem;line-height:21px}
.UserManage{position:relative;height:100%}
.cardentry{background-color:#f8f8f8}
.msgbody{margin-top:15px}
.contentbox{position:relative;top:-10px}
.msg{font-size:.67rem;color:#999}
.msgtitle{color:#666;display:block;width:4rem;background-color:#fff;text-align:center;font-size:.72rem;position:relative;top:-10px;left:.41rem}
.blur{border:1px solid #5c9edc!important}
.s_title{text-align:center;padding-left:0;margin-bottom:0;font-size:16px;color:#333}
.msgbody{padding:0 .83rem}
.label{float:left;font-size:.72rem;color:#333;display:block;height:1.72rem;line-height:1.72rem}
.sendphone{float:right;width:70%;font-size:.72rem;color:#333;height:1.72rem;margin:0}
.phoneBox{padding-top:1.3rem;padding-bottom:1.8rem;border-top:1px solid #DDD;border-bottom:1px solid #DDD;overflow:hidden}
.mint-msgbox-cancel{width:50%;border-right:1px solid #ddd;border-top:1px solid #ddd}
input.inputbtn{width:100%;font-size:.61rem}
.solt1{font-size:.72rem}
  /*搜索菜单===start===*/
.listhead{overflow:hidden;padding:.583rem 0;width:100%;background-color:#EAEAEA}
.listhead li{float:left;height:1.8rem;line-height:1.8rem}
.listbtn{margin-left:.83rem;padding:0 .83rem 0 .22rem;border-radius:3px;background-color:#FFF}
.btn-d{width:25%;background:#FFF url(../../assets/images/order/icons01.png) no-repeat;background-position:91% .65rem;background-size:10px}
.btn-r{width:22%;background:#FFF url(../../assets/images/order/icons01.png) no-repeat;background-position:91% .65rem;background-size:10px}
.listbtn a{color:#a9a9a9;font-size:.667rem}
.surebtn{margin-left:.83rem}
.surebtn a{display:inline-block;color:#5c9edc;padding:0 4px;text-align:center;font-size:.667rem;border-radius:3px}
.surebtn a:active{background-color:#5c9edc;color:#fff;box-sizing:border-box}
  /*搜索菜单===end===*/

  /*有效卡的样式*/
.touse{margin-bottom:.833rem;width:100%;min-height:10.83rem;border-top:1px solid #8ab9e4;border-bottom:1px solid #8ab9e4;background-color:#d9e6f2}
.tolist{margin:0 .611rem;border-bottom:1px #FFF dashed}
.tolist .row1{min-height:3.6rem}
.lineblock{display:inline-block}
p{font-size:.72rem;width:100%;color:#999}
.row1{overflow:hidden;padding:.63rem 0 0 0;min-height:3.6rem;color:#333;font-size:.72rem}
.row1 .rl{float:left;width:84%}
.row1 .rl h5{color:#333;font-size:.78rem}
.row1 .rl p{font-size:.67rem;width:100%;color:#999;margin:0}
.row1 .rt{float:right;height:3rem;color:#7086e4}
.touse .cardstatus{display:inline-block;margin-right:3px;height:3rem;color:#7086e4;line-height:3rem}
.row2{overflow:hidden;padding:.78rem 0;height:3.94rem;font-size:.667rem}
.row2 p{margin:0;color:#333;width:100%}
.row2 .rl{float:left;width:68%}
.row2 .rl p{height:1.2rem;width:100%}
.row2 .rt{height:100%;line-height:1rem}
.row2 .rt p{margin-left:1.16rem;width:100%;padding-left:1.12rem;height:1.5rem;font-size:.72rem}
.row2 .rt p.icond{background:url(../../assets/images/order/icond.png) no-repeat 0 0;background-size:1rem;color:#7086e4}
.row2 .rt p.icond1{background:url(../../assets/images/order/icond01.png) no-repeat 0 0;background-size:1rem;color:#7086e4}
.row2 a{color:#333}
.row3{margin:0 .611rem;padding-top:.63rem}
.row3 p{font-size:.72rem;width:100%;color:#999;font-size:.61rem}
.notuse{margin-bottom:.833rem;width:100%;min-height:10.83rem;border-top:1px solid #d0d0d0;border-bottom:1px solid #d0d0d0;background-color:#dedede}
.notuse p{color:#898989;width:100%}
.cardstatus{color:#898989;width:100%}
.usedbg{background:#dedede url(../../assets/images/order/zz.png) no-repeat 0 0;background-position:76% .83rem;background-size:4.83rem}
.notuse .row1 h5{color:#898989}
.disablebg{background:#dedede url(../../assets/images/order/zz01.png) no-repeat 0 0;background-position:76% .83rem;background-size:4.83rem}
  /*卡列表样式===end====*/
  /*关键词弹出层===start===*/
.mint-popup.mint-popup-middle{width:84%;border-radius:4px}
  /*文字*/
.mt-picker .picker-item.self{height:2.2rem;color:red;font-size:.67rem!important;line-height:2rem}
.picker-item.picker-selected{color:#333;-webkit-transform:translate3d(0,0,0) rotateX(0);transform:translate3d(0,0,0) rotateX(0)}
  /*按钮*/
.btngroup{padding:.8rem}
label.mint-button-text{font-size:.89rem!important}
.mint-button--normal{display:inline-block;margin:.11rem;padding:0 12px;width:46%;height:2.3rem}
.mint-button--default{margin-right:.5rem;border:1px solid #dedede;background-color:#f6f8fa;box-shadow:none;color:#999}
.mint-button--primary{background:linear-gradient(to right,#56b0d8,#6f81e4);color:#fff}
  /*关键词弹出层===end===*/
  /*赠卡弹出层样式*/
.mint-popup-bottom{top:auto;right:auto;bottom:0;left:50%;width:100%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}
.sharebox{width:100%}
.footer,.sharebox .header{width:100%;height:2.58rem;border-bottom:1px solid #ededed;text-align:center;font-size:1rem;line-height:2.58rem}
.sharebox .footer{border-top:1px solid #ededed}
.share{overflow:auto;padding:1.6rem;width:100%}
.share li{float:left;width:50%;font-size:.67rem}
.share img{position:relative;left:37%;display:block;margin-bottom:1.27rem;width:2.6rem}
.share .txt{position:relative;left:37%;width:4rem;text-align:center;color:#333}
  /*赠卡弹出层样式===end===*/
</style>