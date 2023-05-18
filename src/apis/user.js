import http from '../utils/http.js'


export function login(no = null, email = null, password) {

  return http({
    url: '/login',
    method: 'post',
    data: {
      no,
      email,
      password
    }
  })
}

export function register(no, password, email, name, age) {
  return http({
    url: '/register',
    method: 'post',
    data: {
      no,
      password,
      email,
      name,
      age
    }
  })
}


// 获取用户列表
export function getAllUser(res) {

  return http({
    url: '/role/all',
    method: 'get',
    params: {
      limit: res?.limit | 10,
      offset: res?.offset | 0,
      permission: res?.permission
    }
  })
}

// 获取用户数量
export function getUserCount(permission) {
  return http({
    url: '/user/count',
    method: 'get',
    params: {
      permission
    }
  })
}

// 更新用户信息
export function updateUser(userId, no, email, name, age, password, permission) {
  return http({
    url: '/user/update',
    method: 'post',
    data: {
      userId,
      no,
      email,
      name,
      age,
      password,
      permission
    }
  })
}
