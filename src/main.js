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
  apiKey: 'AIzaSyC58NGPjIide6lgZquXm-0mFjecE-wsfJs',
  authDomain: 'my-project01-2b200.firebaseapp.com',
  databaseURL: 'https://my-project01-2b200.firebaseio.com',
  projectId: 'my-project01-2b200',
  storageBucket: 'my-project01-2b200.appspot.com',
  messagingSenderId: '555349876649',
  appId: '1:555349876649:web:f77b0993bdb87709316eb8',
  measurementId: 'G-K6YP9EVVWN'
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
    key: 'AIzaSyCHvSFSRJ5WNe5ii8MzJU_Gts0398251Nw',
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  }
})

Vue.use(VueGeolocation)
