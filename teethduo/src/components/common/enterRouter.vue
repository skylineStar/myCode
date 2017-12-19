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
	    	var page=obj.page;
//	    	console.log(page)
//	    	param=param.replace(page,"");
//	    	var webap = currLocation.indexOf("webApp")
//	      	console.log(webap)
//	      	if(webap==-1){
//	      		var urlStr ='/'+obj.page+'?'+encodeURIComponent(param);//跳入正常页面
//	      	}else{
//	      		var urlStr ='/webApp/'+obj.page+'?'+encodeURIComponent(param);//跳入正常页面
//	      	}
			var urlStr='/'+obj.page+'?'+param;
			console.log(urlStr);
	        _t.$router.push(urlStr);
//			window.location.href = urlStr;
		},'10');
	}
  }
</script>
