const Controller = require('egg').Controller
const { to, resWin, resErr } = require('../utils')

class UserController extends Controller {
  async find() {
    const { ctx } = this

    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = await ctx.service.user.find()
    } catch (error) {
      ctx.logger.error(error)
    }
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
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = {
        ...resErr,
        data: errValidate,
      }
      return
    }
    const data = await ctx.service.user.add(req)
    ctx.type = 'text/json'
    ctx.status = 200
    ctx.body = {
      ...resWin,
      message: '添加成功',
      data,
    }
  }
  // 改
  async update() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true }, // 名称
      age: { type: 'number', required: true }, // 年龄
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = {
        ...resErr,
        data: errValidate,
      }
      return
    }
    const data = await ctx.service.user.update(req)
    ctx.type = 'text/json'
    ctx.status = 200
    ctx.body = {
      ...resWin,
      message: '更新成功',
      data,
    }
  }
  async remove() {
    const { ctx, app } = this
    const req = ctx.request.body
    const validate = {
      id: { type: 'string', required: true },
    }
    const errValidate = app.validator.validate(validate, req)
    if (errValidate) {
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = {
        ...resErr,
        data: errValidate,
      }
      return
    }
    const data = await ctx.service.user.remove(req)
    ctx.type = 'text/json'
    ctx.status = 200
    ctx.body = {
      ...resWin,
      message: '删除成功',
      data,
    }
  }
}

module.exports = UserController
