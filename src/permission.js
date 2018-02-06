import router from './router'
import Auth from './utils/auth' // 验权
const auth = new Auth()
export const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log(auth.getToken())
  // 到登录页面的都放行
  if (whiteList.indexOf(to.path) >= 0) {
    if (auth.getToken() !== null) {
      router.push({ path: '/dashboard' })
      return
    }
    next()
    return
  }
  // 未登录
  if (auth.getToken() === null) {
    router.push({ path: '/login' })
    next()
    return
  } else {
    next()
    return
  }
})
