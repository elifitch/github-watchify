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
    _registerMostRecent(repo).then(function(currentCommit) {
      self.currentCommit = currentCommit;

      setInterval(function() {
        _pollRepo(repo, currentCommit);
      }, interval);
    });
  }

  function _registerMostRecent(repo) {
    return new Promise(function(resolve, reject) {
      request.get({
        url:'https://api.github.com/repos/Fyrd/caniuse/commits?per_page=1', 
        headers: {
          'User-Agent': self.userAgent,
          'Authorization': 'token ' + self.token
        }
      }, function(err, response, body) {
        if(err) {
          console.log(err);
          reject(err);
        }
        let data = JSON.parse(body);

        resolve(data[0].sha);
      });
    })
  }

  function _pollRepo(repo, currentCommit) {
    console.log('polling');
    console.log(self.currentCommit);

    request.get({
        url:'https://api.github.com/repos/Fyrd/caniuse/commits?per_page=1', 
        headers: {
          'User-Agent': self.userAgent,
          'Authorization': 'token ' + self.token
        }
      }, function(err, response, body) {
        if(err) {
          console.log(err);
          return;
        }
        let data = JSON.parse(body);
        if (data[0].sha === currentCommit) {
          //nothing has changed
        } else {
          //there's a new commit!  Do something!
          //https://api.github.com/repos/Fyrd/caniuse/compare/734fe7198f6e294e293c27669eaf8cdec835b219...be9c49dc039c8db44efff3f12a6bf724540f20b1
          //https://api.github.com/repos/Fyrd/caniuse/compare/currentCommit...data[0].sha
        }
      });
  }

};

module.exports = Watchify;