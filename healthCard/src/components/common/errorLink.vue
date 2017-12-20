<template>
	<div class="errorPage">
		<!--报错页面=======start===========-->
	    <div  class='errorList' >
	    	<img src="../../../static/img/errorLink.png"/>
	    	<span class='errortext '>该链接已失效</span>
	    	<span class='errortext error2'>请您向您的代理人索要新的链接</span></div>
	    <!--报错页面=============end===========-->
	</div>
</template>
<script>
export default {
  beforeCreate(){
    document.title = '错误页面';
  }
}
</script>

<style scoped>
  /*错误页样式*/
  .errorList.errorPage{
  display: block;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: #f8f8f8!important;
}
.errorList img{
    display: block;
    margin: auto;
    margin-top: 40%;
    width: 42%;
    
  }
.errortext{
  font-size: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
  display: block;
  width: 100%;
  margin: auto;
  margin-top: 2rem;
  vertical-align: middle;
  color: #999;
}
.error2{
	margin-top: 0.2rem;
	margin-bottom: 74%;
}
</style>