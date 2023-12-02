'use strict'

const duplexer2 = require('duplexer2')
const { Writable } = require('stream');

module.exports = function (counter) {
    let occurrences = {}

    // Custom Writable stream in object mode
    const myWritableStream = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            // Handle the written chunk
            let cc = chunk.country
            if (occurrences.hasOwnProperty(cc)) {
                occurrences[cc] += 1
            } else {
                occurrences[cc] = 1
            }
            callback();
        },
    });
    myWritableStream.on('finish', () => {
        counter.setCounts(occurrences)
    });

    return duplexer2({objectMode: true}, myWritableStream, counter)
}
