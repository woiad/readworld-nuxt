<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(message, field) in errors" :key="field">{{ field }} {{ message }}</li>
          </ul>

          <form @submit.prevent="onSubmit" @keyup.enter="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model=user.email class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input
              v-model=user.password
              class="form-control form-control-lg"
              type="password"
              placeholder="Password"
              required

            >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isLoading">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { login, register } from '@/api/user'

// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {},
      isLoading: false
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'Login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        const { data } = this.isLogin
          ? await login(this.user.email, this.user.password)
          : await register(this.user.username, this.user.email, this.user.password)

        this.$store.commit('setUser', data.user)

        // 为了防止页面数据刷新丢失，需要把数据持久化
        Cookie.set('setUser', JSON.stringify(data.user))
        this.isLoading = false
        this.$router.push({ path: '/' })
      } catch (err) {
        this.isLoading = false
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>
