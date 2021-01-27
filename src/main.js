import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import SIcon from './components/sicon.vue';

Vue.config.productionTip = false;

Vue.component('s-icon', SIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
