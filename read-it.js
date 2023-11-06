'use strict'
const { Readable } = require('stream') //const stream = require('stream'); const Readable = stream.Readable

class MyStream extends Readable {
    _read() {
        const content = process.argv[2]
        this.push(content)
        this.push(null)
    }
}

const mystream = new MyStream()
mystream.pipe(process.stdout)
