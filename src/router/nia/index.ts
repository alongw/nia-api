import { Router } from 'express'

import { getPluginsList, getPluginsDocs } from './../../modules/plguins'

import type { Request } from './../../types/Request'

const router = Router()

router.get('/getPluginsList', (req, res) => {
    const { all, plugins } = getPluginsList()
    res.send({
        status: 200,
        msg: '插件列表获取成功',
        data: {
            all,
            plugins
        }
    })
})

router.get(
    '/getPluginsDocs',
    (
        req: Request<
            {},
            {
                plugins: string | null
            }
        >,
        res
    ) => {
        if (!req.query || !req.query.plugins) {
            return res.send({
                status: 401,
                msg: '插件名不能为空'
            })
        }
        const docs = getPluginsDocs(req.query.plugins)
        res.send({
            status: 200,
            msg: '插件文档获取成功',
            data: {
                docs: docs,
                plugins: req.query.plugins
            }
        })
    }
)

export default router
