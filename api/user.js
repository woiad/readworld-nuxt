import { request } from '@/plugins/request'

/**
 * @summary 登录
 * @param {string} email
 * @param {string} password
 */
export function login(email, password) {
  return request({
    method: 'post',
    url: 'api/users/login',
    data: {
      user: {
        email,
        password
      }
    }
  })
}

/**
 * @summary 注册
 * @param {string} email
 * @param {string} username
 * @param {string} password
 */
export function register(username, email, password) {
  return request({
    method: 'post',
    url: 'api/users',
    data: {
      user: {
        username,
        email,
        password
      }
    }
  })
}