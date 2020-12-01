import multer from 'multer'
import path from 'path'
import fs from 'fs'

import products from '../models/products.js'

// 上傳檔案的儲存設定
const storage = multer.diskStorage({
// req 請求
  // fule 檔案資訊
  // callback 處理的 function
  // callback(null, 資料夾)
  destination (req, file, callback) {
    callback(null, './images/')
  },
  filename (req, file, callback) {
  // callback(null, 檔名)
  // 時間當檔名 + 原上傳檔案的副檔名
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

// 上傳設定
const upload = multer({
  storage,
  // 過濾檔案
  fileFilter (req, file, callback) {
    if (file.mimetype.includes('image')) {
      callback(null, true)
    } else {
      // 回應一個 multer 錯誤
      // 因為套件觸發的錯誤類型是 multerError
      // 觸發跟套件一樣的錯誤類型保持格式統一，就不用另外寫判斷是哪種錯誤，也能直接知道是上傳發生的錯誤
      // LIMIT_FORMAT 是自訂錯誤 CODE，和內建的格式統一
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    }
  },
  limits: {
    // 大小限制 1mb
    fileSize: 1024 * 1024
  }
})

export const createProduct = async (req, res) => {
  // 這個請求沒有登入
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // multipart/form-data 可以同時帶文字和檔案
  // 是 HTML form 標籤送出後的表單資料型態之一
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }

  // 只接受一個檔案上傳
  // 上傳的欄位叫 file
  // 將 express 的 req res 傳入上傳動作
  // error 會是檔案上傳的錯誤
  // upload.single(欄位,)(req, res, 上傳完畢後的 function)
  upload.single('file')(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      let message = ''

      // error code
      // https://github.com/expressjs/multer/blob/master/lib/multer-error.js
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式不符'
      } else {
        message = '發生錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        const result = await products.create({
          name: req.body.name,
          file: req.file.filename
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
        console.log(error)
      }
    }
  })
}

export const getProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const getImage = async (req, res) => {
  // 因為 sendFile 只用絕對路徑
  // 所以需要 process.cwd() 取得目前 node 執行的資料夾
  const path = process.cwd() + '/images/' + req.params.filename
  const exists = fs.existsSync(path)
  // 檢查路徑是否存在
  if (exists) {
    res.status(200).sendFile(path)
  } else {
    res.status(404).send({ success: false, message: '找不到檔案' })
  }
}
