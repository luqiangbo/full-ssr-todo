import React from 'react'
import serialize from 'serialize-javascript'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

import '@/assets/common.less'
import './index.less'

const commonNode = (props) =>
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
  props.children ? <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider> : ''

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { serverData } = props.layoutData
    const { injectCss, injectScript } = props.layoutData.app.config
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <link rel='shortcut icon' href='/icon.png' />
          <title>full-ssr-todo</title>
          {injectCss && injectCss.map((item) => <link rel='stylesheet' href={item} key={item} />)}
        </head>
        <body>
          <div id='app'>{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}`, // 使用pathname作为组件初始化数据的隔离，防止props污染
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(''),
            }}
          />
        </body>
      </html>
    )
  }
}

export default Layout
