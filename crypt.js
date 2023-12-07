'use strict'

const crypto = require('crypto')

const passphrase = process.argv[2]
const iv = process.argv[3]

const stream = crypto.createDecipheriv('aes-256-cbc', passphrase, iv);
stream.pipe(process.stdout)
process.stdin.pipe(stream)
