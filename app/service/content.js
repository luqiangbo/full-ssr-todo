'use strict'

const { Service } = require('egg')

class ContentService extends Service {
  // 查询
  find() {
    const { ctx } = this
    return ctx.model.Content.find()
  }
  // 添加
  add(data) {
    const { ctx } = this
    return ctx.model.Content.create(data)
  }
  // 更新
  update(data) {
    const { ctx } = this
    return ctx.model.Content.update(data)
  }
  // 删除
  remove(data) {
    const { ctx } = this
    return ctx.model.Content.remove(data)
  }
}

module.exports = ContentService
