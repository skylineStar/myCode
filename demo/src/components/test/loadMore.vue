<!--mint-ui组件实例
	@wyz 2018.01.10
	1）loadMore使用
	2）swiper组件使用
	3）手动修改swiper组件实现跑马灯轮播效果
-->
<template>
	<div class="loadMore">
		<div class='swiperMode' v-show="attribute=='auto'">
			<mt-swipe :auto="3000" :speed='300' :showIndicators='false'>
			  <mt-swipe-item><img src="../../assets/1.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/2.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/3.jpg" alt="" /></mt-swipe-item>
			</mt-swipe>
		</div>
		<div class='swiperMode' v-show="attribute=='defaultIndex'">
			<mt-swipe :auto="3000" :speed='300' :defaultIndex='2'>
			  <mt-swipe-item><img src="../../assets/2.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/3.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/swip01.jpg" alt="" /></mt-swipe-item>
			</mt-swipe>
		</div>
		<div class='swiperMode' v-show="attribute=='continuous'">
			<mt-swipe :auto="3000" :speed='300' :continuous='false'>
			  <mt-swipe-item><img src="../../assets/3.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/swip01.jpg" alt="" /></mt-swipe-item>
			  <mt-swipe-item><img src="../../assets/swip02.jpg" alt="" /></mt-swipe-item>
			</mt-swipe>
		</div>
		<!--:prevent='true' :stopPropagation='true'--> 
		<div class='swiperMode' v-show="attribute=='prevent'"> 
			<mt-swipe :auto="0" :speed='500' :showIndicators='false' :defaultIndex='defaultVal' @change="handleChange" ref="swipe">
			  <mt-swipe-item>
			  	<img src="../../assets/swip01.jpg" alt="" @click='getToLink($refs.swipe.index)'/>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<img src="../../assets/swip02.jpg" alt="" @click='getToLink($refs.swipe.index)'/>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<img src="../../assets/swip03.jpg" alt="" @click='getToLink($refs.swipe.index)'/>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<img src="../../assets/swip04.jpg" alt="" @click='getToLink($refs.swipe.index)'/>
			  </mt-swipe-item>
			</mt-swipe>
			<div class='nextImg' @click='nextImg()'></div>
		</div>
		<div class='addMore'>
			<h1>上拉加载</h1>
			<mt-loadmore :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  bottomPullText='上拉加载'>
				<ul class='loadList'>
					<li class='moreLi' v-for='val in list'>
						{{val}}
					</li>
				</ul>
				<div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class='s_margin'><mt-spinner :size='20' color="#26a2ff" style='margin: auto;'type="fading-circle"></mt-spinner></span><!--↓-->
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <div slot = 'bottom'class="mint-loadmore-bottom"><span class="mint-loadmore-text">上拉加载</span></div>
			</mt-loadmore>
			
		</div>
	</div>
</template>

<script>
	import {spinner,loadmore,Toast,Swipe,SwipeItem} from 'mint-ui'
	export default{
		name:'loadMore',
		data(){
			return {
				allLoaded:false,
				topStatus: '',
				list:[0,1,2,3,5,6,7,8,9,10],
				attribute:'prevent',//prevent：是否阻止默认行为； continuous：是否循环播放；auto:自动播放 defaultIndex：初始索引
				activeIndex:'', // 当前索引值
				nextVal:'',// 下一个索引值
				prevVal:'',// 上一个索引值
				defaultVal:0,// 默认展示索引值
			}
		},
		beforeCreate(){document.title='swiper&&loadmore'},
		created(){this.defaultVal = JSON.parse(sessionStorage.getItem('curIndex'))?JSON.parse(sessionStorage.getItem('curIndex')):0
			},
		beforeUpdate () {
			console.log('----即将更新swipe----------')
		  this.activeIndex = this.$refs.swipe.index
		},
		watch: {
		  activeIndex: function (val, oldVal) {
//		  	sessionStorage.setItem('curIndex',val)
		    console.log('newIndex: %s, oldIndex: %s', val, oldVal)
		    console.log(this.$refs.swipe.pages.length)
		    // TODO
		    var len = this.$refs.swipe.pages.length;
		    this.nextVal =(val+1)==len?0:val+1
		    this.prevVal = (val-1)<0?(len-1):val-1
	    	this.$refs.swipe.pages[this.nextVal].style.display = 'block'
				this.$refs.swipe.pages[this.nextVal].style.transform = 'translateX(calc(100% + 0.83rem))'
				this.$refs.swipe.pages[this.prevVal].style.transform = 'translateX(calc(-100% - 0.83rem))'
				this.$refs.swipe.pages[this.prevVal].style.display = 'block'
				
		  }
		},
		mounted() {
			console.log(this.$refs.swipe)
			
			this.nextVal =this.$refs.swipe.$parent.nextVal
		  this.prevVal = this.$refs.swipe.$parent.prevVal
			this.$refs.swipe.$refs.wrap.style.overflow='inherit'// 设置可以同时显示多张轮播图
    },
		methods:{
			// swper方法handleChange
			nextImg(){
				this.$refs.swipe.next();
			},
			getToLink(cur){
				sessionStorage.setItem('curIndex',cur)
				console.log(cur)
				setTimeout(()=>{
					switch(cur)
					{
						case 0:
						  window.location.href='#/test/upLoadImg'
						  break;
						case 1:
							window.location.href='#/test/picker'
					  	break;
					  case 2:
					  	window.location.href='#/test/order'
					  	break;
					  case 3:
					  	window.location.href='#/test/mintDemo'
					  	break;
						default:
							window.location.href='#/test/timePicker'
					}
				},1000)
				
			},
			handleChange(index){// 轮播图变动更换index
				sessionStorage.setItem('curIndex',index)
			},
			// loadMore方法--------------start
			handleTopChange(status) {
        this.topStatus = status;
      },
			loadTop() {
			  // 加载更多数据
			  this.$refs.loadmore.onTopLoaded();
			},
			loadBottom() {
			    let  last = this.list[this.list.length - 1];
			    
			    for (let i = 1; i <= 10; i++) {
			      this.list.push(last + i);
			    }
			  this.$refs.loadmore.onBottomLoaded();
			  if(last>39){
			    	this.allLoaded = true;// 若数据已全部获取完毕
			    	Toast({message:'没有更多了'})
			  }
			},
		}
	}
</script>

<style scoped>
	h1, h2,h4 {
	padding-left: .89rem;
  font-weight: normal;
  height:2.22rem;
  line-height: 2.22rem;
  background-color: #fafafa;
}
.addMore{
	position: absolute;
	top: 13.88rem;
	left: 0;
	width: 100%;
	overflow: scroll;
}
.mint-loadmore-bottom,.mint-loadmore-top {
    color: #9a9a9a;
}
.loadList{
	height: auto;
}
.moreLi{
	width: 100%;
	height: 2.77rem;
	text-align: center;
	line-height: 2.77rem;
	border-bottom: 0.01rem solid #fafafa;
}
/*奇数(odd)行样式  偶数(even) */
.loadList li:nth-of-type(even){background-color: #fcfcfc;}
/*---------swiper样式------------*/
.swiperMode{height:11.66rem;position: absolute;top: 0;width: 100%;padding: 0.83rem 1.83rem 0.83rem 0.83rem;}
.nextImg{height: 100%;width: 1.83rem;position: absolute;right:0 ;top: 0;}
.mint-swipe{overflow: inherit;}
/*.mint-swipe .mint-swipe-items-wrap{overflow: inherit !important;}*/
.mint-swipe-items-wrap > div {
	margin-right:0.83rem;
	width: initial;
}
.mint-swipe-item{
	margin-right:0.83rem;
	width: initial;
}
</style>