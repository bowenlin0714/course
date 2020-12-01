import products from '../models/products.js'

export const createProduct = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await products.create(req.body)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidatorError') {
      const key = Object.keys(error.erros)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '發生錯誤' })
    }
  }
}

export const getProductsByid = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    if (result === null) {
      res.statu(404).send({ success: false, message: '找不到商品' })
    } else {
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)

    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else {
      res.status(500).send({ success: false, message: '發生錯誤' })
    }
  }
}
// 查詢
export const getAllProducts = async (req, res) => {
  try {
    const search = {}

    // 如果 req.query 有搜尋條件
    // 因為 $or 陣列一定要有東西
    // req.query 是 json 所以要用 Object.keys(req.query).length 檢查有沒有東西
    if (Object.keys(req.query).length > 0) {
      search.$and = []

      // 大於等於
      if (req.query.price_gte) {
        search.$and.push({ price: { $gte: req.query.price_gte } })
      }
      // 小於等於
      if (req.query.price_lte) {
        search.$and.push({ price: { $lte: req.query.price_lte } })
      }
      // 小於
      if (req.query.price_lt) {
        search.$and.push({ price: { $lt: req.query.price_lt } })
      }
      // 大於
      if (req.query.price_gt) {
        search.$and.push({ price: { $gt: req.query.price_gt } })
      }
      // 等於
      if (req.query.price) {
        search.$and.push({ price: { $eq: req.query.price } })
      }
    }

    const result = await products.find(search)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const updateProduct = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await products.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (result != null) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(400).send({ success: false, message: '找不到商品' })
    }
  } catch (error) {
    console.log(error)

    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else {
      res.status(500).send({ success: false, message: '發生錯誤' })
    }
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const result = await products.findByIdAndDelete(req.params.id)

    if (result != null) {
      res.status(200).send({ success: true, message: '' })
    } else {
      res.status(404).send({ success: false, message: '找不到商品' })
    }
  } catch (error) {
    console.log(error)

    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else {
      res.status(500).send({ success: false, message: '發生錯誤' })
    }
  }
}
