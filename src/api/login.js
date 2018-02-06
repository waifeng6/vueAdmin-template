import Axios from '../utils/request'

class LoginApi {
  login(username, password) {
    const data = {
      username,
      password
    }
    return Axios({
      url: '/api/auth/login',
      method: 'post',
      data
    })
  }

  getInfo(token) {
    return Axios({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  }

  logout() {
    return Axios({
      url: '/user/logout',
      method: 'post'
    })
  }
}

export default LoginApi
