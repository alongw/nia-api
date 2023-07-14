// 引入 Router 实例
import { Router, static as ExpressStatic } from 'express'
import path from 'path'

// 实例化 Router 对象
const router = Router()

// 使用路由 （ 定义子路由路径 ）
router.use('/', async (req, res, next) =>
    (await import('./router/getPayCode')).default(req, res, next)
)

router.use('/static', ExpressStatic(path.join(__dirname, 'public')))

// 导出路由插件简介名称说明 （ 仅用于显示方便辨认 ）
export const Name = '收款码'

// 导出默认路由
export default router
