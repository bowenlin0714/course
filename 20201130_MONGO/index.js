import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import './db.js'
import productsRoutes from './routes/products.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use(cors({
  // origin (origin, callback)
  // origin 代表來源網域用 postman 送的請求是 undefined
  // callback(錯誤， 是否允許請求)
  origin (origin, callback) {
    console.log(origin)
    callback(null, true)
  }
}))

// 進到 products 的所有請求分給 productsRoutes 處理
app.use('/products', productsRoutes)

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT)
})
