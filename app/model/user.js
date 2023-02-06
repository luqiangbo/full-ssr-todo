module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const NewSchema = new Schema(
    {
      __v: { type: Number, select: false },
      name: { type: String, default: null }, // 姓名
      age: { type: Number, default: null }, // 年龄
      gender: { type: Number, default: null }, // 性别
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  )

  return mongoose.model('user', NewSchema, 'c_user')
}
