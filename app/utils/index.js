exports.to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

exports.resWin = {
  code: 1,
}
exports.resErr = {
  code: 0,
}

exports.res200 = (ctx, data) => {
  ctx.type = 'text/json'
  ctx.status = 200
  ctx.body = data
}
