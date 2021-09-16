<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">
          {{ tag }}
        </li>
      </ul>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />

      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { getArticleDetail } from '@/api/article'
import MardownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'


export default {
  name: 'Article',
  components: {
    ArticleMeta,
    ArticleComments
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.article.description
      }]
    }
  },
  async asyncData ({ params }) {
    const { data } = await getArticleDetail(params.slug)
    const { article } = data
    const md = new MardownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  }
}
</script>

<style>

</style>
