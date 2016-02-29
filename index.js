'use strict';

// let watchify = require('./github-watchify');
// let env = require('dotenv').config();

// watchify.authenticate(
//   process.env.GITHUB_TOKEN
// );

let Watchify = require('./github-watchify');
let env = require('dotenv').config();

let watcher = new Watchify({
    userAgent: 'github-watchify',
    token: process.env.GITHUB_TOKEN
})

watcher.watch('this string represents the repo', 2000);