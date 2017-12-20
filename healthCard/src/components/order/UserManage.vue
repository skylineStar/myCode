<!--@wyz
用户管理页：展示体检卡、预约记录、体检报告等数量；展示微信名及头像
 最后修改时间2017.9.8
-->
<template>
  <div class="UserManage">
      <div class="body">
          <!--更改头像-->
          <div class="user_img manabody" >
            <div class="head_icon"><img :src='user.headImgUrl'/></div>
            <div class="phone">
              <p>{{user.nickName}}</p>
            </div>
          </div> 
          <!--更改头像==end-->
          <!--mint操作列表 -->
          <mt-cell title="我的体检卡" is-link to = '/order/Cardlist'>
            <mt-badge size="small" v-if='cardsNum.myCardNum'>{{cardsNum.myCardNum}}</mt-badge>
            <img slot="icon" src="../../assets/images/order/bgicon_12.jpg" >
          </mt-cell>
          <mt-cell title="我的预约记录" is-link to = '/order/myOrderRecord/myOrders'>
            <mt-badge size="small" v-if='cardsNum.myAppointNum'>{{cardsNum.myAppointNum}}</mt-badge>
            <img slot="icon" src="../../assets/images/order/bgicon_18.jpg" >
          </mt-cell>
          <mt-cell title="我的体检报告" is-link to='/order/myReports/myReports'>
            <mt-badge size="small" v-if='cardsNum.myReportNum'>{{cardsNum.myReportNum}}</mt-badge>
            <img slot="icon" src="../../assets/images/order/bgicon_24.jpg" >
          </mt-cell>
          <!--mint操作列表-->
          <!--操作列表==end-->
          <!--卡密跳转入口-->
          <div class="cardentry">
            <p>如体检卡不是您本人购买，而您拥有准确的体检卡卡号和密码，您也可以在这里进行体检的<a href="#/order/LoginCard">卡密预约</a></p>
          </div>
          <!--卡密跳转入口==end-->
      </div>
    </div>
</template>

<script>
import $jquery from 'jquery'
import config from '../../api/config.js'
import { Indicator,Toast } from 'mint-ui'
import {hideaddress} from '../../assets/js/BaseJS.js'
import API from '../../api/API'
const api = new API();
export default {
  name: 'UserManage',
  data () {
    return {
      user:{headImgUrl:'../../../static/img/order/head.png'},// 头像图片路径
      cardsNum:{} // 展示数据对象
    }
  },
  beforeCreate () {document.title = '体检中心'  },
  created () {
    hideaddress();
    this.fillInfo();
  },
  methods:{
    // 填充页面信息
    fillInfo: function(){
      var that=this;
      var uInfo = JSON.parse(sessionStorage.getItem('uInfo'));
      let response = api.homePageRecordCount({"openid":uInfo.id});// 调接口获取微信头像及数据
      response.then(function(res){
          var data=res.data;
          if(data.status=='1'){
            data=data.data;
            if(data.headImgUrl)that.user.headImgUrl = data.headImgUrl;// 获取微信头像
            if(data.nickName)that.user.nickName = data.nickName; // 获取微信昵称
            sessionStorage.setItem('nickName',data.nickName) // 将微信昵称存入session
            that.cardsNum={"myCardNum":data.myCardNum,"myAppointNum":data.myAppointNum,"myReportNum":data.myReportNum}// 获取展示数据
          }else{
            if(data.message){Toast(data.message)}else{Toast("发生内部错误")}
            }
      }).catch(function(err){console.log('网络异常！') });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manabody{width:100%;background:url(../../assets/images/order/bghead_02.png) no-repeat;background-size:100% 9.05rem}
.user_img{padding-top:1.44rem;width:100%;height:9.05rem}
.head_icon{position:relative;top:0;left:3px;overflow:hidden;margin-bottom:.8rem;margin-left:37.5%;width:20.3%;border-radius:100%;text-align:center}
.head_icon img{width:100%;height:4.33rem}
.phone{width:100%}
.phone p{padding-top:.22rem;width:100%;color:#3f0601;text-align:center;font-size:.83rem}
img{margin-right:.11rem;width:1.11rem;vertical-align:middle}
.mui-table-view-cell{background-color:#f8f8f8}
span.mui-badge{background-color:#ff5300;color:#fff}
/*卡密入口*/
.cardentry{position:fixed;bottom:0}
.cardentry p{margin:0;margin-bottom:10px;padding:0 1rem;width:100%;color:#999;font-size:.61rem}
.cardentry a{color:#007fba;text-decoration:underline}
</style>
