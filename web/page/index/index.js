import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useSetState } from 'ahooks'
import { apiUserList } from '@/api/user'
import { columnsUser } from './data'

import './index.less'

function Page(props) {
  const [state, setState] = useSetState({
    userList: [],
  })

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const [err, res] = await apiUserList()
    console.log('init', { err, res })
    if (res) {
      setState({
        userList: res.data,
      })
    }
  }

  return (
    <div>
      <h1>增删改查</h1>
      <div>
        <Table dataSource={state.userList} columns={columnsUser} rowKey={'_id'} />;
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
