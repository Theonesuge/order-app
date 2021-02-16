import Vue from 'vue'
import App from './App'
// 引入阿里云图标库
import './static/iconfont/iconfont.css'
// 引入http模块
import http from 'http/http.js'
// 引入uview-ui库
import uView from "uview-ui"
// 引入vuex
import store from './store'

// 使用uview-ui
Vue.use(uView);

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
