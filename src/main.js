import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router/"
import store from "./store/index"
import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "font-awesome/css/font-awesome.css"
import Message from "vue-m-message"

Vue.use(Message) // will mount `Vue.prototype.$message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
