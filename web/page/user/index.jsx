import React, { useEffect } from 'react'
import { Table, Input, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'

import { apiUserList } from '@/api/user'
import CNav from '@/components/nav'
import CModalEdit from './model_edit'

import './index.less'

const { Search } = Input

function Page(props) {
  const [state, setState] = useSetState({
    userList: [],
    navKey: '/user',
    modalEdit: false,
    modalEditData: {},
  })

  const columnsUser = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
      width: 200,
      render: (_, record) => {
        let gender = '空'
        if (record.sex === 0) {
          gender = '女'
        } else if (record.sex === 1) {
          gender = '男'
        }
        return <div>{gender}</div>
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (_, record) => (
        <div>
          <Button
            className='mr-1'
            icon={<EditOutlined />}
            onClick={() => {
              setState({
                modalEdit: true,
                modalEditData: {
                  type: 'edit',
                  ...record,
                },
              })
            }}
          >
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
      <h1 className='title'>用户管理</h1>
      <div className='p-1 flex'>
        <Button
          className='mr-1'
          onClick={() => {
            setState({
              modalEdit: true,
              modalEditData: {
                type: 'add',
              },
            })
          }}
        >
          添加
        </Button>
        <Search placeholder='查询' onSearch={onSearch} />
      </div>
      <div>
        <Table dataSource={state.userList} columns={columnsUser} rowKey={'_id'} />
      </div>
      {state.modalEdit ? (
        <CModalEdit
          data={state.modalEditData}
          onCancel={() => {
            setState({
              modalEdit: false,
            })
          }}
        />
      ) : null}
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
