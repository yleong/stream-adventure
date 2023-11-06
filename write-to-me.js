'use strict'
const { Writable } = require('stream')

const myWritable = new Writable({
    write(chunk, encoding, callback) {
        console.log("writing: " + chunk)
        callback(null)
    }
})

process.stdin.pipe(myWritable)
