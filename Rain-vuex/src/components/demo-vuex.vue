<template>
  <div>
    {{name}}
    <button @click="fun">点击改变msg</button>
    <br><br><br><br>
    <button @click="tiao" >demo-vuex2</button>
    <button @click="func">怎么改变msg</button>
    <br><br><br><br>
    msg: {{msg}}
  </div>

</template>
<style scoped>

</style>
<script>
  import {mapGetters, mapActions} from 'vuex';
  export default{
    data(){
      return {
        name: "demo-vuex"
      }
    },
    computed: {...mapGetters(['msg'])
  }
  ,
  methods: {
  ...mapActions(['fun']),
  ...mapActions(['func']),
  tiao:function(){
    window.location='#/demo-vuex2'
  }
  
  }
  }

</script>
