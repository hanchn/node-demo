import http from 'http'

const port = 3000
process.env.NODE_ENV = 'development'

http.createServer((req, res) => {
    const { url, method } = req
    console.log('url ', url)
    console.log('method ', method)
    if(url === '/favicon.ico') return
    res.end('Hello World !')
}).listen(port, () => {
    console.log(`demo01 server start on port ${port} env:`, process.env.NODE_ENV)
})