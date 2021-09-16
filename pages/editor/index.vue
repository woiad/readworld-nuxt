<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <div v-for="(messages, field) in errors" :key="field">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </div>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="article.title"
                    :disabled="isLoading"
                  />
              </fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="article.description"
                    :disabled="isLoading"
                  />
              </fieldset>
              <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                    :disabled="isLoading"
                  />
              </fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keyup.enter="addTag"
                    :disabled="isLoading"
                  />
                <div class="tag-list">
                  <span v-for="(tag, index) in article.tagList" :key="tag + index" class="tag-default tag-pill">
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{ tag }}
                </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" :disabled="isLoading" @click="submitArticle">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { addArticles } from '@/api/article'
export default {
  name: 'Editor',
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: '',
        body: '',
        description: '',
        tagList: []
      },
      tag: '',
      errors: {},
      isLoading: false
    }
  },
  methods: {
    addTag () {
      if (this.article.tagList.includes(this.tag) || !this.tag) return false
      this.article.tagList.push(this.tag)
      this.tag = null
    },
    removeTag (ind) {
      this.article.tagList.splice(ind, 1)
    },
    async submitArticle () {
      this.isLoading = true
      this.errors = {}
      addArticles (
        this.article.title, this.article.description, this.article.body, this.article.tagList
      ).then(res => {
        const { data } = res
        this.$router.push({ path: `/article/${data.article.slug}` })
      }).catch(err => {
        this.errors = err.response.data.errors
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style>

</style>
