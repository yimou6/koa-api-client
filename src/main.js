import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import './assets/iconfont/iconfont.css'
import VueLazyLoad from 'vue-lazyload'

import { initUser } from '@/utils'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI,{
  size: 'small',
  zIndex: 1000
})

Vue.use(VueLazyLoad)

initUser()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
