<!--mint-ui组件实例
	@wyz 2018.01.10
	1）dateTime Picker使用
	2）二级联动picker使用（存在问题尚未解决：二级菜单数据不能回到最初默认值）
	01.11结合jQuery解决问题
	3）tab-container与loadmore联合使用
	4）tab-container与infinite-scroll联合使用
-->
<template>
	<div class='pickerMode'>
		<div>
			
		
		<mt-button @click.native="datePicker" size='large'>{{dateVal}}</mt-button>
		
		<mt-button @click.native="addrClick" type='primary' size='large'>{{addrVal}}</mt-button>
		
		</div>
		<div class='tabDiv'>
			<mt-button size='normal' @click.native="active='tab-container1'">tab1</mt-button>
			<mt-button size='normal' @click.native="active='tab-container2'">tab2</mt-button>
			<mt-button size='normal' @click.native="active='tab-container3'">tab3</mt-button>
			<mt-tab-container v-model="active" :swipeable=true>
			  <mt-tab-container-item id="tab-container1">
			    <mt-cell v-for="n in 10" :key='n' title="tab-container 1"></mt-cell>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="tab-container2">
			    <mt-cell v-for="n in 5" :key='n' title="tab-container 2"></mt-cell>
			    <!---------------infinite-scroll---------------->
			    <ul	 v-infinite-scroll="loadMore"
					  infinite-scroll-disabled="loading"
					  infinite-scroll-distance="10">
					  <li v-for="item in list1" class='moreLi'>{{ item }}</li>
					  <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class='s_margin'><mt-spinner :size='20' color="#26a2ff" type="fading-circle"></mt-spinner></span>
					</ul>
					<!---------------infinite-scroll---------------->
			  </mt-tab-container-item>
			  <mt-tab-container-item id="tab-container3">
			  	<!---------------loadmore---------------->
			  	<mt-loadmore :autoFill=false  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  bottomPullText='上拉加载'>
						<div v-for='val in list'>
							<mt-cell  :title="'tab-container  '+val"></mt-cell>
						</div>
						
						<div slot="top" class="mint-loadmore-top">
		            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class='s_margin'><mt-spinner :size='20' color="#26a2ff" style='margin: auto;'type="fading-circle"></mt-spinner></span><!--↓-->
		            <span v-show="topStatus === 'loading'">Loading...</span>
		        </div>
		        <div slot = 'bottom'class="mint-loadmore-bottom"><span class="mint-loadmore-text">上拉加载</span></div>
					</mt-loadmore>
			    <!---------------loadmore---------------->
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
		<div>
			<!--日期选择器-->
      <mt-datetime-picker
        ref="picker"
        type="date" 
        v-model="pickerValue"
        :startDate.sync = 'startPicker' 
        :endDate.sync = 'endPicker'
        @confirm="handleConfirm">
      </mt-datetime-picker>
      <!--日期选择器-->
		</div>
		<div  class='addrDiv'>
			<mt-popup v-model='showAddr'  popup-transition="popup-fade"  position="middle">
				<mt-picker ref="addrPic" :showToolbar='true' :value-key='cityLetter' :slots="areaSlots" @change="onValuesChange">
	  				<mt-button  @click='cancelCheck'>取消</mt-button>
	  				<mt-button type='primary'   @click='sureCheck'>确定</mt-button>
				</mt-picker>
			</mt-popup>
		</div>
			
		
	</div>
</template>

<script>
	import { Picker,popup,Toast } from 'mint-ui'
	import $ from 'jquery'
	import {address,letter,add} from '../../assets/js/city_abc.js'
	export default{
		name:'pickerMode',
		data(){
			return {
				pickerValue:'1990-1-1',// 时间picker默认显示值
        startPicker:new Date(new Date().getFullYear() - 120, 0, 1),//picker开始时间
        endPicker:new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),// picker结束时间
        dateVal:'请选择日期',
        // 地址
        addrVal:'请选择地址',
        showAddr:false, // 是否显示地址
        addrId:'A',// 地址索引
        provinceIndex:1,
        cityLetter:'A',
        letterArr:Object.keys(address),
        cityArr:Object.values(address),
        cityName:'',
        num:1,
        areaSlots:[
        {
            flex: 1,
            values:  letter,
            className: 'slot1',
            textAlign: 'center',
//          defaultIndex:0,
//          value:'A',
//          valueKey:0,
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: '',//address,//返回address的所有属性
            className: 'slot3',
            textAlign: 'center',
            defaultIndex:0,
            value:Object.values(address)[0],
            valueKey:0,
          }],
          // tab-container变量
          active:'tab-container1',
          // loadmore变量
          topStatus: '',
					list1:[1,2,3,4,5],
					list:[0,1,2,3],
          allLoaded:false,
          // Infinite scroll变量
          loading:false,
			}
		},
		beforeCreate(){document.title='pickerDemo';},
		created(){
			setTimeout(() => {
				this.areaSlots[0].values = this.letterArr // 城市首字母
				this.areaSlots[2].values = this.cityArr[0] // 
//				this.areaSlots[2].defaultIndex=0
//	      this.areaSlots[2].value=Object.values(address)[0][0]
//	      this.areaSlots[2].valueKey=0
			}, 800)
		},
		mounted(){
			this.$nextTick(() => {
		    setTimeout(() => {
		      // 利用索引初始化默认选中的省份和城市
//		      this.areaSlots[0].defaultIndex = provinceIndex // Number类型
//		      this.areaSlots[2].defaultIndex = areaSlotsIndex
		    }, 20)
		  })
		},
		methods:{
			// 日期选择器
			datePicker(){
				this.$refs.picker.open();
			},
			handleConfirm(curdate){
				var year = curdate.getFullYear();
        var mon = curdate.getMonth()+1;
        var day = curdate.getDate();
        mon = mon<10?'0'+mon:mon
        day = day<10?'0'+day:day
        this.dateVal = year+ '-' +mon+ '-' +day;
			},
			
			// 地址联动选择
			addrClick(){
				this.showAddr = true
			},
			onValuesChange(picker, values){
				console.log('------onValuesChange-----'+this.num)
				var index = (this.letterArr).indexOf(values[0])
				var val,selectVal;
				setTimeout(()=>{
					val = $('.slot1 .picker-selected').text()
					val = val.trim()
				if(this.num>2){
						this.areaSlots[2].values = address[val]
						this.cityLetter = val
				}
				
				if(values[1]==undefined){
					this.cityName = '没有对应城市'
				}else{
					this.cityName = values[1]
				}
				},100)
				this.num++
				console.log(values)
			},
			sureCheck(){
				this.showAddr = false
				this.addrVal = this.cityLetter+'-'+ this.cityName
				
			},
			cancelCheck(){
				this.showAddr = false
			},
			// loadMore方法--------------start
			handleTopChange(status) {
        this.topStatus = status;
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
			// 
			loadMore(){
				// 防止多次加载
			  if (this.loading) {
			    return false
			  }
				this.loading = true;
			  setTimeout(() => {
			    let last = this.list1[this.list1.length - 1];
			    for (let i = 1; i <= 5; i++) {
			      this.list1.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			},
		},
		
	}
</script>

<style scoped>
  .pickerMode{
  	background-color: #fff;
  }
.addrDiv  .mint-popup{width: 90%;border-radius: 0.13rem;}
.addrDiv .mint-button--normal{width: 49%;}
  .addrDiv{width: 90%;}
  .tabDiv{position: absolute;top: 8.33rem;left:0;width: 100%;}
  .moreLi{
	width: 100%;
	height: 2.77rem;
	text-align: center;
	line-height: 2.77rem;
	border-bottom: 0.01rem solid #fafafa;
}
.moreLi:nth-of-type(even){background-color: #fcfcfc;}
.s_margin{padding: 0 45%;}
.tabDiv .mint-tab-container-wrap{
  min-height: 617px!important;
}
.slot1{
	text-align: left;
}
</style>