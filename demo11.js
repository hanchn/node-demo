import { Server } from 'socket.io'
import http from 'http'
import fs from 'fs'

const app = http.createServer((req, res) => {
  res.end(fs.readFileSync('./socket.html') + '<script>' + fs.readFileSync('./socket.io-client.js') + '</script><script>' + fs.readFileSync('./socket_event.js')+'</script>')
}).listen(3000)

const io = new Server(app)

io.on('connection', (socket) => {
  socket.on('say', (data) => {
    let response = ''
    switch (data) {
      case 'test':
        response = '你是在测试我吗？'
        break;
       case '你好':
        response = '你也好啊！'
        break;   
      default:
        response = '不好意思，我没理解你在说什么。'
        break;
    }
    socket.emit('response', response);
  })

})