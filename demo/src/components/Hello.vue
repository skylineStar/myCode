<template>
  <div class="hello">
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <ul class='router'>
      <li><a href="#/test/mintDemo" target="_blank">mint实例展示</a></li>
      <li><a href="#/test/teeth" target="_blank">teeth项目实例展示</a></li>
      <li><a href="#/test/order" target="_blank">order实例展示</a></li>
      <li><a href="#/test/loadMore" target="_blank">loadMore实例展示</a></li>
      <li><a href="#/test/upLoadImg" target="_blank">upLoadImg实例展示</a></li>
    </ul>
    <div>
      <h4>基于Vue.2X的html5上传图片组件</h4>
      <div style="width: 100%;">
        <uploader :src="upURL"></uploader>
      </div>
    </div>
    <!--<img src="~assets/logo.png">-->
  </div>
</template>

<script>
	import { config_param } from '../assets/js/config_param'
  import uploader from './test/upLoadImg.vue'
  
export default {
  name: 'hello',
  data () {
    return {
      upURL:config_param.base_path+'/webApp/mpform/upload/ecmre'
    }
  },
  components: {
    uploader
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router a{
    color: #000;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 500;
  }
h1, h2 {
  font-weight: normal;
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
