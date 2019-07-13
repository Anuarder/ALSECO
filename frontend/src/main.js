import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TableComponent from "./components/Table/Table"
import DialogComponent from "./components/Dialog/Dialog"

Vue.config.productionTip = false

Vue.component('table-component', TableComponent);
Vue.component('dialog-component', DialogComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
