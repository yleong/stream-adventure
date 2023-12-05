'use strict'

const combine = require('stream-combiner')
const split = require('split2')
const through = require('through2')
const zlib = require('zlib')

module.exports = function () {
    let genre = {}
    genre.books = []
    return combine(
        split(),
        through(function (line, _, next){
            let curr = JSON.parse(line)
            if (curr.type == "genre") {
                if (genre.name != null) {
                    this.push(JSON.stringify(genre))
                    genre = {}
                    genre.books = []
                }
                genre.name = curr.name
            } else if (curr.type == "book") {
                genre.books.push(curr.name)
            }
            next()
        }),
        zlib.createGzip()
    )
}

