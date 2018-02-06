/**
 * @author zhanglf
 * @version 1.0
 * @description 鉴权、授权模块
 *
 */

import jwt from 'jwt-js'

export default class Auth {
  constructor() {
    this._TokenKey = 'token'
    this._RefreshTokenKey = 'refreshToken'
    this._whiteList = ['/login']
  }
  getToken(tokenName = this._TokenKey) {
    return localStorage.getItem(tokenName)
  }
  getRefreshToken(tokenName = this._RefreshTokenKey) {
    return localStorage.getItem(tokenName)
  }
  setToken(token, tokenName = this._TokenKey) {
    return localStorage.setItem(tokenName, token)
  }
  setRefreshToken(token, tokenName = this._RefreshTokenKey) {
    return localStorage.setItem(tokenName, token)
  }
  removeToken(tokenName = this._TokenKey) {
    return localStorage.removeItem(tokenName)
  }
  decodeToken(token) {
    return jwt.decodeToken(token)
  }
}
