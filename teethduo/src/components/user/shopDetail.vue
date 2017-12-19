<!--微保渠道--门诊详情页面-->
<style>
	@import '../../assets/css/orderPro.css'

</style>
<template>
	<div class="shopDetail">
		<!--<img id="hidden_src" style="display:none;" src="../../assets/images/user/onerror.png">-->
			<div style="display:none;" class="imgTop"></div>
		<div class="shopDet">
			<div class="shop_banner">
				<mt-swipe :show-indicators="false">
					<!--<mt-swipe-item><img src="../../assets/images/user/banner.png" alt="" /></mt-swipe-item>-->
				 <mt-swipe-item v-if="imgSrc"><img :src="imgSrc"></mt-swipe-item><!--有图片时-->
				 <mt-swipe-item v-else><img src="../../assets/images/user/menzhen.jpg" alt="" /></mt-swipe-item><!--无图片时-->
				  
				  <!--轮播-->
				  <!--<mt-swipe-item><img src="../../assets/images/user/banner.png" alt="" /></mt-swipe-item>
				  <mt-swipe-item><img src="../../assets/images/user/banner.png" alt="" /></mt-swipe-item>-->
				  <!--<mt-swipe-item v-for = 'url in hosInfo.hospitalImgId' ><img :src="url" alt="" /></mt-swipe-item>-->
				</mt-swipe>
			</div>
			<div class="shop_name bgff">
				<p class="shop_n1">
					{{hosInfo.hospitalName}}
				<!--	//雅致齿科（学府路店）-->
				</p>
				<p class="shop_n2"> 
					综合评分<span class="shop_score" v-if="avgQuality !='--'">{{avgQuality}}<span><img v-if="true" v-for="n in parseInt(avgQuality)" src="../../assets/images/user/star2.png" alt="" /><img  v-if="avgQuality.charAt(2)>'4'" src="../../assets/images/user/helf.png" alt="" /><img v-if='true' v-for="n in 5-Math.round(parseFloat(avgQuality))" src="../../assets/images/user/star1.png" alt="" /></span></span><span class="shop_score" v-if="avgQuality =='--'"><p class='gang'></p><p class='gang ganglast'></p><span><img  v-for="n in 5" src="../../assets/images/user/star1.png" alt="" /></span></span>
				</p>
				
			</div>
			<p class="order_line"></p>
			<div class="shop_cell bgff">
				<div class="b_address b_address1">
						<p class="ad_txt posi_re">
							<img class="posi_ab" src="../../assets/images/user/order_icons2.png" alt="" />
							{{hosInfo.hospitalAddr}}
							<!--大冲一路华润置地大厦E座23A（地铁1号线高新园B 出口）-->
						</p>
					<p class="dh_img"></p>
					<p class="shop_guide" @click="topage">
						<span class="daoh">导航去</span><span class="shop_km" v-show="distance"><span v-if="distance<=100">{{distance}}</span><span v-else>&gt;100</span>km</span></p><!--是否有定位-->
					
				</div>
				<p class="line_p"></p>
				<div class="remind_container">
					<div class="b_date b_date01" >
						<p class="date_txt date_txt01">
							<img class="posi_ab" src="../../assets/images/user/order_icons.png" alt="" />
							门诊时间: <span>{{hosInfo.hospitalRule}}</span>
						</p>
						<!--<p class="date_extra">周四休息</p>-->
					</div>
				    <div class="div_remind">
				      <div class="t_remind">
				      	<span class="triangle-up"></span><!--箭头样式-->
				      	1.请在门诊工作时间内提交预约订单，诊所将在30分钟内回复，并在一小时内完成订单处理。<br />2.如您在非工作时间提交订单，诊所将在第二日完成订单处理
				      </div>
				    </div>
				    <span class="sp_remind" @click="remind()"></span>
				</div>
			</div>
			<p class="order_line"></p>
			<div class="shop_tap bgff">
				<span  class="shop_tap1 active">
					服务详情
				</span>
				<span class="shop_tap2">
					评价
				</span>			
			</div>
			<div id="shop_t1">
				<ul class="ser ser01">
					{{hosInfo.hospitalDes}}
					<!--<li  v-for="p in serInfo">{{p}}</li>无服务信息时，为默认值-->				
				</ul>
			</div> 
			<div class="e_detail padd_shop1" id="shop_t2" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
				<div v-if='status == 1' style='-webkit-overflow-scrolling:touch;' ><!--有评价时	-->	
				<!--loadMore-->
		        <!--<mt-loadmore :autoFill=false  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"  bottomPullText='上拉加载'>-->
		          <div >
					<!--<div v-for = '(item,index) in items'>-->
						<div v-for = '(item,index) in items'>
						<div class="area bgff" :id="index"><!--评价模块-->
							<div class="de_header">
							<img class="touxiang" src="../../assets/images/user/touxiang01.jpg" v-if="item.sex=='F'" alt="" /> <!--//女头像-->
							<img class="touxiang" src="../../assets/images/user/touxiang02.jpg" v-else alt="" />
							<div class="de_left">
								<p class="de_name" v-if="item.name">{{item.name}}</p>
								<p class="de_name" v-else>游客</p>
								<p class="de_num de_num01">
									<span>评分</span><span v-if="item.avg_evaluate" class="pos_rel">
										<img v-if='true' v-for="n in parseInt(item.avg_evaluate)" src="../../assets/images/user/star2.png" alt="" /><img  v-if="item.avg_evaluate.charAt(2)>'4'" src="../../assets/images/user/helf.png" alt="" /><img v-if='true' v-for="n in 5-Math.round(parseFloat(item.avg_evaluate))" src="../../assets/images/user/star1.png" alt="" />	
									</span>
									<span v-else class="pos_rel">
										<img v-for="n in 5" src="../../assets/images/user/star1.png" alt="" />
									</span>
								</p>
							</div>
							<div class="de_right">
								{{(item.createTime).substr(0,10).replace(/\-/g, ".")}}   <!--//转变时间格式-->
							</div>
						</div>
						<div class="d_body padl">
						<div class="de_txt">
							{{item.content}}
						<!--	态度超级好，无论前台还是医生，每次看牙科都不自觉的紧张，有温柔细心的医生，至少心理建设起来了，放松很多。做洗牙和冷光，洗牙的全-->
						</div>
						<div class="debody_img" v-show="item.fileArray">
							<div v-for="(p,i) in item.fileArray"  class="img_over img_over01" :data-i='i'>
								<div v-show="p.fileResourceId" class="img_sre">
									<img  class="img_src"  :src="p.fills">	
									<!--<img  class="img_src"  :src="p.fillsrc" @error="'javascript:this.src='+errImg+';'">-->	
								</div>
							</div>

						</div>
						</div>	
						</div>					
						<p class="order_line"></p>
					</div>
			          </div>
			        <div v-show="loading" slot="bottom" class="loading"> 
			        	<!--<mt-spinner :size='25' color="#26a2ff" type="fading-circle"></mt-spinner>-->
			        	加载中...
			      	</div>
			        <div v-show="lastPage" class="lastPage"> 
			        	已经是最后一页了
			      	</div>
		        <!--</mt-loadmore>-->
				</div>	
				<div v-else class="area"></div><!--无评价时-->
			</div>
		<!--	<p class="order_line"></p>-->
			<div class="shop_footer" @click="goOrder" v-show="isOrder">
				<p >立即预约</p>
			</div>
			
		</div>
		<!--<mt-popup v-model="popupVisible" position="middle" >-->
			<div class='pic_fix' style="display: none;">
				<!--<mt-swipe :show-indicators="true"  :auto="0"  @change="handleChange" >-->
					<mt-swipe v-if="isshow" :show-indicators="false"  :auto="0"  @change="handleChange" :defaultIndex='indexnow'>
					  	 <mt-swipe-item v-for='s in fillsrc' :key='s.id' style='display:flex'>
					  	 	 <img :src="s" >
					  	 </mt-swipe-item>
					</mt-swipe>
				<div class="chahead">
					<div class="cha"></div>
					<div class='sw_index'>
						<span class="hindex"></span>/<span class="mintleng"></span>
					</div>
				</div>
			</div>
		<!--</mt-popup>-->
		<div class="remind_modal" style="display:none;">
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import {Toast,Swipe,SwipeItem,Indicator,MessageBox,Spinner,InfiniteScroll} from 'mint-ui';
	import {requeryUsJS} from '../../assets/js/BaseJS.js'
	import {getPosition} from '../../assets/js/getLocation.js'
	import { config_param } from '../../assets/js/config_param';
	import API from '../../api/API';
  	const api = new API();
	export default {
		data () {
			return{
				popupVisible:false,//大图预览弹层
				distance:'',//定位距离
				avgQuality:'0',//评分
				hosInfo:{} ,       //门诊详情
				hosVal:'' ,//评价列表
			 	serInfo:[], //服务详情
			 	imgSrc:'' , //门诊图片地址
			 	isOrder:true,
			 	localMsg:'',//定位信息
			 	config_param:config_param,
		        status:'',// 查询结果状态
		        fills:[],// 图片src数组
		        errImg:"/#/assets/images/user/onerror.png",
		        fillsrc:[],
		        hanindex:'',
		        mintleng:'',
		        indexnow:0,
		        isshow:false,//大图预览前先清空swipe组件
		        backTime:-1,
		        items:[],// 页面展示数组
		        loading:false,
		        currentPage:1,
		        loadAll:false,
		        tapValue:true,
		        lastPage:false
			}
		},
		beforeCreate () {document.title = '门诊详情';
		},
		destroyed(){$('#app,body').css({'height':'100%'})},
		beforeRouteLeave:(to, from, next) => {
	  	var pic= $('.pic_fix')?$('.pic_fix').css("display"):"";
	  	var remind= $('.div_remind')?$('.div_remind').css("display"):"";
    	if(pic&&pic!='none'){//关闭弹出层 &&diswrap=='block'
			$('.pic_fix').hide();
			//解决Android大图预览点击物理返回回到评价顶部问题
			var u = navigator.userAgent;
	        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			next(false);
			document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
    		if(isAndroid){
	          	var top=$('.imgTop').html();//取出点击大图的位置
				setTimeout(function(){
					$(document).scrollTop(top); 
				},10);
//				return document.getElementById(index).scrollIntoView(true);
	        }
    	}else if(remind&&remind!='none'){//关闭弹出层
			$('.remind_modal,.div_remind').hide();
			next(false);
			document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
    	}else{
    		var mapRouter=sessionStorage.getItem('mapRouter')||"";
    		var toMap="";
		  	if(mapRouter){ mapRouter=JSON.parse(mapRouter);toMap=mapRouter.toMap}
		  	if(toMap=='0'){//此情况为从地图返回
		  		var backTime=mapRouter.backTime;
		  		sessionStorage.removeItem('mapRouter')
		  		history.go(backTime);
		  	}else{
		  		next();
		  	}
			}
    },
		mounted () {
			this.addTap();
			//this.locationSession();//查看是否有未过期的缓存定位信息
	    	this.init();
	    	this.showBigPic();	    	
	    },
	    methods: {
	    	anios: function() { //判断移动设备，更改样式
		        var u = navigator.userAgent;
		        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		        if(isAndroid){
		          $('.shopDetail').css({'position':'absolute','bottom': '0','left':'0'})
		        }
	      },
	    	loadMore() {
	    	  if(this.loadAll||this.tapValue||!this.status)return;
	    	  var that=this;
			  ++that.currentPage;
			  //alert('下拉次数'+that.currentPage);
			  	that.loading = true;
//			  	做分页以后的处理方式start
				var params={
				  "pageActionIn": {
				    "currentPage": that.currentPage,
				    "rowsPerPage": "5"
				  },
				  "retrieveArgs": {
				    "doctorId": that.orderInfo.doctorId,
				    "orgId":that.orderInfo.hospitalId,
				 	"channelType":sessionStorage.getItem('channelType')||''
				  }
				}
			  	that.fillValue(params);     //调取评价列表接口
			},
	    	handleChange:function(index){//发生事件
	    		this.hanindex = index+1
	    		$('.hindex').text(this.hanindex)
	    	},
	    	remind(){
	    		$(".remind_modal").css('display','block');
	    		$(".div_remind").css('display','block');
	    		//结束大图浏览
				$('.remind_modal').click(function(){
					$('.remind_modal').hide();
					$(".div_remind").hide();
				});
	    	},
	    	init:function(){
	    		var that=this;
	    		var orderInfo = sessionStorage.getItem('orderInfo');
	    		orderInfo = JSON.parse(orderInfo);
	    		//console.log(orderInfo);
    		  	this.orderInfo = orderInfo; //  获取ordersession对象
    		  	var doctorId = orderInfo.doctorId;  //获取医生Id
    		  	var hospitalId = orderInfo.hospitalId;  //获取医院Id		
					if(orderInfo.ifOrder){
						this.isOrder=false;      //隐藏立即预约按钮
					}	    		
				if(orderInfo.distance){this.distance= orderInfo.distance};  //获取定位距离										 
				var param={					
					  "retrieveArgs": {
					    "currentPage": "1",
					    "hospitalId":hospitalId,
					    "hospitalName": "",
					    "latiude": "",
					    "longitude": "",
					    "provCode": "",
					    "rowsPerPage": "1"
					  }
				}
				var param_v={
				  "pageActionIn": {
				    "currentPage": 1,
				    "rowsPerPage": "5"
				  },
				  "retrieveArgs": {
				    "doctorId": that.orderInfo.doctorId,
				    "orgId":that.orderInfo.hospitalId,
				 	"channelType":sessionStorage.getItem('channelType')||''
				  }
				}
		     	this.fillInfo(param);		 //调取门诊信息接口    	
		     	this.fillValue(param_v);     //调取评价列表接口，渲染第一页内容
		     	this.errImg=$('#hidden_src').attr('src')
	    	},
	    	addTap:function(){
	    		var that=this;
				$(".shop_tap1").click(function(){
					that.tapValue=true;//切换至服务详情时不触发loadmore
					$(this).addClass("active");
					$(".shop_tap2").removeClass("active");
					$("#shop_t1").css("display","block");
					$("#shop_t2").css("display","none");
				})
				$(".shop_tap2").click(function(){
					that.tapValue=false;//切换至评价时才触发loadmore
					that.anios();
					$('body,#app,.shopDetail').height('100%');
					$(this).addClass("active");
					$(".shop_tap1").removeClass("active");
					$("#shop_t2").css("display","block");
					$("#shop_t1").css("display","none");
				})
	    	},
	    	//大图浏览当前图片
	    	showBigPic(){
	    		var that=this;
				$('#shop_t2').on('click','.debody_img img',function(){
					that.isshow=false;//大图预览前先清空swipe组件
					var docTop=$(document).scrollTop();//存储点击大图的位置
					$('.imgTop').html(docTop);
					//点击时给当前图片索引值赋值
					that.indexnow=parseInt($(this).parents('.img_over').attr('data-i'));
					$('.pic_fix').show();
					//获得点击图片所在行的所有图片
					var imgs=$(this).parents('.debody_img').find('img');
					var len=imgs.length;
					var i=0;
					var imgarr=[];
					imgs.each(function(){
						i++;
						var src=$(this).attr('src')
						imgarr.push(src);
					});
					that.fillsrc=imgarr;
					setTimeout(function(){
						that.isshow=true;//显示swipe组件
						$('.hindex').text(that.indexnow+1);
						$('.mintleng').text(len);	
					},10);
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
				})
				//结束大图浏览
				$('.cha').click(function(){
					$('.pic_fix').hide();
					that.isshow=false;
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
				});
	    	},
    	  // 填充页面
		  fillInfo (param) {
		  	var that=this;
	        let response = api.getOrgListBySolr (param); // 调后台方法,与门诊列表统一接口后
	        response.then(function(res){
	          var data=res.data;
	          console.log(data);
	          if(data.status=='1'){
	          	var dataInfo=data.hospitalsBySolrResponseVoList[0];
	            that.hosInfo=dataInfo;
	            	setTimeout(function(){
	            		var h=$('.b_address').height();
	    				$('.dh_img').height(h);
	    				//服务详情被遮挡问题修改
	    				var s1=$('#shop_t1').height();
	    				var s2=$('#shop_t1').css('min-height');
	    				s1>s2.replace('px',"")?$('body,#app,.shopDetail').height('auto'):"";
	            	},10)
	            if(dataInfo.distance){that.distance= dataInfo.distance};//获取距离
	            if(dataInfo.avgQuality){that.avgQuality= dataInfo.avgQuality};  //获取评分	
        //调取图片接口
        		if(!(dataInfo.hospitalImgId&&dataInfo.hospitalId)){return;}
	            var pictureId=dataInfo.hospitalImgId;	
	            var hospitalId=dataInfo.hospitalId;		            
	            var p={"hospitalId":hospitalId,"pictureId":pictureId};
		        	let response = api.getPicture(p); // 调后台方法获取门诊图片
	              	response.then(function(res){
			          var data=res.data;
			          //console.log(data);
			          if(data.status=='1'){
			         	that.imgSrc=data.picture;	
			          }else{
			            if(data.message){  // 未成功返回数据Toast提示
			              console.log(data.message);
			            }else{
		              	console.log('发生内部错误');
			            }
			          }
			        })
			        .catch(function(err){
//			        	window.location.replace("#/common/errorPage");
			        });
			        
	          }else{
	          	window.location.replace("#/common/errorPage");//跳转至错误页面
	            if(data.message){  // 未成功返回数据Toast提示
              	console.log(data.message);
	            }else{
	              console.log('发生内部错误');
	            }
	          }
	        })
	        .catch(function(err){
//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
	        });
	      },
    	  // 渲染评价列表
		  fillValue (params) {
		  	var that=this;
	        let response = api.selectValuation(params); // 调后台方法
	        response.then(function(res){
	          var data=res.data;
	          if(data.status=='1'){
	          	that.status=1;
	            var allArr = data.selectValuationResponseVoList
	            var deimg_w,deimg_h;
	           var len = allArr.length
	            for(var i=0;i<len;i++){
	              var imgobj = allArr[i].fileArray;
	              if(imgobj !=null){
	                for(var j=0;j<imgobj.length;j++){
                  	imgobj[j].fileResourceId?that.fileId = imgobj[j].fileResourceId:allArr[i].fileArray[j]=[];
                    if(that.fileId !=null){
                      var src_url = config_param.base_path+'/webApp/ecm/common/'+that.fileId+'/default'
                      allArr[i].fileArray[j].fills=src_url;
                      var deimg = new Image();
                      deimg.src = src_url;
                      var src="";
                      deimg.onload = function(){
                      		  var out_hei = $('.img_sre').height();
							  var out_wid = $('.img_sre').width()
                              $('#shop_t2 .img_over img').css({'max-width':'none'});
                              $.each( $('#shop_t2 .img_over img'), function(i, n){
                                deimg_w = n.naturalWidth;//naturalWidth
                                deimg_h = n.naturalHeight;//naturalHeight
                                 if(deimg_w > deimg_h){
			                        n.style.width = 'auto';n.style.height = '100%';
			                        var img_wh = deimg_h/out_hei;
			                        var dewidth = deimg_w/img_wh;
			                        var dewh = '-'+(dewidth-out_wid)/2+'px';
			                        n.style.left = dewh
			                    }else{
			                        n.style.width = '100%';n.style.height = 'auto'
			                        var img_wh = deimg_w/out_wid
			                        var deheight = deimg_h/img_wh;
			                        var dewh = '-'+(deheight-out_hei)/2+'px';
			                        n.style.top = dewh
			                    }
                              });
                      };
                      
                    }
                  }
	              }
	              
	            }
            	//做分页start
            	var arrlen=allArr.length;
            	if(params.pageActionIn.currentPage==1){
            		that.items=allArr;
            		if(arrlen<5&&that.tapValue){
            			that.loadAll=true;
            			that.lastPage = true;
            		}
            	}else{
	            	setTimeout(() => {
				    for (let i = 0; i <arrlen; i++) {
				      that.items.push(allArr[i]);
				    }
				    that.loading = false;
				    if(arrlen<5&&params.pageActionIn.currentPage>0&&!that.tapValue){//最后一页
						that.lastPage = true;
						that.loadAll=true;
				    }
				  	}, 2500);	
            	}
			  	//做分页end
	          }else{
	            if(data.message){  // 未成功返回数据Toast提示
	              console.log(data.message);
	            }else{
	              console.log('发生内部错误');
	            }
	          }
	        })
	        .catch(function(err){
//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
	        });
	      },
	  
      goOrder:function(){
      	sessionStorage.removeItem('mapRouter');
	      window.location.href = "#/common/enterRouter?page="+encodeURIComponent("order/toOrder")
	  },
	    locationSession:function(){ 
		  	// 定位信息 
	    	var qqlocation=JSON.parse(sessionStorage.getItem('ifGetLocation'));
	    	if(qqlocation&&qqlocation.yesOrNo==1){
	    		var t=qqlocation.time;
	      	var outtime=new Date().getTime()-t>600000?true:false; //数据缓存10分钟  10*60*1000 1800000
	      	if(outtime){//若超时，删除session信息
	  				sessionStorage.removeItem('ifGetLocation');
	  				this.location();
	      	}else{//若不超时，读取session信息
				this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
	      	}
	    	}
	    },
        // 重新定位
	    location:function(){	      
	      var _this = this;
	      var ifGetLocation = {}; 
	      requeryUsJS('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',function(){
	         getPosition(
	          function(data){
	           console.log("------------成功--------------");
	            _this.localMsg = data;
	            _this.orderInfo.localFlag = true;
	           ifGetLocation={"yesOrNo":1,"data":data,"time":new Date().getTime()}
	           sessionStorage.setItem('ifGetLocation',JSON.stringify(ifGetLocation));
	         },
	         function(){
	          console.log("-----定位失败-----");
	          sessionStorage.setItem('ifGetLocation',JSON.stringify({"YoN":2}));
	         }
	         )
	      })
	    },
		topage:function(){  //腾讯地图接口
				//if(!this.localMsg)return Toast('没有获得门店地址信息');
				var lat="",lon="";
				if(this.localMsg){
					lat=this.localMsg.lat;
					lon=this.localMsg.lon;
				}
	    	var start={"lat":lat,"lon":lon,"addr":""};
	    	var end=this.hosInfo.hospitalLongitudeLatitude.split(",");
	    	var x=end[0],y=end[1];
	    	var dest={"eword":this.hosInfo.hospitalName,"epointx":x,"epointy":y}
	    	var addr=this.hosInfo.hospitalAddr;
		    var url = "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
			var u = navigator.userAgent;
		    if (u.indexOf('iPhone') > -1) {//苹果手机
			    	window.location.href=url
			}else{
			    var mapRouter=sessionStorage.getItem('mapRouter')||"";
		  		mapRouter?this.backTime=--JSON.parse(mapRouter).backTime:"";
			    sessionStorage.setItem('mapRouter',JSON.stringify({'backTime':--this.backTime,'toMap':'1','toMapURI':url,'title':'门诊详情','backURI':window.location.href}));
			    window.location.href='#/common/toMapEmpty';
		    }
	  	}
	}
}
</script>

<!--<style>
	@import '../../assets/css/orderPro.css'

</style>-->