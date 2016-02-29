'use strict';

let watchify = require('./github-watchify');
let env = require('dotenv').config();

watchify.authenticate(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  process.env.GITHUB_USER, 
  process.env.GITHUB_TOKEN
);