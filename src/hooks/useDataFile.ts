import fs from 'fs-extra'
import logger from './../utils/log'

export const useDataFile = (pluginsName: string) => {
    // 获取文件
    const getFile = (file: string, defaultFile?: string): string => {
        const path = `./data/${pluginsName}${file.at(0) === '/' ? file : `/${file}`}`
        // 检测文件是否存在
        try {
            fs.readFileSync(path)
        } catch {
            // 创建该文件
            fs.ensureFileSync(path)
            fs.writeFileSync(path, defaultFile || '', 'utf-8')
        }
        // 读取
        return fs.readFileSync(path, 'utf-8') as string
    }

    // 仅获取文件
    const getFileOnly = (file: string): string | undefined => {
        const path = `./data/${pluginsName}${file.at(0) === '/' ? file : `/${file}`}`
        // 检测文件是否存在
        try {
            fs.readFileSync(path)
        } catch {
            // 返回空
            return undefined
        }
        // 读取
        return fs.readFileSync(path, 'utf-8') as string
    }

    // 覆写文件
    const writeFile = (file: string, value: string): boolean => {
        try {
            fs.writeFileSync(
                `./data/${pluginsName}${file.at(0) === '/' ? file : `/${file}`}`,
                value,
                'utf-8'
            )
            return true
        } catch (error) {
            logger.error(`文件写入失败！(${error.message}) ${error}`)
        }
        return false
    }

    return {
        getFile,
        writeFile,
        getFileOnly
    }
}
