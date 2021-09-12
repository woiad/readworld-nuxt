/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // 自定义规则
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除 nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          name: 'layoutIndex',
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            // 默认子路由
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            {
              path: '/login',
              name: 'Login',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/register',
              name: 'Register',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/profile/:username',
              name: 'UserProfile',
              component: resolve(__dirname, 'pages/profile')
            },
            {
              path: '/settings',
              name: 'Settings',
              component: resolve(__dirname, 'pages/settings')
            },
            {
              path: '/editor',
              name: 'Editor',
              component: resolve(__dirname, 'pages/editor')
            },
            {
              path: '/article/:slug',
              name: 'Article',
              component: resolve(__dirname, 'pages/article')
            }
          ]
        }
      ])
    }
  },

  // 服务端部署设置
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}