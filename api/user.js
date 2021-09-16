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

/**
 * @summary 修改用户信息
 * @param {object} data
 */
export function updateUser(data) {
  return request({
    method: 'put',
    url: '/api/user',
    data
  })
}

/**
 * @summary 获取用户信息
 * @param {string} username
 */
export function getUser(username) {
  return request({
    method: 'get',
    url: `/api/profiles/${username}`
  })
}

/**
 * @summary 关注用户
 * @param {string} username
 */
export function followUser(username) {
  return request({
    method: 'post ',
    url: `/api/profiles/${username}/follow`
  })
}

/**
 * @summary 取消关注用户
 * @param {string} username
 */
export function unFollowUser(username) {
  return request({
    method: 'delete  ',
    url: `/api/profiles/${username}/follow`
  })
}
