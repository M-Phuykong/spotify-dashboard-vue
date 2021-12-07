import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false

//constant for now
Vue.prototype.$home_uri = "http://localhost:8080/home";
Vue.prototype.$client_id = "67d525ed562d48da86b39e4a10f48c6f";
Vue.prototype.$client_secret = "b68020f8cd0642e9a6312bbfc1abe450"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
