<template>
  <div>
    <div class="runpage">
    	<span>
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
    document.title = '接口调通测试';//包括 城市 经度 维度
  },
  mounted: function () {
  	console.log("testInterface.vue  testInterface.vue testInterface.vue ");
  	//this.pageInit();
  },
  methods: {
    pageInit: function () {
    	var that=this;
      var param = {
		  "cityCode": "527",
		  "districtCode": "",
		  "hospitalName": "",
		  "provCode": ""
			};
      console.log(param);
      var response = api.getOrgList(param);
      response.then(function(res){
           console.log(res)
        var data=res.data;
        if(data.status=='1'){
        	console.log(data)
        }else{
          console.log(data);
        }
      }).catch(function(err){
          console.log(err);
      });
    }
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
