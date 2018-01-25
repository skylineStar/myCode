<!-- 2018.01.23 weUI实例
@ wyz

 -->
<template>
  <div class='weUI'>
  	<div>
  		<mt-button type="primary" class='self'@click='showAct' size="large" >showAction按钮</mt-button>
  		<div class="button-sp-area">
		    <a href="javascript:;" class="weui-btn weui-btn_plain-default" @click='showAct'>showAction按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_plain-default weui-btn_plain-disabled">按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_plain-primary">按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_plain-primary weui-btn_plain-disabled">按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">按钮</a>
		    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn">按钮</a>
			</div>
  		<div id="actionSheet_wrap">
	    <div class="weui-mask_transparent actionsheet__mask" id="mask"  v-if='showAction'></div>
	    <div class="weui-actionsheet" id="weui-actionsheet" v-if='showAction'>
	        <div class="weui-actionsheet__menu">
	            <div class="weui-actionsheet__cell">示例菜单</div>
	            <div class="weui-actionsheet__cell">示例菜单</div>
	            <div class="weui-actionsheet__cell">示例菜单</div>
	            <div class="weui-actionsheet__cell">示例菜单</div>
	        </div>
	        <div class="weui-actionsheet__action">
	            <div class="weui-actionsheet__cell" id="actionsheet_cancel">取消</div>
	        </div>
	    </div>
	<!--style="display: none"-->
			<!--<div v-if='showAction'>
				<div class="weui-skin_android" id="weui-android-actionsheet" >
		      <div class="weui-mask"></div>
		        <div class="weui-actionsheet">
		            <div class="weui-actionsheet__menu">
		                <div class="weui-actionsheet__cell" @click='hideAct'>hideAct示例菜单</div>
		                <div class="weui-actionsheet__cell">示例菜单</div>
		                <div class="weui-actionsheet__cell">示例菜单</div>
		            </div>
		        </div>
		    	</div>
				</div>-->
			</div>
	    	
  	</div>
  	
  </div>
  
</template>

<script>
  export default{
  	name:'weUI',
  	data(){
  		return{
  			showAction:false
  		}
  	},
  	methods:{
  		showAct(){
  			this.showAction=true
  		},
  		hideAct(){
  			this.showAction=false
  		}
  	}
  	
  }
</script>

<style stoped>

</style>
