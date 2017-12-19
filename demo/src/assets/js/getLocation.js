//腾讯地图定位
var getPosition = function (cb,errcb){
	var geolocation = new qq.maps.Geolocation("6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B", "myapp");  
  if(geolocation){
      var options = {timeout: 1000};
	    geolocation.getLocation(function(position){//定位成功执行的方法
//	    console.log(position);
        var lon = position.lng;
        var lat = position.lat;
        var city = position.city;
//      alert("经腾讯地图解析过的坐标经度："+lon);
//      alert("经腾讯地图解析过的坐标纬度："+lat);
//      alert("经腾讯地图解析过的城市："+city);
        if('function'==typeof cb) cb({"lon":lon,"lat":lat,"city":city})
        },function (error){//定位失败执行的方法
//        console.log(error);
          if('function'==typeof errcb) errcb();
        }, options);
   }else{
//   console.log("未获取位置对象");
   }
  }

export {getPosition}
