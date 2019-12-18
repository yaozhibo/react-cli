import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://localhost:8082',
  timeout: 40000
})

// 请求前拦截
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

// 返回后拦截
service.interceptors.response.use(
  response => {
    const res = response.data 
    return res
  },
  err => {
    if (err.response) {
      if (err.response.status === 504 || err.response === 404) {
        console.log('找不到此服务')
      } else if (err.response.status === 401) {
        console.log('登陆信息无效')
      } else if (err.response.status === 500) {
        console.log('服务器挂了')
      }
    } else {
      console.log('请求无响应')
    }
    

    return Promise.reject(err)
  }
)

export default service
