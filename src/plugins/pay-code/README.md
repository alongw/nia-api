# Pay-Code

`nia-api` 的路由插件

用于获取收款码图片和获取收款地址

#### 配置文件

```yaml
# 启用插件
enable_plugins:
    # ...
    - pay-code

# 插件配置
plugins_config:
    # ...
    pay-code:
        # 默认展示 可选 wechat(微信赞赏码) alipay(支付宝收款码) qq(QQ收款码) wechatpay(微信收款码)
        default: alipay
        # 收款码图片URL（为null则不展示）
        alipay: null
        wechat: null
        qq: null
        wechatpay: null
```

#### 接口

`/pay-code`

GET

query 参数

```js
{
	"type": "wechay" | "alipay" | "qq" | "wechatpay" | null,
    "isurl": any | null
}
```

如果参数 `isurl` 有值，不论是何值，他都会以 JSON 的形式来响应

```json
{
    "status": 200,
    "msg": "获取收款码成功！",
    "img": "图片URL",
    "type": "alipay"
}
```

如果 `type` 是一个错误的值（未设置收款码或其他值），则相应这段 JSON

```json
{
    "status": 400,
    "msg": "非法的参数！"
}
```

如果 `isurl` 无值， `type` 又是一个正确或空的参数，则返回以下 html

```html
<html>
    <meta http-equiv="refresh" content="0;url=图片URL" />
</html>
```
