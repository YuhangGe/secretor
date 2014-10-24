var through2 = require('through2');

function encode(key, input_stream, output_stream) {
    if(typeof key !== 'string' || key.length === 0) {
        console.error('key must not be empty');
        return;
    }
    var keyBuf = new Buffer(key);
    var idx = 0, c = 0, k = 0, s = 0, r = 0;
    var filter = through2(function (chunk, enc, callback) {
        for (var i = 0; i < chunk.length; i++) {
            k = keyBuf[idx++];
            c = chunk[i];
            s = k % 8;

            c = c ^ k;

            r = (c << (8 - s)) & 0xff;
            c = c >>> s;

            c = c | r;

            chunk[i] = c;
            if(idx === keyBuf.length) {
                idx = 0;
            }
        }
        this.push(chunk);
        callback()
    });
    input_stream.pipe(filter).pipe(output_stream);
}

function decode(key, input_stream, output_stream) {
    if(typeof key !== 'string' || key.length === 0) {
        console.error('key must not be empty');
        return;
    }
    var keyBuf = new Buffer(key);
    var idx = 0, c = 0, k = 0, s = 0, r = 0;
    var filter = through2(function (chunk, enc, callback) {
        for (var i = 0; i < chunk.length; i++) {
            k = keyBuf[idx++];
            c = chunk[i];
            s = k % 8;

            r = c >>> (8 - s);
            c = (c << s) & 0xff;

            c = r | c;

            c = c ^ k;

            chunk[i] = c;
            if(idx === keyBuf.length) {
                idx = 0;
            }
        }
        this.push(chunk);
        callback()
    });
    input_stream.pipe(filter).pipe(output_stream);
}

module.exports.encode = encode;
module.exports.decode = decode;