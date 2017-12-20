<template>
  <div class='cardShare' >
    <div class="mySharecontent">
      <div class = 'shareTop' >
        <span>点击这里</span>
        <span>可分享给微信好友</span>
      </div>
      <!--微信分享==start===-->
        <div class='shareFriend'>
          <div class="top">
              <h5>卡名称：{{productName}}</h5>
              <p>有效日期：{{startTime}}-{{endTime}}</p>
          </div>
          <div class="mid">
            <p>卡号：{{medicalCardNo}}</p><p>密码：{{medicalcardPwd}}</p>
          </div>
          <div class="bom">
            <p>注：体检卡有效期，指的是实际可以去体检机构体检的日期， 请提前做好预约，避免体检卡 </p>
          </div>
        </div>
      <!--微信分享==start===-->
      <div class="sharebtn" @click = 'backAction'><a class='sharetxt'>返回</a></div>
    </div>
  </div>
  
</template>

<script>
  import $jquery from 'jquery'
  import {tkWX} from '../../assets/js/wxConfig.js'
  import {config_param} from '../../assets/js/config_param.js'
  export default {
    name: 'cardShare',
    data () {
      return {
        medicalCardNo:"",
        medicalcardPwd:"",
        productName:'',
        startTime:'',
        endTime:''
      }
    },
    beforeCreate () {
      document.title = '体检分享'
    },
    mounted(){
      this.fillpage();
    },
    methods: {
      // 填充页面
      fillpage:function(){
        var cardInfo = JSON.parse(sessionStorage.getItem('cardInfo'));
        if(cardInfo){
          this.medicalCardNo = cardInfo.share.cardNo;
          this.medicalcardPwd = cardInfo.share.cardPassword;
          this.productName = cardInfo.share.cardName;
          this.startTime = cardInfo.share.startTime;
          this.endTime = cardInfo.share.endTime;
          var obj = {
            share:{
              title: cardInfo.share.cardName,
              desc: "您的好友"+sessionStorage.getItem('nickName')+"给您分享了一张体检卡，请您前往泰康人寿官方微信号健康服务中使用。",
              shareURL : config_param.base_path+"/#/order/osShare?c="+cardInfo.share.cardNo+"&p="+cardInfo.share.cardPassword,
              shareImageURL : config_param.base_path+"/static/img/wxshare.png"
              }
          }
          tkWX.init(obj);
        }else{
          $jquery(".cardShare").hide();
          MessageBox({title: '温馨提示',message: '您还没有选择体检卡',
            showCancelButton: true,
            showCancelButton: false
          })
          .then(action => {
            window.location.href = "#/order/UserManage";
          });
        }
      },
      backAction:function(){
        window.location.href = "#/order/Cardlist";
      },
    }
  }
</script>

<style stoped>
    .mySharecontent{
      background: #333333 url(../../assets/images/order/cardSharebg_02.png) no-repeat 0 0;
      background-size: 100% 100%;
      display: block;
      width: 100%;
      height:100%;
      position: fixed;
    }
    .bgimg{
      width: 100%;
      height: 100%;
    }
  /*分享好友===start*/
 .shareTop{
   position: absolute;
   top: 10%;
   color: #fff;
   font-size: 1rem;
   width: 100%;
   text-align: center;
 }
 .shareTop span{
   display: block;
   height: 25px;
   margin: auto;
 }
  .shareFriend{
    position: absolute;
    top: 7.2rem;
    width: 100%;
    height: 12.5rem;
    background: url(../../assets/images/order/sharebg01_02.png) no-repeat 0 0;
    background-size:100% 100%;
    padding-top: 16px;
    }
  .sharebody{
    
    width: 100%;
    height: 100%;
    height: 225px;
    width: 100%;
    margin: 16px;
  }
  .shareFriend p{font-size: 12px;width: 100%;color: #999;}
  .shareFriend .top{
    padding: 0;
    height:30%;
    margin: 0 9%;
  }
  .shareFriend .top h5{
    color:#333333;
    font-size: 14px;
  }
  .shareFriend  .mid {
    width: 100%;
    height: 40%;
    padding-left: 15%;
}
.shareFriend .mid p {
    margin: 0;
    color: #6495df;
    height: 25px;
    font-size: 16px;
    line-height: 1.5rem;
    width: 100%;
}
.shareFriend .bom{
  width: 100%;
  height: 30%;
  padding: 0 2rem;
}
.shareFriend .bom p{
  font-size: 12px;
  margin: 0;
}
  .sharebtn {
    position: absolute;
    top: 67%;
    width: 100%;
    display: block;
    text-align: center;
}
  a.sharetxt {
    display: block;
    width: 130px;
    height: 43px;
    line-height: 40px;
    margin: auto;
    background: url(../../assets/images/order/btnbg.png) no-repeat 0 0;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
}
  /*分享好友===end===*/
  
</style>