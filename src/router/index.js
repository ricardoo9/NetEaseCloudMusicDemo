// 路由模块的配置
import Vue from 'vue'
import VueRouter from 'vue-router'
// 创建路由规则
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Play from '@/views/Play'
import Search from '@/views/Search'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: { title: '首页' },
      },
      {
        path: 'search',
        component: Search,
        meta: { title: '搜索' },
      },
    ],
  },
  {
    path: '/play',
    component: Play,
  },
]

const router = new VueRouter({
  routes,
  //   mode: history,
})
// 导出路由对象
export default router
