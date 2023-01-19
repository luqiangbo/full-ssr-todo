import axios from 'axios'

export const to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

const baseUrl = 'http://localhost:8000'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10 * 1000,
  headers: { baseUrl },
})

// 入参拦截
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 出参拦截
instance.interceptors.response.use(
  (response) => {
    const { data } = response
    console.log({ response })
    return Promise.resolve(data)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const request = (data) => {
  return to(
    instance({
      method: 'post',
      ...data,
    }),
  )
}
