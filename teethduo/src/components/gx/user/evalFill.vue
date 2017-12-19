<!--xurr
	个险内容：评价填写页面，以及评价完成查看页面
-->
<template>
	<div class="evalFill">	<!--评价、评价详情页面-->
		<div class="others">
			<div class="order_progress">
				<div class="order3">
					<img src="../../../assets/images/user/order3.png" alt="" />
				</div>
				<div class="order_txt">
					<span class="orders order_txt1">提交申请</span>
					<span class="orders order_txt2">预约成功</span>
					<span class="orders order_txt3">已完成</span>
				</div>
			</div>
			<div class="order_warn">
				<img src="../../../assets/images/user/order_icons1.png" alt="" />
				<p v-if="status=='1'||substatu=='1'">感谢您的服务评价</p>
				<p v-else>请对本次服务进行评价</p>
			</div>
			<p class="order_line"></p>
			<!-----------------评价完成页面------------------->
			<div class="evalDetail" v-if="status=='1'||substatu=='1'">
				<div class="b_orname">
					<img src="../../../assets/images/user/icon_service.png" alt="" />
					<p class="ad_name">{{objKey}}</p>
				</div>
				<div @click='teethUrl()'>
					<mt-cell class="nobd" title="口腔全景图"  is-link :value="cellValue"></mt-cell>
				</div>
				<p class="order_line"></p>
				<div @click="shopUrl" class="org_name">
					<mt-cell :title="orgName" is-link></mt-cell>
				</div>
				<div class="eval_detail heights">
					<div class="de_header">
						<img class="touxiang" v-if="selectValuaMsg.sex=='F'" src="../../../assets/images/user/touxiang01.jpg" alt="" />
						<img class="touxiang" v-else src="../../../assets/images/user/touxiang02.jpg" alt="" />
						<div class="de_left">
							<p class="de_name">{{selectValuaMsg.name}}</p>
							<p class="de_num">
								<span>评分</span><span v-if="selectValuaMsg.avg_evaluate" class="pos_rel1"><img v-if='true' v-for="n in parseInt(selectValuaMsg.avg_evaluate)" src="../../../assets/images/user/star2.png" alt="" /><img  v-if="selectValuaMsg.avg_evaluate.charAt(2)>'4'" src="../../../assets/images/user/helf.png" alt="" /><img v-if='true' v-for="n in 5-Math.round(parseFloat(selectValuaMsg.avg_evaluate))" src="../../../assets/images/user/star1.png" alt="" /></span><span v-else class="pos_rel1"><img v-for="n in 5" src="../../../assets/images/user/star1.png" alt="" />
								</span>
							</p>
						</div>
						<div class="de_right">
							{{selectValuaMsg.createTime.replace(/\-/g, ".")}}
						</div>
					</div>
					<div class="de_body body_hg">
						<div class="de_txt">
							{{selectValuaMsg.content}}
						</div>
						<div id="debody_img" class="debody_img">
							<div class="img_over" :data-i='i' v-for='(s,i) in fillsrc'>
					         <div class="img_srec">
					         	 <img :src="s" >
					         </div>
					        
					        </div>
						</div>
					</div>
				</div>
				<p class="order_line"></p>
				
			</div>
			<!----------------------评价填写----------------------->
			<div class="eval_fill" v-else>
				<div class="b_orname">
					<img src="../../../assets/images/user/icon_service.png" alt="" />
					<p class="ad_name">{{objKey}}</p>
				</div>
				<div @click='teethUrl()'>
					<mt-cell class="nobd" title="口腔全景图"  is-link :value="cellValue"></mt-cell>
				</div>
				<p class="order_line"></p>
				<div @click="shopUrl">
					<mt-cell :title="orgName" is-link></mt-cell>
				</div>
				<div class="eval">
					<div class="service sone">	
						<span>预约时效</span>
						<div class="evalimgs">
							<span class="star star1" v-for='(s,i) in starArr' @click='lightStar(i,this)' :id="s"></span>
						</div>
					</div>
					<div class="service stwo">	
						<span>诊所环境</span>
						<div class="evalimgs">
							<span class="star star1" v-for='(s,i) in starArr' @click='lightStar(i,this)' :id="s"></span>
						</div>
					</div>
					<div class="service sthree">	
						<span>服务质量</span>
						<div class="evalimgs">
							<span class="star star1" v-for='(s,i) in starArr' @click='lightStar(i,this)' :id="s"></span>
						</div>
					</div>
				</div>
				
				<div class="eval_content">
					<div class="eval_text">
						<textarea @focus="check()" v-model="textarea1" id="textarea" placeholder="你的评价对我们很重要..." name="" cols ="45"></textarea>
					</div>
					<!--图片提交-->
					<div class="eval_img">
					<!--element组件提交-->
						<div class="upload_pic">
							<span class="one_pic">
								<el-upload
								  :action="upURL"
								  list-type="picture-card"
								  :on-preview="handlePictureCardPreview"
								  :on-remove="handleRemove"
								  :on-success="newhandlesuccess"
								  :auto-upload = "showlist"
								  :before-upload="beforeAvatarUpload"
								  :multiple=true
							   	>
								<i class="el-icon-plus"></i>
							</el-upload>
							<!--upImgelem(n)//"https://jsonplaceholder.typicode.com/posts/"   upURL action="https://jsonplaceholder.typicode.com/posts/"-->
							<el-dialog :visible.sync="dialogVisible" size="tiny">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
								<!--<input accept="image/*" type="file" capture="camera" multiple="" class="add_img file_but">-->
							</span>
						</div>
						<!--element组件提交结束-->
					</div>
				</div>
				<div class="eval_btn" @click="evalLoading()">
					<input type="button" value="提交" class="claOK" @click="newSubmitForm">
				</div>
				<div class="divheight">	</div>
			</div>	
		</div>
		<div class="pic_fix" style="display:none;"><!--图片上传及上传后展示-->
			<mt-swipe v-if="isshow" :show-indicators="false"  :auto="0"  @change="handleChange" :defaultIndex='indexnow'>
				<mt-swipe-item v-for='s in fillsrc' :key = 's.id' style='display:flex'>
			  	 	 <img :src="s" >
			  	 </mt-swipe-item>
			</mt-swipe>
			<img src="" alt=""/>
			<div class="chahead">
				<div class="cha">
				</div>
				<div class='sw_index'>
					<span class="hindex"></span>/<span class="mintleng"></span>
				</div>
			</div>
			
			<div class="del_bg"><button class="del_ico"></button></div>
		</div>
	</div>
</template>

<script>
	import { Field,Toast } from "mint-ui";
	import { getUrl,changeWXImgURL } from '../../../assets/js/BaseJS.js';
	import {tkWX} from '../../../assets/js/wxConfig.js'
	import $ from 'jquery';
	import API from '../../../api/API';
	import config from '../../../api/config.js';
	import { config_param } from '../../../assets/js/config_param'
	import { Swipe, SwipeItem } from 'mint-ui';
	const api =new API();
	export default {
		data () {
			return{
				orderMsg:{},//查询预约详情
				evalMsg:{},//提交评价
				selectValuaMsg:{},//查询评价
				starArr:['1','2','3','4','5'],//星星评价
				textarea1:"",//文本
				i:"",//星星评价
				orderId:'',
				doctorId:'',
				orgId:'',//机构Id
				userId:'',fileId:'',//图片id
				orgName:'',//机构名称
				cellValue:'',//有无口腔图片的value
				startlg1:'',startlg2:'',startlg3:'' ,//星星评价
				status:'',//查询评价信息状态码
				substatu:'',//提交状态码
				curLength:'',fileImg:'',fillsrc:[],source:'',objKey:'',source2:'',hanindex:'',mintleng:'',
				indexnow:0,isshow:false,
				back_URIFlag:0,
				dialogImageUrl: '',
		        dialogVisible: false,
		        upURL:config_param.base_path+'/webApp/mpform/upload/ecmre',
		        imgFileList:[],
		        imageUrl:[],
		        showlist:'',
		        fillList:[]
			}
		},
		beforeCreate () {document.title = '评价';sessionStorage.setItem('back_ticketURI','1')
		  this.back_URIFlag = JSON.parse(sessionStorage.getItem('back_ticketURI'))
		},
		watch: {
		      back_URIFlag: function(newVal, oldVal) {
		        if (newVal === '1') {
		          WeixinJSBridge.call('closeWindow');
		        }
		      }
    		},
		beforeRouteLeave:(to, from, next) => {//物理键返回，路由离开
			var back_ticketURI = sessionStorage.getItem('back_ticketURI');
		    if(back_ticketURI){//返回卡券标记
		    	var pic= $('.pic_fix')?$('.pic_fix').css("display"):"";
		    	if(pic&&pic!='none'){//关闭弹出层 &&diswrap=='block'
					$('.pic_fix').hide();
					$('.others').show();
					next(false);
					//return;
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
				}else{
					back_ticketURI=JSON.parse(back_ticketURI);
			        if(back_ticketURI=='1'){//返回卡券
			            next(false);
			            sessionStorage.setItem('back_ticketURI','0');
//			            window.location.href=config_param.ticketURI; 
						window.location.href=encodeURI('http://js2ios/?param='+JSON.stringify({"functionname":"toothsevieceback","success":"onSuccess","error":"onError","args":["toothsevieceback"]}));
			        }else next();
				} 
		    }else next();
	  	},
		
		mounted () {
			this.onLoading();
			this.isEvalFull();
			tkWX.init({}); 
			this.optImg();
			var u = navigator.userAgent;
	        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	        /*position: absolute;top: 0;left:0;z-index:20;*/
	        if(isAndroid){
	          $('.evalFill').css({'position':'absolute','top': '0','left':'0'})
	        }
	      
	    },
	    methods: {
	    	handleChange:function(index){//发生事件
	    		this.hanindex = index+1
	    		$('.hindex').text(this.hanindex)
	    	},
	    	teethUrl:function(){
			sessionStorage.setItem('back_ticketURI','0');
	    		window.location.href = 'gxUser.html#/gx/user/teethImg'
	    	},
	    	shopUrl:function(){
	    		sessionStorage.setItem('back_ticketURI','0');
	    		sessionStorage.setItem('fromRouter',window.location.href);
	    		window.location.href = 'gxUser.html#/gx/user/shopDetail'
	    	},
	    	isEvalFull:function(){//是否完成评价
	    		var that = this;
	    		var link=window.location.href;
				var parseUrl = getUrl(link);
				that.orderId = parseUrl.orderId;
				that.orgId = parseUrl.orgId;
				var channel = parseUrl.channelType;
				var param = {
					"orderId":that.orderId,
					"channelType":channel
				}  
				var parResult = api.selectValuationByOrderId(param);
				parResult.then(function(res){
					var data = res.data
					that.status = data.status;
//					that.status = "2"
					if(data.status=="1"){
						$(".del_bg").hide();
						$('.chahead').show();
						that.selectValuaMsg = data.selectValuationResponseVo;
						var selecImg = that.selectValuaMsg.fileArray;
						if(selecImg!=null){
							that.fileImg = "";
							var deimg_w,deimg_h;
							var filarr = [];
							for(var n=0;n<selecImg.length;n++){
								var selecImgId = selecImg[n];
								that.fileId = selecImgId.fileResourceId;
								console.log(that.fileId);
								if(that.fileId!=null){
									that.fileImg +=  "<img src="+config_param.base_path+'/webApp/ecm/common/'+that.fileId+'/default'+"/>"
								}
								var src_url = config_param.base_path+'/webApp/ecm/common/'+selecImgId.fileResourceId+'/default'
								var deimg = new Image();
								deimg.src = src_url;
								deimg.onload = function(){
									var out_hei = $('.img_srec').height();
									var out_wid = $('.img_srec').width()
				                    $('#debody_img div img').css({'max-width':'none'});
				                    $.each( $('#debody_img div img'), function(i, n){
					                    deimg_w = n.naturalWidth
					                    deimg_h = n.naturalHeight
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
                				filarr.push(src_url)
	                			setTimeout(function(){
	                				that.fillsrc = filarr
	                			},10) 
							}
						}
						
					}else{
						$('.chahead').hide();
						$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
							$('.pic_fix').hide();
							$('.others').show();
						});
						return;
					}
				})
	    	},
	    	lightStar:function(i,t){//星星评价
	    		var sparent = $(event.target).parent();
	    		var i=event.target.id;
	    		this.i=i;
	    		if(i==1&&sparent.children('.star_light').length==1){
	    			sparent.children().eq(0).removeClass('star_light');return}
	    		sparent.children().removeClass('star_light');
	    		for(;i>0;i--){
	    			sparent.children('#'+i).addClass('star_light');
	    		}	
	    	},
	    	evalLoading:function(){//提交评价
	    		var that = this;
	    		var link=window.location.href;
				var parseUrl = getUrl(link);
				that.doctorId = that.orderMsg.doctorId;
				that.orderId = parseUrl.orderId;
				that.orgId = parseUrl.orgId;
				that.startlg1 = $('.sone .star_light').length;
				that.startlg2 = $('.stwo .star_light').length;
				that.startlg3 = $('.sthree .star_light').length;
	    		if(that.startlg1>0&&that.startlg2>0&&that.startlg3>0){
	    			if(that.curLength>=1){
		    			var fileArray=[];
		    			var fileId = that.imgFileList
//		    			var fsid = $('.eval_img .plus');
//		    			if(fsid){
			        		for(var j=0;j<fileId.length;j++){
			        			var ssid = fileId[j];
			        			fileArray.push({
							    	"fileIndex":j,"fileName":"pingjia","fileResourceId":ssid,"fileType":""
							    })
			        		}
							
//			        	}
						var param = {
							"content": this.textarea1,
							  "doctorId": that.doctorId,//url
							  "fileArray": fileArray,
							  "orderId": that.orderId,//url
							  "orgId": that.orgId,//url
							  "orgAddress":that.orderMsg.orgAddress,
							  "serviceAttitude": this.startlg1,//服务态度几星
							  "serviceEnvironment": this.startlg2,//几星
							  "serviceQuality": this.startlg3,//几星
							  "userId": that.userId//url身份证号
						}
						var parResult = api.valuationSave(param);
						parResult.then(function(res){
							var data = res.data;
							that.substatu = data.status;
							if(data.status=="1"){
								$(".del_bg").hide()
								that.evalMsg = data.valuationSaveResVo;
								that.isEvalFull();
								Toast ({
					    			className:'eval_btntxt',
									message: data.message,//'提交成功',
									iconClass:'eval_succ',
									position: 'middle',
									duration: 1000
								})
								$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
//									$('.pic_fix').hide();
//									$('.others').show();
								});
							}else{
								$('.chahead').hide();
							}
						})
			   		}else{
			   			Toast("最少一个字才能提交")
			   		}
	    		}else{
	    			Toast ({
						message: '请选择评价等级',//'提交成功',
						position: 'middle',
						duration: 1000
					})
		   		}
	    	},
			check:function(){ /*字数限制*/
				var u = navigator.userAgent;
		        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		        if(isAndroid){
		          $("html, body").animate({scrollTop: 150}, { duration: 500, easing: "swing" })
		        }
				this.curLength=$("#textarea").val().length;
	            if(this.curLength>140)
	            {
	                var num=$("#textarea").val().substr(0,140);
	                $("#textarea").val(num);
	                Toast("字数已超过上限")
	            }
       		},
       		
       		
       		
       		
       		handleRemove(file, fileList) {
		        console.log("handleRemove------------"+file, fileList);
		        console.log(file);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
			newSubmitForm () {
				console.log(this.imgFileList);
		    },
		    newhandlesuccess(res, rawFile) {
		    	this.imageUrl = URL.createObjectURL(rawFile.raw);
		      	var key=(res.uploadImageRequestVoList)[0].key;
				this.imgFileList.push(key);
				console.log(this.imgFileList.length+'---');
				if($('.one_pic .el-upload-list--picture-card .el-upload-list__item').length>2){
					$('.one_pic .el-upload--picture-card').hide()
				}else{
					$('.one_pic .el-upload--picture-card').show()
				}
				console.log($('.el-upload-list--picture-card .el-upload-list__item').length)
		    },
       		beforeAvatarUpload(file) {//showlist为false时调不起
		        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 4 ;
//		       for(var i=0;i<file.length;i++){
			       	this.fileList=[{name:file.name,url:file.uid}]
//		       }
		       
		       console.log(this.fileList)
			    if (!isJPG||!isLt2M) {//控制是否自动上传，保证符合大于4M条件时图片不回显
		    		Toast ({
		    			className:'imglist',
						message:'只能上传jpg/png文件，且不超过4M',//'提交成功',
						position: 'middle',
						duration: 1500
					})
			    	this.showlist = false
			    }else{
			    	this.showlist = true
			    }
			    this.showlist = true;//置为true，保证方法正常调用
		        return isJPG && isLt2M;
		    },
	  		optImg:function(){	//图片查看
		  		var t=this;
				//大图浏览当前图片
				var currOptImg;
				
				$('.others').on('click','.upload_pic img',function(){//
					t.indexnow=parseInt($(this).parents('.img_over').attr('data-i'));
					currOptImg=$(this);
					$('.pic_fix').show();
					$('.others').hide();
					$('.mint-swipe').hide();
					$('.pic_fix>img').attr('src',$(this).attr('src'));
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");  		
				});
				$('.others').on('click','.debody_img img',function(){//
					t.isshow=false;
					$('.pic_fix>img').hide();
					t.indexnow=parseInt($(this).parents('.img_over').attr('data-i'));
					currOptImg=$(this);
					$('.pic_fix').show();
					$('.others').hide();
					var mint_swarp =  $(this).parents('.debody_img').find('img');
					t.mintleng =mint_swarp.length;//获取当前元素中图片的总数
					setTimeout(function(){
						t.isshow=true;
						$('.hindex').text(t.indexnow+1);//获取当前图片进来的索引
						$('.mintleng').text(t.mintleng)
					},100)
					
					
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
				});
				
				//结束大图浏览
				$('.cha').click(function(){
					t.isshow=false;
					$('.pic_fix').hide();
					$('.others').show();
					document.getElementById('meta').setAttribute('content',"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");  		

				});
				//删除当前浏览的选择图片
				$('.pic_fix .del_bg').click(function(){
					currOptImg.parent().remove();
					$('.pic_fix').hide();
					$('.others').show();
					$('.pic_fix img').attr('src','');
//					console.log($('.el-upload-list--picture-card .el-upload-list__item').indexOf())
//					if($('.plus').length<3){$('.one_pic').show();}
					console.log(t.imgFileList.length)
					if($('.one_pic .el-upload-list--picture-card .el-upload-list__item.is-success').length>2){
						$('.one_pic .el-upload--picture-card').hide()
					}else{
						$('.one_pic .el-upload--picture-card').show()
					}
				});
	    	},
			  	//订单详情接口
		  	onLoading:function(){
				var that = this;
				var link=window.location.href;
				var parseUrl = getUrl(link);
				that.orderId = parseUrl.orderId//||'15785';
				var channel = parseUrl.channelType
				var param = {
				  "orderId":that.orderId, //截取URL
				  "channelType":channel//渠道类型
				}
				var parResult = api.selectOrder(param);
				parResult.then(function(res){
					var data = res.data;
					if(data.status=="1"){
						var ifOrder = true;
						that.orderMsg = data.data;
						that.orgName = that.orderMsg.orgName;
						that.doctorId = that.orderMsg.doctorId;
						that.userId = that.orderMsg.userId;
						that.userId?that.userId:that.userId = parseUrl.userId;
						that.source2 = that.orderMsg.commitService;//门诊确认的服务
						that.source = that.orderMsg.serviceType;//客户提交的服务类型
//						that.source!=1&&!that.source2$('.nobd').hide():$('.nobd').show();
						if(that.source!=1){
							$('.nobd').hide();
						}else if(that.source2&&that.source2!=1){$('.nobd').hide()}
						that.source?that.source:that.source = that.orderMsg.serviceType;
						var orderInfo;
						var uploadFlag = that.orderMsg.uploadFlag;
						var remark = that.orderMsg.remark;
						uploadFlag==0?that.cellValue = "等待门诊上传":uploadFlag==1?that.cellValue = "已上传，请查看":uploadFlag==2?that.cellValue = "已放弃":that.cellValue = "等待门诊上传";
						if(sessionStorage.getItem("orderInfo")){//判断是否已经存在此session
							orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
							orderInfo.ifOrder = ifOrder;
							orderInfo.doctorId = that.orderMsg.doctorId;
						}else{
							orderInfo = {'orderId':that.orderId,'uploadFlag':uploadFlag,'remark':remark,orderId:that.orderId,'ifOrder':ifOrder,'hospitalId':that.orderMsg.orgId,'doctorId':that.orderMsg.doctorId}
						}
						sessionStorage.setItem('orderInfo',JSON.stringify(orderInfo));
						var orderup = JSON.parse(sessionStorage.getItem("orderInfo"));
						var orderupload = orderup.uploadFlag;
						if(uploadFlag!=orderupload){
							orderInfo.uploadFlag = uploadFlag;
							sessionStorage.setItem('orderInfo',JSON.stringify(orderInfo));
						}
						var sourObj = {//洗牙服务具体名称
							'1':'泰康人寿专享洗牙套餐券',
							'2':'泰康人寿专属涂氟',
							'3':'泰康人寿专享洗牙套餐、涂氟',
							'4':'泰康人寿专属窝沟封闭',
							'5':'泰康人寿专享洗牙套餐、窝沟封闭',
							'6':'泰康人寿专享窝沟封闭或涂氟',
							'7':'泰康人寿专享洗牙套餐、窝沟封闭或涂氟'
						}
						that.source?that.source:that.source='1'
						var soukey = that.source;
						$.each(sourObj, function(soukey,val) {
							that.objKey = sourObj['1'];
						});
							
					}	
				})
			},
	    }
	}
</script>

<style>
	@import '../../../assets/css/gx/orderPro.css';
	
	/*@import { cell } from 'mint-ui'*/
</style>