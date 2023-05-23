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
export const getStudentPaperList = (
  studentId,
  type,
  offset = 0,
  limit = 10
) => {
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
      studentPaperId,
      userId
    }
  })
}

// 提交试卷
export const submitPaper = (studentPaperId, answers) => {
  return http({
    url: '/paper/submit',
    method: 'post',
    data: {
      studentPaperId,
      answers
    }
  })
}

// 获取考试结果
export const getExamResult = (studentPaperId) => {
  return http({
    url: '/paper/result',
    method: 'get',
    params: {
      studentPaperId
    }
  })
}

// 获取考试结果概况
export const getExamResultSummary = (paperId) => {
  return http({
    url: '/paper/result-summary',
    method: 'get',
    params: {
      paperId
    }
  })
}

// 获取试卷详情
export const getPaperDetail = (paperId) => {
  return http({
    url: '/paper/detail',
    method: 'get',
    params: {
      paperId
    }
  })
}
