<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="image"
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    :disabled="isLoading"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="username"
                    class="form-control form-control-lg"
                    type="text"p
                    laceholder="Your Name"
                    :disabled="isLoading"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    v-model="bio"
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    :disabled="isLoading"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="email"
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    :disabled="isLoading"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="password"
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    :disabled="isLoading"
                  >
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" @click="submitUpdate" :disabled="isLoading">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'Settings',
  moddleware: 'authenticated',
  asyncData ({ store }) {
    const user = store.state.user
    console.log(user)
    const { bio, image, password, username, email } = user
    return {
      bio,
      image,
      password,
      username,
      email
    }
  },
  data () {
    return {
      password: null,
      isLoading: false
    }
  },
  methods: {
    async submitUpdate () {
      this.isLoading = true
      const data = {
        user: {
          email: this.email,
          bio: this.bio,
          image: this.image,
          username: this.username
        }
      }
      if (this.password) data.user.password = this.password
      await updateUser(data)
      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
