'use strict'

const through = require('through2')
const split2 = require('split2')
const stream = through(transform)

let upperCase = false
function transform(line, encoding, next) {
    let output = line.toString().toLowerCase()
    if (upperCase) {
        output = output.toUpperCase()
    } 
    upperCase = !upperCase
    console.log(output)
    next()
}

process.stdin.pipe(split2()).pipe(stream)
