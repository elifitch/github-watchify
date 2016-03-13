'use strict';

const Watchify = require('./github-watchify');
const env = require('dotenv').config();

const watcher = new Watchify({
    userAgent: 'github-watchify',
    token: process.env.GITHUB_TOKEN
});

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