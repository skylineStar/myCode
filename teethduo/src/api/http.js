 /**http配置 */
 // 引入axios以及element ui中的loading和message组件
 import axios from 'axios'
 import { Indicator,Toast} from 'mint-ui'
// 超时时间
axios.defaults.timeout = 25000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
   Indicator.open({text: '加载中...',spinnerType: 'snake'}) 
   return config
}, error => {
   Indicator.close();
   Toast({ message: '请检查您的网络连接并重试',duration: 2000,className:'mToast'})
   return Promise.reject(error)
 })
 // http响应拦截器
 axios.interceptors.response.use(data => {// 响应成功关闭loading
   Indicator.close();
   return data
 }, error => {
   	Indicator.close();
// 	Toast({ message: '加载失败',duration: 2000,className:'mToast'})
   	Toast({ message: '请检查您的网络连接并重试',duration: 2000})
   	return Promise.reject(error)
 }) 
export default axios