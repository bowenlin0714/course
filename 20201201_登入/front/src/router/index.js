import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    meta: {
      needLogin: true
    }
  }
]

const router = new VueRouter({
  routes
})

// 進入每頁前檢查登入狀態
// to 即將訪問的頁面
// from 來源頁面
// next 導向動作
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && store.state.login.length === 0) {
    alert('請登入')
    // 導向到登入頁
    next('/')
  } else {
    // 原本去哪就島去哪
    next()
  }
})

export default router
