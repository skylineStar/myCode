webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BaseJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getUrl; });
/* unused harmony export getWeek */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return requeryUsJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getDayList; });
/* unused harmony export hideaddress */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return changeWXImgURL; });
/* unused harmony export GetDateDiff */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_param_js__ = __webpack_require__(5);

/**
 * 基本方法
 * @type {Object}
 */

var BaseJS = {
    //获取url参数
    getParameter: function (param) {
        var query = window.location.search.substring(1).split("&").uniquelize().del("");
        var iLen = query.length;
        var a = {};
        for (var i = 0; i < iLen; i++) {
            a[query[i].split("=")[0]] = query[i].split("=")[1];
        }
        if (param && param != "") {
            return a[param] ? a[param] : "";
        };
        return a;
    },
    // 写入cookie信息
    setCookie: function (name, value, hour) {
        var exp = new Date();
        exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    },
    // 获取cookie信息
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },
    //操作localStorage，有val是存储，没有是获取，为空是删除
    LocaGS: function (name, val) {
        if (val) {
            // if (val instanceof Object) {
            //   val = JSON.stringify(val)
            // };
            localStorage.setItem(name, val);
        } else {
            if (val === "") {
                localStorage.removeItem(name);
            } else {
                if (localStorage[name]) {
                    return localStorage.getItem(name);
                } else {
                    return "";
                }
            }
        }
    },
    //操作sessionStorage，有val是存储，没有是获取，为空是删除
    SessGS: function (name, val) {
        if (val) {
            // if (val instanceof Object) {
            //   val = JSON.stringify(val)
            // };
            sessionStorage.setItem(name, val);
        } else {
            if (val === "") {
                sessionStorage.removeItem(name);
            } else {
                if (sessionStorage[name]) {
                    return sessionStorage.getItem(name);
                } else {
                    return "";
                }
            }
        }
    },
    /*
    数据保存
    obj:数据对象{a:av,b:bv,c:cv}
    ns:存储时的名前缀'ts_'
    */
    saveData: function (obj, ns) {
        var t = ns || "";
        for (var x in obj) {
            var y = t + x;
            BaseJS.SessGS(y, obj[x]);
        }
    },
    /* 数据提取
    arr:数据名数组 ['a','b','c']
    ns:数据名前缀 'ts_'
    返回
    obj:数据对象{a:av,b:bv,c:cv}
    */
    getData: function (arr, ns) {
        var t = ns || "";
        var obj = {};
        for (var x in arr) {
            var y = t + arr[x];
            var v = BaseJS.SessGS(y);
            obj[arr[x]] = v == " " ? "" : v;
        }
        return obj;
    },
    /**
     * [shellSort 对象数组去重排序]
     * @param  {[type]} arr [对象数组]
     * @param  {[type]} t [排序值]
     * @param  {[type]} x [去重值]
     * @return {[type]}   v  [结果对象]
     * @return {[type]}   v.a  [排序后对象数组]
     * @return {[type]}   v.r  [去重排序后对象数组]
     */
    shellSort: function (arr, t, x) {
        //排序
        var h = 1;
        while (h <= arr.length / 3) {
            h = h * 3 + 1;
        }
        for (; h >= 1; h = Math.floor(h / 3)) {
            for (var k = 0; k < h; k++) {
                for (var i = h + k; i < arr.length; i += h) {
                    for (var j = i; j >= h && Number(arr[j][t]) > Number(arr[j - h][t]); j -= h) {
                        var tmp = arr[j];
                        arr[j] = arr[j - h];
                        arr[j - h] = tmp;
                    }
                }
            }
        }
        //去重
        var res = [],
            hash = {};
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i][x] ? arr[i][x] : null;
            if (elem != null && !hash[elem]) {
                res.push(arr[i]);
                hash[elem] = true;
            }
        }
        return {
            a: arr,
            r: res
        };
    },
    /**
    * 生成随机字符串
    {%example
    <script>
    alert(randomString(32));
    </script>
    %}
    * @param {Num} len
    * @returns {str} 随机字符串
    */
    randomString: function (len) {
        len = len || 32;
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = "";
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
    * 生成随机数
    {%example
    <script>
    alert(randomNumber(32,100));
    </script>
    %}
    * @param {num} a 从a-b的随机整数
    * @param {num} b
    * @returns {num} 随机数
    */
    randomNumber: function (a, b) {
        a = isNaN(Number(a)) ? 0 : Number(a);
        b = isNaN(Number(b)) ? 0 : Number(b);
        var t = 0;
        if (a > b) {
            t = b;
            b = a;
            a = t;
            t = b - a;
        } else {
            t = b - a;
        }
        return Math.floor(Math.random() * t + a);
    },
    /**
     * 判断是否是function
     * @param  {[type]}  f [description]
     * @return {Boolean}   [description]
     */
    isFunc: function (f) {
        if (typeof f === "function" && f instanceof Function) {
            return true;
        } else return false;
    },
    /**
     * 加载jquery，成功执行cb
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    loadJQ: function (cb) {
        // if (typeof(jQuery) === "undefined") {
        //     var jqscriptEle = document.createElement("script");
        //     jqscriptEle.src = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
        //     document.head.insertBefore(jqscriptEle, document.head.childNodes[0]);
        //     jqscriptEle.onload = function() {
        //         if (tkBASE.isFunc(cb)) {
        //             cb();
        //         } else {
        //             return;
        //         }
        //     }
        // } else {
        if (BaseJS.isFunc(cb)) {
            cb();
        } else {
            return;
        }
        // }
    },
    /**
     * //加载图片，返回img对象，成功执行cb
     * @param  {[type]}   url [description]
     * @param  {Function} cb  [description]
     * @return {[type]}       [description]
     */
    loadimg: function (url, cb) {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = function () {
            if (BaseJS.isFunc(cb)) {
                console.log('test1');
                cb(img);
            };
        };

        // if (img.complete || img.complete === undefined) {
        //     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        //     img.src = url;
        //     if (tkBASE.isFunc(cb)) {
        //         console.log('test2');
        //         cb(img);
        //     };
        // }
        return img;
    },
    contxtPath: function () {
        //var /
    }

    /**
     * 获得今天是星期几
     * @param  {[type]} date [description]
     * @return {[type]}      [description]
     */
};var getWeek = function (date, fill) {
    var d = date || new Date();
    // var weekday=new Array(7);
    // weekday[0]="Sunday";
    // weekday[1]="Monday";
    // weekday[2]="Tuesday";
    // weekday[3]="Wednesday";
    // weekday[4]="Thursday";
    // weekday[5]="Friday";
    // weekday[6]="Saturday";
    // var x = document.getElementById("demo");
    // x.innerHTML=weekday[d.getDay()];
    return d.getDay();
};

/**
 * 返回当前月的日历数据 '2017/7/31'
 */
var getDayList = function (datestr, fill) {
    /**
     * 获得当前日期的-月最后一天，--下月的最后一天,前月的最后一天
     * @param {Object} year
     * @param {Object} month
     */
    function getLastDaysInMonth(year, month) {
        var ldays0 = new Date(year, month, 0).getDate(); //获得前一月的最后一天是几号 ("1998/12/0");//"xxxx/xx/0"
        month == '12' ? month = 1 : month += 1;
        m2 = month;
        var ldays1 = new Date(year, month, 0).getDate();
        month == '12' ? month = 1 : month += 1;
        m3 = month;
        var ldays2 = new Date(year, month, 0).getDate();
        var dayarr = [ldays0, ldays1, ldays2]; //包含 上月，本月，下月 的最后一天的日期是几号
        if (__WEBPACK_IMPORTED_MODULE_0__config_param_js__["a" /* config_param */].isLog) console.log(dayarr);
        return dayarr;
    }
    var date, m2, m3;
    datestr ? date = new Date(datestr) : date = new Date();
    //	var date=new Date('2017/7/31');
    //	var date=new Date();
    var year = date.getFullYear(),
        m1 = date.getMonth(),
        c_day = date.getDate(),
        wday = date.getDay(); //分别 获得年月日 星期几
    var days = getLastDaysInMonth(year, m1);

    var clist = {};
    var crr_m = [],
        next_m = []; //本月 下月 日期数组
    for (; c_day < days[1] + 1; c_day++) {
        //填充当月
        crr_m.push(c_day);
    }
    clist[m2] = crr_m;

    //	var all_days = 42-wday//页面填充的日期总个数
    var all_days = 35; //页面填充的日期总个数
    var lastday = all_days - clist[m2].length - days[2]; //第三月剩下需要填充的天数
    var m2days; //第二月的最后一天
    if (lastday < 0) {
        //跨两月
        m2days = all_days - clist[m2].length + 1;
    } else {
        //跨三月
        m2days = days[2] + 1;
        var nextnext_m = [];
        for (var m = 1; m < lastday + 1; m++) {
            //填充下月的下月数据
            nextnext_m.push(m);
        }
        var m4 = m3;
        m4 == '12' ? m4 = 1 : m4 += 1; //第三月  是几月
        clist[m4] = nextnext_m;
    }
    for (var n1 = 1; n1 < m2days; n1++) {
        //填充下月数据 
        next_m.push(n1);
    }
    clist[m3] = next_m;

    if (fill) {
        clist['0'] = [];
        var n = date.getDay();
        for (var i = n; i > 0; i--) {
            clist['0'].push("");
        }
    }
    if (__WEBPACK_IMPORTED_MODULE_0__config_param_js__["a" /* config_param */].isLog) console.log(clist);
    return clist;
};

function getUrl(linkUrl) {
    var str, arr, newArr, num, num2, i, j, newJson;
    if (linkUrl) {
        //str = decodeURIComponent(window.location.search.split('?')[1])
        str = decodeURIComponent(linkUrl.split('?')[1]);
        arr = str.split('&');
        num = arr.length;
        newJson = {};
        for (i = 0; i < num; i++) {
            newArr = arr[i].split('=');
            num2 = newArr.length;
            newJson[newArr[0]] = newArr[1];
        }
        return newJson;
    } else {
        return {};
    }
}

//加载自定义 ---JS
function requeryUsJS(src, cb) {
    var scriptEle = document.createElement("script");
    scriptEle.src = src;
    document.head.appendChild(scriptEle);
    scriptEle.onload = function () {
        cb();
    };
}
/**
 * 在微信上隐藏地址 方法1隐藏
 */
function hideaddress() {
    //console.log("====");
    if (typeof WeixinJSBridge == "undefined") {
        //  console.log("==undefined==");
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        //  console.log("==else==");
        onBridgeReady();
    }
}
var onBridgeReady = function () {
    WeixinJSBridge.call('hideOptionMenu');
};
hideaddress();
/**
 * 校验苹果与安卓系统,切换图片显示URL
 */
var changeWXImgURL = function (wx_localId) {
    //正则,忽略大小写
    var pattern_phone = new RegExp("iphone", "i");
    var userAgent = navigator.userAgent.toLowerCase();
    var isIphone = pattern_phone.test(userAgent);
    if (isIphone) {
        //苹果
        if (window.__wxjs_is_wkwebview == true) {
            //当前使用的是wk内核
            wx.getLocalImgData({
                localId: wx_localId,
                success: function (res) {
                    wx_localId = res.localData; //图片的base64数据 
                }
            });
        }
    } else {}
    return wx_localId;
};

/** 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
* 返回精度为：秒，分，小时，天
* var result = GetDateDiff("2010-02-26 16:00:00", "2011-07-02 21:48:40", "day");
*/
var GetDateDiff = function (startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_qs__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_qs__);





class API {
  // [康燕燕] 微信配置
  wxconfig(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "mp/signature";
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [康燕燕] 将页面图片保存到本地数据库
  setImg(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "mp/upload/ecm";
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }

  // [王云召] 用户输入表单号 页面跳转
  indexre(param) {
    ///webApp/insurance/indexre?policyNo=600000510132017060110004138246
    //http://apptest.healthservice.mobile.taikang.com/webApp/insurance/indexre?timestamp=
    //http://apptest.healthservice.mobile.taikang.com/webApp/insurance/indexre?policyNo=600000510132017060110004138246
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "indexre";
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    console.log(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].baseURL);
    var url = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].baseURL.replace('call/', 'insurance/indexre');
    console.log(url);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }

  // [王云召] 城市列表
  ckcity(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "ckcity";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召] 根据条件模糊查询医院列表 
  getOrgListBySolr(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getOrgListBySolr";
    param.retrieveArgs.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType; // 医院列表请求参数添加
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召]  接入乐牙跳转链接 
  toStoreDetailOrOrder(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "toStoreDetailOrOrder";
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召] 获取一个门店的排班列表
  getDoctorSchedule(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getDoctorSchedule";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召] 获取一个日排班的分时信息
  getSchedulePartTime(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getSchedulePartTime";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召] 根据保单号查询客户信息
  getCorePolicyDetail(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getCorePolicyDetail";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王云召] 预约
  order(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "order";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [徐瑞瑞] 预约列表
  selectOrder(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "selectOrder";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [徐瑞瑞] 提交评价
  valuationSave(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "valuationSave";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [徐瑞瑞] 就诊意见，影像
  fileList(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "fileList";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [徐瑞瑞] 评价查询
  selectValuationByOrderId(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "selectValuationByOrderId";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [徐瑞瑞] 取消预约
  cancelOrder(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "cancelOrder";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  //[徐瑞瑞] 自动更新
  timeoutOrderState(param) {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "timeoutOrderState";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  hospitalInCity(param) {
    //获取地址
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "hospitalInCity";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  //请求图片地址数组
  imgArr(url) {
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].get(url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王昆] 门诊详情
  getHospitalList(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getHospitalList";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王昆] 评价列表
  selectValuation(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "selectValuation";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王昆] 门诊图片
  getPicture(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "getPicture";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王昆] locationInfo  城市门店查询信息储存接口
  locationInfo(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "locationInfo";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
  // [王昆] phoneConsultInfo 电话咨询信息储存接口
  phoneConsultInfo(param) {
    //
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.method = "phoneConsultInfo";
    param.channelType = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].channelType;
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].data.custData = param;
    if (__WEBPACK_IMPORTED_MODULE_0__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
    return __WEBPACK_IMPORTED_MODULE_1__http__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].url, {}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (API);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config_param; });
/*公共的配置参数文件--方便生产和测试环境的切换 kyy*/
var config_param = { //测试healthservice
  'base_path': 'http://apptest.healthservice.mobile.taikang.com',
  'isTest': true,
  'isLog': true,
  //入口页面 统一的返回页面地址，正式环境应该换成微保卡券入口地址
  'ticketURI': 'http://apptest.healthservice.mobile.taikang.com/webApp/#/order/toPage'
};
var config_param_3 = { //本地测试
  'base_path': 'http://localhost:8090',
  //  'base_path':'172.24.245.1:8090',
  'isTest': true,
  'isLog': true,
  'ticketURI': 'http://localhost:8090/webApp/#/order/toPage'
};

var config_param_1 = { //生产
  'base_path': 'http://app.healthservice.mobile.taikang.com',
  'isTest': false,
  'isLog': false,
  'ticketURI': 'http://app.healthservice.mobile.taikang.com/webApp/#/order/toPage'
};

var config_param_2 = { //测试mhc
  'base_path': 'http://apptest.mhc.mobile.taikang.com',
  'isTest': true,
  'isLog': true,
  'ticketURI': 'http://apptest.mhc.mobile.taikang.com/webApp/#/order/toPage'
  //公共变量的配置环境 上生产时 须将变量 变为生产变量
};
//http://apptest.healthservice.mobile.taikang.com/webApp/#/order/checkStation

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEXS0tL////S0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL///934UUiAAAAanRSTlMAADFAp7Ae+/0kjJIQ83QG4uEEXlbOx0Y4uKks/g0tTW6Ors/y5r6beFUyD12Kqsrs68mlg2A3O/H5UDrw90r1Rzb0QT007zkz7u0cAnxRq37brMDWcwtqewkYnZkZNWPBAZAD9lkMvx+j5wvWMAAAAAFiS0dEAf8CLd4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAFCSURBVDjLhdNnW8IwEAfwWBVapWBFEQfgKCoojjoRHKiouHErLtze9/8AGtpom2vT/6um+bXP5e4JIXykZvuqiQYZ0tLqjwJBWfFFbQDtfiikAqghHxSG34TFKNJBkdYpRFFopEuIuk0UE6EesBIXoF6G+rxR/wBDwQBGiWRqcGh4RIe/pEfHxjPZCQtN5qamZ8Ars8bc/MIiWVoGn+RXCCkUxWZ1jdYUF6r1DbPwkkBtbrHTeSt9+78F5R13U9y1N3Ov4mYqZWfHs/suTZL4sUg6Mkk8O9R2Aw/4AJ/+EKEUrklB6AijY4ROMDpFqIrRGY8SMts6v2BPVR4VrA0tQyKX1pDkKw5dN16rN7d0cVcz/1vi0D39svbAlo8xip44ZAA8S7aLU4+mAV6c6PVNe6877+BHLv/pRF9mMc4o3xb6AUZz2ju+J1A8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTA3VDE0OjEyOjI5KzA4OjAw2hjMuAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0wN1QxNDoxMjoyOSswODowMKtFdAQAAAAASUVORK5CYII="

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPosition; });
//腾讯地图定位
var getPosition = function (cb, errcb) {
        var geolocation = new qq.maps.Geolocation("6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B", "myapp");
        if (geolocation) {
                var options = { timeout: 1000 };
                geolocation.getLocation(function (position) {
                        //定位成功执行的方法
                        //	    console.log(position);
                        var lon = position.lng;
                        var lat = position.lat;
                        var city = position.city;
                        //      alert("经腾讯地图解析过的坐标经度："+lon);
                        //      alert("经腾讯地图解析过的坐标纬度："+lat);
                        //      alert("经腾讯地图解析过的城市："+city);
                        if ('function' == typeof cb) cb({ "lon": lon, "lat": lat, "city": city });
                }, function (error) {
                        //定位失败执行的方法
                        //        console.log(error);
                        if ('function' == typeof errcb) errcb();
                }, options);
        } else {
                //   console.log("未获取位置对象");
        }
};



/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAbCAYAAAHg7yRNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYWY4YzhiMy1lNGE0LTRiZjYtODA1NC1lZmI5YmMyMzJiZjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIzREM5M0RDMEU5MTFFN0ExQUNGOTc1NTgyNjA1QUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIzREM5M0NDMEU5MTFFN0ExQUNGOTc1NTgyNjA1QUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOGQxNDQ1My1hMGJmLTRkYzAtYWYzOS1mZWRhZGMzYzBmOTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGFmOGM4YjMtZTRhNC00YmY2LTgwNTQtZWZiOWJjMjMyYmYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3D1iewAAAOtJREFUeNpinD17ticDA8M2IGZggjFgHAasHIAAYgTq+U9YGQoHIIBQ9CADFhCRkpKCIjhnzhxU7cgAIIBwGeWFS8c2nEbhtJwFxqBcB0AA4fQ5Xkdhs+bly5cMmzdvxq0Bm/XYABMDiYA+GrxJUO8NEECgYH0GZEgSofg5E5EKQUCSieTI8vHxYZCQkMBIE1gVb9myhfpBiNMZyODFixdg22nnDOq7GZbmaevmF0SqfQoQYKSkOlIBSamUVCDJgswjFOrIqYWkIouUWKJZWTJoDCc5zPEB9NJ/6IY5VYMFPZkO7aT4nEZmvwAAaKNedtXyzYYAAAAASUVORK5CYII="

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAflBMVEUAAAA6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTk6yTn///+v6a5IzUj4/fjo+ejM8cxe013y/PLs+uzf9t/V89Sn56Z+3H5s12vF78We5J2G3oaF3oR12XRk1WRW0VVQz09wsUpaAAAAE3RSTlMA+ency4pIJ/NiPsI/Y8XEIfJAmkiL3QAAANdJREFUKM+Fk9sWQzAQRSc0QmlpJ+6X0nv//wcrLREJy37gYS85y8kMSPY0tAixQroHHc9Gie3NVLTDGbtocmcLNSx5tkPQgDh/x064gMt+UuZpucJ5uMKhl/aatAECXODSiGcA1FRJzu/iTcE3XJGlLQp8MP6/TdPn0AQQPY6X3VjEKPNrMsSVL5RyODbmVSfieFVMBYOPo+W3R8qzN0p8oChtT/3BCQoBKrZOUCFQ64ubRKsPDqvFb10ZMHf5sjfHRFjX+M4BCdNHk20PtboOR7EOR2Udvr9gLTUoCxEmAAAAAElFTkSuQmCC"

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__ = __webpack_require__(3);



var channelType = sessionStorage.getItem('channelType');
console.log(channelType);
if (!channelType) {
	var link = window.location.href;
	var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
	channelType = parseUrl.channelType;
	if (channelType) sessionStorage.setItem('channelType', channelType);
}

/* harmony default export */ __webpack_exports__["a"] = ({
	channelType: channelType,
	url: '',
	baseURL: __WEBPACK_IMPORTED_MODULE_1__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/call/', //测试域名
	method: 'POST',
	transformResponse: [function (data) {
		return data;
	}],
	headers: { 'Content-Type': 'application/json' },
	params: {
		timestamp: ''
	},
	paramsSerializer: function (params) {
		return __WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify(params);
	},
	data: {
		openid: "",
		group: "",
		method: '',
		custData: {}
	},
	//timeout: 5000,
	withCredentials: false, // default
	responseType: 'json', // default
	onUploadProgress: function (progressEvent) {
		// Do whatever you want with the native progress event
	},
	onDownloadProgress: function (progressEvent) {
		// Do whatever you want with the native progress event
	},
	maxContentLength: 10000,
	validateStatus: function (status) {
		return status >= 200 && status < 300; // default
	},
	maxRedirects: 5 // default
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tkWX; });
/* unused harmony export chooseImage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_API__ = __webpack_require__(4);



const api = new __WEBPACK_IMPORTED_MODULE_2__api_API__["a" /* default */]();
/**
 * 微信设置
 * @type {Object}
 */
var tkWX = {
    //加载weixinJS
    requeryWXJS: function (cb) {
        if (typeof wx === "undefined") {
            var scriptEle = document.createElement("script");
            scriptEle.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
            //          scriptEle.src = "../../../static/js/jweixin-1.2.0.js";
            //			scriptEle.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
            document.head.appendChild(scriptEle);
            scriptEle.onload = function () {
                if (wx) wx.ready(function () {
                    wx.hideOptionMenu();
                });
                if (cb) cb();
            };
        } else {
            if (cb) cb();
        }
    },
    //获取签名
    WXConfigMenu: function (obj) {
        var url_curr = window.location.href.split('#')[0];
        console.log(url_curr);
        //  	{"mpType": "life","url": "string"}
        let response = api.wxconfig({ "url": url_curr });
        response.then(function (res) {
            console.log(res);
            var data = res.data;
            if (data.status == '1') {
                console.log(data.data);
                tkWX.WXconfig(data.data, obj);
                var share = obj.share;
                if (share) tkWX.WXready(share);
            } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])(data.message);
            }
        }).catch(function (err) {
            console.log(err);
            //Toast("获取签名connect fail!");
        });
    },
    //配置微信接口
    WXconfig: function (wc, obj) {
        //  	Toast("配置微信接口======");
        console.log(wc);
        //		alert('WXconfig 配置微信接口');
        wx.config({
            debug: false, //'true', false
            appId: wc.appId,
            timestamp: wc.timestamp,
            nonceStr: wc.nonceStr,
            signature: wc.signature,
            jsApiList: ['checkJsApi', 'chooseImage', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'
            //				'hideAllNonBaseMenuItem','hideMenuItems',''
            ]
        });
    },
    WXready: function (obj) {
        wx.ready(function () {
            wx.showOptionMenu();
            wx.hideMenuItems({
                menuList: ['menuItem:share:QZone', 'menuItem:share:qq', 'menuItem:copyUrl', 'menuItem:favorite', 'menuItem:openWithQQBrowser', "menuItem:share:email"]
            });
            wx.onMenuShareAppMessage({
                title: obj.title,
                desc: obj.desc,
                link: obj.shareURL,
                imgUrl: obj.shareImageURL
            });
            wx.onMenuShareTimeline({
                title: obj.desc,
                link: obj.shareURL,
                imgUrl: obj.shareImageURL
            });
        });
    },
    //微信接口准备完毕执行--地理位置
    WXreadyLocation: function (obj, cb) {
        wx.ready(function () {
            wx.showOptionMenu();
            wx.hideMenuItems({
                menuList: ['menuItem:share:QZone', 'menuItem:share:qq',
                //						'menuItem:copyUrl', 
                'menuItem:favorite', 'menuItem:openWithQQBrowser', "menuItem:share:email"]
            });
            alert("=======================地理位置========================");
            wx.getLocation({
                type: 'wgs84', //默认为wgs84的gps坐标，//如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    var speed = res.speed;
                    var accuracy = res.accuracy;
                    alert('经度：' + latitude + '，纬度：' + longitude);
                }
            });
        });
    },
    chooseimg: function (cb) {
        //微信选择图片，
        wx.ready(function () {
            /*调用接口*/
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original'], // 'original', 'compressed'可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var b = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
            });
        });
    },
    uploadimg: function (locimgs, cb) {
        //微信选择图片，
        var loc = locimgs;
        var serverId = [];
        wx.ready(function () {
            var i = 0,
                length = loc.length;
            function upload() {
                wx.uploadImage({
                    localId: loc[i],
                    success: function (res) {
                        i++;
                        serverId.push(res.serverId);
                        if (i < length) {
                            upload();
                        } else {
                            if (__WEBPACK_IMPORTED_MODULE_1__BaseJS_js__["d" /* BaseJS */].isFunc(cb)) {
                                cb(serverId);
                            } else {
                                return;
                            }
                        }
                    },
                    fail: function (res) {}
                });
            }
            upload();
        });
    },
    hideOptionMenu: function () {
        wx.hideOptionMenu();
    },
    // 8.7 关闭当前窗口
    closeWindow: function () {
        wx.closeWindow();
    },
    init: function (obj) {
        tkWX.requeryWXJS(function () {
            console.log(obj);
            //	    	if(obj&&obj.share)
            tkWX.WXConfigMenu(obj);
            //	    	if(obj.share)
        });
    }
};



/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAIAAAG6RblUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYWY4YzhiMy1lNGE0LTRiZjYtODA1NC1lZmI5YmMyMzJiZjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk0NzFCNEFCRTI4MTFFN0E5NkJCNjA3RDQ4NkJCRkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzk0NzFCNDlCRTI4MTFFN0E5NkJCNjA3RDQ4NkJCRkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZWRlMjA2Ny05NTEyLTRmZmQtYmNhNi1lYjI3NWUzZTE2ZTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGFmOGM4YjMtZTRhNC00YmY2LTgwNTQtZWZiOWJjMjMyYmYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Esq02wAAAldJREFUeNpi/P//PwMYMDHcnMewVOrKlStMDOpJQAEWFhaAAGKEy7KApPR3gZj///2+fPkyUAYggBj+Q8CXJ0BNECYTSMHLYwwbTIGca9eugdUDwcUuiPynT5+AJEAAwTS+uQChYfwlkhAaZBnEWqDBYKdFP4PwgZI6OjpMDKgA4UwIAAggmHlwsFT6+/fvyAKoJqxQAnrqzp07f//+hYuxgIiHmxiOZCCrBHqJEQy0tbXBZsj7wd0GB6KiokBpsLsh4N4qEKmRBlSqrq4O1P369WuIDEAAobv0y5cvaCKoLv105/79+2jWoarY6gwkfv36hUPFz7cM/34DaaBvkVUAQ1waGLrIQv/+/YOEPhCIiYkB4+ApAxMrZigDGdLS0mAVQBD5kIGFGyVuGBkVFBQEBQWR3KEYguYFHh4eVJfeW4lsADa//P0Bck3IFWBygBgODDrUMH17ES0oX758CWEABBhG+kADh1KAoYxfCXoSRAHHCxkebQW65/Hjx3hU4TbiTC08AD5+/Pjs2TNcChn/f3vB8PUJw9enYBLM+PKI4dtTht/QwIDmWQYGZmZmNiTAysoKIVkYOMUZnu1nOFnK8P8vHtcC/fwHDL59+waPEgkJCREREaTs93QPw+E0UNygAogrIMogmoGkrKwsHx8fjhx8fQbDuSasRkD0S0lJCQkJ4Q3OR1vw+AWUlz59whsjH64zvDmH4LLxMRhUAbM2ExMTpAiApDlgiKBmJGRwZxnQawwK/gz65Qw88hAxcSASBxIMP378eP78+devXz98+AAMRbgmAKc6t7bs4PS7AAAAAElFTkSuQmCC"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAMAAAAfOR5kAAAAXVBMVEUAAACbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5smdeItAAAAHnRSTlMA7RFzSwX22s7ChPrkyKp7XFQ3LRgLvN+ynGVCJopbKc7iAAAAz0lEQVQoz23R2RKDIAwF0CsiIq6t2kVt/v8zO5LUuPQ8JTN6QwDMTK+nc/lrMlBZm5BI2gxiqGmnHiQgp4PcxIQHnTzWnJQuUmBMZFawNvzqER1XRQw0BXcdGlpVRsZXsW3gJY3JpBwcd4e4x9aBogVi4V6+thCWj4JCZoiGz4VA0Q3RjbuAnouyHYGxLbnrAU/Mee+IeflPaWJNJ/W2gdLd3nTwht6PqoyutmOxCbT5QOl7Fhl2hqe8+oCDPok31+NkLonKGRcdUYc/0lTrL//tKhFGbR4ZAAAAAElFTkSuQmCC"

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAArCAMAAAA0X5qLAAAAhFBMVEUAAAD/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBn/pBkMAk15AAAAK3RSTlMABfvAuIgeCfSna1cYEeHc0K+gkIByPzEo7+vMnZZ8YDfY1VFMSUQtDbp7UIeqegAAATJJREFUOMuN1Nl6gjAQQOGEhEU2AdlBXOrSdt7//WoBI36ZyJzL8F+EIYGh3W+MXibp1rGgIuMdQEa1kQdghUQ8wCObZt32HzffJOzDWEGxfDvhmBNwAHMBAXdPnKzbG6jKVSxfWK7ZChbVZsed8pB3Syz8a80RlInYArRY9ENwDEdqawjPS1KfuQKInRzGXEmzSTjuOaXYLprfcLNuhTqE61q6i+lln236Pu39J7vh2iU11usn2zbZHUPKEWi+uQlmfxieh+EzbmvAslzDTUWrFCCM42C4ffTJsRbHArMh4DUYvoDKy/cWqBwED2pYfcjYXSh8QXD63OM8q68tTP0ieHp2vr4OedFMB1S3ETxqff62Nm79pOMSwLMj7QhI9IMXsNFee976UVv0tSW1dfVX/wMvAIAcd21CNQAAAABJRU5ErkJggg=="

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAvVBMVEX+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7+bi7///94jtDTAAAAPXRSTlMADFeYyOn4JJv0CIj5/sF2OxcGdYkjz/2dMujeNeq/FAnQubjR2A36/JzAmjw96/U0MyXXirYKdDr2WJnJAkH3GAAAAAFiS0dEPklkAOMAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAFCSURBVDjLhVNtW4JAEFwQBQxQEMU30go51NKUSFPn//+tgHzwQC7ny909O+zOLjtEBSS5oTRbrabSkCW6h6rpKKBraiXcfjJgWp2u7Th2t2eZMNw2H+8P4A25j9ShhwH3Ho0xmZZTTicYjwq+j+dZVdPMgn/NMX/Bq3Ov2nlDMM9vLhZhTVskLeDmAlnE1Qc4HRHLimgYUj2BllgShbqpigiqqYckY0UiAq0g0xodMaGDNSl4FxM+oNAGtphgY0MGHDHBgfGY8LDEQ5Fr9EiIrM3KoMrIBvXvqL1teP0j9YS/kMqiz/oCu4jts9NFXOcDkmJ85Zd5gKRu5RIE31ctPpK7HFJSLG2+9vGuUj/m1j7NEaTG6d/e/dQ4Qcl9bZfBsw7HzHrHg+WBla2XYq9tb+b9We7r2jqdLz5j/uV84iT/Ag76LVawjnbKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTIxVDEyOjQ3OjA3KzA4OjAwwxBX+wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0yMVQxMjo0NzowNyswODowMLJN70cAAAAASUVORK5CYII="

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAnCAMAAABnuz2tAAAA0lBMVEX/rzz/////lkD/nT//rTz/mED/qT3/mj//mUD/pj3/mz//nD//nz7/oT7/oD7/rDz/oj7/qz3/qD3/pD7/oz7/pT7//fr/8+X/+/b/skL/3bz/7+H/79v/qk7/8uD/69n/+fH/7dT/wo3/yIz/z4r/s2b/oVD/mkT/6ND/3q3/zJn/tkz/pEP/qmL/p0b/nEf/vV//473/2rP/sT///vz/1bH/u3H/rlf/4rf/0qv/1Zf/vIP/w4H/y4D/s3P/xXD/wGb/pln/ulX/4sL/06T/t02a4SPaAAAF/0lEQVR42uzaZ3faMBiG4T6d7l5B8jaeDIPNCIGsZrT9/3+pbiIZC2w6xGnSWPcHh9jfdC505Pfw6HF9z34n7Ze92N2rXb3e1ZO/6k1j7xp729iHmg6EPgt1hF7u7JPY81/1cbP3NT394x49tATk8uKvAtPrEtL1zOBKia8Rvwz5AoVLJf43uo5W9s8Fs1fR9V65y4s/7aNS/1Tt8aL4zpmPSv7Zfvf4jw9O/PxcXLDzuTz3fYn/YgG6GcRJr5fEgakD1hd1qqmIP3IBfRrGTpY5cTjVAfeoo8Q3d3GzYNFlahjpZXSzYBfS3PcjPl8ANMi1sjygwCIvwbddfDYDaJitz/FZSIFZ1lHi6zMGAI2Myo2IAgNDnru8+MQDGfY0od6QwEs0TYkvcn4u0Eh8c81+LpDT6fwn4h/901If5GTDtnFC4Key3OXFJxboePvNdUxhFd7/gfgn91y844LG22+uMYVbeFfit0pd0Mn27QmFm8pxlxefe7CTullNYsPLNa314jMftlM3q3Fs+FmHtxt8m8QbPuzvdQ++2/ANKe7y4mewkvrpZEIx++Nx/MMTPwN16qeTDsWsgK7Ei61A04Ztn2Ilw11e/BeQcdN0ckxQzGdaLv4IJG6aTsYExXxGiRe6AJk0PZsQXEhwlxavWRg2z+OHsIprq8UfWBg2z+OHcDufPyvxleYuTpqfnsCdS3CXFX8K2iv/GR9bhFjH41J8j+JU01ot/gx0VJ7jl99sQugsLsWPKM6KP0r8unPQNejJwCXEHax3+znFuQR3WfF9BPxjbwHWIud7fIB+cW2z+D5CLn/0jeA2M+N7fAi/uCrx63xE6+n7IW46XE/cI/gS3CXFX0HPufY+yvp8x891XGlai8UvoWec+1eU2dnBbZmOZUFdWvzzhyL+GrrBtVdFlTd1XEtwlxMfwHzGWqDSgt81ERSo2ys+hMm1D1Hp6wFrirBwrsTzIkz5xwEqDfjdKSIJ7nIVmvm5/RCVDm+nNez7oP1n4t/sT7yJkJ1qHB3Vjhj3EGZxqrlX4u/0RwarUvNEFDUpvw+rO+PuIWbn+GMIHTPuMbzi2l7xNmJ2jh9C6Cub1cTwiqsSz7NxKWzuW9v7Jew7495Fws7xFoQsxj1Bu+vCYfD7Gw/YdNJBF6rqgqWMpwshl91O0b0z7gS98pMQ4S+waHcEI8adQsxh4xoQqNYRGIznpih22wC5f9x1xX2DuwWxH+2dzWrDMBCEK4OhF5tAKYgmPRRqColcSFPcWwrt+79Td1e26x/JxITEq2jnECvSTQxGkkffvovdZ9ldM7A7LWZIspiZvZghyWImoMUMblWtJraqY91Hs3OlrSpptFW1KtRmkI+Pe+fKeqsKB5F1a+ogMo3X8XgQaTU8iFxZ2YN5cXyjPeeDSHBz0/R+ZoLfeB0Pbs5cr/ffJmTwRCEDcXwQn5kwRFA3+yEC6GhCBPCI1/FfSps8s+qFCOqQAYYIwOXi+ABCBCCIiDXNbkSs7kohIpaCInY8RMTg15q7ExH7Dxm8rEDieO4RMSsMALd/MACsIQDcdmAAeHEk2bKOxwBwu3GFALD+hABw1ggDwPCOF8dPBID18gHgVulabf2jW7VOkyRqCF8GE+QPGcAEreAx2/GPfd0Skozd9Y6ejkqXvrFSq2P02MlK6cIXqym0qvB5muMf4nD8t9L+y3v6epf33MKr2e4RIHJ8CGg1x6vZ7iAZXs3Gpzie59Vslwi84Rog8IaghXOD4A1XdJLAG4IWZgre8ImwSuNuwioJTBv0DBNUjD+5ElZJYNossUpTstC8fp+F5gk+nhxvoXl5T4ageYKPd2q3cUPzNru75e2e1EjUTgchUd8SKZhAyg0hUU3H7IRENVIwgR0S9STVwOsSgddlDbymAXG8VUUTBMBrYwB4TRNUBVQi5Ppo4RZ4fTh0gNdM7J4kw3IGKXaK41vlw3IGWWBFcS7leDblDGaqW6zG9lzU8eHBtLvFaoIsA3Vtx/+87m2xmj0Vq+Fl94HE8bdY+CwIeAdju/N3PAdcjTj+bP0BLYdGQpwClLwAAAAASUVORK5CYII="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAIAAAEoYrJgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYWY4YzhiMy1lNGE0LTRiZjYtODA1NC1lZmI5YmMyMzJiZjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkRCQTJBMkE4NEMzMTFFN0E0RDhEMDk1Qjc0QTAzMUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkRCQTJBMjk4NEMzMTFFN0E0RDhEMDk1Qjc0QTAzMUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTJmMDdjYi05MTJjLTRmOWYtOTY1NC1lM2IxYWVlZjQwODIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGFmOGM4YjMtZTRhNC00YmY2LTgwNTQtZWZiOWJjMjMyYmYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O/ldBAAAAvFJREFUeNpi/P//PwMMsADxnDlzIBwmCMXGxobg/Pr1i4mJCSCAGFH0wDWkpKQwwYWXLl3K5O7uDuFER0cDBBBUD1wxEPj4+EhISIAkkEUhACjBhMxnAwMgw9vbm+E/DGzatGnJkiX//v2DcAECCMVdKJ4Cqvrx4wdcCOTSW7duQYRsbW0hokBXMB06dAjC4eXlhStnYsAGmPj4+CCsbdu2eXl5QdhYvAO0Derk58+fz50798SJExAuQADGqNgGYBCGEWYkFs7gGBYOZIadhZtQdpZaihTU0kr1kgy2Y8MtL/LocQH8c85EtJ0xSilrLfMNaLz3Vgo9qBpTUWtFKmt+o/f+zh5jwF5+SRFjJCmL4qcGbOfcnBN7CCGltN+EmVtrp0Z4sl8CMFLGKBCDQBQFWTCljUcwN0hKT5Eyh7TxBOkCFikDOYHYJNjY7V8MrhtdcKrBec7gzHfqE6/aK3m4g1df15WHpZR93/9kRV+01tVkXdfN83xL4zzPfxwMIsPIbhR1H+GkvmiY177vBKXLTLkkoy3LQowxjR0g1tpWlFLaigohylPvPTr6RMdxLNGo+pyG8EkcdJVGv3Oxf1AIAnuppLdtiw5WET7SVy5KKedceWGaJsbYU1nw13U9jiOEwDkfhgH7KUXfArRa9koQwVAU3i28Ag1arVKtUNJ5SJ1S4xn0OsYMo/QC+2WyYwkTseOUmfjk59xzc2HCcRy7rpumCcfxPSMcLlt0HMf3/S1I0Ql3WZa6rud5NrwcFhvHsWKcHXcYhqqqiNDXfXHkSZK4rrvjylw2X6Nm7Wma/m6tKAqlZo+S+UYe66dx+nmeC79wrZdQc4ECKLht274eFUDBlQZ6UAAF17Ztk9mUtaxVJeaPAviWHU+TjUoriKKIbsA/6JC8NE6n0f+/fiAnyT/Dba50/L6GwjaEgyDYtZ6yLPVtVi/LsrIsO4kS1Pc9RXyXDpFS9jzvIncYxCtN0+h9TQmEYUh2r+8L0zz7Wx8OopxsEnIj8QAAAABJRU5ErkJggg=="

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAMAAABY1h8eAAAATlBMVEUAAACbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5v+Jtm9AAAAGXRSTlMA6cz5WiO3siIFvfHe1qqimXhnXE4VCsAkea1VWQAAAJJJREFUKM+F0NkSgyAMheGwKIr72p73f9F2alUiZPhvv8lAQnfWKShnKVGlcaSr2BTOVKQad/phFmGWY8mw5KgYKo5gmcxk5s38b/N7UhFcqKBIr9vGVi+vcw+/1NzWFkHtGo6NeDRew7tHlN//6JDIHTYh2fTbwaTRvL84QGgg2oyEZqMZYjP1MvbUydhRI2PzAYw/K09ixbjsAAAAAElFTkSuQmCC"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAdCAMAAACDkYxEAAAAilBMVEUAAAAnd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7ZpzexEAAAALXRSTlMAwizItWUNCa6iXlkUBfbehHtJGO7j2IlTIfPPzLypmYZzbkE3+OhOPTvwjjydO5xaAAABGklEQVQoz22RV3aDMBREhaVQTS/Gvbckd//bi8AYsMh8wDtc8ZgZRKtnoqwkFBPN0xKAw4R8fUN8uAcUtklAnZthjW8gl+P7jDSQ5PIa7IjlJ7J49u+fzIV1N/m4n2hB2k0zqk9Us+29xkZgrm2e8xoWwvDR5smgDCZtYOmrYucIU3bRJDsS22KipDESbvD+ab4g09Yj/Ck7tctORLPGz97PB6SX7fVtRzwP9wAy7dvUy7RxRyJ3XBM3Ary8D7DSy+YVFA99plZwm3XMo1xq5q27B0sX9f7cllI/HfTAeo+OxSoboWAU0/Hg4Iz+VSIGpVBlQ+n1eP9vBRu/rTKHXIwVHm+wUun9stAuDDlfkpfOYqo8+FHS0u38Acp0Gr4BxalxAAAAAElFTkSuQmCC"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNzNjMzE4Mi01MzM2LTQxYzctYjk5MC00YmFjNGU1NmM0ZmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REUxQzc4OTU3RDUyMTFFN0IyQjc5Qjc3QTA5RTVCRkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REUxQzc4OTQ3RDUyMTFFN0IyQjc5Qjc3QTA5RTVCRkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwY2QxMzU3LWI1NmUtNGU2Yi1hZGUxLTYxYTRhNTJmZjUyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNzNjMzE4Mi01MzM2LTQxYzctYjk5MC00YmFjNGU1NmM0ZmUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Rt2jPAAANkUlEQVR42uRdCXRU5RW+771ZMjOZTPaNhGwIxJCFAFnYgqFSiqeCKBK1IFWk1rYeqwXtAhyLp2JbOGo91qLtoYqWgju1hmMJi0CAhIBAgEJDEgKEkMk2WSbLLP3vzBuZDLO8mbz/JcA95zsZhjf3/v/37v//9973v/eYvXv3wggRjiCdYAJBBkEKQTJBJEEEgZJAS9BP0EXQzv/tJKjjcYrHGQLzSOiUbBhtMwQ5BHMJignyeQJ9iYIgnIdDprkcg6QfJigjKCU4TmAdlk4OgwenESwh+AH/WQqpIdhC8B7/WTJhJRwpjxDsJzhPsFZCch0ndS1v+wB/cmW3AsE4nJ8gOMt70DR+ahjOaWkq78ln+bYpbkaCUe9j/HDcJLG3+uPVm/g2PkaLCxpKJxNUEPyVIAFGviTwba3g2z5iCZYTvEJQTpALN5/k8m3/Pd+XEUVwCr94rBrm0E+MxXglwUG+TyOC4AUEVQRT4NaRyXyfFgwnwbgi/5bgY4JQuPUE+/QJ30dGaoIxrd1MsHqYwy4pZDXfV04qgjFu3E6wFG4fWcr3WUGbYDyL/yC4D24/uY/vO0eLYIYfKgvh9pWFPAcMDYJf4nP4212Qg9/5E/cJkUUEv5Si9QN9fXB8VxlcrD4FPR0GsFqul3UZlgOGY8Fisn/HyjjQhIZB4p3pkD1rFsiVSqlIfp4P47b7HPYCypVYBD9CEEyzxcbOTtiz9Z/QXHshYB1RySlQVLIY1CEhUpCMxf48sBf3AyZYyZObRbOlh3bsgHPl5eIoYxgYP3Uq5N1zjxQkn+BJ7gt0Dl5Hk1xjVxdsW79ePHJRrFY4e+AAfLRxo226oSxZ/NoU0CI3ieBZWi1rbmiAD9e/Ar0GAxX93Xo9bHv5Zehqb6dN8s/BSxWO9fL9W4FmL77k4unT8O+33hq0gNEQc38/fLxhA3S2ttI0w/Fcsf4Q/BhQqI2iXD5/HvZs2QKMVaJrkGYzfPbqq9Db3U3TyiSeM0EEqwhepNEK/aVLsGvzZskDV4vJBJ++9hqZnqme1Bd57nwS/CRBvNjW+3p64MtNm2yL0HBIP1lQS99+h6YJ5OzHvgjGYsZKGtY/e/11sBJPGk5prquFs4eP0DTxC3ApCLkSXEIQJ3qc+/kOwdHC9OLJMGVaNiiUcioMHNnxOfRQilx47kq8JRp4ekW9MmGxWOD9NWsFRQwLSubAXXML7VNKbz8cq6iG3aXlcPVys6gsaCIi4P7nnqNFcgWffNzgwVlA4bLP0dJSQeQisQ5ybSlkkAIKZkyEF156ClY88xDEJ0SLFyO3tMCFEydoETzFOTlzJngJDWv/O1rl85iUMYlw76LveMp8ISNnLKxa9ySU/PD7oNYEidKuyi++oDkXL3ElGOubD4htBee6AWOP9yhdxsHDy+cDy7E+SgwMFBblwq9e/ilk5o4bctt6OzuhtbGRFsGLeE6/JRhdOllsK6e+/trnMbPuzofo2AjBOrUhGlj+dAk8sGQecNzQLoof3bmTFsFJBNnOBH+PStZ27rzX/8dIYfa8aQHpnjF7Cvxk1VLQBKsCbt+1ujqa08RcZ4KLaVjoavNeA8Ahr9GqA9afNi4Jnl29HHRh2oB+j7UKrENTkmIHwVisKBA9PTWbfSYWM2bnDdlOZEw4PP3CsoBJPld5lBbByKltEsMVQyu29qa6eu/eN3Y0RMWEi2ILSX5q5RISYagCaGctLYKR03QkOIeG9sYL3jeS5xZkimovNj4KHv/ZYmBZ//bBGPR6mvNwFhKcTkOzgQTz3kSMUMtVxoxPgvkkG/RH+uiWMTOQ4FQamo0Gz4tH7Kgo0IVqqfSo6O4CSM8c49dCR1GSkeDRNDRjedKTjMtIpdYjzPweevxeCFJJdgnfm4xGgqNpaB7o93zB8Y7xyVR7haNj3sK7hI82eqFaNBIcTkW1l8J66tgk6q4zo3gKxMRHCjq2s62NVjPCkeAgGppNA+5j4BBd8JCyL6GCtY2584uE1Uw6Omg1Q4kEB4OEotVJZ25iXoYtRvaZFFks1LqLBFNZRrFK5nbxo7tquyx4DMwUIVsc0kgC+3294neOdV/parjYRPvq7iDJm5Hj8WRLIF2SE2wymWGgTzovVpFwLSP7Dh+jjdqNUb3UCFYGuV/ILMR7rzW1SOpG2ZO8J6uqYGrrQisSTGVfkVKjdhO5WW34T+khSQkeN8H7nbwUt7s2IcEXaGjW6HRuvRdl91eHwWK2SEawRqMCs5dIITgsjJbpGiT4vzQ0q0N0bj3YIdea9JIRjLbMHk4o5eX2LDWCw2Jj3Hjw9c9b3/1SMoI//GCnRw9mGKpPdDhHjeC41FSvHnys8jT09vRSJxdtVBw6RZIJ977KKeTUPfgcgejJuFKttpe2PBCM8q9PdlMn2GHD7CH2liuoPY+jzeHBuO2GyoN7WJf40pXgHZ/soerFqBtt2G27nyKC6IVo+5BbxwRURsNCkEbjc0HZ9MY2Oltaic6//Gmb8z/dmgkOD6dF8C5HqkyNYF10tFcPRjl6pBpqay6Jbht1VlVUu9i/0YvD4+JpEbzbmeDTBPViW4hJEXblYt2v34Reo3hTBepCnZ7icGeJSqTy1BvkstqZYLS8XWwrKZkTXEetW8EYdfXK1217KYYqqAN1uYt73REcm5JCg+DtjhnROQh8T2wrWpzfGGGX0a9dbYFug4EQEzjJ+FvUgbrcTssuoRremkup0LPl24Xe6UvcMFshtiW5SvjWKCQA708eCKBmjL+x39vsecF09WCFWk2DXOTwG3cEo7whfkYX6+fibwVjZ5cNQq404DGO433VmV0J1kZE0CB4EIeuBG8lEHXTbFJGhvD6hTZ4kEd2tbVDDyEOb4m17XXjq3H4Gb/D/8NjnD3eWYe3TNK+CIs+/zbyHHokGFv6RzEtjsmdKLigIiNZlTpEa7vU4xAT7oDs6oau9g7obG2zAT/jdyYnYvE3+FuZl8zM1YNdF2ERZAO4XIJzV+n4M8EV0eZgpRJkfjzHQSaXgyZUZ/sr9m8G1SPICQmPE/WGKuTshtjQHcFGsD+pVDQJjY5x9ElYis2yNm+0eaQX0vD/1Fr7cSwrrCrmmCb8WXwFylqeu8Ft9HDw38B+x+ckMSwnpI+HloaLXo9JjAx1SyDCNu+azGSI2xc9lmFtTzthPJwx1NWgb/c4TXDkd6ExMWKSW8VzBkI82NYOnmBRbodPz8/3OA9HhGjg1ysWwLo3Vnn8PRLJyWW2yhcCPzNehgPqQp2o29M87K6cGmj4TfAjnjMQ6sEolQQbQYRbaxUqFYEajE5Xk0PUSnji/mLI/G4hMEHibtRjiHePnVMIG2bmwsmd5fD2R2Vg6Om7nmxwAGOniPYwgY08V+AvwSi/IZgFItygGJuWCoajVaAk3rd8QRFMvmc6sMFUAv3rRJMTlzV/Frw2Ow8qv9gP73y61+bBDMeJdaGzgucIAiUYXe5BgmMwxOdTZhQWgqZLDyueeRg4SnuDPS6a5ETmLZ4Dk8hoeffN7VBrGBBDLU7yi8HHzighiXgd2B828REE+JzKGH095KQHQ6U1X3JynQVt582bDhPbuyCStKkpMuBdnjiRP07g8wYPoZUOfAopPnz5BX9aoblYC5GH9oGyVQ/941JgVCJJm/GZZ8O1lYnY1rYbQFt/BWRlByEoPBL0BTOhe7TfGR1y8bGgacqP1zwwfMXtEV8HqhovQ+ThfaC6cmMhnSFzMJc8Cri0ROBGxwEbF2X7joZYB0xgaWwG88VGMNc0gLnusu27GwL/+ATQ588EY9woIWrfB/u9yFaxCbaNMrDXOt0+HFTR0QZR+8tAU+/HXhaWATYiFNjIMPvfsBBgtBo7yCLF4K0AMpktMvjW8014D54ZN7qB1dgH1l6Czm4bLG0GsLS0g0XfZvsLFuGXo7qTUqF5ejH068K8jeRF/oSvgbyoRMEXNAaRHHqiCqIO7gHGMiLecBO417McNE+dBe1Zue7ILQE/t/sGsuvCEVm86/giet9XEL1/101Prs3jSB+wL9gnJ3mP77PfhepAt7XgRLYMk6aIioPW0FPH4VYT7FNExQFbYkjwKN9nkIpgR6iyRm5oX8jHhLeatMsNHTgNroEhbGEb8sasq7PnfdpUNCfXKpNX3CrMkr5UYp+wb0NOcsRoUEdGdm39g0unGeMS/hDoUBohYsI+kL5MxT6JMqeL/bqzkLMnJ0cd3LuJ6zVOvJmYNQepjjVPLVphGJ9ZKeqiSeN9coRcNryyfFlo9TcvMmbTiH6fkZWTXW7PyF7TOrlwMyFZ9F3hVF/YJ+vpVoRXHVqmO3X8ecZiSR1RxLJsbceEnPWtuQWbTWoNtbtyJHkjIiFaFnLmZInu9Imn5J0dBTCMLzcZ0OrKO+7MetOQnrmVEEt9vZD2lZNWK2ga6tK05888qqmreZjr65XkPXNmZVBNd3LaB513pP+9OzG5RvDFwZuO4MFkM+orl3I09TVzVVcvFyubm/IZs1mUWqaV4zr7omIOG2NHlXUnpZX2xCccJ6TeNi9N9ZSickr9tXSCTHlHRwZJYJLJdJLMGXsiuf6+CMZkUpEToOEJ7LbKZEazQtliVqn1ZNjXDYSE1g3odNV9kdEnCc5YWW5E5O3/F2AA+HapC0B/fs4AAAAASUVORK5CYII="

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNzNjMzE4Mi01MzM2LTQxYzctYjk5MC00YmFjNGU1NmM0ZmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUQxQ0UxNEM3RDUyMTFFN0IyQjc5Qjc3QTA5RTVCRkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUQxQ0UxNEI3RDUyMTFFN0IyQjc5Qjc3QTA5RTVCRkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwY2QxMzU3LWI1NmUtNGU2Yi1hZGUxLTYxYTRhNTJmZjUyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNzNjMzE4Mi01MzM2LTQxYzctYjk5MC00YmFjNGU1NmM0ZmUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz56qHvoAAAPHUlEQVR42uRdCXQUVRZ9vaezmD0hkEBC9pVsQABRicoAbgkDGETZPI6KOiAO6uhRxtFxQ9GZUQ4qZEAQFWYAzyiLaBgCGNkJIQuQkBBi9n3rTifpnvcq1aQJnaS7UwvLO+ee7qqu+sut999//9d/vyUHDhyA60RkiHBEFCISEYDwR3gg3BEqhBNCh2hFNLKfLYgSFmdZ5CO6r4dKyUXMW4KIRUxDJCPGswQOJkqEGwujTOpzDZF+BJGB2IM4jTCIUkkRNDgQ8RjiUfa7EFKE2IzYxH4XTKQCtpR5iEOIC4iVApJrfKgr2bwPsw9XfjMQTM35CUQBq0GTWNMgplmayGpyAVs25Y1IMKW7mG2OnwusrdZo9edsGRfzxQUfiSYijiHWI3zh+hdftqzH2LJftwQrEO8hshDxcONJPFv299m6XFcEB7Cdx4siu35cdMYrEL+wdbouCE5BnESMhZtHEtk6pYhJMPXIf0VsR7jAzSdUpx1sHSVCE0zD2g2I10R2u4SQ19i6yoQimPzGbYj5cOvIfLbOSr4Jpqf4NSIVbj1JZesu44tgCdtUZsKtKzNZDiR8EPwWO4a/1YU4eNsav88SmY34s5C10Ov1UJCXB3m5OVBaUgI11dWg0bT3dAJKFbh7uIOv30gIC4+AyJgxYGdnJ2TxXmLduG2DNnsLpitpEvwowlGIknd3dcHhQwfhp727obmpybIhpEIBcQmJkHzvVBjmM1wokmmyfxz0TO7bTLCKJTdGiBJXVlTAhnWfMZ+2ChH9QMpMcHN3F6LIZ1iSO/r1ChYtWjRQAu8I1anV1lTD3z9cBQ319UN8SOXwy6FM6OzshNGBQSCV8joj640g27TPlk4uAbFcqPb27ZavoK21lZO0iNx9e3bBR++/i7a7iu+iPw8DzMJJBzi/1tbRi7VSX18HF84VcJ7ub2WX4eMP3sfPMj6LL2O5klpD8GLgYW7UnKdwJOsX2JS+nrc8qFV8+vGHaIJq+KxKAsuZRZ2cGlGI4LU7rqqshC/T1zFaJoSQd/HCy68wHgdPUo4IQmgG0+Cn+Ce3Av6xepVg5Bo7vx937+IzC+Ls6cFMBE1mrOCzFDqdDtatXcNZh2aNZPz0IzQ1NvKZxZ/6Tgj1JTgN4cNnCfbt2c2MysQQGsRk/i+Dzyx8WA77JfhZPnPXarWQuf9nUScSjh35FQwGXhf5PNsfwTRa4/W1z+mTJ6Cjo2PAa9xcnODZRamw7IlZMHKEF+dloOF32eVSPqs51nTkazrZ8xjf2pOTfbrf3+xUSnho2iRIeygZPNycmXO3j4uGBUvfgbZ2LaflKL10CfxGjuKzqo8Z+zKjBtP85iy+CS4qvGD2vL1aBWveWcZorpFcZhzq6Qorly8AuYzb8U41uog8y2yW0ysEk0r785ljS3MzaDUa813v0w9D8Gjza1QmJEbCq8seBamEu1d/xmlPHoWaxxhTgqfzPplTa34kFREyCu69Y+BB4z2TE5iHcIPJNFOCk/nOrbWlxbyxmjXVovsfmDoRXnhqDidlkcsFWRuTbCSYDFySGI/Y090ZJiZGWnx9yrTb4c/PPTJkc2Hv4CBE9YhTGREcCpatLOdc7poYZ/V87Yy7k+Ctlx9nvA5bxcXVVYjqEafhVLtYIXIz987szqQxNqU1eXwMfPr2UnB3vc2m+909PIXSoRgiOFyInPpWysnRHqLDbV9fFxLoB+mrX4T4mBDrx7PDBXtvF0kEjxYiJ2qWpp3LmMjAIb/OcUMN/uiNZ2DJwhRQKS2bhnRUO4CLi6tQBPtTDUcKkRORGRAYdOU4LiqYm3Sxw5ubkgybP30V7p4cD5JBOsAAH0HXhI8kgr2Eyi0sIuLK9+gwbhvOME83+MsLC2HTP1+BOQ9OYY7NmhZffyEJ9qI26yZUbtExsfDfHdtBhs5LkD8/dnCUrzc8tziVQU1dE1RW14HeYACdrhO+2ZkBQR6hQhLsRgQLtiTGy9sbgkPDAHQtoFDw7+yTn00wit9wLyjReAhJsIpMhKOQOU6dPgMC/HxADPFyc+bznZxZX5jUiGJ/lULlGBwSCokjlKIQ3K0TPk/S4BahM/V28haFYG2z4Fm2ikJwXZU4GlxXKXi+WnEI9pSDvkvY3QYovzovwSPM6ongelGaa+vNnR8rVUTwRTFyri5R3tT5sVJEBJ8TxR5ic+3UdgmSF+UjgnkgKRCNYJKGi/KbKh8zcl5Ugi+7qKBLx68WU/qUj0jCaPB5eshilaCiUHlDpz9QwzFqMPlLom09Ve2iAG1LJz+eA6ZL6YskmcStccY7A0SUiiYlszCP02Expkfpiig/G4fKohNcL1WCprUNDHo9J+lROpQepSui7DclOA9xSczSdEvk0N7SOuSVj3Q/pUPpiSjEZa4pwVSrbWKWSGeQM826vbnFZk2m++h+SofSE1G2sZxetXx1k5glatPbAUgkDDmtTc1W2+Sr7sN0mPTEk83GL6YEU9TiMbFKpO1WgNrR4YomtiFZ2rY2JhJpIKHf6Tq63qj5lA6lJ5IQh9nGg77t6BPERjFKJZEYQKHETsnRETuonpkZnbaDgVyhYCCVyZi3xmRn9d3d0NXZycBU1Hg/pUPpibQZyyemB30J/gbxLvAcp2FOaOW7RK5m9tOSym7r6fBYjTRH5DUPSCoFeydHkMnlIJEpe1bSSwQ3ExUsh2DORDBKg/hAUNOg1UJ1dRWER40BtV8SyOzdGZIcXZxBaWfZEJeuo+vpPrpfPXICRETHMOlS+gLKhyyHvQ9erEDEjg4t1NfVQUhYGKjt7WHUiGGgduh5A9zZUAK6+kLyuRgt1nXooBs1uBvNAp2jTkyG5kKGZkOpUjLaS+eUboGgcO1ZjqVtb4aSsgrQtLfD+YICJvpepeJVo80GIprzZegC2qn0Cz5KQQGBhzIPwOigIJh23/1XzqvsepeUKlz9Qap2gY7KHLQPWlCpkRh1/+RI5HagGhYNMrve3cWUKvsebcGHNyY+Hvbu+gGKi4pg8p1TwNOLl7U2K/uS2x/BJOnQE/GZwEXOFP1OATCHkVhjnMaJY0chaeIkZs2aUqFEu3t1UYgsMhkd1bnQ3dZ/nLHM3gNU3lFod6/2Gig9JXZ2FPhIwYfbvt4C7ehtZO7PgNDwcBiXNBFiYuO4eo1/kuUMLCVYzxL8K9gYcU/N+fy5Ajhx9AhDbt/wLWq6G9d9AUtXvNjvdjBEmp1PLHQ2XgJd3YUe89DrdoDSPRgULv1HC1G6RPCX6esZco1yLj+fAf0elzAW4hITISg4xNbFiDRZ9iTLmcUEkxxHrAYrQmvJJ71YWAgnTxyD7FMnBw2XpUj7UyeOw7TpMwa8jkgkjdZW5YChUwMShRrsvKNBauc84H1qOzVjjrIOHey3g806fJCBo6MTxMTFQWx8grVkr2a5Mq8kg2wpQ7MltGt1vwGKFLGTn5sLuTlnIO/sWasjeDw8PWHnrr1gr1ZbMBTugq6mMpA7+2LHNvhQWKPRQOr906G6yrpNORzQl46MioYIRFhE5EAbLtGg4va+noOlGmx02yjy5BSY7E9JJB7NyoKzZ7IZm6ofwiwYRV6qlJbNetHgolzmCyMwP7kFCqZSqdD+NlldJmp5R3/NYkDeSmBQMESi2zduwgRQq+2Nl1FU+cMDkWsJwSQl0LPZxH+MQ6PcnBzY8e+tnHS9tC2XbIBAQz2aBE1rI5Q2dMCy/BFQqZPDMGUnfBx+CfxcFWDv6ApShXntp2Yehh1a9ulTts/ysX0JgTQ7cdx44+TY44jiwe631NDQLqTvGQ+43OchKibGLKmtDeXwW2khnC8uhdPl7bCUIbenx6fPpfnDIbtcw/xO19H1+s5rzVNMLHchKCb1Ji62W3KPNXN6ryD8EPPKLnNHcHRMTyBMa3MDNNaUg0GugraO3lU/dZ1yeKNkJFTprnan6JjOr/SnwO4uaNG2ANS0gINKBpKuDnDxHA6Ot7lCVHQ0Z2Vl6/0Vy4VFYo1fQs1iAWkzlxpMu/stnDcX7pw0CdLmzoffqmp7m6dBAn+75HcNuaYkv1niB12G3kmdiup6mDtvIZPegnlpkJ+Xx6UG72A5MPBBsNHnS0Ot28FVoTf+az2cQT+ZeROBvvGm9b0bJMkkBnjEu4b5NDvIwPNzvGpBbvI7bbBEnRSll5OdDRvWr+OqqDuw3mlg5V/42OJZ69IenT/nruR7vuRjvJl1+BCcMemUEp1a4cnhlSDtQzIdP4XnJzr3rl1kRosHM/ko1ias7xyst9UrjG0aukgkkq6UWbMXzpyT9qZEIuF8+5D0z9YyI7ArAwapAfSGq+d26Vgt05sMx3XMfdzPU0vexHouwPp2SWwI4R1KoJrhjrumvP70H5fNdHBw4HSnIRoYbN/67ZXj0g7zfvJlbe905vatW5mtwjiURqxXKtbvdaynzUo05I0dQ0LDdq549bV4HF5y+rrph+92wuXS0muIvIrgDhXb+ZQx13Mox7E+8VivnSEUtDME4WTnTBcX1+IlS5+f9GDq71fJ5XJOVpCQg79+7Zoe96jDPMGl2h7Npuu6uFm40oXlX4X1mPjMsuXFXESEDrb7qjW2Sh8QGLgvPnHc7urqqrG1NTVDfu1UV1sLzu4ecNA+Cf2ia+1fm14Grtnb4Mdd33NRhVNhEZEpf1jy3EYcFuslHO2wwtf/yUkL8nIXfv/djjfQOR9S7KpdQBy0Ld7S7++O6WmgKc4eknvr6+f3+v0PpW5AgvVcE8HX6gw9FjY9NDxi8+mTJxbu3fXDS5UV5TbFzmqcBn5z1e44AnXbJoKLh/kMf/d3M+7bEBufoJNI+HkDzevyFyy0Li4h8XOsQHrhhfNpmfszlpw9k52EgwCLa2PwGjho3OAdApKcXdaUKSsqZsyaO6Ykf4MdWRdfxApCsKnfHBwSupnQ2NAQeOrE8QWo2Y9cKike/H/mvAeJyvcKsqQIRaP8A7bgg96ID7xIoB1PeLXBFuWNZMfmnc2ZhtqdfLGocDweX7O1TffyfQCuA5jxhjKQrb6379kWJPHI6MCgDNTSPRFR0afx+Jb509R+PZqG+vrwsrLL0TXVVZE42PCvqG3wvzhvmwc2AdrxniZ9ja+e6QUbvcGtA4OhdvRXs0t8PFxLvLy9cz29vHN8ff3yXd3crou//f2/AAMArjdXZD/LhcQAAAAASUVORK5CYII="

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAMAAADn2eWTAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABZVBMVEUnd7b///8nd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7b///9yosgXAAAAdXRSTlMAAARIDnTgjh6L8f4mM6f7uwJOv6VSCWbY1pAcReMWgevBdap+Kpr3ul0ZQbStQoIFXM+ZKcIQduLGD1YBH4/yvmezbTb8YzsU80yw2frsxZ1gkk+fMfbHWWqgOQgj3aGK1zIN/SKRfbZGTUp5bPmmPNJHaQx0NEaQAAAAAWJLR0QB/wIt3gAAAAlwSFlzAAALEgAACxIB0t1+/AAAATlJREFUKM990uk7QkEYBfD7hixFJUqWlEu0KUmRPVRIZctWdtl35/83t642dzofz2+emXnnGUGoC1WiahK42tyibuVpW3sHNFpl7ezSAdCTghq6jYx6jOj9ryZzH2DpHxjEkKpercM2wD6iIhIxSrU65hgHJpzSyS7oXDXq9mgA72Tpzj6IVFH/VIBdZTr4N9EM3GUNhWeBOV+kPO88LAuyLi4tAyur1a8RxRoVdV3cAKKxeKJKg9gMFXVrO7mDYlLpzK6se3AQyTv7tfvhTDolrTgoaQCHZZWTiMeyiEilGUdUryweHEulHk4lPcEp685gyylpHuesu8AlKalwhWu6we2dshZwT2E8kLI+sg9hxxNHc1k8Q23gKJvJixfi6SvwZuVqHngnrgpJfDTQwic10K/vRmr6qdJfMORCiJ+giVkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMTlUMjA6MzM6NTYrMDg6MDAx47OJAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTE5VDIwOjMzOjU2KzA4OjAwQL4LNQAAAABJRU5ErkJggg=="

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAACbCAMAAAByFl+2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC7lBMVEX///+1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbX///8Mv/KzAAAA+HRSTlMAAAON7v3ROmjnCKME3iulWtItnWGWaZFsh3iEhrYqww0Rb4pmiCA8W3ccTqxLtBQi8ILd0M36LCQ0SJm3bsCTPr9kmwchTIm42/z+1n9HH7vUyMHXTxYdeet2Bgt6sNpwD2vgNnzyX7n2ZQGoFVmmQeikBVbc6osYAiXVL1EMtePY0/tEP8R7QEl+ODP0OVQnzsu+GsKageIJksUbvRMuQnOxUpieXikm9QqpMq5XcsYe72MwGbwoqxLt9yNT7Iz4Sn1DcWLhgG1Yg2fzRa3moTffzM+ODtlgp+TJF/mXXMdVnEYQn4U1dY+g5TFNalA7oumvyrKUqvIdxXgAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAI+0lEQVR42u3df0AT1wEHcB6CVUQFFawoEq31B4qIP0DE1Y4hRWIVUasoFDItW0b9gfiDiKg0Wmix1skPf1RRbJ3S2apodUL9tSnMzrZTq2LL1G6utdbuR9d13z/3LoFoYpI7Q3gXcu/7R3JcXpJ3H+4ud+9eXjw8nBBiEc92XmAV7/ZPEOKMhXBqLEU6MPMQ0tHH9UU6oQNhFd/O6OL6Il3hx0yE+KMbF+EibV+kO3pwEbMEIJCLcBEuwkW4CBdpVZGeeJKLmKUXgrgIF+EiXISLcJFWFenNRSwShD5cxEKkl8WcYC8npK87iYQ4o9G9mzuJqPo5IZ7uJML3I1yEi9gX6Y+nuIhZAhHARbgIF+EiXISLcBEuwkVcSmQAF7GIHzpxEQuRrlyEi3CRFop0eFpaBipGRGrL8yDFiAweIi2hihFpxXARLuIWIkMxjIuYJQzDuQgX4SJchItwES7CRbgIF3GpcBEHRMJHtDQD3UwkoMV9NyPcTGTkqJZmtA2RMZFRbVKk9TI2WiWfiNRKMhURIqPIuBgpGa8gkZ9I3A0qRyQQzwwQzwRFiUjpB/EsF7HIIPyUi1iIhChGJBY/k1ckbmL8cwmTIhLVEZOHPT9lqtWv3DAVkXZtqtVEBvZIEgZAm5Y8fXryDGEUumEzX1CyyKzZKYgcNmfcxLnCX6ldZqa9CKRnaBQr8vNRmBcYZT5v/kuZaP8LZYqM+CW0vzJtIllZzVOzZqvx8gL5RBZikTwii7OxZKowkRO6NGD6suUdZySsiM/VCXNWJiBvlWwi0s7hnC+Sj0TDUI2r89cA2rUFr0xLz9YDi9bFCXPTkLJeYSLxyJxiuH8VicMLi3KFdWXEa6+PB4KLhPlL1ZnFihLZ8IZ2I73T0Ia4FfMffmAxnfOUD514E8tXKkik3zLMpHebfo2EVZaPDdqMklIiDAlbltrGRHLXSUmxtZcrxxZ6G70Vvbc9+qBmO8YIu9yeeF4WkfV4xkERP0ntKv5WXm0K3vIlZMcoWwNopWEnPWSrSMcuOUSkbQ/WSu1OkpLyR18spwwb6G0JKm29XR+8TG9fw562JeJw3sY79HYI9toskRWM39C7F1GsCBGfJOwjZH9V3ru2y4Sv9aJHs7sjf6tzVZEiBDtN5ADeo7cxeN9eoYPCoDhZhxDKXiQamyUshTOvTlQKFofVyXPtFUrdWr1a2MUeYS/SzeqnQSuK+JRVjRW+5nbQfrHtGEzI0ao9ChD5IPKYjniWZB63X2w+fkc3m3nZWe4vEoWehJzQl4mVq1lGGxjX1H7o/iInkUHPa+x89DYl4RTFOH3mLHORfZjMVqQSC+mpLX4vVm5C7R8IORd5nrnIYdSxFRmJeHpNRC06JnB9Yj69UhD5R/cX6YOz9Gqz9xGxcnNwgZAe+oPuL1II+r8/j3Ni5T5KpA0GGZGx7i/yJ+EHG8aJj9PY6SI9qak/s9T9RT7GS/TCFT4RK+f/aTghf9ZeYi6isdlBrpVENgkfvNsu58XZL1ahv0JvN1dp3F8kPOIzekYTo19vv9j7uErIteXXifuL+C5KjBZag07bL7YGtEV6qD5AASK0lb2SkHcn1eywV2ifYaPpjiJXFZlpauB7kL4Ofie8NHuGhpAGtLP3hjeEo5bcz9duYy/iC70EEWtXh6W1PFsZN+CqcESy7ZC9IQXCEEzP8zIwh7AXIYCDIkcdHVtilfcXtCl+HSY32no7TfpfaDO8Kk+7o02JOJ6bGECEhsMkH6sPZ12rV9PmIrLF1Krk9iKlXplCs0cAjvWz9nDjyJRCerdLn35NKSLkFoRW1qxy5Fk5Kul2O/tL2nJW0RmLm2exFTmDOPFFcPZICuX4q3CXBn3PcPNHfOOrl62iIFl7MNI0k61IBDTiSzBAUo9G6VmdZBwU+G/peON0lKkCnr5T37m85I4w+feHe/q4oIjTx8zLPYSbwrqZMzuP9sW72WHKE9Hzz97K+OrQzjDDmpKPvQ9d4FKCCOkXjPFdhIm5ft0nCwcu3pFnakPeO2b4mYGcDK3ZD28pQoTotuNUf+PkneKTsf3PHcn/Oo4YeuTNqUWav/dZuURqcEIWEfqJU43Rtyxn5oReLUPdx+SAOuJBv062InU4LF75u1jhfBFS+g1QV39cpWueoVNVXEgGCoX/UQ+UmQ7gXFCktUbQH3vvW2DrorthGw/c//q7uzc66mvbo8C40j734PNNQSJ0H3Lk3mfa5tPCqjH3BtPzuwTDSuNT0nyi54oiWx70CXN+fO7nPxn0Ue+0f/zzqKG/wI0m/vB0rHNZEaa/g0UbCox9S+5frNkvg8griBKv5NMsRci+avW/DBOxuKJiL+Jv45eGzML0l0qF4dcKPjBMfIN/cxFDMgw9s+gXtJIMe1e2Ip2xSbyGe3GeqQjp1HQAFD5JvZixyNxE5IhXsCv82IqoRsP4taP7Vd+PdcW2+P8IjcVMs9+rae/agC80TEXioJVQv9uOjMXbsnyHPGPL9AQsZCpCvsdU0dp5ZmKBaCFn55zQN48IPfdPsxUZjgbRyl3CJOYgRLfEeCU0Bg1sRRrwqmjlvsJN9iIkdTT9zNeU4wcVW5HVp/C2SNXiUrBRBhESWoeQ6/hvBePjEdrp59tc+zUbgmSWEKoTzccDfT9BTYYP6yM0oiuBf6m9Gq6swm6WIkv7N8o8jtGCPHx+yXYFNQXGiyvMEuLVRe6RnRpvw/vHOzbq13gF/iqmIrKOh9ZUh7ir3qjuNdFa9S51RsELj7E4biJCvwa0k14xCancpTOv3Ikf9Xirgi2Ii4jQlSEmgrZ0XgzZHjsuqslgf7tMYJrfl2xzYTmaz+0c8Xx0yaS8jDUR2pp3MuB6UxOwNmXepx2rWzxyooP5IcsJIq+bBnPzEO0aFmhDRMiOoYX3Qi7XGkeC/J88qb/WvFwk4nExw0wi/qZ5HqLPqiMeYv+C1Fkjjm/oS+RLy0XeNA3m5iHaNSzI9KwPjStNsfQ6yrabe+yt5qE5j/GsMCNskHy7dhcLOW5caYq4SFPk3SR4eHh4eHh4eKTHdQ7rXSV0IJtHMoiLtF2R/wPyCSwishauuwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNy0wN1QxMzo1MDo1OCswODowMEdOW6cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDctMDdUMTM6NTA6NTgrMDg6MDA2E+MbAAAAAElFTkSuQmCC"

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQzAxQTU2M0JGQTMxMUU3QjlERjg3ODM0QUM4NDg0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQzAxQTU2NEJGQTMxMUU3QjlERjg3ODM0QUM4NDg0OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMDFBNTYxQkZBMzExRTdCOURGODc4MzRBQzg0ODQ5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNDMDFBNTYyQkZBMzExRTdCOURGODc4MzRBQzg0ODQ5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U7svjgAAA8RJREFUeNpitKvbyQAFX4CYh4kBAU6BCGQBR2QBayBmBDEAAogRaoYfEDsBcQELkPgPld0EMgcksBWqDSwBMsMHKgBSNQEggBiR3PEdiDmRbM0D4qkgHRuB+BOS5H8oPQmI/4Ls8GdABYxIbCcWNMn/SGwBIN4HEEDIbgCBo0CsDMSyQPwb2efroGxQCEhAJcGmwawIYsAEILeUM0FVP2HADjpAChKBWAbNobthHJAVS/B48ykLcjijKfwA8ioTkq56qEIQfgkNBwaAAEIPBxCIAuKlQHwZFL9AfAiIVYA4AmrIcyCWgilGTjLhQPwViJdBbdQDhTQQ/wHiG0DcABWXgiaef8gG+ILCDIi5sQTVfyxiIIOZQXKwQNgEpdmB+CcDcQAlJhnxKMQnhxIGr4E4g4F4AHIBH7IBokA8FypxEIcme6h8P9RlnwECCFs0wsKiB4i9gFgaiM8AcTtSBsXqBRh4BcQ/gPgNENtAXQaKwg6o7SgpHznHMUPjvBCU29EM3QPEulBngzL/GiCOQTcApNkCiE8SCDgOaFSvAkU/zIAmID6ARfNxILbEYhCohPkLchHMgFoc8W2BwyWgZHwHiJ1BgfgOKvgOWl4QC0BhVQUyYBFUABTqL0gw4DAQGzFBsywIqOEJuP9YMhUoet+xIAUKqfkgGRSdMAN+MJAOKkDJgAnJBf9J0JwLKhBhlQOsapkDDUgRAprtoTULI3pKTEUKLFAVcAyLZlDdYYWsDz0zpUFL241ooQ/DO6A2/4VpAAgwXNkZHYAMLQLiTCK8iJyrJ0PxR2JKNHQA8uZsqMvfQxsK0VAfEIPDoeXRB6RCjJlYB8yAVqrB0PwIMtAWiHeRkFIOQOMLpNcBWgf/QS+q0B3ADy3b06FYiEDxRCw4CI1GUK7Nh7YWeNAdwA4tYUSgLp9FZMVCSv6ZCCrBoNUEqLJmQnZAD9TyWmg5SisAqtQ7oY5oBzlABxrfOVAFzVBfVdDQEXOgdAgopV8BYmFo3LNBJXyw1aBUBK+htBAsCj5B67rd0FYqsZafxFLk/0dvZWIBtlD6HAtagnIj0ScWZPgelC37oOw2JiwNmlNITUxqAyZoqKlC09hedAeAmhtdQBwJ7USZU9FyJ2itZQrEAdCcgLUkXANNjKBK4gRUUwaZIcIIrTtBFfZeIF4NLeI3YmvZIYPfSE3AUFC3DYinQ/lXoY48Cs1B76G1G6iNoQHEdtAiXAeq/jm0DlmLq8IhBFZDMQiwQhMqqJJpBWIFqMW/oA65B8SnofG7C9bfwwcAgwPX3EPyNdMAAAAASUVORK5CYII="

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyAQMAAACnNSPJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEXl5eX////ixexJAAAAAWJLR0QB/wIt3gAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAxJREFUCNdjYKA9AAAAZAABV0cjagAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0xOVQxODowNDoxNCswODowMH9qJ5QAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMTlUMTg6MDQ6MTQrMDg6MDAON58oAAAAAElFTkSuQmCC"

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/menzhen.af86147.jpg";

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAAHFqKHzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphOTg1ZjYyZi05YTlkLTRiMTctOTFjMi1mY2VmYzg3YWUwYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhCQjE1NUM4NTc2MTFFN0IzMDhFOTdDMkJGRDY1RTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhCQjE1NUI4NTc2MTFFN0IzMDhFOTdDMkJGRDY1RTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NjQ2ZTdlMC0zZDU1LTQ1MmItOWRjOS1hMGQ2ZjQ1MGIwMTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTk4NWY2MmYtOWE5ZC00YjE3LTkxYzItZmNlZmM4N2FlMGM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5aNUowAADS1JREFUeNpi/Pz5MwPFgAWIS0pKKDSFiYEaYCSa8u3bt9FwYZgxYwaQrK+vh7Ah3BkwgC/tIoOZM2cCg1NSUrK0tPTu3bsQwa1bt96/fx8e0lxcXATcoqCgAFR079697u7u9+/fA0mg4ObNm6+AARcYYDqKEZgb8ecjoP2Ylo/mAAaCgTJavtDYFIAAYqS8JmEZFHXICDKCYL0xbMKCBbOiAIKMjAw4G1jW79mzJz09HSIIJPEZAZQODAxcunQpRCdc/Pfv31OmTIGEK2ZZjV7XrF+/HqICUj8g6wGSO3fuJFzR4AdAC0Z0AqdHXTlqBAIABBDhBgx9ABPD4ACj7hh1B43d8Q0MRsNjxLkD2NE1BAMgOxAM8KgEkkCVEEZ0dDRaO4i05hMaaGxshDBYWVmBDaLw8HB4ely0aFFcXBxaagU2kc6dOwdkSElJwVUiN8nIdAckGIAtHqAFwHpfU1MTUvtDGnPwlgDQykOHDgG5OTk5EPEfP34ASaBeuN0EA4YK9RyukYTR/DIM3MFCuREUpozReBl1B2EAEIBds8eBCIjiuO20QiVxAwWJkKjdRaV0ABKNyjX0GjcQH3EAidI59sXLvogCuzuFyJtiMuNj5jdvMPn/zUuI/S/gfbmDaODngzmYgzmY4zYcQsQtzwtzMMfjdBSJdNDvsiynabosy065o/uwOzjPc57n23aOTYeTePR9L63bBgCirmvP89DGwEapgNdA31CFWyCfpklkPIZhcBwnCAIo448p6WP9QIrjGAtJkliWpSiKqqpN05imWVXV9iN7GowTjnEcIQxEQL1CbhhGlmVkCXVdp2ma7/tlWULVdd22baXVNrqIcsSBZhDKaNu2AYtCgjRwCseNmzJIc+MGjSiKrkTix/elKAryzWjE0OX20UafTtf1L/RcGIZ/rrdCrAf+jjEHczxrvb2ShJiWPC/MwRzMwRzC0lsAds5YRWEgCMMpImhhYynWor1ayPWiIgjC2YggCGlSC5a22ijaCPcE1lpY2dj4ADY2VtrmAWzuZ+dcQs7zvLuEyPH/RRjHNUy+3ay7OpNnycthtxAHcRAHcRAHcRAHcRAH9SEz9AjcfwP49VMORwdxEAdxEAdxEMe/w/FVqUQymUyn00GH7il6ebygJRAckkkiFTmegM7n8+Fw+BFB41riA6PX6+nT6vbwwO9uXyqVnmVVis6fz+cI0bIsGJfLRXI7arUajtVqdbVaSdrH/WWoR6lUCqeKRqM4AsRms2m325JWYlzTfe7Adb98PLvDBxz1ev10OukLA4vJZLJYLJbLpeDQLAqFgv5UPp/f7Xbw2LY9m820X1BCx+MRdrlcNtQzSjKZTLPZFLtYLOqEGi03IF8W+L/EMRwOcevKcLWUYLwqGSpBSwcniTkiqdjy+N2DpdFoVCoVTD2RSMQ0zUQikc1m5a1YLAanPi0GpuM4HgSPZIIFuIVzlDxOxP25ZbfbzeVyN2PVJXeDwQA22rwoTafT/X7f6XT6/X48Hh+NRjohSvrgj1cezo4WPbZer9+Ubt7n+tkMwgLGdrtttVowZD7GPAXD/cyH8XgcBAvDl6pBbvC5DCMO4iAOijhCW3d8q9C/XDk6iIM4iIM4iIM4iIM4iIM4nljvArB3tqCqBFEctxosNoOC3yCK7dkMFsFkM5jMKoig2WZQLFqMgmaDQcRo0WgQQc0KBsEgIgjegweGYda7l+fH1ff4nzS7zO46vznnzLDu/OdTpHg+BceDK1n/J6tWqwgW5A7gAA7gAA7gAA7gAA7gAA7gAA7gAA7gAA7gAA4YcCj25o+hlMUc+OoYwQIcwAEcwAEcwAEcwAEDDuAADuAAjnfi0NlFV2d33WdZNBpV9vp4ipzJPa9/5AcLTZFarZbP57k8GAxEhWKx6HA4vrtVo9EQGhRiXxfDVX1D2zx53X0wGNxut+v1+rmU78FBP4v63+12t9ttw1XLxXBVkCAK3W5XqSxvLURohsOhLLSgvA3jBjMIKhNrq9XKWgZP6fyX4GCnaDabsVjMcN136HA4UIEAyWGiRfNXRrEgb8n8O3YnDmIhH55OJ6/Xe7lczuczK90YbonaWCyW3W6nI3bj9/u5kE6nA4EA63pwEE0mE/lCepb2e2nhQcqGVy/HsVqtXC4XFcxms8/n22w2kUiEYmG/38tKN6lUymaziauMRiPLv8hGzsUSOWR2u50LlUrlz9U4v/yYdwxvFLvxeDzxeHy5XBIL6u1Op0P9Ru0kFkrN8Xg8m83EYSaT6ff7ivAPoRRl5khAuTJ7GRud1EohfUSwLBYLdkVZJatcLnNBbsN8Pleu5f5UFI2+M1lbihkJczqdxOtmmn9D7tBP9b1eT3uSQomGHnZpeV97uU6pVJI9XxzeDAdtyx8ffR762+lmV9z8TSaTiWYf+umNYkFu8C+PKU/Aoci86RilRmUwkgcpHiNoNKEpDHmQkDyStY9arZaYsNAwL2ecT8Fxs7cV72B5MZqDyLMvYYlEgtItl0OhEDeehklWgyI0yWSSUnUul5M1wV43H3mtd2SzWcp5hUJBXmI2Go1kZDxe0OzzeDzymel0Gg6HCQdBpJq8oSOhobvV63UiRXd4UbC8efHXR/1ljcVfeN8BHMABHMABHMABHMABHMABHMDxz9qbv0n/KHVOeAdwAAdwAAdwAAdwAAdwAAdwAAdwAAdwAAdwAAdwwIADOH6wLwHaO5dQaL84jlMUSXJJWEyu0ztFUi4rhQ3lEhs2UkJKFlIWFJKiKBEbWSjZUGLBQmOFlFuRWxENNabkkuRSFv7fnP6np+cy72P6/1/zmu9nMR1nznOZ5/k8v/M75513zvcvsUm8E36PkjCQEspBKAehHIRyEMpBKAehHIRyEMpBCOUglINQDkI5COUglINQDkI5COUglIMQykFMEeDjn9/NQhfe9ntMjByEchDKQSgHoRyEchBCOQjlIJSDUA5COQjlIJSDUA5COYiP8Oe+z5GRkSHLlZWV4eHhy8vLDodD1Uy50rnVak1ISIiKikpOTo6NjUWNy+Xq6elRbYJmISEhnp3V4eHh4+OjqrK2ttZisfj7+6vqFxYWTk9Pzaxj73Q6xVLjWrB5YmLi+Pi47prufv+uAf8/rdHupXLEx8eLQmFhod/nsu7KSqUc0KixsfHh4QF37uXl5fj42OhCCyCQ7hdzsrOzoeDOzs7d3Z3RtldXV1o5YEZSUpLy/ok7KhQcGBgQlaGhoYODgzjP9vZ25TPwvYvC/5VyzM/P4xFvampCeWhoCI9gRUUFREH8wFva9ltbW7r1WrAH3fqUlBTIsbu7a/SM+rn9Jph7YEZvby8Ks7Ozynoh0P39PeX4GgjXQUFBKLS2tsrKwk9E+fz8HL3G+/u7ql5FTU2NmcN9fHzgFXvzzADlhnJXgYGBRUVFBQUFwcHB19fX/f39CDw2mw2R5ubmJjo6urS0FC3tdrvRQcWufhtdROei4uLiQsatnyaHMvwCVeSQVzMrKwuvY2NjCB6iZmpqyrwTEtwwEYE8O9vm5mbdeuRAw8PDJycnsgblmJgY9G4oq94yQvnpVHjPd1f/nBxCBW29MkIsLS09Pz/n5OQcHByYuand3d3CADcIsdyD487MzLi5f/JAiBO3t7cqy5UUFxe7v/fsVvRzDlUOoY0cYWFhuO4I10j0zOxTO3KRtLW1paWlISFYXFz0OPZ81SczvkZERIgk2qgBei7dsdsPzzlkqEhPT5edKNJGMTgUnfHr66u4xMpNkItgWGH+EPn5+TAD4whhhvcA+5Ejo/DrE902YgiNwdG3D2i/QQ70qfjkRoMU3QkSpG+4ZCY7Y7RH5ovC6OioahPtHtzkqtqcA8809hAQECC6D9GDGD39umdbUlKC16OjI5ybBwnpz5dDTkIgZphpiXGB+d3W19dnZma+vb11dnY+PT2Z2WRkZGRvb29yclLZW4nT29zcRB8nx65A9o9xcXFQHBmSjPx4t6ysDAWjWRk0ENnV3Nwccw53mJ/GMDOthFvV0NAgZlGxW6OZD6OJMovFoqqvq6uDlCsrK7IGaRCca2lpEX9CGnFEMWeDGrh4eXlZXV2dmpra19enVbOjo0OcnhSOchhmHkbTGF/aSV5enujFkWHI+2QEkpuzszP5Z2RkJMIMCqurq6qkEmbgLipv8NraWm5uLpJo6fTExERXVxe6MDl4WV9fRxaFo8Ak5clYrVYxtTM9PY02HK0Ygm4eV3B/f9/k840rW15e7nQ6tW9tbGyga8fz/dseBJmd9p9gHA6H3W5XTUvYbDacIQYjqtPb3t7GQEOZoyAAoA1OAHFLBgMU0KNVVVW5XC7ZEpZg9GSym5Op+rfL4etrvPE/UhvBNd6IOygHoRyEchDKQSgHoRyEchDKQSgHoRyEchBCOQjlIP8Bvv7b5/yBc0YOQjkI5SCUg1AOQjkI5SCUg1AOQjkIoRyEchDKQSgHoRyEchDKQSgHoRyEchBCOYgZ/L/0E3fEp/gH92vK+/qCqakAAAAASUVORK5CYII="

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAS1BMVEX7+/v7+/v7+/v7+/v5+fn6+vr4+Pj09PTx8fHy8vL+/v7z8/P39/ft7e3////19fXw8PDu7u7r6+v8/Pzv7+/p6en29vb9/f3s7Oz3oMiKAAAAA3RSTlPo8/Y2yKCRAAAAAWJLR0QOb70wTwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAv9JREFUaN7t2+t2oyAQAOCkXATBoMZi3/9JNwImWgXUZfTsWeZnY/kyCAzKye12vyRuty90SXzd7tfA9wxnOMMZznCGM5zhDGf4P4Lx8SDHYVqwleDlGCwcQh6DSbHeXiUfLlQdoTk+ABPhaa1pSwc/OxYLuh/2uaxu+Zgyj8IM74Wlv63m++lgGutrxoq9sEuGi2XwpnZwyYQ3eDBlL4ztf6n1DwVyMgnMGWqb0Ptg29PCdx+Eg3vvsH2FDvS1F9aBbzvMNOrkEIwDX/4gjCh3UwoF+hoCJkrHU4aAEeZ9dHiBwEQX0eEFAn+mlL8SwMBIW7g8HZb2Jj/hYSKV0p87Ku2EIuCwtItvMY5iV5Wxr/Clgt/VipMZTIFhvCh0DpbA00lNSqxJmbjVWgPD072GnMIKeOWabirMXzFewFgX/LVxUJJAZuzg/n0JnWzSCpwMnm51bavElkU3jX/vSYeOSALTT5u2JYqm6wdd7Ddfsy7NPFbzhBF9TqaxZsvgJNHK5eTx4cAt1QZWbC1EqrUaK8GL98rs1g+Efe5riCWC5+EyftDVfp4mnhpWbusj2bkwFnZ09bGnmPQbAZcyOxseU5b1yfCYctmdDY8pi7NhJO3WGneQMFl5i4MbWyhqMJhoUwO4mu82cNUYuKiBYPkpPcU0bdF9m5RRBwPPl2I6vcSlDNPVv0vAWCaG2uNSDk7lo/CyBFiZmP6vzFzWXXqYrjRlZFvzGvN83gHAq6/QFBlfNzamLLfpuzpSay2Mf5IPLsW2wKJKDosoPDxPVOnncTQGuG/Tr1ybYB3saSj49SDDmovgFqAsxmHyIC1AWYxGhR5F+BbDwQ3EnmsDXLZpd5mx54MRftKfyCU7X5TjLewA8yZyyc6jAbThZGeA+yp29rTzMGRjX1codot3H/+gaIEwcGS99B7yhY74tnR2xyM9feCIz3uoOY26C/b0oUNN5DvGncuBz44e45rA9Gj8zcE1YGQ4wxnOcIYznOEMZzjDGf6n4ct+THfVzwf/ANGN+9lsYb6sAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTA5VDE0OjEyOjAyKzA4OjAwurhplAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0wOVQxNDoxMjowMiswODowMMvl0SgAAAAASUVORK5CYII="

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAnCAMAAABnuz2tAAAAmVBMVEX/rzz/lkD/rTz/mT//nD/4uGb/mED/pj3/qT3/oj7/mz//nj//nz//oD7/oT7/pD7/////qz3/qD3/yXj4t2P/sD//pUH/qkD/rT//mUD/m0X/8OP//Pj/6tf/oVD/w2//vl//273/yHb/qmL/1rL/wYz/vmb/sUf/0qv/yJn/vIP/s3P/rmn/tlv/pln/9/H/wo//5M3/w40U4CUpAAADnElEQVR42u3dbVvaMBiGYZ9tdm469mgnjvQFCpQ3EZH//+OWGlIJUFrXIKHe5wep9RvHZY80pOGC9vOq6HS+1vPzkG//6brYTaFfhVqFfpT6XeB7qTvTVZnbHV9suGgakiwWv1gl0XMYPkfJaoHiUbxrSLJVfGcW8YZo1kHxH1n8LYqvkLut4h8D5jBZzWMh4vkqCZmDR4xqULxLSLJSvBjKvFPxlrBIZf5DgXE8incHSTaKjyMOp1tti2nIUYw716YUf3H+qKqS2gMOBrt3rgN5OsZcDYp3BUn1ixeRzFodmsHHAUcCs5NWir9D8TZyt1D8UNeuijd7H757Oh7Fo/jjIKl28Y8cDtTRbvGDkOX8DIpH8S4gqW7xnYCn+ni3+CkH8hDFo3gHkFS3+BkHwtMGkyAMg8kgL14EPJMvKH6t/dTt97u9MYqvaNxTb5il3GsXH3GqD8WQ14ZCX+NTjmS6KF556vvKqI1rfBU9f613f9LcdfELDoWu/YVzL/nJkOX6GRT/auTnum3Lo5qrBhZ/P/Jzo5PmrotfcvI2Q7NhqM8mvJTVonjpyd8wkidQfPm1Pdc7fe5EST6WGbBh4Clp9v/QObPib45RfLvvb5LjdyeKd3eRwdg3jB3IPeI5qa4nbJh4ypwj+RPF64u7cXlH8eUX91zPgdyfOV6P4wM2BJ4S84e6dNfIN3T/wGH9rTfMgdxDFvmRIfQUwRU1Pveub+hewmG+qY/ckXuDOZh7NphRMJgpMULu7+PgYCa7VVVKblVNHSfvXK+Peue6favatuShnr813B+Vg7eqCaekHJqI9FB8q1U8Ealhrsb1icglJ/qw8GMm+RPFb1/eR9nkJIo/s4+ZskUEpJiLCIhILyKQLyg+YywikL+j+BKOLSKQIk5J9z7htaEgxUvV0P3TF6/iflsipmqvWPzn3a7GoSViSrYAmDS9AJi0bAHwybckc6j49QLgh1YGxZ/NAuCcF/CUCk058IiwCZ8ufgOKr8KFxzsM2cN7VCB7eA/bTp7+ESgUnyErskezaa/s0WxstIriHSmerBARR/He2uUfBLYWRvGOFE92vG6rRDtet1XCZtoo3pXiyRK1aR4Z1KZ52D4exTtTPNmy3hKVcustUQlfmIDinSme7FEbXqdqw+tUbXhNGRTfiOKbsLUw2bT9dQYeSSgexTtTPNm1WOovq1ku1BkUj+LdKZ5cgOJR/N7gm5k7ikfxH1L8P32G91S21QfQAAAAAElFTkSuQmCC"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAnCAMAAABnuz2tAAAArlBMVEX/rzz/lkD/rTz/nD//oD7/////mED4uGb/mj//qD3/oj7/pj3/mz//mT//nj//nz//qz3/qj3/pD7/pT7/yXj/pT3/mUD//fr/8uX/8OH/7dv/6tX/qk7/+/f/3Lz/wo3/oVD/p0b/mkT/tGb/q2P/zJn/+PL/nEf/o0L/4L3/wIL/vl7/2rP/x4r/1bH/0qn/yXb/yY3/u3H/rlf/s3P/xW//pln/s0b/5c7/wmiogXHJAAAFBUlEQVR42u2da5eaMBCGm5ax7bb2olXuIIKKq3jfbvv//1gnkLAi4F7KUZB5PkAO+23OszlJHF7esWI6L2E47D7Dp/N8PceHN/KtnO+lKG/g7ll6GfopA+TLWT6f5+cpP3K8r4J3twZDKjT+t+sYU1WdGo77m4wvMH6/nScFmm/3ZPzFYUhVxg/vTTjCvB+S8ciR7acF6ldq/A8y/gW6V2X8QQewHdcfjccj33VsAP1Aq5oj43e8QPOtb3me5W/nvEC7wYCMvyAMqcT42QpAc2fdlJmrAaxmqfBtN95bAmiR97SO9yINYOkNyPjLwZAqjB+ZoE7G3QzjiQrmqNsl4xGLF8jL7lw9XiCrP2iI8e+aD3spz9iugxbkd66BBjr6TsbfWVggP79z9bFAVgVnNT/J+Ep1P2/8zARjlAyzwo8MMHE903rjPRO1LjqrsXQwvZedTn4m4y+qe7nxS9Bi2/PGjzRYvvo4/vaMxwJZxaeTFhYIZSfjLwJD/tv4A6iBGOaMD1TA85mWG78D1S87nfRV2PX7ZHwRNdA9b/xQh4kc542fgI7DVhsfYoHKz+OxQP1ej4wvoB66nxh/D9q4IwnWuqrq6yA1fqzBPd7abDwWKLyT7NeGqmpLPzU+xALhjYwv4XHxsNk8LB6vo3veeBNcORyvQLCayTneBRPNbrPxJkTpRL9WIWHuyTk+AhOvZHwxi1+CxXV1l8b/Bnsmbf8DKX/kjD+zAftnWmz8HmxP6j6HFEM+9GzY93pkfCF/f6X8varu0ngXnI5gBUes5FMHXJS6vcZvYS5tn8ATT0/nsEXPyfiyuV2yuL7ujKHNct0OGYL4ofh/GDbM+O/VGe9AJFY1lg3H7ITuETjnu4Vb2zr5uDnWffNYA90NCMQ6fg0Z1kJ3Hwy8ttd4A3x+k5N7fnrHAuGVjC+d3CWLGug+hZFYx+uQQZcdBtBupmApCX9O/iA7DGD6kSjiIav7Qw10V2GcjjKocgML7UaFUEnQIIsljmtA/UgUscnqvqmz7jbpfqK7Dlk80r1xuovFDEKLGVrM3PxixoBAjEq2qgEYnTzDWu5cv1W/c5VbVeTMVjUL7Vxru1V1wBWjcweRnfYa70AkRucOIu/I+EYcRKLNclj6MxNe22v8FuZK0fSOT9OfmfBKxjfiZybeRCCG2SYCfCCbCPDWXuN5E4EcZ5oIFE7SRIBek/ENaCJATHDl8LhFTDzquGB2kBYbb0Ikh8ctYvJZBOZbE5oGt298jVrEEngDMJPwBmBbXwdMwhuArx5Jdl3jeQOwIsEG4ClvAFYkvAEY53gyvt4NwCkdHSaslAnoHcbaHcKHBVJKwQLd4e3VxvfbY/zVX+/IcAA7YCUENhxaHzu5A9tXSvBt2L0iroaMv7rujL+azQrhr2ZT0KqCBbKUQiwsEL+T8QXUVPc4eIMVEAdvULSw4mGBrELbsUAeRQuXUFPdWRyrxHLEsUoUpo3EsUpKjjhWicK0y6ir7jiN89A8loGH5hkjio+Pjbd4gUIlQ8gLZFF8fCm11Z2JSFSWkkSijhl9MCFGCZNIVCUliUQN6YMJ5dRXd8ZE4HXAA68DEXjNOGR8wi4uUORbYWj5UVygXYM+EXIL0cKsSk7T+jsMIeOfOC1Q0z6K03jjWbUcf6yGZajc+GYGre63skDbfSM/A9Vs41kdaJfxjf/wWdPCO+qmOxlfc+MbH1cj+Adg5gsjNIenBwAAAABJRU5ErkJggg=="

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplNGExYjEzNy05YjcxLTRlNmQtODYxMy0wODUzYzJiZmFkMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTYzQzg0RjdDOTBBMTFFNzk0NDlBODdCMkZGMDU1OTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTYzQzg0RjZDOTBBMTFFNzk0NDlBODdCMkZGMDU1OTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MTA3YmYwZS02NGVlLTRlNGYtOGY5MS04NWI3NzhkN2U5YzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZTRhMWIxMzctOWI3MS00ZTZkLTg2MTMtMDg1M2MyYmZhZDEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ndoK4AAAAtRJREFUeNpinD17NgMQMALxYSC2YYFy/jFAwH8mIHEIxEpJSQGLgARsQYw5c+aAtQIEECPUjBdALAHS/x9ZLxyAOF4wDkAAwfT8BGI2BlTgwQQ1DF0CBHaAJCUYcACAAIIZCwKdQFwAxK4wD7DAnIWk4SBMIxOyBMyrUHCbiQE3UEGRXLp0KQMHBwecz4Is+f37d2RuChM0rNHBFyCeCxBAyF4BgVNAbIrHHUpAfB8WzjAN/9E1ofkMBO5B1TEzQQMNny3YwB8maEjjBMghgp4k3HBpgiYvbE4GawRFnSYuzT9+/IAbgBSqjLDAuQENemYgvovDjGSoGl4QByCA0KMDBOyAuA0aYO+BeBEQl6MlMAbk5KEIlQQ53RqawMWBuBSa4U5h0+gGjSN8wBSaleAaQf7aia4KW0hCXXEKpvEGiZFvCgtVFQbSQQcTA3kgHqfG9+/fMwQHB+OSFsSpce3atWAah+aTeJ0K02xvb48uVQsqAkDhPoeQZjRwEGTjXGjCJRZoIqccXiI1e8HiHdmPvNAcgA3chaaw7TABgADDljuQk2MCEFeSkEjuAHE7EC9AqokYcOUqGHAA4tdA/BcabqSkSBWonr9QM+zwWagOxJ+AeD8Qi+AzNSgoCIwJABFokfAZajaKhUnQyOElxhtCQkJgTCTggZqdDKuq7KHBQGsAygt3QD5sYaAfaAZZaEaublx1GB5gzgStGEgCS5YsAZdiMTEx4MKIBIvfM/v5+YlBKxfi6+8/fxiuX78Oxqqqqgzm5uYMioqKDPfv3wfL4QHTQBkfVEfeIrMGgActyNKbN28yvHjxAl+hoA5rX2oA8QkgNiHHQlDr4ODBg/iUnAXFH6j0geXDv9DKDlRY/qJiqvwFNdMEagdG0QYqZNmhRftZCiw6CzWDHbngxmijIoEbSMELcpQNEPsCsRUQK4PqUliqg9YIx4B4MxAfwVVowwAArw60Rszb6q0AAAAASUVORK5CYII="

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAAe1BMVEUAAAAnd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7Ynd7bVM5pYAAAAKHRSTlMA18K8Bvmuijn0moBdQykWEN60d2geC+qnom5lU0sj5s/HlJJAMe903K2jQAAAAPJJREFUKM99kVeugzAUBa/pPZRAOunvzf5XGEgsBMIwH/a1RvKRj2WFc7SommPBdsFt/D8IG6N7H1yweZjcxQb2gSKbKeekQD1qOWLN4uIdWJXTjTbnqcuiPi75zi+uztilJeCl+rQnHsUlNyDKhgjcWjR5dYV7nMtAjKen9hmCPe3F4hcReC5AUfqn12ZoGKVvDRLfUy5fLB1ccpyU0F7+I2unG8gIc5mjCPrtifHv/N8rb7xNNsXu1hN3MeGE5H3FiRjxOhGwa8x2y14O+GKmpmiglQUUFaUs4WNxWbQpFGaj31TJMp67WbHbg6xQB6PDB8tYFBiqgyS9AAAAAElFTkSuQmCC"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEX0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0niP0nyb61J396tD1pTP85sb//v34xHj2sEz+8+T//fv4v274wHH//Pf3u2X0oSn0niT////++vP3t1z85cT84r71pjT++O/2s1L716X+9en3tlr+9ur2r0r6z5L4w3f+9OX2rEL98d/1qTv97tf1pjX616T1pDCg1BEWAAAAIHRSTlMAAT6JxOj5igJi2yHKQOtGRyfy8wNjP8PCy8woSdyLxZ5AedMAAAABYktHRDHZ2x1yAAAACXBIWXMAAAsSAAALEgHS3X78AAABD0lEQVQoz32T6XaCMBSEL8GgIFoVpFZQU61LF1rSXVvtXt//jSTFJARi509y+E6Yy2QA2MtAZgVbFq5UkQGqarZDhBy7lmd1lyhy65I1mqSgJuLsyCIlWa2MtTtEI6/NmO8SrVw/hTY5oG76fc4h6BgQaB6fjidsCcAss7PpbM5WE45LbHF+cfm36QEusqs4vs52GPYB3CTcjt7e8SA4vH94zOzo07NIib92SVcvzI6+roUB5gMlSzrbvMX0/UO696BKBE31+ZUbzZQhMPr9k587yMWX/E62SnxpH7r/BA/+iZ712ZVB6OmYF2ZViHQ1iXiJotJZL5L1C/sFv1At9UCigVpqhtFwxH6H0RAJtAOVzU+yduln3QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0xMVQxMTowOTo0OSswODowMOwB8LwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMTFUMTE6MDk6NDkrMDg6MDCdXEgAAAAAAElFTkSuQmCC"

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadmore_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loadmore_vue__);


const LoadMore = {
  install: function (Vue) {
    Vue.component('LoadMore', __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default.a);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (LoadMore);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gxrouter_js__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wbrouter_js__ = __webpack_require__(105);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
let routes = __WEBPACK_IMPORTED_MODULE_2__gxrouter_js__["a" /* default */].concat(__WEBPACK_IMPORTED_MODULE_3__wbrouter_js__["a" /* default */]);
//let  routes = WBrouter;
const router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  history: true,
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/'); //如果上级也未匹配到路由则跳转错误页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(116)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(189),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_js_BaseJS_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'enterRouter',
	beforeCreate() {
		sessionStorage.setItem('back_ticketURI', '1');
	},
	created() {
		var _t = this;
		setTimeout(function () {
			var currLocation = window.location.href;
			var param = currLocation.split('?')[1];
			var obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__assets_js_BaseJS_js__["a" /* getUrl */])(currLocation); //page
			var urlStr = '/' + obj.page + '?' + param; //跳入正常页面
			//			console.log(urlStr);
			_t.$router.push(urlStr);
			//		window.location.href = urlStr;
		}, '500');
	}
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'errorPage',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  mounted() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".errorList").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
    console.log(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height());
  }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'errorPstate',
  data() {
    return {
      pStatus: "未查询到保单信息，请确认保单状态"
    };
  },
  mounted() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".errorList").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
    console.log(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height());
    this.pageInit();
  },
  methods: {
    pageInit: function () {
      var c_url = window.location.href;
      var pStatus = c_url.split('=')[1];
      pStatus == 1 ? this.pStatus = '您的保单已退保，无法进行预约' : "";
    }
  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'toMapEmpty',
	beforeCreate() {
		var mapRouter = JSON.parse(sessionStorage.getItem('mapRouter'));
		document.title = mapRouter.title;
	},
	created() {
		var t = this;
		setTimeout(function () {
			var mapRouter = sessionStorage.getItem('mapRouter') || "";
			if (mapRouter) {
				sessionStorage.setItem('back_ticketURI', '1');
				mapRouter = JSON.parse(mapRouter);
				if (mapRouter.toMap == '0') {
					//返回项目正常页面
					window.location.href = mapRouter.backURI;
				} else if (mapRouter.toMap == '1') {
					//跳转到地图页面
					mapRouter.toMap = '0';
					sessionStorage.setItem('mapRouter', JSON.stringify(mapRouter));
					window.location.href = mapRouter.toMapURI;
				}
			} else {
				t.$router.push('/common/errorPage');
			}
		}, '500');
	}
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Place',
  data() {
    return {
      curid: '', // 当前索引的id
      checkCityName: '', // 所选城市
      checkDistrict: '', // 所在区
      localcity: '', // 定位城市
      districtArr: [], // 地区数组
      localcity: '', // 定位城市
      cityObj: {}, // 城市数据对象
      orderInfo: { districtCode: '' }, // 卡信息对象
      City: {}, //  城市信息对象
      willClick: false, // 手动选择标记
      backFlag: false, // 页面是否返回标志
      localFlag: false, // 定位成功的标记
      curCityId: '', //当前城市id
      hua_val: '', //索引字母
      allCode: false, // 选中全城
      s_cityId: '' //session中的城市id
    };
  },
  beforeCreate() {
    document.title = '选择地点';
  },
  mounted() {
    //    hideaddress();
    this.backFlag = JSON.parse(sessionStorage.getItem('backFlag')) || false; // 页面是否是返回页面
    this.fillCityPage();
  },
  methods: {
    fillCityPage: function () {
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式
      var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
      if (orderInfo) {
        this.orderInfo = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, orderInfo, linkUrl);
      } else {
        sessionStorage.setItem('isCheckStore', true);
        orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
        orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
        this.orderInfo = orderInfo;
      }
      this.localFlag = orderInfo.localFlag ? orderInfo.localFlag : false;
      this.willClick = orderInfo.willClick || false;
      var param = { "code": "", "source": this.orderInfo.source ? this.orderInfo.source : '' // 初始化城市页面
      };this.fillCity(param); // 页面填充城市数据  
      if (this.willClick == false) {
        // 非手动操作  调动定位方法
        this.fillLocation();
        this.location();
      }
      if (this.orderInfo.isToDetail || this.orderInfo.isSureCheck) {
        this.orderInfo.isToDetail = false;
        this.orderInfo.isSureCheck = false;
        this.orderInfo.currentPage = 1;
      }
    },
    // 返回后页面填充
    backFill: function () {
      if (this.backFlag == true) {
        // 是否为返回页面的标记
        this.checkCityName = this.orderInfo.cityName ? this.orderInfo.cityName : " "; // 返回后展示城市
        this.checkDistrict = this.orderInfo.district ? this.orderInfo.district : " "; // 返回展示地区
        this.willClick = true; // 将要手动修改  取消定位
        var cityN = this.orderInfo.cityName; // session中取的城市名
        var cityI = this.orderInfo.cityId; // session取出的城市Id
        this.s_cityId = cityI;
        var disId = this.orderInfo.districtCode; // session取出的地区编码
        this.allCode = this.orderInfo.allCode;
        sessionStorage.setItem('backFlag', false);
        // 返回页面填充地区
        if (this.orderInfo.cityId) {
          this.fillDisc(cityI, disId); // 返回页面填充地区
        }
      }
    },
    // 定位缓存
    fillLocation: function () {
      // 定位信息 
      var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      if (qqlocation && qqlocation.yesOrNo == 1) {
        var t = qqlocation.time;
        var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
        if (outtime) {
          // 定位超时
          sessionStorage.removeItem('ifGetLocation'); // 移除session
          this.location(); // 重新定位
        } else {
          // 定位在缓存时间内
          this.backFill(); // 填充页面信息
          this.orderInfo.localFlag = true; // 是否为定位标记
        }
      }
    },
    // 定位方法
    location: function () {
      __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].open({ text: '正在定位', spinnerType: 'fading-circle' });
      var _this = this;
      var ifGetLocation = {};
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
          __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].close();
          if (_this.willClick) return;
          _this.localcity = data.city; // 定位城市
          //            _this.checkCityName = _this.localcity; // 页面砖石定位城市
          _this.orderInfo.cityName = data.city; // 存入session的城市名
          _this.orderInfo.latiude = data.lat; // 存入session的纬度
          _this.orderInfo.longitude = data.lon; // 存入session的经度
          // 查找定位城市对应的城市编码
          if (_this.localcity != "" && _this.willClick == false) {
            _this.findCity();
          }
          ifGetLocation = { "yesOrNo": 1, "data": data, "time": new Date().getTime() };
          sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation)); // 成功存定位session
        }, function () {
          __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].close();
          sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 })); // 失败存定位session
        });
      });
    },
    // 获取城市数据
    fillCity: function (param) {
      let _this = this;
      let response = api.ckcity(param); // 获取城市列表
      response.then(function (res) {
        if (res.data.state == '1') {
          _this.cityObj = res.data.data; // 页面展示城市对象赋值
          _this.backFill(); // 返回后页面填充
          // 页面返回后 添加已选城市样式及当前id设置
          if (_this.backFlag == true || _this.localFlag == true) {
            setTimeout(function () {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.cityId).addClass('cityChecked');
            }, 100); // 添加城市选中样式
            _this.curid = _this.orderInfo.curid; // 页面返回后为当前索引赋id值
          }
        } else {
          if (res.data.Message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.Message, duration: 1000, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.href = "#/common/errorPage"
      });
    },
    // 选择城市
    checkCity: function (item, cityId, indexId) {
      this.orderInfo.districtCode = '';
      this.checkDistrict = '';
      this.allCode = false;
      let _this = this;
      _this.willClick = true; // 手动点击城市 取消定位
      _this.orderInfo.willClick = true; // 手动点击城市 取消定位
      if (item.field == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("field--1为乐牙");
      }
      if (item.field == "") {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('" "--为泰康人寿');
      }
      _this.checkCityName = item.name; // 页面展示城市 cityName
      _this.orderInfo.cityName = item.name; // session存储城市名 cityName
      _this.orderInfo.cityId = cityId; // session存储城市id
      _this.orderInfo.curid = indexId; // 为当前索引赋值
      _this.curid = indexId;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.localarea').show(); // 显示地区列表
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.toup').removeClass("todown"); // 移除向下的箭头
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.citiBlocks').find("li").removeClass('cityChecked');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + cityId).addClass('cityChecked');
      this.fillDisc(cityId, "");
    },
    // 填充地区数据
    fillDisc: function (cityId, discId) {
      this.curCityId = cityId;
      let _this = this;
      var param = { "code": cityId, "source": _this.orderInfo.source ? _this.orderInfo.source : '' };
      let response = api.ckcity(param); // 获取区域列表
      response.then(function (res) {
        if (res.data.state == '1') {
          _this.districtArr = res.data.data;
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.district').removeClass('check');
          if (discId != "") {
            setTimeout(function () {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + discId).addClass('check');
            }, 100);
          } else {
            setTimeout(function () {
              if (_this.allCode == true && _this.s_cityId == cityId) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".all").addClass('check');
              }
            }, 100);
          }
        } else {
          if (res.data.Message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.Message, duration: 1000, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.href = "#/common/errorPage"
      });
      // 跳转到页面顶部
      setTimeout(function () {
        _this.topIndex('top' + cityId);
      }, 300);
      return false;
    },
    // 选择地区
    checkDisc: function (disc, id) {
      // 选择地区
      this.checkDistrict = disc.name; //页面展示地区名
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".district").removeClass('check'); // 移除多余的选中样式
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('check'); // 所选区域添加显示样式
      this.orderInfo.district = this.checkDistrict; // 存入session的地区名
      this.orderInfo.districtCode = id; // 存入session的地区id
      // 是否为定位标记
      if (this.localFlag == false) {
        this.orderInfo.localFlag = false;
      }
      this.orderInfo.willClick = true; // 是否手动点击
      var orderInfo = this.orderInfo; // 将orderInfo对象存入session
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo)); // 将orderInfo对象存入session
      // 跳转到医院列表页面
      setTimeout(function () {
        window.location.href = "#/gx/order/checkStation";
      }, 100);
    },
    // 索引当前跳转设置
    curIndex: function () {
      if (this.curid != "") {
        return document.getElementById(this.curid).scrollIntoView(true);
      }
    },
    // 字母索引
    letterIndex: function (curid, e) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': 1 });
      this.hua_val = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).text();
      this.touchEnd();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.fontColor').removeClass('zimu');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).addClass('zimu');
      return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
    },
    topIndex: function (curid) {
      return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
    },
    // 收起县区
    shouqi: function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".localarea").animate({ height: 'toggle' }, 300); // 地区块toggle
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".toup").toggleClass("todown"); // 箭头方向toggle
      //      setTimeout(()=>{$(".cityListArea").toggleClass("city_top");},200)

    },
    // 地区为空跳转页面
    toList: function () {
      if (this.checkCityName != "") {
        this.orderInfo.districtCode = ""; // 地区编码
        this.orderInfo.district = "全城"; // 地区名
        // 是否为定位标记
        if (this.localFlag == false) {
          this.orderInfo.localFlag = false;
        }
        this.orderInfo.willClick = true; // 是否手动点击
        this.orderInfo.allCode = true;
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        var place = JSON.parse(sessionStorage.getItem('orderInfo'));
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('-----------------quancheng-------------');
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(place);
        if (place.cityId) {
          setTimeout(function () {
            window.location.href = "#/gx/order/checkStation";
          }, 100);
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '请选择您要预约的城市' });
        }
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "请先选择城市", duration: 1500, className: 'mToast' });
      }
    },
    // 查找城市数据
    findCity: function () {
      var _this = this;
      var val = _this.localcity; //定位城市名
      var cityArr = _this.cityObj; // 城市数据对象
      var i, j, city;
      for (i in cityArr) {
        var c_a = cityArr[i]; // 每个字母索引对应的对象
        for (j in c_a) {
          if (c_a[j].name == val) {
            _this.orderInfo.curid = i; //定位城市字母的id
            _this.orderInfo.cityId = j; // 定位城市的城市id
            _this.orderInfo.cityName = val; // 定位城市名
            _this.checkCityName = val; // 页面砖石定位城市
            _this.orderInfo.districtCode = ""; // 定位地区编码为空
            _this.orderInfo.localFlag = true; // 是否定位标记
            _this.orderInfo.willClick = false; // 是否手动点击
          }
        }
      }
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo)); // 定位信息存入session
      var place = JSON.parse(sessionStorage.getItem('orderInfo'));
      // 跳转医院列表页面
      if (_this.localFlag == false && place.cityId) {
        window.location.href = "#/gx/order/checkStation";
      }
    },
    //    滑动结束
    touchEnd() {
      var opcityNum = 1;
      setInterval(function () {
        opcityNum -= 0.1;
        if (opcityNum > 0) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': opcityNum });
        } else {
          clearInterval();
        }
      }, 50);
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'none' });
      }, 200);
    },
    //    滑动开始
    move(event) {
      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': 1 });
      var x = event.changedTouches[0].clientX;
      var y = event.changedTouches[0].clientY;
      var xx = document.elementFromPoint(x, y);
      var word = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(xx).text();
      if (/^[A-Z]$/.test(word)) {
        this.hua_val = word;
      }
      this.topIndex(this.hua_val);
    }
  }

});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'agreeServe',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  beforeCreate() {
    document.title = '服务知情同意书';
  },
  mounted() {//this.anios();
  },
  methods: {
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        // ios系统样式设置
        var el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.textBox');
        el.WebKitOverflowScrolling = 'auto';
        el.scrollTop = 500;
        el.WebKitOverflowScrolling = 'touch';
      }
    }
  }
});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




//import LoadMore from './../../loadmore/loadmore.vue';



const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'checkStation',
  props: {},
  data() {
    return {
      showCity: '', // 展示城市
      cityName: '', // 所选城市
      searchWord: '', // 搜索关键字
      searchFlag: '', // 是否为搜索状态
      orderInfo: {}, // 预约对象
      searchInfo: {}, // 搜索显示信息
      hospitalInfo: [], // 医院信息
      histryWord: [], // 历史记录关键词
      currentPage: 1, // 当前页码
      topStatus: '', // loadmore状态
      allLoaded: false, // loadmore是否加载
      localMsg: {}, // 定位信息
      isCall: false, // 拨打电话
      callAct: '', //去拨打电话
      isFoucus: false,
      isToDetail: false, // 去商品详情页面
      isSureCheck: false, // 去预约页面
      scrollMode: 'auto', //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      //  上拉加载数据
      scrollHeight: 0,
      scrollTop: 0,
      containerHeight: 0,
      loading: false,
      allLoaded: false,
      bottomText: '上拉加载更多...',
      bottomStatus: '',
      pageNo: 1,
      totalCount: ''
    };
  },
  beforeCreate() {
    document.title = '选择门诊';__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': 'auto' });
  },
  created() {
    sessionStorage.setItem('backFlag', true);
    this.fillHospitalPage(); // 初始化医院列表页面
    this.fillLocation();
  },
  destroyed() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': '100%' });
  },
  mounted() {
    this.anios();
  },
  watch: {
    isCall: function (newVal, oldVal) {
      if (newVal === true) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': '100%' });
      }
    }
  },
  methods: {
    /* 下拉加载 */
    _scroll: function (ev) {
      ev = ev || event;
      this.scrollHeight = this.$refs.innerScroll.scrollHeight;
      this.scrollTop = this.$refs.innerScroll.scrollTop;
      this.containerHeight = this.$refs.innerScroll.offsetHeight;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    telphone() {
      var _this = this;
      var param = {
        //                  "channelType":sessionStorage.getItem('channelType')||'',
        "cityCode": _this.orderInfo.cityId,
        "cityName": _this.cityName,
        "policyNo": _this.orderInfo.policyNo,
        "wesurePolicyNo": _this.orderInfo.wesurePolicyNo,
        "phone": '95522'
      };
      api.phoneConsultInfo(param); // 电话咨询信息储存接口
      var call_num = '95522';
      _this.isCall = true;
      _this.callAct = 'tel:' + call_num;
      window.open(_this.callAct);
    },
    // 关闭电话弹层
    closeCall: function () {
      this.isCall = false;
      window.location.href = "#/gx/order/Place";
    },
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.checkStation').css({ 'position': 'absolute', 'bottom': '0', 'left': '0' });
      }
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".near").css({ 'line-height': '0.83rem' });
      }
    },
    // 填充页面
    fillHospitalPage: function () {
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式
      var orderInfo = sessionStorage.getItem('orderInfo');
      orderInfo = JSON.parse(orderInfo);
      this.orderInfo = orderInfo; //  获取ordersession对象
      this.orderInfo = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, orderInfo, linkUrl);
      this.cityName = orderInfo.cityName;
      if (orderInfo.cityName.length > 3) {
        this.showCity = orderInfo.cityName.slice(0, 3);
      } else {
        this.showCity = orderInfo.cityName;
      }
      this.isToDetail = orderInfo.isToDetail ? orderInfo.isToDetail : false;
      this.isSureCheck = orderInfo.isSureCheck ? orderInfo.isSureCheck : false;
      this.searchFlag = orderInfo.searchFlag ? orderInfo.searchFlag : false;
      if (this.orderInfo.isToDetail || this.orderInfo.isSureCheck) {
        this.currentPage = orderInfo.currentPage ? orderInfo.currentPage : 1;
      }

      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": "1",
          "districtCode": this.orderInfo.districtCode || "",
          "hospitalName": "",
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.orderInfo.localFlag == true) {
        this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
        param.retrieveArgs.rowsPerPage = "300";
        //        param.retrieveArgs.rowsPerPage = "10"
      }
      if (this.orderInfo.localFlag == false) {
        if (this.orderInfo.currentPage) {
          param.retrieveArgs.currentPage = this.orderInfo.currentPage;
          if (this.searchFlag == true) {
            param.retrieveArgs.hospitalName = this.orderInfo.searchWord;
          }

          this.orderInfo.currentPage = '';
          this.orderInfo.searchWord = '';
          sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        }
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
        //      if(this.orderInfo.districtCode==""){
        //        param.retrieveArgs.rowsPerPage = "300"
        //      }
      }
      this.HospitalList(param, false);
    },
    // 回到Place页面
    backPlace: function () {
      window.location.href = "#/gx/order/Place";
    },
    // 获取医院列表
    HospitalList: function (param, search) {
      this.searchFlag = search;
      this.allLoaded = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".whiteList").hide();
      let _this = this;
      let response = api.getOrgListBySolr(param); // 获取医院列表
      response.then(function (res) {
        //        res.data.status=1
        if (res.data.status == '1') {
          var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
          //          var list = [{"hospitalAddr":"北京市东城区珠市口东大街6号珍贝大厦二层","districtCode":"110101","spellNo":"AKCKBJBHZSKZBFY","provCode":"110000","lastModify":null,"distance":1,"cityCode":"110000","hospitalRule":"8:00-17:00（周二至周日）","hospitalLongitudeLatitude":"116.4109800000,39.8925600000","hospitalName":"爱康齿科北京博惠珠市口珍贝分院","avgQuality":null,"contactTel":"010-67016280转609","parentId":"6249","hospitalDes":"爱康齿科，中国齿科领域的专业连锁服务品牌，隶属于中国最大的健康管理集团之一——爱康国宾集团，为消费者提供口腔保健、综合齿科、小儿齿科、美容牙科、牙齿正畸以及种植牙科等口腔诊疗服务。爱康齿科拥有国际先进的医疗设备和一流的专家团队，为消费者提供具有专业品质的全方位中高端口腔医疗服务，并给消费者带来与众不同的客户体验。 截止2014年10月，爱康齿科在北京、上海、深圳、天津、重庆、南京、杭州、成都、苏州、福州、长春等十几个中心城市已拥有超过20家齿科服务中心，每年为超过100万人次提供口腔检查以及专业的口腔治疗服务。","hospitalId":"6254","createTime":null,"doctorId":"230253","orgSource":"0","orgCode":null,"hospitalImgId":null}]
          var len = list.length;
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(list);
          //                    var list = [{"hospitalAddr":"北京市东城区珠市口东大街6号珍贝大厦二层","districtCode":"110101","spellNo":"AKCKBJBHZSKZBFY","provCode":"110000","lastModify":null,"distance":1,"cityCode":"110000","hospitalRule":"8:00-17:00（周二至周日）","hospitalLongitudeLatitude":"116.4109800000,39.8925600000","hospitalName":"爱康齿科北京博惠珠市口珍贝分院","avgQuality":null,"contactTel":"010-67016280转609","parentId":"6249","hospitalDes":"爱康齿科，中国齿科领域的专业连锁服务品牌，隶属于中国最大的健康管理集团之一——爱康国宾集团，为消费者提供口腔保健、综合齿科、小儿齿科、美容牙科、牙齿正畸以及种植牙科等口腔诊疗服务。爱康齿科拥有国际先进的医疗设备和一流的专家团队，为消费者提供具有专业品质的全方位中高端口腔医疗服务，并给消费者带来与众不同的客户体验。 截止2014年10月，爱康齿科在北京、上海、深圳、天津、重庆、南京、杭州、成都、苏州、福州、长春等十几个中心城市已拥有超过20家齿科服务中心，每年为超过100万人次提供口腔检查以及专业的口腔治疗服务。","hospitalId":"6254","createTime":null,"doctorId":"230253","orgSource":"0","orgCode":null,"hospitalImgId":null}]
          if (search == true) {
            _this.hospitalInfo = [];
            _this.orderInfo.searchFlag = true;
          } else {
            _this.orderInfo.searchFlag = false;
          }
          _this.hospitalInfo = list;
          //          if(_this.hospitalInfo == []) {// 医院列表初始赋值
          //            _this.hospitalInfo = list;
          //          } else {// 医院列表加载更多赋值
          //            _this.hospitalInfo = (_this.hospitalInfo).concat(list); // 页面追加展示数据
          //          }
          //          _this.$nextTick(function () {  
          // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
          // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
          // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
          //            _this.loading = false; 
          //          });
          if (_this.isToDetail || _this.isSureCheck) {
            if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.isToDetail, _this.isSureCheck, _this.orderInfo.hospitalId);
            if (_this.orderInfo.hospitalId) {
              setTimeout(function () {
                if (_this.isSureCheck) {
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.hospitalId).find('.radiobtn').addClass('checkRadio');
                }

                if (_this.currentPage == 1 && len > 10) {
                  var h_id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.hospitalId)[0];
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html, body").animate({ scrollTop: h_id.offsetTop - 40 }, { duration: 500, easing: "swing" });
                }

                return document.getElementById('showSearchBox').scrollIntoView(true);
              }, 100);
            }
          }
        } else {
          if (res.data.message) {
            if (search == true) {
              _this.hospitalInfo = {};
              if (res.data.status == -1) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".whiteList").show();
                var param = {
                  //                  "channelType":sessionStorage.getItem('channelType')||'',
                  "cityCode": _this.orderInfo.cityId,
                  "cityName": _this.cityName,
                  "policyNo": _this.orderInfo.policyNo,
                  "wesurePolicyNo": _this.orderInfo.wesurePolicyNo
                };
                api.locationInfo(param); // 定位信息储存接口
              }
            } else {
              if (res.data.status == -1) {
                if (_this.currentPage == 1) {
                  var call_num = '4000895522';
                  _this.isCall = true;
                  _this.callAct = 'tel:' + call_num;
                  var param = {
                    //                  "channelType":sessionStorage.getItem('channelType')||'',
                    "cityCode": _this.orderInfo.cityId,
                    "cityName": _this.cityName,
                    "policyNo": _this.orderInfo.policyNo,
                    "wesurePolicyNo": _this.orderInfo.wesurePolicyNo,
                    "phone": '4000895522'
                  };
                  api.phoneConsultInfo(param); // 电话咨询信息储存接口          
                } else {
                    //                  _this.loading = false;
                    //                  _this.allLoaded = true;
                    //                  Toast({message: '没有更多了',duration: 1500,className: 'mToast'})
                  }
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1500, className: 'mToast' });
              }
            }
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1500, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/common/errorPage");
      });
    },
    // 下拉刷新样式设置
    handleTopChange(status) {
      this.topStatus = status;
    },
    // 下拉刷新方法
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded();
    },
    // 上拉加载方法
    loadBottom: function () {
      this.loading = true;
      this.isPullup = true;
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": ++this.currentPage,
          "districtCode": this.orderInfo.districtCode,
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "10",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.searchFlag == true) {
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
      }
      if (this.searchFlag == false) {
        if (this.orderInfo.localFlag == true) {
          param.retrieveArgs.rowsPerPage = "300";
        }
        if (this.orderInfo.localFlag == false) {
          param.retrieveArgs.rowsPerPage = "10";
          //          param.retrieveArgs.rowsPerPage = "300"
        }
      }

      let _this = this;
      setTimeout(() => {
        //        _this.HospitalList(param, false);
        let response = api.getOrgListBySolr(param); // 获取医院列表
        response.then(function (res) {
          if (res.data.status == '1') {
            var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
            if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(list);
            var len = list.length;
            if (len < 10 && _this.currentPage == 1) {
              _this.allLoaded = true;
            }
            _this.hospitalInfo = _this.hospitalInfo.concat(list); // 页面追加展示数据
            _this.$nextTick(function () {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
              _this.loading = false;
            });
          } else {
            if (res.data.message) {
              if (res.data.status == -1) {
                if (_this.currentPage != 1) {
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '没有更多了', duration: 1500, className: 'mToast' });
                  _this.allLoaded = true;
                  _this.loading = false;
                }
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1500, className: 'mToast' });
              }
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1500, className: 'mToast' });
            }
          }
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //        window.location.replace("#/common/errorPage");
        });
        _this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },
    // 定位缓存
    fillLocation: function () {
      // 定位信息 
      var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      if (qqlocation && qqlocation.yesOrNo == 1) {
        var t = qqlocation.time;
        var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
        if (outtime) {
          sessionStorage.removeItem('ifGetLocation');
          this.location();
        } else {
          this.orderInfo.localFlag = true;
          this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
        }
      }
    },
    // 定位信息
    location: function () {
      var _this = this;
      var ifGetLocation = {};
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("------------成功--------------");
          //            alert(JSON.stringify(data));//{lon: 116.407526, lat: 39 90403, city: "北京"}
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(data.city);
          //            alert("lon"+data.lon+"   lat"+data.lat);
          _this.localMsg = data;
          _this.orderInfo.localFlag = true;
          ifGetLocation = {
            "yesOrNo": 1,
            "data": data,
            "time": new Date().getTime()
          };
          sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
        }, function () {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("-----定位失败-----");
          sessionStorage.setItem('ifGetLocation', JSON.stringify({
            "YoN": 2
          }));
        });
      });
    },
    // 确定选择
    shureCheck: function (cur, item) {
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(item);

      var id = cur;
      var lon = item.hospitalLongitudeLatitude.split(",")[0];
      var lat = item.hospitalLongitudeLatitude.split(",")[1];
      this.orderInfo.doctorId = item.doctorId;
      this.orderInfo.hospitalId = item.hospitalId;
      this.orderInfo.hospitalName = item.hospitalName;
      this.orderInfo.contactTel = item.contactTel;
      this.orderInfo.orgAddress = item.hospitalAddr;
      this.orderInfo.lon = lon;
      this.orderInfo.lat = lat;
      this.orderInfo.orgSource = item.orgSource; // 机构来源
      this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
      this.orderInfo.orderTime = {};
      this.orderInfo.isSureCheck = true;
      this.orderInfo.isToDetail = false;
      this.orderInfo.currentPage = this.currentPage;
      this.orderInfo.searchWord = this.searchWord;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".radiobtn").removeClass('checkRadio');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('checkRadio');
      var str = JSON.parse(sessionStorage.getItem('orderInfo'));
      //    if(config_param.isLog)console.log(str);
      if (item.orgSource == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("orgSource--1为乐牙");
        var param = {
          "flag": "2", //跳转标志，1:门诊详情 2 :预约 ,
          "insId": item.orgCode, //门店id  "0863cee2f86c11e4a09e02004c4f4f50"
          "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
          "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
          "wesurePolicyNo": this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo : this.orderInfo.policyNo // 微宝内部保单号
        };
        let response = api.toStoreDetailOrOrder(param);
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res.data.data);
          window.location.href = res.data.data;
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/common/errorPage");
        });
      } else {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('orgSource--0--为泰康人寿');
        if (str.lon) {
          setTimeout(function () {
            window.location.href = "#/gx/order/toOrder";
          }, 100);
        }
      }
    },
    // 去医院详情页
    toshopDetail: function (cur, item) {
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(item);
      var id = cur;
      // 距离 hospitalName hospitalId distance
      this.orderInfo.hospitalId = item.hospitalId;
      this.orderInfo.hospitalName = item.hospitalName;
      this.orderInfo.distance = item.distance;
      this.orderInfo.avgQuality = item.avgQuality;
      this.orderInfo.doctorId = item.doctorId;
      this.orderInfo.contactTel = item.contactTel;
      this.orderInfo.orgAddress = item.hospitalAddr;
      this.orderInfo.orgSource = item.orgSource; // 机构来源
      this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
      this.orderInfo.orderTime = {};
      this.orderInfo.isToDetail = true;
      this.orderInfo.isSureCheck = false;
      this.orderInfo.currentPage = this.currentPage;
      this.orderInfo.searchWord = this.searchWord;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      //      $(".radiobtn").removeClass('checkRadio');
      //      $("#" + id).addClass('checkRadio');
      var str = JSON.parse(sessionStorage.getItem('orderInfo'));
      if (item.orgSource == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("orgSource--1为乐牙");
        var param = {
          "flag": "1", //跳转标志，1:门诊详情 2 :预约 ,
          "insId": item.orgCode, //不清楚，需确认
          "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
          "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
          "wesurePolicyNo": this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo : this.orderInfo.policyNo // 微宝内部保单号
        };
        let response = api.toStoreDetailOrOrder(param);
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res.data.data);
          window.location.href = res.data.data;
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/common/errorPage");
        });
      } else {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('orgSource--0--为泰康人寿');
        if (str) {
          setTimeout(function () {
            window.location.href = "#/gx/user/shopDetail";
          }, 100);
        }
      }
    },
    // 调取地图
    gotoMap: function (item) {
      var startName = ""; // 起点名字
      if (this.orderInfo.localFlag == true) {
        // 定位后的起始经纬度
        var startX = this.localMsg.lon;
        var startY = this.localMsg.lat;
      } else {
        // 未定位经纬度为空
        var startX = "";
        var startY = "";
      }
      var cityName = this.cityName;
      var addr = item.hospitalAddr;
      var endName = item.hospitalName; // 终点名
      var lon = item.hospitalLongitudeLatitude.split(",")[0]; // 终点经度
      var lat = item.hospitalLongitudeLatitude.split(",")[1]; // 终点纬度
      var dest = {
        "eword": endName,
        "epointx": lon,
        "epointy": lat
      };
      var url = "http://apis.map.qq.com/tools/routeplan/eword=" + endName + "&epointx=" + lon + "&epointy=" + lat + "&sword=" + startName + "&epointx=" + startX + "&epointy=" + startY + "?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B";
      var url = "http://apis.map.qq.com/tools/poimarker?type=1&keyword=" + dest.eword + "&center=" + dest.epointy + "," + dest.epointx + "&region=" + cityName + "&radius=10000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      window.location.href = url; // 跳转路径
      return false; // 阻止手机端冒泡
    },
    // 搜索医院
    searchHospital: function () {
      this.isFoucus = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox").removeClass("foucusbox");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox .searchicon").removeClass("foucusicon");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + this.orderInfo.hospitalId).find('.radiobtn').removeClass('checkRadio');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".inputbox").removeClass("foucusinput");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#searchtext").blur(); // 输入框失去焦点
      this.searchWord = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.trim(this.searchWord); // 去除关键词两边的空格
      var histry = JSON.parse(localStorage.getItem("histry")) || []; // 获取历史记录
      if (this.searchWord != "") {
        histry.unshift(this.searchWord); // 向历史记录中添加新的关键词
      }
      histry = this.histryUnique(histry); // 历史记录去重处理
      if (histry.length > 6) histry.pop(); //多余历史记录清除
      localStorage.setItem("histry", JSON.stringify(histry)); // 历史记录存入localStorage
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": '1',
          "districtCode": this.orderInfo.districtCode || "",
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "300",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.orderInfo.localFlag == true) {
        param.retrieveArgs.rowsPerPage = "300";
      }
      if (this.orderInfo.localFlag == false) {
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
      }
      this.HospitalList(param, true); // 搜索医院 
      this.closeModal(); // 关闭弹层
    },
    // 历史记录搜索医院
    histrySearch: function (keyWord) {
      this.searchWord = keyWord;
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": "1",
          "districtCode": this.orderInfo.districtCode,
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude, // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude, // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "300",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      this.HospitalList(param, true);
      this.closeModal();
    },
    // 使用历史记录词汇搜索
    useHisWord: function (words) {
      this.searchWord = words;
      this.searchHospital();
    },
    // 清除历史记录
    clearHistory: function () {
      var histry = JSON.parse(localStorage.getItem("histry"));
      var ary = [1, 2, 3, 4];
      histry.splice(0, histry.length); //清空数组 
      localStorage.setItem("histry", JSON.stringify(histry));
      this.histryWord = histry;
      //      if(config_param.isLog)console.log(histry); // 输出 []，空数组，即被清空了
    },
    // 搜索框聚焦
    searchFoucus: function () {
      this.isFoucus = true;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox").addClass("foucusbox");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox .searchicon").addClass("foucusicon");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".inputbox").addClass("foucusinput");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#searchtext').attr('placeholder', '请输入门诊关键搜索词');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cancelbtn').show();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".modal").css({ 'display': 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".modal").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").css({
        'overflow': "hidden",
        'position': 'fixed',
        'width': '100%'
      });
      var histry = JSON.parse(localStorage.getItem("histry")) || [];
      this.histryWord = histry;
    },
    // 关闭搜索弹层
    closeModal: function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#searchtext').css({ 'width': '100%' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.modal').hide();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cancelbtn').hide();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").css({
        'overflow': "auto",
        'position': 'static',
        'width': '100%',
        'height': '100%'
      });
    },
    // 历史记录去重
    histryUnique: function (arr) {
      var res = [];
      var json = {};
      for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
          res.push(arr[i]);
          json[arr[i]] = 1;
        }
      }
      return res;
    }
  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



const api = new __WEBPACK_IMPORTED_MODULE_1__api_API__["a" /* default */]();



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'checkTime',
  data() {
    return {
      orderTime: {}, // 存入session的预约时间对象
      curMonList: [], // 当前月份数组
      dateList: [], // 日期数组
      ableId: [], // 可用日期id$
      timeAbleId: [], // 可用时间id
      curYear: '', // 当前年份
      nextYear: '', // 下一年
      curMon: '', // 当前月份
      nextMon: '', // 下一月
      myTime: {}, // 预约时间对象
      todayId: '', // 当前日期id
      today: '',
      oldId: [], // 过期日期id
      scheduleIdObj: {}, // scheduleId对象
      showTime: false, // 显示时间弹层
      timeObj: {}, // 乐牙预约时间对象
      timeFlag: {}, // 时间是否可用标志
      //      items:[{"sTime":"07:00","eTime":"08:00"},{"sTime":"08:00","eTime":"09:00"},{"sTime":"09:00","eTime":"10:00"},{"sTime":"10:00","eTime":"11:00"},{"sTime":"11:00","eTime":"12:00"},{"sTime":"12:00","eTime":"13:00"},{"sTime":"13:00","eTime":"14:00"},{"sTime":"14:00","eTime":"15:00"},{"sTime":"15:00","eTime":"16:00"},{"sTime":"16:00","eTime":"17:00"},{"sTime":"17:00","eTime":"18:00"},{"sTime":"18:00","eTime":"19:00"},{"sTime":"19:00","eTime":"20:00"},{"sTime":"20:00","eTime":"21:00"},{"sTime":"21:30","eTime":"22:00"}],// 时间对象
      items: [{ "sTime": "8:00", "eTime": "9:00" }, { "sTime": "9:00", "eTime": "10:00" }, { "sTime": "10:00", "eTime": "11:00" }, { "sTime": "11:00", "eTime": "12:00" }, { "sTime": "12:00", "eTime": "13:00" }, { "sTime": "13:00", "eTime": "14:00" }, { "sTime": "14:00", "eTime": "15:00" }, { "sTime": "15:00", "eTime": "16:00" }, { "sTime": "16:00", "eTime": "17:00" }, { "sTime": "17:00", "eTime": "18:00" }, { "sTime": "18:00", "eTime": "19:00" }, { "sTime": "19:00", "eTime": "20:00" }] // 时间对象

    };
  },
  beforeCreate() {
    document.title = '选择日期';
  },
  mounted() {
    var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    this.orderInfo = orderInfo; //  获取ordersession对象
    //        this.anios();
    this.fillDate();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.checkTime').css({ 'height': __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height() + "px" });
  },
  methods: {
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".timeli").css({ 'width': '21.5%' });
      }
    },
    // 填充页面数据
    fillDate: function () {
      var day = new Date(); //日期对象
      var week = day.getDay();
      var month = day.getMonth();
      this.curMon = month + 1; //当前月份
      this.curYear = day.getFullYear();
      if (this.curMon == 12) {
        this.nextMon = 1;
        this.nextYear = this.curYear + 1;
      } else {
        this.nextYear = this.curYear;
        this.nextMon = this.curMon + 1;
      }
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.nextMon, this.nextYear);
      var dd = day.getDate();
      this.today = dd;
      // 当前日期
      var curDate = this.curYear + "-" + this.curMon + "-" + dd;
      var clist = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__["e" /* getDayList */])(); // 日期数据
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("初次拿到日期数据");
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(clist);
      var today = day.getDate(); // 今日日期
      // 本月一日星期几
      var firstday = this.curYear + "-" + this.curMon + "-01";
      var nextday = this.curYear + "-" + this.nextMon + '-01';
      var tswk = new Date(firstday); //当月一日日期对象
      var nswk = new Date(nextday); //次月一日日期对象
      var first_week = tswk.getDay();
      var next_week = nswk.getDay();
      //今日前日期
      for (var i = today - 1; i > 0; i--) {
        if (i < 1) {
          clist[this.curMon].unshift(" ");
        } else {
          clist[this.curMon].unshift(i);
        }
      }
      for (var w = 0; w < first_week; w++) {
        clist[this.curMon].unshift("4" + w); //+w
      }
      for (var n = 0; n < next_week; n++) {
        clist[this.nextMon].unshift("4" + n); //+n
      }

      let that = this;
      //      setTimeout(function(){$("#"+that.curMon+today).addClass('curdate')},'100');
      that.dateList = clist; // 时间数组
      var param = {
        "doctorId": that.orderInfo.doctorId,
        "hospitalId": that.orderInfo.hospitalId,
        "orgSource": that.orderInfo.orgSource, // 机构来源
        "storeId": that.orderInfo.orgCode != null ? that.orderInfo.orgCode : '' // 第三方平台医院id
      };
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
      let response = api.getDoctorSchedule(param); // 获取一个门店的排班列表
      var able = []; //可用数组
      response.then(function (res) {
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
        var data = res.data;
        var d, m;
        if (data.status == '1') {
          // 请求成功数据处理
          //        that.dateInfo= data.getDoctorScheduleResponseVoList; 
          var Arr = data.getDoctorScheduleResponseVoList;
          //          var Arr=[{"am":"07:00-12:00","count":"5","outpDate":"2017-10-22","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-23","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-24","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-25","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-26","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-27","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-28","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-29","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-30","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-31","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-01","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-02","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-03","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-04","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-05","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-06","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-07","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-08","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-09","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-10","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-11","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-12","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-13","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-14","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-15","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-16","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-17","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-18","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-19","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-20","pm":"12:00-21:30"}]
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("===============Arr");
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(Arr);
          var len = Arr.length; // 数组长度
          var staFlag, list;
          for (var a = 0; a < len; a++) {
            staFlag = Arr[a].reserveFlag; // 预约状态
            list = Arr[a].outpDate; // 可预约日期
            var days = that.compareStart(list);
            if (days > 0) {
              if (list.split('-')[1].charAt(0) == 0) {
                // 月份以0开始
                m = list.split('-')[1].substring(1);
              } else {
                // 月份为10、11、12
                m = list.split('-')[1];
              }
              if (list.split('-')[2].charAt(0) == 0) {
                // 日期以0开始
                d = list.split('-')[2].substring(1);
              } else {
                d = list.split('-')[2];
              }
              able.push(m + d); // 可用日期id
              that.scheduleIdObj[m + d] = Arr[a].scheduleId; // scheduleId存储
              that.timeObj[m + d] = Arr[a];
              setTimeout(function () {
                for (var i = 0; i < able.length; i++) {
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + able[i]).addClass('able'); // 有效日期设置样式
                }
              }, 100);
            }
          }
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + that.nextMon + "00").css("visibility", "hidden");
          var cur_id = that.curMon + that.today;
          var x, o; // 当天前的日期 去除的可用id
          for (x = 1; x < that.today + 1; x++) {
            o = "" + that.curMon + x;

            for (var i = 0; i < able.length; i++) {
              if (able[i] == o) {
                able.splice(i, 1);
                break;
              }
            }
            that.oldId.push(o);
          }
          that.ableId = able; // 可预约的数据id
        } else {
          // 显示报错信息
          if (data.message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: data.message });
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: "发生内部错误" });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/common/errorPage");
      });
    },
    // 选择预约时间
    checkDate: function (curmon, curday) {
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(curday);
      this.timeAbleId = []; // 置空所选日期id
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".timeli").find("button").attr('disabled', 'disabled'); // 按钮不可用初始化
      var day = new Date(); //日期对象
      var month = curmon; //当前月份
      //      this.curMon = curmon;// 页面展示当前月份
      var year = this.curYear; // 当前年份
      this.orderTime.encounterDate = year + "-" + curmon + "-" + curday;
      this.orderTime.bookTime = year + "." + curmon + "." + curday;
      var ID = curmon + curday; // 所选日期的id值
      if (this.ableId.indexOf(ID) > -1 && curday != null) {
        this.showTime = true; // 显示时间弹层
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("li").find('span').removeClass('checkdate'); // 移除多余选中样式
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + ID).find('span').addClass('checkdate'); //为所点击的可用日期添加选中样式
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.orderInfo.orgCode);
        if (this.orderInfo.orgCode == 1) {
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.timeObj[ID]);
          var am = this.timeObj[ID].am.split("-");
          var pm = this.timeObj[ID].pm.split("-");
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(pm);
          var timeId = this.items; // 页面时间对象
          var len1 = timeId.length;
          for (var j = 0; j < len1; j++) {
            // 获取时间对象的序号
            var s_tId = timeId[j].sTime;
            if (s_tId == am[0]) {
              // 上午时间开始序号
              var s1 = j;
            }
            if (s_tId == am[1]) {
              // 上午时间结束序号
              var s2 = j;
            }
            if (s_tId == pm[0]) {
              // 下午时间开始序号
              var e1 = j;
            }
            if (s_tId == pm[1]) {
              // 下午时间结束序号
              var e2 = j;
            }
          }
          this.timeAbleId = [];
          for (var c = 0; c < len1; c++) {
            if (c > s1 - 1 && c < s2 + 1) {
              // 上午去除约满标记
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).attr('disabled', false);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).siblings(".unTimeFlag").remove();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).css({ 'padding-bottom': '.2rem' });
            }
            if (c > e1 - 1 && c < e2 + 1) {
              // 下午去除约满标记
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).attr('disabled', false);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).siblings(".unTimeFlag").remove();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).css({ 'padding-bottom': '.2rem' });
            }
            this.timeAbleId.push(c);
          }
        } else {
          // 分时排班表入参
          var param = {
            "hospitalId": this.orderInfo.hospitalId, // 医院编码
            "scheduleId": this.scheduleIdObj[ID] //日排班ID
          };
          let _this = this;
          let response = api.getSchedulePartTime(param); // 分时排班表接口
          response.then(function (res) {
            if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
            if (res.data.status == '1') {
              var time = res.data.getSchedulePartTimeResponseVoList;
              //                var time = [{"hospitalId":"6002","startTime":"8:30","endTime":"9:30","regFlag":"1","parttimeId":"108150","scheduleId":"29666"},{"hospitalId":"6002","startTime":"10:30","endTime":"11:00","regFlag":"1","parttimeId":"108151","scheduleId":"29666"},{"hospitalId":"6002","startTime":"11:30","endTime":"12:00","regFlag":"1","parttimeId":"108152","scheduleId":"29666"},{"hospitalId":"6002","startTime":"12:00","endTime":"13:00","regFlag":"1","parttimeId":"108153","scheduleId":"29667"},{"hospitalId":"6002","startTime":"13:00","endTime":"14:00","regFlag":"-1","parttimeId":"108154","scheduleId":"29667"},{"hospitalId":"6002","startTime":"14:00","endTime":"15:00","regFlag":"1","parttimeId":"108155","scheduleId":"29667"},{"hospitalId":"6002","startTime":"15:00","endTime":"16:00","regFlag":"1","parttimeId":"108156","scheduleId":"29667"},{"hospitalId":"6002","startTime":"16:00","endTime":"17:00","regFlag":"1","parttimeId":"108157","scheduleId":"29667"},{"hospitalId":"6002","startTime":"17:00","endTime":"18:00","regFlag":"1","parttimeId":"108158","scheduleId":"29667"},{"hospitalId":"6002","startTime":"18:00","endTime":"19:00","regFlag":"1","parttimeId":"108159","scheduleId":"29667"}]
              var timeId = _this.items; // 页面时间对象
              _this.timeAbleId = []; // 可用时间id
              var tFlag = {};
              var flagArr = [];
              for (var t = 0, l = timeId.length; t < l; t++) {
                var s_tId = parseInt(timeId[t].sTime.replace(":", ''));
                for (var i = 0, len = time.length; i < len; i++) {
                  var g_start = parseInt(time[i].startTime.replace(":", ''));
                  var g_start1 = parseInt(time[i].endTime.replace(":", ''));

                  if (g_start <= s_tId && s_tId < g_start1) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).attr('disabled', false);
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).siblings(".unTimeFlag").remove();
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).css({ 'padding-bottom': '.2rem' });
                    if (time[i].regFlag == '-1') {
                      // 约满样式调整 判断条件为regFlag==-1
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).after("<span class='fillFlag'>约满</span>");
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).attr('disabled', 'disabled');
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).css({ 'padding-bottom': '1rem' });
                    } else {
                      _this.timeAbleId.push(t); // 日期所用id
                    }
                  }
                }
              }
              if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("===========_this.timeFlag");
              if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.timeAbleId);
            } else {
              // 显示报错信息
              if (res.data.message) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: res.data.message });
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: "发生内部错误" });
              }
            }
          }).catch(function (err) {
            if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
            //              window.location.replace("#/common/errorPage");
          });
        }
      }

      //      this.strDate = year+"-"+month+"-"+curday; // 拼接所选预约日期格式
    },
    checkTime: function (time, index) {
      var id = index; // 所选时间id
      if (this.timeAbleId.indexOf(id) > -1) {
        //        this.strDate += " "+this.items[id].sTime+"-"+this.items[id].eTime
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mybtn").removeClass('timeChecked'); // 移除多余选中时间样式
        //        $("#"+id).parent().css({'background':'none'})
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('timeChecked'); // 添加选中时间样式
        //        $("#"+id).parent().attr("style","background:'url(../../../assets/images/order/order_btnbg1.png) no-repeat 0 0'")

        this.orderTime.startTime = this.items[id].sTime; // 存开始时间
        this.orderTime.endTime = this.items[id].eTime; // 存结束时间
        if (id < 4) {
          this.orderTime.timeSlotId = 1; // 上午时间段编码
        } else {
          this.orderTime.timeSlotId = 2; // 下午时间段编码
        }
        this.orderInfo.orderTime = this.orderTime;
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        setTimeout(function () {
          //          window.location.href = '#/order/toOrder'
          window.location.replace('#/order/toOrder');
        }, 100);
      }
    },
    // 开始有效期比较
    compareStart: function (strDateStart) {
      var d = new Date();
      var strSeparator = "-"; //日期分隔符
      var oDate1;
      var oDate2;
      var iDays; // 相差的天数
      oDate1 = strDateStart.split(strSeparator); // 需要比较的日期
      var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      var strDateE = new Date(d.getFullYear(), d.getMonth(), d.getDate()); // 当前日期
      iDays = parseInt((strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数 
      return iDays;
    }
  }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'serveContent',
    data() {
        return {
            source: '1',
            reload: '' //是否是刷新的页面：首次进入为0，刷新后为1
        };
    },
    beforeCreate() {
        document.title = '服务内容 ';
    },
    mounted() {
        var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); //  获取ordersession对象
        if (orderInfo) this.source = orderInfo.source;
        this.reload = sessionStorage.getItem('reload');
        //    this.init();
        document.body.addEventListener("scroll", this.init);
        this.reloadfun(); //刷新后的scrollTop方法
        sessionStorage.setItem('reload', '1');
    },
    destroyed() {
        //页面返回时执行
        document.body.removeEventListener("scroll", this.init); //销毁scroll
        sessionStorage.setItem('reload', '0');
    },
    methods: {
        init() {
            //			$('body').scroll(function () {
            //  			alert('首次进入');
            var a = document.getElementById("product_infoall").offsetTop;
            var b = document.getElementById("serve_infoall").offsetTop;
            var c = document.getElementById("questionall").offsetTop;
            var h = document.getElementById("serall").getBoundingClientRect();
            var h1 = document.getElementById("serve_infoall").getBoundingClientRect();
            console.log(-h.top);
            //              if (a >= (-h.top+30)) {
            //                  $(".ptap").addClass("active");
            //					$(".stap,.qtap").removeClass("active");
            //              }
            if (-h.top > 180) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
            }
            if (-h.top > 1160) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
            }
            if (-h.top < 150) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
            }
            //          });
        },
        reloadfun() {
            if (this.reload) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scroll(function () {
                    //          	alert('刷新后');
                    var a = document.getElementById("product_infoall").offsetTop;
                    var b = document.getElementById("serve_infoall").offsetTop;
                    var c = document.getElementById("questionall").offsetTop;
                    var h = document.getElementById("serall").getBoundingClientRect();
                    console.log(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop());
                    //              if (a >= $(window).scrollTop()+30) {
                    //                  $(".ptap").addClass("active");
                    //					$(".stap,.qtap").removeClass("active");
                    //              }
                    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() > 180) {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
                    }
                    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() > 1160) {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
                    }
                    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() < 150) {
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
                    }
                });
            }
        },
        tap1() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
            //					$(".product_info").css("display","block");
            //					$(".serve_info,.question").css("display","none");
            return document.getElementById('product_info').scrollIntoView(true);
        },
        tap2() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
            //					$(".serve_info").css("display","block");
            //					$(".product_info,.question").css("display","none");
            return document.getElementById('serve_info').scrollIntoView(true);
        },
        tap3() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
            //					$(".question").css("display","block");
            //					$(".product_info,.serve_info").css("display","none");
            return document.getElementById('question').scrollIntoView(true);
        }
    }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const api = new __WEBPACK_IMPORTED_MODULE_0__api_API__["a" /* default */]();





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toOrder',
  data() {
    return {
      isCheck: false, // 服务同意书是否勾选
      hospitalName: '',
      hospitalAddr: '',
      productName: '',
      mobile: "请输入手机号",
      user: {
        "patientName": "",
        "cardNo": "",
        "age": ""
      }, //输入信息对象
      orderTime: {
        "encounterDate": ""
      }, //预约时间对象
      phoneflag: false, // 电话号码校验状态
      tipWords: '',
      orderInfo: {},
      source: '',
      bookDateTime: '请选择预约时间',
      orderFlag: 1, // 是否已经预约的状态
      isCheckStore: false, // 是否已选门诊
      isOrder: false, // 即将跳转预约页面
      isOpenKey: false, // 是否输入电话号码
      keyInfo: [], // 键盘内容
      selfClose: false, // 手动点击弹层
      timeOutEvent: 0, //定时器   
      longdel: '', // 长按删除
      onLoadFlag: false // onLoadFlag标记
    };
  },
  beforeRouteLeave: (to, from, next) => {
    if (sessionStorage.getItem('back_ticketURI')) {
      //返回卡券标记
      var back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
      if (back_ticketURI == '1') {
        //返回卡券
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('卡券');
        next(false);
        sessionStorage.setItem('back_ticketURI', '0');
        WeixinJSBridge.call('closeWindow');
      } else {
        next();
      }
    } else {
      next();
    }
  },
  beforeCreate() {
    document.title = '预约';sessionStorage.setItem('back_ticketURI', '1');
  },
  created() {},
  mounted() {
    __WEBPACK_IMPORTED_MODULE_3__assets_js_wxConfig_js__["a" /* tkWX */].init({});
    sessionStorage.setItem('backFlag', false); // 是否为医院列表返回城市页
    sessionStorage.setItem('back_ticketURI', '1');
    this.fillOrderPage(); // 填充预约页面
    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).height(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height());
    this.showbtn();
    this.anios();

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.key_body').on('touchstart', function (e) {
      e.preventDefault();
    });
  },
  methods: {
    // 填充预约页面
    fillOrderPage: function () {
      this.backFlag = JSON.parse(sessionStorage.getItem('isCheckStore')) || false; // 页面是否是返回页面
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式

      var orderInfo;
      if (this.backFlag == false) {
        orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
      }
      orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
      this.orderInfo = orderInfo; //  获取ordersession对象
      // 初始填充医院站点
      if (orderInfo.hospitalName) {
        this.hospitalName = orderInfo.hospitalName;
        this.hospitalAddr = orderInfo.orgAddress;
      } else {
        this.hospitalName = '';
      }
      // 初始填充预约时间
      if (orderInfo.orderTime == undefined) {
        this.bookDateTime = "请选择预约时间";
      } else {
        if (orderInfo.orderTime.encounterDate != undefined) {
          this.bookDateTime = orderInfo.orderTime.bookTime + " " + orderInfo.orderTime.startTime;
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.myTime').removeClass('cd2').addClass('t_c4e');
        }
      }
      // 初始填充验证手机号码
      if (orderInfo.mobile != undefined) {
        this.mobile = orderInfo.mobile;
        this.phoneBlur();
      } else {
        if (this.mobile == '请输入手机号') {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').addClass('pcd2');
        }
      }

      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(orderInfo.user);
      // 填充页面用户信息
      if (orderInfo.user) {
        this.user = orderInfo.user;
      } else {
        this.fillOrderInfo();
      }
      this.isCheck = this.orderInfo.isCheck ? this.orderInfo.isCheck : false; // 服务同意书是否已选
      this.onLoadFlag = this.orderInfo.onLoadFlag ? this.orderInfo.onLoadFlag : false; // 是否有订单详情
    },
    // 填充客户身份信息
    fillOrderInfo: function () {
      let _this = this;
      var param = {
        "platform": "HealthManage", // 平台
        "policyNo": _this.orderInfo.policyNo, // 保单号
        "cpnTicketNo": _this.orderInfo.cpnTicketNo // 卡券号 920修改卡券名称cpnTicketNo
      };
      let response = api.getCorePolicyDetail(param); // 根据保单号获取用户详情
      response.then(function (res) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);

        if (res.status == '200') {
          var data = res.data.data;
          if (data == null) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({
              message: res.data.message,
              duration: 1000,
              className: 'mToast'
            });
          }
          _this.user.patientName = data.insuredName; // 页面展用户姓名
          _this.user.cardNo = data.identifyNumber; // 页面展示身份证号
          _this.user.aesInfo = data.aesInfo; // 加密身份证号
          _this.user.identifyTypea = data.identifyTypea; // 证据类型
          _this.user.age = data.age; // 被保人年龄 
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.user.age);
          //          data.age = 13
          //          if(data.age >= 14){
          _this.orderInfo.source = '1';
          //          }else{
          //            _this.orderInfo.source = '14';//'6'
          //          }
          // 是否跳转页面
          if (_this.orderInfo.orderId && _this.orderInfo.orderId.length) {
            _this.onLoading();
          }
          _this.orderInfo.user = _this.user;
          sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo));
        } else {
          if (res.data.message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({
              message: res.data.message,
              duration: 1000,
              className: 'mToast'
            });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/gx/common/errorPage");
      });
    },
    // 是否跳转页面
    onLoading: function (orderId, channel) {
      var that = this;
      that.orderId = orderId; //||'15785';
      var param = {
        "orderId": that.orderInfo.orderId, //截取URL
        "channelType": that.orderInfo.channelType
      };
      var parResult = api.selectOrder(param);
      parResult.then(function (res) {
        var data = res.data;
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(data);
        if (data.status == "1") {
          var orderMsg = data.data;
          //            orderMsg.orderState = "1";  
          var omstate = orderMsg.orderState;
          if (omstate == "4" || omstate == "0") {
            // 已经预约
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = "#/gx/user/orderDetail?orderId=" + that.orderInfo.orderId + "&policyNo=" + that.orderInfo.policyNo + '&channelType=' + that.orderInfo.channelType + '&cpnTicketNo=' + that.orderInfo.cpnTicketNo;
          } else if (omstate == "3" || omstate == "1") {
            // 已完成
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = '#/gx/user/evalFill?orderId=' + that.orderInfo.orderId + '&policyNo=' + that.orderInfo.policyNo + '&channelType=' + that.orderInfo.channelType + '&cpnTicketNo=' + that.orderInfo.cpnTicketNo;
          } else if (omstate == "5") {
            // 爽约
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = '#/gx/user/unorder?orderId=' + that.orderInfo.orderId;
          } else if (omstate == "2") {
            // 取消预约
            if (orderMsg.orgSource == 1) {} else {
              // 展示订单详情的出参
              //              orderMsg.serviceType = '6'
              if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(orderMsg.serviceType, that.orderInfo.source);
              if (orderMsg.serviceType == that.orderInfo.source) {
                that.hospitalName = orderMsg.orgName;
                that.hospitalAddr = orderMsg.orgAddress;
              } else {
                that.hospitalName = '';
              }

              that.mobile = orderMsg.mobile;

              that.orderInfo.hospitalId = orderMsg.orgId;
              that.orderInfo.doctorId = orderMsg.doctorId;
              that.orderInfo.mobile = orderMsg.mobile;
              that.orderInfo.contactTel = orderMsg.contactTel;
              that.orderInfo.hospitalName = orderMsg.orgName;
              that.orderInfo.orgAddress = orderMsg.orgAddress;
              that.orderInfo.orgCode = orderMsg.orgCode;
              that.orderInfo.orgSource = orderMsg.orgSource;
              that.orderInfo.onLoadFlag = true;
              __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
              sessionStorage.setItem('isCheckStore', true);
              sessionStorage.setItem('orderInfo', JSON.stringify(that.orderInfo));
            }

            //            that.bookDateTime = orderMsg.encounterDate.replace('-','.')+" "+orderMsg.beginTime
            //            $('.myTime').removeClass('cd2').addClass('t_c4e');
            //            window.location.href='#/gx/order/toOrder?policyNo='+that.policyNo+'&channelType='+channel+'&cpnTicketNo='+cpnTicketNo
          }
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])(data.message);
        }
      });
    },
    // 去服务内容页面
    toServeContent: function () {
      sessionStorage.setItem('back_ticketURI', '0');
      window.location.href = '#/gx/order/serveContent';
    },
    // 服务知情同意书
    toServeNotice: function () {
      sessionStorage.setItem('back_ticketURI', '0');
      window.location.href = '#/gx/order/agreeServe';
    },
    // 去选择医院信息
    toCheckHospital: function () {
      sessionStorage.setItem('isCheckStore', true);
      if (this.orderInfo.cityId && this.onLoadFlag == false) {
        sessionStorage.setItem('back_ticketURI', '0');
        window.location.href = "#/gx/order/checkStation";
      } else {
        if (this.orderInfo.channelType) {
          sessionStorage.setItem('back_ticketURI', '0');
          window.location.href = "#/gx/order/Place";
        }
      }
    },
    // 去选择预约时间
    toCheckTime: function () {
      if (this.orderInfo.hospitalId) {
        sessionStorage.setItem('back_ticketURI', '0');
        window.location.href = "#/gx/order/checkTime";
      } else {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').html("请先选择预约门诊信息");
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').show();
        setTimeout(function () {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        }, 1500);
      }
    },
    // css设置
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      /*position: absolute;top: 0;left:0;z-index:20;*/
      if (isAndroid) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.toOrder').css({ 'position': 'absolute', 'top': '0', 'left': '0' });
      }
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.toCheck').css('top', '28%');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.myblur').blur();
      }
    },
    // 提交按钮显示状态更改
    showbtn: function () {
      //      if(this.isCheck == true && this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) { // 手机验证通过且已选体检时间 按钮可用
      if (this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) {
        // 手机验证通过且已选体检时间 按钮可用
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', false);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').css('background-color', '#f49e23');
      }
      //      if(this.isCheck == false || this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) { // 手机验证失败或未选体检时间 按钮置灰
      if (this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) {
        // 手机验证失败或未选体检时间 按钮置灰
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').css('background-color', '#ffd18d');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', "disabled");
      }
      return true;
    },
    // 输入电话号码
    inputTel: function (n, id) {
      var len = this.mobile.length;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth;

      if (id != 9 && id != 11 && len < 11) {
        this.mobile = this.mobile + n;
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth + 1);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('#key' + n).addClass('click_num');
        setTimeout(function () {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('#key' + n).removeClass('click_num');
        }, 150);
      }
    },
    // 点击删除键
    gtouchStart: function (id) {
      if (id == 11) {
        let _this = this;
        _this.timeOutEvent = setTimeout(function () {
          _this.longPress();
        }, 500); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适

        return false;
      }
    },
    // 放开删除键
    gtouchend: function (n, id) {
      var len = this.mobile.length;
      if (id == 11) {
        let _this = this;
        clearTimeout(_this.timeOutEvent); //清除定时器   
        clearInterval(_this.longdel); // 清除长按删除
        if (_this.timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）   
          if (len > 0) {
            _this.mobile = _this.mobile.slice(0, len - 1);
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth - 16);
          }
        }
        return false;
      }
    },
    // 长按删除键
    longPress: function () {
      let _this = this;
      _this.timeOutEvent = 0;
      //执行长按要执行的内容，如弹出菜单   
      var len = _this.mobile.length;
      if (len > 0) {
        _this.longdel = setInterval(function () {
          _this.mobile = _this.mobile.slice(0, --len);
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth - 16);
          if (len == 0) clearInterval(_this.longdel); // 清除长按删除
        }, 100);
      } else {
        clearTimeout(_this.timeOutEvent); //清除定时器
        clearInterval(_this.longdel); // 清除长按删除
      }
    },
    // 关闭键盘
    closeKey: function () {
      let _this = this;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').remove(); // 移除光标
      _this.isOpenKey = false;
      _this.selfClose = true; // 手动点击弹层
      _this.phoneBlur();
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("html, body").animate({ scrollTop: 0 }, { duration: 500, easing: "swing" });
    },
    // 打开键盘
    openKey: function () {
      this.isOpenKey = true;
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.v-modal').attr("style", "opacity: 0");
      }, 1);
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').after("<i class='cursor'></i>");
      var top_h = __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor')[0].offsetHeight; // 手机号码元素高度
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
      if (this.phoneflag == false && this.mobile != '请输入手机号') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css({ 'left': __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth });
      } else if (this.phoneflag == true && this.mobile != '请输入手机号') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css({ 'left': __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth });
      } else {
        if (this.selfClose == false) {
          this.mobile = '';
        }
      }
      if (this.selfClose == true) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth);
      }
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("html, body").animate({ scrollTop: 150 }, { duration: 500, easing: "swing" });
      //      $("html, body").css('padding-bottom',150)
      var delimg = "<img src = '../../../assets/images/order/key_delete.png'>";
      var tel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', "space", '0', 'del'];
      this.keyInfo = tel;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("#key11").append(delimg);
    },
    // 验证手机号
    phoneBlur: function () {
      this.mobile = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.trim(this.mobile);
      var phone = this.mobile;
      if (phone == '') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
        this.phoneflag = false;
      } else {
        if (!/^1[34578]\d{9}$/.test(phone)) {
          this.phoneflag = false;
        } else {
          this.phoneflag = true;
        }
      }
      if (this.phoneflag == false) {
        this.tipWords = '请输入正确的手机号';
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').show();__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').show();
        setTimeout(function () {
          _this.tipWords = '';__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').hide();__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        }, 1500);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phc').addClass('c6e');
      } else {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phone').removeClass('errNum');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phc').removeClass('c6e');
      }
      this.orderInfo.mobile = this.mobile;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      this.showbtn();
    },
    // 勾选服务同意书
    checkTip: function () {
      this.isCheck = !this.isCheck;
      this.showbtn();
      //      if(this.isCheck == false) {
      //        this.tipWords = "请先阅读并同意服务知情同意书"
      //        var _this = this;
      //        $('.errtip').show();
      //        setTimeout(function(){_this.tipWords='';$('.errtip').hide()},1500);
      //      }
      if (this.isCheck == true) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
      }
      this.orderInfo.isCheck = this.isCheck;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
    },
    // 去预约
    toOrderAct: function () {
      this.phoneBlur();
      if (this.isCheck == false) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '请先阅读并同意服务知情同意书', duration: 1500, className: 'mToast' });
        //        $('.errtip').html("请先阅读并同意服务知情同意书");
        //        $('.errtip').show();
        //        setTimeout(function(){$('.errtip').hide()},1500);
      }
      let _this = this;

      if (_this.user.cardNo == "") {
        // 未请求到体检人信息提示
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "未查到您的身份信息" });
        return false;
      }
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.orderInfo);
      var param = {
        "contactTel": _this.orderInfo.contactTel, // 机构电话
        'orgAddress': _this.orderInfo.orgAddress, // 机构地址
        "doctorId": _this.orderInfo.doctorId,
        "encounterDate": _this.orderInfo.orderTime.encounterDate,
        "endTime": "", //_this.orderInfo.orderTime.endTime,
        "hospitalId": _this.orderInfo.hospitalId,
        "hospitalName": _this.orderInfo.hospitalName,
        "orgSource": _this.orderInfo.orgSource, // 机构来源
        "orgCode": _this.orderInfo.orgCode ? _this.orderInfo.orgCode : '', // 第三方平台医院id
        "idCardNo": _this.user.cardNo, // _this.user.cardNo
        "idType": _this.user.identifyTypea, // 证件类型
        "aesInfo": _this.user.aesInfo,
        "mobile": _this.mobile,
        "patientName": _this.user.patientName,
        "startTime": _this.orderInfo.orderTime.startTime,
        "timeSlotId": _this.orderInfo.orderTime.timeSlotId,
        "twtId": _this.orderInfo.policyNo != null ? _this.orderInfo.policyNo : "",
        "wesurePolicyNo": _this.orderInfo.wesurePolicyNo != null ? _this.orderInfo.wesurePolicyNo : _this.orderInfo.policyNo, // 微宝内部保单号
        "channelType": sessionStorage.getItem('channelType'), //   _this.orderInfo.channelType,//渠道类型
        //          "ticketNo":_this.orderInfo.ticketNo// 卡券号
        "ticketId": _this.orderInfo.cpnTicketNo, // 卡券号 920修改卡券名称cpnTicketNo  922将提交卡券号改为ticketId
        "source": _this.orderInfo.source // 套餐类别1--洗牙 6--14岁以下
      };
      if (_this.orderFlag > 1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "您已提交预约，请勿重复操作" });
      }
      if (_this.isCheck == true && _this.phoneflag == true && _this.bookDateTime != "" && _this.orderFlag == 1) {
        let response = api.order(param);
        ++_this.orderFlag;
        _this.showbtn();
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
          if (res.data.status == '1') {
            _this.orderInfo.orderId = res.data.orderId;
            _this.orderInfo.tradeNo = res.data.tradeNo;
            sessionStorage.setItem('isCheckStore', false);
            sessionStorage.setItem('isOrder', true);
            sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo));
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', "disabled");
            setTimeout(function () {
              sessionStorage.setItem('back_ticketURI', '0');
              window.location.href = "#/gx/user/orderDetail?orderId=" + res.data.orderId + "&policyNo=" + _this.orderInfo.policyNo + '&channelType=' + _this.orderInfo.channelType + '&cpnTicketNo=' + _this.orderInfo.cpnTicketNo + '&wesurePolicyNo=' + _this.orderInfo.wesurePolicyNo;
            }, 100);
          } else {
            //按钮点亮
            _this.orderFlag = 1;
            _this.showbtn();
            if (res.data.message) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1000, className: 'mToast' });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1000, className: 'mToast' });
            }
          }
        }).catch(function (err) {
          //按钮变亮
          _this.orderFlag = 1;
          _this.showbtn();
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/gx/common/errorPage");
        });
      }
    }

  }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const api = new __WEBPACK_IMPORTED_MODULE_0__api_API__["a" /* default */]();





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toPage',
  data() {
    return {
      urlStr: '',
      ticketNo: ''
    };
  },
  beforeCreate() {
    document.title = '用户输入齿科券'; //sessionStorage.setItem('back_ticketURI','1');
  },
  created() {},
  mounted() {
    sessionStorage.clear();
  },
  methods: {
    // 调取接口进行页面跳转
    toPage: function () {
      if (this.ticketNo == '') {
        // 卡券号为空
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "请输入齿科券号" });
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()(".ticketNo").focus();
      } else {
        var param = { "policyNo": "", "ticketNo": this.ticketNo || "" };
        let response = api.indexre(param); // 微宝接口
        let _this = this;
        response.then(function (res) {
          console.log(res);
          var str = res.data.data.param;
          if (res.status == 200) {
            var url = __WEBPACK_IMPORTED_MODULE_1__api_config__["a" /* default */].baseURL.replace('call/', 'insurance/orderIndex?param=');
            //          _this.urlStr = url + str;// 拼接跳转路径
            _this.urlStr = __WEBPACK_IMPORTED_MODULE_3__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/insurance/orderIndex?param=' + str; // 拼接跳转路径
            window.location.href = _this.urlStr;
          }
        }).catch(function (err) {
          console.log(err);
          //        window.location.replace("#/common/errorPage");
        });
        //        console.log("即将跳转页面")
      }
    },
    // css设置
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()('.toCheck').css('top', '28%');
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()('.myblur').blur();
      }
    }
  }
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_config_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









const api = new __WEBPACK_IMPORTED_MODULE_4__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			orderMsg: {}, //查询预约详情
			evalMsg: {}, //提交评价
			selectValuaMsg: {}, //查询评价
			starArr: ['1', '2', '3', '4', '5'], //星星评价
			textarea1: "", //文本
			i: "", //星星评价
			orderId: '',
			doctorId: '',
			orgId: '', //机构Id
			userId: '', fileId: '', //图片id
			orgName: '', //机构名称
			cellValue: '', //有无口腔图片的value
			startlg1: '', startlg2: '', startlg3: '', //星星评价
			status: '', //查询评价信息状态码
			substatu: '', //提交状态码
			curLength: '', fileImg: '', fillsrc: [], source: '', objKey: '', source2: '', hanindex: '', mintleng: '',
			indexnow: 0, isshow: false
		};
	},
	beforeCreate() {
		document.title = '评价';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		//物理键返回，路由离开
		var back_ticketURI = sessionStorage.getItem('back_ticketURI');
		if (back_ticketURI) {
			//返回卡券标记
			var pic = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix') ? __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').css("display") : "";
			if (pic && pic != 'none') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				next(false);
				//return;
			} else {
				back_ticketURI = JSON.parse(back_ticketURI);
				if (back_ticketURI == '1') {
					//返回卡券
					next(false);
					sessionStorage.setItem('back_ticketURI', '0');
					//			            window.location.href=config_param.ticketURI; 
					WeixinJSBridge.call('closeWindow');
				} else next();
			}
		} else next();
	},

	mounted() {
		this.onLoading();
		this.isEvalFull();
		__WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__["a" /* tkWX */].init({});
		this.optImg();
	},
	methods: {
		handleChange: function (index) {
			//发生事件
			this.hanindex = index + 1;
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.hindex').text(this.hanindex);
		},
		teethUrl: function () {
			sessionStorage.setItem('back_ticketURI', '0');
			window.location.href = '#/gx/user/teethImg';
		},
		shopUrl: function () {
			sessionStorage.setItem('back_ticketURI', '0');
			window.location.href = '#/gx/user/shopDetail';
		},
		isEvalFull: function () {
			//是否完成评价
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			that.orgId = parseUrl.orgId;
			var channel = parseUrl.channelType;
			var param = {
				"orderId": that.orderId,
				"channelType": channel
			};
			var parResult = api.selectValuationByOrderId(param);
			parResult.then(function (res) {
				var data = res.data;
				that.status = data.status;
				//					that.status = "2"
				if (data.status == "1") {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".del_bg").hide();
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').show();
					that.selectValuaMsg = data.selectValuationResponseVo;
					var selecImg = that.selectValuaMsg.fileArray;
					if (selecImg != null) {
						that.fileImg = "";
						var deimg_w, deimg_h;
						var filarr = [];
						for (var n = 0; n < selecImg.length; n++) {
							var selecImgId = selecImg[n];
							that.fileId = selecImgId.fileResourceId;
							if (that.fileId != null) {
								that.fileImg += "<img src=" + __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + that.fileId + '/default' + "/>";
							}
							var src_url = __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + selecImgId.fileResourceId + '/default';
							var deimg = new Image();
							deimg.src = src_url;
							deimg.onload = function () {
								var out_hei = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.img_srec').height();
								var out_wid = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.img_srec').width();
								__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#debody_img div img').css({ 'max-width': 'none' });
								__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#debody_img div img'), function (i, n) {
									deimg_w = n.naturalWidth;
									deimg_h = n.naturalHeight;
									if (deimg_w > deimg_h) {
										n.style.width = 'auto';n.style.height = '100%';
										var img_wh = deimg_h / out_hei;
										var dewidth = deimg_w / img_wh;
										var dewh = '-' + (dewidth - out_wid) / 2 + 'px';
										n.style.left = dewh;
									} else {
										n.style.width = '100%';n.style.height = 'auto';
										var img_wh = deimg_w / out_wid;
										var deheight = deimg_h / img_wh;
										var dewh = '-' + (deheight - out_hei) / 2 + 'px';
										n.style.top = dewh;
									}
								});
							};
							filarr.push(src_url);
							setTimeout(function () {
								that.fillsrc = filarr;
							}, 10);
						}
					}
				} else {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').hide();
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').not(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic .del_ico')).click(function () {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
					});
					return;
				}
			});
		},
		lightStar: function (i, t) {
			//星星评价
			var sparent = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.target).parent();
			var i = event.target.id;
			this.i = i;
			if (i == 1 && sparent.children('.star_light').length == 1) {
				sparent.children().eq(0).removeClass('star_light');return;
			}
			sparent.children().removeClass('star_light');
			for (; i > 0; i--) {
				sparent.children('#' + i).addClass('star_light');
			}
		},
		evalLoading: function () {
			//提交评价
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.doctorId = that.orderMsg.doctorId;
			that.orderId = parseUrl.orderId;
			that.orgId = parseUrl.orgId;
			that.startlg1 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.sone .star_light').length;
			that.startlg2 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.stwo .star_light').length;
			that.startlg3 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.sthree .star_light').length;
			if (that.startlg1 > 0 && that.startlg2 > 0 && that.startlg3 > 0) {
				if (that.curLength == 0 || that.curLength >= 15) {
					var fileArray = [];
					var fsid = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.eval_img .plus');
					if (fsid) {
						for (var j = 0; j < fsid.length; j++) {
							var ssid = fsid[j];
							fileArray.push({
								"fileIndex": j, "fileName": "pingjia", "fileResourceId": __WEBPACK_IMPORTED_MODULE_3_jquery___default()(ssid).attr('ecmImgId'), "fileType": ""
							});
						}
					}
					var param = {
						"content": this.textarea1,
						"doctorId": that.doctorId, //url
						"fileArray": fileArray,
						"orderId": that.orderId, //url
						"orgId": that.orgId, //url
						"orgAddress": that.orderMsg.orgAddress,
						"serviceAttitude": this.startlg1, //服务态度几星
						"serviceEnvironment": this.startlg2, //几星
						"serviceQuality": this.startlg3, //几星
						"userId": that.userId //url身份证号
					};
					var parResult = api.valuationSave(param);
					parResult.then(function (res) {
						var data = res.data;
						that.substatu = data.status;
						if (data.status == "1") {
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".del_bg").hide();
							that.evalMsg = data.valuationSaveResVo;
							that.isEvalFull();
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])({
								className: 'eval_btntxt',
								message: data.message, //'提交成功',
								iconClass: 'eval_succ',
								position: 'middle',
								duration: 1000
							});
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').not(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic .del_ico')).click(function () {
								//									$('.pic_fix').hide();
								//									$('.others').show();
							});
						} else {
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').hide();
						}
					});
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])("字数不得低于15字");
				}
			} else {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])({
					message: '请选择评价等级', //'提交成功',
					position: 'middle',
					duration: 1000
				});
			}
		},
		check: function () {
			/*字数限制*/
			this.curLength = __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val().length;
			if (this.curLength > 140) {
				var num = __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val().substr(0, 140);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val(num);
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])("字数已超过上限");
			}
		},
		optImg: function () {
			//图片上传
			var t = this;
			//上传
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic>.one_pic input:first-child').click(function (e) {
				e.preventDefault();
				t.chooseImage(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this), __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parent('.one_pic')[0]);
			});
			//大图浏览当前图片
			var currOptImg;

			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').on('click', '.upload_pic img', function () {
				//
				t.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.img_over').attr('data-i'));
				t.isshow = false;
				currOptImg = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.mint-swipe').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix>img').attr('src', __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).attr('src'));
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').on('click', '.debody_img img', function () {
				//
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix>img').hide();
				t.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.img_over').attr('data-i'));
				currOptImg = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').hide();
				var mint_swarp = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.debody_img').find('img');
				t.mintleng = mint_swarp.length; //获取当前元素中图片的总数
				setTimeout(function () {
					t.isshow = true;
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.hindex').text(t.indexnow + 1); //获取当前图片进来的索引
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.mintleng').text(t.mintleng);
				}, 100);

				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});

			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.cha').click(function () {
				t.isshow = false;
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
			//删除当前浏览的选择图片
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix .del_bg').click(function () {
				currOptImg.remove();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix img').attr('src', '');
				if (__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length < 3) {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.one_pic').show();
				}
			});
		},
		chooseImage: function (_this, rplaceObj) {
			//调用微信上传图片并且抓取到服务器
			var t = this;
			wx.chooseImage({
				count: 3 - __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length, // 默认9
				sizeType: ['compressed'], //'original', 可以指定是原图还是压缩图，默认二者都有
				//sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					if (res.localIds.length + __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length > 3) {
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])('只能上传三张评价图!');return;
					}
					//							alert(JSON.stringify(res));
					if (res.localIds) {
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						var syncUpload = function (localIds, _this, rplaceObj) {
							var localId = localIds.pop();
							wx.uploadImage({
								localId: localId, //需要上传的图片的本地ID，由chooseImage接口获得				    
								isShowProgressTips: 1, //默认为1，显示进度提示				   
								success: function (res) {
									//				    				    	alert(res.serverId); 
									//其他对serverId做处理的代码
									if (localIds.length > 0) syncUpload(localIds, _this, rplaceObj);
									var serverId = res.serverId; //返回图片的服务器端ID	
									t.setImg({ "serverId": serverId }, null, function (sid) {
										//单张上传到本地
										__WEBPACK_IMPORTED_MODULE_3_jquery___default()(rplaceObj).before("<img class='plus' src='" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["c" /* changeWXImgURL */])(localId) + "' fileName='' ecmImgId='" + sid + "'/>");
										if (__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length > 2) __WEBPACK_IMPORTED_MODULE_3_jquery___default()(rplaceObj).hide();
									});
								}
							});
						};
						syncUpload(localIds, _this, rplaceObj);
					}
				}
			});
		},
		setImg: function (data, fileName, sucFun) {
			//			alert("setImg: "+data.serverId)
			var param = { "uploadImageRequestVoList": [{ "module": "common", "mpType": "life", "name": "", "serverId": data.serverId
					//      						"RkLfv4Yvy_P2HcRh9cCTqQGZAIyazeqHn1u4SEeNi6V60OY1aTTC956qGcdWfJGu"
				}] };
			let response = api.setImg(param);
			response.then(function (res) {
				var data = res.data;
				if (data.status == '1') {
					var k = data.data.uploadImageRequestVoList[0].key;
					if (sucFun) sucFun(k);
				} else {
					//		        	Toast(data.message);
				}
			}).catch(function (err) {
				console.log(err); //Toast("获取签名connect fail!");
			});
		},
		//订单详情接口
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId; //||'15785';
			var channel = parseUrl.channelType;
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel //渠道类型
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					var ifOrder = true;
					that.orderMsg = data.data;
					that.orgName = that.orderMsg.orgName;
					that.doctorId = that.orderMsg.doctorId;
					that.userId = that.orderMsg.userId;
					that.userId ? that.userId : that.userId = parseUrl.userId;
					that.source2 = that.orderMsg.commitService; //门诊确认的服务
					that.source = that.orderMsg.serviceType; //客户提交的服务类型
					//						that.source!=1&&!that.source2$('.nobd').hide():$('.nobd').show();
					if (that.source != 1) {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.nobd').hide();
					} else if (that.source2 && that.source2 != 1) {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.nobd').hide();
					}
					that.source ? that.source : that.source = that.orderMsg.serviceType;
					var orderInfo;
					var uploadFlag = that.orderMsg.uploadFlag;
					var remark = that.orderMsg.remark;
					uploadFlag == 0 ? that.cellValue = "等待门诊上传" : uploadFlag == 1 ? that.cellValue = "已上传，请查看" : uploadFlag == 2 ? that.cellValue = "已放弃" : that.cellValue = "等待门诊上传";
					if (sessionStorage.getItem("orderInfo")) {
						//判断是否已经存在此session
						orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
						orderInfo.ifOrder = ifOrder;
						orderInfo.doctorId = that.orderMsg.doctorId;
					} else {
						orderInfo = { 'orderId': that.orderId, 'uploadFlag': uploadFlag, 'remark': remark, orderId: that.orderId, 'ifOrder': ifOrder, 'hospitalId': that.orderMsg.orgId, 'doctorId': that.orderMsg.doctorId };
					}
					sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
					var orderup = JSON.parse(sessionStorage.getItem("orderInfo"));
					var orderupload = orderup.uploadFlag;
					if (uploadFlag != orderupload) {
						orderInfo.uploadFlag = uploadFlag;
						sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
					}
					var sourObj = { //洗牙服务具体名称
						'1': '泰康人寿专享洗牙套餐券',
						'2': '泰康人寿专属涂氟',
						'3': '泰康人寿专享洗牙套餐、涂氟',
						'4': '泰康人寿专属窝沟封闭',
						'5': '泰康人寿专享洗牙套餐、窝沟封闭',
						'6': '泰康人寿专享窝沟封闭或涂氟',
						'7': '泰康人寿专享洗牙套餐、窝沟封闭或涂氟'
					};
					that.source ? that.source : that.source = '1';
					var soukey = that.source;
					__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(sourObj, function (soukey, val) {
						that.objKey = sourObj['1'];
					});
				}
			});
		}
	}
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








const api = new __WEBPACK_IMPORTED_MODULE_6__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			orderMsg: {}, //预约信息查询
			localData: {}, //定位信息对象
			phone: "", //机构手机号
			orderId: "",
			policyNo: '', //保单号
			endTime: '', //结束时间
			inTime: '',
			back_f: true, //物理返回
			orendate: '',
			orgid: '', //机构id，hospitalId
			shengname: '', //城市名
			lon: '', //经度
			lat: '', //weidu
			phones: '', //客服电话
			enddate: '', //结束时间
			locatimes: '', //本地时间
			ordertime: '', //预约时间
			istel: false,
			isTime: '',
			isDoTime: '',
			isordert: false,
			source: '',
			objKey: '',
			userId: '',
			clo: ''
		};
	},
	beforeCreate() {
		document.title = '齿科预约';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		var back_ticketURI = sessionStorage.getItem('back_ticketURI');
		var toMap = sessionStorage.getItem('toMap') || "";
		if (toMap) toMap = JSON.parse(toMap);
		//	      	 alert("toMap"+toMap+"---back_ticketURI:"+back_ticketURI);
		if (back_ticketURI) {
			//返回卡券标记
			var clo, dis;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-msgbox-wrapper') ? clo = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-msgbox-wrapper').length : "";
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mint-msgbox") ? dis = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mint-msgbox").css("display") : "";
			if (dis == 'block' && clo == '1') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.v-modal,.mint-msgbox').hide();
				next(false);
				return;
			} else {
				back_ticketURI = JSON.parse(back_ticketURI);
				if (back_ticketURI == '1' || back_ticketURI == '0' && toMap == '1') {
					//返回卡券
					next(false);
					if (toMap == '1') sessionStorage.setItem('toMap', '0');
					if (back_ticketURI == '1') sessionStorage.setItem('back_ticketURI', '0');
					WeixinJSBridge.call('closeWindow');
				} else {
					next();
				}
			}
		} else {
			next();
		}
	},

	mounted() {
		this.onLoading(); //接口交互
		this.location();
		var _this = this;
		__WEBPACK_IMPORTED_MODULE_1__assets_js_wxConfig_js__["a" /* tkWX */].init({});
		//			setInterval(function(){/***每1分钟发生一次请求 **/
		////				console.log(_this.timeOut)
		//				_this.timeOut();
		//			},60000);
	},
	methods: {
		location: function () {
			// 定位信息 
			var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
			if (qqlocation && qqlocation.yesOrNo == 1) {
				var t = qqlocation.time;
				var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
				if (outtime) {
					sessionStorage.removeItem('ifGetLocation');
				} else {
					this.localData = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
					//							return;
				}
			}
			var _this = this;
			var ifGetLocation = {};
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
					if (__WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__["a" /* config_param */].isLog) console.log("------------成功--------------");
					_this.localData = data;
					ifGetLocation = { "yesOrNo": 1, "data1": data, "time": new Date().getTime() };
					sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
				}, function () {
					if (__WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__["a" /* config_param */].isLog) console.log("-----定位失败-----");
					sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 }));
				});
			});
		},
		toPage: function () {

			var start = { "lon": this.lon, "lat": this.lat, "addr": "" };
			var dest = { "eword": this.orderMsg.orgName, "epointx": this.lon, "epointy": this.lat, 'address': this.orderMsg.orgAddress //机构地址
				//				    	var url="http://apis.map.qq.com/tools/poimarker?type=1&keyword="+
				//							      dest.eword+"&center="+dest.epointy+","+dest.epointx+"&region="+this.shengname+
				//							      //酒店&center=39.908491,116.374328
				//							      "&radius=1000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
			};var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(dest.address) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
			sessionStorage.setItem('back_ticketURI', '0');
			sessionStorage.setItem('toMap', '1');
			window.location.href = url;
		},
		timeOut: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId; //||'15785';
			this.policyNo = parseUrl.policyNo;
			var channel = parseUrl.channelType;
			var cpnTicketNo = parseUrl.cpnTicketNo;
			var userId = parseUrl.userId;
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel
			};
			var parResult = api.timeoutOrderState(param);
			parResult.then(function (res) {
				var orderState = res.data.data.orderState;
				if (res.data.status == "1") {
					if (orderState == that.omstate) {
						return;
					} else {
						that.onLoading();
					}
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
				}
			});
		},
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			this.policyNo = parseUrl.policyNo;
			var channel = parseUrl.channelType;
			var cpnTicketNo = parseUrl.cpnTicketNo;
			var wesurePolicyNo = parseUrl.wesurePolicyNo;
			that.isTime = JSON.parse(sessionStorage.getItem("isOrder"));
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					that.orderMsg = data.data;
					that.orgid = that.orderMsg.orgId;
					that.userId = that.orderMsg.userId;
					that.userId ? that.userId : that.userId = parseUrl.userId;
					that.source = that.orderMsg.serviceType; //预约时的服务
					//						that.source = '7'
					that.isDoTime = that.orderMsg.isDoBusinessTime;
					var omstate = that.orderMsg.orderState;
					if (omstate == "4") {
						//已确认预约
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt1").addClass("orders");
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt2").addClass("orders");
					} else if (omstate == "0") {
						//已提交申请
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt1").addClass("orders");
					} else if (omstate == "3" || omstate == "1") {
						//已完成
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/gx/user/evalFill?orderId=' + that.orderId + '&policyNo=' + that.policyNo + '&channelType=' + channel + '&cpnTicketNo=' + cpnTicketNo + '&userId=' + that.userId;
					} else if (omstate == "5") {
						//已爽约
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/gx/user/unorder?orderId=' + that.orderId;
					} else if (omstate == "2") {
						//已取消预约
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/gx/order/toOrder?orderId=' + that.orderId + '&policyNo=' + that.policyNo + '&channelType=' + channel + '&cpnTicketNo=' + cpnTicketNo + '&wesurePolicyNo=' + wesurePolicyNo;
					}
					that.endTime = that.orderMsg.encounterDate + " " + that.orderMsg.beginTime + ":00";
					that.enddate = that.orderMsg.encounterDate;
					var phone = that.orderMsg.contactTel;
					that.phones = phone.split(",");
					that.phones.length <= 1 ? that.phone = "tel:" + that.orderMsg.contactTel : that.phone = that.orderMsg.contactTel;
					var locatime = new Date().toLocaleDateString();
					that.locatimes = locatime.replace(/\//g, "");
					that.ordertime = that.orderMsg.encounterDate.replace(/\-/g, "");
					that.orendate = that.orderMsg.encounterDate.replace(/\-/g, ".");
					that.cityname(); //调用城市接口，获取经纬度
					that.isTime && !that.isDoTime ? that.isordert = true : that.isordert = false;
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".call-btn1").click(function () {
						that.isordert = false;
						JSON.parse(sessionStorage.removeItem("isOrder"));
					});
					var sourObj = {
						'1': '泰康人寿专享洗牙套餐券',
						'2': '泰康人寿专属涂氟',
						'3': '泰康人寿专享洗牙套餐、涂氟',
						'4': '泰康人寿专属窝沟封闭',
						'5': '泰康人寿专享洗牙套餐、窝沟封闭',
						'6': '泰康人寿专属窝沟封闭或涂氟',
						'7': '泰康人寿专享洗牙套餐、窝沟封闭或涂氟'
					};
					that.source ? that.source : that.source = '1';
					var soukey = that.source;
					__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(sourObj, function (soukey, val) {
						that.objKey = sourObj['1'];
					});
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
				}
			});
		},
		orderClick: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.v-modal,.mint-msgbox').show();
			var that = this;
			if (that.locatimes != that.ordertime) {
				var ts = '';
				var ct = '';
				var orState = that.orderMsg.orderState;
				if (orState == "0") {
					ts = '即将完成预约,请三思而行';
					ct = '去意已决';
				} else if (orState == "4") {
					ts = '确定取消预约';
					ct = '取消预约';
				}
				__WEBPACK_IMPORTED_MODULE_3_mint_ui__["MessageBox"].confirm('', {
					message: ts,
					title: '',
					confirmButtonText: '我再想想',
					cancelButtonText: ct
				}).then(action => {}, action => {

					var link = window.location.href;
					var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
					this.orderId = parseUrl.orderId;
					var orderIds = parseUrl.orderId;
					this.policyNo = parseUrl.policyNo;
					var channelType = parseUrl.channelType;
					var cpnTicketNo = parseUrl.cpnTicketNo;
					var wesurePolicyNo = parseUrl.wesurePolicyNo;
					var param = {
						"cancelReason": "",
						"hospitalId": that.orderMsg.orgId,
						"orderId": this.orderId, //截取URL中的orderId
						"cpnTicketNo": cpnTicketNo,
						"policyNo": this.policyNo
					};
					var parResult = api.cancelOrder(param);
					parResult.then(function (res) {
						var data = res.data;
						if (data.status == "1") {
							that.back_f = false;
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])({
								className: 'eval_btntxt',
								message: '取消成功',
								iconClass: 'eval_succ',
								position: 'middle',
								duration: 1000
							});
							setTimeout(function () {
								var toMap = sessionStorage.getItem('toMap') || "";
								var back_ticketURI = sessionStorage.getItem('back_ticketURI');
								if (toMap) toMap = JSON.parse(toMap);
								if (toMap == '1') sessionStorage.setItem('toMap', '0');
								if (back_ticketURI == '1') sessionStorage.setItem('back_ticketURI', '0');
								window.location.href = '#/gx/order/toOrder?orderId=' + orderIds + '&policyNo=' + that.policyNo + '&channelType=' + channelType + '&cpnTicketNo=' + cpnTicketNo + '&wesurePolicyNo=' + wesurePolicyNo;
							}, 1000);
						} else {
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
						}
					});
				});
			}
		},
		cityname: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			var channel = parseUrl.channelType;
			var param = {
				"hospitalId": that.orgid, //截取URL
				"channelType": channel
			};
			var parResult = api.hospitalInCity(param);
			parResult.then(function (res) {
				var cityDate = res.data;
				that.shengname = cityDate.shengName;
				if (cityDate.hospitalLongitudeLatitude && cityDate.hospitalLongitudeLatitude.length) {
					that.lon = cityDate.hospitalLongitudeLatitude.split(",")[0]; // 终点经度
					that.lat = cityDate.hospitalLongitudeLatitude.split(",")[1]; // 终点纬度
				} else {
					that.lon = "";that.lat = "";
				}
			});
		},
		telphone: function () {
			this.istel = true;
			this.phones = this.phone.split(",");
			this.phones = this.phone.split(",");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.telmodal').parent().css("width", "100%");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal").html("");
			for (var i = 0; i < this.phones.length; i++) {
				var telphone = "tel:" + this.phones[i];
				var aht = '<a href=' + telphone + ' class="adisplay">' + this.phones[i] + '</a>';
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal").append(aht);
			}
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal a:last-child").after('<a class="adisplay teldis">取消</a>');
			var _this = this;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal a").click(function () {
				_this.istel = false;
			});
		}
	}
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
var _this2 = this;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			popupVisible: false, //大图预览弹层
			distance: '', //定位距离
			avgQuality: '--', //评分
			hosInfo: {}, //门诊详情
			hosVal: '', //评价列表
			serInfo: [], //服务详情
			imgSrc: '', //门诊图片地址
			isOrder: true,
			localMsg: '', //定位信息
			config_param: __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */],
			topStatus: '', // loadmore状态
			allLoaded: false, // loadmore是否加载
			pageIndex: 0, // 当前页码
			items: [], // 页面展示数组
			results: [], // 查询结果数组
			status: '', // 查询结果状态
			avg_evaluate: '4.6',
			fillsrc: [], // 图片src数组
			errImg: "/#/assets/images/user/onerror.png",
			fillsrc: [],
			hanindex: '',
			mintleng: '',
			indexnow: 0
		};
	},
	beforeCreate() {
		document.title = '门诊详情';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		var that = _this2;
		var toMap = sessionStorage.getItem('toMap') || "";
		if (toMap) toMap = JSON.parse(toMap);
		if (toMap == '1') {
			next(false);
		}
		if (sessionStorage.getItem('back_ticketURI')) {
			//返回卡券标记
			var pic = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').css("display");
			if (pic != 'none') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				//					$('.hiddeninput').val(0);
				next(false);
				sessionStorage.setItem('back_ticketURI', '0');
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			} else {
				next();
			}
		} else {
			next();
		}
	},
	mounted() {
		this.addActive(); //默认显示评价模块
		this.addTap();
		this.locationSession(); //查看是否有未过期的缓存定位信息
		this.init();
		this.showBigPic();
	},
	methods: {
		handleChange: function (index) {
			//发生事件
			this.hanindex = index + 1;
			//	    		console.log('this.hanindex:'+this.hanindex);
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.hindex').text(this.hanindex);
		},
		remind() {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".remind_modal").css('display', 'block');
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".div_remind").css('display', 'block');
			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.remind_modal').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.remind_modal').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".div_remind").hide();
			});
		},
		init: function () {
			var orderInfo = sessionStorage.getItem('orderInfo');
			orderInfo = JSON.parse(orderInfo);
			//console.log(orderInfo);
			this.orderInfo = orderInfo; //  获取ordersession对象
			var doctorId = orderInfo.doctorId; //获取医生Id
			var hospitalId = orderInfo.hospitalId; //获取医院Id		
			if (orderInfo.ifOrder) {
				this.isOrder = false; //隐藏立即预约按钮
			}
			if (orderInfo.distance) {
				this.distance = orderInfo.distance;
			}; //获取定位距离										 
			var param = {
				"retrieveArgs": {
					"currentPage": "1",
					"hospitalId": hospitalId,
					"hospitalName": "",
					"latiude": "",
					"longitude": "",
					"provCode": "",
					"rowsPerPage": "1"
				}
			};
			var param_v = { "doctorId": doctorId, "orgId": hospitalId };
			this.fillInfo(param); //调取门诊信息接口    	
			this.fillValue(param_v); //调取评价列表接口
			this.errImg = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#hidden_src').attr('src');
			//		     	console.log(this.errImg)
		},
		addActive: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "none");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "block");
		},
		addTap: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap1").click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).addClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap2").removeClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "block");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "none");
			});
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap2").click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).addClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap1").removeClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "block");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "none");
			});
		},
		//大图浏览当前图片
		showBigPic() {
			var that = this;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2').on('click', '.debody_img img', function () {
				//
				//						that.indexnow=0;
				that.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).parents('.img_over').attr('data-i'));
				//						console.log(that.indexnow+',id');
				that.fillsrc = [];
				//console.log('that.indexnow'+that.indexnow);
				//					$('.pic_fix img').attr('src',$(this).attr('src'));
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').show();
				var imgs = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).parents('.debody_img').find('img');
				console.log(imgs.length);
				var len = imgs.length;
				var i = 0;
				imgs.each(function () {
					i++;
					var src = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src');
					that.fillsrc.push(src);
				});
				if (i == len) {
					setTimeout(function () {
						that.mintleng = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-swipe-item').length; //获取当前元素中图片的总数
						//							console.log($('.mint-swipe-item').length);
						var mintwarp = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-swipe-item.is-active').index(); //获取当前图片进来的索引
						//							console.log('that.hanindex:'+that.hanindex);
						if (!that.hanindex) {
							//没有发生chage事件
							__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.hindex').text(mintwarp + 1);
						}
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mintleng').text(that.mintleng - 1);
					}, 100);
				}

				//					that.popupVisible=true;
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});
			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cha').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				that.fillsrc = [];
				//					that.popupVisible=false;
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
		},
		// 填充页面
		fillInfo(param) {
			var that = this;
			let response = api.getOrgListBySolr(param); // 调后台方法,与门诊列表统一接口后
			response.then(function (res) {
				var data = res.data;
				//	          console.log(data);
				if (data.status == '1') {
					var dataInfo = data.hospitalsBySolrResponseVoList[0];
					that.hosInfo = dataInfo;
					setTimeout(function () {
						var h = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.b_address').height();
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.dh_img').height(h);
					}, 10);
					if (dataInfo.distance) {
						that.distance = dataInfo.distance;
					}; //获取距离
					if (dataInfo.avgQuality) {
						that.avgQuality = dataInfo.avgQuality;
					}; //获取评分	
					//调取图片接口
					if (!(dataInfo.hospitalImgId && dataInfo.hospitalId)) {
						return;
					}
					var pictureId = dataInfo.hospitalImgId;
					var hospitalId = dataInfo.hospitalId;
					var p = { "hospitalId": hospitalId, "pictureId": pictureId };
					//console.log("++++图片入参+++++");
					//console.log(p);	            	        		
					let response = api.getPicture(p); // 调后台方法获取门诊图片
					response.then(function (res) {
						var data = res.data;
						//console.log(data);
						if (data.status == '1') {
							that.imgSrc = data.picture;
						} else {
							if (data.message) {
								// 未成功返回数据Toast提示
								console.log(data.message);
							} else {
								console.log('发生内部错误');
							}
						}
					}).catch(function (err) {
						//			        	window.location.replace("#/common/errorPage");
					});
				} else {
					window.location.replace("#/common/errorPage"); //跳转至错误页面
					if (data.message) {
						// 未成功返回数据Toast提示
						console.log(data.message);
					} else {
						console.log('发生内部错误');
					}
				}
			}).catch(function (err) {
				//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
			});
		},
		// 渲染评价列表
		fillValue(param_v) {
			var that = this;
			that.allLoaded = false;
			that.pageIndex = 0;
			//console.log(param_v);
			let response = api.selectValuation(param_v); // 调后台方法
			response.then(function (res) {
				var data = res.data;
				//	          console.log(data);
				that.status = data.status; // 请求返回的状态
				if (data.status == '1') {
					//	            that.hosVal=data.selectValuationResponseVoList;
					var allArr = data.selectValuationResponseVoList;
					var deimg_w, deimg_h;
					for (var i = 0; i < allArr.length; i++) {
						var imgobj = allArr[i].fileArray;
						if (imgobj != null) {
							for (var j = 0; j < imgobj.length; j++) {
								imgobj[j].fileResourceId ? that.fileId = imgobj[j].fileResourceId : allArr[i].fileArray[j] = [];
								if (that.fileId != null) {
									var src_url = __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + that.fileId + '/default';
									allArr[i].fileArray[j].fillsrc = src_url;
									var deimg = new Image();
									deimg.src = src_url;
									var src = "";
									//                    deimg.onerror=function(){
									//                    	console.log(that.errImg);
									//                    	deimg.src=that.errImg;
									//                    	allArr[i].fileArray[j].fillsrc=that.errImg;
									//                    }
									deimg.onload = function () {
										var out_hei = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.img_sre').height();
										var out_wid = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.img_sre').width();
										__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2 .img_over img').css({ 'max-width': 'none' });
										__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2 .img_over img'), function (i, n) {
											deimg_w = n.naturalWidth; //naturalWidth
											deimg_h = n.naturalHeight; //naturalHeight
											if (deimg_w > deimg_h) {
												n.style.width = 'auto';n.style.height = '100%';
												var img_wh = deimg_h / out_hei;
												var dewidth = deimg_w / img_wh;
												var dewh = '-' + (dewidth - out_wid) / 2 + 'px';
												n.style.left = dewh;
											} else {
												n.style.width = '100%';n.style.height = 'auto';
												var img_wh = deimg_w / out_wid;
												var deheight = deimg_h / img_wh;
												var dewh = '-' + (deheight - out_hei) / 2 + 'px';
												n.style.top = dewh;
											}
										});
									};

									//                    deimg.onerror = function(){//错误
									//                    	src_url=that.errImg;
									//                    }
									//                    deimg.oncomplete=function(){
									//                    	allArr[i].fileArray[j].fillsrc=src_url;
									////                    }
								}
							}
						}
					}
					that.hosVal = allArr;
					that.results = that.sliceArr(that.hosVal, 10); // 分割数据
					that.items = that.results[0]; // 页面展示分割后的第一条数据	         		
				} else {
					if (data.message) {
						// 未成功返回数据Toast提示
						console.log(data.message);
					} else {
						console.log('发生内部错误');
					}
				}
			}).catch(function (err) {
				//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
			});
		},
		// 分割大数组
		sliceArr: function (array, size) {
			var result = [];
			for (var x = 0; x < Math.ceil(array.length / size); x++) {
				var start = x * size;
				var end = start + size;
				result.push(array.slice(start, end));
			}
			return result;
		},
		// 上拉加载方法
		//	      loadBottom:function(){
		//	        if(this.results.length ===1){// 若数据已全部获取完毕
		//	          Toast({message:'没有更多了',duration: 1000});
		//	        }else{
		//	          if(this.pageIndex == this.results.length-1){
		//	          	this.allLoaded = true;
		//	          	Toast({message:'没有更多了',duration: 1000});
		//	          }else{
		//	          	//this.items.push.apply(this.items,this.results[++this.pageIndex]);
		//		         this.items = (this.items).concat(this.results[++this.pageIndex]);
		//	          }	          
		//	        }
		//	        this.$refs.loadmore.onBottomLoaded();
		//	      },
		goOrder: function () {
			sessionStorage.setItem('back_ticketURI', '0');
			sessionStorage.setItem('toMap', '0');
			window.location.href = "#/gx/order/toOrder";
		},
		locationSession: function () {
			// 定位信息 
			var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
			if (qqlocation && qqlocation.yesOrNo == 1) {
				var t = qqlocation.time;
				var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
				if (outtime) {
					//若超时，删除session信息
					sessionStorage.removeItem('ifGetLocation');
					this.location();
				} else {
					//若不超时，读取session信息
					this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
				}
			}
		},
		// 重新定位
		location: function () {
			var _this = this;
			var ifGetLocation = {};
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
					console.log("------------成功--------------");
					_this.localMsg = data;
					_this.orderInfo.localFlag = true;
					ifGetLocation = { "yesOrNo": 1, "data": data, "time": new Date().getTime() };
					sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
				}, function () {
					console.log("-----定位失败-----");
					sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 }));
				});
			});
		},
		topage: function () {
			//腾讯地图接口
			var start = { "lat": this.localMsg.lat, "lon": this.localMsg.lon, "addr": "" };
			//		    	alert(JSON.stringify(start));
			var end = this.hosInfo.hospitalLongitudeLatitude.split(",");
			var x = end[0],
			    y = end[1];
			var dest = { "eword": this.hosInfo.hospitalName, "epointx": x, "epointy": y };
			var addr = this.hosInfo.hospitalAddr;
			sessionStorage.setItem('back_ticketURI', '0');
			var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
			var u = navigator.userAgent;
			if (u.indexOf('iPhone') > -1) {
				//苹果手机
				sessionStorage.setItem('toMap', '1');
				window.location.href = url;
			} else {
				sessionStorage.setItem('mapRouter', JSON.stringify({ 'toMap': '1', 'toMapURI': url, 'backURI': window.location.href }));
			}
		}
	}
});

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_config_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_mint_ui__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_2__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			teethMsg: {},
			orderId: '',
			teethId: '',
			keyId: '',
			urlImg: '', //图片地址z
			//				remark:'',
			big: ''
		};
	},
	beforeCreate() {
		document.title = '口腔全景图';
	},
	beforeRouteLeave: (to, from, next) => {
		if (sessionStorage.getItem('back_ticketURI')) {
			//返回卡券标记
			var pic = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').css("display");
			if (pic != 'none') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').show();
				next(false);
				sessionStorage.setItem('back_ticketURI', '0');
			} else {
				next();
			}
		} else {
			next();
		}
	},
	mounted() {
		this.teethLoading();
		this.optImg();
	},
	methods: {
		teethLoading: function () {
			var that = this;
			var orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
			that.orderId = orderInfo.orderId;
			var remark = orderInfo.remark;
			var uploadFlag = orderInfo.uploadFlag;
			var param = {
				"orderId": that.orderId //截取URL中的orderId
			};
			var parResult = api.fileList(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					that.teethMsg = data.tpflrvList;
					if (uploadFlag == 0) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
					} else if (uploadFlag == 1) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "none");
						for (var j = 0; j < that.teethMsg.length; j++) {
							var abc = that.teethMsg[j];
							that.teethId = abc.fileId;
							that.urlImg = __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/taiYiYun/' + that.teethId;
							var arrImg = api.imgArr(that.urlImg);
							arrImg.then(function (res) {
								var teethimg = "";
								var datas = res.data;
								for (var k = 0; k < datas.length; k++) {
									teethimg += "<img class='otherimg' src='" + that.urlImg + '/' + datas[k] + "' />";
								}
								setTimeout(function () {
									__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".teethim_img").append(teethimg);
								}, 30);
							});
						}
					} else if (uploadFlag == 2) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".give_up").show();
					}
				} else {
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_mint_ui__["Toast"])(data.message);
				}
			});
		},
		optImg: function () {
			var t = this;
			//大图浏览当前图片
			var currOptImg;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').on('click', '.teethim_context .otherimg', function () {
				//
				//					t.big = true;
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
				currOptImg = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix img').attr('src', __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src'));
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').show();
			});
			//结束大图浏览
			//				$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
			////					t.big = false;
			//					$('.pic_fix').hide();
			//					$('.others').show();
			//				});
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.chahead').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').show();
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
		}
		/*hide_this:function(event){
  	event.cancelBubble = true; 
  	alert('11')
  	var t=this;//event.currentTarget
  	//alert(event.path[0]);
  	alert(event.currentTarget);
  	console.log(event.currentTarget);
  	
  	var isImg=$(event.currentTarget).hasClass('otherimg');
  	alert(isImg);
  	alert($(event.currentTarget).parent('.pic_fix').length);
  	if(isImg){
  		
  	}else{
  //	    			history.go('-1');
  t.big = false;
  $('.pic_fix').hide();
  $('.others').show();
  	}
  }*/

	}
});

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






const api = new __WEBPACK_IMPORTED_MODULE_4__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			unorderMsg: {},
			orderId: "",
			unedate: '',
			source: '',
			objKey: ''
		};
	},
	beforeCreate() {
		document.title = '齿科预约';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		//      alert('back'+sessionStorage.getItem('back_ticketURI'));
		if (sessionStorage.getItem('back_ticketURI')) {
			//返回卡券标记
			let back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
			if (back_ticketURI == '1') {
				//返回卡券
				next(false);
				sessionStorage.setItem('back_ticketURI', '0');
				//	              window.location.href=config_param.ticketURI;
				WeixinJSBridge.call('closeWindow');
			} else {
				next();
			}
		} else {
			next();
		}
	},

	mounted() {
		this.onLoading(); //接口交互
	},
	methods: {
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			var param = {
				"orderId": that.orderId //截取URL
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				that.unorderMsg = data.data;
				that.unedate = that.unorderMsg.encounterDate.replace(/\-/g, ".");
				that.source = that.unorderMsg.serviceType; //预约时的服务
				var sourObj = {
					'1': '泰康人寿专享洗牙套餐券',
					'2': '泰康人寿专属涂氟',
					'3': '泰康人寿专享洗牙套餐、涂氟',
					'4': '泰康人寿专属窝沟封闭',
					'5': '泰康人寿专享洗牙套餐、窝沟封闭',
					'6': '泰康人寿专属窝沟封闭或涂氟',
					'7': '泰康人寿专享洗牙套餐、窝沟封闭或涂氟'
				};
				that.source ? that.source : that.source = '1';
				var soukey = that.source;
				__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(sourObj, function (soukey, val) {
					that.objKey = sourObj['1'];
				});
			});
		}
	}
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'loadmore',
    props: {
        maxDistance: {
            type: Number,
            default: 0
        },
        autoFill: {
            type: Boolean,
            default: true
        },
        distanceIndex: {
            type: Number,
            default: 2
        },
        bottomPullText: {
            type: String,
            default: '上拉刷新'
        },
        bottomDropText: {
            type: String,
            default: '释放更新'
        },
        bottomLoadingText: {
            type: String,
            default: '加载中...'
        },
        bottomDistance: {
            type: Number,
            default: 70
        },
        bottomMethod: {
            type: Function
        },
        bottomAllLoaded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 最下面出现的div的位移
            translate: 0,
            // 选择滚动事件的监听对象
            scrollEventTarget: null,
            containerFilled: false,
            bottomText: '',
            // class类名
            bottomDropped: false,
            // 获取监听滚动元素的scrollTop
            bottomReached: false,
            // 滑动的方向   down---向下互动；up---向上滑动
            direction: '',
            startY: 0,
            startScrollTop: 0,
            // 实时的clientY位置
            currentY: 0,
            topStatus: '',
            //  上拉加载的状态    ''     pull: 上拉中
            bottomStatus: ''
        };
    },
    watch: {
        // 改变当前加载在状态
        bottomStatus(val) {
            this.$emit('bottom-status-change', val);
            switch (val) {
                case 'pull':
                    this.bottomText = this.bottomPullText;
                    break;
                case 'drop':
                    this.bottomText = this.bottomDropText;
                    break;
                case 'loading':
                    this.bottomText = this.bottomLoadingText;
                    break;
            }
        }
    },
    methods: {
        onBottomLoaded() {
            this.bottomStatus = 'pull';
            this.bottomDropped = false;
            this.$nextTick(() => {
                if (this.scrollEventTarget === window) {
                    document.body.scrollTop += 50;
                } else {
                    this.scrollEventTarget.scrollTop += 50;
                }
                this.translate = 0;
            });
            // 注释
            if (!this.bottomAllLoaded && !this.containerFilled) {
                this.fillContainer();
            }
        },

        getScrollEventTarget(element) {
            let currentNode = element;
            while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        },
        //  获取scrollTop
        getScrollTop(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
                return element.scrollTop;
            }
        },
        bindTouchEvents() {
            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
        },
        init() {
            this.bottomStatus = 'pull';
            // 选择滚动事件的监听对象
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.bottomMethod === 'function') {
                // autoFill 属性的实现   注释
                this.fillContainer();
                // 绑定滑动事件
                this.bindTouchEvents();
            }
        },
        //  autoFill 属性的实现   注释
        fillContainer() {
            if (this.autoFill) {
                this.$nextTick(() => {
                    if (this.scrollEventTarget === window) {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
                    } else {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >= this.scrollEventTarget.getBoundingClientRect().bottom;
                    }
                    if (!this.containerFilled) {
                        this.bottomStatus = 'loading';
                        this.bottomMethod();
                    }
                });
            }
        },
        //  获取监听滚动元素的scrollTop
        checkBottomReached() {
            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
            } else {
                // getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 right是指元素右边界距窗口最左边的距离，bottom是指元素下边界距窗口最上面的距离。
                return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
            }
        },
        // ontouchstart 事件
        handleTouchStart(event) {
            // 获取起点的y坐标
            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;
            if (this.bottomStatus !== 'loading') {
                this.bottomStatus = 'pull';
                this.bottomDropped = false;
            }
        },
        // ontouchmove事件
        handleTouchMove(event) {
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                // 没有在需要滚动的范围内滚动，不再监听scroll
                return;
            }
            // 实时的clientY位置
            this.currentY = event.touches[0].clientY;
            //  distance 移动位置和开始位置的差值        distanceIndex---
            let distance = (this.currentY - this.startY) / this.distanceIndex;
            // 根据 distance 判断滑动的方向  并赋予变量   direction  down---向下互动；up---向上滑动
            this.direction = distance > 0 ? 'down' : 'up';
            if (this.direction === 'up') {
                // 获取监听滚动元素的scrollTop
                this.bottomReached = this.bottomReached || this.checkBottomReached();
            }
            if (typeof this.bottomMethod === 'function' && this.direction === 'up' && this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
                // 有加载函数，是向上拉，有滚动距离，不是正在加载ajax，没有加载到最后一页
                event.preventDefault();
                event.stopPropagation();
                if (this.maxDistance > 0) {
                    this.translate = Math.abs(distance) <= this.maxDistance ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                } else {
                    this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                }
                if (this.translate > 0) {
                    this.translate = 0;
                }
                this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
            }
        },
        // ontouchend事件
        handleTouchEnd() {
            if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                this.bottomDropped = true;
                this.bottomReached = false;
                if (this.bottomStatus === 'drop') {
                    this.translate = '-50';
                    this.bottomStatus = 'loading';
                    this.bottomMethod();
                } else {
                    this.translate = '0';
                    this.bottomStatus = 'pull';
                }
            }
            this.direction = '';
        }
    },
    mounted() {
        this.init();
    }
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Place',
  data() {
    return {
      curid: '', // 当前索引的id
      checkCityName: '', // 所选城市
      checkDistrict: '', // 所在区
      localcity: '', // 定位城市
      districtArr: [], // 地区数组
      localcity: '', // 定位城市
      cityObj: {}, // 城市数据对象
      orderInfo: { districtCode: '' }, // 卡信息对象
      City: {}, //  城市信息对象
      willClick: false, // 手动选择标记
      backFlag: false, // 页面是否返回标志
      localFlag: false, // 定位成功的标记
      curCityId: '', //当前城市id
      hua_val: '', //索引字母
      allCode: false, // 选中全城
      s_cityId: '' //session中的城市id
    };
  },
  beforeCreate() {
    document.title = '选择地点';sessionStorage.setItem('back_ticketURI', '1');
  },
  //  beforeRouteLeave:(to, from, next) => {
  //    if(sessionStorage.getItem('back_ticketURI')){//返回卡券标记
  //        var back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
  //        if(back_ticketURI=='1'){//返回卡券
  //            next(false);
  //            sessionStorage.setItem('back_ticketURI','0');
  //            window.location.replce('#/order/toOrder');
  //        }else{
  //            next();
  //        }
  //    }else{
  //        next()
  //    }
  //  },
  mounted() {
    //    hideaddress();
    this.backFlag = JSON.parse(sessionStorage.getItem('backFlag')) || false; // 页面是否是返回页面
    this.fillCityPage();
  },
  methods: {
    fillCityPage: function () {
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式
      var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
      var localYoN = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      //      alert(JSON.stringify(localYoN))
      if (orderInfo) {
        this.orderInfo = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, orderInfo, linkUrl);
      } else {
        sessionStorage.setItem('isCheckStore', true);
        orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
        orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
        this.orderInfo = orderInfo;
      }
      this.localFlag = orderInfo.localFlag ? orderInfo.localFlag : false;
      this.willClick = orderInfo.willClick || false;
      var param = { "code": "", "source": this.orderInfo.source ? this.orderInfo.source : '' // 初始化城市页面
      };this.fillCity(param); // 页面填充城市数据  
      if (this.willClick == false) {
        // 非手动操作  调动定位方法
        if (localYoN) {
          if (localYoN.YoN == 2) {} else {
            this.fillLocation();
          }
        } else {
          this.location();
        }
      }
      if (this.orderInfo.isToDetail || this.orderInfo.isSureCheck) {
        this.orderInfo.isToDetail = false;
        this.orderInfo.isSureCheck = false;
        this.orderInfo.currentPage = 1;
      }
    },
    // 返回后页面填充
    backFill: function () {
      if (this.backFlag == true) {
        // 是否为返回页面的标记
        this.checkCityName = this.orderInfo.cityName ? this.orderInfo.cityName : " "; // 返回后展示城市
        this.checkDistrict = this.orderInfo.district ? this.orderInfo.district : " "; // 返回展示地区
        this.willClick = true; // 将要手动修改  取消定位
        var cityN = this.orderInfo.cityName; // session中取的城市名
        var cityI = this.orderInfo.cityId; // session取出的城市Id
        this.s_cityId = cityI;
        var disId = this.orderInfo.districtCode; // session取出的地区编码
        this.allCode = this.orderInfo.allCode;
        sessionStorage.setItem('backFlag', false);
        // 返回页面填充地区
        if (this.orderInfo.cityId) {
          this.fillDisc(cityI, disId); // 返回页面填充地区
        }
      }
    },
    // 定位缓存
    fillLocation: function () {
      // 定位信息 
      var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      if (qqlocation && qqlocation.yesOrNo == 1) {
        var t = qqlocation.time;
        var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
        if (outtime) {
          // 定位超时
          sessionStorage.removeItem('ifGetLocation'); // 移除session
          this.location(); // 重新定位
        } else {
          // 定位在缓存时间内
          this.backFill(); // 填充页面信息
          this.orderInfo.localFlag = true; // 是否为定位标记
        }
      }
    },
    // 定位方法
    location: function () {
      __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].open({ text: '正在定位', spinnerType: 'fading-circle' });
      var _this = this;
      var ifGetLocation = {};
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
          __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].close();
          if (_this.willClick) return;
          _this.localcity = data.city; // 定位城市
          //            _this.checkCityName = _this.localcity; // 页面砖石定位城市
          _this.orderInfo.cityName = data.city; // 存入session的城市名
          _this.orderInfo.latiude = data.lat; // 存入session的纬度
          _this.orderInfo.longitude = data.lon; // 存入session的经度
          // 查找定位城市对应的城市编码
          if (_this.localcity != "" && _this.willClick == false) {
            _this.findCity();
          }
          ifGetLocation = { "yesOrNo": 1, "data": data, "time": new Date().getTime() };
          sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation)); // 成功存定位session
        }, function () {
          __WEBPACK_IMPORTED_MODULE_4_mint_ui__["Indicator"].close();
          sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 })); // 失败存定位session
        });
      });
    },
    // 获取城市数据
    fillCity: function (param) {
      let _this = this;
      let response = api.ckcity(param); // 获取城市列表
      response.then(function (res) {
        if (res.data.state == '1') {
          _this.cityObj = res.data.data; // 页面展示城市对象赋值
          _this.backFill(); // 返回后页面填充
          // 页面返回后 添加已选城市样式及当前id设置
          if (_this.backFlag == true || _this.localFlag == true) {
            setTimeout(function () {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.cityId).addClass('cityChecked');
            }, 100); // 添加城市选中样式
            _this.curid = _this.orderInfo.curid; // 页面返回后为当前索引赋id值
          }
        } else {
          if (res.data.Message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.Message, duration: 1000, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.href = "#/common/errorPage"
      });
    },
    // 选择城市
    checkCity: function (item, cityId, indexId) {
      this.orderInfo.districtCode = '';
      this.checkDistrict = '';
      this.allCode = false;
      let _this = this;
      _this.willClick = true; // 手动点击城市 取消定位
      _this.orderInfo.willClick = true; // 手动点击城市 取消定位
      if (item.field == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("field--1为乐牙");
      }
      if (item.field == "") {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('" "--为微保');
      }
      _this.checkCityName = item.name; // 页面展示城市 cityName
      _this.orderInfo.cityName = item.name; // session存储城市名 cityName
      _this.orderInfo.cityId = cityId; // session存储城市id
      _this.orderInfo.curid = indexId; // 为当前索引赋值
      _this.curid = indexId;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.localarea').show(); // 显示地区列表
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.toup').removeClass("todown"); // 移除向下的箭头
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.citiBlocks').find("li").removeClass('cityChecked');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + cityId).addClass('cityChecked');
      this.fillDisc(cityId, "");
    },
    // 填充地区数据
    fillDisc: function (cityId, discId) {
      this.curCityId = cityId;
      let _this = this;
      var param = { "code": cityId, "source": _this.orderInfo.source ? _this.orderInfo.source : '' };
      let response = api.ckcity(param); // 获取区域列表
      response.then(function (res) {
        if (res.data.state == '1') {
          _this.districtArr = res.data.data;
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.district').removeClass('check');
          if (discId != "") {
            setTimeout(function () {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + discId).addClass('check');
            }, 100);
          } else {
            setTimeout(function () {
              if (_this.allCode == true && _this.s_cityId == cityId) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".all").addClass('check');
              }
            }, 100);
          }
        } else {
          if (res.data.Message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.Message, duration: 1000, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.href = "#/common/errorPage"
      });
      // 跳转到页面顶部
      setTimeout(function () {
        _this.topIndex('top' + cityId);
      }, 300);
      return false;
    },
    // 选择地区
    checkDisc: function (disc, id) {
      // 选择地区
      this.checkDistrict = disc.name; //页面展示地区名
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".district").removeClass('check'); // 移除多余的选中样式
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('check'); // 所选区域添加显示样式
      this.orderInfo.district = this.checkDistrict; // 存入session的地区名
      this.orderInfo.districtCode = id; // 存入session的地区id
      // 是否为定位标记
      if (this.localFlag == false) {
        this.orderInfo.localFlag = false;
      }
      this.orderInfo.willClick = true; // 是否手动点击
      var orderInfo = this.orderInfo; // 将orderInfo对象存入session
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo)); // 将orderInfo对象存入session
      // 跳转到医院列表页面
      setTimeout(function () {
        //sessionStorage.setItem('back_ticketURI','0');
        window.location.href = "#/order/checkStation";
      }, 100);
    },
    // 索引当前跳转设置
    curIndex: function () {
      if (this.curid != "") {
        return document.getElementById(this.curid).scrollIntoView(true);
      }
    },
    // 字母索引
    letterIndex: function (curid, e) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': 1 });
      this.hua_val = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).text();
      this.touchEnd();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.fontColor').removeClass('zimu');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).addClass('zimu');
      return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
    },
    topIndex: function (curid) {
      return document.getElementById(curid).scrollIntoView(true); // 字母索引跳转
    },
    // 收起县区
    shouqi: function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".localarea").animate({ height: 'toggle' }, 300); // 地区块toggle
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".toup").toggleClass("todown"); // 箭头方向toggle
      //      setTimeout(()=>{$(".cityListArea").toggleClass("city_top");},200)

    },
    // 地区为空跳转页面
    toList: function () {
      if (this.checkCityName != "") {
        this.orderInfo.districtCode = ""; // 地区编码
        this.orderInfo.district = "全城"; // 地区名
        // 是否为定位标记
        if (this.localFlag == false) {
          this.orderInfo.localFlag = false;
        }
        this.orderInfo.willClick = true; // 是否手动点击
        this.orderInfo.allCode = true;
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        var place = JSON.parse(sessionStorage.getItem('orderInfo'));
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('-----------------quancheng-------------');
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(place);
        if (place.cityId) {
          setTimeout(function () {
            //sessionStorage.setItem('back_ticketURI','0');
            window.location.href = "#/order/checkStation";
          }, 100);
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '请选择您要预约的城市' });
        }
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "请先选择城市", duration: 1500, className: 'mToast' });
      }
    },
    // 查找城市数据
    findCity: function () {
      var _this = this;
      var val = _this.localcity; //定位城市名
      var cityArr = _this.cityObj; // 城市数据对象
      var i, j, city;
      for (i in cityArr) {
        var c_a = cityArr[i]; // 每个字母索引对应的对象
        for (j in c_a) {
          if (c_a[j].name == val) {
            _this.orderInfo.curid = i; //定位城市字母的id
            _this.orderInfo.cityId = j; // 定位城市的城市id
            _this.orderInfo.cityName = val; // 定位城市名
            _this.checkCityName = val; // 页面砖石定位城市
            _this.orderInfo.districtCode = ""; // 定位地区编码为空
            _this.orderInfo.localFlag = true; // 是否定位标记
            _this.orderInfo.willClick = false; // 是否手动点击
          }
        }
      }
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo)); // 定位信息存入session
      var place = JSON.parse(sessionStorage.getItem('orderInfo'));
      // 跳转医院列表页面
      if (_this.localFlag == false && place.cityId) {
        //sessionStorage.setItem('back_ticketURI','0');
        window.location.href = "#/order/checkStation";
      }
    },
    //    滑动结束
    touchEnd() {
      var opcityNum = 1;
      setInterval(function () {
        opcityNum -= 0.1;
        if (opcityNum > 0) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': opcityNum });
        } else {
          clearInterval();
        }
      }, 50);
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'none' });
      }, 200);
    },
    //    滑动开始
    move(event) {
      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ display: 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.blink').css({ 'opacity': 1 });
      var x = event.changedTouches[0].clientX;
      var y = event.changedTouches[0].clientY;
      var xx = document.elementFromPoint(x, y);
      var word = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(xx).text();
      if (/^[A-Z]$/.test(word)) {
        this.hua_val = word;
      }
      this.topIndex(this.hua_val);
    }
  }

});

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'agreeServe',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  beforeCreate() {
    document.title = '服务知情同意书';
  },
  mounted() {//this.anios();
  },
  methods: {
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        // ios系统样式设置
        var el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.textBox');
        el.WebKitOverflowScrolling = 'auto';
        el.scrollTop = 500;
        el.WebKitOverflowScrolling = 'touch';
      }
    }
  }
});

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




//import LoadMore from './../loadmore/loadmore.vue';



const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'checkStation',
  props: {},
  data() {
    return {
      showCity: '', // 展示城市
      cityName: '', // 所选城市
      searchWord: '', // 搜索关键字
      searchFlag: '', // 是否为搜索状态
      orderInfo: {}, // 预约对象
      searchInfo: {}, // 搜索显示信息
      hospitalInfo: [], // 医院信息
      histryWord: [], // 历史记录关键词
      currentPage: 1, // 当前页码
      topStatus: '', // loadmore状态
      allLoaded: false, // loadmore是否加载
      localMsg: {}, // 定位信息
      isCall: false, // 拨打电话
      callAct: '', //去拨打电话
      isFoucus: false,
      isToDetail: false, // 去商品详情页面
      isSureCheck: false, // 去预约页面
      scrollMode: 'auto', //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      //  上拉加载数据
      scrollHeight: 0,
      scrollTop: 0,
      containerHeight: 0,
      loading: false,
      allLoaded: false,
      bottomText: '上拉加载更多...',
      bottomStatus: '',
      pageNo: 1,
      totalCount: ''
    };
  },
  beforeCreate() {
    document.title = '选择门诊';__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': 'auto' });
  },
  created() {
    sessionStorage.setItem('backFlag', true);
    this.fillHospitalPage(); // 初始化医院列表页面
    this.fillLocation();
  },
  destroyed() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': '100%' });
  },
  mounted() {
    this.anios();
  },
  watch: {
    isCall: function (newVal, oldVal) {
      if (newVal === true) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#app,body').css({ 'height': '100%' });
      }
    }
  },
  methods: {
    /* 下拉加载 */
    _scroll: function (ev) {
      ev = ev || event;
      this.scrollHeight = this.$refs.innerScroll.scrollHeight;
      this.scrollTop = this.$refs.innerScroll.scrollTop;
      this.containerHeight = this.$refs.innerScroll.offsetHeight;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    telphone() {
      var _this = this;
      var param = {
        //                  "channelType":sessionStorage.getItem('channelType')||'',
        "cityCode": _this.orderInfo.cityId,
        "cityName": _this.cityName,
        "policyNo": _this.orderInfo.policyNo,
        "wesurePolicyNo": _this.orderInfo.wesurePolicyNo,
        "phone": '4000895522'
      };
      api.phoneConsultInfo(param); // 电话咨询信息储存接口
      var call_num = '4000895522';
      _this.isCall = true;
      _this.callAct = 'tel:' + call_num;
      window.open(_this.callAct);
    },
    // 关闭电话弹层
    closeCall: function () {
      this.isCall = false;
      window.location.replace("#/order/Place");
    },
    anios: function () {
      //判断移动设备，更改样式
      //      $(window).scroll(function(){$('.searchFix').css({'position':'fixed'});})
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.checkStation').css({ 'position': 'absolute', 'bottom': '0', 'left': '0' });
      }
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".near").css({ 'line-height': '0.83rem' });
      }
    },
    // 填充页面
    fillHospitalPage: function () {
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式
      var orderInfo = sessionStorage.getItem('orderInfo');
      orderInfo = JSON.parse(orderInfo);
      this.orderInfo = orderInfo; //  获取ordersession对象
      this.orderInfo = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, orderInfo, linkUrl);
      this.cityName = orderInfo.cityName;
      if (orderInfo.cityName.length > 3) {
        this.showCity = orderInfo.cityName.slice(0, 3);
      } else {
        this.showCity = orderInfo.cityName;
      }
      this.isToDetail = orderInfo.isToDetail ? orderInfo.isToDetail : false;
      this.isSureCheck = orderInfo.isSureCheck ? orderInfo.isSureCheck : false;
      this.searchFlag = orderInfo.searchFlag ? orderInfo.searchFlag : false;
      if (this.orderInfo.isToDetail || this.orderInfo.isSureCheck) {
        this.currentPage = orderInfo.currentPage ? orderInfo.currentPage : 1;
      }
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": "1",
          "districtCode": this.orderInfo.districtCode || "",
          "hospitalName": "",
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.orderInfo.localFlag == true) {
        this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
        param.retrieveArgs.rowsPerPage = "300";
        //        param.retrieveArgs.rowsPerPage = "10"
      }
      if (this.orderInfo.localFlag == false) {
        if (this.orderInfo.currentPage) {
          param.retrieveArgs.currentPage = this.orderInfo.currentPage;
          if (this.searchFlag == true) {
            param.retrieveArgs.hospitalName = this.orderInfo.searchWord;
          }

          this.orderInfo.currentPage = '';
          this.orderInfo.searchWord = '';
          sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        }
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
        //      if(this.orderInfo.districtCode==""){
        //        param.retrieveArgs.rowsPerPage = "300"
        //      }
      }
      this.HospitalList(param, false);
    },
    // 回到Place页面
    backPlace: function () {
      window.location.href = "#/order/Place";
    },
    // 获取医院列表
    HospitalList: function (param, search) {
      this.searchFlag = search;
      this.allLoaded = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".whiteList").hide();
      let _this = this;
      let response = api.getOrgListBySolr(param); // 获取医院列表
      response.then(function (res) {
        //        res.data.status=1
        if (res.data.status == '1') {
          var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
          //          var list = [{"hospitalAddr":"北京市东城区珠市口东大街6号珍贝大厦二层","districtCode":"110101","spellNo":"AKCKBJBHZSKZBFY","provCode":"110000","lastModify":null,"distance":1,"cityCode":"110000","hospitalRule":"8:00-17:00（周二至周日）","hospitalLongitudeLatitude":"116.4109800000,39.8925600000","hospitalName":"爱康齿科北京博惠珠市口珍贝分院","avgQuality":null,"contactTel":"010-67016280转609","parentId":"6249","hospitalDes":"爱康齿科，中国齿科领域的专业连锁服务品牌，隶属于中国最大的健康管理集团之一——爱康国宾集团，为消费者提供口腔保健、综合齿科、小儿齿科、美容牙科、牙齿正畸以及种植牙科等口腔诊疗服务。爱康齿科拥有国际先进的医疗设备和一流的专家团队，为消费者提供具有专业品质的全方位中高端口腔医疗服务，并给消费者带来与众不同的客户体验。 截止2014年10月，爱康齿科在北京、上海、深圳、天津、重庆、南京、杭州、成都、苏州、福州、长春等十几个中心城市已拥有超过20家齿科服务中心，每年为超过100万人次提供口腔检查以及专业的口腔治疗服务。","hospitalId":"6254","createTime":null,"doctorId":"230253","orgSource":"0","orgCode":null,"hospitalImgId":null}]
          var len = list.length;
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(list);
          //                    var list = [{"hospitalAddr":"北京市东城区珠市口东大街6号珍贝大厦二层","districtCode":"110101","spellNo":"AKCKBJBHZSKZBFY","provCode":"110000","lastModify":null,"distance":1,"cityCode":"110000","hospitalRule":"8:00-17:00（周二至周日）","hospitalLongitudeLatitude":"116.4109800000,39.8925600000","hospitalName":"爱康齿科北京博惠珠市口珍贝分院","avgQuality":null,"contactTel":"010-67016280转609","parentId":"6249","hospitalDes":"爱康齿科，中国齿科领域的专业连锁服务品牌，隶属于中国最大的健康管理集团之一——爱康国宾集团，为消费者提供口腔保健、综合齿科、小儿齿科、美容牙科、牙齿正畸以及种植牙科等口腔诊疗服务。爱康齿科拥有国际先进的医疗设备和一流的专家团队，为消费者提供具有专业品质的全方位中高端口腔医疗服务，并给消费者带来与众不同的客户体验。 截止2014年10月，爱康齿科在北京、上海、深圳、天津、重庆、南京、杭州、成都、苏州、福州、长春等十几个中心城市已拥有超过20家齿科服务中心，每年为超过100万人次提供口腔检查以及专业的口腔治疗服务。","hospitalId":"6254","createTime":null,"doctorId":"230253","orgSource":"0","orgCode":null,"hospitalImgId":null}]
          if (search == true) {
            _this.hospitalInfo = [];
            _this.orderInfo.searchFlag = true;
          } else {
            _this.orderInfo.searchFlag = false;
          }
          _this.hospitalInfo = list;
          //          if(_this.hospitalInfo == []) {// 医院列表初始赋值
          //            _this.hospitalInfo = list;
          //          } else {// 医院列表加载更多赋值
          //            _this.hospitalInfo = (_this.hospitalInfo).concat(list); // 页面追加展示数据
          //          }
          //          _this.$nextTick(function () {  
          // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
          // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
          // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
          //            _this.loading = false; 
          //          });
          if (_this.isToDetail || _this.isSureCheck) {
            if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.isToDetail, _this.isSureCheck, _this.orderInfo.hospitalId);
            if (_this.orderInfo.hospitalId) {
              setTimeout(function () {
                if (_this.isSureCheck) {
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.hospitalId).find('.radiobtn').addClass('checkRadio');
                }
                if (_this.currentPage == 1 && len > 10) {
                  var h_id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + _this.orderInfo.hospitalId)[0];
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html, body").animate({ scrollTop: h_id.offsetTop - 40 }, { duration: 500, easing: "swing" });
                }
                return document.getElementById('showSearchBox').scrollIntoView(true);
              }, 100);
            }
          }
        } else {
          if (res.data.message) {
            if (search == true) {
              _this.hospitalInfo = {};
              if (res.data.status == -1) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".whiteList").show();
                var param = {
                  //                  "channelType":sessionStorage.getItem('channelType')||'',
                  "cityCode": _this.orderInfo.cityId,
                  "cityName": _this.cityName,
                  "policyNo": _this.orderInfo.policyNo,
                  "wesurePolicyNo": _this.orderInfo.wesurePolicyNo
                };
                api.locationInfo(param); // 定位信息储存接口
              }
            } else {
              if (res.data.status == -1) {
                if (_this.currentPage == 1) {
                  var call_num = '4000895522';
                  _this.isCall = true;
                  _this.callAct = 'tel:' + call_num;
                  var param = {
                    //                  "channelType":sessionStorage.getItem('channelType')||'',
                    "cityCode": _this.orderInfo.cityId,
                    "cityName": _this.cityName,
                    "policyNo": _this.orderInfo.policyNo,
                    "wesurePolicyNo": _this.orderInfo.wesurePolicyNo,
                    "phone": '4000895522'
                  };
                  api.phoneConsultInfo(param); // 电话咨询信息储存接口          
                } else {
                    //                  _this.loading = false;
                    //                  _this.allLoaded = true;
                    //                  Toast({message: '没有更多了',duration: 1500,className: 'mToast'})
                  }
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1500, className: 'mToast' });
              }
            }
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1500, className: 'mToast' });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/common/errorPage");
      });
    },
    // 下拉刷新样式设置
    handleTopChange(status) {
      this.topStatus = status;
    },
    // 下拉刷新方法
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded();
    },
    // 上拉加载方法
    loadBottom: function () {
      this.loading = true;
      this.isPullup = true;
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": ++this.currentPage,
          "districtCode": this.orderInfo.districtCode,
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "10",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.searchFlag == true) {
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
      }
      if (this.searchFlag == false) {
        if (this.orderInfo.localFlag == true) {
          param.retrieveArgs.rowsPerPage = "300";
        }
        if (this.orderInfo.localFlag == false) {
          param.retrieveArgs.rowsPerPage = "10";
          //          param.retrieveArgs.rowsPerPage = "300"
        }
      }

      let _this = this;
      setTimeout(() => {
        //        _this.HospitalList(param, false);
        let response = api.getOrgListBySolr(param); // 获取医院列表
        response.then(function (res) {
          if (res.data.status == '1') {
            var list = res.data.hospitalsBySolrResponseVoList; // 请求成功的数据列表
            if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(list);
            var len = list.length;
            if (len < 10 && _this.currentPage == 1) {
              _this.allLoaded = true;
            }
            _this.hospitalInfo = _this.hospitalInfo.concat(list); // 页面追加展示数据
            _this.$nextTick(function () {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
              _this.loading = false;
            });
          } else {
            if (res.data.message) {
              if (res.data.status == -1) {
                if (_this.currentPage != 1) {
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '没有更多了', duration: 1500, className: 'mToast' });
                  _this.allLoaded = true;
                  _this.loading = false;
                }
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1500, className: 'mToast' });
              }
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1500, className: 'mToast' });
            }
          }
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //        window.location.replace("#/common/errorPage");
        });
        _this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },
    // 定位缓存
    fillLocation: function () {
      // 定位信息 
      var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      if (qqlocation && qqlocation.yesOrNo == 1) {
        var t = qqlocation.time;
        var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
        if (outtime) {
          sessionStorage.removeItem('ifGetLocation');
          this.location();
        } else {
          this.orderInfo.localFlag = true;
          this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
        }
      }
    },
    // 定位信息
    location: function () {
      var _this = this;
      var ifGetLocation = {};
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("------------成功--------------");
          //            alert(JSON.stringify(data));//{lon: 116.407526, lat: 39 90403, city: "北京"}
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(data.city);
          //            alert("lon"+data.lon+"   lat"+data.lat);
          _this.localMsg = data;
          _this.orderInfo.localFlag = true;
          ifGetLocation = {
            "yesOrNo": 1,
            "data": data,
            "time": new Date().getTime()
          };
          sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
        }, function () {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("-----定位失败-----");
          sessionStorage.setItem('ifGetLocation', JSON.stringify({
            "YoN": 2
          }));
        });
      });
    },
    // 确定选择
    shureCheck: function (cur, item) {
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(item);

      var id = cur;
      var lon = item.hospitalLongitudeLatitude.split(",")[0];
      var lat = item.hospitalLongitudeLatitude.split(",")[1];
      this.orderInfo.doctorId = item.doctorId;
      this.orderInfo.hospitalId = item.hospitalId;
      this.orderInfo.hospitalName = item.hospitalName;
      this.orderInfo.contactTel = item.contactTel;
      this.orderInfo.orgAddress = item.hospitalAddr;
      this.orderInfo.lon = lon;
      this.orderInfo.lat = lat;
      this.orderInfo.orgSource = item.orgSource; // 机构来源
      this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
      this.orderInfo.orderTime = {};
      this.orderInfo.isSureCheck = true;
      this.orderInfo.isToDetail = false;
      this.orderInfo.currentPage = this.currentPage;
      this.orderInfo.searchWord = this.searchWord;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".radiobtn").removeClass('checkRadio');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('checkRadio');
      var str = JSON.parse(sessionStorage.getItem('orderInfo'));
      //    if(config_param.isLog)console.log(str);
      if (item.orgSource == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("orgSource--1为乐牙");
        var param = {
          "flag": "2", //跳转标志，1:门诊详情 2 :预约 ,
          "insId": item.orgCode, //门店id  "0863cee2f86c11e4a09e02004c4f4f50"
          "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
          "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
          "wesurePolicyNo": this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo : this.orderInfo.policyNo // 微宝内部保单号
        };
        let response = api.toStoreDetailOrOrder(param);
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res.data.data);
          window.location.href = res.data.data;
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/common/errorPage");
        });
      } else {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('orgSource--0--为微保');
        if (str.lon) {
          setTimeout(function () {
            window.location.href = "#/order/toOrder";
          }, 100);
        }
      }
    },
    // 去医院详情页
    toshopDetail: function (cur, item) {
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(item);
      var id = cur;
      // 距离 hospitalName hospitalId distance
      this.orderInfo.hospitalId = item.hospitalId;
      this.orderInfo.hospitalName = item.hospitalName;
      this.orderInfo.distance = item.distance;
      this.orderInfo.avgQuality = item.avgQuality;
      this.orderInfo.doctorId = item.doctorId;
      this.orderInfo.contactTel = item.contactTel;
      this.orderInfo.orgAddress = item.hospitalAddr;
      this.orderInfo.orgSource = item.orgSource; // 机构来源
      this.orderInfo.orgCode = item.orgCode; // 第三方平台医院id
      this.orderInfo.orderTime = {};
      this.orderInfo.isToDetail = true;
      this.orderInfo.isSureCheck = false;
      this.orderInfo.currentPage = this.currentPage;
      this.orderInfo.searchWord = this.searchWord;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      //      $(".radiobtn").removeClass('checkRadio');
      //      $("#" + id).addClass('checkRadio');
      var str = JSON.parse(sessionStorage.getItem('orderInfo'));
      if (item.orgSource == 1) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log("orgSource--1为乐牙");
        var param = {
          "flag": "1", //跳转标志，1:门诊详情 2 :预约 ,
          "insId": item.orgCode, //不清楚，需确认
          "policyNo": this.orderInfo.policyNo, //保单号 "600000510132017060110000023253"
          "productCode": "WT_PK061_01", //产品编码，先用这个，是他们给的
          "wesurePolicyNo": this.orderInfo.wesurePolicyNo != null ? this.orderInfo.wesurePolicyNo : this.orderInfo.policyNo // 微宝内部保单号
        };
        let response = api.toStoreDetailOrOrder(param);
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res.data.data);
          window.location.href = res.data.data;
        }).catch(function (err) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/common/errorPage");
        });
      } else {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('orgSource--0--为微保');
        if (str) {
          setTimeout(function () {
            window.location.href = "#/user/shopDetail";
          }, 100);
        }
      }
    },
    // 调取地图
    gotoMap: function (item) {
      var startName = ""; // 起点名字
      if (this.orderInfo.localFlag == true) {
        // 定位后的起始经纬度
        var startX = this.localMsg.lon;
        var startY = this.localMsg.lat;
      } else {
        // 未定位经纬度为空
        var startX = "";
        var startY = "";
      }
      var cityName = this.cityName;
      var addr = item.hospitalAddr;
      var endName = item.hospitalName; // 终点名
      var lon = item.hospitalLongitudeLatitude.split(",")[0]; // 终点经度
      var lat = item.hospitalLongitudeLatitude.split(",")[1]; // 终点纬度
      var dest = {
        "eword": endName,
        "epointx": lon,
        "epointy": lat
      };
      var url = "http://apis.map.qq.com/tools/routeplan/eword=" + endName + "&epointx=" + lon + "&epointy=" + lat + "&sword=" + startName + "&epointx=" + startX + "&epointy=" + startY + "?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B";
      var url = "http://apis.map.qq.com/tools/poimarker?type=1&keyword=" + dest.eword + "&center=" + dest.epointy + "," + dest.epointx + "&region=" + cityName + "&radius=10000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      window.location.href = url; // 跳转路径
      return false; // 阻止手机端冒泡
    },
    // 搜索医院
    searchHospital: function () {
      this.isFoucus = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox").removeClass("foucusbox");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox .searchicon").removeClass("foucusicon");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + this.orderInfo.hospitalId).find('.radiobtn').removeClass('checkRadio');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".inputbox").removeClass("foucusinput");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#searchtext").blur(); // 输入框失去焦点
      this.searchWord = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.trim(this.searchWord); // 去除关键词两边的空格
      var histry = JSON.parse(localStorage.getItem("histry")) || []; // 获取历史记录
      if (this.searchWord != "") {
        histry.unshift(this.searchWord); // 向历史记录中添加新的关键词
      }
      histry = this.histryUnique(histry); // 历史记录去重处理
      if (histry.length > 6) histry.pop(); //多余历史记录清除
      localStorage.setItem("histry", JSON.stringify(histry)); // 历史记录存入localStorage
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": '1',
          "districtCode": this.orderInfo.districtCode || "",
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude || "", // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude || "", // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "300",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      if (this.orderInfo.localFlag == true) {
        param.retrieveArgs.rowsPerPage = "300";
      }
      if (this.orderInfo.localFlag == false) {
        param.retrieveArgs.rowsPerPage = "10";
        //        param.retrieveArgs.rowsPerPage = "300"
      }
      this.HospitalList(param, true); // 搜索医院 
      this.closeModal(); // 关闭弹层
    },
    // 历史记录搜索医院
    histrySearch: function (keyWord) {
      this.searchWord = keyWord;
      var param = {
        "retrieveArgs": {
          "cityCode": this.orderInfo.cityId || '110000',
          "currentPage": "1",
          "districtCode": this.orderInfo.districtCode,
          "hospitalName": this.searchWord,
          "latiude": this.orderInfo.latiude, // 纬度, lat: 39.90403
          "longitude": this.orderInfo.longitude, // 经度 116.407526
          "provCode": "",
          "rowsPerPage": "300",
          "source": this.orderInfo.source ? this.orderInfo.source : ''
        }
      };
      this.HospitalList(param, true);
      this.closeModal();
    },
    // 使用历史记录词汇搜索
    useHisWord: function (words) {
      this.searchWord = words;
      this.searchHospital();
    },
    // 清除历史记录
    clearHistory: function () {
      var histry = JSON.parse(localStorage.getItem("histry"));
      var ary = [1, 2, 3, 4];
      histry.splice(0, histry.length); //清空数组 
      localStorage.setItem("histry", JSON.stringify(histry));
      this.histryWord = histry;
      //      if(config_param.isLog)console.log(histry); // 输出 []，空数组，即被清空了
    },
    // 搜索框聚焦
    searchFoucus: function () {
      this.isFoucus = true;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox").addClass("foucusbox");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".searchbox .searchicon").addClass("foucusicon");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".inputbox").addClass("foucusinput");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#searchtext').attr('placeholder', '请输入门诊关键搜索词');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cancelbtn').show();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".modal").css({ 'display': 'block' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".modal").height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").css({
        'overflow': "hidden",
        'position': 'fixed',
        'width': '100%'
      });
      var histry = JSON.parse(localStorage.getItem("histry")) || [];
      this.histryWord = histry;
    },
    // 关闭搜索弹层
    closeModal: function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#searchtext').css({ 'width': '100%' });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.modal').hide();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cancelbtn').hide();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("body").css({
        'overflow': "auto",
        'position': 'static',
        'width': '100%',
        'height': '100%'
      });
    },
    // 历史记录去重
    histryUnique: function (arr) {
      var res = [];
      var json = {};
      for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
          res.push(arr[i]);
          json[arr[i]] = 1;
        }
      }
      return res;
    }
  }
});

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



const api = new __WEBPACK_IMPORTED_MODULE_1__api_API__["a" /* default */]();



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'checkTime',
  data() {
    return {
      orderTime: {}, // 存入session的预约时间对象
      curMonList: [], // 当前月份数组
      dateList: [], // 日期数组
      ableId: [], // 可用日期id$
      timeAbleId: [], // 可用时间id
      curYear: '', // 当前年份
      nextYear: '', // 下一年
      curMon: '', // 当前月份
      nextMon: '', // 下一月
      myTime: {}, // 预约时间对象
      todayId: '', // 当前日期id
      today: '',
      oldId: [], // 过期日期id
      scheduleIdObj: {}, // scheduleId对象
      showTime: false, // 显示时间弹层
      timeObj: {}, // 乐牙预约时间对象
      timeFlag: {}, // 时间是否可用标志
      //      items:[{"sTime":"07:00","eTime":"08:00"},{"sTime":"08:00","eTime":"09:00"},{"sTime":"09:00","eTime":"10:00"},{"sTime":"10:00","eTime":"11:00"},{"sTime":"11:00","eTime":"12:00"},{"sTime":"12:00","eTime":"13:00"},{"sTime":"13:00","eTime":"14:00"},{"sTime":"14:00","eTime":"15:00"},{"sTime":"15:00","eTime":"16:00"},{"sTime":"16:00","eTime":"17:00"},{"sTime":"17:00","eTime":"18:00"},{"sTime":"18:00","eTime":"19:00"},{"sTime":"19:00","eTime":"20:00"},{"sTime":"20:00","eTime":"21:00"},{"sTime":"21:30","eTime":"22:00"}],// 时间对象
      items: [{ "sTime": "8:00", "eTime": "9:00" }, { "sTime": "9:00", "eTime": "10:00" }, { "sTime": "10:00", "eTime": "11:00" }, { "sTime": "11:00", "eTime": "12:00" }, { "sTime": "12:00", "eTime": "13:00" }, { "sTime": "13:00", "eTime": "14:00" }, { "sTime": "14:00", "eTime": "15:00" }, { "sTime": "15:00", "eTime": "16:00" }, { "sTime": "16:00", "eTime": "17:00" }, { "sTime": "17:00", "eTime": "18:00" }, { "sTime": "18:00", "eTime": "19:00" }, { "sTime": "19:00", "eTime": "20:00" }] // 时间对象

    };
  },
  beforeCreate() {
    document.title = '选择日期';
  },
  mounted() {
    var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    this.orderInfo = orderInfo; //  获取ordersession对象
    //        this.anios();
    this.fillDate();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height());
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.checkTime').css({ 'height': __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height() + "px" });
  },
  methods: {
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".timeli").css({ 'width': '21.5%' });
      }
    },
    // 填充页面数据
    fillDate: function () {
      var day = new Date(); //日期对象
      var week = day.getDay();
      var month = day.getMonth();
      this.curMon = month + 1; //当前月份
      this.curYear = day.getFullYear();
      if (this.curMon == 12) {
        this.nextMon = 1;
        this.nextYear = this.curYear + 1;
      } else {
        this.nextYear = this.curYear;
        this.nextMon = this.curMon + 1;
      }
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.nextMon, this.nextYear);
      var dd = day.getDate();
      this.today = dd;
      // 当前日期
      var curDate = this.curYear + "-" + this.curMon + "-" + dd;
      var clist = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__["e" /* getDayList */])(); // 日期数据
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("初次拿到日期数据");
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(clist);
      var today = day.getDate(); // 今日日期
      // 本月一日星期几
      var firstday = this.curYear + "-" + this.curMon + "-01";
      var nextday = this.curYear + "-" + this.nextMon + '-01';
      var tswk = new Date(firstday); //当月一日日期对象
      var nswk = new Date(nextday); //次月一日日期对象
      var first_week = tswk.getDay();
      var next_week = nswk.getDay();
      //今日前日期
      for (var i = today - 1; i > 0; i--) {
        if (i < 1) {
          clist[this.curMon].unshift(" ");
        } else {
          clist[this.curMon].unshift(i);
        }
      }
      for (var w = 0; w < first_week; w++) {
        clist[this.curMon].unshift("4" + w); //+w
      }
      for (var n = 0; n < next_week; n++) {
        clist[this.nextMon].unshift("4" + n); //+n
      }

      let that = this;
      //      setTimeout(function(){$("#"+that.curMon+today).addClass('curdate')},'100');
      that.dateList = clist; // 时间数组
      var param = {
        "doctorId": that.orderInfo.doctorId,
        "hospitalId": that.orderInfo.hospitalId,
        "orgSource": that.orderInfo.orgSource, // 机构来源
        "storeId": that.orderInfo.orgCode != null ? that.orderInfo.orgCode : '' // 第三方平台医院id
      };
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(param);
      let response = api.getDoctorSchedule(param); // 获取一个门店的排班列表
      var able = []; //可用数组
      response.then(function (res) {
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
        var data = res.data;
        var d, m;
        if (data.status == '1') {
          // 请求成功数据处理
          //        that.dateInfo= data.getDoctorScheduleResponseVoList; 
          var Arr = data.getDoctorScheduleResponseVoList;
          //          var Arr=[{"am":"07:00-12:00","count":"5","outpDate":"2017-10-22","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-23","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-24","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-25","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-26","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-27","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-28","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-29","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-30","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-10-31","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-01","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-02","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-03","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-04","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-05","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-06","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-07","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-08","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-09","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-10","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-11","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-12","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-13","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-14","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-15","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-16","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-17","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-18","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-19","pm":"12:00-21:30"},{"am":"07:00-12:00","count":"5","outpDate":"2017-11-20","pm":"12:00-21:30"}]
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("===============Arr");
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(Arr);
          var len = Arr.length; // 数组长度
          var staFlag, list;
          for (var a = 0; a < len; a++) {
            staFlag = Arr[a].reserveFlag; // 预约状态
            list = Arr[a].outpDate; // 可预约日期
            var days = that.compareStart(list);
            if (days > 0) {
              if (list.split('-')[1].charAt(0) == 0) {
                // 月份以0开始
                m = list.split('-')[1].substring(1);
              } else {
                // 月份为10、11、12
                m = list.split('-')[1];
              }
              if (list.split('-')[2].charAt(0) == 0) {
                // 日期以0开始
                d = list.split('-')[2].substring(1);
              } else {
                d = list.split('-')[2];
              }
              able.push(m + d); // 可用日期id
              that.scheduleIdObj[m + d] = Arr[a].scheduleId; // scheduleId存储
              that.timeObj[m + d] = Arr[a];
              setTimeout(function () {
                for (var i = 0; i < able.length; i++) {
                  __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + able[i]).addClass('able'); // 有效日期设置样式
                }
              }, 100);
            }
          }
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + that.nextMon + "00").css("visibility", "hidden");
          var cur_id = that.curMon + that.today;
          var x, o; // 当天前的日期 去除的可用id
          for (x = 1; x < that.today + 1; x++) {
            o = "" + that.curMon + x;

            for (var i = 0; i < able.length; i++) {
              if (able[i] == o) {
                able.splice(i, 1);
                break;
              }
            }
            that.oldId.push(o);
          }
          that.ableId = able; // 可预约的数据id
        } else {
          // 显示报错信息
          if (data.message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: data.message });
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: "发生内部错误" });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/common/errorPage");
      });
    },
    // 选择预约时间
    checkDate: function (curmon, curday) {
      if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(curday);
      this.timeAbleId = []; // 置空所选日期id
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".timeli").find("button").attr('disabled', 'disabled'); // 按钮不可用初始化
      var day = new Date(); //日期对象
      var month = curmon; //当前月份
      //      this.curMon = curmon;// 页面展示当前月份
      var year = this.curYear; // 当前年份
      this.orderTime.encounterDate = year + "-" + curmon + "-" + curday;
      this.orderTime.bookTime = year + "." + curmon + "." + curday;
      var ID = curmon + curday; // 所选日期的id值
      if (this.ableId.indexOf(ID) > -1 && curday != null) {
        this.showTime = true; // 显示时间弹层
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("li").find('span').removeClass('checkdate'); // 移除多余选中样式
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + ID).find('span').addClass('checkdate'); //为所点击的可用日期添加选中样式
        if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.orderInfo.orgCode);
        if (this.orderInfo.orgCode == 1) {
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(this.timeObj[ID]);
          var am = this.timeObj[ID].am.split("-");
          var pm = this.timeObj[ID].pm.split("-");
          if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(pm);
          var timeId = this.items; // 页面时间对象
          var len1 = timeId.length;
          for (var j = 0; j < len1; j++) {
            // 获取时间对象的序号
            var s_tId = timeId[j].sTime;
            if (s_tId == am[0]) {
              // 上午时间开始序号
              var s1 = j;
            }
            if (s_tId == am[1]) {
              // 上午时间结束序号
              var s2 = j;
            }
            if (s_tId == pm[0]) {
              // 下午时间开始序号
              var e1 = j;
            }
            if (s_tId == pm[1]) {
              // 下午时间结束序号
              var e2 = j;
            }
          }
          this.timeAbleId = [];
          for (var c = 0; c < len1; c++) {
            if (c > s1 - 1 && c < s2 + 1) {
              // 上午去除约满标记
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).attr('disabled', false);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).siblings(".unTimeFlag").remove();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).css({ 'padding-bottom': '.2rem' });
            }
            if (c > e1 - 1 && c < e2 + 1) {
              // 下午去除约满标记
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).attr('disabled', false);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).siblings(".unTimeFlag").remove();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + c).css({ 'padding-bottom': '.2rem' });
            }
            this.timeAbleId.push(c);
          }
        } else {
          // 分时排班表入参
          var param = {
            "hospitalId": this.orderInfo.hospitalId, // 医院编码
            "scheduleId": this.scheduleIdObj[ID] //日排班ID
          };
          let _this = this;
          let response = api.getSchedulePartTime(param); // 分时排班表接口
          response.then(function (res) {
            if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
            if (res.data.status == '1') {
              var time = res.data.getSchedulePartTimeResponseVoList;
              //                var time = [{"hospitalId":"6002","startTime":"8:30","endTime":"9:30","regFlag":"1","parttimeId":"108150","scheduleId":"29666"},{"hospitalId":"6002","startTime":"10:30","endTime":"11:00","regFlag":"1","parttimeId":"108151","scheduleId":"29666"},{"hospitalId":"6002","startTime":"11:30","endTime":"12:00","regFlag":"1","parttimeId":"108152","scheduleId":"29666"},{"hospitalId":"6002","startTime":"12:00","endTime":"13:00","regFlag":"1","parttimeId":"108153","scheduleId":"29667"},{"hospitalId":"6002","startTime":"13:00","endTime":"14:00","regFlag":"-1","parttimeId":"108154","scheduleId":"29667"},{"hospitalId":"6002","startTime":"14:00","endTime":"15:00","regFlag":"1","parttimeId":"108155","scheduleId":"29667"},{"hospitalId":"6002","startTime":"15:00","endTime":"16:00","regFlag":"1","parttimeId":"108156","scheduleId":"29667"},{"hospitalId":"6002","startTime":"16:00","endTime":"17:00","regFlag":"1","parttimeId":"108157","scheduleId":"29667"},{"hospitalId":"6002","startTime":"17:00","endTime":"18:00","regFlag":"1","parttimeId":"108158","scheduleId":"29667"},{"hospitalId":"6002","startTime":"18:00","endTime":"19:00","regFlag":"1","parttimeId":"108159","scheduleId":"29667"}]
              var timeId = _this.items; // 页面时间对象
              _this.timeAbleId = []; // 可用时间id
              var tFlag = {};
              var flagArr = [];
              for (var t = 0, l = timeId.length; t < l; t++) {
                var s_tId = parseInt(timeId[t].sTime.replace(":", ''));
                for (var i = 0, len = time.length; i < len; i++) {
                  var g_start = parseInt(time[i].startTime.replace(":", ''));
                  var g_start1 = parseInt(time[i].endTime.replace(":", ''));

                  if (g_start <= s_tId && s_tId < g_start1) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).attr('disabled', false);
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).siblings(".unTimeFlag").remove();
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).css({ 'padding-bottom': '.2rem' });
                    if (time[i].regFlag == '-1') {
                      // 约满样式调整 判断条件为regFlag==-1
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).after("<span class='fillFlag'>约满</span>");
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).attr('disabled', 'disabled');
                      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + t).css({ 'padding-bottom': '1rem' });
                    } else {
                      _this.timeAbleId.push(t); // 日期所用id
                    }
                  }
                }
              }
              if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log("===========_this.timeFlag");
              if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.timeAbleId);
            } else {
              // 显示报错信息
              if (res.data.message) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: res.data.message });
              } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_mint_ui__["Toast"])({ message: "发生内部错误" });
              }
            }
          }).catch(function (err) {
            if (__WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
            //              window.location.replace("#/common/errorPage");
          });
        }
      }

      //      this.strDate = year+"-"+month+"-"+curday; // 拼接所选预约日期格式
    },
    checkTime: function (time, index) {
      var id = index; // 所选时间id
      if (this.timeAbleId.indexOf(id) > -1) {
        //        this.strDate += " "+this.items[id].sTime+"-"+this.items[id].eTime
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mybtn").removeClass('timeChecked'); // 移除多余选中时间样式
        //        $("#"+id).parent().css({'background':'none'})
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#" + id).addClass('timeChecked'); // 添加选中时间样式
        //        $("#"+id).parent().attr("style","background:'url(../../assets/images/order/order_btnbg1.png) no-repeat 0 0'")

        this.orderTime.startTime = this.items[id].sTime; // 存开始时间
        this.orderTime.endTime = this.items[id].eTime; // 存结束时间
        if (id < 4) {
          this.orderTime.timeSlotId = 1; // 上午时间段编码
        } else {
          this.orderTime.timeSlotId = 2; // 下午时间段编码
        }
        this.orderInfo.orderTime = this.orderTime;
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        setTimeout(function () {
          //          window.location.href = '#/order/toOrder'
          window.location.replace('#/order/toOrder');
        }, 100);
      }
    },
    // 开始有效期比较
    compareStart: function (strDateStart) {
      var d = new Date();
      var strSeparator = "-"; //日期分隔符
      var oDate1;
      var oDate2;
      var iDays; // 相差的天数
      oDate1 = strDateStart.split(strSeparator); // 需要比较的日期
      var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      var strDateE = new Date(d.getFullYear(), d.getMonth(), d.getDate()); // 当前日期
      iDays = parseInt((strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数 
      return iDays;
    }
  }
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'serveContent',
    data() {
        return {
            source: ''
        };
    },
    beforeCreate() {
        document.title = '服务内容 ';
    },
    mounted() {
        var orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); //  获取ordersession对象
        if (orderInfo) this.source = orderInfo.source;
        document.body.addEventListener("scroll", this.init);
        this.reloadfun(); //刷新后的scrollTop方法
    },
    destroyed() {
        document.body.removeEventListener("scroll", this.init); //销毁scroll
    },
    methods: {
        init() {
            //		$(document).ready(function () {//首次进入页面未加载方法
            //			$('body').scroll(function () {
            //console.log('2222');
            var a = document.getElementById("product_infoall").offsetTop;
            var b = document.getElementById("serve_infoall").offsetTop;
            var c = document.getElementById("questionall").offsetTop;
            var h = document.getElementById("serall").getBoundingClientRect();
            var h1 = document.getElementById("serve_infoall").getBoundingClientRect();
            if (a >= -h.top + 30) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
            }
            if (c >= -h.top + 100 && b <= -h.top + 100) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
            }
            if (c <= -h.top + 180) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
            }
            if (-h.top < 150) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
            }
            //          });
            //         });
        },
        reloadfun() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scroll(function () {
                var a = document.getElementById("product_infoall").offsetTop;
                var b = document.getElementById("serve_infoall").offsetTop;
                var c = document.getElementById("questionall").offsetTop;
                var h = document.getElementById("serall").getBoundingClientRect();
                if (a >= __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() + 115) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
                }
                if (c >= __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() + 150 && b <= __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() + 115) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
                }
                if (c <= __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() + 115) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
                }
                if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() < 100) {
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
                    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
                }
            });
        },
        tap1() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap,.qtap").removeClass("active");
            //					$(".product_info").css("display","block");
            //					$(".serve_info,.question").css("display","none");
            return document.getElementById('product_info').scrollIntoView(true);
        },
        tap2() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".stap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.qtap").removeClass("active");
            //					$(".serve_info").css("display","block");
            //					$(".product_info,.question").css("display","none");
            return document.getElementById('serve_info').scrollIntoView(true);
        },
        tap3() {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".qtap").addClass("active");
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".ptap,.stap").removeClass("active");
            //					$(".question").css("display","block");
            //					$(".product_info,.serve_info").css("display","none");
            return document.getElementById('question').scrollIntoView(true);
        }
    }
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const api = new __WEBPACK_IMPORTED_MODULE_0__api_API__["a" /* default */]();





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toOrder',
  data() {
    return {
      isCheck: false, // 服务同意书是否勾选
      hospitalName: '',
      hospitalAddr: '',
      productName: '',
      mobile: "请输入手机号",
      user: {
        "patientName": "",
        "cardNo": "",
        "age": ""
      }, //输入信息对象
      orderTime: {
        "encounterDate": ""
      }, //预约时间对象
      phoneflag: false, // 电话号码校验状态
      tipWords: '',
      orderInfo: {},
      source: '',
      bookDateTime: '请选择预约时间',
      orderFlag: 1, // 是否已经预约的状态
      isCheckStore: false, // 是否已选门诊
      isOrder: false, // 即将跳转预约页面
      isOpenKey: false, // 是否输入电话号码
      keyInfo: [], // 键盘内容
      selfClose: false, // 手动点击弹层
      timeOutEvent: 0, //定时器   
      longdel: '', // 长按删除
      onLoadFlag: false, // onLoadFlag标记
      back_URIFlag: '0'
    };
  },
  watch: {
    back_URIFlag: function (newVal, oldVal) {
      alert(newVal);
      if (newVal === '1') {
        WeixinJSBridge.call('closeWindow');
      }
    }
  },
  beforeRouteLeave: (to, from, next) => {
    //    alert(sessionStorage.getItem('back_ticketURI'));
    if (sessionStorage.getItem('back_ticketURI')) {
      //返回卡券标记
      var back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
      //alert("---back_ticketURI:"+back_ticketURI);
      if (back_ticketURI == '1') {
        //返回卡券
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log('卡券');
        next(false);
        sessionStorage.setItem('back_ticketURI', '0');
        //            WeixinJSBridge.call('closeWindow');
        __WEBPACK_IMPORTED_MODULE_3__assets_js_wxConfig_js__["a" /* tkWX */].closeWindow();
      } else {
        next();
      }
    } else {
      next();
    }
  },
  beforeCreate() {
    document.title = '预约';sessionStorage.setItem('back_ticketURI', '1');
  },
  created() {},
  mounted() {
    __WEBPACK_IMPORTED_MODULE_3__assets_js_wxConfig_js__["a" /* tkWX */].init({});
    this.back_URIFlag = JSON.parse(sessionStorage.getItem('back_ticketURI'));
    sessionStorage.setItem('backFlag', false); // 是否为医院列表返回城市页
    //    sessionStorage.setItem('back_ticketURI','1')
    this.fillOrderPage(); // 填充预约页面
    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).height(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height());
    this.showbtn();
    this.anios();

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.key_body').on('touchstart', function (e) {
      e.preventDefault();
    });
  },
  methods: {
    // 填充预约页面
    fillOrderPage: function () {
      this.backFlag = JSON.parse(sessionStorage.getItem('isCheckStore')) || false; // 页面是否是返回页面
      var url = window.location.href; // 当前路由
      var linkUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__["a" /* getUrl */])(url); // 解析路由为JSON格式

      var orderInfo;
      if (this.backFlag == false) {
        orderInfo = sessionStorage.setItem('orderInfo', JSON.stringify(linkUrl)); // 保单号存session
      }
      orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); // 获取orderInfo的session
      this.orderInfo = orderInfo; //  获取ordersession对象
      // 初始填充医院站点
      if (orderInfo.hospitalName) {
        this.hospitalName = orderInfo.hospitalName;
        this.hospitalAddr = orderInfo.orgAddress;
      } else {
        this.hospitalName = '';
      }
      // 初始填充预约时间
      if (orderInfo.orderTime == undefined) {
        this.bookDateTime = "请选择预约时间";
      } else {
        if (orderInfo.orderTime.encounterDate != undefined) {
          this.bookDateTime = orderInfo.orderTime.bookTime + " " + orderInfo.orderTime.startTime;
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.myTime').removeClass('cd2').addClass('t_c4e');
        }
      }
      // 初始填充验证手机号码
      if (orderInfo.mobile != undefined) {
        this.mobile = orderInfo.mobile;
        this.phoneBlur();
      } else {
        if (this.mobile == '请输入手机号') {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').addClass('pcd2');
        }
      }

      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(orderInfo.user);
      // 填充页面用户信息
      if (orderInfo.user) {
        this.user = orderInfo.user;
      } else {
        this.fillOrderInfo();
      }
      this.isCheck = this.orderInfo.isCheck ? this.orderInfo.isCheck : false; // 服务同意书是否已选
      this.onLoadFlag = this.orderInfo.onLoadFlag ? this.orderInfo.onLoadFlag : false; // 是否有订单详情
    },
    // 填充客户身份信息
    fillOrderInfo: function () {
      let _this = this;
      var param = {
        "platform": "HealthManage", // 平台
        "policyNo": _this.orderInfo.policyNo, // 保单号
        "cpnTicketNo": _this.orderInfo.cpnTicketNo // 卡券号 920修改卡券名称cpnTicketNo
      };
      let response = api.getCorePolicyDetail(param); // 根据保单号获取用户详情
      response.then(function (res) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);

        if (res.status == '200') {
          var data = res.data.data;
          if (data == null) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({
              message: res.data.message,
              duration: 1000,
              className: 'mToast'
            });
          }
          _this.user.patientName = data.insuredName; // 页面展用户姓名
          _this.user.cardNo = data.identifyNumber; // 页面展示身份证号
          _this.user.aesInfo = data.aesInfo; // 加密身份证号
          _this.user.identifyTypea = data.identifyTypea; // 证据类型
          _this.user.age = data.age; // 被保人年龄 
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.user.age);
          //          data.age = 13
          if (data.age >= 14) {
            _this.orderInfo.source = '1';
            //            _this.orderInfo.productName = '微保专享洗牙套餐券'
          } else {
            _this.orderInfo.source = '14'; //'6'
            //            _this.orderInfo.productName = '微保专享窝沟封闭或涂氟'
            //            _this.orderInfo.productName = '建立专属口腔档案、口腔全面检查1次、窝沟封闭2颗牙或全口涂氟（二选一），具体服务项目请遵从诊所医嘱安排。'
          }
          // 是否跳转页面
          if (_this.orderInfo.orderId && _this.orderInfo.orderId.length) {
            _this.onLoading();
          }
          _this.orderInfo.user = _this.user;
          sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo));
        } else {
          if (res.data.message) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({
              message: res.data.message,
              duration: 1000,
              className: 'mToast'
            });
          }
        }
      }).catch(function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
        //        window.location.replace("#/common/errorPage");
      });
    },
    // 是否跳转页面
    onLoading: function (orderId, channel) {
      var that = this;
      that.orderId = orderId; //||'15785';
      var param = {
        "orderId": that.orderInfo.orderId, //截取URL
        "channelType": that.orderInfo.channelType
      };
      var parResult = api.selectOrder(param);
      parResult.then(function (res) {
        var data = res.data;
        if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(data);
        if (data.status == "1") {
          var orderMsg = data.data;
          //            orderMsg.orderState = "1";  
          var omstate = orderMsg.orderState;
          if (omstate == "4" || omstate == "0") {
            // 已经预约
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = "#/common/enterRoute?page=user/orderDetail&orderId=" + that.orderInfo.orderId + "&policyNo=" + that.orderInfo.policyNo + '&channelType=' + that.orderInfo.channelType + '&cpnTicketNo=' + that.orderInfo.cpnTicketNo;
          } else if (omstate == "3" || omstate == "1") {
            // 已完成
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = '#/common/enterRoute?page=user/evalFill&orderId=' + that.orderInfo.orderId + '&policyNo=' + that.orderInfo.policyNo + '&channelType=' + that.orderInfo.channelType + '&cpnTicketNo=' + that.orderInfo.cpnTicketNo;
          } else if (omstate == "5") {
            // 爽约
            sessionStorage.setItem('back_ticketURI', '0');
            window.location.href = '#/common/enterRoute?page=user/unorder&orderId=' + that.orderInfo.orderId;
          } else if (omstate == "2") {
            // 取消预约
            if (orderMsg.orgSource == 1) {} else {
              // 展示订单详情的出参
              //              orderMsg.serviceType = '6'
              if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(orderMsg.serviceType, that.orderInfo.source);
              if (orderMsg.serviceType == that.orderInfo.source) {
                that.hospitalName = orderMsg.orgName;
                that.hospitalAddr = orderMsg.orgAddress;
              } else {
                that.hospitalName = '';
              }

              that.mobile = orderMsg.mobile;

              that.orderInfo.hospitalId = orderMsg.orgId;
              that.orderInfo.doctorId = orderMsg.doctorId;
              that.orderInfo.mobile = orderMsg.mobile;
              that.orderInfo.contactTel = orderMsg.contactTel;
              that.orderInfo.hospitalName = orderMsg.orgName;
              that.orderInfo.orgAddress = orderMsg.orgAddress;
              that.orderInfo.orgCode = orderMsg.orgCode;
              that.orderInfo.orgSource = orderMsg.orgSource;
              that.orderInfo.onLoadFlag = true;
              __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
              sessionStorage.setItem('isCheckStore', true);
              sessionStorage.setItem('orderInfo', JSON.stringify(that.orderInfo));
            }

            //            that.bookDateTime = orderMsg.encounterDate.replace('-','.')+" "+orderMsg.beginTime
            //            $('.myTime').removeClass('cd2').addClass('t_c4e');
            //            window.location.href='#/order/toOrder?policyNo='+that.policyNo+'&channelType='+channel+'&cpnTicketNo='+cpnTicketNo
          }
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])(data.message);
        }
      });
    },
    // 去服务内容页面
    toServeContent: function () {
      sessionStorage.setItem('back_ticketURI', '0');
      window.location.href = '#/order/serveContent';
    },
    // 服务知情同意书
    toServeNotice: function () {
      sessionStorage.setItem('back_ticketURI', '0');
      window.location.href = '#/order/agreeServe';
    },
    // 去选择医院信息
    toCheckHospital: function () {
      sessionStorage.setItem('isCheckStore', true);
      if (this.orderInfo.cityId && this.onLoadFlag == false) {
        sessionStorage.setItem('back_ticketURI', '0');
        window.location.href = "#/order/checkStation";
      } else {
        if (this.orderInfo.channelType) {
          sessionStorage.setItem('back_ticketURI', '0');
          window.location.href = "#/order/Place";
        }
      }
    },
    // 去选择预约时间
    toCheckTime: function () {
      if (this.orderInfo.hospitalId) {
        sessionStorage.setItem('back_ticketURI', '0');
        window.location.href = "#/order/checkTime";
      } else {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').html("请先选择预约门诊信息");
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').show();
        setTimeout(function () {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        }, 1500);
      }
    },
    // css设置
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      /*position: absolute;top: 0;left:0;z-index:20;*/
      if (isAndroid) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.toOrder').css({ 'position': 'absolute', 'top': '0', 'left': '0' });
      }
      if (isiOS) {
        // ios系统样式设置
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.toCheck').css('top', '28%');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.myblur').blur();
      }
    },
    // 提交按钮显示状态更改
    showbtn: function () {
      //      if(this.isCheck == true && this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) { // 手机验证通过且已选体检时间 按钮可用
      if (this.phoneflag == true && this.bookDateTime != "请选择预约时间" && this.orderFlag == 1) {
        // 手机验证通过且已选体检时间 按钮可用
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', false);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').css('background-color', '#f49e23');
      }
      //      if(this.isCheck == false || this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) { // 手机验证失败或未选体检时间 按钮置灰
      if (this.phoneflag == false || this.bookDateTime == "" || this.orderFlag != 1) {
        // 手机验证失败或未选体检时间 按钮置灰
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').css('background-color', '#ffd18d');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', "disabled");
      }
      return true;
    },
    // 输入电话号码
    inputTel: function (n, id) {
      var len = this.mobile.length;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth;

      if (id != 9 && id != 11 && len < 11) {
        this.mobile = this.mobile + n;
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth + 1);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('#key' + n).addClass('click_num');
        setTimeout(function () {
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('#key' + n).removeClass('click_num');
        }, 150);
      }
    },
    // 点击删除键
    gtouchStart: function (id) {
      if (id == 11) {
        let _this = this;
        _this.timeOutEvent = setTimeout(function () {
          _this.longPress();
        }, 500); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适

        return false;
      }
    },
    // 放开删除键
    gtouchend: function (n, id) {
      var len = this.mobile.length;
      if (id == 11) {
        let _this = this;
        clearTimeout(_this.timeOutEvent); //清除定时器   
        clearInterval(_this.longdel); // 清除长按删除
        if (_this.timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）   
          if (len > 0) {
            _this.mobile = _this.mobile.slice(0, len - 1);
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth - 16);
          }
        }
        return false;
      }
    },
    // 长按删除键
    longPress: function () {
      let _this = this;
      _this.timeOutEvent = 0;
      //执行长按要执行的内容，如弹出菜单   
      var len = _this.mobile.length;
      if (len > 0) {
        _this.longdel = setInterval(function () {
          _this.mobile = _this.mobile.slice(0, --len);
          __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth - 16);
          if (len == 0) clearInterval(_this.longdel); // 清除长按删除
        }, 100);
      } else {
        clearTimeout(_this.timeOutEvent); //清除定时器
        clearInterval(_this.longdel); // 清除长按删除
      }
    },
    // 关闭键盘
    closeKey: function () {
      let _this = this;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').remove(); // 移除光标
      _this.isOpenKey = false;
      _this.selfClose = true; // 手动点击弹层
      _this.phoneBlur();
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("html, body").animate({ scrollTop: 0 }, { duration: 500, easing: "swing" });
    },
    // 打开键盘
    openKey: function () {
      this.isOpenKey = true;
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.v-modal').attr("style", "opacity: 0");
      }, 1);
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').after("<i class='cursor'></i>");
      var top_h = __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor')[0].offsetHeight; // 手机号码元素高度
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
      if (this.phoneflag == false && this.mobile != '请输入手机号') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css({ 'left': __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth });
      } else if (this.phoneflag == true && this.mobile != '请输入手机号') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css({ 'left': __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth });
      } else {
        if (this.selfClose == false) {
          this.mobile = '';
        }
      }
      if (this.selfClose == true) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.cursor').css('left', __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.hid_s')[0].offsetWidth);
      }
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("html, body").animate({ scrollTop: 150 }, { duration: 500, easing: "swing" });
      //      $("html, body").css('padding-bottom',150)
      var delimg = "<img src = '../../assets/images/order/key_delete.png'>";
      var tel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', "space", '0', 'del'];
      this.keyInfo = tel;
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()("#key11").append(delimg);
    },
    // 验证手机号
    phoneBlur: function () {
      this.mobile = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.trim(this.mobile);
      var phone = this.mobile;
      if (phone == '') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.p_cursor').removeClass('pcd2');
        this.phoneflag = false;
      } else {
        if (!/^1[34578]\d{9}$/.test(phone)) {
          this.phoneflag = false;
        } else {
          this.phoneflag = true;
        }
      }
      if (this.phoneflag == false) {
        this.tipWords = '请输入正确的手机号';
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').show();__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').show();
        setTimeout(function () {
          _this.tipWords = '';__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').hide();__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        }, 1500);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phc').addClass('c6e');
      } else {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errbtn').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phone').removeClass('errNum');
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.phc').removeClass('c6e');
      }
      this.orderInfo.mobile = this.mobile;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
      this.showbtn();
    },
    // 勾选服务同意书
    checkTip: function () {
      this.isCheck = !this.isCheck;
      this.showbtn();
      //      if(this.isCheck == false) {
      //        this.tipWords = "请先阅读并同意服务知情同意书"
      //        var _this = this;
      //        $('.errtip').show();
      //        setTimeout(function(){_this.tipWords='';$('.errtip').hide()},1500);
      //      }
      if (this.isCheck == true) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.errtip').hide();
      }
      this.orderInfo.isCheck = this.isCheck;
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
    },
    // 去预约
    toOrderAct: function () {
      this.phoneBlur();
      if (this.isCheck == false) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: '请先阅读并同意服务知情同意书', duration: 1500, className: 'mToast' });
        //        $('.errtip').html("请先阅读并同意服务知情同意书");
        //        $('.errtip').show();
        //        setTimeout(function(){$('.errtip').hide()},1500);
      }
      let _this = this;

      if (_this.user.cardNo == "") {
        // 未请求到体检人信息提示
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "未查到您的身份信息" });
        return false;
      }
      if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(_this.orderInfo);
      var param = {
        "contactTel": _this.orderInfo.contactTel, // 机构电话
        'orgAddress': _this.orderInfo.orgAddress, // 机构地址
        "doctorId": _this.orderInfo.doctorId,
        "encounterDate": _this.orderInfo.orderTime.encounterDate,
        "endTime": "", //_this.orderInfo.orderTime.endTime,
        "hospitalId": _this.orderInfo.hospitalId,
        "hospitalName": _this.orderInfo.hospitalName,
        "orgSource": _this.orderInfo.orgSource, // 机构来源
        "orgCode": _this.orderInfo.orgCode ? _this.orderInfo.orgCode : '', // 第三方平台医院id
        "idCardNo": _this.user.cardNo, // _this.user.cardNo
        "idType": _this.user.identifyTypea, // 证件类型
        "aesInfo": _this.user.aesInfo,
        "mobile": _this.mobile,
        "patientName": _this.user.patientName,
        "startTime": _this.orderInfo.orderTime.startTime,
        "timeSlotId": _this.orderInfo.orderTime.timeSlotId,
        "twtId": _this.orderInfo.policyNo != null ? _this.orderInfo.policyNo : "",
        "wesurePolicyNo": _this.orderInfo.wesurePolicyNo != null ? _this.orderInfo.wesurePolicyNo : _this.orderInfo.policyNo, // 微宝内部保单号
        "channelType": sessionStorage.getItem('channelType'), //   _this.orderInfo.channelType,//渠道类型
        //          "ticketNo":_this.orderInfo.ticketNo// 卡券号
        "ticketId": _this.orderInfo.cpnTicketNo, // 卡券号 920修改卡券名称cpnTicketNo  922将提交卡券号改为ticketId
        "source": _this.orderInfo.source // 套餐类别1--洗牙 6--14岁以下
      };
      if (_this.orderFlag > 1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "您已提交预约，请勿重复操作" });
      }
      if (_this.isCheck == true && _this.phoneflag == true && _this.bookDateTime != "" && _this.orderFlag == 1) {
        let response = api.order(param);
        ++_this.orderFlag;
        _this.showbtn();
        response.then(function (res) {
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(res);
          if (res.data.status == '1') {
            _this.orderInfo.orderId = res.data.orderId;
            _this.orderInfo.tradeNo = res.data.tradeNo;
            sessionStorage.setItem('isCheckStore', false);
            sessionStorage.setItem('isOrder', true);
            sessionStorage.setItem('orderInfo', JSON.stringify(_this.orderInfo));
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()('.loginact').attr('disabled', "disabled");
            setTimeout(function () {
              sessionStorage.setItem('back_ticketURI', '0');
              window.location.href = "#/user/orderDetail?orderId=" + res.data.orderId + "&policyNo=" + _this.orderInfo.policyNo + '&channelType=' + _this.orderInfo.channelType + '&cpnTicketNo=' + _this.orderInfo.cpnTicketNo + '&wesurePolicyNo=' + _this.orderInfo.wesurePolicyNo;
            }, 100);
          } else {
            //按钮点亮
            _this.orderFlag = 1;
            _this.showbtn();
            if (res.data.message) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: res.data.message, duration: 1000, className: 'mToast' });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "发生内部错误", duration: 1000, className: 'mToast' });
            }
          }
        }).catch(function (err) {
          //按钮变亮
          _this.orderFlag = 1;
          _this.showbtn();
          if (__WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__["a" /* config_param */].isLog) console.log(err);
          //          window.location.replace("#/common/errorPage");
        });
      }
    }

  }
});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_BaseJS_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const api = new __WEBPACK_IMPORTED_MODULE_0__api_API__["a" /* default */]();





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toPage',
  data() {
    return {
      inputNo: '',
      urlStr: ''
    };
  },
  beforeCreate() {
    document.title = '用户输入保单号'; //sessionStorage.setItem('back_ticketURI','1');
  },
  created() {},
  mounted() {
    sessionStorage.clear();
  },
  methods: {
    // 调取接口进行页面跳转
    toPage: function () {
      if (this.inputNo == '') {
        // 保单号为空
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "请输入保单号" });
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()(".policy").focus();
      } else {
        var param = { "policyNo": this.inputNo || "", "ticketNo": "" };
        let response = api.indexre(param); // 微宝接口
        let _this = this;
        response.then(function (res) {
          console.log(res);
          var str = res.data.data.param;
          if (res.status == 200) {
            var url = __WEBPACK_IMPORTED_MODULE_1__api_config__["a" /* default */].baseURL.replace('call/', 'insurance/orderIndex?param=');
            //          _this.urlStr = url + str;// 拼接跳转路径
            _this.urlStr = __WEBPACK_IMPORTED_MODULE_3__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/insurance/orderIndex?param=' + str; // 拼接跳转路径
            window.location.href = _this.urlStr;
          }
        }).catch(function (err) {
          console.log(err);
          //        window.location.replace("#/common/errorPage");
        });
        //        console.log("即将跳转页面")
      }
    },
    toEnterRouter: function () {
      // 进入空白页面
      if (this.inputNo == '') {
        // 保单号为空
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_mint_ui__["Toast"])({ message: "请输入保单号" });
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()(".policy").focus();
      } else {
        var param = { "policyNo": this.inputNo, "ticketNo": "" };
        let response = api.indexre(param); // 微宝接口
        let _this = this;
        response.then(function (res) {
          console.log(res);
          var str = res.data.data.param;
          if (res.status == 200) {
            var url = __WEBPACK_IMPORTED_MODULE_1__api_config__["a" /* default */].baseURL.replace('call/', 'insurance/orderIndexre?param=');
            //          _this.urlStr = url + str;// 拼接跳转路径
            _this.urlStr = __WEBPACK_IMPORTED_MODULE_3__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/insurance/orderIndexre?param=' + str; // 拼接跳转路径
            window.location.href = _this.urlStr;
          }
        }).catch(function (err) {
          console.log(err);
          //        window.location.replace("#/common/errorPage");
        });
        //        console.log("即将跳转页面")
      }
    },
    // css设置
    anios: function () {
      //判断移动设备，更改样式
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()('.toCheck').css('top', '28%');
        __WEBPACK_IMPORTED_MODULE_2_jquery___default()('.myblur').blur();
      }
    }

  }
});

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_getLocation_js__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  beforeCreate() {
    document.title = '获取当前地位'; //包括 城市 经度 维度
  },
  mounted: function () {
    this.location();
  },
  methods: {
    location: function () {
      // 定位信息 
      var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
      if (qqlocation && qqlocation.yesOrNo == 1) {
        var t = qqlocation.time;
        var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
        if (outtime) {
          sessionStorage.removeItem('ifGetLocation');
        } else {
          return;
        }
      }
      var _this = this;
      var ifGetLocation = {};
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
          console.log("------------成功--------------");
          alert(JSON.stringify(data)); //{lon: 116.407526, lat: 39 90403, city: "北京"}
          //            console.log(data.city);
          alert("lon" + data.lon + "   lat" + data.lat);
          ifGetLocation = { "yesOrNo": 1, "data1": data, "time": new Date().getTime() };
          sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
        }, function () {
          console.log("-----定位失败-----");
          sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 }));
        });
      });
    },
    topage: function () {
      var start = JSON.parse(sessionStorage.getItem('ifGetLocation')).data || { "lon": "133.407526", "lat": "39 90403", "addr": "222泰康人寿" };
      alert(JSON.stringify(start));
      var dest = { "eword": "故宫博物馆", "epointx": "116.39710", "epointy": "39.917200"
        /*  	var url="http://apis.map.qq.com/tools/routeplan/eword="+
            	dest.eword+"&epointx="+dest.epointx+"&epointy="+dest.epointx+
           	"&sword="+start.addr+"&epointx="+start.lon+"&epointy="+start.lat+
            	"?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B"*/
        //将腾讯导航改为地图
      };var url = "http://apis.map.qq.com/tools/poimarker?type=1&keyword=" +
      //  	dest.eword+"&center="+start.epointy+","+start.epointx+"&region=北京"+
      //酒店&center=39.908491,116.374328
      dest.eword + "&center=null,null" + "&region=北京" + "&bound=39.907293,116.368935,39.914996,116.379321" + "&radius=1000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";

      //http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院|
      window.location.href = url;
    },
    getLocatPoint: function () {
      /*
       "hospitalAddr":"北京市东城区东长安街1号东方广场C3座E-（F1-F3层）","districtCode":"110101",
       "spellNo":"BJJMYYGLYXZRGSJMJDKQYY","provCode":"110000","lastModify":null,"distance":0.9,
       "cityCode":"110000","hospitalRule":"9:00-18:00","hospitalLongitudeLatitude":
       "116.4140600000,39.9096500000","hospitalName":"北京佳美医院管理有限责任公司佳美经典口腔医院",
       "avgQuality":4.0,"contactTel":"010-85186950","parentId":"6095","hospitalDes":"佳美目前在北京、上海、大连多个中心城市建立了数十家直营连锁门诊，终身会员突破百万。",
       "hospitalId":"6117","createTime":null,"doctorId":"230116","orgSource":"0",
       "orgCode":null,"hospitalImgId":null},
       * */
      var hospitalAddr = "北京市东城区东长安街1号东方广场C3座E-（F1-F3层）";
      var hospitalLongitudeLatitude = "116.4140600000,39.9096500000";
      var coord = hospitalLongitudeLatitude.split(',')[1] + ',' + hospitalLongitudeLatitude.split(',')[0];
      var city = "北京";
      var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + coord + ";title:" + city + ";addr:" + hospitalAddr + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      window.location.href = url;
    }
  }
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//



const api = new __WEBPACK_IMPORTED_MODULE_1__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  beforeCreate() {
    document.title = '测试退出微信'; //包括 城市 经度 维度
  },
  mounted: function () {
    this.pageInit();
  },
  methods: {
    pageInit: function () {
      this.back();
    },
    back: function () {
      var back = 'close';
      window.onpopstate = function (event) {
        if (back == 'close') WeixinJSBridge.call('closeWindow');
      };
    }
  }
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//



const api = new __WEBPACK_IMPORTED_MODULE_1__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
  beforeCreate() {
    document.title = '接口调通测试'; //包括 城市 经度 维度
  },
  mounted: function () {
    console.log("testInterface.vue  testInterface.vue testInterface.vue ");
    //this.pageInit();
  },
  methods: {
    pageInit: function () {
      var that = this;
      var param = {
        "cityCode": "527",
        "districtCode": "",
        "hospitalName": "",
        "provCode": ""
      };
      console.log(param);
      var response = api.getOrgList(param);
      response.then(function (res) {
        console.log(res);
        var data = res.data;
        if (data.status == '1') {
          console.log(data);
        } else {
          console.log(data);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






const api = new __WEBPACK_IMPORTED_MODULE_4__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	beforeCreate() {
		document.title = '获取当前地位'; //包括 城市 经度 维度
	},
	mounted: function () {
		__WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__["a" /* tkWX */].init({});
		this.optImg();
	},
	methods: {
		optImg: function () {
			var t = this;
			//上传
			__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.upload_pic>.one_pic input:first-child').click(function (e) {
				e.preventDefault();
				console.log(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this));
				t.chooseImage(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this), __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).parent('.one_pic')[0]);
				//				t.setImg(null,null,function(sid){//单张上传到本地  test
				//					alert(sid);
				//  	 		$(rplaceObj).before("<img src='"+changeWXImgURL(localId)+"' fileName='' ecmImgId='"+sid+"'>");
				//      });
			});

			//大图浏览当前图片
			var currOptImg;
			__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.upload_pic').on('click', 'img', function () {
				currOptImg = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.compensation').hide();
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix img').attr('src', __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).attr('src'));
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix').show();
			});

			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix').not(__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.upload_pic .del_ico')).click(function () {
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.compensation').show();
			});

			//删除当前浏览的选择图片
			__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix .del_ico').click(function () {
				currOptImg.remove();
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.compensation').show();
				__WEBPACK_IMPORTED_MODULE_1_jquery___default()('.pic_fix img').attr('src', '');
			});
		},
		chooseImage: function (_this, rplaceObj) {
			//调用微信上传图片并且抓取到服务器
			var t = this;
			alert("method  chooseImage--");
			wx.chooseImage({
				//count: 2, // 默认9
				sizeType: ['compressed'], //'original', 可以指定是原图还是压缩图，默认二者都有
				//sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					if (res.localIds) {
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						var syncUpload = function (localIds, _this, rplaceObj) {
							var localId = localIds.pop();
							wx.uploadImage({
								localId: localId, //需要上传的图片的本地ID，由chooseImage接口获得				    
								isShowProgressTips: 1, //默认为1，显示进度提示				   
								success: function (res) {
									alert(res.serverId);
									//其他对serverId做处理的代码
									if (localIds.length > 0) syncUpload(localIds, _this, rplaceObj);
									var serverId = res.serverId; //返回图片的服务器端ID	
									t.setImg({ "serverId": serverId }, null, function (sid) {
										//单张上传到本地
										__WEBPACK_IMPORTED_MODULE_1_jquery___default()(rplaceObj).before("<img src='" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__["c" /* changeWXImgURL */])(localId) + "' fileName='' ecmImgId='" + sid + "'>");
									});
								}
							});
						};
						syncUpload(localIds, _this, rplaceObj);
					}
				}
			});
		},
		setImg: function (data, fileName, sucFun) {
			//			alert("setImg: "+data.serverId)
			var param = { "uploadImageRequestVoList": [{ "module": "common", "mpType": "life", "name": "", "serverId": data.serverId
					//      						"RkLfv4Yvy_P2HcRh9cCTqQGZAIyazeqHn1u4SEeNi6V60OY1aTTC956qGcdWfJGu"
				}] };
			let response = api.setImg(param);
			response.then(function (res) {
				console.log(res);
				var data = res.data;
				if (data.status == '1') {
					var k = data.data.uploadImageRequestVoList[0].key;
					console.log(k);
					if (sucFun) sucFun(k);
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])(data.message);
				}
			}).catch(function (err) {
				console.log(err); //Toast("获取签名connect fail!");
			});
		},
		topage: function () {
			var start = JSON.parse(sessionStorage.getItem('ifGetLocation')).data; //||{"lon":"116.407526","lat":"39 90403","addr":"泰康人寿"}
			alert(JSON.stringify(start));
			var dest = { "eword": "故宫博物馆", "epointx": "116.39710", "epointy": "39.917200" };
			var url = "http://apis.map.qq.com/tools/routeplan/eword=" + dest.eword + "&epointx=" + dest.epointx + "&epointy=" + dest.epointx + "&sword=" + start.addr + "&epointx=" + start.lon + "&epointy=" + start.lat + "?referer=myapp&key=6IZBZ-JQ4WP-5SMD2-VJKOA-OYGFZ-26F5B";
			window.location.href = url;
		}
	}
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_config_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









const api = new __WEBPACK_IMPORTED_MODULE_4__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			orderMsg: {}, //查询预约详情
			evalMsg: {}, //提交评价
			selectValuaMsg: {}, //查询评价
			starArr: ['1', '2', '3', '4', '5'], //星星评价
			textarea1: "", //文本
			i: "", //星星评价
			orderId: '',
			doctorId: '',
			orgId: '', //机构Id
			userId: '', fileId: '', //图片id
			orgName: '', //机构名称
			cellValue: '', //有无口腔图片的value
			startlg1: '', startlg2: '', startlg3: '', //星星评价
			status: '', //查询评价信息状态码
			substatu: '', //提交状态码
			curLength: '', fileImg: '', fillsrc: [], source: '', objKey: '', source2: '', hanindex: '', mintleng: '',
			indexnow: 0, isshow: false,
			back_URIFlag: '0'
		};
	},
	beforeCreate() {
		document.title = '评价';sessionStorage.setItem('back_ticketURI', '1');
	},
	watch: {
		back_URIFlag: function (newVal, oldVal) {
			alert(newVal);
			if (newVal === '1') {
				WeixinJSBridge.call('closeWindow');
			}
		}
	},
	beforeRouteLeave: (to, from, next) => {
		//物理键返回，路由离开
		var back_ticketURI = sessionStorage.getItem('back_ticketURI');
		if (back_ticketURI) {
			//返回卡券标记
			var pic = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix') ? __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').css("display") : "";
			if (pic && pic != 'none') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				next(false);
				//return;
			} else {
				back_ticketURI = JSON.parse(back_ticketURI);
				if (back_ticketURI == '1') {
					//返回卡券
					next(false);
					sessionStorage.setItem('back_ticketURI', '0');
					//			            window.location.href=config_param.ticketURI; 
					__WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__["a" /* tkWX */].closeWindow();
				} else next();
			}
		} else next();
	},

	mounted() {
		this.onLoading();
		this.isEvalFull();
		__WEBPACK_IMPORTED_MODULE_2__assets_js_wxConfig_js__["a" /* tkWX */].init({});
		this.back_URIFlag = JSON.parse(sessionStorage.getItem('back_ticketURI'));
		this.optImg();
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		/*position: absolute;top: 0;left:0;z-index:20;*/
		if (isAndroid) {
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.evalFill').css({ 'position': 'absolute', 'top': '0', 'left': '0' });
		}
	},
	methods: {
		handleChange: function (index) {
			//发生事件
			this.hanindex = index + 1;
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.hindex').text(this.hanindex);
		},
		teethUrl: function () {
			sessionStorage.setItem('back_ticketURI', '0');
			window.location.href = '#/user/teethImg';
		},
		shopUrl: function () {
			sessionStorage.setItem('back_ticketURI', '0');
			sessionStorage.setItem('fromRouter', window.location.href);
			window.location.href = '#/user/shopDetail';
		},
		isEvalFull: function () {
			//是否完成评价
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			that.orgId = parseUrl.orgId;
			var channel = parseUrl.channelType;
			var param = {
				"orderId": that.orderId,
				"channelType": channel
			};
			var parResult = api.selectValuationByOrderId(param);
			parResult.then(function (res) {
				var data = res.data;
				that.status = data.status;
				//					that.status = "2"
				if (data.status == "1") {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".del_bg").hide();
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').show();
					that.selectValuaMsg = data.selectValuationResponseVo;
					var selecImg = that.selectValuaMsg.fileArray;
					if (selecImg != null) {
						that.fileImg = "";
						var deimg_w, deimg_h;
						var filarr = [];
						for (var n = 0; n < selecImg.length; n++) {
							var selecImgId = selecImg[n];
							that.fileId = selecImgId.fileResourceId;
							if (that.fileId != null) {
								that.fileImg += "<img src=" + __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + that.fileId + '/default' + "/>";
							}
							var src_url = __WEBPACK_IMPORTED_MODULE_6__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + selecImgId.fileResourceId + '/default';
							var deimg = new Image();
							deimg.src = src_url;
							deimg.onload = function () {
								var out_hei = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.img_srec').height();
								var out_wid = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.img_srec').width();
								__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#debody_img div img').css({ 'max-width': 'none' });
								__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#debody_img div img'), function (i, n) {
									deimg_w = n.naturalWidth;
									deimg_h = n.naturalHeight;
									if (deimg_w > deimg_h) {
										n.style.width = 'auto';n.style.height = '100%';
										var img_wh = deimg_h / out_hei;
										var dewidth = deimg_w / img_wh;
										var dewh = '-' + (dewidth - out_wid) / 2 + 'px';
										n.style.left = dewh;
									} else {
										n.style.width = '100%';n.style.height = 'auto';
										var img_wh = deimg_w / out_wid;
										var deheight = deimg_h / img_wh;
										var dewh = '-' + (deheight - out_hei) / 2 + 'px';
										n.style.top = dewh;
									}
								});
							};
							filarr.push(src_url);
							setTimeout(function () {
								that.fillsrc = filarr;
							}, 10);
						}
					}
				} else {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').hide();
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').not(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic .del_ico')).click(function () {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
					});
					return;
				}
			});
		},
		lightStar: function (i, t) {
			//星星评价
			var sparent = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.target).parent();
			var i = event.target.id;
			this.i = i;
			if (i == 1 && sparent.children('.star_light').length == 1) {
				sparent.children().eq(0).removeClass('star_light');return;
			}
			sparent.children().removeClass('star_light');
			for (; i > 0; i--) {
				sparent.children('#' + i).addClass('star_light');
			}
		},
		evalLoading: function () {
			//提交评价
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.doctorId = that.orderMsg.doctorId;
			that.orderId = parseUrl.orderId;
			that.orgId = parseUrl.orgId;
			that.startlg1 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.sone .star_light').length;
			that.startlg2 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.stwo .star_light').length;
			that.startlg3 = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.sthree .star_light').length;
			if (that.startlg1 > 0 && that.startlg2 > 0 && that.startlg3 > 0) {
				if (that.curLength >= 1) {
					var fileArray = [];
					var fsid = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.eval_img .plus');
					if (fsid) {
						for (var j = 0; j < fsid.length; j++) {
							var ssid = fsid[j];
							fileArray.push({
								"fileIndex": j, "fileName": "pingjia", "fileResourceId": __WEBPACK_IMPORTED_MODULE_3_jquery___default()(ssid).attr('ecmImgId'), "fileType": ""
							});
						}
					}
					var param = {
						"content": this.textarea1,
						"doctorId": that.doctorId, //url
						"fileArray": fileArray,
						"orderId": that.orderId, //url
						"orgId": that.orgId, //url
						"orgAddress": that.orderMsg.orgAddress,
						"serviceAttitude": this.startlg1, //服务态度几星
						"serviceEnvironment": this.startlg2, //几星
						"serviceQuality": this.startlg3, //几星
						"userId": that.userId //url身份证号
					};
					var parResult = api.valuationSave(param);
					parResult.then(function (res) {
						var data = res.data;
						that.substatu = data.status;
						if (data.status == "1") {
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".del_bg").hide();
							that.evalMsg = data.valuationSaveResVo;
							that.isEvalFull();
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])({
								className: 'eval_btntxt',
								message: data.message, //'提交成功',
								iconClass: 'eval_succ',
								position: 'middle',
								duration: 1000
							});
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').not(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic .del_ico')).click(function () {
								//									$('.pic_fix').hide();
								//									$('.others').show();
							});
						} else {
							__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.chahead').hide();
						}
					});
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])("最少一个字才能提交");
				}
			} else {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])({
					message: '请选择评价等级', //'提交成功',
					position: 'middle',
					duration: 1000
				});
			}
		},
		check: function () {
			/*字数限制*/
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()("html, body").animate({ scrollTop: 150 }, { duration: 500, easing: "swing" });
			this.curLength = __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val().length;
			if (this.curLength > 140) {
				var num = __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val().substr(0, 140);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()("#textarea").val(num);
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])("字数已超过上限");
			}
		},
		optImg: function () {
			//图片上传
			var t = this;
			//上传
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.upload_pic>.one_pic input:first-child').click(function (e) {
				e.preventDefault();
				t.chooseImage(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this), __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parent('.one_pic')[0]);
			});
			//大图浏览当前图片
			var currOptImg;

			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').on('click', '.upload_pic img', function () {
				//
				t.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.img_over').attr('data-i'));
				currOptImg = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.mint-swipe').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix>img').attr('src', __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).attr('src'));
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').on('click', '.debody_img img', function () {
				//
				t.isshow = false;
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix>img').hide();
				t.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.img_over').attr('data-i'));
				currOptImg = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').hide();
				var mint_swarp = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this).parents('.debody_img').find('img');
				t.mintleng = mint_swarp.length; //获取当前元素中图片的总数
				setTimeout(function () {
					t.isshow = true;
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.hindex').text(t.indexnow + 1); //获取当前图片进来的索引
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.mintleng').text(t.mintleng);
				}, 100);
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});

			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.cha').click(function () {
				t.isshow = false;
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
			//删除当前浏览的选择图片
			__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix .del_bg').click(function () {
				currOptImg.remove();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.others').show();
				__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.pic_fix img').attr('src', '');
				if (__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length < 3) {
					__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.one_pic').show();
				}
			});
		},
		chooseImage: function (_this, rplaceObj) {
			//调用微信上传图片并且抓取到服务器
			var t = this;
			wx.chooseImage({
				count: 3 - __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length, // 默认9
				sizeType: ['compressed'], //'original', 可以指定是原图还是压缩图，默认二者都有
				//sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					if (res.localIds.length + __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length > 3) {
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui__["Toast"])('只能上传三张评价图!');return;
					}
					//							alert(JSON.stringify(res));
					if (res.localIds) {
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						var syncUpload = function (localIds, _this, rplaceObj) {
							var localId = localIds.pop();
							wx.uploadImage({
								localId: localId, //需要上传的图片的本地ID，由chooseImage接口获得				    
								isShowProgressTips: 1, //默认为1，显示进度提示				   
								success: function (res) {
									//				    				    	alert(res.serverId); 
									//其他对serverId做处理的代码
									if (localIds.length > 0) syncUpload(localIds, _this, rplaceObj);
									var serverId = res.serverId; //返回图片的服务器端ID	
									t.setImg({ "serverId": serverId }, null, function (sid) {
										//单张上传到本地
										__WEBPACK_IMPORTED_MODULE_3_jquery___default()(rplaceObj).before("<img class='plus' src='" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["c" /* changeWXImgURL */])(localId) + "' fileName='' ecmImgId='" + sid + "'/>");
										if (__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.plus').length > 2) __WEBPACK_IMPORTED_MODULE_3_jquery___default()(rplaceObj).hide();
									});
								}
							});
						};
						syncUpload(localIds, _this, rplaceObj);
					}
				}
			});
		},
		setImg: function (data, fileName, sucFun) {
			//			alert("setImg: "+data.serverId)
			var param = { "uploadImageRequestVoList": [{ "module": "common", "mpType": "life", "name": "", "serverId": data.serverId
					//      						"RkLfv4Yvy_P2HcRh9cCTqQGZAIyazeqHn1u4SEeNi6V60OY1aTTC956qGcdWfJGu"
				}] };
			let response = api.setImg(param);
			response.then(function (res) {
				var data = res.data;
				if (data.status == '1') {
					var k = data.data.uploadImageRequestVoList[0].key;
					if (sucFun) sucFun(k);
				} else {
					//		        	Toast(data.message);
				}
			}).catch(function (err) {
				console.log(err); //Toast("获取签名connect fail!");
			});
		},
		//订单详情接口
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId; //||'15785';
			var channel = parseUrl.channelType;
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel //渠道类型
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					var ifOrder = true;
					that.orderMsg = data.data;
					that.orgName = that.orderMsg.orgName;
					that.doctorId = that.orderMsg.doctorId;
					that.userId = that.orderMsg.userId;
					that.userId ? that.userId : that.userId = parseUrl.userId;
					that.source2 = that.orderMsg.commitService; //门诊确认的服务
					that.source = that.orderMsg.serviceType; //客户提交的服务类型
					//						that.source!=1&&!that.source2$('.nobd').hide():$('.nobd').show();
					if (that.source != 1) {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.nobd').hide();
					} else if (that.source2 && that.source2 != 1) {
						__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.nobd').hide();
					}
					that.source ? that.source : that.source = that.orderMsg.serviceType;
					var orderInfo;
					var uploadFlag = that.orderMsg.uploadFlag;
					var remark = that.orderMsg.remark;
					uploadFlag == 0 ? that.cellValue = "等待门诊上传" : uploadFlag == 1 ? that.cellValue = "已上传，请查看" : uploadFlag == 2 ? that.cellValue = "已放弃" : that.cellValue = "等待门诊上传";
					if (sessionStorage.getItem("orderInfo")) {
						//判断是否已经存在此session
						orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
						orderInfo.ifOrder = ifOrder;
						orderInfo.doctorId = that.orderMsg.doctorId;
					} else {
						orderInfo = { 'orderId': that.orderId, 'uploadFlag': uploadFlag, 'remark': remark, orderId: that.orderId, 'ifOrder': ifOrder, 'hospitalId': that.orderMsg.orgId, 'doctorId': that.orderMsg.doctorId };
					}
					sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
					var orderup = JSON.parse(sessionStorage.getItem("orderInfo"));
					var orderupload = orderup.uploadFlag;
					if (uploadFlag != orderupload) {
						orderInfo.uploadFlag = uploadFlag;
						sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
					}
					var sourObj = { //洗牙服务具体名称
						'1': '微保专享洗牙套餐券',
						'2': '微保专属涂氟',
						'3': '微保专享洗牙套餐、涂氟',
						'4': '微保专属窝沟封闭',
						'5': '微保专享洗牙套餐、窝沟封闭',
						'6': '微保专享窝沟封闭或涂氟',
						'7': '微保专享洗牙套餐、窝沟封闭或涂氟'
					};
					that.source ? that.source : that.source = '1';
					var soukey = that.source;
					__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(sourObj, function (soukey, val) {
						that.objKey = sourObj['1'];
					});
				}
			});
		}
	}
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_wxConfig_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








const api = new __WEBPACK_IMPORTED_MODULE_6__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			orderMsg: {}, //预约信息查询
			localData: {}, //定位信息对象
			phone: "", //机构手机号
			orderId: "",
			policyNo: '', //保单号
			endTime: '', //结束时间
			inTime: '',
			back_f: true, //物理返回
			orendate: '',
			orgid: '', //机构id，hospitalId
			shengname: '', //城市名
			lon: '', //经度
			lat: '', //weidu
			phones: '', //客服电话
			enddate: '', //结束时间
			locatimes: '', //本地时间
			ordertime: '', //预约时间
			istel: false,
			isTime: '',
			isDoTime: '',
			isordert: false,
			source: '',
			objKey: '',
			userId: '',
			clo: ''
		};
	},
	beforeCreate() {
		document.title = '齿科预约';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		var back_ticketURI = sessionStorage.getItem('back_ticketURI');
		var toMap = sessionStorage.getItem('toMap') || "";
		if (toMap) toMap = JSON.parse(toMap);
		//	      	 alert("toMap"+toMap+"---back_ticketURI:"+back_ticketURI);
		if (back_ticketURI) {
			//返回卡券标记
			var clo, dis;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-msgbox-wrapper') ? clo = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mint-msgbox-wrapper').length : "";
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mint-msgbox") ? dis = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".mint-msgbox").css("display") : "";
			if (dis == 'block' && clo == '1') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.v-modal,.mint-msgbox').hide();
				next(false);
				return;
			} else {
				back_ticketURI = JSON.parse(back_ticketURI);
				if (back_ticketURI == '1' || back_ticketURI == '0' && toMap == '1') {
					//返回卡券
					next(false);
					//			            if(back_ticketURI=='1')sessionStorage.setItem('back_ticketURI','0');
					//						wx.ready(function() {WeixinJSBridge.call('closeWindow');}
					__WEBPACK_IMPORTED_MODULE_1__assets_js_wxConfig_js__["a" /* tkWX */].closeWindow();
				} else {
					next();
				}
			}
		} else {
			next();
		}
	},

	mounted() {
		this.onLoading(); //接口交互
		//this.location();
		var _this = this;
		__WEBPACK_IMPORTED_MODULE_1__assets_js_wxConfig_js__["a" /* tkWX */].init({});
		//			setInterval(function(){/***每1分钟发生一次请求 **/
		////				console.log(_this.timeOut)
		//				_this.timeOut();
		//			},60000);		
	},
	methods: {
		location: function () {
			// 定位信息 
			var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
			if (qqlocation && qqlocation.yesOrNo == 1) {
				var t = qqlocation.time;
				var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
				if (outtime) {
					sessionStorage.removeItem('ifGetLocation');
				} else {
					this.localData = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
					//							return;
				}
			}
			var _this = this;
			var ifGetLocation = {};
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
					if (__WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__["a" /* config_param */].isLog) console.log("------------成功--------------");
					_this.localData = data;
					ifGetLocation = { "yesOrNo": 1, "data1": data, "time": new Date().getTime() };
					sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
				}, function () {
					if (__WEBPACK_IMPORTED_MODULE_5__assets_js_config_param_js__["a" /* config_param */].isLog) console.log("-----定位失败-----");
					sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 }));
				});
			});
		},
		toPage: function () {
			var start = { "lon": this.lon, "lat": this.lat, "addr": "" };
			var dest = { "eword": this.orderMsg.orgName, "epointx": this.lon, "epointy": this.lat, 'address': this.orderMsg.orgAddress //机构地址
			};var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(dest.address) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
			sessionStorage.setItem('back_ticketURI', '0');
			var u = navigator.userAgent;
			if (u.indexOf('iPhone') > -1) {
				//苹果手机
				sessionStorage.setItem('toMap', '1');
				window.location.href = url;
			} else {
				sessionStorage.setItem('mapRouter', JSON.stringify({ 'toMap': '1', 'toMapURI': url, 'title': '齿科预约', 'backURI': window.location.href }));
				window.location.href = '#/common/toMapEmpty';
			}
		},
		timeOut: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId; //||'15785';
			this.policyNo = parseUrl.policyNo;
			var channel = parseUrl.channelType;
			var cpnTicketNo = parseUrl.cpnTicketNo;
			var userId = parseUrl.userId;
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel
			};
			var parResult = api.timeoutOrderState(param);
			parResult.then(function (res) {
				var orderState = res.data.data.orderState;
				if (res.data.status == "1") {
					if (orderState == that.omstate) {
						return;
					} else {
						that.onLoading();
					}
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
				}
			});
		},
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			this.policyNo = parseUrl.policyNo;
			var channel = parseUrl.channelType;
			var cpnTicketNo = parseUrl.cpnTicketNo;
			var wesurePolicyNo = parseUrl.wesurePolicyNo;
			that.isTime = JSON.parse(sessionStorage.getItem("isOrder"));
			var param = {
				"orderId": that.orderId, //截取URL
				"channelType": channel
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					that.orderMsg = data.data;
					that.orgid = that.orderMsg.orgId;
					that.userId = that.orderMsg.userId;
					that.userId ? that.userId : that.userId = parseUrl.userId;
					that.source = that.orderMsg.serviceType; //预约时的服务
					//						that.source = '7'
					that.isDoTime = that.orderMsg.isDoBusinessTime;
					var omstate = that.orderMsg.orderState;
					if (omstate == "4") {
						//已确认预约
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt1").addClass("orders");
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt2").addClass("orders");
					} else if (omstate == "0") {
						//已提交申请
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".order_txt1").addClass("orders");
					} else if (omstate == "3" || omstate == "1") {
						//已完成
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/common/enterRoute?page=user/evalFill&orderId=' + that.orderId + '&policyNo=' + that.policyNo + '&channelType=' + channel + '&cpnTicketNo=' + cpnTicketNo + '&userId=' + that.userId;
					} else if (omstate == "5") {
						//已爽约
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/common/enterRoute?page=user/unorder&orderId=' + that.orderId;
					} else if (omstate == "2") {
						//已取消预约
						sessionStorage.setItem('back_ticketURI', '0');
						window.location.href = '#/common/enterRoute?page=order/toOrder&orderId=' + that.orderId + '&policyNo=' + that.policyNo + '&channelType=' + channel + '&cpnTicketNo=' + cpnTicketNo + '&wesurePolicyNo=' + wesurePolicyNo;
					}
					that.endTime = that.orderMsg.encounterDate + " " + that.orderMsg.beginTime + ":00";
					that.enddate = that.orderMsg.encounterDate;
					var phone = that.orderMsg.contactTel;
					that.phones = phone.split(",");
					that.phones.length <= 1 ? that.phone = "tel:" + that.orderMsg.contactTel : that.phone = that.orderMsg.contactTel;
					var locatime = new Date().toLocaleDateString();
					that.locatimes = locatime.replace(/\//g, "");
					that.ordertime = that.orderMsg.encounterDate.replace(/\-/g, "");
					that.orendate = that.orderMsg.encounterDate.replace(/\-/g, ".");
					that.cityname(); //调用城市接口，获取经纬度
					that.isTime && !that.isDoTime ? that.isordert = true : that.isordert = false;
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".call-btn1").click(function () {
						that.isordert = false;
						JSON.parse(sessionStorage.removeItem("isOrder"));
					});
					var sourObj = {
						'1': '微保专享洗牙套餐券',
						'2': '微医保专属涂氟',
						'3': '微保专享洗牙套餐、涂氟',
						'4': '微医保专属窝沟封闭',
						'5': '微保专享洗牙套餐、窝沟封闭',
						'6': '微医保专属窝沟封闭或涂氟',
						'7': '微保专享洗牙套餐、窝沟封闭或涂氟'
					};
					that.source ? that.source : that.source = '1';
					var soukey = that.source;
					__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(sourObj, function (soukey, val) {
						that.objKey = sourObj['1'];
					});
				} else {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
				}
			});
		},
		orderClick: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.v-modal,.mint-msgbox').show();
			var that = this;
			if (that.locatimes != that.ordertime) {
				var ts = '';
				var orState = that.orderMsg.orderState;
				if (orState == "0") {
					ts = '即将完成预约,请确认操作';
				} else if (orState == "4") {
					ts = '确定取消预约';
				}
				__WEBPACK_IMPORTED_MODULE_3_mint_ui__["MessageBox"].confirm('', {
					message: ts,
					title: '',
					confirmButtonText: '我再想想',
					cancelButtonText: '取消预约'
				}).then(action => {}, action => {

					var link = window.location.href;
					var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
					this.orderId = parseUrl.orderId;
					var orderIds = parseUrl.orderId;
					this.policyNo = parseUrl.policyNo;
					var channelType = parseUrl.channelType;
					var cpnTicketNo = parseUrl.cpnTicketNo;
					var wesurePolicyNo = parseUrl.wesurePolicyNo;
					var param = {
						"cancelReason": "",
						"hospitalId": that.orderMsg.orgId,
						"orderId": this.orderId, //截取URL中的orderId
						"cpnTicketNo": cpnTicketNo,
						"policyNo": this.policyNo
					};
					var parResult = api.cancelOrder(param);
					parResult.then(function (res) {
						var data = res.data;
						if (data.status == "1") {
							that.back_f = false;
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])({
								className: 'eval_btntxt',
								message: '取消成功',
								iconClass: 'eval_succ',
								position: 'middle',
								duration: 1000
							});
							setTimeout(function () {
								var toMap = sessionStorage.getItem('toMap') || "";
								var back_ticketURI = sessionStorage.getItem('back_ticketURI');
								if (toMap) toMap = JSON.parse(toMap);
								if (toMap == '1') sessionStorage.setItem('toMap', '0');
								if (back_ticketURI == '1') sessionStorage.setItem('back_ticketURI', '0');
								window.location.href = '#/order/toOrder?orderId=' + orderIds + '&policyNo=' + that.policyNo + '&channelType=' + channelType + '&cpnTicketNo=' + cpnTicketNo + '&wesurePolicyNo=' + wesurePolicyNo;
							}, 1000);
						} else {
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_mint_ui__["Toast"])(data.message);
						}
					});
				});
			}
		},
		cityname: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			var channel = parseUrl.channelType;
			var param = {
				"hospitalId": that.orgid, //截取URL
				"channelType": channel
			};
			var parResult = api.hospitalInCity(param);
			parResult.then(function (res) {
				var cityDate = res.data;
				that.shengname = cityDate.shengName;
				if (cityDate.hospitalLongitudeLatitude && cityDate.hospitalLongitudeLatitude.length) {
					that.lon = cityDate.hospitalLongitudeLatitude.split(",")[0]; // 终点经度
					that.lat = cityDate.hospitalLongitudeLatitude.split(",")[1]; // 终点纬度
				} else {
					that.lon = "";that.lat = "";
				}
			});
		},
		telphone: function () {
			this.istel = true;
			this.phones = this.phone.split(",");
			this.phones = this.phone.split(",");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.telmodal').parent().css("width", "100%");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal").html("");
			for (var i = 0; i < this.phones.length; i++) {
				var telphone = "tel:" + this.phones[i];
				var aht = '<a href=' + telphone + ' class="adisplay">' + this.phones[i] + '</a>';
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal").append(aht);
			}
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal a:last-child").after('<a class="adisplay teldis">取消</a>');
			var _this = this;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".telmodal a").click(function () {
				_this.istel = false;
			});
		}
	}
});

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_5__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			popupVisible: false, //大图预览弹层
			distance: '', //定位距离
			avgQuality: '0', //评分
			hosInfo: {}, //门诊详情
			hosVal: '', //评价列表
			serInfo: [], //服务详情
			imgSrc: '', //门诊图片地址
			isOrder: true,
			localMsg: '', //定位信息
			config_param: __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */],
			topStatus: '', // loadmore状态
			allLoaded: false, // loadmore是否加载
			pageIndex: 0, // 当前页码
			items: [], // 页面展示数组
			results: [], // 查询结果数组
			status: '', // 查询结果状态
			avg_evaluate: '4.6',
			fills: [], // 图片src数组
			errImg: "/#/assets/images/user/onerror.png",
			fillsrc: [],
			hanindex: '',
			mintleng: '',
			indexnow: 0,
			isshow: false //大图预览前先清空swipe组件
		};
	},
	beforeCreate() {
		document.title = '门诊详情';
	},
	beforeRouteLeave: (to, from, next) => {
		var pic = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix') ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').css("display") : "";
		var remind = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.div_remind') ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.div_remind').css("display") : "";
		if (pic && pic != 'none') {
			//关闭弹出层 &&diswrap=='block'
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
			next(false);
			document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
		} else if (remind && remind != 'none') {
			//关闭弹出层 
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.remind_modal,.div_remind').hide();
			next(false);
			document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
		} else {
			var mapRouter = sessionStorage.getItem('mapRouter') || "";
			var toMap = "";
			if (mapRouter) {
				mapRouter = JSON.parse(mapRouter);toMap = mapRouter.toMap;
			}
			if (toMap == '0') {
				//此情况为从地图返回
				sessionStorage.removeItem('mapRouter');
				console.log(history);
				//		  		this.$router.back(-3);
				history.go(-2);
				next(false);
			} else {
				next();
			}
		}
	},
	mounted() {
		this.addActive(); //默认显示评价模块
		this.addTap();
		//this.locationSession();//查看是否有未过期的缓存定位信息
		this.init();
		this.showBigPic();
	},
	methods: {
		handleChange: function (index) {
			//发生事件
			this.hanindex = index + 1;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.hindex').text(this.hanindex);
		},
		remind() {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".remind_modal").css('display', 'block');
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".div_remind").css('display', 'block');
			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.remind_modal').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.remind_modal').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".div_remind").hide();
			});
		},
		init: function () {
			var orderInfo = sessionStorage.getItem('orderInfo');
			orderInfo = JSON.parse(orderInfo);
			//console.log(orderInfo);
			this.orderInfo = orderInfo; //  获取ordersession对象
			var doctorId = orderInfo.doctorId; //获取医生Id
			var hospitalId = orderInfo.hospitalId; //获取医院Id		
			if (orderInfo.ifOrder) {
				this.isOrder = false; //隐藏立即预约按钮
			}
			if (orderInfo.distance) {
				this.distance = orderInfo.distance;
			}; //获取定位距离										 
			var param = {
				"retrieveArgs": {
					"currentPage": "1",
					"hospitalId": hospitalId,
					"hospitalName": "",
					"latiude": "",
					"longitude": "",
					"provCode": "",
					"rowsPerPage": "1"
				}
			};
			var param_v = { "doctorId": doctorId, "orgId": hospitalId };
			this.fillInfo(param); //调取门诊信息接口    	
			this.fillValue(param_v); //调取评价列表接口
			this.errImg = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#hidden_src').attr('src');
		},
		addActive: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "none");
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "block");
		},
		addTap: function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap1").click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).addClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap2").removeClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "block");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "none");
			});
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap2").click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).addClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".shop_tap1").removeClass("active");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t2").css("display", "block");
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()("#shop_t1").css("display", "none");
			});
		},
		//大图浏览当前图片
		showBigPic() {
			var that = this;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2').on('click', '.debody_img img', function () {
				that.isshow = false; //大图预览前先清空swipe组件
				//点击时给当前图片索引值赋值
				that.indexnow = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).parents('.img_over').attr('data-i'));
				//					$('.pic_fix img').attr('src',$(this).attr('src'));
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').show();
				//获得点击图片所在行的所有图片
				var imgs = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).parents('.debody_img').find('img');
				var len = imgs.length;
				var i = 0;
				var imgarr = [];
				imgs.each(function () {
					i++;
					var src = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src');
					imgarr.push(src);
				});
				that.fillsrc = imgarr;
				setTimeout(function () {
					that.isshow = true; //显示swipe组件
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.hindex').text(that.indexnow + 1);
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.mintleng').text(len);
				}, 10);
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
			});
			//结束大图浏览
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.cha').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				that.isshow = false;
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
		},
		// 填充页面
		fillInfo(param) {
			var that = this;
			let response = api.getOrgListBySolr(param); // 调后台方法,与门诊列表统一接口后
			response.then(function (res) {
				var data = res.data;
				console.log(data);
				if (data.status == '1') {
					var dataInfo = data.hospitalsBySolrResponseVoList[0];
					that.hosInfo = dataInfo;
					setTimeout(function () {
						var h = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.b_address').height();
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.dh_img').height(h);
					}, 10);
					if (dataInfo.distance) {
						that.distance = dataInfo.distance;
					}; //获取距离
					if (dataInfo.avgQuality) {
						that.avgQuality = dataInfo.avgQuality;
					}; //获取评分	
					//调取图片接口
					if (!(dataInfo.hospitalImgId && dataInfo.hospitalId)) {
						return;
					}
					var pictureId = dataInfo.hospitalImgId;
					var hospitalId = dataInfo.hospitalId;
					var p = { "hospitalId": hospitalId, "pictureId": pictureId };
					//console.log("++++图片入参+++++");
					//console.log(p);	            	        		
					let response = api.getPicture(p); // 调后台方法获取门诊图片
					response.then(function (res) {
						var data = res.data;
						//console.log(data);
						if (data.status == '1') {
							that.imgSrc = data.picture;
						} else {
							if (data.message) {
								// 未成功返回数据Toast提示
								console.log(data.message);
							} else {
								console.log('发生内部错误');
							}
						}
					}).catch(function (err) {
						//			        	window.location.replace("#/common/errorPage");
					});
				} else {
					window.location.replace("#/common/errorPage"); //跳转至错误页面
					if (data.message) {
						// 未成功返回数据Toast提示
						console.log(data.message);
					} else {
						console.log('发生内部错误');
					}
				}
			}).catch(function (err) {
				//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
			});
		},
		// 渲染评价列表
		fillValue(param_v) {
			var that = this;
			that.allLoaded = false;
			that.pageIndex = 0;
			//console.log(param_v);
			let response = api.selectValuation(param_v); // 调后台方法
			response.then(function (res) {
				var data = res.data;
				//	      console.log(data);
				that.status = data.status; // 请求返回的状态
				if (data.status == '1') {
					//	            that.hosVal=data.selectValuationResponseVoList;
					var allArr = data.selectValuationResponseVoList;
					console.log(allArr);
					var deimg_w, deimg_h;
					var len = allArr.length;
					for (var i = 0; i < len; i++) {
						var imgobj = allArr[i].fileArray;
						if (imgobj != null) {
							for (var j = 0; j < imgobj.length; j++) {
								imgobj[j].fileResourceId ? that.fileId = imgobj[j].fileResourceId : allArr[i].fileArray[j] = [];
								if (that.fileId != null) {
									var src_url = __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/common/' + that.fileId + '/default';
									allArr[i].fileArray[j].fills = src_url;
									var deimg = new Image();
									deimg.src = src_url;
									var src = "";
									//                    deimg.onerror=function(){
									//                    	console.log(that.errImg);
									//                    	deimg.src=that.errImg;
									//                    	allArr[i].fileArray[j].fillsrc=that.errImg;
									//                    }
									deimg.onload = function () {
										var out_hei = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.img_sre').height();
										var out_wid = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.img_sre').width();
										__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2 .img_over img').css({ 'max-width': 'none' });
										__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#shop_t2 .img_over img'), function (i, n) {
											deimg_w = n.naturalWidth; //naturalWidth
											deimg_h = n.naturalHeight; //naturalHeight
											if (deimg_w > deimg_h) {
												n.style.width = 'auto';n.style.height = '100%';
												var img_wh = deimg_h / out_hei;
												var dewidth = deimg_w / img_wh;
												var dewh = '-' + (dewidth - out_wid) / 2 + 'px';
												n.style.left = dewh;
											} else {
												n.style.width = '100%';n.style.height = 'auto';
												var img_wh = deimg_w / out_wid;
												var deheight = deimg_h / img_wh;
												var dewh = '-' + (deheight - out_hei) / 2 + 'px';
												n.style.top = dewh;
											}
										});
									};

									//                    deimg.onerror = function(){//错误
									//                    	src_url=that.errImg;
									//                    }
									//                    deimg.oncomplete=function(){
									//                    	allArr[i].fileArray[j].fillsrc=src_url;
									////                    }
								}
							}
						}
					}
					that.hosVal = allArr;
					that.results = that.sliceArr(that.hosVal, 10); // 分割数据
					that.items = that.results[0]; // 页面展示分割后的第一条数据	         		
				} else {
					if (data.message) {
						// 未成功返回数据Toast提示
						console.log(data.message);
					} else {
						console.log('发生内部错误');
					}
				}
			}).catch(function (err) {
				//	        	window.location.replace("#/common/errorPage");//跳转至错误页面
			});
		},
		// 分割大数组
		sliceArr: function (array, size) {
			var result = [];
			for (var x = 0; x < Math.ceil(array.length / size); x++) {
				var start = x * size;
				var end = start + size;
				result.push(array.slice(start, end));
			}
			return result;
		},
		// 上拉加载方法
		//	      loadBottom:function(){
		//	        if(this.results.length ===1){// 若数据已全部获取完毕
		//	          Toast({message:'没有更多了',duration: 1000});
		//	        }else{
		//	          if(this.pageIndex == this.results.length-1){
		//	          	this.allLoaded = true;
		//	          	Toast({message:'没有更多了',duration: 1000});
		//	          }else{
		//	          	//this.items.push.apply(this.items,this.results[++this.pageIndex]);
		//		         this.items = (this.items).concat(this.results[++this.pageIndex]);
		//	          }	          
		//	        }
		//	        this.$refs.loadmore.onBottomLoaded();
		//	      },
		goOrder: function () {
			sessionStorage.removeItem('mapRouter');
			window.location.href = "#/order/toOrder";
		},
		locationSession: function () {
			// 定位信息 
			var qqlocation = JSON.parse(sessionStorage.getItem('ifGetLocation'));
			if (qqlocation && qqlocation.yesOrNo == 1) {
				var t = qqlocation.time;
				var outtime = new Date().getTime() - t > 600000 ? true : false; //数据缓存10分钟  10*60*1000 1800000
				if (outtime) {
					//若超时，删除session信息
					sessionStorage.removeItem('ifGetLocation');
					this.location();
				} else {
					//若不超时，读取session信息
					this.localMsg = JSON.parse(sessionStorage.getItem('ifGetLocation')).data;
				}
			}
		},
		// 重新定位
		location: function () {
			var _this = this;
			var ifGetLocation = {};
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__assets_js_BaseJS_js__["b" /* requeryUsJS */])('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js', function () {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_getLocation_js__["a" /* getPosition */])(function (data) {
					console.log("------------成功--------------");
					_this.localMsg = data;
					_this.orderInfo.localFlag = true;
					ifGetLocation = { "yesOrNo": 1, "data": data, "time": new Date().getTime() };
					sessionStorage.setItem('ifGetLocation', JSON.stringify(ifGetLocation));
				}, function () {
					console.log("-----定位失败-----");
					sessionStorage.setItem('ifGetLocation', JSON.stringify({ "YoN": 2 }));
				});
			});
		},
		topage: function () {
			//腾讯地图接口
			//if(!this.localMsg)return Toast('没有获得门店地址信息');
			var lat = "",
			    lon = "";
			if (this.localMsg) {
				lat = this.localMsg.lat;
				lon = this.localMsg.lon;
			}
			var start = { "lat": lat, "lon": lon, "addr": "" };
			var end = this.hosInfo.hospitalLongitudeLatitude.split(",");
			var x = end[0],
			    y = end[1];
			var dest = { "eword": this.hosInfo.hospitalName, "epointx": x, "epointy": y };
			var addr = this.hosInfo.hospitalAddr;
			var url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + dest.epointy + "," + dest.epointx + ";title:" + encodeURIComponent(dest.eword) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
			var u = navigator.userAgent;
			if (u.indexOf('iPhone') > -1) {
				//苹果手机
				window.location.href = url;
			} else {
				sessionStorage.setItem('mapRouter', JSON.stringify({ 'toMap': '1', 'toMapURI': url, 'title': '门诊详情', 'backURI': window.location.href }));
				window.location.href = '#/common/toMapEmpty';
			}
		}
	}
});

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_API__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_config_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_mint_ui__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







const api = new __WEBPACK_IMPORTED_MODULE_2__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			teethMsg: {},
			orderId: '',
			teethId: '',
			keyId: '',
			urlImg: '', //图片地址z
			//				remark:'',
			big: ''
		};
	},
	beforeCreate() {
		document.title = '口腔全景图';
	},
	beforeRouteLeave: (to, from, next) => {
		if (sessionStorage.getItem('back_ticketURI')) {
			//返回卡券标记
			var pic = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').css("display");
			if (pic != 'none') {
				//关闭弹出层 &&diswrap=='block'
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').show();
				next(false);
				sessionStorage.setItem('back_ticketURI', '0');
			} else {
				next();
			}
		} else {
			next();
		}
	},
	mounted() {
		this.teethLoading();
		this.optImg();
	},
	methods: {
		teethLoading: function () {
			var that = this;
			var orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
			that.orderId = orderInfo.orderId;
			var remark = orderInfo.remark;
			var uploadFlag = orderInfo.uploadFlag;
			var param = {
				"orderId": that.orderId //截取URL中的orderId
			};
			var parResult = api.fileList(param);
			parResult.then(function (res) {
				var data = res.data;
				if (data.status == "1") {
					that.teethMsg = data.tpflrvList;
					if (uploadFlag == 0) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
					} else if (uploadFlag == 1) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "none");
						for (var j = 0; j < that.teethMsg.length; j++) {
							var abc = that.teethMsg[j];
							that.teethId = abc.fileId;
							that.urlImg = __WEBPACK_IMPORTED_MODULE_4__assets_js_config_param__["a" /* config_param */].base_path + '/webApp/ecm/taiYiYun/' + that.teethId;
							var arrImg = api.imgArr(that.urlImg);
							arrImg.then(function (res) {
								var teethimg = "";
								var datas = res.data;
								for (var k = 0; k < datas.length; k++) {
									teethimg += "<img class='otherimg' src='" + that.urlImg + '/' + datas[k] + "' />";
								}
								setTimeout(function () {
									__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".teethim_img").append(teethimg);
								}, 30);
							});
						}
					} else if (uploadFlag == 2) {
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
						__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".give_up").show();
					}
				} else {
					__WEBPACK_IMPORTED_MODULE_0_jquery___default()(".noimg").css("display", "block");
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_mint_ui__["Toast"])(data.message);
				}
			});
		},
		optImg: function () {
			var t = this;
			//大图浏览当前图片
			var currOptImg;
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').on('click', '.teethim_context .otherimg', function () {
				//
				//					t.big = true;
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
				currOptImg = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix img').attr('src', __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src'));
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').show();
			});
			//结束大图浏览
			//				$('.pic_fix').not($('.upload_pic .del_ico')).click(function(){
			////					t.big = false;
			//					$('.pic_fix').hide();
			//					$('.others').show();
			//				});
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.chahead').click(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.pic_fix').hide();
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.others').show();
				document.getElementById('meta').setAttribute('content', "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
			});
		}
		/*hide_this:function(event){
  	event.cancelBubble = true; 
  	alert('11')
  	var t=this;//event.currentTarget
  	//alert(event.path[0]);
  	alert(event.currentTarget);
  	console.log(event.currentTarget);
  	
  	var isImg=$(event.currentTarget).hasClass('otherimg');
  	alert(isImg);
  	alert($(event.currentTarget).parent('.pic_fix').length);
  	if(isImg){
  		
  	}else{
  //	    			history.go('-1');
  t.big = false;
  $('.pic_fix').hide();
  $('.others').show();
  	}
  }*/

	}
});

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_config_param__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_API__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






const api = new __WEBPACK_IMPORTED_MODULE_4__api_API__["a" /* default */]();
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			unorderMsg: {},
			orderId: "",
			unedate: '',
			source: '',
			objKey: ''
		};
	},
	beforeCreate() {
		document.title = '齿科预约';sessionStorage.setItem('back_ticketURI', '1');
	},
	beforeRouteLeave: (to, from, next) => {
		//      alert('back'+sessionStorage.getItem('back_ticketURI'));
		if (sessionStorage.getItem('back_ticketURI')) {
			//返回卡券标记
			let back_ticketURI = JSON.parse(sessionStorage.getItem('back_ticketURI'));
			if (back_ticketURI == '1') {
				//返回卡券
				next(false);
				sessionStorage.setItem('back_ticketURI', '0');
				//	              window.location.href=config_param.ticketURI;
				WeixinJSBridge.call('closeWindow');
			} else {
				next();
			}
		} else {
			next();
		}
	},

	mounted() {
		this.onLoading(); //接口交互
	},
	methods: {
		onLoading: function () {
			var that = this;
			var link = window.location.href;
			var parseUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__assets_js_BaseJS_js__["a" /* getUrl */])(link);
			that.orderId = parseUrl.orderId;
			var param = {
				"orderId": that.orderId //截取URL
			};
			var parResult = api.selectOrder(param);
			parResult.then(function (res) {
				var data = res.data;
				that.unorderMsg = data.data;
				that.unedate = that.unorderMsg.encounterDate.replace(/\-/g, ".");
				that.source = that.unorderMsg.serviceType; //预约时的服务
				var sourObj = {
					'1': '微保专享洗牙套餐券',
					'2': '微医保专属涂氟',
					'3': '微保专享洗牙套餐、涂氟',
					'4': '微医保专属窝沟封闭',
					'5': '微保专享洗牙套餐、窝沟封闭',
					'6': '微医保专属窝沟封闭或涂氟',
					'7': '微保专享洗牙套餐、窝沟封闭或涂氟'
				};
				that.source ? that.source : that.source = '1';
				var soukey = that.source;
				__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(sourObj, function (soukey, val) {
					that.objKey = sourObj['1'];
				});
			});
		}
	}
});

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui__);
/**http配置 */
// 引入axios以及element ui中的loading和message组件


// 超时时间
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.timeout = 25000;
// http请求拦截器
var loadinginstace;
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(config => {
   __WEBPACK_IMPORTED_MODULE_1_mint_ui__["Indicator"].open({ text: '加载中...', spinnerType: 'snake' });
   return config;
}, error => {
   __WEBPACK_IMPORTED_MODULE_1_mint_ui__["Indicator"].close();
   __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui__["Toast"])({ message: '请检查您的网络连接并重试', duration: 2000, className: 'mToast' });
   return Promise.reject(error);
});
// http响应拦截器
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.response.use(data => {
   // 响应成功关闭loading
   __WEBPACK_IMPORTED_MODULE_1_mint_ui__["Indicator"].close();
   return data;
}, error => {
   __WEBPACK_IMPORTED_MODULE_1_mint_ui__["Indicator"].close();
   // 	Toast({ message: '加载失败',duration: 2000,className:'mToast'})
   __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui__["Toast"])({ message: '请检查您的网络连接并重试', duration: 2000 });
   return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_axios___default.a);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mint_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui_lib_style_css__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mint_ui_lib_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mint_ui_lib_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_loadmore__ = __webpack_require__(45);
//import 'babel-polyfill'







// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_mint_ui___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_5__components_loadmore__["a" /* default */]);
/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_gx_order_Place__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_gx_order_Place___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_gx_order_Place__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_gx_order_checkStation__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_gx_order_checkStation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_gx_order_checkStation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_gx_order_checkTime__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_gx_order_checkTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_gx_order_checkTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_gx_order_toOrder__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_gx_order_toOrder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_gx_order_toOrder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_gx_order_toPage__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_gx_order_toPage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_gx_order_toPage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_gx_order_agreeServe__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_gx_order_agreeServe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_gx_order_agreeServe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_gx_order_serveContent__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_gx_order_serveContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_gx_order_serveContent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_gx_user_orderDetail__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_gx_user_orderDetail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_gx_user_orderDetail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_gx_user_evalFill__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_gx_user_evalFill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_gx_user_evalFill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_gx_user_shopDetail__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_gx_user_shopDetail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_gx_user_shopDetail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_gx_user_teethImg__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_gx_user_teethImg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_gx_user_teethImg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_gx_user_unorder__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_gx_user_unorder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_gx_user_unorder__);
/*个险渠道的路由配置*/

//order 模块【王云召】








//user 预约信息【徐瑞瑞】

//user 评价填写【徐瑞瑞】

//import gxevalDetail from '@/components/gx/user/evalDetail'
 //门店详情
 //口腔全景
 //爽约

let gxroutes = [
//order 模块【王云召】
{ // 去页面
  path: '/gx/order/toPage',
  name: 'gxtoPage',
  component: __WEBPACK_IMPORTED_MODULE_4__components_gx_order_toPage___default.a
}, { // 选择地点
  path: '/gx/order/Place',
  name: 'gxPlace',
  component: __WEBPACK_IMPORTED_MODULE_0__components_gx_order_Place___default.a
}, { // 选择门诊
  path: '/gx/order/checkStation',
  name: 'gxcheckStation',
  component: __WEBPACK_IMPORTED_MODULE_1__components_gx_order_checkStation___default.a
}, { // 选择日期
  path: '/gx/order/checkTime',
  name: 'gxcheckTime',
  component: __WEBPACK_IMPORTED_MODULE_2__components_gx_order_checkTime___default.a
}, { // 预约信息
  path: '/gx/order/toOrder',
  name: 'gxtoOrder',
  component: __WEBPACK_IMPORTED_MODULE_3__components_gx_order_toOrder___default.a
}, { // 服务内容
  path: '/gx/order/serveContent',
  name: 'serveContent',
  component: __WEBPACK_IMPORTED_MODULE_6__components_gx_order_serveContent___default.a
}, { // 同意服务意向书
  path: '/gx/order/agreeServe',
  name: 'gxagreeServe',
  component: __WEBPACK_IMPORTED_MODULE_5__components_gx_order_agreeServe___default.a
},
//user 预约信息【徐瑞瑞】
{
  path: '/gx/user/orderDetail',
  name: 'gxorderDetail',
  component: __WEBPACK_IMPORTED_MODULE_7__components_gx_user_orderDetail___default.a
},
//user 评价填写【徐瑞瑞】
{
  path: '/gx/user/evalFill',
  name: 'gxevalFill',
  component: __WEBPACK_IMPORTED_MODULE_8__components_gx_user_evalFill___default.a
},
//  {
//    path: '/gx/user/evalDetail',
//    name: 'gxevalDetail',
//    component: gxevalDetail
//  },
//user 门店详情【徐瑞瑞】
{
  path: '/gx/user/shopDetail',
  name: 'gxshopDetail',
  component: __WEBPACK_IMPORTED_MODULE_9__components_gx_user_shopDetail___default.a
},
//user 口腔全景【徐瑞瑞】
{
  path: '/gx/user/teethImg',
  name: 'gxteethImg',
  component: __WEBPACK_IMPORTED_MODULE_10__components_gx_user_teethImg___default.a
},
//user 爽约【徐瑞瑞】
{
  path: '/gx/user/unorder',
  name: 'gxunorder',
  component: __WEBPACK_IMPORTED_MODULE_11__components_gx_user_unorder___default.a
}];

/* harmony default export */ __webpack_exports__["a"] = (gxroutes);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_test_getcurrLocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_test_getcurrLocation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_test_getcurrLocation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_test_uploadImg__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_test_uploadImg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_test_uploadImg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_test_testInterface__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_test_testInterface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_test_testInterface__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_test_testCloseWX__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_test_testCloseWX___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_test_testCloseWX__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_common_errorPage__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_common_errorPage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_common_errorPage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_common_errorPstate__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_common_errorPstate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_common_errorPstate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_common_enterRouter__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_common_enterRouter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_common_enterRouter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_toMapEmpty__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_toMapEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_common_toMapEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_order_Place__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_order_Place___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_order_Place__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_order_checkStation__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_order_checkStation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_order_checkStation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_order_checkTime__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_order_checkTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_order_checkTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_order_toOrder__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_order_toOrder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_order_toOrder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_order_toPage__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_order_toPage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_order_toPage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_order_agreeServe__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_order_agreeServe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_order_agreeServe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_order_serveContent__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_order_serveContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_order_serveContent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_user_orderDetail__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_user_orderDetail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_user_orderDetail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_user_evalFill__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_user_evalFill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_user_evalFill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_user_shopDetail__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_user_shopDetail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_user_shopDetail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_user_teethImg__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_user_teethImg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_user_teethImg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_user_unorder__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_user_unorder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_user_unorder__);
/*微保渠道的路由配置*/

//test 模块【康燕燕】




 //错误页面
 //保单错误页面
 //空白页面
 //接入地图的空白路由

//order 模块【王云召】








//user 预约信息【徐瑞瑞】

//user 评价填写【徐瑞瑞】

//import evalDetail from '@/components/user/evalDetail'
 //门店详情
 //口腔全景
 //爽约

let wbroutes = [{
  path: '/',
  name: 'errorPage',
  component: __WEBPACK_IMPORTED_MODULE_4__components_common_errorPage___default.a
}, {
  path: '/common/errorPage', // 错误页面
  name: 'errorPage',
  component: __WEBPACK_IMPORTED_MODULE_4__components_common_errorPage___default.a
}, {
  path: '/common/errorPstate', // 保单错误页面
  name: 'errorPstate',
  component: __WEBPACK_IMPORTED_MODULE_5__components_common_errorPstate___default.a
}, {
  path: '/common/enterRouter', // 空白页面
  name: 'enterRouter',
  component: __WEBPACK_IMPORTED_MODULE_6__components_common_enterRouter___default.a
}, {
  path: '/common/toMapEmpty', // 接入地图的空白路由
  name: 'toMapEmpty',
  component: __WEBPACK_IMPORTED_MODULE_7__components_common_toMapEmpty___default.a
}, { //test 模块【康燕燕】 getcurrLocation
  path: '/test/getcurrLocation',
  name: 'getcurrLocation',
  component: __WEBPACK_IMPORTED_MODULE_0__components_test_getcurrLocation___default.a
}, //test 模块【康燕燕】 uploadImg
{
  path: '/test/uploadImg',
  name: 'uploadImg',
  component: __WEBPACK_IMPORTED_MODULE_1__components_test_uploadImg___default.a
}, {
  path: '/test/testInterface',
  name: 'testInterface',
  component: __WEBPACK_IMPORTED_MODULE_2__components_test_testInterface___default.a
}, {
  path: '/test/testCloseWX',
  name: 'testCloseWX',
  component: __WEBPACK_IMPORTED_MODULE_3__components_test_testCloseWX___default.a
},
//order 模块【王云召】
{ // 去页面
  path: '/order/toPage',
  name: 'toPage',
  component: __WEBPACK_IMPORTED_MODULE_12__components_order_toPage___default.a
}, { // 选择地点
  path: '/order/Place',
  name: 'Place',
  component: __WEBPACK_IMPORTED_MODULE_8__components_order_Place___default.a
}, { // 选择门诊
  path: '/order/checkStation',
  name: 'checkStation',
  component: __WEBPACK_IMPORTED_MODULE_9__components_order_checkStation___default.a
}, { // 选择日期
  path: '/order/checkTime',
  name: 'checkTime',
  component: __WEBPACK_IMPORTED_MODULE_10__components_order_checkTime___default.a
}, { // 服务内容
  path: '/order/serveContent',
  name: 'serveContent',
  component: __WEBPACK_IMPORTED_MODULE_14__components_order_serveContent___default.a
}, { // 同意服务意向书
  path: '/order/agreeServe',
  name: 'agreeServe',
  component: __WEBPACK_IMPORTED_MODULE_13__components_order_agreeServe___default.a
}, { // 预约信息
  path: '/order/toOrder',
  name: 'toOrder',
  component: __WEBPACK_IMPORTED_MODULE_11__components_order_toOrder___default.a
},
//user 预约信息【徐瑞瑞】
{
  path: '/user/orderDetail',
  name: 'orderDetail',
  component: __WEBPACK_IMPORTED_MODULE_15__components_user_orderDetail___default.a
},
//user 评价填写【徐瑞瑞】
{
  path: '/user/evalFill',
  name: 'evalFill',
  component: __WEBPACK_IMPORTED_MODULE_16__components_user_evalFill___default.a
},
//  {
//    path: '/user/evalDetail',
//    name: 'evalDetail',
//    component: evalDetail
//  },
//user 门店详情【徐瑞瑞】
{
  path: '/user/shopDetail',
  name: 'shopDetail',
  component: __WEBPACK_IMPORTED_MODULE_17__components_user_shopDetail___default.a
},
//user 口腔全景【徐瑞瑞】
{
  path: '/user/teethImg',
  name: 'teethImg',
  component: __WEBPACK_IMPORTED_MODULE_18__components_user_teethImg___default.a
},
//user 爽约【徐瑞瑞】
{
  path: '/user/unorder',
  name: 'unorder',
  component: __WEBPACK_IMPORTED_MODULE_19__components_user_unorder___default.a
}];

/* harmony default export */ __webpack_exports__["a"] = (wbroutes);

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 123 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 124 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 132 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/error.a6b4eb7.png";

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAADcCAMAAAAY7tR3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowYjM5MzFiMS0wNDI0LTQ3ZTQtOTA4NS1jNjhiOWMyYTlhNTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJDQTY5NDRDRTYzMTFFN0FEQUE5RTI0OUJBRkM0MUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJDQTY5NDNDRTYzMTFFN0FEQUE5RTI0OUJBRkM0MUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzFhM2QwNWEtODcwNC1hYTQ5LTk1MDAtOTQ1Yzk3YjMzZDg2IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZmU5OGI0M2UtYjg4ZC0xMWU3LTgzZjctY2QxZTYyNTlhZWJlIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+C7zyigAAAAZQTFRFzc3N////nQ2IBgAAAAJ0Uk5T/wDltzBKAAAE20lEQVR42uzd0ZqaOhSA0fD+L92rtsgkSBwMyd7rv/Kox4+SBRMQtWzqrjycEfh45KyC1bADj3sq7LzjPlJ79kXAPRH3ObY5Y4F7Cu3TLAbutPOOO+73L4nhwD0LMrt33DMZwx33RMRwxz0Xd2OH+0jue3Iv/EZQxB33ocL2b2/+vF1wxz0Q95fLV1q3ccc9Hvca/YI77rjjjjvuuONu7o477lNwb56ZGXOBLu64Dxa2/+/X20POu1/5xJPPP+EeYYeKO+644457UO5GBHfchTvuwh133IU77lYW7rin4j5VRgR33IU77sLd3B134Y67lYU77rhbGNxxxx133HHHHXfccccdd9wJa3xO3HtSuGfg7j1Y3PNwd8kB7rm4v322ocY9C3dHtrjjjrtwx124456Y+8Mf6HCointi7u2zjs5E4h6L+9Z8rvPuuIebuze90457RO418IN+WAF33B9fmL/cDRvuuOOuQNxNZnDPwL11qOoiSdzjcS893AvuWpl7RTLvuJ/tFU9+z2sJ7l3/ZtxxX5r7qn+ucMe9k2rnEuKulefuuOP+JWFTXSKGO+4puZu7456Fu0NV3BPN3bffbEC4azHuG+24J+K+0Y57Iu7CHXfhjjvuwh134Y477hYGd9xxxx3325bE1yXhnoK7T1jjPp77UxeHeXMU9zTcGx+8Nji4B+Rewc077kHn7nXZvOMekXvLNe+4B+Xe94BwX5X7CWrecQ/G/ZQ077jjLtzX5f7/5vGGa2hwD8X98GbT8T67d9yDcT/SL7VNQLgH4777LZoNd9yjc9+ql44ZItxjct8ufouecL91/zrqyt/apWEb7rin4G7vjnse7ubuuOc6M1OcmcE9BfeyO/GOO+4xuZeD9v0ieVcV90jct+qevGy44x6c+3wLhzvuX5vNdD4o3Jfj7tNMuGfjXjofEe6LcvdNBLhn4u57ZnDPxL0qm3bcv8/9sR/LfnOHcA/Dfdvf6SuAcQ/O3fe7455m7l4Bb1xwj83dASru+bgbEdxxF+64C3fccRfuuFtZuOOOu4XBHXfccccdd9wnU12/cAV33DNIn/EClcOXihk73G+2PpX4BbZI3New/tETZtoyjSfuVwBdZuaPEO6Lc+/U9jj106cYUtxvRvec9Zu2XdzVQ+8J7NY+7pNO9tf+e4K7xoNnHfcs4O3YcZ8M/KWjy4/MXjoJY4PA/XHwN5wRP/k/nG7HfR7vH7wH1HyNji0JeNzHgK9qPIH69u4L2B86dMad99efxTthV/2B4B9757fYWy9uNHD/+mmYfw9dmlJUZR+urP8Eu3C/mfv5D2hcxlheN5Dajr7nuFi4f417z4z6HfjWxP/KQYJwH4S+b7LT8VLl/Af2DAHuU8zi+/e9zdexjnGfDvwN50XMTnBfBvwtr2Nd4p7Hu3DnXbjzLtyf9G4t4J7Ku4sRcc80n3H1Le5JuQOPe5bpO++4p1qBuOOebG9vJeAu4S7hLuEu4S7hLuEu3CXcJdwl3CXcJdwl3CXcJdwl3CXchbuEu4S7hLuEu4S7hLuEu4S7hLuEu4S7cJdwl3CXcJdwl3CXcJdwl3CXcJdwF+4S7hLuEu4S7hLuEu4S7hLuEu4S7sJdwl3CXcJdwl3CXcJdwl3CXcJdwl24S7hLuEur9keAAQBEJm9YPpWaqAAAAABJRU5ErkJggg=="

/***/ }),
/* 145 */,
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(69),
  /* template */
  __webpack_require__(197),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(121)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(70),
  /* template */
  __webpack_require__(195),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-45d344d0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(127)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(71),
  /* template */
  __webpack_require__(202),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-741f2d22",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(72),
  /* template */
  __webpack_require__(191),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(119)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(73),
  /* template */
  __webpack_require__(193),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-452e48c5",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(107)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(74),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-044fc7d5",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(109)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(75),
  /* template */
  __webpack_require__(182),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0f50041e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(110)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(76),
  /* template */
  __webpack_require__(183),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(130)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(77),
  /* template */
  __webpack_require__(205),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9116f708",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(123)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(78),
  /* template */
  __webpack_require__(198),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(115)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(79),
  /* template */
  __webpack_require__(188),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(111)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(184),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(124)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(81),
  /* template */
  __webpack_require__(199),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(126)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(82),
  /* template */
  __webpack_require__(201),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(113)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(83),
  /* template */
  __webpack_require__(186),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(117)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(84),
  /* template */
  __webpack_require__(190),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(128)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(85),
  /* template */
  __webpack_require__(203),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(125)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(86),
  /* template */
  __webpack_require__(200),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6194e539",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(131)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(87),
  /* template */
  __webpack_require__(206),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9cc6583e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(134)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(88),
  /* template */
  __webpack_require__(209),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c4eb85ac",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(114)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(89),
  /* template */
  __webpack_require__(187),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(120)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(90),
  /* template */
  __webpack_require__(194),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-45aebd88",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(112)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(185),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(133)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(92),
  /* template */
  __webpack_require__(208),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(108)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(93),
  /* template */
  __webpack_require__(181),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0d0f35c6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(118)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(192),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3e95b8b2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(135)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(210),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e3ef7ef2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(122)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(96),
  /* template */
  __webpack_require__(196),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(136)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(211),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(106)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(179),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(137)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(99),
  /* template */
  __webpack_require__(212),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(129)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(100),
  /* template */
  __webpack_require__(204),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(132)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(101),
  /* template */
  __webpack_require__(207),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "orderDetail"
  }, [_c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order1"
  }, [(_vm.orderMsg.orderState == 0) ? _c('img', {
    attrs: {
      "src": __webpack_require__(40),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 4) ? _c('img', {
    attrs: {
      "src": __webpack_require__(41),
      "alt": ""
    }
  }) : _vm._e()]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "middle"
    },
    model: {
      value: (_vm.isordert),
      callback: function($$v) {
        _vm.isordert = $$v
      },
      expression: "isordert"
    }
  }, [_c('div', {
    staticClass: "call-box1"
  }, [_c('div', {
    staticClass: "call-title1"
  }, [_vm._v("温馨提示")]), _vm._v(" "), _c('div', {
    staticClass: "call-text1"
  }, [_vm._v("你在非工作时间申请预约，诊所将于下一个工作日完成处理")]), _vm._v(" "), _c('div', {
    staticClass: "call-btn1"
  }, [_vm._v("\n\t\t          \t我知道了\n\t\t        ")])])]), _vm._v(" "), (_vm.orderMsg.orderState == 0 && !_vm.isDoTime) ? _c('div', {
    staticClass: "order_warn order_warnp"
  }, [_c('img', {
    staticClass: "vtime",
    attrs: {
      "src": __webpack_require__(44),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "out_time"
  }, [_vm._v("你在非工作时间申请预约，诊所将于下一个工作日完成处理")])]) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 0 && _vm.isDoTime) ? _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("已提交预约申请，需要等待30分钟审核时间")])]) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 4) ? _c('div', {
    staticClass: "order_warn warn_content"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "orw_succ"
  }, [_vm._v("预约成功,请按时携带身份证前往门诊使用服务")]), _vm._v(" "), _c('p', {
    staticClass: "order_add"
  }, [_vm._v("逾期将视为自动放弃本服务")])]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_body"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    staticClass: "b_address"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.orderMsg.orgName))]), _vm._v(" "), _c('p', {
    staticClass: "ad_txt"
  }, [_vm._v(_vm._s(_vm.orderMsg.orgAddress))])]), _vm._v(" "), _c('div', {
    staticClass: "b_date"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(18),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "date_txt"
  }, [_vm._v(" " + _vm._s(_vm.orendate) + " \n\t\t\t\t\t"), (_vm.orderMsg.endTime) ? _c('span', [_vm._v(_vm._s(_vm.orderMsg.beginTime + '-' + _vm.orderMsg.endTime))]) : _c('span', [_vm._v(_vm._s(_vm.orderMsg.beginTime))])])]), _vm._v(" "), _c('div', {
    staticClass: "b_name"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(19),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "name_txt"
  }, [_vm._v(_vm._s(_vm.orderMsg.name))])])]), _vm._v(" "), _c('div', {
    staticClass: "order_banner"
  }, [(this.phones.length <= 1) ? _c('a', {
    staticClass: "or_tap1",
    attrs: {
      "href": _vm.phone
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(20),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t客服电话 \n\t\t\t")]) : _c('a', {
    staticClass: "or_tap1",
    on: {
      "click": _vm.telphone
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(20),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t客服电话 \n\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "or_tap2",
    on: {
      "click": function($event) {
        _vm.toPage()
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(43),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t门诊导航\n\t\t\t")]), _vm._v(" "), (this.phones.length > 1) ? _c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.istel),
      callback: function($$v) {
        _vm.istel = $$v
      },
      expression: "istel"
    }
  }, [_c('div', {
    staticClass: "telmodal"
  })]) : _vm._e(), _vm._v(" "), _vm._m(1)], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_num"
  }, [_c('span', [_vm._v("预约编号")]), _vm._v(" "), _c('span', {
    staticClass: "orderid"
  }, [_vm._v(_vm._s(_vm.orderMsg.tradeNo))])]), _vm._v(" "), _c('div'), _vm._v(" "), _c('div', {
    staticClass: "footeror"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.locatimes != _vm.ordertime && _vm.locatimes < _vm.ordertime),
      expression: "locatimes!=ordertime&&locatimes<ordertime"
    }],
    staticClass: "order_btn",
    on: {
      "click": function($event) {
        _vm.orderClick()
      }
    }
  }, [_vm._m(2)]), _vm._v(" "), _c('p', {
    staticClass: "order_footer"
  }, [_vm._v("就诊当日0:00起不支持取消预约")])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "order_txt3"
  }, [_vm._v("已完成")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('img', {
    staticClass: "fenge",
    attrs: {
      "src": __webpack_require__(36)
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "orclick"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(35),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "spanmar"
  }, [_vm._v("取消预约")])])
}]}

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "agreeServe"
  }, [_c('div', {
    staticClass: "textBox",
    staticStyle: {
      "background-color": "#FFFFFF",
      "padding": "0 1.55rem 1.67rem"
    }
  }, [_c('p', {
    staticClass: "bp"
  }, [_c('span', [_vm._v("服务知情同意书")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      泰康人寿保险有限责任公司（以下简称“泰康人寿”）和泰康健康管理（北京）有限公司（以下简称“泰康健康”）通过整合健康医疗服务资源，为用户提供齿科保健服务。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      泰康人寿和泰康健康尊重所有用户的个人信息及隐私权。本“协议”是为尊重及保护所有用户个人信息及隐私所作的承诺，同时说明了泰康人寿和泰康健康对于用户个人信息所采取的收集、保存、使用和保护方式。泰康人寿和泰康健康将根据以下条件和条款为您提供服务，“协议”适用于所有泰康人寿和泰康健康开展的健康服务。请您在注册成为用户前务必仔细阅读并决定是否接受。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n             一、关于使用的资格与隐私安全\n      ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      客户是指购买了泰康人寿保险产品、并获赠齿科保健健康服务的客户。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      在您使用健康服务之前，您应确保自身具备相应民事行为能力，若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，泰康人寿和泰康健康不承担任何责任，且有权放弃健康服务。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      泰康人寿和泰康健康在征得您的同意后，有可能与第三方专业公司进行合作，为您提供更加丰富、实用的健康服务，由此涉及的数据传输风险及个人信息安全问题，若非因泰康人寿和泰康健康造成您的损害，泰康人寿和泰康健康不承担责任。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n      二、关于健康服务以及信息传播的适用范围与版权\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      泰康人寿和泰康健康所承载的具体服务和信息内容（文、图、视频、音频）均以提供有益客户健康的服务为初衷，由于健康服务需求的专业性和个性化特点，泰康人寿和泰康健康服务的内容不能确保对所有客户都能适用，因此不对其适用性做任何形式的保证。针对有个性需求客户的具体健康建议还需咨询医生或相关专业人士。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      鉴于泰康人寿和泰康健康部分资源来源于其他合作方，泰康人寿和泰康健康视为已经取得了上述资源的授权使用许可，如果无意中侵犯了您的著作权，敬请告知，经核实后可在第一时间删除，泰康人寿和泰康健康对此声明有最终解释权。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      标明来源为泰康人寿和泰康健康的资讯（诸如文字、图表、标识、图像、数据等），未经泰康人寿和泰康健康书面授权，任何单位或者个人不得以任何方式全部或部分复制、转载、引用、链接、抓取或者以其他方式使用。一旦发现，将追究相关机构和个人的法律责任。\n      ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n       三、关于在服务中将可能收集的您的信息\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("当您接受齿科保健健康服务时，泰康人寿和泰康健康将在征得您同意的前提下收集您的相关个人资料，以便进行服务。您需要提供相关个人信息、资料，方可完成注册程序。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("齿科保健健康服务中的健康档案功能，将可以提取客户在泰康人寿和泰康健康签约合作医疗机构中的既往健康相关数据，以形成更加完整的个人健康信息档案，方便提供个性化的健康管理方案。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("您的个人信息资料可能在您首次接受健康服务时提供，也可能在以后为您提供健康服务时，根据需要补充提供。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("如您所提供的相关信息、资料发生变更，您应及时更新以使之真实、完整和准确，您的信息是泰康人寿和泰康健康能够根据平台设置正常地为您提供服务的基本前提之一。如有合理理由怀疑您提供的资料错误、不实、过时或不完整，泰康人寿和泰康健康有权向您发出询问及/或要求改正的通知，并有权直接作出删除相应资料的处理，直至终止对您提供部分或全部服务，由此导致您在使用健康服务过程中产生的任何损失或增加的费用，应由您完全独自承担。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康将在必要时由专业技术人员代为对您提供的相关资料进行技术处理及相关完善，以达到服务需求，在此向您告知并征得认可和同意。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("当您通过您的移动设备或其他方式接入以使用泰康人寿和泰康健康的服务时，系统可能会通过cookies、web beacon或其他方式自动采集包括您所使用的设备情况或使用的软件等在内的技术信息。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("在您开启设备具有的定位功能并使用泰康人寿和泰康健康基于位置信息而提供的服务时，泰康人寿和泰康健康将通过GPS或WiFi等方式收集您的地理位置信息。您可以通过关闭定位功能随时停止泰康人寿和泰康健康对您的地理位置信息的收集。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("四、关于您个人信息的后续使用")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康将在服务的过程中对所收集的您的信息用于：")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 对收集到的信息进行系统分析、归类和使用，有针对性地为您提供更优化的服务；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为保证为您提供服务时的安全性，用于对您的身份信息进行验证、进行必要的安全防范和诈骗监控，以及进行必要的存储与备份；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为您设计、向您推荐和提供可能适合您的产品和服务；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 让您参与有关健康服务产品和服务的调查；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 经您许可，由承担同等保密义务的泰康人寿和泰康健康的关联公司或合作的第三方向您提供网络服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("五、关于对您个人信息的保护原则")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("保护您的隐私是泰康人寿和泰康健康的一项基本原则，未经您的许可，泰康人寿和泰康健康保证不对外公开或向第三方提供您的注册资料及您在使用本服务或通过泰康人寿和泰康健康平台进行相关购买活动时存储在本平台的非公开内容，但下列情况除外：")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 事先获得您的明确授权；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 根据有关的法律法规要求；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 按照相关政府主管部门的要求；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为维护社会公众的利益；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为维护泰康人寿和泰康健康的合法权益。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("六、关于对本协议的更改")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康可能会不定期地对本“协议”进行修订。如果本“协议”在用户个人信息政策方面有修改时，会在泰康医生APP齿科服务页面中的显著位置予以提示，或通过电子邮件，或通过根据您所提供之信息中可供联系的相关方式等途径通知您，如果您选择继续使用泰康人寿和泰康健康的服务，则表示您同意接受修订后的协议；如您不同意修改后的协议，您应立即停止使用泰康人寿和泰康健康服务平台。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("您了解并确认，您所提供的个人信息及资料系由您自行输入并提供，由于海量信息的存在，且泰康人寿和泰康健康无法杜绝可能存在的道德等相关风险及瑕疵，您应谨慎判断并确定相关信息的真实性、合法性和有效性。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("七、免责条款")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("任何由于计算机问题、黑客攻击、计算机病毒侵入或发作、电信部门技术管制、政府行为或其他第三人的原因而造成的暂时性关闭等影响泰康人寿和泰康健康正常运行的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，泰康人寿和泰康健康均得免责。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康上如有与其他关联公司或合作的第三方网站网页的链接，均不对其他任何网站的内容、隐私政策或运营，或经营这些网站的主体的行为负责。当您在向这些与泰康人寿和泰康健康链接的网站提供个人信息之前，请查阅它们的隐私政策。 由于与泰康人寿和泰康健康链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果，泰康人寿和泰康健康概不负责，亦不负任何法律责任。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("八、赔偿限额")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康会竭诚为您提供相关服务。但若您认为泰康人寿和泰康健康有任何违约行为或其他违法行为而向泰康人寿和泰康健康提出索赔时，您认可泰康人寿和泰康健康的最高责任限额为不超过相对应的服务费用。泰康人寿和泰康健康对您的任何间接损失不承担责任。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("九、争议管辖")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("因本协议相关或因其引起的争议，均应当使用中华人民共和国法律。因本协议引起的或与其相关的争议均应当由北京仲裁委员会仲裁解决，败诉方应承担包括胜诉方律师费在内的一切仲裁费用。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("泰康人寿和泰康健康有权依据前述协议相关内容或相关法律法规向您提供服务或终止向您提供服务，且无须征得您的另行同意或另行提前通知予您。")])])])
}]}

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "runpage"
  }, [_c('span', [_c('div', {
    staticClass: "linkBlock",
    on: {
      "click": _vm.getLocatPoint
    }
  }, [_vm._v("去获取路线图 ")])])])])
},staticRenderFns: []}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkStation",
    style: ({
      '-webkit-overflow-scrolling': _vm.scrollMode
    })
  }, [_c('div', {
    staticClass: "stationbox  clear searchFix",
    attrs: {
      "id": "showSearchBox"
    }
  }, [(_vm.isFoucus == false) ? _c('span', {
    staticClass: "checkCity left",
    on: {
      "click": function($event) {
        _vm.backPlace()
      }
    }
  }, [_vm._v(_vm._s(_vm.showCity))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "searchbox left"
  }, [_c('div', {
    staticClass: "inputbox"
  }, [_c('i', {
    staticClass: "searchicon"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchWord),
      expression: "searchWord"
    }],
    attrs: {
      "type": "search",
      "id": "searchtext",
      "placeholder": "门店名称"
    },
    domProps: {
      "value": (_vm.searchWord)
    },
    on: {
      "focus": function($event) {
        _vm.searchFoucus()
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.searchHospital()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchWord = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.searchWord) ? _c('a', {
    staticClass: "cancelbtn",
    on: {
      "click": function($event) {
        _vm.searchHospital()
      }
    }
  }, [_vm._v("搜索")]) : (_vm.searchWord == '') ? _c('a', {
    staticClass: "cancelbtn",
    on: {
      "click": function($event) {
        _vm.searchHospital()
      }
    }
  }, [_vm._v("取消")]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "modal"
  }, [_c('div', {
    staticClass: "histrybox"
  }, [_vm._m(0), _vm._v(" "), _c('ul', {
    staticClass: "searchList"
  }, [_c('li', _vm._l((_vm.histryWord), function(item) {
    return _c('span', {
      staticClass: "keywords",
      on: {
        "click": function($event) {
          _vm.useHisWord(item)
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "clearbtn",
    on: {
      "click": _vm.clearHistory
    }
  }, [_vm._v("清除历史记录")])])]), _vm._v(" "), _c('div', {
    staticClass: "radioList padtop"
  }, [_c('load-more', {
    ref: "loadmore",
    attrs: {
      "bottom-method": _vm.loadBottom,
      "bottom-all-loaded": _vm.allLoaded,
      "bottomPullText": _vm.bottomText,
      "auto-fill": false
    },
    on: {
      "bottom-status-change": _vm.handleBottomChange
    }
  }, [_c('ul', _vm._l((_vm.hospitalInfo), function(hosp, index) {
    return _c('li', {
      staticClass: "stationli clear",
      attrs: {
        "id": hosp.hospitalId
      }
    }, [_c('i', {
      staticClass: "radiobtn left",
      attrs: {
        "id": index
      },
      on: {
        "click": function($event) {
          _vm.shureCheck(index, hosp)
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "storeInfo left",
      on: {
        "click": function($event) {
          _vm.toshopDetail(index, hosp)
        }
      }
    }, [_c('h2', [_vm._v(_vm._s(hosp.hospitalName))]), _vm._v(" "), _c('p', {
      staticClass: "store Addr"
    }, [_vm._v(_vm._s(hosp.hospitalAddr))]), _vm._v(" "), _c('p', {
      staticClass: "store Fen"
    }, [_vm._v("评分 "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.avgQuality != '--'),
        expression: "hosp.avgQuality !='--'"
      }],
      staticClass: "fNum"
    }, [_vm._v(_vm._s(hosp.avgQuality) + "分")]), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.avgQuality == '--'),
        expression: "hosp.avgQuality =='--'"
      }]
    }, [_c('p', {
      staticClass: "hen"
    }, [_vm._v(" ")]), _c('p', {
      staticClass: "hen"
    }, [_vm._v(" ")])])])]), _vm._v(" "), (index == 0 && hosp.distance) ? _c('div', {
      staticClass: "nearbox"
    }, [(hosp.distance) ? _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index == 0),
        expression: "index==0"
      }],
      staticClass: "near"
    }, [_vm._v("最近")]) : _vm._e()]) : _c('div', {
      staticClass: "nearbox",
      on: {
        "click": function($event) {
          _vm.toshopDetail(index, hosp)
        }
      }
    }, [(hosp.distance) ? _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index == 0),
        expression: "index==0"
      }],
      staticClass: "near"
    }, [_vm._v("最近")]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "navbox left",
      on: {
        "click": function($event) {
          _vm.gotoMap(hosp)
        }
      }
    }, [_c('div', {
      staticClass: "p_distance"
    }, [_c('p', {
      staticClass: "distance"
    }, [(hosp.distance) ? _c('span', [(hosp.distance > '100') ? _c('span', {
      staticClass: "disNum"
    }, [_vm._v(">100km")]) : _vm._e(), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.distance < '100'),
        expression: "hosp.distance < '100'"
      }],
      staticClass: "disNum"
    }, [_vm._v(_vm._s(hosp.distance ? hosp.distance : '0.0') + "km")])]) : _vm._e()]), _vm._v(" "), _c('p', {
      staticClass: "navicon"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(33),
        "alt": ""
      }
    })])])])])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "loading",
    slot: "bottom"
  }, [_c('mt-spinner', {
    attrs: {
      "size": 25,
      "color": "#26a2ff",
      "type": "fading-circle"
    }
  })], 1)])], 1), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "middle",
      "modal": false
    },
    model: {
      value: (_vm.isCall),
      callback: function($$v) {
        _vm.isCall = $$v
      },
      expression: "isCall"
    }
  }, [_c('div', {
    staticClass: "call-box"
  }, [_c('div', {
    staticClass: "call-title-tel"
  }, [_vm._v("温馨提示")]), _vm._v(" "), _c('div', {
    staticClass: "call-text-tel"
  }, [_vm._v("很抱歉，您所在的城市暂未开通洗牙服务，请联系咨询具体开通时间")]), _vm._v(" "), _c('div', {
    staticClass: "call-btn-container"
  }, [_c('a', {
    staticClass: "call-btn-tel",
    attrs: {
      "id": "callbtn"
    },
    on: {
      "click": function($event) {
        _vm.telphone()
      }
    }
  }, [_vm._v("点击咨询")]), _vm._v(" "), _c('span', {
    staticClass: "call-btn-tel",
    on: {
      "click": function($event) {
        _vm.closeCall()
      }
    }
  }, [_vm._v("取消")])])])]), _vm._v(" "), (_vm.isCall) ? _c('div', {
    staticClass: "call_modal",
    staticStyle: {
      "z-index": "1000"
    },
    on: {
      "click": function($event) {
        _vm.closeCall()
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm._m(1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h2', {
    staticClass: "histitle"
  }, [_c('i', {
    staticClass: "hisicon"
  }), _vm._v("历史记录")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "whiteList"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(34)
    }
  }), _c('span', {
    staticClass: "whitetext"
  }, [_vm._v("没找到相关的匹配结果，请重试")])])
}]}

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkTime"
  }, [_c('div', {
    staticClass: "body"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "dateTable"
  }, [_c('div', {
    staticClass: "clear"
  }, [_c('div', {
    staticClass: "timeNotice"
  }, [_vm._v("注：若你预约的时间无法满足，诊所将与你联系确认合适时间 ")]), _vm._v(" "), _c('ul', {
    staticClass: "datebody"
  }, [_vm._l((_vm.dateList), function(days, mon) {
    return (mon == _vm.curMon) ? _c('div', {
      staticClass: "clear l_curMon"
    }, [_c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.curYear) + "年" + _vm._s(_vm.curMon) + "月")]), _vm._v(" "), _c('ol', {
      staticClass: "curbg"
    }, _vm._l((days), function(day) {
      return _c('li', {
        staticClass: "disable",
        attrs: {
          "id": mon + day
        },
        on: {
          "click": function($event) {
            _vm.checkDate(mon, day)
          }
        }
      }, [(day == _vm.today) ? _c('span', {
        staticClass: "today"
      }, [_vm._v("今天")]) : (day < 32) ? _c('span', [_vm._v(_vm._s(day))]) : (day > 32) ? _c('span', {
        staticClass: "nosee"
      }, [_vm._v(_vm._s(day))]) : _vm._e(), _vm._v(" "), (day == _vm.today) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("不可约")]) : _vm._e(), _vm._v(" "), (_vm.ableId.indexOf(mon + day) == -1 && _vm.oldId.indexOf(mon + day) == -1 && mon == _vm.nextMon) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("约满")]) : _vm._e()])
    }))]) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.dateList), function(days, mon) {
    return (mon == _vm.nextMon) ? _c('div', {
      staticClass: "monbody clear"
    }, [(_vm.nextYear == _vm.curYear) ? _c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.curYear) + "年" + _vm._s(_vm.nextMon) + "月")]) : _vm._e(), _vm._v(" "), (_vm.nextYear == _vm.curYear + 1) ? _c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.nextYear) + "年" + _vm._s(_vm.nextMon) + "月")]) : _vm._e(), _vm._v(" "), _c('ol', {
      staticClass: "nextbg"
    }, _vm._l((days), function(day) {
      return _c('li', {
        staticClass: "disable",
        attrs: {
          "id": mon + day
        },
        on: {
          "click": function($event) {
            _vm.checkDate(mon, day)
          }
        }
      }, [(day < 32) ? _c('span', [_vm._v(_vm._s(day))]) : (day > 31) ? _c('span', {
        staticClass: "nosee"
      }, [_vm._v(_vm._s(day))]) : _vm._e(), _vm._v(" "), (_vm.ableId.indexOf(mon + day) == -1 && _vm.oldId.indexOf(mon + day) == -1 && mon == _vm.curMon) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("约满")]) : _vm._e()])
    }))]) : _vm._e()
  })], 2)])])]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.showTime),
      callback: function($$v) {
        _vm.showTime = $$v
      },
      expression: "showTime"
    }
  }, [_c('div', {
    attrs: {
      "id": "timeBox clear"
    }
  }, [_c('div', {
    staticClass: "timeTitle"
  }, [_c('i', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.showTime = false
      }
    }
  }), _c('h1', [_vm._v("预约时间")])]), _vm._v(" "), _c('ul', {
    staticClass: "timeList clear"
  }, _vm._l((_vm.items), function(item, index) {
    return _c('li', {
      staticClass: "left timeli",
      on: {
        "click": function($event) {
          _vm.checkTime(item, index)
        }
      }
    }, [_c('button', {
      staticClass: "mybtn",
      attrs: {
        "id": index,
        "disabled": "disabled"
      }
    }, [_vm._v(_vm._s(item.sTime))])])
  }))])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "head_week clear"
  }, [_c('div', {
    staticClass: "week_body"
  }, [_c('span', {
    staticClass: "week mo"
  }, [_vm._v("日")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("一")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("二")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("三")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("四")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("五")]), _vm._v(" "), _c('span', {
    staticClass: "week mo"
  }, [_vm._v("六")])])])
}]}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "evalFill"
  }, [_c('div', {
    staticClass: "others"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), (_vm.status == '1' || _vm.substatu == '1') ? _c('p', [_vm._v("感谢您的服务评价")]) : _c('p', [_vm._v("请对本次服务进行评价")])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), (_vm.status == '1' || _vm.substatu == '1') ? _c('div', {
    staticClass: "evalDetail"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    on: {
      "click": function($event) {
        _vm.teethUrl()
      }
    }
  }, [_c('mt-cell', {
    staticClass: "nobd",
    attrs: {
      "title": "口腔全景图",
      "is-link": "",
      "value": _vm.cellValue
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "org_name",
    on: {
      "click": _vm.shopUrl
    }
  }, [_c('mt-cell', {
    attrs: {
      "title": _vm.orgName,
      "is-link": ""
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "eval_detail heights"
  }, [_c('div', {
    staticClass: "de_header"
  }, [(_vm.selectValuaMsg.sex == 'f') ? _c('img', {
    staticClass: "touxiang",
    attrs: {
      "src": __webpack_require__(21),
      "alt": ""
    }
  }) : _c('img', {
    staticClass: "touxiang",
    attrs: {
      "src": __webpack_require__(22),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "de_left"
  }, [_c('p', {
    staticClass: "de_name"
  }, [_vm._v(_vm._s(_vm.selectValuaMsg.name))]), _vm._v(" "), _c('p', {
    staticClass: "de_num"
  }, [_c('span', [_vm._v("评分")]), (_vm.selectValuaMsg.avg_evaluate) ? _c('span', {
    staticClass: "pos_rel1"
  }, [_vm._l((parseInt(_vm.selectValuaMsg.avg_evaluate)), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(15),
        "alt": ""
      }
    }) : _vm._e()
  }), (_vm.selectValuaMsg.avg_evaluate.charAt(2) > '4') ? _c('img', {
    attrs: {
      "src": __webpack_require__(13),
      "alt": ""
    }
  }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(_vm.selectValuaMsg.avg_evaluate))), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    }) : _vm._e()
  })], 2) : _c('span', {
    staticClass: "pos_rel1"
  }, _vm._l((5), function(n) {
    return _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    })
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "de_right"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.selectValuaMsg.createTime.replace(/\-/g, ".")) + "\n\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "de_body body_hg"
  }, [_c('div', {
    staticClass: "de_txt"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.selectValuaMsg.content) + "\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "debody_img",
    attrs: {
      "id": "debody_img"
    }
  }, _vm._l((_vm.fillsrc), function(s, i) {
    return _c('div', {
      staticClass: "img_over",
      attrs: {
        "data-i": i
      }
    }, [_c('div', {
      staticClass: "img_srec"
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])])
  }))])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  })]) : _c('div', {
    staticClass: "eval_fill"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    on: {
      "click": function($event) {
        _vm.teethUrl()
      }
    }
  }, [_c('mt-cell', {
    staticClass: "nobd",
    attrs: {
      "title": "口腔全景图",
      "is-link": "",
      "value": _vm.cellValue
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.shopUrl
    }
  }, [_c('mt-cell', {
    attrs: {
      "title": _vm.orgName,
      "is-link": ""
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "eval"
  }, [_c('div', {
    staticClass: "service sone"
  }, [_c('span', [_vm._v("预约时效")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))]), _vm._v(" "), _c('div', {
    staticClass: "service stwo"
  }, [_c('span', [_vm._v("诊所环境")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))]), _vm._v(" "), _c('div', {
    staticClass: "service sthree"
  }, [_c('span', [_vm._v("服务质量")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "eval_content"
  }, [_c('div', {
    staticClass: "eval_text"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.textarea1),
      expression: "textarea1"
    }],
    attrs: {
      "id": "textarea",
      "placeholder": "您的评价对我们很重要...",
      "name": "",
      "cols": "45"
    },
    domProps: {
      "value": (_vm.textarea1)
    },
    on: {
      "keyup": function($event) {
        _vm.check()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.textarea1 = $event.target.value
      }
    }
  })]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('div', {
    staticClass: "eval_btn",
    on: {
      "click": function($event) {
        _vm.evalLoading()
      }
    }
  }, [_c('input', {
    staticClass: "claOK",
    attrs: {
      "type": "button",
      "value": "提交"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "divheight"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [(_vm.isshow) ? _c('mt-swipe', {
    attrs: {
      "show-indicators": false,
      "auto": 0,
      "defaultIndex": _vm.indexnow
    },
    on: {
      "change": _vm.handleChange
    }
  }, _vm._l((_vm.fillsrc), function(s) {
    return _c('mt-swipe-item', {
      staticStyle: {
        "display": "flex"
      }
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])
  })) : _vm._e(), _vm._v(" "), _c('img', {
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order3"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(17),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "orders order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt3"
  }, [_vm._v("已完成")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eval_img"
  }, [_c('div', {
    staticClass: "upload_pic"
  }, [_c('span', {
    staticClass: "one_pic"
  }, [_c('input', {
    staticClass: "add_img file_but",
    attrs: {
      "accept": "image/*",
      "type": "file",
      "capture": "camera",
      "multiple": ""
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "add_img fl_but",
    attrs: {
      "type": "button"
    }
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  }), _vm._v(" "), _c('div', {
    staticClass: "sw_index"
  }, [_c('span', {
    staticClass: "hindex"
  }), _vm._v("/"), _c('span', {
    staticClass: "mintleng"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "del_bg"
  }, [_c('button', {
    staticClass: "del_ico"
  })])
}]}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "toOrder"
  }, [_c('div', {
    staticClass: "basemsg"
  }, [_c('div', {
    staticClass: "orderInfo"
  }, [_c('p', {
    staticClass: "errtip"
  }, [_vm._v(_vm._s(_vm.tipWords))]), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.hospitalName == '') ? _c('div', {
    on: {
      "click": _vm.toCheckHospital
    }
  }, [_vm._m(1)]) : _c('div', {
    staticClass: "fsqqq",
    on: {
      "click": _vm.toCheckHospital
    }
  }, [_c('a', {
    staticClass: "mint-cell minthg"
  }, [_c('div', {
    staticClass: "menzh mint-cell-wrapper paddl0 title_r"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "right lright mint-cell-value"
  }, [_c('div', {
    staticClass: "toCheck timeInput"
  }, [_c('div', {
    staticClass: "lineh1"
  }, [_vm._v(_vm._s(_vm.hospitalName))]), _vm._v(" "), _c('div', {
    staticClass: "fs078 c9a lineh2"
  }, [_vm._v("\n                  " + _vm._s(_vm.hospitalAddr) + "\n                ")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "pro_content"
  }, [_c('div', {
    staticClass: "pro_title",
    on: {
      "click": function($event) {
        _vm.toServeContent()
      }
    }
  }, [_vm._v("\n                            服务内容\n          ")]), _vm._v(" "), _c('ul', {
    staticClass: "pro_txt"
  }, [_vm._m(3), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.orderInfo.source == '1'),
      expression: "orderInfo.source=='1'"
    }]
  }, [_c('span', {
    staticClass: "s_content"
  }, [_vm._v("口腔全景摄片1张 ")]), _c('span', {
    staticClass: "s_content"
  }, [_vm._v("超声洁牙抛光1次")])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.orderInfo.source == '14'),
      expression: "orderInfo.source=='14'"
    }]
  }, [_c('span', [_vm._v("窝沟封闭2颗牙或全口涂氟（二选一）")])])])])]), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "userMsg"
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "mint-field-core phone myblur fs089 c4e"
  }, [_vm._v(_vm._s(_vm.user.patientName))])])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "mint-field-core phone myblur fs089 c4e"
  }, [_vm._v(_vm._s(_vm.user.cardNo))])])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper nobord"
  }, [_vm._m(7), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value cursor_module",
    on: {
      "click": function($event) {
        _vm.openKey()
      }
    }
  }, [_c('div', {
    staticClass: "mint-field-core phone fs089 phc c4e p_cursor"
  }, [_vm._v(_vm._s(_vm.mobile)), _c('s', {
    staticClass: "hid_s"
  }, [(_vm.isOpenKey) ? _c('i', [_vm._v("0")]) : _vm._e(), _vm._v(_vm._s(_vm.mobile))])]), _vm._v(" "), _c('img', {
    staticClass: "errbtn",
    attrs: {
      "src": __webpack_require__(16),
      "alt": ""
    }
  })])])])]), _vm._v(" "), _vm._m(8), _vm._v(" "), _c('div', {
    staticClass: "toCheckTime",
    on: {
      "click": _vm.toCheckTime
    }
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper nobord"
  }, [_vm._m(9), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "timeInput myTime padd0 cd2",
    attrs: {
      "type": "text"
    }
  }, [_vm._v(_vm._s(_vm.bookDateTime))])])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-allow-right pro"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "serve padd083"
  }, [_c('div', {
    staticClass: " mint-cell-title"
  }, [_c('i', {
    staticClass: "icon icon1",
    class: {
      check: _vm.isCheck
    },
    on: {
      "click": function($event) {
        _vm.checkTip()
      }
    }
  }), _vm._v(" 我已了解并确认"), _c('a', {
    staticClass: "c2f",
    on: {
      "click": _vm.toServeNotice
    }
  }, [_vm._v("服务知情同意书")])])])]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "bottom",
      "modal": false
    },
    model: {
      value: (_vm.isOpenKey),
      callback: function($$v) {
        _vm.isOpenKey = $$v
      },
      expression: "isOpenKey"
    }
  }, [_c('ul', {
    staticClass: "key_body"
  }, _vm._l((_vm.keyInfo), function(n, i) {
    return (i < 11) ? _c('li', {
      staticClass: "k_item",
      attrs: {
        "id": 'key' + n
      },
      on: {
        "touchstart": function($event) {
          _vm.inputTel(n, i)
        }
      }
    }, [_vm._v(_vm._s(n))]) : _c('li', {
      staticClass: "k_item",
      attrs: {
        "id": 'key' + n
      },
      on: {
        "touchstart": function($event) {
          _vm.gtouchStart(i)
        },
        "touchend": function($event) {
          _vm.gtouchend(n, i)
        }
      }
    }, [_vm._v(_vm._s(n))])
  }))]), _vm._v(" "), (_vm.isOpenKey) ? _c('div', {
    staticClass: "key_modal",
    staticStyle: {
      "z-index": "1000"
    },
    on: {
      "click": _vm.closeKey
    }
  }) : _vm._e(), _vm._v(" "), _c('footer', {
    staticClass: "loging"
  }, [_c('input', {
    staticClass: "loginact",
    attrs: {
      "type": "button",
      "value": "提交",
      "disabled": "disabled"
    },
    on: {
      "click": _vm.toOrderAct
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "fheight",
    staticStyle: {
      "height": "2.78rem"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg padd083"
  }, [_c('p', {
    staticClass: "fs078"
  }, [_vm._v("预约服务")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("预约门诊")])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "timeInput myblurs padd0 cd2",
    attrs: {
      "type": "text"
    }
  }, [_vm._v("请选择门诊")])])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-allow-right pro"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fs089 left positop"
  }, [_c('span', {
    staticClass: "c4e fs089 fx"
  }, [_vm._v("预约门诊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "s_first"
  }, [_c('span', {
    staticClass: "s_content"
  }, [_vm._v("建立专属口腔档案 ")]), _c('span', {
    staticClass: "s_content"
  }, [_vm._v("口腔全面检查1次")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg padd083"
  }, [_c('p', {
    staticClass: "fs078"
  }, [_vm._v("就诊人信息")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("姓名")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("身份证")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("手机号")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg1"
  }, [_c('p', {
    staticClass: "fs067"
  }, [_vm._v("手机号为预约审核电话，请确保填写正确")]), _vm._v(" "), _c('span', {
    staticClass: "triangle-up"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("预约时间")])])
}]}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "teethImg"
  }, [_c('div', {
    staticClass: "others"
  }, [_c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "teethim_context"
  }, [_c('p', {
    staticClass: "teethim_txt"
  }, [_vm._v("口腔全景图")]), _vm._v(" "), _c('div', {
    staticClass: "teethim_img"
  }, [_c('img', {
    staticClass: "noimg",
    attrs: {
      "src": __webpack_require__(38),
      "alt": ""
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('p', {
    staticClass: "give_up"
  }, [_vm._v("您已放弃口腔全景照片拍摄")])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  })]), _vm._v(" "), _c('img', {
    staticClass: "img",
    attrs: {
      "src": ""
    }
  })])])
}]}

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkTime"
  }, [_c('div', {
    staticClass: "body"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "dateTable"
  }, [_c('div', {
    staticClass: "clear"
  }, [_c('div', {
    staticClass: "timeNotice"
  }, [_vm._v("注：若你预约的时间无法满足，诊所将与你联系确认合适时间 ")]), _vm._v(" "), _c('ul', {
    staticClass: "datebody"
  }, [_vm._l((_vm.dateList), function(days, mon) {
    return (mon == _vm.curMon) ? _c('div', {
      staticClass: "clear l_curMon"
    }, [_c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.curYear) + "年" + _vm._s(_vm.curMon) + "月")]), _vm._v(" "), _c('ol', {
      staticClass: "curbg"
    }, _vm._l((days), function(day) {
      return _c('li', {
        staticClass: "disable",
        attrs: {
          "id": mon + day
        },
        on: {
          "click": function($event) {
            _vm.checkDate(mon, day)
          }
        }
      }, [(day == _vm.today) ? _c('span', {
        staticClass: "today"
      }, [_vm._v("今天")]) : (day < 32) ? _c('span', [_vm._v(_vm._s(day))]) : (day > 32) ? _c('span', {
        staticClass: "nosee"
      }, [_vm._v(_vm._s(day))]) : _vm._e(), _vm._v(" "), (day == _vm.today) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("不可约")]) : _vm._e(), _vm._v(" "), (_vm.ableId.indexOf(mon + day) == -1 && _vm.oldId.indexOf(mon + day) == -1 && mon == _vm.nextMon) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("约满")]) : _vm._e()])
    }))]) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.dateList), function(days, mon) {
    return (mon == _vm.nextMon) ? _c('div', {
      staticClass: "monbody clear"
    }, [(_vm.nextYear == _vm.curYear) ? _c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.curYear) + "年" + _vm._s(_vm.nextMon) + "月")]) : _vm._e(), _vm._v(" "), (_vm.nextYear == _vm.curYear + 1) ? _c('h3', {
      staticClass: "datehead"
    }, [_vm._v(_vm._s(_vm.nextYear) + "年" + _vm._s(_vm.nextMon) + "月")]) : _vm._e(), _vm._v(" "), _c('ol', {
      staticClass: "nextbg"
    }, _vm._l((days), function(day) {
      return _c('li', {
        staticClass: "disable",
        attrs: {
          "id": mon + day
        },
        on: {
          "click": function($event) {
            _vm.checkDate(mon, day)
          }
        }
      }, [(day < 32) ? _c('span', [_vm._v(_vm._s(day))]) : (day > 31) ? _c('span', {
        staticClass: "nosee"
      }, [_vm._v(_vm._s(day))]) : _vm._e(), _vm._v(" "), (_vm.ableId.indexOf(mon + day) == -1 && _vm.oldId.indexOf(mon + day) == -1 && mon == _vm.curMon) ? _c('div', {
        staticClass: "unorderFlag"
      }, [_vm._v("约满")]) : _vm._e()])
    }))]) : _vm._e()
  })], 2)])])]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.showTime),
      callback: function($$v) {
        _vm.showTime = $$v
      },
      expression: "showTime"
    }
  }, [_c('div', {
    attrs: {
      "id": "timeBox clear"
    }
  }, [_c('div', {
    staticClass: "timeTitle"
  }, [_c('i', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.showTime = false
      }
    }
  }), _c('h1', [_vm._v("预约时间")])]), _vm._v(" "), _c('ul', {
    staticClass: "timeList clear"
  }, _vm._l((_vm.items), function(item, index) {
    return _c('li', {
      staticClass: "left timeli",
      on: {
        "click": function($event) {
          _vm.checkTime(item, index)
        }
      }
    }, [_c('button', {
      staticClass: "mybtn",
      attrs: {
        "id": index,
        "disabled": "disabled"
      }
    }, [_vm._v(_vm._s(item.sTime))])])
  }))])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "head_week clear"
  }, [_c('div', {
    staticClass: "week_body"
  }, [_c('span', {
    staticClass: "week mo"
  }, [_vm._v("日")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("一")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("二")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("三")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("四")]), _vm._v(" "), _c('span', {
    staticClass: "week"
  }, [_vm._v("五")]), _vm._v(" "), _c('span', {
    staticClass: "week mo"
  }, [_vm._v("六")])])])
}]}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "toPage"
  }, [_c('div', {
    staticClass: "basemsg"
  }, [_c('div', {
    staticClass: "userMsg",
    staticStyle: {
      "margin-top": "30px"
    }
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.ticketNo),
      expression: "ticketNo"
    }],
    staticClass: "mint-field-core phone ticketNo",
    attrs: {
      "placeholder": "请输入齿科券号",
      "type": "text"
    },
    domProps: {
      "value": (_vm.ticketNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.ticketNo = $event.target.value
      }
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "errbtn",
    attrs: {
      "src": __webpack_require__(16),
      "alt": ""
    }
  })])])])])]), _vm._v(" "), _c('footer', {
    staticClass: "tologin"
  }, [_c('input', {
    staticClass: "loginact",
    attrs: {
      "type": "button",
      "value": "跳转"
    },
    on: {
      "click": _vm.toPage
    }
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("齿科券")])])
}]}

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "unorder"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_body"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    staticClass: "b_address"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.unorderMsg.orgName))]), _vm._v(" "), _c('p', {
    staticClass: "ad_txt"
  }, [_vm._v(_vm._s(_vm.unorderMsg.orgAddress))])]), _vm._v(" "), _c('div', {
    staticClass: "b_date"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(18),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "date_txt"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.unedate) + "   \n\t\t\t\t"), (_vm.unorderMsg.endTime) ? _c('span', [_vm._v(_vm._s(_vm.unorderMsg.beginTime + '-' + _vm.unorderMsg.endTime))]) : _c('span', [_vm._v(_vm._s(_vm.unorderMsg.beginTime))])]), _vm._v(" "), _c('p')]), _vm._v(" "), _c('div', {
    staticClass: "b_name"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(19),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "name_txt"
  }, [_vm._v(_vm._s(_vm.unorderMsg.name))])])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order3"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(17),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "orders order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt3"
  }, [_vm._v("已完成")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("已爽约，视为自动放弃本次服务")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "unorder_footer"
  }, [_vm._v("如果有任何疑问，可联系泰康客服"), _c('a', {
    staticClass: "atel",
    attrs: {
      "href": "tel:95522"
    }
  }, [_vm._v("95522")])])
}]}

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "toMapEmpty"
  })
},staticRenderFns: []}

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "runpage"
  }, [_c('span', {
    staticClass: "back"
  }, [_vm._v("测试退出微信测试退出微信测试退出微信测试退出微信\n    ")])])])
}]}

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Place"
  }, [_c('div', {
    staticClass: "localbox "
  }, [_c('div', {
    staticClass: "blink"
  }, [_vm._v(_vm._s(_vm.hua_val))]), _vm._v(" "), _c('span', {
    attrs: {
      "id": 'top' + _vm.curCityId
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "localtitle clear mar1"
  }, [_c('div', {
    staticClass: "local-l left"
  }, [_vm._v(" 当前"), (_vm.checkCityName) ? _c('span', [_vm._v(": " + _vm._s(_vm.checkCityName) + _vm._s(_vm.checkDistrict))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "local-r right"
  }, [_vm._v(" 选择县区 "), _c('i', {
    staticClass: "toup",
    on: {
      "click": _vm.shouqi
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "localarea clear localarea1"
  }, [_c('a', {
    staticClass: "district firstChild left  district1 all c4e",
    on: {
      "click": function($event) {
        _vm.toList()
      }
    }
  }, [_vm._v("全城")]), _vm._v(" "), _vm._l((_vm.districtArr), function(addr, index) {
    return _c('a', {
      staticClass: "district left district1 c4e",
      attrs: {
        "id": addr.code
      },
      on: {
        "click": function($event) {
          _vm.checkDisc(addr.ckCityVo, addr.code)
        }
      }
    }, [_vm._v(_vm._s(addr.ckCityVo.name))])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "cityListArea"
  }, [_c('div', {
    staticClass: "indexlist-bar"
  }, [_c('a', {
    staticClass: "mar3"
  }, [_c('span', {
    on: {
      "click": function($event) {
        _vm.curIndex(_vm.curid)
      }
    }
  }, [_vm._v("当前")])]), _vm._v(" "), _c('div', {
    staticClass: "slide",
    on: {
      "touchend": function($event) {
        _vm.touchEnd()
      },
      "touchmove": function($event) {
        _vm.move($event)
      }
    }
  }, _vm._l((_vm.cityObj), function(str, id) {
    return (JSON.stringify(str) != '{}') ? _c('a', [_c('span', {
      staticClass: "fontColor",
      class: {
        zimu: id == _vm.hua_val
      },
      on: {
        "click": function($event) {
          _vm.letterIndex(id, $event)
        }
      }
    }, [_vm._v(_vm._s(id))])]) : _vm._e()
  }))]), _vm._v(" "), _c('div', {
    staticClass: "cityListAZ"
  }, [_c('ul', {
    staticClass: "cityItems"
  }, _vm._l((_vm.cityObj), function(items, index) {
    return _c('li', {
      attrs: {
        "id": index
      }
    }, [_c('ol', {
      staticClass: "citiBlocks citiBlocks1"
    }, [(JSON.stringify(items) != '{}') ? _c('li', {
      staticClass: "indexlist-index"
    }, [_vm._v(_vm._s(index))]) : _vm._e(), _vm._v(" "), _vm._l((items), function(item, cityId) {
      return _c('li', {
        staticClass: "cityli",
        attrs: {
          "id": cityId
        },
        on: {
          "click": function($event) {
            _vm.checkCity(item, cityId, index)
          }
        }
      }, [_vm._v(_vm._s(item.name))])
    })], 2), _vm._v(" "), _c('div', {
      staticClass: "clear"
    })])
  }))])])])
},staticRenderFns: []}

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "-webkit-overflow-scrolling": "touch",
      "overflow": "scroll"
    },
    attrs: {
      "id": "serall"
    }
  }, [_c('div', {
    staticClass: "serfix"
  }, [_c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('div', {
    staticClass: "serve_tap"
  }, [_c('a', {
    staticClass: "ptap active",
    on: {
      "click": _vm.tap1
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t产品介绍\n\t\t\t\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "stap",
    on: {
      "click": _vm.tap2
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t服务说明\n\t\t\t\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "qtap",
    on: {
      "click": _vm.tap3
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t常见问题\n\t\t\t\t\t\t")])])]), _vm._v(" "), (_vm.source == '14') ? _c('div', [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2)]) : _vm._e(), _vm._v(" "), (_vm.source == '1') ? _c('div', [_vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5)]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "product_info",
    attrs: {
      "id": "product_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "product_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p_all"
  }, [_vm._v("\n\t\t\t\t\t   本产品为"), _c('span', {
    staticClass: "child"
  }, [_vm._v("未满14岁儿童")]), _vm._v("提供的服务包括，建立专属口腔档案、口腔全面检查1次、窝沟封闭2颗牙或全口涂氟（二选一，具体请遵从诊所医嘱安排）。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("\n\t\t\t\t\t1．建立客户专属档案，指为每位客户建立专属的口腔健康档案。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n\t\t\t\t\t2．口腔全面检查，即口腔专科一般检查，包括：咬合关系检查、牙周检查、颞颌关节检查、一对一口腔宣教。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n\t\t\t\t\t3．窝沟封闭，是指不损伤牙体组织，由儿童口腔专科医生将窝沟封闭材料涂布于牙冠咬合面、颊舌面的窝沟点隙，当它流入并渗透窝沟后固化变硬，形成一层保护性的屏障，覆盖在窝沟上，能够阻止致龋菌及酸性代谢产物对牙体的侵蚀，以达到预防窝沟龋的方法。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("\n\t\t\t\t\t4．涂氟，是儿童口腔专科医生使用一种含氟化物的制剂，给口腔内每一颗牙齿的表面进行氟化处理，含氟制剂在牙齿的表面停留，从而形成一层牙齿的“保护膜”，可有效预防龋齿的发生。\n\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "serve_info",
    attrs: {
      "id": "serve_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "serve_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("1．产品有效期")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("1年，自《微医保》保单生效之日起至保单终止日止，有效期内预约有效。保单失效或退保，服务权益失效，将不再可预约。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("2．服务对象")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("仅限投保《微医保》保险产品的被保险人本人。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("3．查询方式")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("微保为本服务权益查询、服务预约的唯一入口。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("客户也可拨打泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("进行服务权益查询")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("4．咨询及投诉")]), _vm._v(" "), _c('p', {
    staticClass: "p1f weit"
  }, [_vm._v("1）咨询及投诉方式")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("客户可拨打泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("对本服务相关事项进行咨询或投诉。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("2）咨询及投诉内容")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("客户可就本服务的权益获取方式、服务内容、服务基本流程、诊所信息、相关注意事项等进行咨询。若你服务体验异常，如预约响应超时、系统无法预约、诊所爽约、服务延时、服务遗漏、过度营销、医疗事故等问题，可进行投诉。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("5．咨询及投诉时间")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("人工服务基础工作时间为8点至20点，每周工作7天。20点至次日8点为语音提示时间。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("6．服务流程")]), _vm._v(" "), _c('p', {
    staticClass: "p1f weit"
  }, [_vm._v("1）提交预约")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 预约提交方式")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户通过微保入口，链接泰康健康齿科服务预约平台进行预约。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 预约提交内容")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户基本信息：我们会根据保单号信息自动带出被保险人的身份信息，客户需填写联系方式，以便诊所联系沟通。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 诊所营业时间")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户可参考预约平台上显示的诊所营业时间进行服务预约，一般为9：00~18：00。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 服务预约时间")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户预约时，可根据预约平台上展示的可预约时段进行预约，一般需至少提前1-5日提交订单，最久可提前的预约时间为1个月。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("2）预约确认")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你在诊所营业时间内提交订单，诊所将在30分钟内响应订单需求，并在1小时内完成处理；若你在诊所非营业时间提交订单，诊所将在下一个工作日营业时间30分钟内响应订单需求，并在1小时内完成处理。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你选择的诊所服务时段无法满足，诊所将在时效内与你联系，协商其他服务时间。若你提供的联系方式有误，或诊所长时间无法与你联系上，我们将先自动为你取消预约订单，并为你发送微信服务通知，提醒你重新选择预约。预约时间确认后，我们将以微信服务通知方式正式通知你。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("3）诊前提醒")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("在你就诊前一天上午十点，我们将再次给你发送微信服务通知，提醒就诊安排及相关注意事项。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("4）预约取消")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你因特殊情况无法按时就诊，请在就诊前一日24时前，在预约平台进行预约取消，约定的就诊当日0点后将不再支持预约取消。如你未按规定进行取消，且未到店使用服务，本服务权益自动作废，因此产生的损失我们将不承担责任，敬请谅解。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("5）到店服务")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("你应按确认的预约时间前往诊所接受服务，并在前台出示身份证明以确认身份。否则无法享受服务，因此造成的损失，我们将不承担责任，敬请谅解。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("6）服务放弃")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若因实际情况，你无法使用或选择放弃部分服务内容，需在诊所书面确认。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("7）服务加项")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("我们严禁诊所在服务过程中对客户进行二次营销。但若你因自身需要，要求诊所提供进一步齿科服务，诊所可根据客户需求及实际情况，酌情提供相关服务，并且诊所应在提供服务前，在客户口腔健康档案中明确记录相关事项，并需得到你的签字确认。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "question",
    attrs: {
      "id": "questionall"
    }
  }, [_c('div', {
    attrs: {
      "id": "question"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("常见问题")]), _vm._v(" "), _c('div', {
    staticClass: "questions"
  }, [_c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("可以直接到诊所不预约吗？ ")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("\n\t\t\t\t\t你好，本服务为预约式服务，就诊前你必须与诊所预约确认就诊时间。如未预约直接到诊所就诊，我们将无法提供本服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("我到诊所要带什么吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v(" 你好，就诊时需向诊所出示预约成功的微信服务通知，并出示你本人身份的有效证件。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("在全国都有诊所网点吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v(" 你好，全国一二线城市均有合作诊所，并且在不断更新扩充中。如你所在城市暂无合作诊所，请选择已开通诊所的城市申请服务或咨询客服泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("到诊所还需要付费吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，你可以免费享受该次服务，诊所不得向你额外收取任何费用，或推销产品。但若你当日有其他口腔服务需求，需向诊所支付费用。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("儿童适宜进行牙齿涂氟的年龄？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，儿童最好从3岁开始，每半年涂一次，直到6岁为止。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("涂氟有什么作用？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，涂氟可以起到抑制有害细菌、增强牙齿抵抗力、坚固牙齿、修复蛀牙、减少过敏的作用。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("儿童事宜进行窝沟封闭的年龄？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，窝沟封闭是以预防龋病（虫牙）为主要目的的，因此它主要是针对儿童与青少年新萌出的恒磨牙，一般情况下，6-8岁是最适合做窝沟封闭的年龄。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("为什么做窝沟封闭？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，窝沟封闭后牙齿的窝沟被填平，使牙面变得光滑易清洁，一方面窝沟内原有的细菌断绝了营养的来源，逐渐死亡；另一方面外面的致龋细菌不能再进入，能够有效防龋。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("儿童多长时间需要进行一次齿科检查？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，建议每隔3个月、6个月，或1年复查。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("什么情况下不建议进行窝沟封闭或涂氟？ ")]), _vm._v(" "), _c('div', {
    staticClass: "p4 icona"
  }, [_vm._v("\n\t\t\t\t\t你好，以下情况不建议为未满14岁儿童进行窝沟封闭或涂氟，具体请遵从医嘱：\n\t\t\t\t\t"), _c('p', {
    staticClass: "p5"
  }, [_vm._v("1）对树脂或其他任何成分过敏。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("2）溃疡性牙龈炎。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("3）口腔炎。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("4）支气管哮喘。")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "product_info",
    attrs: {
      "id": "product_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "product_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p_all"
  }, [_vm._v("\n\t\t\t\t\t   本产品包括建立专属口腔档案、口腔全面检查、超声波洁牙和口腔全景片检查，四项服务，各一次。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("\n\t\t\t\t\t1．建立客户专属档案，指为每位客户建立专属的口腔健康档案。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n\t\t\t\t\t2．口腔全面检查，即口腔专科一般检查，包括：咬合关系检查、牙周检查、颞颌关节检查、一对一口腔宣教。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n\t\t\t\t\t3．超声波洁牙，又名龈上洁治术（俗称洗牙），指用洁治器械去除龈上牙石，菌斑和色泽并磨光牙面，以延迟菌斑和牙石的再沉积。包括超声龈上洁治、抛光、冲洗、国产上药（碘甘油）。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("\n\t\t\t\t\t4．口腔全景片，又叫曲面断层片，是利用仪器提供各种的X光射线给牙齿，牙周，整个口腔结构及头颅“拍照”，一次拍摄即将全口牙齿和颌骨的影像清晰的显示在一张X光片上，目的是精确测定牙齿倾斜角度、牙周软组织情况、牙根情况、牙槽骨质情况，解剖形态的精确测量为医生术前的诊断分析与设计提供全景样图像依据。\n\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "serve_info",
    attrs: {
      "id": "serve_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "serve_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("1．产品有效期")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("1年，自《微医保》保单生效之日起至保单终止日止，有效期内预约有效。保单失效或退保，服务权益失效，将不再可预约。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("2．服务对象")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("仅限投保《微医保》保险产品的被保险人本人。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("3．查询方式")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("微保为本服务权益查询、服务预约的唯一入口。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("客户也可拨打泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("进行服务权益查询")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("4．咨询及投诉")]), _vm._v(" "), _c('p', {
    staticClass: "p1f weit"
  }, [_vm._v("1）咨询及投诉方式")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("客户可拨打泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("对本服务相关事项进行咨询或投诉。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("2）咨询及投诉内容")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("客户可就本服务的权益获取方式、服务内容、服务基本流程、诊所信息、相关注意事项等进行咨询。若你服务体验异常，如预约响应超时、系统无法预约、诊所爽约、服务延时、服务遗漏、过度营销、医疗事故等问题，可进行投诉。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("5．咨询及投诉时间")]), _vm._v(" "), _c('p', {
    staticClass: "ptp"
  }, [_vm._v("人工服务基础工作时间为8点至20点，每周工作7天。20点至次日8点为语音提示时间。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("6．服务流程")]), _vm._v(" "), _c('p', {
    staticClass: "p1f weit"
  }, [_vm._v("1）提交预约")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 预约提交方式")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户通过微保入口，链接泰康健康齿科服务预约平台进行预约。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 预约提交内容")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户基本信息：我们会根据保单号信息自动带出被保险人的身份信息，客户需填写联系方式，以便诊所联系沟通。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 诊所营业时间")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户可参考预约平台上显示的诊所营业时间进行服务预约，一般为9：00~18：00。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("— 服务预约时间")]), _vm._v(" "), _c('p', {
    staticClass: "p2"
  }, [_vm._v("客户预约时，可根据预约平台上展示的可预约时段进行预约，一般需至少提前1-5日提交订单，最久可提前的预约时间为1个月。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("2）预约确认")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你在诊所营业时间内提交订单，诊所将在30分钟内响应订单需求，并在1小时内完成处理；若你在诊所非营业时间提交订单，诊所将在下一个工作日营业时间30分钟内响应订单需求，并在1小时内完成处理。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你选择的诊所服务时段无法满足，诊所将在时效内与你联系，协商其他服务时间。若你提供的联系方式有误，或诊所长时间无法与你联系上，我们将先自动为你取消预约订单，并为你发送微信服务通知，提醒你重新选择预约。预约时间确认后，我们将以微信服务通知方式正式通知你。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("3）诊前提醒")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("在你就诊前一天上午十点，我们将再次给你发送微信服务通知，提醒就诊安排及相关注意事项。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("4）预约取消")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若你因特殊情况无法按时就诊，请在就诊前一日24时前，在预约平台进行预约取消，约定的就诊当日0点后将不再支持预约取消。如你未按规定进行取消，且未到店使用服务，本服务权益自动作废，因此产生的损失我们将不承担责任，敬请谅解。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("5）到店服务")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("你应按确认的预约时间前往诊所接受服务，并在前台出示身份证明以确认身份。否则无法享受服务，因此造成的损失，我们将不承担责任，敬请谅解。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("6）服务放弃")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("若因实际情况，你无法使用或选择放弃部分服务内容，需在诊所书面确认。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("7）档案管理")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("你在诊所接受服务，并拍摄口腔全景照片后，诊所将上传口腔全景片，你可通过预约平台进行查阅。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("8）服务加项")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("我们严禁诊所在服务过程中对客户进行二次营销。但若你因自身需要，要求诊所提供进一步齿科服务，诊所可根据客户需求及实际情况，酌情提供相关服务，并且诊所应在提供服务前，在客户口腔健康档案中明确记录相关事项，并需得到你的签字确认。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "question",
    attrs: {
      "id": "questionall"
    }
  }, [_c('div', {
    attrs: {
      "id": "question"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("常见问题")]), _vm._v(" "), _c('div', {
    staticClass: "questions"
  }, [_c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("可以直接到诊所不预约吗？ ")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("\n\t\t\t\t\t你好，本服务为预约式服务，就诊前你必须与诊所预约确认就诊时间。如未预约直接到诊所就诊，我们将无法提供本服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("我到诊所要带什么吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v(" 你好，就诊时需向诊所出示预约成功的微信服务通知，并出示你本人身份的有效证件。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("在全国都有诊所网点吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v(" 你好，全国一二线城市均有合作诊所，并且在不断更新扩充中。如你所在城市暂无合作诊所，请选择已开通诊所的城市申请服务或咨询客服泰康健康专属服务热线"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:4000895522"
    }
  }, [_vm._v("4000895522")]), _vm._v("。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("我是第一次洗牙需要注意哪些事项？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，洗牙时间可能会稍长，洗牙后最好不要喝有色饮料，如茶、咖啡等，洗牙后医生也会提醒你的，请遵医嘱即可。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("洗牙后牙齿会松动吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，对于健康的牙齿，洗牙不会导致牙齿松动。如果洗牙后出现牙齿松动的症状，则非洗牙所致，而是患者本来已有牙周病，牙槽骨已吸收，牙齿早已松动。牙结石的“夹板效应”使牙齿得到“支撑”假象，牙石被“洗掉”后，重新出现了松动。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("洗牙会损伤牙齿吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，洗牙是通过超声波高频振动将牙石击碎，超声洗牙机头本身对牙齿没有切削功能，洗牙是不会损伤牙齿的。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("拍全景片有什么用？可以不拍吗？")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，拍全景片是可以精确测定牙齿倾斜角度、牙周软组织情况、牙根情况、牙槽骨质情况，可以让医生全面的了解你的口腔状况。如果你有所顾虑，也可以选择放弃，诊所会尊重你的意愿。如选择放弃全景片，请你在诊所签署放弃声明。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("洗牙后牙齿是否会变的敏感？ ")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，因洗牙前牙结石长期存在而导致牙龈萎缩，洗牙后牙结石被清除，可能牙根有部分暴露出来，让牙齿变得有些许敏感，故洗牙后不能吃刺激性食物。2-3天后可恢复正常饮食。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("洗牙后为什么我牙缝变大了？ ")]), _vm._v(" "), _c('p', {
    staticClass: "p4 icona"
  }, [_vm._v("你好，因为洗牙前牙结石长期存在而导致牙龈萎缩，洗牙后牙结石被清除，可能让你感觉牙缝变大。")]), _vm._v(" "), _c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("什么情况下不能洗牙？  ")]), _vm._v(" "), _c('div', {
    staticClass: "p4 icona"
  }, [_vm._v("\n\t\t\t\t\t你好，一般存在以下几种情况的，不建议进行洗牙，具体请遵从医嘱：\n\t\t\t\t\t"), _c('p', {
    staticClass: "p5"
  }, [_vm._v("1) 有传染性疾病的患者：如结核、乙肝表面抗原阳性、艾滋病等。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("2) 使用心脏人工起搏器的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("3) 口腔局部软组织炎症急性期患者（急性坏死性牙龈炎除外）。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("4) 患有牙龈部恶性肿瘤的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("5) 患有各种出血性疾病的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("6) 孕妇。应该在怀孕前接受彻底的口腔治疗。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("7) 活动性心绞痛。")])])])])
}]}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "errorPage"
  }, [_c('div', {
    staticClass: "errorList"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(143)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "errortext"
  }, [_vm._v("页面加载错误，请稍后重试")])])])
}]}

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "compensation"
  }, [_c('div', {
    staticClass: "up_tit"
  }, [_vm._v("相关问卷")]), _vm._v(" "), _c('ul', {
    staticClass: "cost"
  }, [_c('li', {
    staticClass: "cos_in"
  }, [_c('div', {
    staticClass: "cos_box"
  }, [_c('input', {
    staticClass: "name_radio",
    attrs: {
      "type": "radio"
    }
  }), _c('span')])]), _vm._v(" "), _c('li', {
    staticClass: "costin_line clearfix"
  }, [_c('div', {
    staticClass: "upload_pic"
  }, [_c('span', {
    staticClass: "one_pic"
  }, [_c('input', {
    staticClass: "file_but",
    attrs: {
      "accept": "image/*",
      "type": "file",
      "capture": "camera",
      "multiple": ""
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "fl_but",
    attrs: {
      "type": "button"
    }
  })])])])]), _vm._v(" "), _c('input', {
    staticClass: "claOK",
    attrs: {
      "type": "button",
      "value": "确认"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [_c('img', {
    attrs: {
      "src": ""
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "del_ico"
  })])])
}]}

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "enterRouter"
  })
},staticRenderFns: []}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "toOrder"
  }, [_c('div', {
    staticClass: "basemsg"
  }, [_c('div', {
    staticClass: "orderInfo"
  }, [_c('p', {
    staticClass: "errtip"
  }, [_vm._v(_vm._s(_vm.tipWords))]), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.hospitalName == '') ? _c('div', {
    on: {
      "click": _vm.toCheckHospital
    }
  }, [_vm._m(1)]) : _c('div', {
    staticClass: "fsqqq",
    on: {
      "click": _vm.toCheckHospital
    }
  }, [_c('a', {
    staticClass: "mint-cell minthg"
  }, [_c('div', {
    staticClass: "menzh mint-cell-wrapper paddl0 title_r"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "right lright mint-cell-value"
  }, [_c('div', {
    staticClass: "toCheck timeInput"
  }, [_c('div', {
    staticClass: "lineh1"
  }, [_vm._v(_vm._s(_vm.hospitalName))]), _vm._v(" "), _c('div', {
    staticClass: "fs078 c9a lineh2"
  }, [_vm._v("\n                  " + _vm._s(_vm.hospitalAddr) + "\n                ")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "pro_content"
  }, [_c('div', {
    staticClass: "pro_title",
    on: {
      "click": function($event) {
        _vm.toServeContent()
      }
    }
  }, [_vm._v("\n                            服务内容\n          ")]), _vm._v(" "), _vm._m(3)])]), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "userMsg"
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "mint-field-core phone myblur fs089 c4e"
  }, [_vm._v(_vm._s(_vm.user.patientName))])])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "mint-field-core phone myblur fs089 c4e"
  }, [_vm._v(_vm._s(_vm.user.cardNo))])])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper nobord"
  }, [_vm._m(7), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value cursor_module",
    on: {
      "click": function($event) {
        _vm.openKey()
      }
    }
  }, [_c('div', {
    staticClass: "mint-field-core phone fs089 phc c4e p_cursor"
  }, [_vm._v(_vm._s(_vm.mobile)), _c('s', {
    staticClass: "hid_s"
  }, [(_vm.isOpenKey) ? _c('i', [_vm._v("0")]) : _vm._e(), _vm._v(_vm._s(_vm.mobile))])]), _vm._v(" "), _c('img', {
    staticClass: "errbtn",
    attrs: {
      "src": __webpack_require__(16),
      "alt": ""
    }
  })])])])]), _vm._v(" "), _vm._m(8), _vm._v(" "), _c('div', {
    staticClass: "toCheckTime",
    on: {
      "click": _vm.toCheckTime
    }
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper nobord"
  }, [_vm._m(9), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "timeInput myTime padd0 cd2",
    attrs: {
      "type": "text"
    }
  }, [_vm._v(_vm._s(_vm.bookDateTime))])])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-allow-right pro"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "serve padd083"
  }, [_c('div', {
    staticClass: " mint-cell-title"
  }, [_c('i', {
    staticClass: "icon icon1",
    class: {
      check: _vm.isCheck
    },
    on: {
      "click": function($event) {
        _vm.checkTip()
      }
    }
  }), _vm._v(" 我已了解并确认"), _c('a', {
    staticClass: "c2f",
    on: {
      "click": _vm.toServeNotice
    }
  }, [_vm._v("服务知情同意书")])])])]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "bottom",
      "modal": false
    },
    model: {
      value: (_vm.isOpenKey),
      callback: function($$v) {
        _vm.isOpenKey = $$v
      },
      expression: "isOpenKey"
    }
  }, [_c('ul', {
    staticClass: "key_body"
  }, _vm._l((_vm.keyInfo), function(n, i) {
    return (i < 11) ? _c('li', {
      staticClass: "k_item",
      attrs: {
        "id": 'key' + n
      },
      on: {
        "touchstart": function($event) {
          _vm.inputTel(n, i)
        }
      }
    }, [_vm._v(_vm._s(n))]) : _c('li', {
      staticClass: "k_item",
      attrs: {
        "id": 'key' + n
      },
      on: {
        "touchstart": function($event) {
          _vm.gtouchStart(i)
        },
        "touchend": function($event) {
          _vm.gtouchend(n, i)
        }
      }
    }, [_vm._v(_vm._s(n))])
  }))]), _vm._v(" "), (_vm.isOpenKey) ? _c('div', {
    staticClass: "key_modal",
    staticStyle: {
      "z-index": "1000"
    },
    on: {
      "click": _vm.closeKey
    }
  }) : _vm._e(), _vm._v(" "), _c('footer', {
    staticClass: "loging"
  }, [_c('input', {
    staticClass: "loginact",
    attrs: {
      "type": "button",
      "value": "提交",
      "disabled": "disabled"
    },
    on: {
      "click": _vm.toOrderAct
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "fheight",
    staticStyle: {
      "height": "2.78rem"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg padd083"
  }, [_c('p', {
    staticClass: "fs078"
  }, [_vm._v("预约服务")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("预约门诊")])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('span', {
    staticClass: "timeInput myblurs padd0 cd2",
    attrs: {
      "type": "text"
    }
  }, [_vm._v("请选择门诊")])])]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-allow-right pro"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fs089 left positop"
  }, [_c('span', {
    staticClass: "c4e fs089 fx"
  }, [_vm._v("预约门诊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "pro_txt"
  }, [_c('li', {
    staticClass: "s_first"
  }, [_c('span', {
    staticClass: "s_content"
  }, [_vm._v("建立专属口腔档案 ")]), _c('span', {
    staticClass: "s_content"
  }, [_vm._v("口腔全面检查1次")])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "s_content"
  }, [_vm._v("口腔全景摄片1张 ")]), _c('span', {
    staticClass: "s_content"
  }, [_vm._v("超声洁牙抛光1次")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg padd083"
  }, [_c('p', {
    staticClass: "fs078"
  }, [_vm._v("就诊人信息")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("姓名")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("身份证")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("手机号")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tipsMsg1"
  }, [_c('p', {
    staticClass: "fs067"
  }, [_vm._v("手机号为预约审核电话，请确保填写正确")]), _vm._v(" "), _c('span', {
    staticClass: "triangle-up"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title "
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("预约时间")])])
}]}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "orderDetail"
  }, [_c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order1"
  }, [(_vm.orderMsg.orderState == 0) ? _c('img', {
    attrs: {
      "src": __webpack_require__(40),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 4) ? _c('img', {
    attrs: {
      "src": __webpack_require__(41),
      "alt": ""
    }
  }) : _vm._e()]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "middle"
    },
    model: {
      value: (_vm.isordert),
      callback: function($$v) {
        _vm.isordert = $$v
      },
      expression: "isordert"
    }
  }, [_c('div', {
    staticClass: "call-box1"
  }, [_c('div', {
    staticClass: "call-title1"
  }, [_vm._v("温馨提示")]), _vm._v(" "), _c('div', {
    staticClass: "call-text1"
  }, [_vm._v("您在非营业时间申请预约，诊所将于下一个营业日完成处理")]), _vm._v(" "), _c('div', {
    staticClass: "call-btn1"
  }, [_vm._v("\n\t\t          \t我知道了\n\t\t        ")])])]), _vm._v(" "), (_vm.orderMsg.orderState == 0 && !_vm.isDoTime) ? _c('div', {
    staticClass: "order_warn order_warnp"
  }, [_c('img', {
    staticClass: "vtime",
    attrs: {
      "src": __webpack_require__(44),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "out_time"
  }, [_vm._v("您在非营业时间申请预约，诊所将于下一个营业日完成处理")])]) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 0 && _vm.isDoTime) ? _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("已提交预约申请，需要等待30分钟审核时间")])]) : _vm._e(), _vm._v(" "), (_vm.orderMsg.orderState == 4) ? _c('div', {
    staticClass: "order_warn warn_content"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "orw_succ"
  }, [_vm._v("预约成功,请按时携带身份证前往门诊洗牙")]), _vm._v(" "), _c('p', {
    staticClass: "order_add"
  }, [_vm._v("逾期将视为自动放弃本次服务")])]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_body"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    staticClass: "b_address"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.orderMsg.orgName))]), _vm._v(" "), _c('p', {
    staticClass: "ad_txt"
  }, [_vm._v(_vm._s(_vm.orderMsg.orgAddress))])]), _vm._v(" "), _c('div', {
    staticClass: "b_date"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(18),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "date_txt"
  }, [_vm._v(" " + _vm._s(_vm.orendate) + " \n\t\t\t\t\t"), (_vm.orderMsg.endTime) ? _c('span', [_vm._v(_vm._s(_vm.orderMsg.beginTime + '-' + _vm.orderMsg.endTime))]) : _c('span', [_vm._v(_vm._s(_vm.orderMsg.beginTime))])])]), _vm._v(" "), _c('div', {
    staticClass: "b_name"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(19),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "name_txt"
  }, [_vm._v(_vm._s(_vm.orderMsg.name))])])]), _vm._v(" "), _c('div', {
    staticClass: "order_banner"
  }, [(this.phones.length <= 1) ? _c('a', {
    staticClass: "or_tap1",
    attrs: {
      "href": _vm.phone
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(20),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t客服电话 \n\t\t\t")]) : _c('a', {
    staticClass: "or_tap1",
    on: {
      "click": _vm.telphone
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(20),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t客服电话 \n\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "or_tap2",
    on: {
      "click": function($event) {
        _vm.toPage()
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(43),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t门诊导航\n\t\t\t")]), _vm._v(" "), (this.phones.length > 1) ? _c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.istel),
      callback: function($$v) {
        _vm.istel = $$v
      },
      expression: "istel"
    }
  }, [_c('div', {
    staticClass: "telmodal"
  })]) : _vm._e(), _vm._v(" "), _vm._m(1)], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_num"
  }, [_c('span', [_vm._v("预约编号")]), _vm._v(" "), _c('span', {
    staticClass: "orderid"
  }, [_vm._v(_vm._s(_vm.orderMsg.tradeNo))])]), _vm._v(" "), _c('div'), _vm._v(" "), _c('div', {
    staticClass: "footeror"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.locatimes != _vm.ordertime && _vm.locatimes < _vm.ordertime),
      expression: "locatimes!=ordertime&&locatimes<ordertime"
    }],
    staticClass: "order_btn",
    on: {
      "click": function($event) {
        _vm.orderClick()
      }
    }
  }, [_vm._m(2)]), _vm._v(" "), _c('p', {
    staticClass: "order_footer"
  }, [_vm._v("就诊当日0:00起不支持取消预约")])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "order_txt3"
  }, [_vm._v("已完成")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('img', {
    staticClass: "fenge",
    attrs: {
      "src": __webpack_require__(36)
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "orclick"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(35),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "spanmar"
  }, [_vm._v("取消预约")])])
}]}

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Place"
  }, [_c('div', {
    staticClass: "localbox "
  }, [_c('div', {
    staticClass: "blink"
  }, [_vm._v(_vm._s(_vm.hua_val))]), _vm._v(" "), _c('span', {
    attrs: {
      "id": 'top' + _vm.curCityId
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "localtitle clear mar1"
  }, [_c('div', {
    staticClass: "local-l left"
  }, [_vm._v(" 当前"), (_vm.checkCityName) ? _c('span', [_vm._v(": " + _vm._s(_vm.checkCityName) + _vm._s(_vm.checkDistrict))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "local-r right"
  }, [_vm._v(" 选择县区 "), _c('i', {
    staticClass: "toup",
    on: {
      "click": _vm.shouqi
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "localarea clear localarea1"
  }, [_c('a', {
    staticClass: "district firstChild left  district1 all c4e",
    on: {
      "click": function($event) {
        _vm.toList()
      }
    }
  }, [_vm._v("全城")]), _vm._v(" "), _vm._l((_vm.districtArr), function(addr, index) {
    return _c('a', {
      staticClass: "district left district1 c4e",
      attrs: {
        "id": addr.code
      },
      on: {
        "click": function($event) {
          _vm.checkDisc(addr.ckCityVo, addr.code)
        }
      }
    }, [_vm._v(_vm._s(addr.ckCityVo.name))])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "cityListArea"
  }, [_c('div', {
    staticClass: "indexlist-bar"
  }, [_c('a', {
    staticClass: "mar3"
  }, [_c('span', {
    on: {
      "click": function($event) {
        _vm.curIndex(_vm.curid)
      }
    }
  }, [_vm._v("当前")])]), _vm._v(" "), _c('div', {
    staticClass: "slide",
    on: {
      "touchend": function($event) {
        _vm.touchEnd()
      },
      "touchmove": function($event) {
        _vm.move($event)
      }
    }
  }, _vm._l((_vm.cityObj), function(str, id) {
    return (JSON.stringify(str) != '{}') ? _c('a', [_c('span', {
      staticClass: "fontColor",
      class: {
        zimu: id == _vm.hua_val
      },
      on: {
        "click": function($event) {
          _vm.letterIndex(id, $event)
        }
      }
    }, [_vm._v(_vm._s(id))])]) : _vm._e()
  }))]), _vm._v(" "), _c('div', {
    staticClass: "cityListAZ"
  }, [_c('ul', {
    staticClass: "cityItems"
  }, _vm._l((_vm.cityObj), function(items, index) {
    return _c('li', {
      attrs: {
        "id": index
      }
    }, [_c('ol', {
      staticClass: "citiBlocks citiBlocks1"
    }, [(JSON.stringify(items) != '{}') ? _c('li', {
      staticClass: "indexlist-index"
    }, [_vm._v(_vm._s(index))]) : _vm._e(), _vm._v(" "), _vm._l((items), function(item, cityId) {
      return _c('li', {
        staticClass: "cityli",
        attrs: {
          "id": cityId
        },
        on: {
          "click": function($event) {
            _vm.checkCity(item, cityId, index)
          }
        }
      }, [_vm._v(_vm._s(item.name))])
    })], 2), _vm._v(" "), _c('div', {
      staticClass: "clear"
    })])
  }))])])])
},staticRenderFns: []}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "shopDetail"
  }, [_c('img', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "hidden_src",
      "src": __webpack_require__(39)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "shopDet"
  }, [_c('div', {
    staticClass: "shop_banner"
  }, [_c('mt-swipe', {
    attrs: {
      "show-indicators": false
    }
  }, [(_vm.imgSrc) ? _c('mt-swipe-item', [_c('img', {
    attrs: {
      "src": _vm.imgSrc
    }
  })]) : _c('mt-swipe-item', [_c('img', {
    attrs: {
      "src": __webpack_require__(37),
      "alt": ""
    }
  })])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "shop_name bgff"
  }, [_c('p', {
    staticClass: "shop_n1"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalName) + "\n\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "shop_n2"
  }, [_vm._v(" \n\t\t\t\t综合评分"), (_vm.avgQuality != '--') ? _c('span', {
    staticClass: "shop_score"
  }, [_vm._v(_vm._s(_vm.avgQuality)), _c('span', [_vm._l((parseInt(_vm.avgQuality)), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(15),
        "alt": ""
      }
    }) : _vm._e()
  }), (_vm.avgQuality.charAt(2) > '4') ? _c('img', {
    attrs: {
      "src": __webpack_require__(13),
      "alt": ""
    }
  }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(_vm.avgQuality))), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    }) : _vm._e()
  })], 2)]) : _vm._e(), (_vm.avgQuality == '--') ? _c('span', {
    staticClass: "shop_score"
  }, [_c('p', {
    staticClass: "gang"
  }), _c('p', {
    staticClass: "gang ganglast"
  }), _c('span', _vm._l((5), function(n) {
    return _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    })
  }))]) : _vm._e()])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "shop_cell bgff"
  }, [_c('div', {
    staticClass: "b_address b_address1"
  }, [_c('p', {
    staticClass: "ad_txt posi_re"
  }, [_c('img', {
    staticClass: "posi_ab",
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalAddr) + "\n\t\t\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "dh_img"
  }), _vm._v(" "), _c('p', {
    staticClass: "shop_guide",
    on: {
      "click": _vm.topage
    }
  }, [_c('span', {
    staticClass: "daoh"
  }, [_vm._v("导航去")]), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.distance),
      expression: "distance"
    }],
    staticClass: "shop_km"
  }, [(_vm.distance <= 100) ? _c('span', [_vm._v(_vm._s(_vm.distance))]) : _c('span', [_vm._v(">100")]), _vm._v("km")])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('div', {
    staticClass: "remind_container"
  }, [_c('div', {
    staticClass: "b_date b_date01"
  }, [_c('p', {
    staticClass: "date_txt date_txt01"
  }, [_c('img', {
    staticClass: "posi_ab",
    attrs: {
      "src": __webpack_require__(42),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t\t\t门诊时间: "), _c('span', [_vm._v(_vm._s(_vm.hosInfo.hospitalRule))])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('span', {
    staticClass: "sp_remind",
    on: {
      "click": function($event) {
        _vm.remind()
      }
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "eval_detail padd_shop1",
    attrs: {
      "id": "shop_t1"
    }
  }, [_c('ul', {
    staticClass: "ser ser01"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalDes) + "\n\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "e_detail padd_shop1",
    attrs: {
      "id": "shop_t2"
    }
  }, [(_vm.status == 1) ? _c('div', {
    staticStyle: {
      "-webkit-overflow-scrolling": "touch"
    }
  }, [_c('div', _vm._l((_vm.hosVal), function(item, index) {
    return _c('div', [_c('div', {
      staticClass: "area bgff"
    }, [_c('div', {
      staticClass: "de_header"
    }, [(item.sex == 'F') ? _c('img', {
      staticClass: "touxiang",
      attrs: {
        "src": __webpack_require__(21),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "touxiang",
      attrs: {
        "src": __webpack_require__(22),
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "de_left"
    }, [(item.name) ? _c('p', {
      staticClass: "de_name"
    }, [_vm._v(_vm._s(item.name))]) : _c('p', {
      staticClass: "de_name"
    }, [_vm._v("游客")]), _vm._v(" "), _c('p', {
      staticClass: "de_num de_num01"
    }, [_c('span', [_vm._v("评分")]), (item.avg_evaluate) ? _c('span', {
      staticClass: "pos_rel"
    }, [_vm._l((parseInt(item.avg_evaluate)), function(n) {
      return (true) ? _c('img', {
        attrs: {
          "src": __webpack_require__(15),
          "alt": ""
        }
      }) : _vm._e()
    }), (item.avg_evaluate.charAt(2) > '4') ? _c('img', {
      attrs: {
        "src": __webpack_require__(13),
        "alt": ""
      }
    }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(item.avg_evaluate))), function(n) {
      return (true) ? _c('img', {
        attrs: {
          "src": __webpack_require__(7),
          "alt": ""
        }
      }) : _vm._e()
    })], 2) : _c('span', {
      staticClass: "pos_rel"
    }, _vm._l((5), function(n) {
      return _c('img', {
        attrs: {
          "src": __webpack_require__(7),
          "alt": ""
        }
      })
    }))])]), _vm._v(" "), _c('div', {
      staticClass: "de_right"
    }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s((item.createTime).substr(0, 10).replace(/\-/g, ".")) + "   ")])]), _vm._v(" "), _c('div', {
      staticClass: "d_body padl"
    }, [_c('div', {
      staticClass: "de_txt"
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(item.content) + "\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.fileArray),
        expression: "item.fileArray"
      }],
      staticClass: "debody_img"
    }, _vm._l((item.fileArray), function(p, i) {
      return _c('div', {
        staticClass: "img_over img_over01",
        attrs: {
          "data-i": i
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (p.fileResourceId),
          expression: "p.fileResourceId"
        }],
        staticClass: "img_sre"
      }, [_c('img', {
        staticClass: "img_src",
        attrs: {
          "src": p.fillsrc
        }
      })])])
    }))])]), _vm._v(" "), _c('p', {
      staticClass: "order_line"
    })])
  }))]) : _c('div', {
    staticClass: "area"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOrder),
      expression: "isOrder"
    }],
    staticClass: "shop_footer",
    on: {
      "click": _vm.goOrder
    }
  }, [_c('p', [_vm._v("立即预约")])])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [_c('mt-swipe', {
    attrs: {
      "show-indicators": false,
      "auto": 0,
      "defaultIndex": _vm.indexnow
    },
    on: {
      "change": _vm.handleChange
    }
  }, _vm._l((_vm.fillsrc), function(s) {
    return _c('mt-swipe-item', {
      staticStyle: {
        "display": "flex"
      }
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])
  })), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('img', {
    attrs: {
      "src": ""
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fillsrc.length),
      expression: "fillsrc.length"
    }],
    staticClass: "hiddeninput",
    attrs: {
      "type": "hidden"
    },
    domProps: {
      "value": (_vm.fillsrc.length)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fillsrc.length = $event.target.value
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "remind_modal",
    staticStyle: {
      "display": "none"
    }
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "div_remind"
  }, [_c('div', {
    staticClass: "t_remind"
  }, [_c('span', {
    staticClass: "triangle-up"
  }), _vm._v("\n\t\t\t      \t1.请在门诊工作时间内提交预约订单，诊所将在30分钟内回复，并在一小时内完成订单处理。"), _c('br'), _vm._v("2.如您在非工作时间提交订单，诊所将在第二日完成订单处理\n\t\t\t      ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "shop_tap bgff"
  }, [_c('span', {
    staticClass: "shop_tap1 active"
  }, [_vm._v("\n\t\t\t\t服务详情\n\t\t\t")]), _vm._v(" "), _c('span', {
    staticClass: "shop_tap2"
  }, [_vm._v("\n\t\t\t\t评价\n\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  }), _vm._v(" "), _c('div', {
    staticClass: "sw_index"
  }, [_c('span', {
    staticClass: "hindex"
  }), _vm._v("/"), _c('span', {
    staticClass: "mintleng"
  })])])
}]}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "errorPage"
  }, [_c('div', {
    staticClass: "errorList"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(144)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "errortext"
  }, [_vm._v(_vm._s(_vm.pStatus))])])])
},staticRenderFns: []}

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loadmore"
  }, [_vm._t("default"), _vm._v(" "), _vm._t("bottom")], 2)
},staticRenderFns: []}

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "teethImg"
  }, [_c('div', {
    staticClass: "others"
  }, [_c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "teethim_context"
  }, [_c('p', {
    staticClass: "teethim_txt"
  }, [_vm._v("口腔全景图")]), _vm._v(" "), _c('div', {
    staticClass: "teethim_img"
  }, [_c('img', {
    staticClass: "noimg",
    attrs: {
      "src": __webpack_require__(38),
      "alt": ""
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('p', {
    staticClass: "give_up"
  }, [_vm._v("你已放弃口腔全景照片拍摄")])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  })]), _vm._v(" "), _c('img', {
    staticClass: "img",
    attrs: {
      "src": ""
    }
  })])])
}]}

/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "-webkit-overflow-scrolling": "touch",
      "overflow": "scroll"
    },
    attrs: {
      "id": "serall"
    }
  }, [_c('div', {
    staticClass: "serfix"
  }, [_c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('div', {
    staticClass: "serve_tap"
  }, [_c('a', {
    staticClass: "ptap active",
    on: {
      "click": _vm.tap1
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t产品介绍\n\t\t\t\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "stap",
    on: {
      "click": _vm.tap2
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t服务说明\n\t\t\t\t\t\t")]), _vm._v(" "), _c('a', {
    staticClass: "qtap",
    on: {
      "click": _vm.tap3
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t常见问题\n\t\t\t\t\t\t")])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "product_info",
    attrs: {
      "id": "product_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "product_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("\n\t\t\t\t\t1、泰康专享洗牙套餐主要为您提供在指定口腔诊所的挂号建档、成人口腔全面检查、超声波洁牙和口腔全景片检查四项服务，各一次（不可拆分使用）。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n\t\t\t\t\t2、本产品有效期为1年，自保单犹豫期后生效，齿科服务有效期内预约有效。保单失效或退保，服务权益失效。\n\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("\n\t\t\t\t\t3、本产品仅限投保泰康人寿相关保险产品的被保险人或投保人使用。\n\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "serve_info",
    attrs: {
      "id": "serve_infoall"
    }
  }, [_c('div', {
    attrs: {
      "id": "serve_info"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("服务咨询及投诉")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("您可拨打"), _c('a', {
    staticClass: "telc",
    attrs: {
      "href": "tel:95522"
    }
  }, [_vm._v("95522")]), _vm._v("对齿科服务相关事项进行咨询以及投诉。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("服务咨询及投诉时间：人工服务基础工作时间为8点至20点，每周工作7天，如遇特殊情况可调整人工服务时间。20点至次日8点为语音提示时间。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("服务预约规则")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("泰康医生APP泰康专享洗牙套餐的卡券为本服务预约的唯一入口。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("您在预约时需确认身份信息，并提供正确联系方式。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("请您按照齿科诊所页面上显示的营业时间进行服务预约，诊所将在1小时内完成订单处理；如您在诊所营业时间之外提交订单的，诊所将在第二日开业后1小时内完成订单处理。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 weit"
  }, [_vm._v("由于医生工作时间变化较大，您所选定的时间为意向就诊时间，最终服务时间将以诊所确认为准，我们将尽力安排最合适的时间为您提供服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("为保证预约顺畅，请至少提前1-5日提交订单，最久可预约时间为1个月。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("预约确认后，我们将在泰康医生APP消息中心正式通知您。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("在您就诊前一天或就诊当天，诊所将联系您提醒就诊安排，并提示相关注意事项。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("就诊当日，请您携带有效的身份证明，按指定时间前往诊所，到达后在前台出示相关证明验证身份后方可接受服务。如因未提供准确的身份证明而无法享受服务，我们将不承担责任。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("如您因特殊情况无法按时就诊，须在就诊当日0：00之前进行线上“取消预约”。如未按规定进行取消，且未到店使用服务，相关资格自动作废，客户因此产生的损失我们不承担责任。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("诊所服务")]), _vm._v(" "), _c('p', {
    staticClass: "p1f"
  }, [_vm._v("您在诊所服务期间，诊所将严格按照《标准洁牙流程规范》为您提供标准服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("其中，由于齿科全景片具有一定辐射性，您可自愿放弃相关服务，诊所在您确定放弃后，须在您的口腔健康档案中明确记录相关事项，并请您签字确认。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("如您接受齿科全景片服务，诊所将在您拍摄完全景照片后，将相关照片上传至您的口腔健康档案，您可在泰康医生齿科服务卡券中进行档案查询。")]), _vm._v(" "), _c('p', {
    staticClass: "p1 p1b"
  }, [_vm._v("我们严禁诊所在洁牙过程中对您进行过度营销，但如果您因自身需要，要求诊所提供进一步齿科治疗服务，诊所可根据实际情况为您酌情提供相关服务，诊所须在提供服务前，与您进行明确沟通，并在您的口腔健康档案中明确记录相关事项，请您签字确认。")]), _vm._v(" "), _c('div', {
    staticClass: "sergap"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "question",
    attrs: {
      "id": "questionall"
    }
  }, [_c('div', {
    attrs: {
      "id": "question"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ptitle"
  }, [_vm._v("常见问题")]), _vm._v(" "), _c('div', {
    staticClass: "questions"
  }, [_c('p', {
    staticClass: "p3 iconq"
  }, [_vm._v("什么情况下不能洗牙？ ")]), _vm._v(" "), _c('div', {
    staticClass: "p4 icona"
  }, [_c('p', {
    staticClass: "p5"
  }, [_vm._v("1) 有传染性疾病的患者：如结核、乙肝表面抗原阳性、艾滋病等。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("2) 使用心脏人工起搏器的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("3) 口腔局部软组织炎症急性期患者（急性坏死性牙龈炎除外）。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("4) 患有牙龈部恶性肿瘤的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("5) 患有各种出血性疾病的患者。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("6) 孕妇。应该在怀孕前接受彻底的口腔治疗。")]), _vm._v(" "), _c('p', {
    staticClass: "p5"
  }, [_vm._v("7) 活动性心绞痛。")])])])])
}]}

/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "agreeServe"
  }, [_c('div', {
    staticClass: "textBox",
    staticStyle: {
      "background-color": "#FFFFFF",
      "padding": "0 1.55rem 1.67rem"
    }
  }, [_c('p', {
    staticClass: "bp"
  }, [_c('span', [_vm._v("服务知情同意书")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      微民保险代理有限公司（以下简称“微保”）、泰康在线财产保险股份有限公司（以下简称“泰康在线”）和泰康健康管理（北京）有限公司（以下简称“泰康健康”）通过整合健康医疗服务资源，为用户提供齿科保健服务。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      微保、泰康在线和泰康健康尊重所有用户的个人信息及隐私权。本“协议”是为尊重及保护所有用户个人信息及隐私的承诺，同时说明了微保、泰康在线和泰康健康对于用户个人信息所采取的收集、保存、使用和保护方式。微保、泰康在线和泰康健康将根据以下条件和条款为你提供服务，“协议”适用于所有微保、泰康在线和泰康健康开展的健康服务。请你在注册成为用户前务必仔细阅读并决定是否接受。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n      一、关于使用的资格与隐私安全\n      ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      客户是指通过微保购买“微医保”产品、并赠送齿科保健健康服务的客户。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      在你使用健康服务之前，你应确保你具备相应民事行为能力，若你不具备前述主体资格，则你及你的监护人应承担因此而导致的一切后果，微保、泰康在线和泰康健康不承担任何责任，且有权放弃健康服务。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      微保、泰康在线和泰康健康在征得你的同意后，有可能与第三方专业公司进行合作，为你提供更加丰富、实用的健康服务，由此涉及的数据传输风险及个人信息安全问题，若非因微保、泰康在线和泰康健康的原因造成你的损害的，微保、泰康在线和泰康健康不承担责任。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n      二、关于健康服务以及信息传播的适用范围与版权\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      微保、泰康在线和泰康健康所承载的具体服务和信息内容（文、图、视频、音频）均以提供有益客户健康的服务为初衷，由于健康服务需求的专业性和个性化特点，微保、泰康在线和泰康健康服务的内容不能确保对所有客户都能适用，因此不对其适用性做任何形式的保证。针对有个性需求的客户的具体健康建议还需咨询医生或相关专业人士。\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      鉴于微保、泰康在线和泰康健康部分资源来源于其他合作方，微保、泰康在线和泰康健康视为已经取得了上述资源的授权使用许可，如果无意中侵犯了你的著作权，敬请告知，经核实后可在第一时间删除，微保、泰康在线和泰康健康对此声明有最终解释权。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("\n      标明来源自微保、泰康在线和泰康健康的资讯（诸如文字、图表、标识、图像、数据等），未经微保、泰康在线和泰康健康书面授权，任何单位或者个人不得以任何方式全部或部分复制、转载、引用、链接、抓取或者以其他方式使用。一旦发现，将追究相关机构和个人的法律责任。\n      ")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("\n        三、关于在服务中将可能收集的你的信息\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("当你接受齿科保健健康服务时，微保、泰康在线和泰康健康将在征得你同意的前提下收集你的相关个人资料，以便进行服务。你须要提供相关个人信息、资料后，方可完成注册程序。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("齿科保健健康服务中的健康档案功能，将可以提取客户在微保、泰康在线和泰康健康签约合作医疗机构中的既往健康相关数据，以形成更加完整的个人健康信息档案，方便提供个性化的健康管理方案。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("你的个人信息资料可能在你首次接受健康服务时提供，也可能在以后为你提供健康服务时，根据需要补充提供。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("如你所提供的相关信息、资料发生变更，你应及时更新以使之真实、完整和准确，你的信息是微保、泰康在线和泰康健康能够根据平台设置正常地为你提供服务的基本前提之一。如有合理理由怀疑你提供的资料错误、不实、过时或不完整的，微保、泰康在线和泰康健康有权向你发出询问及/或要求改正的通知，并有权直接作出删除相应资料的处理，直至终止对你提供部分或全部服务，由此导致你在使用健康服务过程中产生的任何损失或增加的费用，应由你完全独自承担。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康将在必要时由专业技术人员代为对你提供的相关资料进行技术处理及相关完善，以达到服务需求，在此向你告知并征得认可和同意。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("当你通过你的移动设备或其他方式接入以使用微保、泰康在线和泰康健康的服务时，系统可能会通过cookies、web beacon或其他方式自动采集包括你所使用的设备情况或使用的软件等在内的技术信息。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("在你开启设备具有的定位功能并使用微保、泰康在线和泰康健康基于位置信息而提供的服务时，微保、泰康在线和泰康健康将通过GPS或WiFi等方式收集你的地理位置信息。你可以通过关闭定位功能随时停止微保、泰康在线和泰康健康对你的地理位置信息的收集。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("四、关于你个人信息的后续使用")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康将在服务的过程中对所收集的你的信息用于：")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 对收集到的信息进行系统分析、归类和使用，有针对性地为你提供更优化的服务；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为保证在为你提供服务时的安全性，用于对你的身份信息进行验证、进行必要的安全防范和诈骗监控，以及进行必要的存储与备份；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为你设计、向你推荐和提供可能适合你的产品和服务；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 让你参与有关健康服务产品和服务的调查；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 经你许可，由承担同等保密义务的微保、泰康在线和泰康健康的关联公司或合作的第三方向你提供网络服务。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("五、关于对你个人信息的保护原则")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("保护你的隐私是微保、泰康在线和泰康健康的一项基本原则，未经你的许可，微保、泰康在线和泰康健康保证不对外公开或向第三方提供你的注册资料及你在使用本服务或通过微保、泰康在线和泰康健康平台进行相关购买活动时存储在本平台的非公开内容，但下列情况除外：")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 事先获得你的明确授权；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 根据有关的法律法规要求；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 按照相关政府主管部门的要求；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为维护社会公众的利益；")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("- 为维护微保、泰康在线和泰康健康的合法权益。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("六、关于对本协议的更改")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康可能会不时地对本“协议”进行修订。如果本“协议”在用户个人信息政策方面有修改时，会在微保小程序或预约查询页面中的显著位置予以提示，或通过电子邮件，或通过根据你所提供之信息中可供联系的相关方式等途径通知你，如果你选择继续使用微保、泰康在线和泰康健康的服务，则表示你同意接受修订后的协议；如你不同意修改后的协议，你应立即停止使用微保、泰康在线和泰康健康服务平台。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("你了解并确认，你所提供的个人信息及资料系由你自行输入并提供，由于海量信息的存在，且微保、泰康在线和泰康健康无法杜绝可能存在的道德等相关风险及瑕疵，你应谨慎判断并确定相关信息的真实性、合法性和有效性。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("七、免责条款")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("任何由于计算机问题、黑客攻击、计算机病毒侵入或发作、电信部门技术管制、政府行为或其他第三人的原因而造成的暂时性关闭等影响微保、泰康在线和泰康健康正常运行的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，微保、泰康在线和泰康健康均得免责。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康上如有与其他关联公司或合作的第三方网站网页的链接，均不对其他任何网站的内容、隐私政策或运营，或经营这些网站的主体的行为负责。当你在向这些与微保、泰康在线和泰康健康链接的网站提供个人信息之前，请查阅它们的隐私政策。 由于与微保、泰康在线和泰康健康链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果，微保、泰康在线和泰康健康概不负责，亦不负任何法律责任。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("八、赔偿限额")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康会竭诚为你提供相关服务。但若你认为微保、泰康在线和泰康健康有任何违约行为或其他违法行为而向微保、泰康在线和泰康健康提出索赔时，你认可微保和泰康健康的最高责任限额为不超过相对应的服务费用。微保、泰康在线和泰康健康对你的任何间接损失不承担责任。")]), _vm._v(" "), _c('p', {
    staticClass: "p1_h"
  }, [_c('span', {
    staticClass: "title1"
  }, [_vm._v("九、争议管辖")])]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("因本协议相关或因其引起的争议，均应当使用中华人民共和国法律。因本协议引起的或与其相关的争议均应当由北京仲裁委员会仲裁解决，败诉方应承担包括胜诉方律师费在内的一切仲裁费用。")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_vm._v("微保、泰康在线和泰康健康有权依据前述协议相关内容或相关法律法规向你提供服务或终止向你提供的服务，且无须征得你的另行同意或另行提前通知予你。")])])])
}]}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "unorder"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "order_body"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    staticClass: "b_address"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.unorderMsg.orgName))]), _vm._v(" "), _c('p', {
    staticClass: "ad_txt"
  }, [_vm._v(_vm._s(_vm.unorderMsg.orgAddress))])]), _vm._v(" "), _c('div', {
    staticClass: "b_date"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(18),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "date_txt"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.unedate) + "   \n\t\t\t\t"), (_vm.unorderMsg.endTime) ? _c('span', [_vm._v(_vm._s(_vm.unorderMsg.beginTime + '-' + _vm.unorderMsg.endTime))]) : _c('span', [_vm._v(_vm._s(_vm.unorderMsg.beginTime))])]), _vm._v(" "), _c('p')]), _vm._v(" "), _c('div', {
    staticClass: "b_name"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(19),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "name_txt"
  }, [_vm._v(_vm._s(_vm.unorderMsg.name))])])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order3"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(17),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "orders order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt3"
  }, [_vm._v("已完成")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("已爽约，视为自动放弃本服务")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "unorder_footer"
  }, [_vm._v("如果有任何疑问，可联系泰康客服"), _c('a', {
    staticClass: "atel",
    attrs: {
      "href": "tel:400-089-5522"
    }
  }, [_vm._v("400-089-5522")])])
}]}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "toPage"
  }, [_c('div', {
    staticClass: "basemsg"
  }, [_c('div', {
    staticClass: "userMsg"
  }, [_c('a', {
    staticClass: "mint-cell mint-field"
  }, [_c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.inputNo),
      expression: "inputNo"
    }],
    staticClass: "mint-field-core phone policy",
    attrs: {
      "placeholder": "请输入保单号",
      "type": "text"
    },
    domProps: {
      "value": (_vm.inputNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.inputNo = $event.target.value
      }
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "errbtn",
    attrs: {
      "src": __webpack_require__(16),
      "alt": ""
    }
  })])])])])]), _vm._v(" "), _c('footer', {
    staticClass: "tologin"
  }, [_c('input', {
    staticClass: "loginact",
    attrs: {
      "type": "button",
      "value": "跳转"
    },
    on: {
      "click": _vm.toPage
    }
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-cell-title"
  }, [_c('span', {
    staticClass: "mint-cell-text"
  }, [_vm._v("保单号")])])
}]}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkStation",
    style: ({
      '-webkit-overflow-scrolling': _vm.scrollMode
    })
  }, [_c('div', {
    staticClass: "stationbox  clear searchFix",
    attrs: {
      "id": "showSearchBox"
    }
  }, [(_vm.isFoucus == false) ? _c('span', {
    staticClass: "checkCity left",
    on: {
      "click": function($event) {
        _vm.backPlace()
      }
    }
  }, [_vm._v(_vm._s(_vm.showCity))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "searchbox left"
  }, [_c('div', {
    staticClass: "inputbox"
  }, [_c('i', {
    staticClass: "searchicon"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchWord),
      expression: "searchWord"
    }],
    attrs: {
      "type": "search",
      "id": "searchtext",
      "placeholder": "门店名称"
    },
    domProps: {
      "value": (_vm.searchWord)
    },
    on: {
      "focus": function($event) {
        _vm.searchFoucus()
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.searchHospital()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchWord = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.searchWord) ? _c('a', {
    staticClass: "cancelbtn",
    on: {
      "click": function($event) {
        _vm.searchHospital()
      }
    }
  }, [_vm._v("搜索")]) : (_vm.searchWord == '') ? _c('a', {
    staticClass: "cancelbtn",
    on: {
      "click": function($event) {
        _vm.searchHospital()
      }
    }
  }, [_vm._v("取消")]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "modal"
  }, [_c('div', {
    staticClass: "histrybox"
  }, [_vm._m(0), _vm._v(" "), _c('ul', {
    staticClass: "searchList"
  }, [_c('li', _vm._l((_vm.histryWord), function(item) {
    return _c('span', {
      staticClass: "keywords",
      on: {
        "click": function($event) {
          _vm.useHisWord(item)
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "clearbtn",
    on: {
      "click": _vm.clearHistory
    }
  }, [_vm._v("清除历史记录")])])]), _vm._v(" "), _c('div', {
    staticClass: "radioList padtop"
  }, [_c('load-more', {
    ref: "loadmore",
    attrs: {
      "bottom-method": _vm.loadBottom,
      "bottom-all-loaded": _vm.allLoaded,
      "bottomPullText": _vm.bottomText,
      "auto-fill": false
    },
    on: {
      "bottom-status-change": _vm.handleBottomChange
    }
  }, [_c('ul', _vm._l((_vm.hospitalInfo), function(hosp, index) {
    return _c('li', {
      staticClass: "stationli clear",
      attrs: {
        "id": hosp.hospitalId
      }
    }, [_c('i', {
      staticClass: "radiobtn left",
      attrs: {
        "id": index
      },
      on: {
        "click": function($event) {
          _vm.shureCheck(index, hosp)
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "storeInfo left",
      on: {
        "click": function($event) {
          _vm.toshopDetail(index, hosp)
        }
      }
    }, [_c('h2', [_vm._v(_vm._s(hosp.hospitalName))]), _vm._v(" "), _c('p', {
      staticClass: "store Addr"
    }, [_vm._v(_vm._s(hosp.hospitalAddr))]), _vm._v(" "), _c('p', {
      staticClass: "store Fen"
    }, [_vm._v("评分 "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.avgQuality != '--'),
        expression: "hosp.avgQuality !='--'"
      }],
      staticClass: "fNum"
    }, [_vm._v(_vm._s(hosp.avgQuality) + "分")]), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.avgQuality == '--'),
        expression: "hosp.avgQuality =='--'"
      }]
    }, [_c('p', {
      staticClass: "hen"
    }, [_vm._v(" ")]), _c('p', {
      staticClass: "hen"
    }, [_vm._v(" ")])])])]), _vm._v(" "), (index == 0 && hosp.distance) ? _c('div', {
      staticClass: "nearbox"
    }, [(hosp.distance) ? _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index == 0),
        expression: "index==0"
      }],
      staticClass: "near"
    }, [_vm._v("最近")]) : _vm._e()]) : _c('div', {
      staticClass: "nearbox",
      on: {
        "click": function($event) {
          _vm.toshopDetail(index, hosp)
        }
      }
    }, [(hosp.distance) ? _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index == 0),
        expression: "index==0"
      }],
      staticClass: "near"
    }, [_vm._v("最近")]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "navbox left",
      on: {
        "click": function($event) {
          _vm.gotoMap(hosp)
        }
      }
    }, [_c('div', {
      staticClass: "p_distance"
    }, [_c('p', {
      staticClass: "distance"
    }, [(hosp.distance) ? _c('span', [(hosp.distance > '100') ? _c('span', {
      staticClass: "disNum"
    }, [_vm._v(">100km")]) : _vm._e(), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (hosp.distance < '100'),
        expression: "hosp.distance < '100'"
      }],
      staticClass: "disNum"
    }, [_vm._v(_vm._s(hosp.distance ? hosp.distance : '0.0') + "km")])]) : _vm._e()]), _vm._v(" "), _c('p', {
      staticClass: "navicon"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(33),
        "alt": ""
      }
    })])])])])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "loading",
    slot: "bottom"
  }, [_c('mt-spinner', {
    attrs: {
      "size": 25,
      "color": "#26a2ff",
      "type": "fading-circle"
    }
  })], 1)])], 1), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "position": "middle",
      "modal": false
    },
    model: {
      value: (_vm.isCall),
      callback: function($$v) {
        _vm.isCall = $$v
      },
      expression: "isCall"
    }
  }, [_c('div', {
    staticClass: "call-box"
  }, [_c('div', {
    staticClass: "call-title-tel"
  }, [_vm._v("温馨提示")]), _vm._v(" "), _c('div', {
    staticClass: "call-text-tel"
  }, [_vm._v("很抱歉，您所在的城市暂未开通洗牙服务，请联系咨询具体开通时间")]), _vm._v(" "), _c('div', {
    staticClass: "call-btn-container"
  }, [_c('a', {
    staticClass: "call-btn-tel",
    attrs: {
      "id": "callbtn"
    },
    on: {
      "click": function($event) {
        _vm.telphone()
      }
    }
  }, [_vm._v("点击咨询")]), _vm._v(" "), _c('span', {
    staticClass: "call-btn-tel",
    on: {
      "click": function($event) {
        _vm.closeCall()
      }
    }
  }, [_vm._v("取消")])])])]), _vm._v(" "), (_vm.isCall) ? _c('div', {
    staticClass: "call_modal",
    staticStyle: {
      "z-index": "1000"
    },
    on: {
      "click": function($event) {
        _vm.closeCall()
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm._m(1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h2', {
    staticClass: "histitle"
  }, [_c('i', {
    staticClass: "hisicon"
  }), _vm._v("历史记录")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "whiteList"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(34)
    }
  }), _c('span', {
    staticClass: "whitetext"
  }, [_vm._v("没找到相关的匹配结果，请重试")])])
}]}

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "runpage"
  }, [_c('span')])])
}]}

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "evalFill"
  }, [_c('div', {
    staticClass: "others"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "order_warn"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(10),
      "alt": ""
    }
  }), _vm._v(" "), (_vm.status == '1' || _vm.substatu == '1') ? _c('p', [_vm._v("感谢你的服务评价")]) : _c('p', [_vm._v("请对本次服务进行评价")])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), (_vm.status == '1' || _vm.substatu == '1') ? _c('div', {
    staticClass: "evalDetail"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    on: {
      "click": function($event) {
        _vm.teethUrl()
      }
    }
  }, [_c('mt-cell', {
    staticClass: "nobd",
    attrs: {
      "title": "口腔全景图",
      "is-link": "",
      "value": _vm.cellValue
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "org_name",
    on: {
      "click": _vm.shopUrl
    }
  }, [_c('mt-cell', {
    attrs: {
      "title": _vm.orgName,
      "is-link": ""
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "eval_detail heights"
  }, [_c('div', {
    staticClass: "de_header"
  }, [(_vm.selectValuaMsg.sex == 'f') ? _c('img', {
    staticClass: "touxiang",
    attrs: {
      "src": __webpack_require__(21),
      "alt": ""
    }
  }) : _c('img', {
    staticClass: "touxiang",
    attrs: {
      "src": __webpack_require__(22),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "de_left"
  }, [_c('p', {
    staticClass: "de_name"
  }, [_vm._v(_vm._s(_vm.selectValuaMsg.name))]), _vm._v(" "), _c('p', {
    staticClass: "de_num"
  }, [_c('span', [_vm._v("评分")]), (_vm.selectValuaMsg.avg_evaluate) ? _c('span', {
    staticClass: "pos_rel1"
  }, [_vm._l((parseInt(_vm.selectValuaMsg.avg_evaluate)), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(15),
        "alt": ""
      }
    }) : _vm._e()
  }), (_vm.selectValuaMsg.avg_evaluate.charAt(2) > '4') ? _c('img', {
    attrs: {
      "src": __webpack_require__(13),
      "alt": ""
    }
  }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(_vm.selectValuaMsg.avg_evaluate))), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    }) : _vm._e()
  })], 2) : _c('span', {
    staticClass: "pos_rel1"
  }, _vm._l((5), function(n) {
    return _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    })
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "de_right"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.selectValuaMsg.createTime.replace(/\-/g, ".")) + "\n\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "de_body body_hg"
  }, [_c('div', {
    staticClass: "de_txt"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.selectValuaMsg.content) + "\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "debody_img",
    attrs: {
      "id": "debody_img"
    }
  }, _vm._l((_vm.fillsrc), function(s, i) {
    return _c('div', {
      staticClass: "img_over",
      attrs: {
        "data-i": i
      }
    }, [_c('div', {
      staticClass: "img_srec"
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])])
  }))])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  })]) : _c('div', {
    staticClass: "eval_fill"
  }, [_c('div', {
    staticClass: "b_orname"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(9),
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "ad_name"
  }, [_vm._v(_vm._s(_vm.objKey))])]), _vm._v(" "), _c('div', {
    on: {
      "click": function($event) {
        _vm.teethUrl()
      }
    }
  }, [_c('mt-cell', {
    staticClass: "nobd",
    attrs: {
      "title": "口腔全景图",
      "is-link": "",
      "value": _vm.cellValue
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.shopUrl
    }
  }, [_c('mt-cell', {
    attrs: {
      "title": _vm.orgName,
      "is-link": ""
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "eval"
  }, [_c('div', {
    staticClass: "service sone"
  }, [_c('span', [_vm._v("预约时效")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))]), _vm._v(" "), _c('div', {
    staticClass: "service stwo"
  }, [_c('span', [_vm._v("诊所环境")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))]), _vm._v(" "), _c('div', {
    staticClass: "service sthree"
  }, [_c('span', [_vm._v("服务质量")]), _vm._v(" "), _c('div', {
    staticClass: "evalimgs"
  }, _vm._l((_vm.starArr), function(s, i) {
    return _c('span', {
      staticClass: "star star1",
      attrs: {
        "id": s
      },
      on: {
        "click": function($event) {
          _vm.lightStar(i, this)
        }
      }
    })
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "eval_content"
  }, [_c('div', {
    staticClass: "eval_text"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.textarea1),
      expression: "textarea1"
    }],
    attrs: {
      "id": "textarea",
      "placeholder": "你的评价对我们很重要...",
      "name": "",
      "cols": "45"
    },
    domProps: {
      "value": (_vm.textarea1)
    },
    on: {
      "keyup": function($event) {
        _vm.check()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.textarea1 = $event.target.value
      }
    }
  })]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('div', {
    staticClass: "eval_btn",
    on: {
      "click": function($event) {
        _vm.evalLoading()
      }
    }
  }, [_c('input', {
    staticClass: "claOK",
    attrs: {
      "type": "button",
      "value": "提交"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "divheight"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [(_vm.isshow) ? _c('mt-swipe', {
    attrs: {
      "show-indicators": false,
      "auto": 0,
      "defaultIndex": _vm.indexnow
    },
    on: {
      "change": _vm.handleChange
    }
  }, _vm._l((_vm.fillsrc), function(s) {
    return _c('mt-swipe-item', {
      staticStyle: {
        "display": "flex"
      }
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])
  })) : _vm._e(), _vm._v(" "), _c('img', {
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_progress"
  }, [_c('div', {
    staticClass: "order3"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(17),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "order_txt"
  }, [_c('span', {
    staticClass: "orders order_txt1"
  }, [_vm._v("提交申请")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt2"
  }, [_vm._v("预约成功")]), _vm._v(" "), _c('span', {
    staticClass: "orders order_txt3"
  }, [_vm._v("已完成")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eval_img"
  }, [_c('div', {
    staticClass: "upload_pic"
  }, [_c('span', {
    staticClass: "one_pic"
  }, [_c('input', {
    staticClass: "add_img file_but",
    attrs: {
      "accept": "image/*",
      "type": "file",
      "capture": "camera",
      "multiple": ""
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "add_img fl_but",
    attrs: {
      "type": "button"
    }
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  }), _vm._v(" "), _c('div', {
    staticClass: "sw_index"
  }, [_c('span', {
    staticClass: "hindex"
  }), _vm._v("/"), _c('span', {
    staticClass: "mintleng"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "del_bg"
  }, [_c('button', {
    staticClass: "del_ico"
  })])
}]}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "shopDetail"
  }, [_c('img', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "hidden_src",
      "src": __webpack_require__(39)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "shopDet"
  }, [_c('div', {
    staticClass: "shop_banner"
  }, [_c('mt-swipe', {
    attrs: {
      "show-indicators": false
    }
  }, [(_vm.imgSrc) ? _c('mt-swipe-item', [_c('img', {
    attrs: {
      "src": _vm.imgSrc
    }
  })]) : _c('mt-swipe-item', [_c('img', {
    attrs: {
      "src": __webpack_require__(37),
      "alt": ""
    }
  })])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "shop_name bgff"
  }, [_c('p', {
    staticClass: "shop_n1"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalName) + "\n\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "shop_n2"
  }, [_vm._v(" \n\t\t\t\t综合评分"), (_vm.avgQuality != '--') ? _c('span', {
    staticClass: "shop_score"
  }, [_vm._v(_vm._s(_vm.avgQuality)), _c('span', [_vm._l((parseInt(_vm.avgQuality)), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(15),
        "alt": ""
      }
    }) : _vm._e()
  }), (_vm.avgQuality.charAt(2) > '4') ? _c('img', {
    attrs: {
      "src": __webpack_require__(13),
      "alt": ""
    }
  }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(_vm.avgQuality))), function(n) {
    return (true) ? _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    }) : _vm._e()
  })], 2)]) : _vm._e(), (_vm.avgQuality == '--') ? _c('span', {
    staticClass: "shop_score"
  }, [_c('p', {
    staticClass: "gang"
  }), _c('p', {
    staticClass: "gang ganglast"
  }), _c('span', _vm._l((5), function(n) {
    return _c('img', {
      attrs: {
        "src": __webpack_require__(7),
        "alt": ""
      }
    })
  }))]) : _vm._e()])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _c('div', {
    staticClass: "shop_cell bgff"
  }, [_c('div', {
    staticClass: "b_address b_address1"
  }, [_c('p', {
    staticClass: "ad_txt posi_re"
  }, [_c('img', {
    staticClass: "posi_ab",
    attrs: {
      "src": __webpack_require__(14),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalAddr) + "\n\t\t\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "dh_img"
  }), _vm._v(" "), _c('p', {
    staticClass: "shop_guide",
    on: {
      "click": _vm.topage
    }
  }, [_c('span', {
    staticClass: "daoh"
  }, [_vm._v("导航去")]), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.distance),
      expression: "distance"
    }],
    staticClass: "shop_km"
  }, [(_vm.distance <= 100) ? _c('span', [_vm._v(_vm._s(_vm.distance))]) : _c('span', [_vm._v(">100")]), _vm._v("km")])])]), _vm._v(" "), _c('p', {
    staticClass: "line_p"
  }), _vm._v(" "), _c('div', {
    staticClass: "remind_container"
  }, [_c('div', {
    staticClass: "b_date b_date01"
  }, [_c('p', {
    staticClass: "date_txt date_txt01"
  }, [_c('img', {
    staticClass: "posi_ab",
    attrs: {
      "src": __webpack_require__(42),
      "alt": ""
    }
  }), _vm._v("\n\t\t\t\t\t\t门诊时间: "), _c('span', [_vm._v(_vm._s(_vm.hosInfo.hospitalRule))])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('span', {
    staticClass: "sp_remind",
    on: {
      "click": function($event) {
        _vm.remind()
      }
    }
  })])]), _vm._v(" "), _c('p', {
    staticClass: "order_line"
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "eval_detail padd_shop1",
    attrs: {
      "id": "shop_t1"
    }
  }, [_c('ul', {
    staticClass: "ser ser01"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.hosInfo.hospitalDes) + "\n\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "e_detail padd_shop1",
    attrs: {
      "id": "shop_t2"
    }
  }, [(_vm.status == 1) ? _c('div', {
    staticStyle: {
      "-webkit-overflow-scrolling": "touch"
    }
  }, [_c('div', _vm._l((_vm.hosVal), function(item, index) {
    return _c('div', [_c('div', {
      staticClass: "area bgff"
    }, [_c('div', {
      staticClass: "de_header"
    }, [(item.sex == 'F') ? _c('img', {
      staticClass: "touxiang",
      attrs: {
        "src": __webpack_require__(21),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "touxiang",
      attrs: {
        "src": __webpack_require__(22),
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "de_left"
    }, [(item.name) ? _c('p', {
      staticClass: "de_name"
    }, [_vm._v(_vm._s(item.name))]) : _c('p', {
      staticClass: "de_name"
    }, [_vm._v("游客")]), _vm._v(" "), _c('p', {
      staticClass: "de_num de_num01"
    }, [_c('span', [_vm._v("评分")]), (item.avg_evaluate) ? _c('span', {
      staticClass: "pos_rel"
    }, [_vm._l((parseInt(item.avg_evaluate)), function(n) {
      return (true) ? _c('img', {
        attrs: {
          "src": __webpack_require__(15),
          "alt": ""
        }
      }) : _vm._e()
    }), (item.avg_evaluate.charAt(2) > '4') ? _c('img', {
      attrs: {
        "src": __webpack_require__(13),
        "alt": ""
      }
    }) : _vm._e(), _vm._l((5 - Math.round(parseFloat(item.avg_evaluate))), function(n) {
      return (true) ? _c('img', {
        attrs: {
          "src": __webpack_require__(7),
          "alt": ""
        }
      }) : _vm._e()
    })], 2) : _c('span', {
      staticClass: "pos_rel"
    }, _vm._l((5), function(n) {
      return _c('img', {
        attrs: {
          "src": __webpack_require__(7),
          "alt": ""
        }
      })
    }))])]), _vm._v(" "), _c('div', {
      staticClass: "de_right"
    }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s((item.createTime).substr(0, 10).replace(/\-/g, ".")) + "   ")])]), _vm._v(" "), _c('div', {
      staticClass: "d_body padl"
    }, [_c('div', {
      staticClass: "de_txt"
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(item.content) + "\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.fileArray),
        expression: "item.fileArray"
      }],
      staticClass: "debody_img"
    }, _vm._l((item.fileArray), function(p, i) {
      return _c('div', {
        staticClass: "img_over img_over01",
        attrs: {
          "data-i": i
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (p.fileResourceId),
          expression: "p.fileResourceId"
        }],
        staticClass: "img_sre"
      }, [_c('img', {
        staticClass: "img_src",
        attrs: {
          "src": p.fills
        }
      })])])
    }))])]), _vm._v(" "), _c('p', {
      staticClass: "order_line"
    })])
  }))]) : _c('div', {
    staticClass: "area"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOrder),
      expression: "isOrder"
    }],
    staticClass: "shop_footer",
    on: {
      "click": _vm.goOrder
    }
  }, [_c('p', [_vm._v("立即预约")])])]), _vm._v(" "), _c('div', {
    staticClass: "pic_fix",
    staticStyle: {
      "display": "none"
    }
  }, [(_vm.isshow) ? _c('mt-swipe', {
    attrs: {
      "show-indicators": false,
      "auto": 0,
      "defaultIndex": _vm.indexnow
    },
    on: {
      "change": _vm.handleChange
    }
  }, _vm._l((_vm.fillsrc), function(s) {
    return _c('mt-swipe-item', {
      staticStyle: {
        "display": "flex"
      }
    }, [_c('img', {
      attrs: {
        "src": s
      }
    })])
  })) : _vm._e(), _vm._v(" "), _vm._m(2)], 1), _vm._v(" "), _c('div', {
    staticClass: "remind_modal",
    staticStyle: {
      "display": "none"
    }
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "div_remind"
  }, [_c('div', {
    staticClass: "t_remind"
  }, [_c('span', {
    staticClass: "triangle-up"
  }), _vm._v("\n\t\t\t      \t1.请在门诊工作时间内提交预约订单，诊所将在30分钟内回复，并在一小时内完成订单处理。"), _c('br'), _vm._v("2.如您在非工作时间提交订单，诊所将在第二日完成订单处理\n\t\t\t      ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "shop_tap bgff"
  }, [_c('span', {
    staticClass: "shop_tap1 active"
  }, [_vm._v("\n\t\t\t\t服务详情\n\t\t\t")]), _vm._v(" "), _c('span', {
    staticClass: "shop_tap2"
  }, [_vm._v("\n\t\t\t\t评价\n\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chahead"
  }, [_c('div', {
    staticClass: "cha"
  }), _vm._v(" "), _c('div', {
    staticClass: "sw_index"
  }, [_c('span', {
    staticClass: "hindex"
  }), _vm._v("/"), _c('span', {
    staticClass: "mintleng"
  })])])
}]}

/***/ })
],[103]);
//# sourceMappingURL=app.6ff1886425e9ca5d82ca.js.map