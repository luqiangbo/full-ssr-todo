module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const NewSchema = new Schema(
    {
      __v: { type: Number, select: false },
      author: { type: String, default: null }, // 作者
      intro: { type: String, default: null }, // 文章简介
      image: { type: String, default: null }, // 图片
      detail: { type: String, default: null }, // 文章详情
      tags: { type: String, default: null }, // 标签
      types: { type: String, default: null }, // 类型
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  )

  return mongoose.model('content', NewSchema, 'c_content')
}
