<h1 align="center">示例插件</h1>

这是 `nia-api` 的示例路由插件

### 目录结构

```
template-plugins
├─ index.ts
├─ README.md
├─ Docs
└─ router
 └─ helloWorld.ts
└─ utils
 └─ getMsg.ts
```

### 接口说明

由全局设置，路由的基础入口为 `/插件文件夹名/` ，故此时路径为 `/template-plugins/`

-   在 `index.ts` 中，我们使用了 `/router/helloWorld.ts` 的子路由，并且设置了入口为 `/helloWorld` ，故此时路径为 `/template-plugins/helloWorld`
-   在 `helloWorld.ts` 中，我们定义了一个 Get 接口，接口路径为 `/sayHelloWorld` ，故该接口的最终路径为 `/template-plugins/helloWorld/sayHelloWorld`

### 接口文档

详见 `Docs` 文件夹中的 `apis.md`

[接口文档](https://github.com/alongw/nia-api/blob/main/src/plugins/template-plugins/Docs/apis.md)

### 文件代码

`index.ts`

```typescript
// 引入 Router 实例
import { Router } from 'express'

// 实例化 Router 对象
const router = Router()

// 使用路由 （ 定义子路由路径 ）
router.use('/helloWorld', async (req, res, next) =>
    (await import('./router/helloWorld')).default(req, res, next)
)

// 导出路由插件简介名称说明 （ 仅用于显示方便辨认 ）
export const Name = '示例模块'

// 导出默认路由
export default router
```

`helloWorld.ts`

```typescript
import { Router } from 'express'
import { getMsg } from './../utils/getMsg'

const router = Router()

router.get('/sayHelloWorld', (request, response) => {
    response.send(getMsg())
})

export default router
```

`getMsg.ts`

```typescript
export const getMsg = () => {
    return 'Hello World'
}
```

### 路由使用说明

使用 `import`

```typescript
router.use('/helloWorld', async (req, res, next) =>
    (await import('./router/helloWorld')).default(req, res, next)
)
```

使用 `require` （尽可能使用 `import` 来代替 `require` ）

```typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
router.use('/helloWorld', require('./router/helloWorld').default)
```
