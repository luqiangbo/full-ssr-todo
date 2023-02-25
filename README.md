# 一个 js 全栈项目

> 项目介绍: 一个 node 全栈项目, 几年前在公司的一些全栈项目中使用, 最近没事整理归纳下。代码沿用当时的版本，后面计划使用新版的 egg-react-ssr 框架再来一遍。希望帮助到有需要的人，少走弯路，不优雅的地方望提出来，大家一起进步。

# Egg + React + SSR 应用骨架

详细用法实现请查看[官方文档](http://doc.ssr-fc.com/)

# 框架介绍/框架功能/框架特性

- [x] 基于 cra 脚手架开发，由 cra 开发的 React App 可无缝迁移，如果你熟悉 cra 的配置，上手成本几乎为 0
- [x] 小而美，相比于 beidou，next.js 这样的高度封装方案，我们的实现原理和开发模式一目了然
- [x] 推荐使用 egg 作为 Node.js 框架但并不强制，事实上你可以发现几乎无需做任何修改即可迁移到 koa,nest.js 等框架
- [x] 同时支持 SSR 以及 CSR 两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置
- [x] 支持切换路由时自动获取数据
- [x] 支持本地开发 HMR
- [x] 稳定性经过线上大规模应用验证，可提供性能优化方案
- [x] 支持 tree shaking，优化构建 bundle 大小以及数量
- [x] 支持 csr/ssr 自定义 layout，无需通过 path 来手动区分
- [x] 抛弃传统模版引擎，拥抱 React 组件，使用 JSX 来作为模版
- [x] 独创[最佳发布实践](http://ykfe.surge.sh/guide/deploy.html)，让你更新页面无需重启应用机器
- [x] 配套结合[antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd)的 example 的实现
- [x] 配套结合[react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable)做路由分割的 example 的实现
- [x] 配套结合[dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva)做数据管理的 example 的实现
- [x] 配套阿里云 serverless [FC](https://github.com/ykfe/ssr-with-fc)版本的实现
- [x] 配套[TypeScript](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts)版本的实现

## 项目技术介绍

> egg egg-mongoose react ahooks antd axios

> egg 生态圈和 react 生态圈

## 项目准备

默认本地已经安装好前端环境

### 克隆仓库

git clone https://github.com/luqiangbo/full-ssr-todo.git

### 安装依赖

pnpm i

## 安装数据库

### 部署本地 mongodb

#### 安装 mongodb

```

docker pull mongo

```

#### 部署 mongodb

```bash
// linux
docker run --name mongodb_server -p 27016:27017 -v /root/docker/mongodb/mongodb_server/configdb:/data/configdb/ -v /root/docker/mongodb/mongodb_server/db/:/data/db/ -d mongo --auth

// window
docker run --name mongodb_server -p 27016:27017 -v /D/docker/mongodb/mongodb_server/configdb:/data/configdb/ -v /D/docker/mongodb/mongodb_server/db/:/data/db/ -d mongo --auth

// mac
docker run --name mongodb_server -p 27016:27017 -v ~/admin/docker/mongodb/mongodb_server/configdb:/data/configdb/ -v ~/admin/docker/mongodb/mongodb_server/db/:/data/db/ -d mongo  --auth
```

#### 查询 mongodb id

```bash
docker ps  -a
```

#### mongodb 的用户名和密码是基于特定数据库的，而不是基于整个系统的。所有所有数据库 db 都需要设置密码

```bash
# 进入容器
docker exec -it  a7e5d4e4ca69
# 进入mongo
mongosh admin

# 切库, 新增用户
use admin
db.createUser({ user: 'admin', pwd: 'admin12306', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] })

// 认证用户
db.auth("admin", "admin12306") // 如果返回1，则表示成功。
# 新建your库
use your
# 新建用户
db.createUser({ user: "your", pwd: "admin12306", roles: [{ role: "dbOwner", db: "your" }] })

db.createUser({ user: "other", pwd: "admin12306", roles: [{ role: "readWrite", db: "your" }] })

# 展示数据库
show dbs

```

#### 角色

1. Read：允许用户读取指定数据库
2. readWrite：允许用户读写指定数据库
3. dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile
4. userAdmin：允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户
5. clusterAdmin：只在 admin 数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
6. readAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读权限
7. readWriteAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读写权限
8. userAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 userAdmin 权限
9. dbAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 dbAdmin 权限。
10. root：只在 admin 数据库中可用。超级账号，超级权限

### 编辑//config.default.js 连接 mongodb

```js
  mongoose: {
    // 数据库的连接方式 用户名:密码@ip:端口/数据库名称
    url: 'mongodb://other:admin12306@127.0.0.1:27016/your',
  }
```

# 开发调试

### 本地调试

> pnpm dev 前端服务端口:7001 后端服务端口:8000

### 上线

> pnpm prod

# 代码介绍

前端后端使用不同的 eslint 配置

## 配置

. config 主要是后端的配置 . build 主要是 webpack 相关的配置

## 前端

- api // 接口封装
- assets // 静态文件
- components // 全局组件
- layout
- page // 页面
- utils // 工具类

## 后端

- controller // 业务逻辑
- extend
- middleware // 中间件
- model // 数据模块
- public // 静态文件 和上传文件存放目录
- service // 数据库操作
- utils // 工具类
- validate // 入参校验

### egg 插件介绍

```
// config/plugin.local.js
egg-proxy
egg-mongoose  mongoose 数据库
egg-cors 跨域
egg-validate 入参校验

```

### egg 全局配置

```
// config/plugin.default.js
const path = require('path')
const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = (appInfo) => {
  return {
    keys: 'egg-ssr',
    static: {
      prefix: '/',
      dir: [ // 静态文件地址
        resolvePath('../dist'),
        // {
        //   prefix: '/public', // static 有bug, 不知道为啥就是不生效
        //   dir: path.join(appInfo.baseDir, 'app/public/static'),
        // },
        {
          prefix: '/public/web', // 存放不需要打包的静态文件
          dir: path.join(appInfo.baseDir, 'app/public/web'),
        },
        {
          prefix: '/public/upload', // 上传文件保存目录
          dir: path.join(appInfo.baseDir, 'app/public/upload'),
        },
      ],
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
    multipart: {
      // 上传文件的配置
      mode: 'file',
      fileSize: '50mb',
    },
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
      host: 'http://127.0.0.1:7001',
    },
    middleware: ['logger'], // 中间件
  }
}


```

### 数据库设计

```
const NewSchema = new Schema(
  {
    __v: { select: false },
    name: { type: String, default: null }, // 姓名
    age: { type: Number, default: null }, // 年龄
    gender: { type: Number, default: null }, // 性别
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }, // 创建时间和更新时间
)

return mongoose.model('user', NewSchema, 'c_user') // 数据库别名 不填c_user的话, 默认仓库名users
```

### 接口封装

> request.js 使用 to 函数, 避免接口链式调用,前端后端通用, 避免接口面条地狱, 特别是后端会有很多接口逻辑前后依赖,

```
export const to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])
// 错误返回值
exports.resErr = (ctx, body) => {
  ctx.type = 'text/json'
  ctx.status = 200
  ctx.body = stringify({
    data: null,
    ...body,
    code: 1,
  })
}
// 正确返回值
exports.resWin = (ctx, body) => {
  ctx.type = 'text/json'
  ctx.status = 200
  ctx.body = stringify({
    data: null,
    ...body,
    code: 0,
  })
}

const [err,res] = to(api())
if(err) {
  return resErr(ctx,{})
}

const [err1,res1] = to(api(res))
if(err1) {
  return resErr(ctx,{})
}
resWin(ctx,{})
```

### restful 规范 增删改查

- 增 post

```
// controller 获取入参
const req = ctx.request.body
// service mongoose新增
ctx.model.User.create(data)
```

- 删 delete

```
// controller 获取入参
const req = ctx.request.body
// service mongooses删除
ctx.model.User.remove(data)

```

- 改 put

```
// controller 获取入参
const req = ctx.request.body
// service mongooses更新
const { _id, ...other } = data
return ctx.model.User.update({ _id }, { $set: other })

```

- 查 get

```
// controller 获取入参
const { query } = ctx
// service mongooses查询
ctx.model.User.find()

```

- 分页 get

```
ctx.model.User.find(other)
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ _id: -1 })

```

- 上传文件

```
接收入参
const { files } = ctx.request
 // 遍历处理多个文件
const filePathList = []
for (const file of files) {
  const { mimeType, filepath, filename } = file
  const filename1 = filename.replace(/\.(\w+)$/, `-${Date.now()}.$1`) // 文件名+时间
  const data = fs.readFileSync(filepath)
  const base64str = Buffer.from(data, 'binary').toString('base64') // 转base64
  const bufferData = Buffer.from(base64str, 'base64')
  const dirName = mimeType.split('/')[0] // 获取文件类型
  const uplaodBasePath = '../../app/public/upload/' // 存放路径
  const dir = path.join(__dirname, uplaodBasePath, dirName)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir) // 检查文件夹, 没有就创建
  const src = path.join(__dirname, uplaodBasePath, dirName, filename1)
  await fs.writeFileSync(src, bufferData) 写入文件
  filePathList.push({
    fileUrl: `${host}/public/upload/${dirName}/${filename1}`, // 返回文件地址
  })
}
resWin(ctx, { filePathList })
return
}


```
