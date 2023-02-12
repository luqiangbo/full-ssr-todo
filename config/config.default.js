const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public/static'), resolvePath('../app/public/web')],
  },
  mongoose: {
    // 数据库的连接方式 用户名:密码@ip:端口/数据库名称
    url: 'mongodb://other:admin12306@127.0.0.1:27016/your',
    options: {
      useUnifiedTopology: true, // 重连
      useFindAndModify: false, // 解决useFindAndModify的警告 Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
    },
  },
  security: {
    // egg默认安全插件 https://eggjs.org/zh-cn/core/security.html
    xframe: {
      enable: false,
    },
    csrf: { enable: false },
  },
  // multipart: {
  //   // 上传文件的配置
  //   mode: 'file',
  // },
  httpclient: {
    // 解决 dns 错误
    enableDNSCache: true,
  },
  cors: {
    // 跨域解决
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  },
  validate: {
    // 入参校验
    convert: false, // 将基元参数转换为特定类型 默认 false 对参数可以使用convertType规则进行类型转换
    validateRoot: false, // 配置是否验证传递的值必须是对象 默认 false
  },
  custom: {
    // 配置文件
  },
  middleware: ['logger'],
}
