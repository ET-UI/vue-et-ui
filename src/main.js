import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router.js';

import {
  Toast, Alert, Confirm
} from './components/index';

Vue.use(Toast);
Vue.use(Alert);
Vue.use(Confirm);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
