import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import session from 'express-session'
import connectMongo from 'connect-mongo'

import productRoutes from './routes/products.js'
import userRoutes from './routes/users.js'

dotenv.config()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.plugin(beautifyUnique)

const app = express()

app.use(bodyParser.json())

app.use(cors({
  origin (origin, callback) {
    callback(null, true)
  },
  // 因為要做登入，所以要允許接收認證資訊
  credentials: true
}))

const MongoStore = connectMongo(session)

app.use(session({
  // 密鑰
  secret: '123456',
  // session 儲存位置
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  // 登入有效期，單位是 ms
  cookie: {
    maxAge: 1000 * 60 * 30
    // 允許不同網域的認證資訊
    // sameSite: 'none',
    // secure: true
  },
  // 是否保存未被修改的 session
  saveUninitialized: false,
  // 是否每次請求重設過期時間
  rolling: true,
  // 是否強制將 session 存回 mongodb ，即使她沒被修改
  resave: true
}))

// 必須要設定這個，不然後台在 Heroku 時無法登入
app.set('trust proxy', 1)

app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT)
})
