<template>
  <div>
    <div class="runpage">
    	<img src="../../static/img/rundevPage_02.png" />
    	<span>
    		<router-link to="/meal/home" class="linkBlock"></router-link>
    		<!--<div class="linkBlock" @click="topage"> </div>-->
      </span>
    </div>
  </div>
</template>
<script>
//import {getUrl} from '../assets/js/common.js'
import {share_seed} from '../assets/js/wxConfig.js'
import config from '../api/config.js'
export default {
  beforeCreate () {
    document.title = '青春版体检套餐';
  },
  mounted: function () {
  	share_seed();
//		getUrl();
 	}
}
</script>
<style scoped>
#container{
  background: #ffffff !important;
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
.runpage{
  width: 100%;
  position: relative;
}
.runpage span{
  width: 68%;
  height: 60px;
  display: inline-block;
  position: absolute;
  bottom: 33px;
  left: 17%; 
}
.linkBlock{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
