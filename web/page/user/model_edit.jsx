import React, { useEffect } from 'react'
import { Modal, Form, Input, InputNumber, Radio } from 'antd'

import { apiUserAdd, apiUserUpdate } from '@/api/user'

function Index(props) {
  const [form] = Form.useForm()
  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const { age, name, gender } = props.data
    form.setFieldsValue({
      name,
      age,
      gender,
    })
  }
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log({ values })
        onFetchUser(values)
      })
      .catch((errorInfo) => {
        console.log({ errorInfo })
      })
  }
  const onCancel = (isUpdate) => {
    props.onCancel(isUpdate)
  }

  const onFetchUser = async (req) => {
    let api = apiUserAdd
    if (props.data._type === 'edit') {
      req._id = props.data._id
      api = apiUserUpdate
    }
    const [err, res] = await api(req)
    console.log({ err, res })
    if (err || res.code) {
      console.log(err)
    }
    onCancel(true)
  }

  return (
    <Modal
      title={props.data._type === 'edit' ? '编辑' : '新增'}
      open={true}
      maskClosable={false}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        name='basic'
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete='off'
      >
        <Form.Item
          label='姓名'
          name='name'
          rules={[
            {
              required: true,
              message: '请输入你的姓名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='年龄'
          name='age'
          rules={[
            {
              required: true,
              message: '请输入你的年龄!',
            },
          ]}
        >
          <InputNumber max={100} min={0} />
        </Form.Item>
        <Form.Item
          label='性别'
          name='gender'
          rules={[
            {
              required: true,
              message: '请输入你的性别!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={0}> 女 </Radio>
            <Radio value={1}> 男 </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default Index
