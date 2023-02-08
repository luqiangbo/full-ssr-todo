const stringify = require('json-stable-stringify')

exports.to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

exports.resErr = (ctx, body) => {
  ctx.type = 'text/json'
  ctx.status = 200
  ctx.body = stringify({
    ...body,
    code: 1,
  })
}

exports.resWin = (ctx, body) => {
  ctx.type = 'text/json'
  ctx.status = 200
  ctx.body = stringify({
    ...body,
    code: 0,
  })
}
