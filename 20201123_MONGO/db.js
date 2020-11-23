// 引用資料庫套件
import mongoose from 'mongoose'
// 引用重複驗證錯誤訊息套件
import beautifyUnique from 'mongoose-beautiful-unique-validation'
// env
import dotenv from 'dotenv'
// 信箱驗證
import validator from 'validator'

dotenv.config()

// 連接資料庫
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

// 使用插件
mongoose.plugin(beautifyUnique)

// 顯示連接成功訊息
const connection = mongoose.connection
connection.once('open', () => {
  console.log('已連接資料庫')
})

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    // 欄位名稱
    account: {
      // 資料類型
      // https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
      type: String,
      // 內建驗證規則
      // https://mongoosejs.com/docs/schematypes.html#schematype-options
      // 最小長度，自訂錯誤訊息
      minlength: [4, '帳號最少 4 個字'],
      // 最大長度，自訂錯誤訊息
      maxlength: [20, '帳號最多 20 個字'],
      required: [true, '缺少帳號欄位'],
      // 不可重複，預設只能放 true 或 false，除非使用套件
      unique: '帳號重複'
    },
    password: {
      type: String,
      required: [true, '缺少密碼欄位']
    },
    age: {
      type: Number,
      // 最小值，自訂錯誤訊息
      min: [13, '須年滿 13 歲'],
      // 最大值，自訂錯誤訊息
      max: [150, '請輸入有效年齡'],
      required: [true, '缺少年齡欄位']
    },
    email: {
      type: String,
      required: [true, '缺少信箱欄位'],
      // 不可重複，預設只能放 true 或 false，除非使用套件
      unique: '信箱重複',
      // 自訂驗證規則
      validate: {
        // 驗證 function
        validator (value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    }
  },
  {
    // 如果不要紀錄資料修改次數
    versionKey: false
  }
)

// 建立 model
// mongoose.model(collection名稱, Schema)
// collection名稱必須是複數，結尾加s
const users = mongoose.model('users', userSchema)

export default {
  users
}
