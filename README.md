# Egg + React + SSR 应用骨架

详细用法实现请查看[官方文档](http://ykfe.surge.sh)

# 功能/特性

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

### 本地调试

> pnpm dev

### 上线

> pnpm prod

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
    url: 'mongodb://admin:admin12306@127.0.0.1:27016/admin',
  }
```
