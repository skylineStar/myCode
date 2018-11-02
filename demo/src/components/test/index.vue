<template>
  <div class="test">
    <div>Jerry&#128540;&#128063;</div>
    <br>
    <div v-html="name"></div>
    <br>
    <div>
      <input class="editSpan" type="text" :value="name">
    </div>
    <br>
    <hr>
    <h4>解决方案1</h4>
    <br>
    <div>
      <span class="editSpan" contenteditable="true" style="-webkit-user-select: text;" id="name" @input="getName($event)" @blur="getName($event)">哆啦A梦&#128540;&#128540;</span>
      <div>{{spanVal}}</div>
    </div>
    <br>
    <hr>
    <h4>解决方案2</h4>
    <br>
    <div>
      <input class="editSpan" type="text" :value="nameVal">
      <span class="hidden" v-html="name" ref="name"></span>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>

export default ({
  name: 'test',
  data(){
    return {
      name:'哆啦A梦&#128540;&#128540;',
      nameVal:'',
      spanVal:''
    }
  },
  methods: {
    getName(evt){
      console.log(evt.target.innerHTML)
      this.spanVal = evt.target.innerHTML
    }
  },
  mounted () {
    this.nameVal = this.$refs.name.innerHTML
  }

});
</script>
<style>
.editSpan{
  display: block;
  width: 80%;
  height:2.5rem;
  line-height: 2.5rem;
  border: 1px solid #e7e7e7;
  border-radius: 3px;
  margin: auto;
}
.hidden{
  visibility: hidden;
}
</style>
