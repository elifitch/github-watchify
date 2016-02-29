'use strict';

let watchify = require('./github-watchify');
let env = require('dotenv').config();

watchify.authenticate(
  process.env.GITHUB_TOKEN
);