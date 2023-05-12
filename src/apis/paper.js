import http from '../utils/http.js'

// 创建试卷
export const createPaper = (data) => {
  return http({
    url: '/paper/add',
    method: 'post',
    data: {
      teacherId: 2,
      ...data
    }
  })
}


// 获取试卷列表
export const getPaperList = () => {
  return http({
    url: '/paper/list',
    method: 'get'
  })
}
