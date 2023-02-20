import React, { useEffect } from 'react'
import { Table, Form, Input, InputNumber, Button, Popconfirm, Select, Pagination } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSetState, useUpdateEffect } from 'ahooks'
import { nanoid } from 'nanoid'

import { apiUserList, apiUserRemove } from '@/api/user'
import CNav from '@/components/nav'
import CModalEdit from './model_edit'

import './index.less'

const { Option } = Select

function Page() {
  const [form] = Form.useForm()
  const [state, setState] = useSetState({
    navKey: '/user',
    reqUser: {
      page: 1,
      limit: 5,
    }, // 查询参数
    total: null,
    userList: [], // 数据列表
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
        if (record.gender === 0) {
          gender = '女'
        } else if (record.gender === 1) {
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
                  _type: 'edit',
                  ...record,
                },
              })
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title='删除'
            description='确定要删除么'
            onConfirm={() => {
              onFetchRemove({ _id: record._id })
            }}
            okText='确定'
            cancelText='取消'
          >
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

  useUpdateEffect(() => {
    onFetchQuery()
  }, [JSON.stringify(state.reqUser)])

  const init = () => {
    onFetchQuery()
  }

  const onFetchQuery = async () => {
    const { id, ...other } = state.reqUser
    const [err, res] = await apiUserList(other)
    if (err) return
    if (res) {
      setState({
        userList: res.data.list,
        total: res.data.total,
      })
    }
  }
  const onFetchRemove = async (data) => {
    const [err, res] = await apiUserRemove(data)
    if (err) return
    onFetchQuery()
  }

  return (
    <div className='page-index'>
      <CNav nav={state.navKey} />
      <h1 className='title'>用户管理</h1>
      <div className='p-1 flex'>
        <div>
          <Form
            form={form}
            layout='inline'
            onFinish={(e) => {
              console.log('form', { e })
              setState({
                reqUser: {
                  ...state.reqUser,
                  ...e,
                  id: nanoid(),
                },
              })
            }}
          >
            <Form.Item label='名字' name='name'>
              <Input />
            </Form.Item>
            <Form.Item label='年龄' name='age'>
              <InputNumber max={100} min={0} />
            </Form.Item>
            <Form.Item label='性别' name='gender'>
              <Select
                placeholder='选择'
                onChange={() => {}}
                allowClear
                style={{
                  width: 120,
                }}
              >
                <Option value={1}>男</Option>
                <Option value={0}>女</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='mr-2'>
                查询
              </Button>
              <Button
                htmlType='button'
                onClick={() => {
                  form.resetFields()
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Button
          className='mr-1'
          onClick={() => {
            setState({
              modalEdit: true,
              modalEditData: {
                _type: 'add',
              },
            })
          }}
        >
          添加
        </Button>
      </div>
      <div>
        <Table
          dataSource={state.userList}
          columns={columnsUser}
          rowKey={'_id'}
          pagination={{
            simple: false,
            showLessItems: true,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [5, 10, 20, 50],
            current: state.reqUser.page,
            pageSize: state.reqUser.limit,
            total: state.total,
            onChange(page, pageSize) {
              setState({
                reqUser: {
                  ...state.reqUser,
                  page,
                  limit: pageSize,
                },
              })
            },
          }}
        />
      </div>
      {state.modalEdit ? (
        <CModalEdit
          data={state.modalEditData}
          onCancel={(isUpdate) => {
            if (isUpdate) {
              onFetchQuery()
            }
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
  } else {
  }
  // console.log('page-ens', { ens })
  return {}
}

export default Page
