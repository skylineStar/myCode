<!-- 
@wyz mint-ui messageBox示例 
2018.01.16
 -->
<template>
  <div class='msgBox'>
  	<h2 class='self'>msgBox示例Demo</h2>
   	<mt-button type="default" class='self' size="large" @click='showMsg'>基本使用</mt-button>
		<mt-button type="primary" class='self'@click='showAlert' size="large" >alert用法</mt-button>
		<mt-button type="danger" class='self' size="large" @click='isConfirm'>Confirm用法</mt-button>
		<mt-button type="default" class='self' size="large" @click='showPrompt'>showPrompt使用</mt-button>
		
  </div>
</template>

<script>
 import {MessageBox} from 'mint-ui'
  export default {
    name: 'msgBox',
    data() {
      return {
        message:'',
        message1:''
      }
    },
    beforeCreate() {
      document.title = 'msgBox'
    },
    created() {

    },
    mounted() {
    },
    methods: {
    	// 调用msgBox
    	showMsg(){
    		MessageBox('提示', '操作成功');
    		MessageBox({
				  title: '提示',
				  message: '确定执行此操作?',
				  showCancelButton: true,
				  confirmButtonText:'我再想想',
				  confirmButtonClass:'conbtn',
				  confirmButtonHighlight:true,// 确认按钮加粗显示  不明显
				  cancelButtonText:'去意已决',
				  cancelButtonHighlight:true,// 取消按钮加粗显示
				  cancelButtonClass:'canbtn',
				  closeOnClickModal:false,//是否在点击遮罩时关闭提示光
				},(res)=>{
					console.log(res)
				},(err)=>{
					console.log(err)
				});
    	},
    	showAlert(){
    		let title = '提示',message='操作成功'
    		MessageBox.alert(message, title);
    		MessageBox.alert('操作成功').then(action => {
				  console.log(action)
				});
    	},
    	isConfirm(){
    		MessageBox.confirm('确定执行此操作?').then(action => {
				   console.log(action)
				}).catch(err => {
				   console.log(err)
				});
				
    	},
    	showPrompt(){
    		MessageBox.prompt('请输入电话',
    			{showCancelButton: true,
				  confirmButtonText:'确定',
				  confirmButtonClass:'conbtn',
				  confirmButtonHighlight:true,// 确认按钮加粗显示  不明显
				  cancelButtonText:'取消输入',
				  cancelButtonHighlight:true,// 取消按钮加粗显示
				  cancelButtonClass:'canbtn',
				  inputClass:'cInput',
				  closeOnClickModal:false,
				  inputValidator: (val) => {
				    if (val === null) {  
				      return false;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验  
				    }  
				    return !(val.length < 6 || val.length > 8)  
  				}, 
  				inputErrorMessage: '密码长度必须在6~8位' })
    		.then(({ value, action }) => {
				 console.log(value, action)
				},err => {
				   console.log(err)
				});
    	},
    }
  }
</script>

<style stoped>
 	h1, h2,h4 {
	padding-left: .89rem;
  font-weight: normal;
  height:2.22rem;
  line-height: 2.22rem;
  background-color: #fafafa;
}
.self{
	margin-bottom: 1rem;
}
.conbtn{font-weight: 700;font-size: 1rem;}
.canbtn{font-size: .83rem;}
</style>