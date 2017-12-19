<template>
  <div class="hello">
    <h1> test</h1>
    <h2> <router-link to="/test/getcurrLocation" class="linkBlock">getcurrLocation</router-link></h2>
    <h2> <router-link to="/test/uploadImg" class="linkBlock">uploadImg</router-link></h2>
    <h2> <router-link to="/test/testInterface" class="linkBlock">testInterface</router-link></h2>
    <h2> <router-link to="/common/errorPage" class="linkBlock">errorPage 错误页面</router-link></h2>
    <h2> <router-link to="/test/testCloseWX" class="linkBlock">testCloseWX </router-link></h2>
    
    
    <h1> 预约 --</h1>
    <h2> <router-link to="/order/Place" class="linkBlock">Place</router-link></h2>
    <h2> <router-link to="/order/checkTime" class="linkBlock">checkTime</router-link></h2>
    <h2> <router-link to="/order/checkStation" class="linkBlock">checkStation</router-link></h2>
    <h2> <router-link to="/order/toOrder" class="linkBlock">toOrder</router-link></h2>
    
     <h1>评价 --</h1>
     <h2> <router-link to="/user/orderDetail" class="linkBlock">orderDetail</router-link></h2>
    <!--<h2> <router-link to="/user/evalDetail" class="linkBlock">evalDetail</router-link></h2>-->
    <h2> <router-link to="/user/evalFill" class="linkBlock">evalFill</router-link></h2>
    <h2> <router-link to="/user/shopDetail" class="linkBlock">shopDetail 门店详情</router-link></h2>
    <h2> <router-link to="/user/teethImg" class="linkBlock">teethImg 口腔全景</router-link></h2>
    <h2> <router-link to="/user/unorder" class="linkBlock">unorder 爽约</router-link></h2>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  height: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
