import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    account: {
      type: String,
      required: [true, '缺少使用者名稱'],
      unique: '使用者名稱重複',
      trim: true
    },
    password: {
      type: String,
      required: [true, '缺少使用者密碼'],
      trim: true
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
