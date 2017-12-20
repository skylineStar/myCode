//成为会员弹框
var bemember=function(that,MessageBox,api) {
    	MessageBox.confirm('', {
                message: '1、此会员免费办理；<br>2、此会员身份为泰康客户尊贵标识，不允许转让；<br>3、此会员身份长期有效，可享受更多优惠 ；<br>4、此会员的最终解释权归泰康保险集团所有。',
                title: '泰康会员须知',
                confirmButtonText: '我想成为泰康会员',
                cancelButtonText: '不用了，我再想想'
            }
		).then(action => {
      var r =JSON.parse(sessionStorage.getItem('uInfo'));
      var param = {
				"custOpenId":r.id,
				"homeid":r.homeid||sessionStorage.getItem('ooid')
      };
      console.log(param)
      var response = api.isvip(param);
      response.then(function(res){
           console.log(res)
        if(res.data.state=='1'){
        	that.isMemberPrice.yesorno='1';
					var isMemberPrice={};
					isMemberPrice.yesorno='1';
	        sessionStorage.setItem('isMemberPrice',JSON.stringify(isMemberPrice));  //储存会员价的状态值
        }else{
        	console.log(res.Message);
        }
      })
    	})
    };

export {bemember}