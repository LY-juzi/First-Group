import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/index',
    component: Layout,
    name: '首页',
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页',
        icon: 'fa fa-h-square'
      }
    }]
  },
  {
    path: '/cityManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/cityManage/index'),
      meta: {
        title: '城市管理',
        icon: 'fa fa-building'
      }
    }]
  }, 
  {
    path: '/businessManage',
    component: Layout,
    redirect: '/businessManage/index/business',
    meta: {
      title: '商家管理',
      icon: 'fa fa-building'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/businessManage/index'),
      children: [{
        path: 'business',
        hidden: true,
        component: () => import('@/views/businessManage/business'),
        meta: {
          title: '商家列表'
        }
      }]
    }]
  },
  {
    // 一级路由
    path: '/recruitManage',
    component: Layout,
    redirect: '/recruitManage/index/doing',
    meta: {
      title: '招聘管理',
      icon: 'fa fa-life-ring'
    },
    // 二级路由
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/recruitManage/index'),
      // 三极路由
      children: [{
        path: 'doing',
        hidden: true,
        component: () => import('@/views/recruitManage/doing'),
        meta: {
          title: '招聘中'
        }
      }, {
        path: 'finish',
        hidden: true,
        component: () => import('@/views/recruitManage/finish'),
        meta: {
          title: '招聘完结'
        }
      }]
    }]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/index/user',
    meta: {
      title: '用户管理',
      icon: 'fa fa-user-circle-o'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/userManage/index'),
      children: [{
        path: 'user',
        hidden: true,
        component: () => import('@/views/userManage/user'),
        meta: {
          title: '用户列表'
        }
      }]
    }]
  },
  {
    path: '/moduleManage',
    component: Layout,
    redirect: '/moduleManage/index/city',
    meta: {
      title: '模块管理',
      icon: 'fa fa-th'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/moduleManage/index'),
      children: [{
        path: 'city',
        hidden: true,
        component: () => import('@/views/moduleManage/city'),
        meta: {
          title: '城市管理'
        }
      }, {
        path: 'boon',
        hidden: true,
        component: () => import('@/views/moduleManage/boon'),
        meta: {
          title: '福利管理'
        }
      }, {
        path: 'position',
        hidden: true,
        component: () => import('@/views/moduleManage/position'),
        meta: {
          title: '职位管理'
        }
      }]
    }]
  },
  {
    path: '/waiterManage',
    component: Layout,
    redirect: '/waiterManage/index/waiter',
    meta: {
      title: '客服管理',
      icon: 'fa fa-users'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/waiterManage/index'),
      children: [{
        path: 'waiter',
        hidden: true,
        component: () => import('@/views/waiterManage/waiter'),
        meta: {
          title: '客服列表'
        }
      }]
    }]
  },
  {
    path: '/limitManage',
    component: Layout,
    redirect: '/limitManage/index/limit',
    meta: {
      title: '权限管理',
      icon: 'fa fa-gratipay'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/limitManage/index'),
      children: [{
        path: 'limit',
        hidden: true,
        component: () => import('@/views/limitManage/limit'),
        meta: {
          title: '权限列表'
        }
      }]
    }]
  },
  {
    path: '/wantForJobContact',
    component: Layout,
    redirect: '/wantForJobContact/index/job',
    meta: {
      title: '求职联系',
      icon: 'fa fa-address-book'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/wantForJobContact/index'),
      children: [{
        path: 'job',
        hidden: true,
        component: () => import('@/views/wantForJobContact/job'),
        meta: {
          title: '求职列表'
        }
      }]
    }]
  },
  {
    path: '/checkManage',
    component: Layout,
    redirect: '/checkManage/index/business',
    meta: {
      title: '审核模块',
      icon: 'fa fa-check-square-o'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/checkManage/index'),
      children: [{
        path: 'business',
        hidden: true,
        component: () => import('@/views/checkManage/business'),
        meta: {
          title: '商家审核'
        }
      }, {
        path: 'recruit',
        hidden: true,
        component: () => import('@/views/checkManage/recruit'),
        meta: {
          title: '招聘审核'
        }
      }]
    }]
  },
  {
    path: '/appManage',
    component: Layout,
    redirect: '/appManage/index/category',
    meta: {
      title: 'APP管理',
      icon: 'fa fa-bandcamp'
    },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/appManage/index'),
      children: [{
        path: 'category',
        hidden: true,
        component: () => import('@/views/appManage/category'),
        meta: {
          title: '栏目管理'
        }
      }, {
        path: 'hot',
        hidden: true,
        component: () => import('@/views/appManage/hot'),
        meta: {
          title: '热门推荐'
        }
      }, {
        path: 'adv',
        hidden: true,
        component: () => import('@/views/appManage/adv'),
        meta: {
          title: '广告管理'
        }
      }]
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
