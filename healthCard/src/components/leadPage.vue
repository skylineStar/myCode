<template>
  <div class="leadPage">
    <div class='leadList'>
      <div width="100%" style='position: relative;'><div class='codeimg'><img :src='codeArr[pageIndex]' alt="" /></div><img :src='firstArr[pageIndex]' alt="" /></div>
      <div width="100%"><img src="../../static/img/lead_02.png" alt="" /></div>
      <div width="100%"><img src="../../static/img/lead_03.png" alt="" /></div>
      <div width="100%"><img src="../../static/img/lead_04.png" alt="" /></div>
      <div width="100%"><img :src='listArr[pageIndex]' alt="" /></div>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex:'',
      firstArr:['../../static/img/lead_01.png','../../static/img/lead_01.png','../../static/img/report_01.png','../../static/img/order_01.png'],
      listArr:['../../static/img/lead_05.png','../../static/img/lead_05.png','../../static/img/report_05.png','../../static/img/order_05.png'],
      codeArr:['../../static/img/code_03.png','../../static/img/code_03.png','../../static/img/report_03.png','../../static/img/order_03.png']
    }
  },
  mounted (){
    var url = window.location.href;
    if(url.split('?')[1] != undefined){
      this.pageIndex = url.split('?')[1];
    }
    var pageArr=['购买成功短信链接引导页','取消预约短信链接引导页','体检报告短信链接引导页','预约成功短信链接引导页']
    document.title = pageArr[this.pageIndex]
  },
  methods () {
    
  }
}
</script>

<style scoped>
  /*错误页样式*/
  .leadList{
  display: block;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: #f8f8f8!important;
}
.leadList img{
    display: block;
    margin: auto;
    width: 100%;
  }
.codeimg{
  width: 33.7%;
  height: 106px;
  background-color: #fff;
  position: absolute;
  top: 19.8%;
  left: 33%;
}
.codeimg img{
  display: block;
  margin: auto;
  width: 100%;
}
</style>