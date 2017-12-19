<template>
  <div class="errorPage">
    <!--报错页面=======start===========-->
      <div  class='errorList' >
        <img src="../../assets/images/common/error.png"/>
        <span class='errortext'>页面加载错误，请稍后重试</span>
      </div>
      <!--报错页面=============end===========-->
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name:'errorPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    $(".errorList").height($(window).height())
    console.log($(document).height());
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
  background-color: #F3F3F3;
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
  /*margin-top: 2rem;*/
  vertical-align: bottom;
  color: #666;
}
</style>