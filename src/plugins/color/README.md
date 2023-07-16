# color

`nia-api` 的插件

用于获取常用的颜色 以及 css 渐变语句

### 安装插件

需在 `nia-api` 根目录执行

```bash
git subtree add -P src/plugins/color https://github.com/nia-api/color.git main
```

### 更新插件

需在 `nia-api` 根目录执行

```bash
git subtree pull -P src/plugins/color https://github.com/nia-api/color.git main
```

### 配置文件

```bash
# 启用插件
enable_plugins:
  - color
  # ...

# 插件配置
plugins_config:
  # ...

  # color 颜色插件
  # 用于快速获取常用的颜色
  color:
    # 定义颜色列表 参考下方的格式定义
    colors:
      pink: fa7298

```

### 接口

GET

`/color`

需传参

```javascript
{
	color: 颜色的简称，与配置文件中的相同
	type: gradient | null
}
```

若未传 `color` 值系统返回

```javascript
{
	"status": 400,
	"msg": "非法的请求参数！"
}
```

若传入的 `color` 值没有被配置文件定义

```javascript
{
	"status": 404,
	"msg": "请求的颜色不存在"
}
```

若传入了 `type` 但是是错误的值

```javascript
{
	"status": 400,
	"msg": "非法的参数！"
}
```

正确传值，未传 `type` （ `color` 以 `pink` 为例 ）

```javascript
{
	"status": 200,
	"color": "#fa7298",
	"hexadecimal": "fa7298",
	"msg": "获取颜色成功！"
}
```

正确传值，已传 `type` （ `color` 以 `pink` 为例 ）

```javascript
{
	"status": 200,
	"css": "linear-gradient(150deg, hsl(343, 0.93%, 10.71%) 15%, hsl(343, 0.93%, 0.71%) 70%, hsl(343, 0.93%, -9.29%) 94%)",
	"msg": "获取渐变色语句成功！"
}
```
