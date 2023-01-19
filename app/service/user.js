'use strict'

const { Service } = require('egg')
const { to } = require('../utils')

class UserService extends Service {
  // 查询
  find() {
    const { ctx } = this
    return ctx.model.User.find()
  }
  // 添加
  add(data) {
    const { ctx } = this
    return ctx.model.User.create(data)
  }
  // 更新
  update(data) {
    const { ctx } = this
    return ctx.model.User.update(data)
  }
  // 删除
  remove(data) {
    const { ctx } = this
    return ctx.model.User.remove({ _id: data.id })
  }
}

module.exports = UserService
