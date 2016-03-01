'use strict';

function Watchify(options) {
  let request = require('request');

  let self = this;
  self.token = options.token;
  self.userAgent = options.userAgent;

  return {
    watch: watch
  }

  function watch(params) {
    let currentCommit = '';
    const repo = params.targetUser + '/' + params.targetRepo;
    const interval = params.interval;
    const onCommit = params.onCommit;
    
    //ping first, then set the interval
    _pingRepo(repo, currentCommit, onCommit).then(function(mostRecentCommit) {
      currentCommit = mostRecentCommit;
    });
    setInterval(function() {
      _pingRepo(repo, currentCommit, onCommit).then(function(mostRecentCommit) {
        if(currentCommit !== mostRecentCommit) {
          _compareCommits(repo, currentCommit, mostRecentCommit, onCommit);
          currentCommit = mostRecentCommit;
        }
      });
    }, interval);
  }

  function _pingRepo(repo, currentCommit, onCommit) {
    return new Promise(function(resolve, reject) {
      request.get({
        url:'https://api.github.com/repos/' + repo + '/commits?per_page=2', 
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
        let changedFiles;

        console.log(data[0].sha);
        resolve(data[0].sha);
      });
    })
  }

  function _compareCommits(repo, base, head, onCommit) {
    request.get({
      url:'https://api.github.com/repos/' + repo + '/compare/'+base+'...'+head, 
      // url: 'https://api.github.com/repos/Fyrd/caniuse/compare/734fe7198f6e294e293c27669eaf8cdec835b219...be9c49dc039c8db44efff3f12a6bf724540f20b1',
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
      let listOfChangedFiles = data.files;

      onCommit(listOfChangedFiles);
    })
  }

};

module.exports = Watchify;