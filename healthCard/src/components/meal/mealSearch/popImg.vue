<template>
  <div class="container">
    <img class="popimg" src="../../../../static/img/mealChartImg.png" alt="基础综合套餐">
  </div>
</template>
<script>
import $ from 'jquery'
import {share_seed} from '../../../assets/js/wxConfig.js'
export default {
  name: 'popimg',
  mounted: function () {
    this.pageInit();
  },
  methods: {
    pageInit: function () {
      if (window.location.href.indexOf("popImg") == -1) return;
      $($('meta')[1]).remove();
      $($('meta')[0]).after('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0">');
    }
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.popimg{
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>