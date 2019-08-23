import request from '@/util/request'

export function article_list(datas) {
  return request({
    url: '/admin/article_list',
    method: 'get',
    params: datas
  })
}
