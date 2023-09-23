// 引入模块
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// 引入自定义模块
import logger from './utils/log'
import config from './utils/config'

// 引入类型

// 创建 app 实例
const app = express()

// 解析 JSON 和 URL 编码
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 解决跨域问题
app.use(cors())

// 用户访问日志
app.use('/', (req, res, next) => {
    logger.info(
        `用户[${req.ip}] 尝试${req.method}请求 ${req.path} 用户代理：${req.headers['user-agent']}`
    )
    next()
})

// 加载系统路由
app.use('/', async (req, res, next) =>
    (await import('./router/index')).default(req, res, next)
)

// 加载路由插件
config.enable_plugins.forEach(async (e) => {
    const { default: plugin, Name: pluginName } = await import(`./plugins/${e}`)
    try {
        logger.info(`尝试加载插件 ${pluginName || '未知插件'}(${e})`)
        app.use(`/${e}`, plugin)
    } catch (error) {
        logger.warn(`加载插件 ${pluginName || '未知插件'}(${e}) 失败，因为插件不符合规范`)
    }
})

// 监听端口
app.listen(config.listen_port, () => {
    logger.info(`NIA - API 服务器运行在本地 ${config.listen_port} 端口上`)
})
