'use strict'
const http = require('http')
const through = require('through2')

http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(through( function (buf, _, next) {
            this.push(buf.toString().toUpperCase())
            next()
        })).pipe(res)
    }
    else{
        res.end()
    }
}).listen(process.argv[2])
