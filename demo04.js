import http from 'http'
const url =  await import.meta.url
const port = 3000
process.env.NODE_ENV = 'development'

http.createServer((req, res) => {
    const { url, method } = req
    if(url === '/favicon.ico') return
    res.end('Hello World !')
}).listen(port, () => {
    console.log(`${url.split('/').pop()} server start on port ${port} env:`, process.env.NODE_ENV)
})