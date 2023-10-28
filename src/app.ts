import figlet from 'figlet'
import logger from './utils/log'

logger.info('[system] NiA - API 正在启动...')
console.log(`\n${figlet.textSync('Nia - Api')}\nhttps://github.com/alongw/nia-api\n`)

import('./utils/start')
