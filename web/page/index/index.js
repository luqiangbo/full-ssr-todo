import React from 'react'
import { Button, Pagination } from 'antd'

import './index.less'

function Page(props) {
  return (
    <div>
      <Button type='primary'>Primary Button</Button>
      <Button>Default Button</Button>
      <div>
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  let ens = {}
  if (__isBrowser__) {
    ens = await window.fetch('/api/user').json()
  } else {
    ens = ctx.service.user.find()
  }
  // console.log('page-ens', { ens })
  return {}
}

export default Page
