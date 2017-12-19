<template>
  <div >
    <group-title>
      pull up
      <span class='pull-right'>status:{{bottomAllLoaded?'all loaded':bottomStatus}}</span>
      
    </group-title>
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
  .router a{
    color: #000;
    font-size: 28px;
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
