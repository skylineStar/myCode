<template>
    <div>
      <div class='content'>
        你好<p>{{msg}}</p>
      </div>
        {{msg}}
    </div>
</template>
<style scoped>
  .content{
    width:500px;
    height: 800px;
    background-color: cornflowerblue;
  }
</style>
<script>
  import {mapGetters} from 'vuex';
    export default{
      data(){
        return {}
      },
      computed:{...mapGetters(['msg'])}
    }
</script>
