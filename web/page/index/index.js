import React, { useEffect } from 'react'
import { Table, Input, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { apiUserList } from '@/api/user'
// import { columnsUser } from './data'

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
    title: 'Action',
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

  const onSearch = () => {
    console.log('查询')
  }

  return (
    <div className='page-index'>
      <h1 className='title'>用户管理</h1>
      <div className='p-1'>
        <Search placeholder='查询' onSearch={onSearch} />
      </div>
      <div>
        <Table dataSource={state.userList} columns={columnsUser} rowKey={'_id'} />
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
