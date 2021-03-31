import http from 'http'
import fs from 'fs'
const url =  await import.meta.url
const port = 3000
process.env.NODE_ENV = 'development'

const config = {
    entry: './',
    output: {
        path: '/dist',
        filename: 'README.md'
    },
    filters: ['node_modules'],
    notes: '该文档由脚本自动生成，每次启动项目时均会自动更新，请勿手动修改！',
    join: '--|',
    examples: '',
    tree: ''
}

/**
 * 获取当前文件的深度 拼接规则 
 */
const getJoin = (config, level) => {
    if (level == 0) return;
    const { join } = config
    let resultString = '<br/>';
    for (let i = 0; i < level; i++) {
        resultString = resultString + join;
    }
    return resultString;
}

/**
 * 获取所有的目录结构 
 */
const getTree = (config, level = 0) => {
    const { entry, filters, output, main } = config;
    if (!fs.existsSync(entry)) return ''; // 如果当前目录不存在则终止遍历
    const dir = fs.readdirSync(entry);
    console.log('dir ', dir)
    if (dir.length == 0) return ''
    const joinString = getJoin(config, level + 1);
    let outputDir = '';
    dir.map(v => {
        outputDir += (joinString + ' ' + v + '\n')
        if (v === main) {
            config.examples = `${fs.readFileSync(entry + '/' + v)}`
        }
        if (v.split('.').length == 1 && !filters.includes(v)) {
            outputDir += getTree({...config, entry: entry + '/' + v }, level + 1)
        }
    });
    return outputDir;
}

config.tree = getTree(config)
console.log('config.tree ', config.tree)


http.createServer((req, res) => {
    const { url, method } = req
    if(url === '/favicon.ico') return
    console.log('tree ', config.tree)
    res.end(`<html><body>${config.tree}</body></html>`)
}).listen(port, () => {
    console.log(`${url.split('/').pop()} server start on port ${port} env:`, process.env.NODE_ENV)
})