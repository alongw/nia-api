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

// 解析JSON
app.use(bodyParser.json())
// 解决跨域问题
app.use(cors())

// 监听端口
app.listen(config.listen_port, () => {
    logger.info(`NIA - API 服务器运行在本地 ${config.listen_port} 端口上`)
})
