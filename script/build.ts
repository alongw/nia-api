import * as shell from 'shelljs'

// 检测并创建目录，如果目录不存在
const createDirectoryIfNotExists = (dirPath: string) => {
    if (!shell.test('-d', dirPath)) {
        shell.mkdir('-p', dirPath)
    }
}

// 删除目录下的所有内容，保留目录本身
const deleteFolderContents = (folderPath: string) => {
    if (shell.test('-d', folderPath)) {
        shell.rm('-rf', `${folderPath}/*`)
    }
}

// 复制整个文件夹
const copyFolder = (source: string, destination: string) => {
    if (shell.test('-e', source)) {
        createDirectoryIfNotExists(destination) // 确保目标目录存在
        shell.cp('-R', `${source}/.`, destination) // 复制整个文件夹
    }
}

// 复制文件夹中的文件
const copyFolderFiles = (source: string, destination: string) => {
    if (shell.test('-d', source)) {
        createDirectoryIfNotExists(destination) // 确保目标目录存在
        shell.cp('-R', `${source}/*`, destination) // 仅复制文件夹中的文件
    }
}

// 删除 dist/tsc 目录内容
deleteFolderContents('dist/tsc')

// 删除 dist/ncc 目录内容
deleteFolderContents('dist/ncc')

// 删除 dist/out 目录内容
deleteFolderContents('dist/out')

// 删除 dist/out-tsc 目录内容
deleteFolderContents('dist/out-tsc')

// 检测并创建 dist/out 目录
createDirectoryIfNotExists('dist/out')

// 检测并创建 dist/out-tsc 目录
createDirectoryIfNotExists('dist/out-tsc')

// 检测并创建 dist/tsc 目录
createDirectoryIfNotExists('dist/tsc')

// 检测并创建 dist/ncc 目录
createDirectoryIfNotExists('dist/ncc')

// 检测并创建 dist/file 目录
createDirectoryIfNotExists('dist/file')

// ncc 编译 TypeScript 文件
shell.exec('ncc build src/app.ts -o dist/ncc')

// 重命名 index.js 为 app.js
shell.mv('dist/ncc/index.js', 'dist/ncc/app.js')

// 删除 dist/ncc/plugins 目录内容
deleteFolderContents('dist/ncc/plugins')

// tsc 编译 TypeScript 文件
shell.exec('tsc')

// 复制 public 文件夹到 dist/out 目录（包括文件夹本身）
copyFolder('public', 'dist/out/public')

// 复制 public 文件夹到 dist/out-tsc 目录（包括文件夹本身）
copyFolder('public', 'dist/out-tsc/public')

// 复制 template 文件夹到 dist/out 目录（包括文件夹本身）
copyFolder('template', 'dist/out/template')

// 复制 template 文件夹到 dist/out-tsc 目录（包括文件夹本身）
copyFolder('template', 'dist/out-tsc/template')

// 复制 src/public 文件夹到 dist/out 目录（包括文件夹本身）
copyFolder('src/public', 'dist/out/public')

// 复制 src/public 文件夹到 dist/out-tsc 目录（包括文件夹本身）
copyFolder('src/public', 'dist/out-tsc/public')

// 复制 ncc 文件夹中的文件到 dist/out 目录
copyFolderFiles('dist/ncc', 'dist/out')

// 复制 tsc 打包的插件到 dist/out/plugins 目录
copyFolderFiles('dist/tsc/plugins', 'dist/out/plugins')

// 复制 tsc 文件夹中的文件到 dist/out-tsc 目录
copyFolderFiles('dist/tsc', 'dist/out-tsc')

// 复制 file 文件夹中的文件到 dist/out 目录
copyFolderFiles('dist/file', 'dist/out')

// 复制 file 文件夹中的文件到 dist/out-tsc 目录
copyFolderFiles('dist/file', 'dist/out-tsc')

// 复制 script 文件夹中的文件到 dist/out 目录
copyFolderFiles('script', 'dist/out')

// 复制 script 文件夹中的文件到 dist/out-tsc 目录
copyFolderFiles('script', 'dist/out-tsc')

// 复制 package.json 和 yarn.lock 文件到 dist/out 目录
shell.cp('package.json', 'dist/out/package.json')
shell.cp('yarn.lock', 'dist/out/yarn.lock')

// 复制 package.json 和 yarn.lock 文件到 dist/out-tsc 目录
shell.cp('package.json', 'dist/out-tsc/package.json')
shell.cp('yarn.lock', 'dist/out-tsc/yarn.lock')

console.log('成功构建')
