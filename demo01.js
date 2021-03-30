import http from 'http'

const port = 3000
process.env.NODE_ENV = 'development'

http.createServer((req, res) => {
    res.end('Hello World !')
}).listen(port, () => {
    console.log(`demo01 server start on port ${port} env:`, process.env.NODE_ENV)
})