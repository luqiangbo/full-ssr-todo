'use strict'

const { Service } = require('egg')
const { to, resWin, resErr } = require('../utils')

class UserService extends Service {
  // 查询
  find() {
    const { ctx } = this
    return ctx.model.User.find()
  }
  // 添加
  async add(data) {
    const { ctx } = this
    const [err, res] = await to(ctx.model.User.create(data))
    if (err) {
      return {
        ...resErr,
        data: err,
      }
    }
    return resWin
  }
  // 更新
  async update(data) {
    const { ctx } = this
    const [err, res] = await to(ctx.model.User.update(data))
    if (err) {
      return {
        ...resErr,
        data: err,
      }
    }
    return resWin
  }
  // 删除
  async remove(data) {
    const { ctx } = this
    const [err, res] = await to(ctx.model.User.remove({ _id: data.id }))
    if (res.deletedCount !== 1) {
      return {
        ...resErr,
        data: err,
      }
    }
    return resWin
  }
}

module.exports = UserService
