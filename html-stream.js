'use strict'

const trumpet = require('trumpet')
const through2 = require('through2')
const fs = require('fs')

const tr = trumpet()
process.stdin.pipe(tr)
tr.pipe(process.stdout)

const stream = tr.select('.loud').createStream()

let finalstr = ""
stream.on('data', (chunk) => {
    finalstr += chunk.toString().toUpperCase()
})
stream.on('end', () => {
    stream.write(finalstr)
    stream.end()
})
