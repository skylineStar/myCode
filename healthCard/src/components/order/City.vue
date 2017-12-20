<!--@wyz
预约城市选择页面：1、手动选择体检城市；2、定位选择体检城市；3、搜索选择城市
  最后修改时间：2017.9.8
-->
<template>
    <div class="City">
      <div id='citymain'>
         <div class='fixedTop'>
      <!--步骤导航-->
          <div class='stepnav'>
           <ul class="steplist">
            <li class='txtnav'><span class='ws stepicon'><i class='wi ci'></i></span><p class='ctxt'>所在城市</p></li>
            <li class='txtnav'><span class='ws'><i class='wi'></i></span><p >体检地址</p></li>
            <li class='txtnav'><span class='ws'><i class='wi'></i></span><p >体检日期</p></li>
            <li class='txtnav'><span class='ws'><i class='wi'></i></span><p >基本信息</p></li>
           </ul>
           <div class='line'></div>
          </div>
        <!--步骤导航===end====-->
       <!--搜索框-->
        <div class='searchbox'>
          <i class="iconbox"></i>
          <input class='searchInput' type="search" v-model='searchWord' @focus="searchFoucus" @change='searchCity()' placeholder="查找城市">
          <a class='cancelbtn'@click='closeModal'>取消</a>
          </div>
        </div>
        <div class='modal'>
          <ul class="searchList">
            <li v-for='item in searchInfo' @click='checkCity(item,1)'>{{item.CITYNAME}}</li>
            <div class='notresult'>搜索结果<br />暂时没找到您想要的城市，请您重新输入</div>
          </ul>
        </div>
        <!--搜索框-->
        <!--城市列表===start====-->
        <div class="cityListArea">
          <div class="recommendCity">
            <p><img src="../../assets/images/order/icond04.png"/> 定位城市&nbsp;<span v-if='checkCityName'>:{{checkCityName}}</span></p>
          </div>
          <div class="mui-indexed-list-bar">
            <a><span onclick="javascript:document.getElementById('point_1').scrollIntoView(false)">A</span></a>
            <a><span onclick="javascript:document.getElementById('point_2').scrollIntoView(false)">B</span></a>
            <a><span onclick="javascript:document.getElementById('point_3').scrollIntoView(false)">C</span></a>
            <a><span onclick="javascript:document.getElementById('point_4').scrollIntoView(false)">D</span></a>
            <a><span onclick="javascript:document.getElementById('point_5').scrollIntoView(false)">E</span></a>
            <a><span onclick="javascript:document.getElementById('point_6').scrollIntoView(false)">F</span></a>
            <a><span onclick="javascript:document.getElementById('point_7').scrollIntoView(false)">G</span></a>
            <a><span onclick="javascript:document.getElementById('point_8').scrollIntoView(false)">H</span></a>
            <a><span onclick="javascript:document.getElementById('point_10').scrollIntoView(false)">J</span></a>
            <a><span onclick="javascript:document.getElementById('point_11').scrollIntoView(false)">K</span></a>
            <a><span onclick="javascript:document.getElementById('point_12').scrollIntoView(false)">L</span></a>
            <a><span onclick="javascript:document.getElementById('point_13').scrollIntoView(false)">M</span></a>
            <a><span onclick="javascript:document.getElementById('point_14').scrollIntoView(false)">N</span></a>
            <a><span onclick="javascript:document.getElementById('point_16').scrollIntoView(false)">P</span></a>
            <a><span onclick="javascript:document.getElementById('point_17').scrollIntoView(false)">Q</span></a>
            <a><span onclick="javascript:document.getElementById('point_18').scrollIntoView(false)">R</span></a>
            <a><span onclick="javascript:document.getElementById('point_19').scrollIntoView(false)">S</span></a>
            <a><span onclick="javascript:document.getElementById('point_20').scrollIntoView(false)">T</span></a>
            <a><span onclick="javascript:document.getElementById('point_23').scrollIntoView(false)">W</span></a>
            <a><span onclick="javascript:document.getElementById('point_24').scrollIntoView(false)">X</span></a>
            <a><span onclick="javascript:document.getElementById('point_25').scrollIntoView(false)">Y</span></a>
            <a><span onclick="javascript:document.getElementById('point_26').scrollIntoView(false)">Z</span></a>
          </div>
          <div class="cityListAZ">
            <ul class="cityItems" >
              <li :id='letterdata[index].id' v-for = '(items,index) in citydata' v-if='items.length > 0'>
                <div class="tiaoshi">{{letterdata[index].name}}</div>
                  <ol class="citiBlocks" >
                    <li v-for='item in items' @click='checkCity(item,2)' :id='item.CITY_ID'>{{item.CITYNAME}}</li>
                  </ol>
                  <div class="clear"></div>
              </li>
            </ul>
          </div>
        </div>
      <!--城市列表=====end===-->
      </div>
      <footer class="tologin" >
          <a href="javascript:void(0);" class="loginact btn-gradient" @click = 'nextAction'>下一步</a>
      </footer>
    </div>
</template>

<script type="text/javascript">
  import { Indicator,Toast,MessageBox } from 'mint-ui'
  import {requeryUsJS,hideaddress} from '../../assets/js/BaseJS.js'
  import {getPosition} from '../../assets/js/getLocation.js'
  import citydata from '../../assets/js/citydata.js'
  import $jquery  from 'jquery'
  export default {
    name: 'City',
    data () {
      return {
        checkCityName:'',// 所选城市
        searchWord:'',// 搜索关键字
        searchInfo:[],// 搜索信息选项
        localcity:'',// 定位城市
        citydata: citydata,// 城市数据对象
        letterdata:[],// 检索字母数组
        cardInfo:{},// 卡信息对象
        City:{} //  城市信息对象
      }
    },
    beforeCreate () {    document.title = '体检站点选择'    },
    created () {
      var cardInfo = sessionStorage.getItem('cardInfo');
          cardInfo = JSON.parse(cardInfo);
          this.cardInfo = cardInfo; //  获取cardsession对象
      var letterArr = [{'name':'A','id':'point_1'},{'name':'B','id':'point_2'},{'name':'C','id':'point_3'},{'name':'D','id':'point_4'},{'name':'E','id':'point_5'},{'name':'F','id':'point_6'},{'name':'G','id':'point_7'},{'name':'H','id':'point_8'},{'name':'I','id':'point_9'},{'name':'J','id':'point_10'},{'name':'K','id':'point_11'},{'name':'L','id':'point_12'},{'name':'M','id':'point_13'},{'name':'N','id':'point_14'},{'name':'O','id':'point_15'},{'name':'P','id':'point_16'},{'name':'Q','id':'point_17'},{'name':'R','id':'point_18'},{'name':'S','id':'point_19'},{'name':'T','id':'point_20'},{'name':'U','id':'point_21'},{'name':'V','id':'point_22'},{'name':'W','id':'point_23'},{'name':'X','id':'point_24'},{'name':'Y','id':'point_25'},{'name':'Z','id':'point_26'}]
      this.letterdata =letterArr; // 右侧字母索引数据
    },
    mounted () {
      hideaddress(); // 隐藏微信分享菜单
      this.fillPage(); // session判断
   },
  methods: {
    // 填充页面
    fillPage:function(){
      var cardInfo = sessionStorage.getItem('cardInfo');
          cardInfo = JSON.parse(cardInfo);
          this.cardInfo = cardInfo;
          var urlObj = {}
          if(cardInfo == null){ // cardInfo 的session不存在
            $jquery(".City").css({'display':'none'});
            MessageBox({
              title: '温馨提示',message: '您还没有选择体检卡，去选卡吧！',showCancelButton: true,showCancelButton:false
            }).then(action => { window.location.href = "#/order/UserManage" });
          }else{
            this.fillCity ();
            // 判断定位是否超时，若超时再重新定位
            var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
            if(qqlocation==null){this.location(); }
            if(qqlocation&&qqlocation.yesOrNo==1){
              var t=qqlocation.time;// 定位时间值
              var outtime=new Date().getTime()-t>600000?true:false; //数据缓存10分钟
            }
            if(!qqlocation||outtime) {// 未定位或定位超时
                this.location();
              }else{
                if(this.checkCityName)return;
                this.localcity= qqlocation.data1.city;
                this.City.latiude = qqlocation.data1.lat; // 纬度
                this.City.longitude = qqlocation.data1.lon; //经度
                if(this.localcity) this.findCity();// 匹配定位城市信息
              }
          }
    },
    // 选择城市后下一步操作
    nextAction: function(){
      var cardInfo = this.cardInfo;
      if(cardInfo.City){ 
        this.City = cardInfo.City;
        sessionStorage.setItem('cardInfo',JSON.stringify(cardInfo));
      }
      cardInfo.City =this.City;
      sessionStorage.setItem('cardInfo',JSON.stringify(cardInfo));
      window.location.href='#/order/osGover'
    },
    // 定位城市
    location:function(){ // 定位信息
      var that = this;
      requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',function(){
         getPosition(function(data){
           var ifGetLocation={"yesOrNo":1,"data1":data,"time":new Date().getTime()}
           sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation))
           if(that.checkCityName)return;
           that.localcity=data.city;
           that.City.latiude = data.lat; // 纬度
           that.City.longitude = data.lon; //经度
           if(that.localcity) that.findCity();
         })
      })
    },
    // 填充城市数据
    fillCity: function () {
        let that = this;
        var cardInfo =this.cardInfo;
        if(cardInfo.Gover){// 返回城市页面，置空已选机构信息
          cardInfo.Gover={}
        }
        if(cardInfo.myTime){// 返回城市页面，置空已选时间信息
          cardInfo.myTime={}
        }
        if(cardInfo.City){// 返回城市页面，添加已选城市样式
          var id = cardInfo.City.cityCd;
          $jquery("#"+id).addClass('checkCity');
          this.checkCityName = cardInfo.City.cityName;
          $jquery('.tologin').show();
        }
        if(that.checkCityName){
          $jquery('.tologin').show();
        }
    },
    // 点击选择城市
    checkCity: function (item,cur) {
        let that =this;
        var cardInfo = that.cardInfo;
        if(cardInfo.City){
          that.City = cardInfo.City;
        }
        var City =that.City;
        if(cardInfo){
          City.cityName = item.CITYNAME;
          City.cityCd = item.CITY_ID;
          that.checkCityName=City.cityName
        if(cur==2){ // 点击选择城市
          var id = item.CITY_ID;
          $jquery(".cityItems").find("li").removeClass('checkCity');
          $jquery("#"+id).addClass('checkCity');
           $jquery("#"+id).parent().scrollTop(20)
        }
        if(cur==1){  // 搜索选择城市
          $jquery('.modal').hide();
          $jquery("body").css({'overflow':"hidden",'position':'static'})
          $jquery('.searchInput').css({'width':'100%'});
          $jquery('.cancelbtn').hide();
          that.searchWord = "";
        }
        $jquery('.tologin').show();
      }
     },
    // 搜索城市 
    searchCity: function(){
      let that = this;
      var val = ''
      val = that.searchWord;
      if(/^[a-zA_Z]$/.test(that.searchWord.charAt(0))){
        console.log(that.searchWord.charAt(0).toLocaleUpperCase())
      }
      var arr = [];
      var localArr=[];
      for(var i=0,len=citydata.length;i<len;i++){
        var list = citydata[i]
        for(var j=0,l=list.length;j<l;j++){
          if(list[j].CITYNAME.indexOf(val)>=0){
              arr.push(list[j]);
          }
        }
      }
      if(that.searchInfo){
        that.searchInfo = arr;
      }else{
        that.searchInfo ==''
      }
      
      if(that.searchInfo.length==0){
        
        $jquery('.notresult').show();
      }else{
        $jquery('.notresult').hide();
      }
      $jquery('.modal').css({'display':'block'});
//    console.log(arr)
    },
    // 定位查找城市编码
    findCity:function(){
      var that=this
        var val = that.localcity;
        for(var i=0,len=citydata.length;i<len;i++){
//        console.log("第一层循环"+citydata)
          var list = citydata[i]
          for(var j=0,l=list.length;j<l;j++){
//          console.log("第二层循环"+citydata[i][j])
            if((list[j].CITYNAME).indexOf(val)!=-1){
                that.City.cityName = list[j].CITYNAME;
                that.City.cityCd = list[j].CITY_ID;
                that.checkCityName=list[j].CITYNAME;
                $jquery('.tologin').show();
//            console.log(that.City);
            }
        }
        }
      },
    // 搜索框聚焦
    searchFoucus: function(){
      $jquery('.searchInput').css({'width':'88%'});
      
      $jquery('.cancelbtn').show();
      $jquery(".modal").show();
      $jquery("body").css({'overflow':"hidden",'position':'fixed'})
    },
    // 关闭搜索弹层
    closeModal:function(){
      $jquery('.searchInput').css({'width':'100%'});
      $jquery('.modal').hide();
      $jquery('.cancelbtn').hide();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notresult{display:none;width:100%;padding:.83rem .67rem;font-size:.72rem;color:#333;line-height:1.5rem}
.cancelbtn{color:#5c9edc;position:absolute;right:12px;top:18px;font-size:14px;display:none}
.citymain{width:100%;padding-bottom:3rem}
.City{width:100%;height:calc(100% - 2.77rem)}
.modal{width:100%;height:100%;background:rgba(0,0,0,.5);display:none;position:absolute;top:7rem;z-index:100}
.searchList{background-color:#FFF;width:100%;position:absolute;top:0;z-index:100;padding-left:.833rem}
.modal li{height:2.5rem;line-height:2.5rem;font-size:.67rem;color:#333;border-bottom:1px solid #eee}
.tologin{display:none}
.stepnav{margin-bottom:0}
    /*搜索框*/
.searchbox{width:100%;padding:.58rem .833rem;min-height:2.9rem;background-color:#eaeaea;position:relative}
input.searchInput{margin:0;background-color:#fff;font-size:.67rem;text-align:left;border-radius:.11rem;padding-left:1.4rem}
.iconbox{display:block;width:11px;height:11px;background:url(../../assets/images/order/search.png) no-repeat 0 0;background-size:100%;position:absolute;top:1.2rem;left:1.2rem}
.checkCity{border:solid 1px #5c9edc!important;color:#5c9edc}
p{width:100%;margin:auto;margin-bottom:10px;color:#6f2502;font-size:.89rem;color:#333}
.line{display:inline-block;position:absolute;z-index:0;top:1.123rem;left:12%;width:12%!important;height:1px;background-color:#5c9edc}
    /*套餐列表===start====*/
.mealitems{width:100%;background-color:#FFF;padding:.833rem}
.mealitems .item a{display:block;font-size:.72rem;color:#333}
.mealitems .item:last-child{border:0}
   /*套餐列表===end====*/
   /*城市列表样式===start===*/
img{width:1rem;vertical-align:middle;margin-right:.22rem}
.mui-indexed-list-bar{width:3.5%;position:fixed;height:69%;z-index:10;right:0;top:28%;-webkit-transition:.2s}
.mui-indexed-list-bar a{display:block;text-align:left;font-size:.61rem;padding:0;margin:0;line-height:.83rem;color:#5c9edc!important}
.mui-indexed-list-bar.active{background-color:#c8c8c8}
.mui-indexed-list-bar.active a{color:#333}
.mui-indexed-list-bar.active a.active{color:#007aff}
.mui-content-bj{background:#fff!important}
.cityListArea{background:#fff!important;width:100%;height:auto;padding:0 4%;padding-bottom:3rem}
.recommendCity{width:100%;padding-top:10px;height:auto;border-bottom:solid 1px #eaeaea}
.recommendCity_list{width:100%;height:auto}
.recommendCity_list ul{width:100%;height:100%}
.recommendCity_list ul li{width:30%;height:60px;float:left}
.recommendCity_list ul li:nth-child(1){background:url(../../../static/img/recoCity1.png);background-size:100% 100%;margin-right:5%;margin-bottom:19px}
.recommendCity_list ul li:nth-child(2){background:url(../../../static/img/recoCity2.png);background-size:100% 100%;margin-right:5%;margin-bottom:19px}
.recommendCity_list ul li:nth-child(3){background:url(../../../static/img/recoCity3.png);background-size:100% 100%;margin-bottom:19px}
.recommendCity_list ul li:nth-child(4){background:url(../../../static/img/recoCity4.png);background-size:100% 100%;margin-right:5%;margin-bottom:19px}
.recommendCity_list ul li:nth-child(5){background:url(../../../static/img/recoCity5.png);background-size:100% 100%;margin-right:5%;margin-bottom:19px}
.recommendCity_list ul li:nth-child(6){background:url(../../../static/img/recoCity6.png);background-size:100% 100%;margin-bottom:19px}
.cityListAZ{width:100%;height:auto}
.cityListAZ ul{width:100%;height:100%}
.citiBlocks{width:100%;height:auto}
.citiBlocks li{font-size:.89rem;width:auto;height:36px;line-height:36px;text-align:center;float:left;display:inline-block;border:solid 1px #eaeaea;border-radius:3px;margin:1.5%;padding-left:3%;padding-right:3%}
    /*城市列表样式====end====*/
</style>