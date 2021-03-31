const socket = io();

const ioEvent = () => {
   socket.emit('say', document.querySelector('input').value);
   socket.on('response', (data) => {
    console.log('data ', data)
    document.querySelector('h1').innerHTML = data
   })
   
}

document.querySelector('button').onclick = ioEvent