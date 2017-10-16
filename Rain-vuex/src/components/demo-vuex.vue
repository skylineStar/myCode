<template>
  <div>
    {{name}}
    <button @click="fun">点击改变msg</button>
    <br>
    <br>
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
  ...mapActions(['fun'])
  }
  }

</script>
