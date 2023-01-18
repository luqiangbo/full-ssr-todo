exports.to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

exports.resWin = {
  code: 1,
}
exports.resErr = {
  code: 0,
}
