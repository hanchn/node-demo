import http from 'http'
import fs from 'fs'
const url =  await import.meta.url
const port = 3000
process.env.NODE_ENV = 'development'

http.createServer((req, res) => {
    const { url, method } = req
    if(url === '/favicon.ico') return
    res.end(fs.readFileSync('./index.html'))
}).listen(port, () => {
    console.log(`${url.split('/').pop()} server start on port ${port} env:`, process.env.NODE_ENV)
})