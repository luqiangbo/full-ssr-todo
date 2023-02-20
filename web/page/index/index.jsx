import React, { useEffect } from 'react'
import { Table, Input, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'

import { apiUserList } from '@/api/user'
import CNav from '@/components/nav'

import './index.less'

const { Search } = Input
const columnsUser = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 200,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <div>
        <Button className='mr-1' icon={<EditOutlined />}>
          编辑
        </Button>
        <Popconfirm title='删除' description='确定要删除么' onConfirm={confirm} okText='确定' cancelText='取消'>
          <Button danger className='mr-1' icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>
      </div>
    ),
  },
]

function Page(props) {
  const [state, setState] = useSetState({
    userList: [],
    navKey: '/',
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

  const onSearch = (e) => {
    if (e.trim()) {
      console.log('查询', e)
    }
  }

  return (
    <div className='page-index'>
      <CNav nav={state.navKey} />
      <div>
        <Button
          onClick={() => {
            const navKey = state.navKey === '/news' ? '/user' : '/news'
            setState({
              navKey,
            })
          }}
        >
          {state.navKey}
        </Button>
      </div>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  let ens = {}
  if (__isBrowser__) {
  } else {
  }
  // console.log('page-ens', { ens })
  return {}
}

export default Page
