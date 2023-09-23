import fs from 'fs'
import path from 'path'
import config from './../utils/config'

export const getPluginsList = () => {
    const plugins: string[] = []
    config.enable_plugins.forEach((e) => {
        try {
            fs.readFileSync(path.join(__dirname, `./../plugins/${e}/docs.md`), 'utf8')
            plugins.push(e)
        } catch (error) {
            return
        }
    })
    return {
        plugins,
        all: config.enable_plugins
    }
}

export const getPluginsDocs = (plugins: string): string => {
    let docs = ''
    try {
        docs = fs.readFileSync(
            path.join(__dirname, `./../plugins/${plugins}/docs.md`),
            'utf8'
        )
    } catch (error) {
        return
    }
    return docs
}
