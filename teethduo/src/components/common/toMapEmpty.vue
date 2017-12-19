<!-- 
@ kyy
功能：接入地图的空白路由
 -->
<template>
  <div class='toMapEmpty'>
  </div>
</template>
<script>
  export default {
    name: 'toMapEmpty',
    created(){
		setTimeout(function(){
			var mapRouter=sessionStorage.getItem('mapRouter')||"";
		  	if(mapRouter){
		  		mapRouter=JSON.parse(mapRouter);
		  		if(mapRouter.toMap=='0'){//返回项目正常页面
					window.location.href = mapRouter.backURI;
			  	}else if(mapRouter.toMap=='1'){//跳转到地图页面
			  		mapRouter.toMap='0';
			  		sessionStorage.setItem('back_ticketURI','1');
			  		sessionStorage.setItem('mapRouter',JSON.stringify(mapRouter));
			    	window.location.href=mapRouter.toMapURI;
			  	}
		  	}
	  	},'500');
	}
  }
</script>