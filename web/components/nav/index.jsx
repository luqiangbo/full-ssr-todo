import React from 'react'
import { Tabs } from 'antd'
function Nav(props) {
  return (
    <div>
      <Tabs
        activeKey={props.nav}
        animated={false}
        centered
        items={[
          { key: '/', value: '首页' },
          { key: '/news', value: '新闻' },
          { key: '/user', value: '用户' },
        ].map((u) => {
          return {
            label: u.value,
            key: u.key,
            children: null,
          }
        })}
        onChange={(u) => {
          window.location.href = u
        }}
      />
    </div>
  )
}

export default Nav
