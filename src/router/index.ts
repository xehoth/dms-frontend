import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Item from '../views/Item.vue'
import Vote from '../views/Vote.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue';
import Ques from '../views/Ques.vue';
import Manual from '../views/Manual.vue';
import Dorm from '../views/Dorm.vue';
import Form from '../views/Form.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      // { name: 'home', path: '/', component: Home },
      { name: 'manual', path: '/', component: Manual },
      // { name: 'manual', path: '/manual', component: Manual },
      { name: 'dorm', path: '/dorm', component: Dorm },
      { name: 'form', path: '/form', component: Form }
    ]
  },
  {
    path: '/login',
    component: Login,
    // children: [
    //   { name: 'home', path: '/', component: Login },
    //   { name: 'vote', path: '/vote', component: Vote },
    //   { name: 'about', path: '/about', component: About },
    //   { name: 'items', path: '/:item', component: Item, props: true }
    // ]
  }
  // ,
  // {
  //   path: '/:student',
  //   component: Main,
  //   props: true,
  //   children: [
  //     { name: 'ques', path: '/', component: Ques },
  //   ]
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
