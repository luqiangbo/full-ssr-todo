import React, { useEffect } from 'react'
import { Table } from 'antd'
import { setState } from 'ahooks'
import { apiUserList } from '@/api/user'

import './index.less'

function Page(props) {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const [err, res] = await apiUserList()
    console.log('init', { err, res })
  }

  return (
    <div>
      <h1>增删改查</h1>
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
