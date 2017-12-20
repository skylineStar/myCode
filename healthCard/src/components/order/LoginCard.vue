<!--@wyz
卡密登录页面：客户通过卡号密码激活使用体检卡
  最后修改时间2017.9.8
-->
<template>
  <div id='LoginCard' class='LoginCard'>
    
    <div class='mintbody'>
        <div class='inputlist'>
          <span>卡  号</span><input type='text' placeholder='请输入正确的14位卡号' v-model='cardInfo.medicalCardNo'  @keyup="vailCard(cardInfo.medicalCardNo)" />
          <span>密  码</span><input type='text' placeholder='请输入密码' v-model='cardInfo.medicalcardPwd' @keyup="vailCard(cardInfo.medicalcardPwd)"/>
        </div>
        <div class='redtip'>{{tipword}}</div>
    </div>
    <footer class='tologin' >
    <button  disabled="disabled" @click = 'loginact' class='loginact'>提交</button>
    </footer>
  </div>
</template>

<script>
import $jquery from 'jquery'
import API from '../../api/API'
const api = new API();
import { Indicator,Toast } from 'mint-ui'
import {hideaddress} from '../../assets/js/BaseJS.js'
export default {
  name: 'LoginCard',
  data () {
    return {
      cardInfo:{medicalCardNo:"",medicalcardPwd:""},// 输入卡密对象
      cNoflag:false,// 卡号验证标识
      cPwdflag:false,// 密码验证标识
      tipword:'' // 后台提示信息
    }
  },
  beforeCreate () { document.title = '卡密预约' },
  mounted(){
    hideaddress();
    this.myload();
  },
  methods: {
    // 卡密输入校验
  	vailCard: function (cur) {
  	      this.cardInfo.medicalCardNo = $jquery.trim(this.cardInfo.medicalCardNo)
  	  var cNo = this.cardInfo.medicalCardNo;
  	      this.cardInfo.medicalcardPwd = $jquery.trim(this.cardInfo.medicalcardPwd)
  	  var cPwd = this.cardInfo.medicalcardPwd;
  	  var reg = /^[0-9]{14}$/
  	  if(cur == cNo){
  	    if(cNo == ''){
  	      this.cNoflag = false
  	    }else{
  	      if(!(reg.test(cNo))){
  	        if(cNo.length>13){
  	          Toast({message:'卡号有误，请重新输入',duration: 1000,className:'mToast'})
  	        }
            this.cNoflag = false
          }else{
            this.cNoflag = true
          }
  	    }
  	  }
  	  if(cur == cPwd){
  	    if(cPwd == ''){this.cPwdflag = false}
  	    if(!(reg.test(cPwd))){
          if(cPwd.length>13){
              Toast({message:'密码有误，请重新输入',duration: 1000,className:'mToast'})
            }
        this.cPwdflag = false
        }else{
          this.cPwdflag = true
        }
  	  }
  	  
      if(this.cPwdflag && this.cNoflag){
        $jquery('.loginact').addClass('btn-gradient')
        $jquery('.loginact').attr('disabled',false)
        this.tipword = ''
      }else{
        $jquery('.loginact').attr('disabled',true)
        $jquery('.loginact').removeClass('btn-gradient');
      }
  	},
  	// 激活并使用体检卡
    loginact: function () {
      let that = this;
      var cardInfo={"medicalCardNo": that.cardInfo.medicalCardNo,"medicalcardPwd": that.cardInfo.medicalcardPwd}
      if(this.cPwdflag && this.cNoflag){
        let response = api.activateTJCard(cardInfo);// 激活体检卡的接口
        response.then(function(res){
          var data=res.data;
          if(data.status=='1'){
            var s_cardInfo = {};
            s_cardInfo = data.data[0];
            if(s_cardInfo){ // 匹配到卡信息后
              Toast({ message: '验证成功',duration: 1000,className:'mToast'});// 提示成功
              s_cardInfo.medicalCardNo = that.cardInfo.medicalCardNo;
              s_cardInfo.medicalcardPwd = that.cardInfo.medicalcardPwd;
              s_cardInfo.isCardUser = '1';
              sessionStorage.setItem('cardInfo',JSON.stringify(s_cardInfo)) // 存入session
              setTimeout(function(){ 
              window.location.href = '#/order/TestStart'},'2000')// 跳转到体检开启页
            }else{// 未匹配到卡信息
              Toast({ message: '未找到该卡相关信息',duration: 1000,className:'mToast'});
            }
          }else{
           that.tipword = data.message
          }
        }).catch(function(err){console.log(err);});
      }else{
        if(this.cPwdflag==false || this.cNoflag ==false){
          Toast({message:'卡号或密码有误，请重新输入'})
        }
      }
      
    },
    // 动态获取屏幕高度
      myload:function(){
        var height = $jquery(window).height();
        $jquery('.LoginCard').css({'height':height});
      },
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.redtip{width:100%;text-align:center;color:#ea3125;font-size:.78rem}
.LoginCard{background-color:#fff}
.mui-toast-container{bottom:80%!important;width:45%}
.mui-toast-message{height:4.11rem;line-height:4.11rem}
.inputlist{width:100%;background-color:#FFF;padding:1rem 0;overflow:hidden}
.inputlist input{width:72%;height:40px;line-height:40px;margin-bottom:15px;padding:10px 15px;font-size:.667rem;border-radius:3px;border:1px solid #BBB;outline:0;color:#666}
.inputlist span{display:inline-block;width:22.4%;padding-left:1rem;color:#333}
.bottom_btn,.tologin{height:2.77rem;line-height:2.77rem;width:100%;text-align:right;position:fixed;z-index:10;right:0;bottom:0}
.loginact{width:100%;height:100%;display:block;font-size:1rem;text-align:center;background-color:#b4b3a3;color:#FFF;font-weight:500;border:0}
</style>
