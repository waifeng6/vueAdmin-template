import axios from 'axios'
import Jwt from 'jsonwebtoken'
import { Message } from 'element-ui'
// import store from '../store'
import Auth from './auth'
const auth = new Auth()
let isExpired = false
const Axios = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 10000
})

// 请求拦截器
Axios.interceptors.request.use(config => {
  // 如果是post请求，要加入特殊的头部信息
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json'
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
  }
  if (auth.getToken()) {
    if (Jwt.decode(auth.getToken()).exp * 1000 < new Date().getTime()) {
      console.log('token 过期')
      isExpired = true
      config.url = '/api/auth/token'
      config.method = 'get'
    }
  }
  if (isExpired) {
    config.headers['Authorization'] = 'Bearer  ' + auth.getToken()
  } else {
    config.headers['Authorization'] = 'Bearer  ' + auth.getRefreshToken()
  }
  return config
}, error => {
  return new Promise().resolve(error)
})

// 响应拦截器
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      console.log(response.data)
      if (response.data) {
        auth.setToken(response.data.token)
        auth.setRefreshToken(response.data.refreshToken)
      }
    }
    return response // 这里直接返回response，把Promise接口暴露给外部使用
  },
  error => {
    const errorCode = error.response.status
    switch (errorCode) {
      case 401:
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 403:
        Message({
          message: '访问被拒绝403',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 404:
        Message({
          message: '访问的功能不存在',
          type: 'error',
          duration: 5 * 1000
        })
        break
      default:
        Message({
          message: '未知错误',
          type: 'error',
          duration: 5 * 1000
        })
    }
    return Promise.reject(error)
  }
)
export default Axios
