import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少商品名稱']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    }
  }
)

const products = mongoose.model('products', productSchema)

export default products
