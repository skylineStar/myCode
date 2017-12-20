<!-- 
mealChange
套餐选择-基础套餐（男，已婚女，未婚女）

Author：wuhaoquan
date：2017-06-15
 -->
<template>
  <div id="container">
    <!-- <header class="mui-bar mui-bar-nav" >
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">关爱90后 体检套餐</h1>
    </header> -->
    <div class="mui-content" id="panelArea">
      <ul class="threeBox">
        <li><router-link to="/meal/location" class="linkBlock"></router-link></li>
        <li><router-link to="" class="linkBlock"></router-link></li>
        <li><router-link to="" class="linkBlock"></router-link></li>
      </ul>
    </div>
  </div>
    <!-- <div class="Hello">90后对自己好一点</div>
    <router-link to="Home" type="button" class="mui-btn mui-btn-warning mui-btn-block">你需要一份体检 </router-link>
    <router-link to="/purchase/invoice">link to Invoice</router-link>
    <div>主页</div>
    <router-link to="/user/workdaySearch">link to /user/workdaySearch</router-link> -->
</template>

<script>
import {hideaddress} from '../../assets/js/BaseJS.js'
export default {
  name: 'meal',
  data () {
    return {
      msg: 'meal'
    }
  },
 mounted: function () {
//	hideaddress();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
  background-color: #f8f8f8 !important;
}
.mui-bar{
  background-color: #1c1b20 !important;
}
.mui-title{
  color: #ffffff !important;
}
.mui-icon-back:before, .mui-icon-left-nav:before {
  content: '\E471';
  color: #ffffff !important;
}
.mui-content{
  background: #f8f8f8;
}
/*----*/
#panelArea{
  padding: 0 4%;
  padding-top: 65px;
  padding-bottom: 65px;
}
.threeBox{
  height: auto;
  /*margin-top: 65px;*/
  /*border: solid 1px red;*/
}
  .threeBox li{
    height: auto;
  }
  .threeBox li:nth-child(1){
    height: 158px;
    background: url('../../../static/img/meal1.png');
    background-size: 100% 100%;
  }
  .threeBox li:nth-child(2){
    height: 158px;
    background: url('../../../static/img/meal2.png');
    background-size: 100% 100%;
    margin-top: 25px;
  }
  .threeBox li:nth-child(3){
    height: 158px;
    background: url('../../../static/img/meal3.png');
    background-size: 100% 100%;
    margin-top: 25px;
  }
.linkBlock{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
