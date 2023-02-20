const ratelimit = require('koa-ratelimit')

const db = new Map()
// 请求频率限制
module.exports = () => {
  return ratelimit({
    db: db,
    driver: 'memory',
    duration: 60000,
    errorMessage: '请求次数超过限制',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Upload-Limit-Remaining',
      reset: 'Uplaod-Limit-Reset',
      total: 'Upload-Limit-Total',
    },
    max: 300,
    disableHeader: false,
  })
}
