import React from 'react'
import { Pagination } from 'antd'

import './index.less'

function News(props) {
  return (
    <div>
      文章详情
      <div>
        <Pagination defaultCurrent={6} total={500} />
      </div>
      <div>
        {props.nameList.map((u) => (
          <div key={u.key}>{u.name}</div>
        ))}
      </div>
    </div>
  )
}

News.getInitialProps = (ctx) => {
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  return Promise.resolve({
    nameList: [{ key: 1, name: 123 }],
  })
}

export default News
