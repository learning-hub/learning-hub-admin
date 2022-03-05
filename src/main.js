import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element组件
import './plugins/element.js'
import 'default-passive-events'
// 引入全局样式表
import './assets/css/global.css'
// 第三方表格
import ZkTable from 'vue-table-with-tree-grid'
// 导入axios
import axios from 'axios'
// 配置默认请求头
Vue.component('ZkTable', ZkTable)
// 挂载axios到原型
Vue.filter('dataFormat', function (origin) {
  const dt = new Date(origin)
  // 年
  const y = dt.getFullYear()
  // 月 如果不足两位用padstart来填充0
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  // 日
  const d = (dt.getDate() + '').padStart(2, '0')
  // 小时
  const hh = (dt.getHours() + '').padStart(2, '0')
  // 分钟
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  // 秒
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//  响应拦截器
axios.interceptors.response.use(config => {
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
