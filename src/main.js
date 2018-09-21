import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import axios from 'axios'
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
axios.interceptors.request.use(function(config) {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
})
axios.interceptors.response.use(function(response) {
  if (response.data.meta.status === 401) {
    router.push('/login')
    localStorage.removeItem('token')
  }
  return response
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
