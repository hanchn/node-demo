import http from 'http'
import fs from 'fs'
const url =  await import.meta.url
const port = 3000
process.env.NODE_ENV = 'development'


const config = {
    entry: './index.html',
    output: 'dist'
}

http.createServer((req, res) => {
    const { url, method } = req
    if(url === '/favicon.ico') return
    const html = `${fs.readFileSync('./index.html')}<style>${fs.readFileSync('./css.css')}</style>`
    res.end(html)
}).listen(port, () => {
    console.log(`${url.split('/').pop()} server start on port ${port} env:`, process.env.NODE_ENV)
})