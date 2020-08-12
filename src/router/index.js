import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home2',
    redirect: (to) => {
      return '/home';
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "personal" */ '../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "personal" */ '../views/Profile.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chatapp" */ '../views/Chat.vue'),
    children: [
      {
        path: 'chatapp',
        component: () => import(/* webpackChunkName: "chatapp" */ '../views/ChatApp.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('-------------->beforeEach');
  // console.log('from: ', from, '\n to: ', to);
  next();
});


export default router
