'use strict';

// let watchify = require('./github-watchify');
// let env = require('dotenv').config();

// watchify.authenticate(
//   process.env.GITHUB_TOKEN
// );

const Watchify = require('./github-watchify');
let env = require('dotenv').config();

const watcher = new Watchify({
    userAgent: 'github-watchify',
    token: process.env.GITHUB_TOKEN
});
// targetUser: 'elifitch',
// targetRepo: 'wonderful-world-of-webgl'
watcher.watch({
  targetUser: 'elifitch',
  targetRepo: 'test-repo',
  interval: 10000,
  onCommit: function(commit, changedFiles) {
    console.log(changedFiles);
  },
  onPing: function(commitSha) {
    console.log(commitSha);
  }
});