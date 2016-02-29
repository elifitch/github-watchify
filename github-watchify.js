'use strict';
function Watchify(options) {
  let request = require('request');

  let self = this;
  self.token = options.token;
  self.userAgent = options.userAgent;

  return {
    watch: watch
  }

  function watch(repo, interval, callback) {
    //parse repo
    _registerMostRecent(repo);
    setInterval(function() {
      _pollRepo(repo);
    }, interval);
  }

  function _registerMostRecent(repo) {
    request.get({
      url:'https://api.github.com/repos/Fyrd/caniuse/commits?per_page=1', 
      headers: {
        'User-Agent': self.userAgent,
        'Authorization': 'token ' + self.token
      }
    }, function(err, response, body) {
      if(err) { console.log(err); return; }
      let data = JSON.parse(body);

      self.mostRecentCommit = data[0].sha;
    });
  }

  function _pollRepo(repo) {
    console.log('polling');
    console.log(self.mostRecentCommit);
  }

};

module.exports = Watchify;









// request.get({
//   url:'https://api.github.com/repos/Fyrd/caniuse/commits?per_page=1', 
//   headers: {
//     'User-Agent': self.userAgent,
//     'Authorization': 'token ' + self.token
//   }
// }, function(err, response, body) {
//   if(err) { console.log(err); return; }
//   console.log('Get response: ' + response.statusCode);
//   console.log(body);
//   console.log('--------------------------------');
//   console.log(response.headers);
// });