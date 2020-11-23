// 引用網頁伺服器套件
import express from 'express'
// env
import dotenv from 'dotenv'
// 讓 express 可以讀取進來的 body
import bodyParser from 'body-parser'
// 引用資料庫檔
import db from './db.js'
// md5
import md5 from 'md5'

dotenv.config()

const app = express()

// 讓 express 可以讀取進來的 body，格式為 json
app.use(bodyParser.json())

// 進到 /users 的 POST 請求
// req 代表進來的
// res 代表出去的
app.post('/users', async (req, res) => {
  // 如果進來的資料格式不是 json
  if (!req.headers['content-type'].includes('application/json')) {
    // 回應狀態碼 400 以及訊息
    res.status(400).send({ success: false, message: '格式不符' })
    return
  }

  try {
    // 新增資料進資料庫
    const result = await db.users.create(
      {
        account: req.body.account,
        password: md5(req.body.password),
        age: req.body.age,
        email: req.body.email
      }
    )
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    // 發生驗證錯誤
    if (error.name === 'ValidationError') {
      // errors: {
      //   欄位: 錯誤訊息
      // }
      // 因為不知道發生的問題是哪個欄位
      // Object.keys 會把 json 的所有 key 拉出來變成陣列，用 [0] 取第一個 key
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤' })
    }
  }
})

// 查詢
app.get('/users', async (req, res) => {
  try {
    // 以信箱查詢帳號
    if (req.query.email) {
      const result = await db.users.find({ email: req.query.email }, 'account -_id')
      if (result.length > 0) {
        res.status(200).send({ success: true, message: '', result })
      } else {
        res.status(404).send({ success: false, message: '找不到資料' })
      }
    } else {
      // 查詢所有
      // 查詢語法
      // https://mongoosejs.com/docs/api/model.html#model_Model.find
      // 尋找所有資料，僅顯示 account email 欄位，不顯示 _id
      const result = await db.users.find({}, 'account email -_id')
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器發生錯誤' })
  }
})

// 修改
app.patch('/users/:id', async (req, res) => {
  // 如果進來的資料格式不是 json
  if (!req.headers['content-type'].includes('application/json')) {
    // 回應狀態碼 400 以及訊息
    res.status(400).send({ success: false, message: '格式不符' })
    return
  }

  try {
    // 如果有是改密碼，先加密
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    }
    // .findByIdAndUpdate(資料 id, 要更新的內容, {new: true})
    // 設定 new: true 會回傳更新後的資料
    const result = await db.users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // 如果有改到東西
    if (result !== null) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到資料' })
    }
  } catch (error) {
    // ID 格式錯誤
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤' })
    }
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    // 如果有是改密碼，先加密
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    }
    const result = await db.users.findByIdAndDelete(req.params.id)
    // 如果有改到東西
    if (result !== null) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到資料' })
    }
  } catch (error) {
    // ID 格式錯誤
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤' })
    }
  }
})

// express 監聽指定 PORT 的請求
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
