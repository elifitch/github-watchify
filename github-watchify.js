'use strict';
function Watchify(options) {
  let request = require('request');
  
  let self = this;
  self.token = options.token;
  self.userAgent = options.userAgent;

  return {
    watch: watch
  }

  function watch() {

    request.get({
      url:'https://api.github.com/repos/Fyrd/caniuse', 
      headers: {
        'User-Agent': self.userAgent,
        'Authorization': 'token ' + self.token
      }
    }, function(err, response, body) {
      if(err) { console.log(err); return; }
      console.log('Get response: ' + response.statusCode);
      console.log(body);
      console.log('--------------------------------');
      console.log(response.headers);
    });
  }

};

module.exports = Watchify;