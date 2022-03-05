import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '_Page/login.vue'
import Home from '_Page/home-page.vue'
import Userlist from '_Page/user-list.vue'
import Welcome from '_Page/welcome.vue'
import userGroupList from '_Page/user-group-list.vue'
import Rolelist from '_Page/role-list.vue'
import problemList from '_Page/problem-list.vue'
import contestList from '_Page/contest-list.vue'
import addProblemList from '_Component/problem-list/add-problem-list.vue'
import showMember from '_Component/contest-list/show-member.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: './login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: './welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/userlist', component: Userlist },
        { path: '/usergrouplist', component: userGroupList },
        { path: '/rolelist', component: Rolelist },
        { path: '/problemlist', component: problemList },
        { path: '/problemlist/addproblemlist', component: addProblemList },
        { path: '/contestlist', component: contestList },
        { path: '/contestlist/showmember', component: showMember }
      ]
    }
  ]
})
// 路由导航守卫控制访问权限
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径来的
//   // next一个回调函数
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   // console.log(tokenStr)
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
