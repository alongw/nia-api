import { Router } from 'express'

import { getColor, generateGradient } from './../utils/getColor'
import logger from './../../../utils/log'

import type { Request } from './../../../types/Request'

const router = Router()

router.get(
    '/',
    (
        req: Request<
            {},
            {
                type: null | string
                color: string | null
            }
        >,
        res
    ) => {
        if (!req || !req.query || !req.query.color) {
            logger.info(
                `[color] 用户[${req.ip}] 请求 null 颜色，因为没有 color 参数，因此返回 { status: 400 , msg: '非法的请求参数！' }`
            )
            return res.send({
                status: 400,
                msg: '非法的请求参数！'
            })
        }

        const data = getColor(req.query.color)
        if (!data) {
            logger.info(
                `[color] 用户[${req.ip}] 请求 ${req.query.color} 颜色，因为找不到该颜色，因此返回 { status: 404 , msg: '请求的颜色不存在' } `
            )
            return res.send({
                status: 404,
                msg: '请求的颜色不存在'
            })
        }

        if (!req.query.type) {
            logger.info(
                `[color] 用户[${req.ip}] 请求 ${req.query.color} 颜色，系统返回 { status: 200 , color: #${data} , hexadecimal: ${data} , msg: 获取颜色成功！ } `
            )

            return res.send({
                status: 200,
                color: `#${data}`,
                hexadecimal: data,
                msg: '获取颜色成功！'
            })
        }

        if (req.query.type === 'gradient') {
            const gradient = generateGradient('#' + data)
            logger.info(
                `[color] 用户[${req.ip}] 请求 ${req.query.color} 颜色 css 渐变语句，系统返回 { status: 200 , gradient: ${gradient} , msg: 获取渐变色语句成功！ } `
            )
            return res.send({
                status: 200,
                css: gradient,
                msg: '获取渐变色语句成功！'
            })
        }

        logger.info(
            `[color] 用户[${req.ip}] 请求 ${req.query.color} 颜色，但是传入了未知的 Type 参数：${req.query.type} ，因此系统返回 { status: 400 , msg: '非法的参数！' } `
        )
        return res.send({
            status: 400,
            msg: '非法的参数！'
        })
    }
)

export default router
