<!--@wyz
微信分享页面：展示激活卡密及套餐名
 最后修改时间2017.9.7
-->
<template>
  <div class='osShare'>
    <div class="body">
      <img src="../../assets/images/order/sharebg02.png" />
    	<div class='cardinfo'>
    	  <h3 class='title'>基础体检套餐</h3>
    	  <div class='content'>
      	  <p class='sharep'>卡号： {{medicalCardNo}}</p>
      	  <p class='sharep'>密码： {{medicalcardPwd}}</p>
    	  </div>
    	</div>
    </div>
  </div>
</template>

<script>
  import $jquery from 'jquery'
  export default {
    name: 'osShare',
    data () {
      return {
        medicalCardNo:"",
        medicalcardPwd:""
      }
    },
    beforeCreate () {
    document.title = '青春版体检套餐'
    },
    created () {
    	this.fillpage();
    },
    mounted(){
      $jquery('body').height($jquery(window).height());
  },
    methods: {
    	fillpage:function(){
    		var url=window.location.href;
    		console.log(url);
    		var param=url.split("?")[2]
    		console.log(param);
    		var arr=param.split('&');
    		this.medicalCardNo=arr[0].split('=')[1]
    		this.medicalcardPwd=arr[1].split('=')[1]
    		console.log(this.medicalCardNo+"--"+this.medicalcardPwd);
    	},
    }
  }
</script>

<style stoped>
.cardinfo{width:89%;height:0;padding-bottom:89%;margin-left:6%;position:absolute;top:4.94rem;background:url(../../assets/images/order/shareConbg.png) no-repeat 0 0;background-size:100% 100%}
h3{width:100%;text-align:center;font-size:.94rem;font-weight:500;padding-top:37%;padding-left:.3rem;color:#46729c;margin-bottom:7%}
.sharep{width:100%;text-align:left;padding-left:19%;margin-bottom:10px;color:#6f2502;font-size:1rem;font-weight:500}
</style>
