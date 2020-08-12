import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import api from './assets/config/api'
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App),
  data() {
    return {
      api
    }
  },
}).$mount('#app')
