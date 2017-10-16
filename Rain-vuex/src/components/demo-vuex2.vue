<template>
    <div>
        {{msg}}
    </div>
</template>
<style scoped>

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
