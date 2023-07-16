# Nia - Api

<h2 align="center">项目介绍</h2>

### 这是什么

这是 nia - api ，一个自用的 API 服务器的源代码

### 关于项目

这是项目充满着屎山与魔法，他被当成一个完全的公共的后端服务器进行运行，并且将 API 接口按照类型和功能分成不同的插件，在配置文件中对需要的 API 接口进行启动和配置，让他成为能永恒运行下去的 API 服务器

### 接口结构

项目中的每一个 API “插件” 都会放在 `plugins` 文件夹中，而不是 `router` 文件夹，这与传统的其他项目不同。如果有系统级别的 API （涉及到整个 API 服务器系统的 API ，没他就不能正常运行的 API ），那么他还是会被放在 `router` 文件夹下

[示例路由插件](https://github.com/nia-api/template-plugins)

插件接口结构：（没有后缀名的为文件夹）

```
plugins
├─ index.ts （目录的主入口文件）
├─ README.md （插件的详细介绍文件，以及每个接口的详细说明）
├─ Docs （如果文档较多，可以将 README.md 以外的文件放在 Docs 目录中）
└─ router
 └─ childRouter.ts （插件的路由文件）
```

按照要求，每个插件的基础路径为 `/插件名/路由路径` 。在 `index.ts` 中配置插件名作为基础的路径，在 `router` 文件夹中的文件配置实际的路由路径。

`index.ts` 文件中，需包含 `es6` 语法的默认导出（ `router` 实例）以及按需导出 `Name` 字段，不能包含具体的接口，需要引用 `router` 目录下的路由。详细请参考示例。

如果在路径中需要再次细分路径，建议在 `router` 文件夹下以真实路径为命名创建新的文件夹。

文件示例

`index.ts`

```typescript
// 引入 Router 实例
import { Router } from 'express'

// 引入路由
import getPayImagesRouter from './router/getPayImages'

// 实例化 Router 对象
const router = Router()

// 使用路由 （ 定义子路由路径 ）
router.use('/pay-images', getPayImagesRouter)

// 导出路由插件简介名称说明 （ 仅用于显示方便辨认 ）
export const Name = '支付码图片API'

// 导出默认路由
export default router
```

`/router/getPayImages.ts`

```typescript
import { Router } from 'express'

const router = Router()

router.get('/getPayImages', (request, response) => {
    // ...
})

export default router
```

实际请求访问路径 `/插件名（插件文件夹的名字，也是配置文件里面的名字）/pay-images/getPayImages`

<h2 align="center">部署和构建</h2>

### 部署项目

-   从 [仓库](https://github.com/alongw/nia-api) 拉取源代码 或 从 [Release](https://github.com/alongw/nia-api/releases) 下载稳定构建版本

    #### 源代码部署

    -   从 [仓库](https://github.com/alongw/nia-api) 拉取源代码

        ```bash
        git clone https://github.com/alongw/nia-api.git
        ```

    -   使用任意包管理工具运行

        推荐使用 `yarn`

        ```bash
        yarn
        yarn start
        ```

        使用 `npm`

        ```bash
        npm install
        npm run start
        ```

    #### Release 稳定版构建

    -   从 Release 下载版本

        ```bash
        node ./app.js
        ```

### 构建项目

-   从 [仓库](https://github.com/alongw/nia-api) 拉取源代码

    ```bash
    git clone https://github.com/alongw/nia-api.git
    ```

-   使用任意包管理工具运行

    推荐使用 `yarn`

    ```bash
    yarn
    yarn build
    cd ./dist/code
    node ./app.js
    ```

    使用 `npm`

    ```bash
    npm install
    npm run build
    cd ./dist/code
    node ./app.js
    ```

### 更好的打包

使用更好的打包方案（自动化）

当运行 `yarn build` 时会自动执行以下操作

-   检查是否有相关文件夹 `/dist` 、 `/dist/code` 、 `/dist/tsc` 、 `/dist/file` ，如果有则清空 `/dist/code` 及 `/dist/tsc` ，如果没有则创建
-   将 `/src` 下所有文件编译并打包至 `/dist/tsc`
-   将项目根目录下 `/public` 、 `/template` 以及 src 目录下 `/src/public` 文件夹完整复制到 `/dist/code`
-   将刚刚打包好 `/dist/tsc` 目录下所有文件复制到 `/dist/code`
-   将 `/dist/file` 目录下所有文件复制到 `/dist/code` （如果有）
-   将根目录下 `package.json` 及 `yarn.lock` 复制到 `/dist/code` 目录下

打包后的最终代码将在 `/dist/code` 文件夹中

### 其他打包命令

使用 `yarn build:nolint` 来绕过 Eslint 语法检查直接打包

使用 `yarn build:tsc` 来仅编译 `src` 目录下的文件

使用 `yarn build:lint` 以方便在没有安装全局环境时打包

<h2 align="center">配置文件</h2>

### 生成配置文件

每次运行都会检测项目根目录下的 `config.yaml`，如果没有，会自动生成

配置文件由项目根目录下的 `template/_config.yaml` 文件复制，若自动生成失败，请检查文件完整性以及运行权限

### 配置文件信息

示例，不一定为最新，插件配置具体请参考插件 `README.md` 自述文件

```yaml
# 监听端口
listen_port: 3000

# 启用插件
enable_plugins:
    - template-plugins
    # ...

# 插件配置
plugins_config:
    # ...
```

### 远程配置文件

// TODO: 数据库远程配置文件

<h2 align="center">路由插件</h2>

### 安装路由插件

进入插件目录 （ 开发环境为 `/src/plusins` ）

```bash
cd ./plugins
```

克隆插件仓库，或下载插件解压

推荐使用 `subtree` ，具体请参见插件具体 `README.md` 自述文件

通用方法：在项目根目录执行

安装插件

```bash
git subtree add -P src/plugins/< 插件名 > < 插件仓库地址 > < 插件分支 >
```

更新插件

```bash
git subtree pull -P src/plugins/< 插件名 > < 插件仓库地址 > < 插件分支 >
```

### 使用路由插件

`config.yaml`

示例，不一定为最新，插件配置具体请参考插件 `README.md` 自述文件

```yaml
# 插件配置
plugins_config:
    # pay-code 收款码插件
    # 用于获取收款二维码
    pay-code:
        # 默认展示 可选 wechat(微信赞赏码) alipay(支付宝收款码) qq(QQ收款码) wechatpay(微信收款码)
        default: alipay
        # 收款码图片URL（为null则不展示） 绝对路径或相对路径
        alipay: ./pay-code/static/alipay.png
        wechat: null
        qq: null
        wechatpay: null

    # color 颜色插件
    # 用于快速获取常用的颜色
    color:
        # 定义颜色列表 参考下方的格式定义
        colors:
            pink: fa7298
    # ...
```

<h2 align="center">Commit 和提交</h2>

### Git Commit 语法检测和辅助编写

使用 [husky](https://github.com/typicode/husky) + [commitizen](https://github.com/commitizen/cz-cli) + [lint-staged](https://github.com/okonet/lint-staged) 规范化 Git Commit ，代码提交需符合相关规范

使用 `yarn cz` 来调用 git-cz 进行问答式提交

使用 `yarn push` 来调用 git-cz 进行问答式提交并将暂存区的文件提交至远程仓库

使用 `yarn pushall` 来调用 git-cz 进行问答式提交并将所有修改的文件提交至远程仓库

```
git add .
yarn cz
git push
```

<h2 align="center">使用工具和其他说明</h2>

### 构建模板

本项目使用 https://github.com/alongw/template-typescript 进行创建

### Prettierrc 格式化代码

使用 prettierrc 进行代码格式化

需在 vscode 插件市场安装 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 并设置为默认代码格式化插件

### Eslint 语法检查

使用 Eslint 进行语法检查，项目需符合 Eslint 相关语法规范

需在 vscode 插件市场安装 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

> 由于当前 @typescript-eslint/typescript-estree 仅支持 >=3.3.1 <5.1.0 版本的 Typescript，但是我们使用的是 5.1.3 版本的 Typescript ， 因此在每次检查时都会弹出警告消息

### 开源协议

本项目采用 GNU Affero General Public License v3.0 开源协议
