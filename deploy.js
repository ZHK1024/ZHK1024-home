// 把打包内容替换到站点仓库中
const fs = require('fs-extra');
const path = require('path');

async function deploy() {
    // 1. 获取 dist 目录
    const distDir = path.resolve(__dirname, './_site');
    // 2. 获取站点仓库目录
    const siteDir = path.resolve(__dirname, '../ZHK1024-home');
    // 3. 删除站点仓库中除了 .git 开头的所有文件, 包括文件夹和文件
    const files = fs.readdirSync(siteDir);
    files.forEach(file => {
        if (!file.startsWith('.git')) {
            const filePath = path.resolve(siteDir, file);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
                fs.unlinkSync(filePath);
            } else {
                fs.rmdirSync(filePath, { recursive: true });
            }
        }
    });
    // 4. 复制 dist 目录下的所有文件到站点仓库中
    await fs.copy(distDir, siteDir, {
        overwrite: true,
        preserveTimestamps: true,
        recursive: true
    });
    console.log('Files and folders copied successfully');
}

deploy().then(() => {
    // 打印提示信息
    console.log('\x1b[32m%s\x1b[0m', '站点仓库更新完成');
}).catch(err => {
    console.error(err);
    process.exit(1);
});
