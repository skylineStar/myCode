<template>
  <div class="hello">
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <ul class='router'>
      <li><a href="#/test/mintDemo" target="_self">mint实例展示</a></li>
      <li><a href="#/test/picker" target="_self">picker项目实例展示</a></li>
      <li><a href="#/test/msgBox" target="_self">msgBox实例展示</a></li>
      <li><a href="#/test/loadMore" target="_self">loadMore实例展示</a></li>
      <li><a href="#/test/upLoadImg" target="_self">upLoadImg实例展示</a></li>
      <li><a href="#/test/weUI" target="_self">weUI实例展示</a></li>
      <li><a href="#/test/vRouter" target="_self">vuex实例展示</a></li>
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
h1, h2,h4 {
	padding-left: .89rem;
  font-weight: normal;
  height:2.22rem;
  line-height: 2.22rem;
  background-color: #fafafa;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
	padding-left: .89rem;
	height: 2.22rem;
	line-height: 1.11rem;
  margin:0.27rem 0;
  border-bottom: 0.5px solid #eee;
}

a {
  color: #42b983;
}
</style>
