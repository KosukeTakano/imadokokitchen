import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

// TOP
import KichenCarTop from '@/views/KitchenCarTop.vue'
// ログインページ
import Manager from '@/views/Manager.vue'
// 新規・ログイン登録
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
// 新規登録内容画面
import NewReg from '@/views/NewReg.vue'
// キッチンカー検索結果
import Search from '@/views/Search.vue'
// 店舗情報
import Store from '@/views/Store.vue'
// 登録内容の編集(店舗情報)
import Edit from '@/views/Edit.vue'
// 登録内容の編集(メニュー)
import MenuEdit from '@/views/MenuEdit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: KichenCarTop },
  { path: '/signup', component: SignUp },
  { path: '/signin', component: SignIn },
  { path: '/manager', component: Manager },
  { path: '/search', component: Search },
  { path: '/store/:{id}', component: Store, name: 'store' },
  { path: '/edit', component: Edit },
  { path: '/menuedit', component: MenuEdit },
  { path: '/newreg', component: NewReg }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登録したidの中に現在のidがないと、editにはいけない
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requireAuth && !isAuthenticated) {
    next('/signup')
  } else {
    next()
  }
})

export default router
