import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

const firebaseconfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}
firebase.initializeApp(firebaseconfig)

let app
firebase.auth().onAuthStateChanged(currentUser => {
  console.log(currentUser)
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  }
})

Vue.use(VueGeolocation)
