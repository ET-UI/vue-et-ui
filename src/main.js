import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router.js';

import {
  toast,
} from './components/index';

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
