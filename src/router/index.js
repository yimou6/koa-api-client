import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

// 需要权限的商城页面
const shopAuthRoutes = [
  {
    path: 'address',
    name: 'Address',
    component: () => import('@/views/shop/address')
  },
  {
    path: 'bag',
    name: 'Bag',
    component: () => import('@/views/shop/bag')
  },
  {
    path: 'order',
    name: 'Order',
    component: () => import('@/views/shop/order')
  }
]

// 商城管理页面
const adminAuthRoute = {
  path: '/admin',
  name: 'Admin',
  component: () => import('@/views/admin/layout/index'),
  children: [
    {
      path: '/',
      redirect: '/admin/home'
    },
    {
      path: 'home',
      name: 'ManageHome',
      component: () => import('@/views/admin/home')
    },
    {
      path: 'user',
      name: 'ManageUser',
      component: () => import('@/views/admin/user')
    },
    {
      path: 'good',
      name: 'ManageGood',
      component: () => import('@/views/admin/good')
    },
    {
      path: 'order',
      name: 'ManageOrder',
      component: () => import('@/views/admin/order')
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/shop/layout'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/shop/home'),
      },
      {
        path: '/good/:id',
        name: 'currentPhone',
        component: () => import('../views/shop/goods/PhoneShow.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

function createRouter() {
  return new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  console.log(router.getRoutes())
}

// 是否已添加路由
let isGenerateRoutes = false
function generateRoutes() {
  // 已登陆则添加 地址、订单、购物车 路由
  if (!hasRoute('Address')) {
    shopAuthRoutes.forEach(route => {
      router.addRoute('Shop', route)
    })
  }
  if (store.state.userInfo.level !== 2 && !hasRoute('Admin')) {
    // 管理员则添加 管理页面 的路由
    router.addRoute(adminAuthRoute)
  }
  isGenerateRoutes = true
}

function hasRoute(routeName) {
  return router.getRoutes().some(route => route.name === routeName)
}

router.beforeEach((to, form, next) => {
  const path = to.redirectedFrom || to.path
  if (store.state.token) {
    if (!isGenerateRoutes) {
      generateRoutes()
      return next({ path, replace: true })
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
