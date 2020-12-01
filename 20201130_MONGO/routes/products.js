import express from 'express'

import { createProduct, getProductsByid, getAllProducts, updateProduct, deleteProduct } from '../controllers/products.js'

const router = express.Router()

// 最終路徑是 /products
router.post('/', createProduct)

router.get('/:id', getProductsByid)

router.get('/', getAllProducts)

router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)

export default router
