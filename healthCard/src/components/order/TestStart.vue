<!--@wyz
预约开启页：展示激活卡密及卡有效期
 最后修改时间2017.9.8
-->
<template>
    <div class="teststart">
      <footer class="startOrder" >
        <router-link to= '/order/City'>
           <a href="JavaScript:void(0);" class="loginact btn-gradient">预约体检</a> 
        </router-link>
      </footer>
      <div class="body">
        <img src="../../assets/images/order/bgstart_02.png"/>
        <div class="sucbody">
          <div class="stip">
            <img src="../../assets/images/order/icon001.png"/>
            <p class='stip-p'>恭喜您成功激活！</p>
          </div>
          <div class="ts_tipsword">
            <p>尊敬的用户： </p>
            <p>您的体检卡已经激活，您可以点击下方按钮，进行体检预约</p>
          </div>
          <div class="myinfo">
            <h5>青春版体检套餐</h5>
            <div class='cardtip'>
              <p class="cc">您的体检卡有效期是：</p>
              <p class="cc">{{term.startTime}} - {{term.endTime}}</p>
            </div>
          </div>
          <div class="byemsg">
            <p>请您合理安排时间</p>
            <p>感谢您对泰康集团的信任与支持，祝您身体健康！</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $jquery from 'jquery'
import API from '../../api/API'
const api = new API();
import {hideaddress} from '../../assets/js/BaseJS.js'
export default {
  name: 'teststart',
  data () {
    return {
      term:{}
    }
  },
  beforeCreate () {
    document.title = '体检在线预约'
  },
  created () {
    hideaddress();
    this.fillPage ();
  },
  methods: {
    fillPage: function () {
      // 获取session
    var cardInfo=sessionStorage.getItem('cardInfo');
        cardInfo = JSON.parse(cardInfo)
      if(cardInfo){ // cardInfo 的session不存在
        this.term = cardInfo;
        // 打印session信息       console.log(JSON.stringify(cardInfo))
      }else{
        $jquery(".teststart").css({'display':'none'});
        MessageBox({
          title: '温馨提示',message: '您还没有选择体检卡，去选卡吧！',showCancelButton: true,showCancelButton:false
        }).then(action => {
          window.location.href = "#/order/UserManage"
        });
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.body img{width:100%}
.startOrder{position:fixed;right:0;bottom:0;z-index:10;width:100%;height:2.77rem;background-color:#FFF;text-align:right;line-height:2.77rem}
.loginact{display:block;width:100%;color:#fff;text-align:center}
.btn-gradient{background:linear-gradient(to right,#56b0d8,#6f81e4)}
.sucbody{position:absolute;top:44px;padding-right:1.38rem;padding-left:1.38rem;width:100%}
.stip-p{position:relative;left:.5rem;padding-top:1rem;padding-bottom:2rem;width:100%;color:#3f0601;text-align:center;font-size:1rem}
h5,p{margin:0;width:100%}
p{width:100%;font-size:.667rem}
.stip{width:100%;text-align:center}
.ts_tipsword{margin-bottom:1.3rem;padding:.833rem .5rem;font-size:.667rem}
.stip img{width:48px}
.myinfo{margin-bottom:1.83rem;width:100%;border:1px solid #59210a;background-color:#6bc0e5;font-weight:700}
.myinfo h5{height:1.778rem;border-bottom:1px solid #89cdea;color:#FFF;text-align:center;font-size:.666rem;line-height:1.778rem}
.myinfo p{width:100%;text-align:center}
.cardtip{padding:1rem 0}
.myinfo p.cc{height:1.5rem;color:#3f0601;font-weight:600;font-size:.889rem;line-height:1.5rem}
.byemsg p{width:100%;text-align:center}
.byemsg p:first-child{color:#333;font-size:.72rem}
.byemsg p:last-child{color:#999;font-size:.61rem}
.bottomblock{padding-right:1.33rem;padding-bottom:1.52rem;padding-left:1.33rem}
.bottomblock a{display:block;height:2.63rem;color:#3f0601;text-align:center;font-size:.833rem;line-height:2.63rem}
.orderbtn{position:fixed;right:0;bottom:0;z-index:10;margin-right:-1.38rem;margin-left:-1.38rem;width:100%;height:2.77rem;line-height:2.77rem}
.orderbtn .btn-gradient{display:block;width:100%;height:100%;color:#FFF;text-align:center}
</style>