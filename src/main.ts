import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
