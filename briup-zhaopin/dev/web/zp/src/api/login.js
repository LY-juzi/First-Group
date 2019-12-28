import axios from '@/utils/axios'
export function login(username, password) {
  return axios({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function getInfo(token) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
export function logout() {
  return axios({
    url: '/user/logout',
    method: 'post'
  })
}
