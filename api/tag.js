import { request } from '@/plugins/request'

/**
 * @summary 获取列表标签列表
 */
export function getTags() {
  return request({
    method: 'get',
    url: 'api/tags'
  })
}