<template>
	<div class="common_share">
	</div>
</template>
<script>
export default {
  beforeCreate(){
    document.title = '青春版体检套餐';
  },
  mounted: function () {
  	var c_href=window.location.href;
//	var par='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2f763d09aa9ca523&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/redirect/wx2f763d09aa9ca523?other=aHR0cDovL2FwcC5oZWFsdGhzYWxlLm1vYmlsZS50YWlrYW5nLmNvbS8jL3J1bkRldlBhZ2U/cmlza0NvZGU9UUNUWVMmc3ViQ29kZT0mc3NpZD1vZmEzVmpoMmtvS3hmdUV4UFRYYjFFeUJLOVVjJnV1aWQ9b0E2R1lqdl9kM2ZYa0FLUGVOQTVvcE9yMWVTZyZob21lSWQ9MTAxMDQxNDg1JnVzZXJUeXBlPWFnbnQmc3RhZmZUeXBlPSZhcm15SWQ9MTAxMDQxNDg1JnNlZWRJZD0xNDk5NjkzODc5MzA0NDM5NjQwJmNvbXBhbnk9MQ==&response_type=code&scope=snsapi_base&state=redict&connect_redirect=1#wechat_redirect';
//	c_href=c_href+'?shareUri='+encodeURIComponent(par);
//	console.log(c_href);
//	console.log(c_href.split('shareUri=')[1]);
//	
//	
//	console.log(decodeURIComponent(c_href));
//	console.log(decodeURIComponent(c_href.split('shareUri=')[1]));
//	
//	var ueii='http://saletest.wx.tkzj.taikang.com/#/common/common_share?shareUri=%20https%3A%2F%2F%20open.weixin.qq.com%2Fconnect%2Foauth2%2Fauthorize%3Fappid%20%3Dwx2f763d09aa9ca523%26redirect_uri%20%3D%20%20http%3A%2F%2F%20wxpt.taikang.com%2Ftkmap%2Fwechat%2Foauth2%2Fredirect%2Fwx2f763d09aa9ca523%3Fother%20%3D%20aHR0cDovL3NhbGV0ZXN0Lnd4LnRremoudGFpa2FuZy5jb20vIy9ydW5EZXZQYWdlP3Jpc2tDb2RlPVFDVFlTJnN1YkNvZGU9JnNzaWQ9b0E2R1lqdl9kM2ZYa0FLUGVOQTVvcE9yMWVTZyZ1dWlkPW9BNkdZanZfZDNmWGtBS1BlTkE1b3BPcjFlU2cmaG9tZUlkPTEwMTA0MTQ4NSZ1c2VyVHlwZT1hZ250JnN0YWZmVHlwZT0mYXJteUlkPTEwMTA0MTQ4NSZzZWVkSWQ9MTQ5OTY5Mzg3OTMwNDQzOTY0MCZjb21wYW55PTE%3D%26response_type%20%3D%20code%26scope%20%3D%20snsapi_base%26state%3Dredict%26connect_redirect%3D1%23wechat_redirect'
//	console.log(decodeURIComponent(ueii.split('shareUri=')[1]));
	window.location.replace(decodeURIComponent(c_href.split('shareUri=')[1]));
  }
}
</script>
