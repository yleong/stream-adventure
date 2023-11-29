'use strict'

const WebSocket = require('ws')

let ws = new WebSocket('ws://localhost:8099')
let stream = WebSocket.createWebSocketStream(ws)

stream.pipe(process.stdout)

ws.on('open', () => {
    ws.send('hello\n');
    ws.close()
});

