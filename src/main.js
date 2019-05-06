import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PouchDB from 'pouchdb-browser'
import VuePouch from './db/db'
import pouchVue from 'pouch-vue'

PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-live-find'));

PouchDB.plugin(require('pouchdb-authentication'));

Vue.config.productionTip = false;

Vue.use(pouchVue, {
  pouch: PouchDB,
  defaultDB: 'books',
  optionDB: {},
  // debug: '*'
})

const myVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.myVue = myVue