<template>
  <div>
    <div class="mealSearch_bj">
        <span @click="toMealInfo(1)"></span>
        <span @click="toMealInfo(2)"></span>
        <span @click="toMealInfo(3)"></span>
    </div>
  </div>
</template>
<script>
import {share_seed} from '../../../assets/js/wxConfig.js'
export default {
  data () {
    return {
    }
  },
  beforeCreate(){
    document.title = '套餐查询';
  },
  mounted: function () {
    window.scrollTo(0,0);
  },
  methods: {
    toMealInfo: function (type) {
      var mealSearchData = {};
      if (type == 1) {
        mealSearchData.type = "男性";
      }else if (type == 2) {
        mealSearchData.type = "女未";
      }else if (type == 3) {
        mealSearchData.type = "女已";
      }
      sessionStorage.setItem('mealSearchData',JSON.stringify(mealSearchData));  
      window.location.href = "#/meal/mealSearch/mealInfo";
    }
  }
}
</script>
<style scoped>
/*
*font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
*/
.mealSearch_bj{
  width: 100%;
  height: 600px;
  padding-top: 13px;
  padding: 0 4%;
  background: #ffffff url('../../../../static/img/mealsbj.png') no-repeat center center;
  background-size: 100% 100%;
}
  .mealSearch_bj span:nth-child(1){
    display: inline-block;
    width: 100%;
    height: 24%;
    /*border: solid 1px red;*/
    margin-top: 34%;
  }
  .mealSearch_bj span:nth-child(2){
    display: inline-block;
    width: 100%;
    height: 24%;
    /*border: solid 1px red;*/
    margin-top: 11%;
  }
  .mealSearch_bj span:nth-child(3){
    display: inline-block;
    width: 100%;
    height: 24%;
    /*border: solid 1px red;*/
    margin-top: 11%;
  }
  /*.mealSearch_bj span a{
    width: 100%;
    height: 100%;
  }*/
.btnBlock{
  width: 100%;
  height: 100%;
  display: inline-block;
  /*background-color: red;*/
}
</style>
