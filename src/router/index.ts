import { Router } from 'express'

const router = Router()

// 默认路由

// 使用路由
router.use('/', async (req, res, next) =>
    (await import('./base/index')).default(req, res, next)
)

export default router
