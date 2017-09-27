<template>
	  <div class="mintDemo">
	    <h4>顶部选项卡</h4>
	    <mt-navbar v-model="selected">
        <mt-tab-item id="1">选项一</mt-tab-item>
        <mt-tab-item id="2">选项二</mt-tab-item>
        <mt-tab-item id="3">选项三</mt-tab-item>
      </mt-navbar>
      
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="n in 10" :title="'内容 ' + n" key='1'/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :title="'测试 ' + n" key='2'/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :title="'选项 ' + n" key='3'/>
        </mt-tab-container-item>
      </mt-tab-container>
      <h4>toast按钮</h4>
	    <div>
	      <mt-button @click="toastClick">toast按钮</mt-button>
	      <h5>改变颜色</h5>
        <mt-button type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
        <h5>改变大小</h5>
        <mt-button size="small">small</mt-button>
        <mt-button size="large">large</mt-button>
        <mt-button size="normal">normal</mt-button>
        <h5>禁用按钮</h5>
        <mt-button disabled>disabled</mt-button>
        <h5>幽灵按钮</h5>
        <mt-button plain>plain</mt-button>
        <h5>带图标</h5>
        <mt-button icon="back">back</mt-button>
        <mt-button icon="more">更多</mt-button>
        <h5>自定义图标</h5>
        <mt-button>
          <img src="../../assets/logo.png" height="20" width="20" slot="icon">
          带自定义图标
        </mt-button>
        <h5>绑定 click 事件</h5>
        <mt-button @click.native="handleClick">点击触发 handleClick</mt-button>
	    </div>
	    <h4>Tabbar底部选项卡，点击 tab 会切换显示的页面。依赖 tab-item 组件。</h4>
      <div>
        
        <mt-tabbar v-model="selected">
          <mt-tab-item id="外卖">
            <img slot="icon" src="../../assets/logo.png">
            外卖
          </mt-tab-item>
          <mt-tab-item id="订单">
            <img slot="icon" src="../../assets/logo.png">
            订单
          </mt-tab-item>
          <mt-tab-item id="发现">
            <img slot="icon" src="../../assets/logo.png">
            发现
          </mt-tab-item>
          <mt-tab-item id="我的">
            <img slot="icon" src="../../assets/logo.png">
            我的
          </mt-tab-item>
        </mt-tabbar>
      </div>
      <div>
        <h4>选中的菜单是: {{selected}}</h4>
      </div>
      
      <div>
        <h4>tab-container 面板，可切换显示子页面。</h4>

        <p>常与navbar、tabbar结合使用</p>
        <div class="nav">  
          <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>  
          <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>  
          <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>  
        </div>  
          
        <div class="page-tab-container">  
          <mt-tab-container class="page-tabbar-tab-container" v-model="active" :swipeable='true'>  
            <mt-tab-container-item id="tab-container1">  
                <!-- cell组件 -->  
              <mt-cell v-for="n in arr1" :title="n" key='tab-container1'></mt-cell>  
            </mt-tab-container-item>  
            <mt-tab-container-item id="tab-container2">  
                <!-- cell组件 -->  
              <mt-cell v-for="n in arr2" :title="n" key='tab-container2'></mt-cell>  
            </mt-tab-container-item>  
            <mt-tab-container-item id="tab-container3">  
                <!-- cell组件 -->  
              <mt-cell v-for="n in arr3" :title="n" key='tab-container3'></mt-cell>  
            </mt-tab-container-item>  
          </mt-tab-container>  
        </div>  
      </div>
      <div>
        <h4>选中的菜单是: {{active}}</h4>
      </div>
      <h4>Cell Swipe</h4>
      <p>可滑动的单元格，用法同 cell。</p>
      <mt-cell-swipe
      title="标题文字"
      :right="[
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete')
        }
      ]"></mt-cell-swipe>
      <h4>Infinite scroll</h4>
      <p>无限滚动指令。</p>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="item in list">{{ item }}</li>
      </ul>
      <h4>Action sheet</h4>
      <p>操作表，从屏幕下方移入。</p>
      <mt-button type="primary" @click="sheetVisible=true">显示操作列表</mt-button>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <h4>Swipe</h4>
      <p>轮播图，可自定义轮播时间间隔、动画时长等。</p>
      <h5>基础用法</h5>
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      <h5>隐藏 indicators</h5>
      <mt-swipe :show-indicators="false">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      <h5>取消自动播放</h5>
      <mt-swipe :auto="0">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      <h5>change 事件</h5>
      <p>轮播图切换时会触发 change 事件，参数为切入轮播图的索引</p>
      <!--<mt-swipe @change="handleChange">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>-->
       <div class="swipe-wrapper">
        <mt-swipe :auto="0" ref="swipeWrapper">
            <mt-swipe-item class="swip-item-1 item">
              <img src="../../assets/3.jpg"/>
            </mt-swipe-item>
            <mt-swipe-item class="swip-item-2 item"><img src="../../assets/1.jpg"/></mt-swipe-item>
            <mt-swipe-item class="swip-item-3 item"><img src="../../assets/2.jpg"/></mt-swipe-item>
        </mt-swipe>
      </div>
  
      <div class="button-wrapper">
        <button class="prev-button flex-item" @click="prev">prev</button>
        <button class="next-button flex-item" @click="next">next</button>
      </div>
    </div>
    
</template>
  
<script type="text/javascript">
import { Toast } from 'mint-ui'
export default {
  name: 'mintDemo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '',
      active: 'tab-container1',
      arr1:['258', 'George', 'John', 'Thomas', 'James'],
      arr2: ['123', 'Adrew', 'Martin', 'Adrew', 'George', 'James'],
      arr3: ['456', 'John', 'Martin', 'Thomas'],
      list:[1,2,3,4,5],
      loading:false,
      actions:[{'name':'确定',method:''},{'name':"拍照",method:''}],
      sheetVisible:false
    }
  },
  mounted () {
  },
  methods: {
    toastClick: function () {
      Toast('Hello world!')
    },
    handleClick:function(){
      
    },
    // 无限加载
    loadMore() {
      console.log(this.list.length)
      if(this.list.length < 20){
        this.loading = true;
      }
      
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
//      this.loading = false;
      }, 2500);
      
    },
    // 轮播事件
    handleChange(index) {
      console.log(index)
    },
    prev: function () {
      this.$refs.swipeWrapper.prev();
      console.log(this.$children);
    },
    next: function () {
      this.$refs.swipeWrapper.next();
    }
  }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  width: 100%;
  border-bottom: 1px solid;
}

a {
  color: #42b983;
}
.mint-tabbar{
  position: relative;
}
.swipe-wrapper{
        width: 100%;
        height: 200px;
    }
    .swip-item-1{
        background: red;
    }
    .swip-item-2{
        background: blue;
    }
    .swip-item-3{
        background: green;
    }
    .item{
        text-align: center;
        font-size: 40px;
        color: white;
    }
    .item img{
      width: 100%;
      height: 100%;
    }
    .button-wrapper{
        display: flex;
        height: 100px;
    }
    .flex-item{
        flex: 1;
        display: inline-block;
        text-align: center;
        height: 100%;
        line-height: 100%;
        font-size: 40px;
    }
    .prev-button{
        background: darkorange;
    }
    .next-button{
        background: green;
    }
</style>