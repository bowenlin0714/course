import express from 'express'

import { createProduct, getProducts, getImage } from '../controllers/products.js'

const router = express.Router()

router.post('/', createProduct)

router.get('/', getProducts)

router.get('/images/:filename', getImage)

export default router
