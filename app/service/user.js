'use strict'

const { Service } = require('egg')
const { to } = require('../utils')

class UserService extends Service {
  // 查询
  find() {
    const { ctx } = this
    return ctx.model.User.find()
  }
  // 分页
  async findPage(data) {
    const { ctx } = this
    const { page, limit, ...other } = data
    return ctx.model.User.find(other)
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ _id: -1 })
  }

  // 总数
  async findCounts(data) {
    const { ctx } = this
    const { page, limit, ...other } = data
    return ctx.model.User.count(other)
  }
  // 添加
  add(data) {
    const { ctx } = this
    return ctx.model.User.create(data)
  }
  // 更新
  update(data) {
    const { ctx } = this
    const { _id, ...other } = data
    return ctx.model.User.update({ _id }, { $set: other })
  }
  // 删除
  remove(data) {
    const { ctx } = this
    return ctx.model.User.remove(data)
  }
}

module.exports = UserService
