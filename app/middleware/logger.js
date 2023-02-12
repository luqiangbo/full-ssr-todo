module.exports = (options) => {
  return async function log(ctx, next) {
    const req = ctx.request.body
    ctx.logger.info(req)
    await next()
  }
}
