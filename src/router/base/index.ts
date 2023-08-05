import { Router } from 'express'

const router = Router()

// 默认请求
router.all('/', (req, res) => {
    res.send(`[nia-api] Status: OK | reference: https://github.com/alongw/nia-api`)
})

export default router
