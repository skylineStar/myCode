<!-- 
@ kyy
功能：入口接入的空白路由
 -->
<template>
  <div class='enterRouter'>
  </div>
</template>
<script>
  import {getUrl} from '../../assets/js/BaseJS.js'
  export default {
  	name: 'enterRouter',
	beforeCreate () {sessionStorage.setItem('back_ticketURI','1');
    },
	created(){
		var _t=this;
		setTimeout(function(){
			var currLocation=window.location.href;	
			var param=currLocation.split('?')[1];
	    	var obj=getUrl(currLocation);//page
	        var urlStr ='/'+obj.page+'?'+param;//跳入正常页面
//			console.log(urlStr);
	        _t.$router.push(urlStr);
	//		window.location.href = urlStr;
		},'500');
	}
  }
</script>
