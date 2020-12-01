import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少商品名稱']
    },
    price: {
      type: Number,
      min: [0, '價格無效'],
      required: [true, '缺少商品價格']
    },
    description: {
      type: String,
      required: [true, '缺少商品說明']
    },
    count: {
      type: Number,
      min: [0, '無效數量'],
      required: [true, '缺少商品數量']
    }
  },
  {
    versionKey: false
  }
)

const products = mongoose.model('products', productSchema)

export default products
