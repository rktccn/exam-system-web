import http from '../utils/http.js';

// 添加题目
// params: {
//   teacherId,
//   content,
//   type,
//   score,
//   options: [
//     {
//       content,
//       isCorrect,
//       score,
//     }
// }
export const addQuestion = (data) => {
  console.log('data', data);
  return http({
    url: '/question/add',
    method: 'post',
    data,
  });
};

// 获取题目列表及答案
export const getQuestionList = () => {
  return http({
    url: '/question/list',
    method: 'get',
  });
};

// 修改题目
// params: {
//   teacherId,
//   content,
//   type,
//   score,
//   options: [
//     {
//       content,
//       isCorrect,
//       score,
//     }
// }
export const updateQuestion = (data) => {
  return http({
    url: '/question/update',
    method: 'post',
    data,
  });
};
