import Vue from 'vue'
import App from './App'
// 引入阿里云图标库
import './static/icon/iconfont.css'
// 引入http模块
import http from 'http/http.js'

Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
