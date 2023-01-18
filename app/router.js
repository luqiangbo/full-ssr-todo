'use strict'

const config = require('../config/config.ssr')

module.exports = (app) => {
  const { router, controller } = app
  config.routes.map((route) => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
  router.get('/api/user', controller.user.find)
  router.post('/api/user', controller.user.insert)
  router.put('/api/user', controller.user.update)
  router.delete('/api/user', controller.user.remove)
}