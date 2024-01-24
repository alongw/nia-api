import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'

import logger from './log'
import config from './config'

const isDev = process.env.NODE_ENV == 'develop'

if (isDev) {
    logger.warn('[system] 你正在使用开发模式运行 NIA - API')
}

// express app
const app = express()

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// cors
app.use(cors())

// user access log
app.use('/', (req, res, next) => {
    logger.info(
        `[system] 用户[${req.ip}] 尝试${req.method}请求 ${req.path} 用户代理：${req.headers['user-agent']}`
    )
    next()
})

// system router
app.use('/', async (req, res, next) =>
    (await import('./../router/index')).default(req, res, next)
)

const pluginsPath = isDev ? __dirname + './../plugins' : './plugins'

// load plugins
if (!fs.existsSync(pluginsPath)) {
    logger.warn('[system] 插件文件夹不存在，将自动创建')
    fs.mkdirSync(pluginsPath)
}

const plugins = fs.readdirSync(pluginsPath)
plugins.forEach(async (e) => {
    const { default: plugin, Name: pluginName } = await import(pluginsPath + `/${e}`)
    try {
        logger.info(`[system] 尝试加载插件 ${pluginName || '未知插件'}(/plugins/${e})`)
        app.use(`/${e}`, plugin)
    } catch (error) {
        logger.warn(
            `[system] 加载插件 ${
                pluginName || '未知插件'
            }(/plugins/${e}) 失败，因为插件不符合规范`
        )
    }
})

// listen port
app.listen(config.listen_port, () => {
    logger.info(`[system] NIA - API 服务器运行在本地 ${config.listen_port} 端口上`)
})
