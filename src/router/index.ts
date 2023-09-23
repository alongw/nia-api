import { Router } from 'express'

const router = Router()

// 默认路由

// 使用路由
router.use('/', async (req, res, next) =>
    (await import('./base/index')).default(req, res, next)
)

router.use('/nia', async (req, res, next) =>
    (await import('./nia/index')).default(req, res, next)
)

export default router
