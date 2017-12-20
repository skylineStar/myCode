<!--@wyz
提交预约信息页面：展示预约机构、套餐、站点、预约时间；收集预约客户身份信息；提交预约
  最后修改时间：2017.9.8
-->
<template>
  <div class='orderMsg'>
    <div class="body">
      <!--步骤导航-->
        <div class='stepnav'>
         <ul class="steplist">
          <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>所在城市</p></li>
          <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>体检地址</p></li>
          <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>体检日期</p></li>
          <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>基本信息</p></li>
         </ul>
         <div class='line'></div>
        </div>
      <!--步骤导航===end====-->
      <!--基本信息-->
      <div class='basemsg'>
        <div class="orderInfo">
          <div  @click.stop='backAction("gover")' >
            <mt-cell title="体检机构"  is-link v-model='parentOrgName'></mt-cell>
          </div>
          <div  @click.stop='backAction("station")' >
            <mt-cell title="体检站点"  is-link v-model='orgName'></mt-cell>
          </div>
          <div  @click.stop='backAction("meal")' >
            <mt-cell  title="体检套餐"   is-link v-model='orgSvcPkgNameAs'></mt-cell>
          </div>
          <div  @click.stop='dateBack("time")' >
            <mt-cell title="体检时间"  is-link v-model='bookDate'></mt-cell>
          </div>
        </div>
        <div class='tipsMsg'>
          <p>请您填写<span class='role'> 体检人 </span>的真实信息，作为体检人参与体检时的验证身份 的依据</p>
        </div>
        <div class='userMsg' id="viewport">
          <div class='userinput'>
            <fieldset >
            <legend>个人基本信息</legend>
            <div class='u_inputlist'>
              <ul class='orderUserList'>
                <li><span class='label'>姓  名</span><input class='contName' type='text' placeholder='请输入您的姓名' v-model="user.contName"maxlength="10" @blur="nameBlur(user.contName)"/></li>
                <li><span class='label'>证件类型</span><input type="button" v-model="user.cardTypeName" @click='showType = true' class=' cardtype card inputbtn' placeholder="请选择" />
                <mt-popup v-model="showType" position="middle">
                  <ul class="typeList">
                    <li v-for='(item,index) in typeArr' @click='checkType(index,item)'>{{item}}</li>
                  </ul>
                </mt-popup>
                  
                </li>
                <li><span class='label'>证件号码</span><input type="text" v-model="user.cardNo" placeholder="请输入证件号码" class='cardNo' @blur="cardNoBlur(user.cardNo)"/></li>
                <li v-if='user.cardTypeCd ==2 ||user.cardTypeCd ==3 '>
                  <span class='label'>出生日期</span><input type="button" @click='datePicker'  v-model="user.birthDate" max='maxage' class='birth inputbtn' @change = 'valibirthday()'/>
                </li> 
                <li class="radiobox sex" v-if='user.cardTypeCd ==2 ||user.cardTypeCd ==3 '>
                  <span class='label sexlabel'>性  别</span> 
                  <div class='alginright'>
                    <span class='boy' @click = 'sexClickM("M")'><i class='icon check' v-if='user.contGenderCd == "M"'></i><i class='icon' v-if='user.contGenderCd == "F" ||user.contGenderCd == ""'></i> 男</span> 
                    <span class='girl nv' @click = 'sexClickF("F")'><i class='icon check' v-if='user.contGenderCd == "F"'></i><i class='icon'  v-if='user.contGenderCd == "M" ||user.contGenderCd == ""'></i> 女</span>
                  </div>
                </li>
                <li class="radiobox marrey">
                  <span class='label sexlabel'>婚  否</span>
                  <div class='alginright'>
                    
                    <span class='boy marred' @click='marreyClickN("0")'><i class='icon check' v-if='user.isMarrage == "0"'></i><i class='icon' v-if='user.isMarrage == "1" ||user.isMarrage == ""'></i> 未婚</span>
                    <span class='girl' @click='marreyClickY("1")'><i class='icon check' v-if='user.isMarrage == "1"'></i><i class='icon' v-if='user.isMarrage == "0" ||user.isMarrage == ""'></i> 已婚</span>
                  </div>
                </li>
                <li><span class='label'>与本人关系</span><input type="button" v-model="user.relatName" @click='showRelat = true' class='cardtype inputbtn' placeholder="请选择"  />
                <mt-popup v-model="showRelat" position="middle"> 
                    <ul class="typeList">
                      <li v-for='(item,index) in relatList' @click='checkRelat(index,item)' v-if='user.isMarrage=="1"'>{{item}}</li>
                      <li v-for='(item,index) in relatList1' @click='checkRelat(index,item)' v-if='user.isMarrage=="0"'>{{item}}</li>
                    </ul>
                </mt-popup>
                </li>
                <li><span class='label'>联系电话</span><input  type="tel" v-model="user.mobilePhone" placeholder="请输入手机号" class='phone'maxlength="11" @blur="phoneBlur()"/></li>
              </ul>
            </div>
          </fieldset>
          </div>
          
        </div>
        
      </div>
      <!--基本信息===end===-->
      <!--日期选择器-->
      <mt-datetime-picker
        ref="picker"
        type="date" 
        v-model="pickerValue"
        :startDate.sync = 'startPicker' 
        :endDate.sync = 'endPicker'
        @confirm="handleConfirm">
      </mt-datetime-picker>
      <!--日期选择器-->
    </div>
  <!--底部按钮-->
    <div class="stepact" >
        <a href="javascript:void(0);" class="loginact btn-gradient" @click="tosubmit">提交</a>
    </div>
    <!--底部按钮==end===-->
  </div>
</template>

<script>
  import API from '../../api/API'
  const api = new API();
  import $jquery from 'jquery'
  import { MessageBox,Indicator,Toast,DatetimePicker  } from 'mint-ui'
  import {hideaddress} from '../../assets/js/BaseJS.js'
  export default {
    name: 'orderMsg',
    data () {
      return {
        openid:'', // openid
        pickerValue:'1990-1-1',// 时间picker默认显示值
        startPicker:new Date(new Date().getFullYear() - 120, 0, 1),//picker开始时间
        endPicker:new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),// picker结束时间
        maxage:'',// 生日最大年龄
        parentOrgName:'',// 体检机构
        orgName:'',// 体检站点
        orgSvcPkgNameAs:'',// 体检套餐
        bookDate:'',// 预约时间
        cardInfo:{},// 卡信息对象
        user:{"contName":"","contGenderCd":"M","isMarrage":"0","birthDate":"请选择","mobilePhone":"","cardTypeCd":"1","cardTypeName":"身份证","cardNo":"","relationship":"","relatName":"请选择"},//输入信息对象
        showType:false,// 是否显示证件类型弹层
        typeArr:['请选择','身份证','护照','军官证','驾驶证'],// 配置证件类型
        showRelat:false,// 是否显示与本人关系弹层
        relatList:['请选择','本人','配偶','父母','子女','其他'],// 配置与本人关系
        relatList1:['请选择','本人','父母','子女','其他'],// 未婚与本人关系
        nameflag:false,// 姓名校验状态
        phoneflag:false,// 电话号码校验状态
        cardNoflag:false,// 证件号码校验状态
        birthflag:false,// 生日校验状态
      }
    },
    beforeCreate () {document.title = '录入基本信息'},
    created () {
      var uInfo = JSON.parse(sessionStorage.getItem('uInfo'));
          this.openid = uInfo.id;// session中取出openid
    },
    mounted () {
      hideaddress();// 隐藏微信分享菜单
      this.fillMsg ();
      this.scrollAction();
    },
    methods: {
      // 修改体检机构
      backAction:function(cur){window.location.href = '#/order/osGover?mod&'+cur;},
      // 修改预约时间
      dateBack:function(cur){window.location.href = '#/order/dateCheck?mod&'+cur;},
      // 验证姓名
      nameBlur:function(){
        var name =this.user.contName;
        name = $jquery.trim(name);// 取出姓名值两边的空格
        if(name==""){
          Toast({ message: '请输入您的姓名',duration: 1000,className:'mToast'})
          $jquery('.contName').addClass('blur');
          this.nameflag =  false;
        }else{
          this.nameflag =  true;
          var reg_name = /^[^0-9]{1,10}$/
          if(!(reg_name.test(name))){
            Toast({ message: '请输入正确的姓名',duration: 1000,className:'mToast'})
            this.nameflag = false;
            $jquery('.contName').addClass('blur');
          }else{
            this.nameflag =  true;
            $jquery('.contName').removeClass('blur');
          }
        }
      },
      // 页面滚动隐藏fixed按钮
      scrollAction:function(){
        $jquery('.cardNo').bind('focus',function(){  
            $jquery('.stepact').css('position','static');  
        }).bind('blur',function(){  
            $jquery('.stepact').css({'position':'fixed','bottom':'0'});  
        });  
      },
      // 验证手机号
      phoneBlur:function(){
        var phone =this.user.mobilePhone;
        phone = $jquery.trim(phone);
        if(phone==""){
          Toast({ message: '请输入您的手机号码',duration: 1000,className:'mToast'})
          $jquery('.phone').addClass('blur');
          this.phoneflag= false; 
        }else{
          if(!(/^1[34578]\d{9}$/.test(phone))){ 
              Toast({ message: '请输入正确的手机号码',duration: 1000,className:'mToast'})
              this.phoneflag= false; 
              $jquery('.phone').addClass('blur');
          } else{
              this.phoneflag = true;
              $jquery('.phone').removeClass('blur');
          }
          
        }
      },
      // 验证证件号码
      cardNoBlur:function(){
        var cardNo =this.user.cardNo;
        cardNo = $jquery.trim(cardNo);
        var type = this.user.cardTypeCd;// 证件类型
        if(cardNo==""){
          Toast({ message: '请输入您的证件号码',duration: 1000,className:'mToast'})
          $jquery('.cardNo').addClass('blur');
          this.cardNoflag= false; 
        }else{
          if(type==1 || type==4){// 证件类型所对应号码为身份证号
            if(this.valiIDCard(cardNo)){
              this.cardNoflag = true;
              this.user.birthDate = cardNo.slice(6,10)+"-"+cardNo.slice(10,12)+"-"+cardNo.slice(12,14);
              this.valibirthday();
              var sexid = cardNo.slice(16,17)
              if(parseInt(sexid)%2 ==1){
                this.user.contGenderCd="M";
              }else{
                this.user.contGenderCd="F";
              }
              $jquery('.cardNo').removeClass('blur');
            }else{
              Toast({ message: '请输入正确的证件号码',duration: 1000,className:'mToast'})
              $jquery('.cardNo').addClass('blur');
              this.cardNoflag= false;
            }
          }
          var reg;
          if(type==0 || type==''){
            Toast({ message: '请先选择证件类型',duration: 1000,className:'mToast'});
            return false;
          }else if(type==2 ||type==3){
            reg=/^[a-zA-Z0-9]{1,}$/
            if(!reg.test(cardNo)){ 
              Toast({ message: '请输入正确的证件号码',duration: 1000,className:'mToast'})
              $jquery('.cardNo').addClass('blur');
              this.cardNoflag= false; 
              } else{
                this.cardNoflag = true;
                $jquery('.cardNo').removeClass('blur');
              }
          }
        }
      },
      //身份证号码验证
      valiIDCard:function(idCard) {
          var idNumber = idCard;
          //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
          //是否为空
          if (idNumber == null || idNumber == "") {
            /*blockMsg("请输入身份证号码，身份证号码不能为空");*/
              return false;
          }
          //检查号码是否符合规范，包括长度，类型
          if (!reg.test(idNumber)) {
              /*blockMsg("您输入的身份证号码不正确，请重新输入");*/
              return false;
          }
          var vcity = {
              11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
              21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
              33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
              42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
              51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
              63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
          };
          //取身份证前两位,校验省份
          if (!vcity[idNumber.substr(0, 2)]) {
            /*blockMsg("您输入的身份证号码不正确，请重新输入");*/
              return false;
          }
          //检查生日是否正确
          var len = idNumber.length;
          //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
          if (len == 15) {
              var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
              var arr_data = idNumber.match(re_fifteen);
              var year = arr_data[2];
              var month = arr_data[3];
              var day = arr_data[4];
              var birthday = "19" + year + "/" + month + "/" + day;
              var birthday_date = new Date(Date.parse(birthday));
              var now = new Date();
              var now_year = now.getFullYear();
              //年月日是否合理
              //判断年份的范围（3岁到100岁之间)
              var time = now_year - birthday_date.getFullYear();
              if (time >= 3 && time <= 100 && (birthday_date.getMonth() + 1) <= 12 && birthday_date.getDay() <= 31) {
              } else {
                /*blockMsg("您输入的身份证号码不正确，请重新输入");*/
                  return false;
              }
          }
          //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
          if (len == 18) {
              var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
              var arr_data = idNumber.match(re_eighteen);
              var year = arr_data[2];
              var month = arr_data[3];
              var day = arr_data[4];
              var birthday = year + "/" + month + "/" + day;
              var birthday_date = new Date(Date.parse(birthday));
              var now = new Date();
              var now_year = now.getFullYear();
              //年月日是否合理
              //判断年份的范围（3岁到100岁之间)
              var time = now_year - birthday_date.getFullYear();
              if (time >= 3 && time <= 100 && (birthday_date.getMonth() + 1) <= 12 && birthday_date.getDay() <= 31) {
              } else {
                /*blockMsg("您输入的身份证号码不正确，请重新输入");*/
                  return false;
              }
          }
          //校验位的检测
          //15位转18位
          if (len == 15) {
              var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
              var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
              var cardTemp = 0, i;
              idNumber = idNumber.substr(0, 6) + '19' + idNumber.substr(6, len - 6);
              for (i = 0; i < 17; i++) {
                  cardTemp += idNumber.substr(i, 1) * arrInt[i];
              }
              idNumber += arrCh[cardTemp % 11];
          }
          if (len == 18) {
              var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
              var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
              var cardTemp = 0, i, valnum;
              for (i = 0; i < 17; i++) {
                  cardTemp += idNumber.substr(i, 1) * arrInt[i];
              }
              valnum = arrCh[cardTemp % 11];
              if (valnum.toLowerCase() == idNumber.substr(17, 1).toLowerCase()) {
              } else {
                /*blockMsg("您输入的身份证号码不正确，请重新输入");*/
                  return false;
              }
          }
          return true;
      },
      // 打开日期选择器
      datePicker:function(){
         this.$refs.picker.open();
      },
      // 选中picker日期
      handleConfirm:function(curdate){
        var year = curdate.getFullYear();
        var mon = curdate.getMonth()+1;
        var day = curdate.getDate();
        var type = this.user.cardTypeCd;
        if(type==2 || type==3){
          this.user.birthDate = year+"-"+mon+"-"+day
        }
      },
      // 验证生日
      valibirthday:function(){
        var birth = this.user.birthDate;
        birth = $jquery.trim(birth);
        var d=new Date();// 日期对象
        var y = d.getFullYear(); // 当前年
        var mon = d.getMonth()+1;// 当前月
        var day = d.getDate();// 当前日
        var age =y - birth.split("-")[0];// 年龄
        if(birth==''){
          this.birthflag = false;
          $jquery('.birth').addClass('blur');
          Toast({ message: '请选择生日',duration: 1000,className:'mToast'})
        }
        if(age < 18){// 小于18岁
          Toast({ message: '温馨提示：未满18周岁的用户无法参加体检，请您再次确认体检人是否已满18周岁',duration: 2000,className:'mToast'})
          $jquery('.birth').addClass('blur');
          this.birthflag = false;
        }else if(age ==18){ // 等于18岁
          // 判断月份
          var bm = mon-birth.split("-")[1];
          if(bm < 0){
            Toast({ message: '温馨提示：未满18周岁的用户无法参加体检，请您再次确认体检人是否已满18周岁',duration: 2000,className:'mToast'})
            this.birthflag = false;
            $jquery('.birth').addClass('blur');
          }else if(bm == 0){
            // 判断日期
            var bd = day-birth.split("-")[2];
            if(bd < 0){
              Toast({ message: '温馨提示：未满18周岁的用户无法参加体检，请您再次确认体检人是否已满18周岁',duration: 2000,className:'mToast'})
              this.birthflag = false;
              $jquery('.birth').addClass('blur');
            }else{
              this.birthflag = true;
                $jquery('.birth').removeClass('blur');
            }
          }else{ //大于18岁
            this.birthflag = true;
            $jquery('.birth').removeClass('blur');
          }
        }else{
          this.birthflag = true;
          $jquery('.birth').removeClass('blur');
        }
      },
      // 填充页面
      fillMsg: function () {
        var cardInfo = sessionStorage.getItem('cardInfo');
            cardInfo = JSON.parse(cardInfo);
        var d =new Date();// 日期对象
        this.maxage = (d.getFullYear()-10)+'-'+(d.getMonth()+1)+'-'+d.getDate();
        let that = this;
        if(cardInfo){// 存在卡信息session
          that.cardInfo = cardInfo;
          // 选择体检城市
          if(cardInfo.City){
            that.cardInfo.City = cardInfo.City;
            // 选择体检机构
            if(cardInfo.Gover){
              that.cardInfo= cardInfo;
              that.parentOrgName = cardInfo.Gover.parentOrgName;
              that.orgName= cardInfo.Gover.orgName;
              that.orgSvcPkgNameAs = cardInfo.Gover.orgSvcPkgNameAs;
              // 选择体检时间
              if(cardInfo.myTime){
                that.cardInfo= cardInfo;
                //review bookDate eg:2017-9-08为2017-09-08   20170913 by kyy
                var bookDate = cardInfo.myTime.bookDate;
                var bookDateArr = bookDate.split('-');
                if(bookDateArr[1].length<2)bookDateArr[1]="0"+bookDateArr[1];
                if(bookDateArr[2].length<2)bookDateArr[2]="0"+bookDateArr[2];
                that.bookDate = bookDateArr.join('-');
                //that.bookDate = cardInfo.myTime.bookDate;
                
              }else{// session中不存在预约时间信息
                MessageBox({title: '温馨提示',message: '您还没有选择预约时间，前往选择',
                    showCancelButton: true,showCancelButton: false
                }).then(action => {window.location.href = "#/order/dateCheck";});
              }
            }else{// session中不存在体检机构信息
              $jquery(".orderMsg").hide();
              MessageBox({title: '温馨提示',message: '您还没有选择体检中心，前往选择',
                  showCancelButton: true,showCancelButton: false
              }).then(action => { window.location.href = "#/order/osGover";});
            }
          }else{// session中不存在城市信息
            $jquery(".osGover").hide();
            MessageBox({title: '温馨提示',message: '您还没有选择体检城市，前往选择',
                showCancelButton: true,showCancelButton: false
            }).then(action => { window.location.href = "#/order/City";});
          }
        }else{// session中不存在卡信息
          MessageBox({title: '温馨提示',message: '您还没有选择体检卡',
              showCancelButton: true,showCancelButton: false
          }).then(action => { window.location.href = "#/order/UserManage";});
        }
      },
      // 性别男是否选中
      sexClickM: function(cur){
        let that =this;
          if(that.user.contGenderCd == ''){
            that.user.contGenderCd = cur;
          }else if(that.user.contGenderCd == 'M'){ // 取消男
            that.user.contGenderCd = '';
          }else if(that.user.contGenderCd == 'F'){ // 选中男
            that.user.contGenderCd = cur;
          }
      },
      // 性别女是否选中
      sexClickF: function(cur){
        let that =this;
          if(that.user.contGenderCd == ''){// 选中女
            that.user.contGenderCd = cur;
          }else if(that.user.contGenderCd == 'F'){ // 取消女
            that.user.contGenderCd = '';
          }else if(that.user.contGenderCd == 'M'){// 选中女
            that.user.contGenderCd = cur;
          }
      },
      // 已婚是否选中
      marreyClickY:function(cur){
        let that =this;
        if(that.user.isMarrage == ''){ // 选中已婚
            that.user.isMarrage = cur;
        }else if(that.user.isMarrage == '1'){ //取消已婚
            that.user.isMarrage = '';
          }else if(that.user.isMarrage == '0'){ // 选中已婚
            that.user.isMarrage = cur;
          }
      },
      // 未婚是否选中
      marreyClickN: function(cur){
        let that =this;
         if(that.user.isMarrage == ''){
            that.user.isMarrage = cur;
          }else if(that.user.isMarrage == '0'){
            that.user.isMarrage = '';
          }else if(that.user.isMarrage == '1'){
            that.user.isMarrage = cur;
          }
      },
      // 选择证件类型
      checkType: function(id,name){
        let that =this;
        that.user.cardTypeName=name;
        that.user.cardTypeCd = id;
        if(that.user.cardTypeCd==0 || that.user.cardTypeCd==''){
          Toast({ message: '请选择正确证件类型',duration: 1000,className:'mToast'})
        }
        that.showType = false;//关闭弹层
      },
      // 选择与本人关系
      checkRelat: function(id,name){
        let that =this;
        that.user.relatName = name;
        var relatArr = {'本人':'1','配偶':'2','父母':'3','子女':'4','其他':'5'}
        that.user.relationship = relatArr[name];
        if(that.user.relationship==undefined ||that.user.relationship==''){
          Toast({ message: '请选择正确关系',duration: 1000,className:'mToast'})
        }
        that.showRelat = false;// 关闭坦诚
      },
      // 提交页面信息
      tosubmit: function () {
        let that = this;
        var card = that.cardInfo;// 卡信息对象
        var user = that.user;// 用户输入信息对象
        if(user.cardTypeCd == 2 || user.cardTypeCd == 3){
          that.valibirthday() // 证件号非身份证号时，生日验证
        }
        // 判断填入的值是否为空
          if(user.contName=='' || user.contGenderCd=='' ||user.birthDate=='' ||user.isMarrage==''||user.cardTypeCd == ''||user.cardNo==''||user.relationship=='' || user.mobilePhone=='')
          {
            Toast({ message: '您有信息未填写完整，请补充',duration: 1000,className:'mToast'})
            return false;
          }
          var Gover =card.Gover; //判断机构是否为空
          if(that.parentOrgNo=='' ||that.parentOrgName=='' ||that.orgSvcPkgNoAs=='' ||that.orgSvcPkgNameAs=='' ||that.orgNo=='' ||that.orgName=='')
          {
            MessageBox({title: '温馨提示',message: '您还没有选择体检中心',showCancelButton: true, showCancelButton: false
            }).then(action => {window.location.href ='#/order/osGover'})
          }
          if(that.bookDate==''){//判断预约时间是否为空
            MessageBox({title: '温馨提示',message: '您还没有选择体检时间',showCancelButton: true,showCancelButton: false}).then(action => {
              window.location.href ='#/order/dateCheck'})
          }
         var isItself =''; // 是否为本人
          if(user.relationship==1){isItself =1;}else{ isItself =0;}
          if(that.openid == ''||that.openid == undefined){ // 判断openid是否为空
            MessageBox({title: '温馨提示',message: '您还没有登录体检中心，去登录吧',
              showCancelButton: true,showCancelButton: false
            }).then(action => { window.location.href = "#/order/UserManage";});
            return false;
        }
          var d =new Date();// 日期对象
          var submitDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); // 提交时间
          var year = d.getFullYear();var month = (d.getMonth()  + 1) < 10  ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);var day      = (d.getDate())  < 10 ? '0' + (d.getDate()) : (d.getDate());var hours    = (d.getHours()) < 10 ? '0' + (d.getHours()) : (d.getHours());var minutes    = (d.getMinutes()) < 10 ? '0' + (d.getMinutes()) : (d.getMinutes());var seconds  = (d.getSeconds()) < 10 ? '0' + (d.getSeconds()) : (d.getSeconds());
          // 创建时间
          var creatTime = year + "-" + month + "-" + d.getDate() + " " + hours + ':' + minutes + ':' + seconds;
          var param ={
                  "openid":that.openid,
                  "isItself":isItself,
                  "parentOrgNo":Gover.parentOrgNo,
                  "parentOrgName":Gover.parentOrgName,
                  "orgSvcPkgNoAs":Gover.orgSvcPkgNoAs,
                  "orgSvcPkgNameAs":Gover.orgSvcPkgNameAs,
                  "orgNo": Gover.orgNo,
                  "orgName":Gover.orgName,
                  "orgAddress":Gover.orgAddress,
                  "orgContactFixPhone":Gover.orgContactFixPhone,
                  "orgSvcPkgNoMa":card.orgSvcPkgNoMa,
                  "isCardUser":card.isCardUser,
                  "medicalCardNo":card.medicalCardNo,
                  "medicalCardPwd":card.medicalcardPwd,
                  "contName":user.contName,
                  "contGenderCd":user.contGenderCd,
                  "birthDate":user.birthDate,
                  "isMarrage":user.isMarrage,
                  "cardTypeCd":user.cardTypeCd,
                  "cardNo":user.cardNo,
                  "relationship":user.relationship,
                  "mobilePhone":user.mobilePhone,
                  "bookDate":that.bookDate,//card.myTime.bookDate, review bookDate 20170913 by kyy
                  "submitDate":submitDate,
                  "contId":"",
                  "reportAddress": "",
                  "operate_date":creatTime,
                  "create_date":creatTime
                 }
            if(that.openid && that.nameflag==true && that.phoneflag ==true&& that.cardNoflag==true && that.birthflag == true){
              MessageBox.confirm('点击【确定】则完成体检预约，且所有信息均不可更改，是否继续？','温馨提示').then(action => {
                Indicator.open({
                  text: '正在提交',
                  spinnerType: 'triple-bounce'
                });
                let response = api.submitAppointmentBaseInfo(param);// 调后台提交方法
                response.then(function(res){
                var data=res.data;
                  Indicator.close();
                  if(data.status=='1'){ // 请求成功数据处理
                    data = data.data;
                    MessageBox({title: '温馨提示',message: '您已成功预约体检！您也可以在“我的预约”模块中自助查询。稍后会将您的预约详情发送至您的手机，请注意查收。',
                      showCancelButton: true,
                      confirmButtonText:'完成',
                      showCancelButton: false
                    }).then(action => {window.location.href = '#/order/UserManage' });
                  }else{ // 显示报错信息
                    if(data.message){
                      Toast({message:data.message})
                      if(data.message.indexOf("预约成功") != -1){
                        setTimeout(function(){ window.location.href = '#/order/UserManage'},3000);
                      }
                    }else{
                      Toast({ message: '发生内部错误',duration: 2000,className:'mToast'})
                    }
                  }
                }).catch(function(err){ console.log(err);});
              })
            }else{
              if(that.openid =='' || that.openid==undefined){Toast({ message: '未获取openid，请先登录微信',duration: 1000,className:'mToast'})}
              if(that.nameflag==false){
                Toast({ message: '请输入正确的姓名',duration: 1000,className:'mToast'})
                $jquery('.contName').addClass('blur');
              }else if(that.phoneflag==false){
                Toast({ message: '请输入正确的手机号',duration: 1000,className:'mToast'})
                $jquery('.phone').addClass('blur');
              }else if(that.cardNoflag==false){
                Toast({ message: '请输入正确的证件号码',duration: 1000,className:'mToast'})
                $jquery('.cardNo').addClass('blur');
              }else if(that.birthflag==false){
                Toast({ message: '温馨提示：未满18周岁的用户无法参加体检，请您再次确认体检人是否已满18周岁',duration: 3000,className:'mToast'})
                $jquery('.birth').addClass('blur');
              }
            }
      },
    }
  }
</script>

<style stoped>
.mint-datetime-confirm{background:linear-gradient(to right,#56b0d8,#6f81e4);color:#fff}
.mint-datetime-cancel{color:#999}
.mint-cell-wrapper{background:0!important}
  /*婚否 性别*/
.radiobox{display:inline-block;width:100%;text-align:right;color:#666;margin-top:-15px;font-size:.667rem;position:relative;overflow:hidden}
.marrey{margin-bottom:5px}
.radiobox .label{position:absolute;left:0;bottom:.5rem}
.radiobox span{line-height:40px;padding:10px 0;display:inline-block}
.radiobox i.icon{display:inline-block;width:1rem;height:1rem;margin-right:.5rem;vertical-align:middle;background:url(../../assets/images/order/icond03.png) no-repeat 0 0;background-size:100%;background-position:0 -1px}
.radiobox i.check{background:url(../../assets/images/order/icond02.png) no-repeat 0 0;background-size:100%;background-position:0 -1px}
.alginright{position:absolute;right:0;width:48%;overflow:hidden;text-align:left}
.boy{width:48%;text-align:left}
.girl{width:3.5rem;position:absolute;right:0}
 /*婚否  性别===========end===============*/
.birth{position:relative;background:url(../../assets/images/order/icond05.png) no-repeat 0 0;background-size:18px 18px;background-position:95%}
.body{margin-bottom:3rem}
.orderUserList li{height:55px;padding-bottom:15px;overflow:hidden}
.orderMsg{background-color:#F8F8F8;height:calc(100% - 2.77rem)}
.mint-popup.mint-popup-middle{width:84%;border-radius:4px}
.blur{border:1px solid #ea3125!important}
.role{color:#5c9edc}
.mToast{font-size:.72rem;width:100%}
.stepact{display:block!important}
.relatType{top:50%!important;height:80%!important}
.cardTypebox,.relatType{width:90%;height:50%;margin:auto;background:#fff;display:none;position:absolute;top:50%;z-index:2000;z-index:100}
.typeList{background-color:#FFF;width:90%;margin:auto;border-radius:3px;padding-left:.833rem}
.typeList li{height:2.5rem;line-height:2.5rem;font-size:.67rem;color:#333;border-bottom:1px solid #eee}
  /*证件类型=======end====*/
  /*已有信息字体颜色修改*/
.mint-cell-title{color:#666;font-size:.667rem}
.mint-cell-value{color:#333;font-size:.667rem}
.mint-cell-allow-right::after{border:solid 1px #5c9edc;border-bottom-width:0;border-left-width:0;content:" ";top:50%;right:20px;position:absolute;width:7px;height:7px;-webkit-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg)}
/*已有信息字体颜色修改*/
  /*提示弹出框样式*/
.mint-msgbox-title{font-size:1rem;font-weight:700;padding-bottom:.5rem;color:#333;border-bottom:1px solid #ccc}
.mint-msgbox-message{color:#333;text-align:left;font-size:.667rem;line-height:1.5rem}
.mint-msgbox-cancel{color:#666;border-right:1px solid #ddd}
.mint-msgbox-confirm{color:#FFF;font-size:.833rem;background:linear-gradient(to right,#56b0d8,#6f81e4)}
/*提示框样式===end===*/
/*步骤导航修改*/
.line{display:inline-block;position:absolute;z-index:0;top:1.123rem;left:12%;width:75%!important;height:1px;background-color:#5c9edc}
  /*步骤导航修改===end===*/
  /*提示语*/
.tipsMsg{background-color:#F8F8F8;padding:.833rem .5rem;font-size:.55rem}
.tipsMsg p{margin:0;font-size:.55rem}
.tiph5{color:#5C9EDC}
.tiph5:before{content:' ';background-color:#000;content:" ";opacity:0;top:0;right:0;bottom:100px;left:0;position:absolute}
 /*提示语===end===*/
.clear{clear:both;overflow:hidden}
  /*输入列表===start===*/
.userinput{background-color:#FFF;margin-bottom:10px}
.cardtype{background:url(../../assets/images/order/ss01.png) no-repeat 0 0;position:relative;background-size:12px 7px;background-position:95% 45%}
fieldset{margin:0;padding:.35rem 1.1rem .75em;border:0;border-top:1px solid #e6e6e6}
legend{padding:0;border:0;color:#5c9edc;padding:.88rem .61rem}
.u_inputlist{width:100%;background-color:#FFF;padding:1rem 0;overflow:hidden}
.u_inputlist input{height:1.75rem;width:74%;line-height:1.75rem;margin-bottom:15px;padding:10px 15px;font-size:.667rem;border-radius:3px;border:1px solid #BBB;outline:0;color:#666;margin:0;float:right}
.inputbtn{line-height:0!important;padding:0!important;text-align:left!important;padding-left:15px!important;border:1px solid #BBB;color:#666}
.u_inputlist span.label{display:inline-block;font-size:.67rem;font-weight:500;margin-right:12px;text-align:left;color:#333}
span.label.sexlabel{line-height:.5rem}
input[name=birthday]:after{content:'';display:inline-block;width:1rem;height:1rem;background:url(../../assets/images/order/icond05.png) no-repeat 0 0;background-size:100% 100%;background-position:right}
 /*输入列表===end===*/
</style>