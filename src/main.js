// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { CHECK_AUTH } from '@/store/actions.type'


import vmodal from 'vue-js-modal'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'



Vue.config.productionTip = false


Vue.use(vmodal, {
  dialog: true,
  dynamic: true,
}) 

router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
