const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止是数据冲突，务必要把 state 定义成一个函数，返回数据对象

export const state = () => {
  return {
    // 当前用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调佣
  // 作用: 初始化容器数据,传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.setUser)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}