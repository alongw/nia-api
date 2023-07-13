import config from './../../../utils/config'

const payCodeConfig = config.plugins_config['pay-code']

export const getImg = (type = payCodeConfig.default) => {
    if (type == 'alipay' || type == 'wechatpay' || type == 'qq' || type == 'wechat') {
        return {
            img: payCodeConfig[type],
            type
        }
    }
    return {
        img: null,
        type
    }
}
