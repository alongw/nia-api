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
├─ docs.md （这与其他文档不同，该文档将暴露给用户，所有用户可以通过相应的管理软件获得文档的内容）
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

补充：项目主仓库中，仅包含部分路由插件，其他插件需自行使用 `git subtree` 安装，具体方法请向下阅读

<h2 align="center">部署和构建</h2>

### 部署项目

-   从 [仓库](https://github.com/alongw/nia-api) 拉取源代码 或 从 [Release](https://github.com/alongw/nia-api/releases) 下载稳定构建版本

    #### 使用源代码直接运行

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

    #### Release 稳定版部署

    -   从 Release 下载版本

        ```bash
        node ./app.js
        ```

注意：项目打包并没有内置 `node_modules` ，需要打包后手动安装，否则项目将无法正常运行。

### 自动部署

使用 Github Actions 来为项目自动部署

仓库需要私密变量

```yaml
env:
    SERVER_HOST: ${{ secrets.SERVER_HOST }} # 目标主机 IP 或域名
    SERVER_PORT: ${{ secrets.SERVER_PORT }} # 目标主机端口
    SERVER_USER: ${{ secrets.SERVER_USER }} # 目标主机登录用户名
    SERVER_KEY: ${{ secrets.SERVER_KEY }} # 目标主机登录秘钥
    SERVER_PATH: ${{ secrets.SERVER_PATH }} # 目标主机部署位置
```

其他请自行查看并修改 `.github/workflows/deploy.yml`

并没有给出详细的自动重启等部分的 CI 代码，需要自行手动部署

### Nginx 反向代理

我们推荐部署后使用 Nginx 反向代理

可以将其作为整个站点进行部署，也可以将其作为总站点之一在子目录进行部署，子目录部署配置文件示例（部署在站点 `/nia` 目录下）

```
#PROXY-START/nia

location ^~ /nia
{
    rewrite ^/nia(/.*)?$ $1 break;
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;
		#Set Nginx Cache


    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        expires 1m;
    }
    proxy_ignore_headers Set-Cookie Cache-Control expires;
    proxy_cache cache_one;
    proxy_cache_key $host$uri$is_args$args;
    proxy_cache_valid 200 304 301 302 1m;
}
#PROXY-END/
```

记得处理一下路径（示例中已经加上）

```
rewrite ^/nia(/.*)?$ $1 break;
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
    ```

    使用 `npm`

    ```bash
    npm install
    npm run build
    ```

注意：一共会打包两个版本，`ncc` 和 `tsc` 各一个。其中，`tsc` 打包并没有内置 `node_modules` ，需要手动安装，否则项目将无法正常运行。插件会一起打包。

### 更好的打包

使用更好的打包方案（自动化）

首次使用会创建 `dist` 目录，目录下会生成 `file` 文件夹，该文件夹内放置的内容会一并被直接复制到输出目录，可以在该文件夹内放 `node.exe` 等文件

打包时，会生成以下目录

-   `tsc` tsc 打包后的文件
-   `ncc` ncc 打包后的文件
-   `out` ncc 打包后的输出文件（插件会使用 tsc 打包）
-   `out-tsc` tsc 打包后的输出文件（体积较大）

### 其他打包命令

使用 `yarn build:nolint` 来绕过 Eslint 语法检查直接打包

使用 `yarn build:tsc` 来使用 `tsc` 仅编译 `src` 目录下的文件

使用 `yarn build:lint` 以方便在没有安装全局环境时打包

使用 `yarn build:ncc` 来使用 `ncc` 仅编译 `src` 目录下的文件

<h2 align="center">配置和存储</h2>

### 生成配置文件

每次运行都会检测项目 `data/system` 目录下的 `config.yaml` （包括 `data` 和 `system` 这两个目录），如果没有，会自动生成

截至 2023.10.28 ，我们更新了配置方案，插件的配置文件不再和全局配置完结共存。

配置文件由项目根目录下的 `template/_config.yaml` 文件复制，若自动生成失败，请检查文件完整性以及运行权限

### 配置文件信息

示例，不一定为最新，插件配置具体请参考插件 `README.md` 自述文件

```yaml
# 监听端口
listen_port: 3000
```

### 插件文件存储系统

为使用方便以及解决每次修改插件都要修改全局配置文件的问题，响应 2023.10.28 新方案，新增了 `useDataFile` 钩子函数，使用该函数可在插件的私有目录进行读取和写入（当然这目录并不安全，因为任何插件都可以恶意访问）

目录位于根目录下 `data` 文件夹中

```typescript
const { getFile, writeFile } = useDataFile('插件名') // 插件名是插件的唯一标识符

getFile(
    '需要获取的文件（相对路径绝对路径均可）',
    '文件默认值（可选，若该文件不存在则自动使用默认值创建）'
)

writeFile(
    '需要写入的文件（相对路径绝对路径均可）',
    '文件的新内容（会覆盖文件内原有内容）'
) // 并不推荐使用该方案来存储数据，而是推荐使用数据库来对数据进行存储
```

该方案建议仅用于存储一些必要的系统配置和需要由用户来输入的数据，比如插件配置文件。

### 远程配置文件

// TODO: 远程配置共享和数据库配置文件

<h2 align="center">接口和插件</h2>

### 安装路由插件

#### 开发环境下安装插件

进入插件目录

```bash
cd ./src/plusins
```

克隆插件仓库，或下载插件源代码，将文件夹放入

如果需要二次封装 API 程序，推荐使用 `subtree `，如果仅仅是开发插件，推荐直接克隆

克隆插件

```bash
git clone < 插件仓库地址 >
```

更新插件

```bash
# 进入插件目录
cd ./< 插件目录 >
git pull
```

`subtree` 安装插件

```bash
git subtree add -P src/plugins/< 插件名 > < 插件仓库地址 > < 插件分支 >
```

`subtree` 更新插件

```bash
git subtree pull -P src/plugins/< 插件名 > < 插件仓库地址 > < 插件分支 >
```

无法使用 `ncc` 直接打包插件，因此会从 `tsc` 打包后的文件中复制过来

直接运行打包会同时打包开发环境下已经安装的插件

默认 `plugins` 会被 `.gitignore` 忽略，系统启动后若没有该文件夹则会自动创建

#### 生产环境下安装插件

前往插件的 Release 发布页，下载需要的版本，将其**连同根文件夹一起**解压到 `plugins` 中，记住一定要套一层文件夹，也不要多套，更不能直接把插件的代码直接丢到 `plugins` 的根目录下！

理想状态 `plugins` 目录结构应该如下

```
plugins
├─ 插件1
├─ 插件2
└─ ...
```

### 使用路由插件

截至 2023.10.28 ，已经不再使用全局配置文件。所有路由插件的内容都可以与主程序代码分离。

### 系统接口

系统默认包含一些接口，这些接口往往和增益功能无关，他会占用 `/` 和 `/nia/*` 路径，这是为了对私有化 API 做准备，当前正在开发中 。

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
