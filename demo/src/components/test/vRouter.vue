<template>
  <div class='vRouter'>
    <h2>{{msg}}</h2>
    <hr/>
    <h3>{{$store.state.count}}</h3>
    <h3>{{$store.getters.doneTodos}}</h3>
    <h3>{{$store.getters.getTodoById(2)}}</h3>
    <h3>{{$store.getters.doneTodosCount}}</h3>
    <h3>{{num}}</h3>
    <br />
    <div>
      <button @click="$store.commit('add')" class='mint-button--normal'>+</button>
      <button @click="$store.commit('reduce')" class='mint-button--normal'>-</button>
    </div>
    <mt-button size='large' type='primary' @click="$store.commit('increment',{amount: 10})">自增10</mt-button>
    <mt-button size='large' type='danger' @click="add()">点击自减10</mt-button>
  </div>
</template>
<script>
  import store from '@/store/store.js'
  import {mapState,mapGetters,mapMutations } from 'vuex';
  export default{
  	name:'vRouter',
      data(){
          return{
              msg:'Hello Vuex',

          }
      },
      mounted(){
      	console.log(this.$store.state.todos.filter(todo => todo.done).length)
      },
     computed:{
     	
     	 // 使用对象展开运算符将 getter 混入 computed 对象中
	    ...mapGetters([
	      // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
				'doneTodosCount',
	      'anotherGetter',
	      // ...
	    ]),
     	doneTodosCount () {
		    return this.$store.state.todos.filter(todo => todo.done).length
		  },
     	localComputed () { /* ... */ },
		  // 使用对象展开运算符将此对象混入到外部对象中
		  ...mapState({
		    // 箭头函数可使代码更简练
		    count: state => state.count,
				
		    // 传字符串参数 'count' 等同于 `state => state.count`
		    countAlias: 'count',
		
		    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
		    countPlusLocalState (state) {
		      return state.count + this.localCount
		    }
		  }),
      count(){
          return this.$store.state.count;
      },
    },
    computed:mapState({
      // 箭头函数可使代码更简练
	    count: state => state.count,
			num: state => state.num,
	    // 传字符串参数 'count' 等同于 `state => state.count`
	    countAlias: 'count',
	
	    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
	    countPlusLocalState (state) {
	      return state.count + this.localCount
	    }
    }),
    methods: {
	    ...mapMutations([
	      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
	
	      // `mapMutations` 也支持载荷：
	      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
	    ]),
	    ...mapMutations({
	      add: 'reduceNum' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
	    })
  	},
//	    computed:mapState(["count"])

  }
</script>


<style scoped>
h3,div{
	min-height: 2.22rem;width: 100%;text-align: center;line-height: 2.22rem;border-bottom: 0.02rem solid #fafafa;
}
h3:nth-of-type(even){background-color: #FCFCFC;}
</style>