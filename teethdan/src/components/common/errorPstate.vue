<template>
  <div class="errorPage">
    <!--报错页面=======start===========-->
      <div  class='errorList' >
        <img src="../../assets/images/common/errorPstate.png"/>
        <span class='errortext'>{{pStatus}}</span>
      </div>
      <!--报错页面=============end===========-->
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name:'errorPstate',
  data () {
    return {
      pStatus:"系统忙，请稍后尝试"//"未查询到保单信息，请确认保单状态"
    }
  },
  mounted () {
    $(".errorList").height($(window).height())
    this.pageInit();
  },
	methods: {
	  pageInit:function(){
	  	var c_url=window.location.href;
	  	var pStatus=c_url.split('=')[1];
	  	pStatus==1?this.pStatus='您的保单已退保，无法进行预约':"";
   }
  }
}
</script>

<style scoped>
  /*错误页样式*/
  .errorList{
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: #f3f3f3;
}
.errorList img{
    display: block;
    margin: auto;
    margin-top: 40%;
    width: 100%;
  }
.errortext{
  
  font-size: .89rem;
  height: 2.5rem;
  display: block;
  width: 100%;
  margin: auto;
  vertical-align: bottom;
  color: #999;
}
</style>