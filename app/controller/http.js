const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')

const { to, resWin, resErr } = require('../utils')

class HttpController extends Controller {
  async upload() {
    const { ctx, app } = this
    const { files } = ctx.request
    const { host } = app.config.custom
    if (!files.length) {
      resErr(ctx, { message: '缺少文件' })
      return
    }
    // 遍历处理多个文件
    const filePathList = []
    for (const file of files) {
      const { mimeType, filepath, filename } = file
      const filename1 = filename.replace(/\.(\w+)$/, `-${Date.now()}.$1`)
      const data = fs.readFileSync(filepath)
      const base64str = Buffer.from(data, 'binary').toString('base64')
      const bufferData = Buffer.from(base64str, 'base64')
      const dirName = mimeType.split('/')[0]
      const uplaodBasePath = '../../app/public/upload/'
      const dir = path.join(__dirname, uplaodBasePath, dirName)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir) // 检查文件夹, 没有就创建
      const src = path.join(__dirname, uplaodBasePath, dirName, filename1)
      await fs.writeFileSync(src, bufferData)
      filePathList.push({
        fileUrl: `${host}/public/upload/${dirName}/${filename1}`,
      })
    }
    resWin(ctx, { filePathList })
    return
  }
}

module.exports = HttpController
