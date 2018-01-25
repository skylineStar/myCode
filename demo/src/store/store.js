import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count:1,
  num:0,
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false },
    { id: 3, text: '...', done: false },
    { id: 4, text: '...', done: true },
  ]
}
const getters =  {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
	    return getters.doneTodos.length
	  },
	  // 让 getter 返回一个函数，来实现给 getter 传参。
	  getTodoById: (state) => (id) => {
	    return state.todos.find(todo => todo.id === id)
	  }
  }

const mutations={
        add(state){
            state.count+=1;
        },
        reduce(state){
            state.count-=1;
        },
        reduceNum(state){
            state.num-=10;
        },
        increment (state, payload) {
			    state.num += payload.amount
			  },
			  someMutation (state) {
			    api.callAsyncMethod(() => {
			      state.count++
			    })
			  }
    }
export default new Vuex.Store({
        state,mutations,getters
    });
    