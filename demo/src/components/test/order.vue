<!-- 
@ wyz
功能：预约信息提交
1、预约人身份信息查询；2、预约信息填充；3、提交预约请求
 -->
<template>
  <div class='order'>
    <!--基本信息-->
    <div class='basemsg'>
      <div class="orderInfo">
        <p class="errtip">请输入正确的手机号</p>
        <div class='tipsMsg padd083'>
          <p class="fs078">预约服务</p>
        </div>
        <ul class='storebox'>
          <li class="new_store">
            <div class="store_title">预约门诊</div>
            <div class='show_store'>
              <span class='s_name'>请选择门诊</span>
              <span class='s_addr'>门诊地址门诊地址门诊地址门诊地址门诊地址门诊地址门诊地址</span>
            </div>
            <div class='r_icon'>
            	
            </div>
          </li>
        </ul>
        <div v-if="hospitalName == ''">
          <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title "><span class="mint-cell-text">预约门诊</span></div>
            <div class="mint-cell-value">
            <span type="text" class="timeInput myblur fs089 padd0 cd2">请选择门诊</span>
            </div>
          </div>
          <div class="mint-cell-allow-right"></div>
        </a>
        </div>
        <div class="fsqqq"  v-else>
          <a class="mint-cell minthg">
              <div class="menzh mint-cell-wrapper paddl0">
                <div class="c9a fs089 left positop">
                    <span class="mint-cell-text mintwidth"></span>
                    <span class="c9a fs089 fx">预约门诊</span>
                </div>
                <div class="right lright">
                  <div class="toCheck timeInput">
                      <div class="lineh1 fs089">{{hospitalName}}</div>
                      <div class="fs078 c9a lineh2">
                        {{hospitalAddr}}
                      </div>
                  </div>  
                  <div class="mint-cell-allow-right arror">
                  </div>
                </div>
              </div>
          </a>
        </div>
        <div>
       <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper nobord">
            <div class="mint-cell-title "><span class="mint-cell-text">服务内容</span></div>
            <div class="mint-cell-value">
              <input type="text" class="mint-field-core phone myblur fs089 c4e" v-model="productName" readonly="readonly">
            </div>
          </div>
        </a>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
 
  import $ from 'jquery'
  import { config_param } from '../../assets/js/config_param'
  import { MessageBox, Indicator, Toast, DatetimePicker } from 'mint-ui'
  import { getUrl, hideaddress } from '../../assets/js/BaseJS.js'
  export default {
    name: 'order',
    data() {
      return {
        isCheck: true, // 服务同意书是否勾选
        hospitalName: '',
        productName: '精品洗牙一次',
        mobile: "",
        user: {
          "patientName": "",
          "cardNo": ""
        }, //输入信息对象
        orderTime: {
          "encounterDate": ""
        }, //预约时间对象
        phoneflag: false, // 电话号码校验状态
        orderInfo: {},
        bookDateTime: '请选择预约时间',
        orderFlag: 1, // 是否已经预约的状态
        isCheckStore: false, // 是否已选门诊
        isOrder:false // 即将跳转预约页面
      }
    },
    beforeCreate() {
      document.title = '预约'
    },
    created() {

    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style stoped>
  @import '../../assets/css/order.css'
</style>