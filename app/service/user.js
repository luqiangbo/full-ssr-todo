'use strict'

const { Service } = require('egg')

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
    return ctx.model.User.remove(data)
  }
}

module.exports = UserService
