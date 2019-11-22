import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  base: "/",
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home},
  ]
});