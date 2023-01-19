import { request } from '@/utils/request'

export const apiUserList = (data) => request({ url: 'api/user', method: 'get' })
export const apiUserAdd = (data) => request({ url: 'api/user', method: 'post', data })
export const apiUserUpdate = (data) => request({ url: 'api/user', method: 'put', data })
export const apiUserRemove = (data) => request({ url: 'api/user', method: 'delete', data })
