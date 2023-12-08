'use strict'

const crypto = require('crypto')
const tar = require('tar')
const concat = require('concat-stream')

const cipherName = process.argv[2]
const cipherKey = process.argv[3]
const cipherIv = process.argv[4]

const stream = crypto.createDecipheriv(cipherName, cipherKey, cipherIv)
const parser = new tar.Parse()
parser.on('entry', function (e) {
    if (e.type == 'Directory') { return e.resume() }
    const hash = crypto.createHash('md5', {encoding: 'hex'})
    e.pipe(hash).pipe(concat( data => {
        console.log(data + " " + e.path)
    }))
    return e.resume()
})
process.stdin.pipe(stream).pipe(parser)
