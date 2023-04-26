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
