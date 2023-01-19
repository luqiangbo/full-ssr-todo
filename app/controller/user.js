const Controller = require('egg').Controller
const { to, resWin, resErr, res200 } = require('../utils')

class UserController extends Controller {
  async find() {
    const { ctx } = this
    const [err, res] = await to(ctx.service.user.find())
    if (err) {
      ctx.logger.error(err)
    }
    res200(ctx, { ...resWin, data: res })
    return
  }
  // 增加
  async insert() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      name: { type: 'string', required: true }, // 名称
      age: { type: 'number', required: true }, // 年龄
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      res200(ctx, {
        ...resErr,
        data: errValidate,
      })
      return
    }
    const [err, res] = await to(ctx.service.user.add(req))
    if (err) {
      ctx.logger.error(err)
    }
    res200(ctx, {
      ...resWin,
      message: '添加成功',
      data: res,
    })
    return
  }
  // 改
  async update() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      id: { type: 'string', required: true },
      name: { type: 'string', required: false }, // 名称
      age: { type: 'number', required: false }, // 年龄
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      res200(ctx, { ...resErr, data: errValidate })
      return
    }
    const [err, res] = await to(ctx.service.user.update(req))
    if (err) {
      ctx.logger.error(err)
    }
    res200(ctx, {
      ...resWin,
      message: '更新成功',
      data: res,
    })
    return
  }
  async remove() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      id: { type: 'string', required: true },
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      res200(ctx, {
        ...resErr,
        data: errValidate,
      })
      return
    }
    const [err, res] = await to(ctx.service.user.remove(req))
    if (err) {
      ctx.logger.error(err)
    }
    res200(ctx, {
      ...resWin,
      message: '删除成功',
      data: res,
    })
    return
  }
}

module.exports = UserController
