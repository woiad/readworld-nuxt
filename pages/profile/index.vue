<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{ active: profile.following }"
              :disabled="isFollowLoading"
              @click="onFollow(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'UserProfile',
                    params: {
                      username: profile.username
                    },
                    query: {
                      tab: 'author'
                    }
                  }"
                  exact
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'UserProfile',
                    params: {
                      username: profile.username
                    },
                    query: {
                      tab: 'favorited'
                    }
                  }"
                  exact
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'UserProfile',
                params: {
                  username: profile.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{ name: 'UserProfile', params: { username: profile.username } }">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'Article', params: { slug: article.slug } }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li v-for="(tag, index) in article.tagList" :key="tag + index" class="tag-default tag-pill tag-outline">
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: item === page
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'UserProfile',
                    query: {
                      page: item,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->

        </div>

      </div>
  </div>

</div>

</template>

<script>
import { getUser, followUser, unFollowUser } from '@/api/user'
import { getArticle } from '@/api/article'
import { addFavorite, deleteFavorite } from '@/api/article'

export default {
  name: 'UserProfile',
  middleware: 'authenticated',
  watchQuery: ['tab'],
  async asyncData({ params, query }) {
    const { data } = await getUser(params.username)
    const { tab = 'author', page = 1 } = query
    const limit = 20
    const offset = (page - 1) * limit
    const { data: articleRes } = await getArticle({
      [tab]: data.profile.username,
      limit,
      page
    })

    const { articles = [], articlesCount = 0 } = articleRes
    const totalPage = Math.ceil(articlesCount / limit)
    articles.forEach(article => {
      article.favoriteDisabled = false
      article.followDisabled = false
    })

    return {
      profile: data.profile,
      totalPage,
      articles,
      tab,
      page
    }
  },
  data () {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    async onFavorite (article) {
      try {
        this.isLoading = true
        if (article.favorited) {
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },
    async onFollow(profile) {
      this.isFollowLoading = true
      try {
        if (!profile.following) {
          await followUser(profile.username)
        } else {
          await unFollowUser(profile.username)
        }
        this.isFollowLoading = false
      } catch (err) {
        console.log(err)
        this.isFollowLoading = false
      }
    }
  }
}
</script>

<style>

</style>
