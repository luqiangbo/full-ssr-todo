module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const NewSchema = new Schema(
    {
      __v: { type: Number, select: false },
      name: { type: String, default: null },
      age: { type: Number, default: null },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  )

  return mongoose.model('user', NewSchema, 'c_user')
}
