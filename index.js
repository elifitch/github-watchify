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
// targetUser: 'elifitch',
// targetRepo: 'wonderful-world-of-webgl'
watcher.watch({
  targetUser: 'elifitch',
  targetRepo: 'wonderful-world-of-webgl',
  interval: 10000,
  onCommit: function(arg1, arg2, arg3) {
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
  }
});