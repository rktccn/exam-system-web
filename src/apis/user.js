import http from '../utils/http.js'


export function login(no = null, email = null, password) {

  console.log(no, password, email)

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
