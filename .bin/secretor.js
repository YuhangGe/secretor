#!/usr/bin/env node
var fs = require('fs');
var _ = require('underscore');
var secret = require('../index.js');

var opt = require('yargs')
    .usage('Secret - Simple File Encoder and Decoder\nUsage: $0 [-e|-d] -k key {input file} [output file]')
    .demand(['k'])
    .alias('e', 'encode')
    .alias('d', 'decode')
    .alias('k', 'key')
    .describe('k', 'key to encode or decode file');

var argv = opt.argv;

if(argv._.length !== 2) {
    opt.showHelp();
    return;
}

var method = argv.decode ? 'decode' : 'encode';
var key = argv.key;

var is = fs.createReadStream(argv._[0]),
    os = fs.createWriteStream(argv._[1]);

secret[method](key, is, os);
