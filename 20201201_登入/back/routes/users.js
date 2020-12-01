import express from 'express'

import { createUser, loginUser, logoutUser, heartbeat } from '../controllers/users.js'

const router = express.Router()

router.post('/', createUser)

router.post('/login', loginUser)

router.delete('/logout', logoutUser)

router.get('/heartbeat', heartbeat)

export default router
