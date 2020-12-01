import users from '../models/users.js'

export const createUser = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    await users.create(req.body)
    res.status(200).send({ success: true, message: '' })
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

export const loginUser = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }

  try {
    const result = await users.findOne(req.body)

    if (result !== null) {
      // 將使用者資料記錄到 session
      req.session.user = result
      // console.log(req.session)
      res.status(200).send({ success: true, message: '' })
    } else {
      res.status(404).send({ success: false, message: '帳號不存在' })
    }
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

export const logoutUser = async (req, res) => {
  // 刪除 session
  req.session.destroy(error => {
    // 如果刪除時出錯
    if (error) {
      res.status(500).send({ success: false, message: '發生錯誤，無法登出' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}
