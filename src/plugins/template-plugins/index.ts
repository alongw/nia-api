// 引入 Router 实例
import { Router } from 'express'

// 实例化 Router 对象
const router = Router()

// 使用路由 （ 定义子路由路径 ）
router.use('/helloWorld', async (req, res, next) =>
    (await import('./router/helloWorld')).default(req, res, next)
)

// // require 写法
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// router.use('/helloWorld', require('./router/helloWorld').default)

// 导出路由插件简介名称说明 （ 仅用于显示方便辨认 ）
export const Name = '示例模块'

// 导出默认路由
export default router
