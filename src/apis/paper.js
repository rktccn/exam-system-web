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
export const getPaperList = (type, offset = 0, limit = 10) => {
  return http({
    url: '/paper/list',
    method: 'get',
    params: {
      limit,
      offset,
      type
    }
  })
}

// 获取学生试卷列表
export const getStudentPaperList = (studentId, type, offset = 0, limit = 10) => {
  return http({
    url: '/paper/student-list',
    method: 'get',
    params: {
      studentId,
      limit,
      offset,
      type
    }
  })
}


// 获取考试
export const getExam = (studentPaperId, userId) => {
  return http({
    url: '/paper/exam-detail',
    method: 'get',
    params: {
      studentPaperId, userId
    }
  })
}
