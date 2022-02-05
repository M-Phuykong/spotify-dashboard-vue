import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store/auth';

Vue.config.productionTip = false

//constant for now
Vue.prototype.$home_uri = "https://spotiboard.onrender.com/home";
Vue.prototype.$backend_url = "https://spotiboard-backend-dhys.onrender.com"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
