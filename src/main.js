import Vue from 'vue'
import App from './App.vue'
// 适配界面，初始化样式
import '@/mobile/flexible'
import '@/styles/reset.css'
import router from '@/router' //路由对象
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Cell,
  Icon,
  Search,
  List,
} from 'vant'
//导入vant组件

Vue.use(List)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
