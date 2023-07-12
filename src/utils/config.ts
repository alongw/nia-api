// 获取配置文件
import fs from 'fs'
import yaml from 'yaml'
import logger from './log'
import type { TypeConfig } from './../types/config'

try {
    yaml.parse(fs.readFileSync('./config.yaml', 'utf8'))
} catch (error) {
    logger.warn('读取配置文件失败，将自动创建')
    try {
        const defaultConfigFile = fs.readFileSync('./template/_config.yaml', 'utf8')
        fs.writeFileSync('./config.yaml', defaultConfigFile)
        logger.info('创建默认配置文件，请修改')
        process.exit()
    } catch (error) {
        logger.error('创建默认配置文件失败，请尝试手动创建！')
        process.exit()
    }
}

const configFile = yaml.parse(fs.readFileSync('./config.yaml', 'utf8')) as TypeConfig

export default configFile
