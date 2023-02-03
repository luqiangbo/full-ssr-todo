// 文章列表
const Controller = require('egg').Controller
const { to, resWin, resErr } = require('../utils')

class UserController extends Controller {
  async find() {
    const { ctx } = this
    const [err, res] = await to(ctx.service.content.find())
    if (err) {
      ctx.logger.error(err)
      resErr(ctx, { err })
      return
    }
    resWin(ctx, { res })
    return
  }
  // 增加
  async insert() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      author: { type: 'string', required: true }, // 作者
      intro: { type: 'string', required: true }, // 文章简介
      image: { type: 'string', required: true }, // 图片
      detail: { type: 'string', required: true }, // 文章详情
      tags: { type: 'string', required: true }, // 标签
      types: { type: 'string', required: true }, // 类型
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      resErr(ctx, { errValidate })
      return
    }
    const [err, res] = await to(ctx.service.content.add(req))
    if (err) {
      ctx.logger.error(err)
      resErr(ctx, { err })
      return
    }
    ctx.logger.info(req)
    resWin(ctx, { message: '添加成功', data: res })
    return
  }
  // 改
  async update() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      _id: { type: 'string', required: true },
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      resErr(ctx, { errValidate })
      return
    }
    const [err, res] = await to(ctx.service.content.update(req))
    if (err) {
      ctx.logger.error(err)
      resErr(ctx, { err })
      return
    }
    resWin(ctx, { message: '更新成功', data: res })
    return
  }
  async remove() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      _id: { type: 'string', required: true },
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      resErr(ctx, {
        data: errValidate,
      })
      return
    }
    const [err, res] = await to(ctx.service.content.remove(req))
    if (err) {
      ctx.logger.error(err)
      resErr(ctx, { err })
      return
    }
    resWin(ctx, {
      message: '删除成功',
      data: res,
    })
    return
  }
}

module.exports = UserController
