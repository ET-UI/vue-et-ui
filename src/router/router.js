import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import Home from '@/views/Home'
import Dialog from '@/views/Dialog/index'
import Btn from '@/views/Btn'
import Picker from '@/views/Picker'

Vue.use(Router)

export default new Router({
  base: "/",
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/dialog', name: 'dialog', component: Dialog},
    {path: '/btn', name: 'btn', component: Btn},
    {path: '/picker', name: 'picker', component: Picker},
  ]
});