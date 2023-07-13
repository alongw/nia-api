import { Router } from 'express'

import logger from './../../../utils/log'
import { getImg } from './../utils/getImg'

import type { Request } from './../../../types/Request'

const router = Router()

router.get(
    '/',
    (
        req: Request<
            {},
            {
                //  微信赞赏码 | 支付宝收款码 | QQ收款码 | 微信收款码
                type: 'wechat' | 'alipay' | 'qq' | 'wechatpay'
                isurl: string | null
            }
        >,
        res
    ) => {
        const { img, type } = getImg(req.query.type)
        if (img) {
            if (req.query.isurl) {
                return res.send({
                    status: 200,
                    msg: '获取收款码成功！',
                    img,
                    type
                })
            }
            res.redirect(img)
        } else {
            res.send({
                status: 400,
                msg: '非法的参数！'
            })
        }
        logger.info(
            `[pay-code] 用户[${req.ip}] 请求 ${type} 收款码` +
                (img ? '' : '，但是这似乎是一个未设置或者错误的收款码')
        )
    }
)

export default router
