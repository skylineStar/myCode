<!-- 养老保险渠道---用户输入保单号页面
@ wyz
功能：用户输入保单号
 -->
<template>
  <div class='toPage'>
      <!--基本信息-->
      <div class='basemsg'>
        <div class='userMsg' >
          <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">卡号</span></div> 
              <div class="mint-cell-value">
                <input placeholder="请输入卡号"  type="text" class="mint-field-core phone policy"   v-model.trim="ylCardNo"> 
                <img src="../../../assets/images/order/order_war.png" class='errbtn' alt="" />
              </div>
            </div> 
          </a>
        </div>
      <!--基本信息===end===-->
    </div>
   <!--<input type="button" value='跳转空白'  class='loginact toEnterRouter ' @click='toEnterRouter'/>-->

    <footer class='tologin' >
      <input type="button" value='跳转'  class='loginact' @click='toPage'/>
      <!--<input type="button" value='跳转'  class='loginact toEnterRouter ' @click='toEnterRouter'/>-->
    </footer>
    <!--底部按钮==end===-->
  </div>
</template>

<script>
  import API from '../../../api/API'
  const api = new API();
  import config from '../../../api/config'
  import $ from 'jquery'
  import {config_param} from '../../../assets/js/config_param'
  import { MessageBox,Indicator,Toast,DatetimePicker  } from 'mint-ui'
  import {hideaddress} from '../../../assets/js/BaseJS.js'
  export default {
    name: 'toPage',
    data () {
      return {
        ylCardNo:'',
        urlStr:'',
      }
    },
    beforeCreate () {document.title = '用户输入保单号';//sessionStorage.setItem('back_ticketURI','1');
    },
    created () {
    },
    mounted () {
      sessionStorage.clear();
    },
    methods: {
      // 调取接口进行页面跳转
      toPage:function(){
        if(this.ylCardNo==''){// 保单号为空
          Toast({message:"请输入保单号"})
            $(".policy").focus()
        }else{
        var param = {"policyNo":this.ylCardNo||"","ticketNo":""}
        let response = api.indexre(param); // 微宝接口
        let _this = this;
        response.then(function(res){
          console.log(res)
          var str = res.data.data.param;
          if(res.status == 200){
            var url = (config.baseURL).replace('call/','insuranceRe/orderIndex?param=');
//          _this.urlStr = url + str;// 拼接跳转路径
            _this.urlStr = config_param.base_path+'/webApp/insuranceRe/orderIndex?param='+ str;// 拼接跳转路径
            window.location.href = _this.urlStr
          }
          
        }).catch(function(err){console.log(err);
//        window.location.replace("#/common/errorPage");
        })
//        console.log("即将跳转页面")
        }
        
      },
      toEnterRouter:function(){// 进入空白页面
        if(this.ylCardNo==''){// 保单号为空
          Toast({message:"请输入保单号"})
            $(".policy").focus()
        }else{
        var param = {"policyNo":this.ylCardNo,"openid":""}
        let response = api.indexre(param); // 微宝接口
        let _this = this;
        response.then(function(res){
          console.log(res)
          var str = res.data.data.param;
          if(res.status == 200){
            var url = (config.baseURL).replace('call/','insurance/orderIndexre?param=');
//          _this.urlStr = url + str;// 拼接跳转路径
            _this.urlStr = config_param.base_path+'/webApp/insurance/orderIndexre?param='+ str;// 拼接跳转路径
            window.location.href = _this.urlStr
          }
        }).catch(function(err){console.log(err);
//        window.location.replace("#/common/errorPage");
        })
//        console.log("即将跳转页面")
        }
      },
      // css设置
      anios:function(){//判断移动设备，更改样式
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){$('.toCheck').css('top','28%')
          $('.myblur').blur();
        }
      }
    	
    }
  }
</script>

<style stoped>
  @import '../../../assets/css/yl/order.css'
</style>
