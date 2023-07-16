export interface TypeConfig {
    listen_port: number
    enable_plugins: string[]
    plugins_config: {
        'pay-code': {
            default: 'wechat' | 'alipay' | 'qq' | 'wechatpay'
            alipay: null | string
            wechat: null | string
            qq: null | string
            wechatpay: null | string
        }
        color: {
            colors: {
                [key: string]: string
            }
        }
    }
}
