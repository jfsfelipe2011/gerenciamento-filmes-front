import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueStore from './vuex/store'
import VueFlashMessage from 'vue-flash-message'

Vue.use(Vuex)
Vue.use(VueFlashMessage)

let store = new Vuex.Store(VueStore)

sync(store, router)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    let data = {
      client_id:     process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
      grant_type:    process.env.VUE_APP_API_GRANT_TYPE,
      username:      process.env.VUE_APP_API_USERNAME,
      password:      process.env.VUE_APP_API_PASSOWRD,
      scope:         process.env.VUE_APP_API_SCOPE
    }

    axios(
          { 
            method: "POST",
            "url":  process.env.VUE_APP_API_URL + '/oauth/token', 
            "data": data
          }
        ).then(response => {
          localStorage.token = response.data.access_token
        }).catch(error => {
          localStorage.error = error
        })
  }
}).$mount('#app')
