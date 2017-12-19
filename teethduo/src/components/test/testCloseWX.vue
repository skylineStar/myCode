<template>
  <div>
    <div class="runpage">
    	<span class="back">测试退出微信测试退出微信测试退出微信测试退出微信
      </span>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import API from '../../api/API'
const api = new API();
export default {
  beforeCreate () {
    document.title = '测试退出微信';//包括 城市 经度 维度
  },
  mounted: function () {
  	this.pageInit();
  },
  methods: {
    pageInit: function () {
    	this.back();
    },
    back:function(){
    	var back='close'
			window.onpopstate = function(event) {
				if(back=='close')WeixinJSBridge.call('closeWindow');
	    }
    }
  }
}
</script>
<style scoped>
.back{top: 2rem;}
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
