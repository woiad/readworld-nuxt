import { request } from '@/plugins/request'

/**
 * @summary 获取公共文章列表
 * @param {string} params
 */
export function getArticle(params) {
  return request({
    method: 'get',
    url: 'api/articles',
    params
  })
}

/**
 * @summary 获取关注文章列表
 * @param {string} params
 */
export function getFeedArticle(params) {
  return request({
    method: 'get',
    url: 'api/articles/feed',
    params
  })
}


/**
 * @summary 添加点赞
 * @param {string} slug
 */
export function addFavorite(slug) {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * @summary 删除点赞
 * @param {string} slug
 */
export function deleteFavorite(slug) {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * @summary 获取文章详情
 * @param {string} slug
 */
export function getArticleDetail(slug) {
  return request({
    method: 'get',
    url: `/api/articles/${slug}`
  })
}

/**
 * @summary 提交文章评论
 * @param {string} slug
 * @param {string} comment
 */
export function addComments(slug, comment) {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body: comment
      }
    }
  })
}


/**
 * @summary 获取文章评论
 * @param {string} slug
 */
export function getComments(slug) {
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`
  })
}

/**
 * @summary 添加文章
 * @param {string} title
 * @param {string} description
 * @param {string} body
 * @param {array} tagList
 */
export function addArticles(title, description, body, tagList) {
  return request({
    method: 'post',
    url: `/api/articles`,
    data: {
      article: {
        title,
        description,
        body,
        tagList
      }
    }
  })
}
