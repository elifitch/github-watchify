'use strict';
module.exports = (function() {

  // let https = require('https');
  let request = require('request');

  return {
    authenticate: authenticate
  }

  function authenticate(clientID, clientSecret, user, token) {
    // const params = {
    //   scopes: ['public_repo'],
    //   note:'test2',
    //   client_id: clientID,
    //   client_secret: clientSecret
    // };

    // request.post({
    //   url:'https://api.github.com/authorizations', 
    //   qs:params,
    //   headers: {
    //     'User-Agent': 'github-watchify-test'
    //   },
    //   'auth': {
    //     'user': user,
    //     'pass': token
    //   }
    // }, function(err, response, body) {
    //   if(err) { console.log(err); return; }
    //   console.log('Get response: ' + response.statusCode);
    //   console.log(body);
    // });

    request.get({
      url:'https://api.github.com/repos/Fyrd/caniuse', 
      headers: {
        'User-Agent': 'github-watchify-test',
        'Authorization': 'token '+token
      }
    }, function(err, response, body) {
      if(err) { console.log(err); return; }
      console.log('Get response: ' + response.statusCode);
      console.log(body);
      console.log('--------------------------------');
      console.log(response.headers);
    });
  }

  // https.get({
  //     host: 'api.github.com',
  //     path: '/users/elifitch/repos',
  //     method: 'GET',
  //     headers: { 'User-Agent': 'github-watchify' }
  //   }, function(response) {
  //     let body;
  //     response.on('data', function(d) {
  //       body += d;
  //     });
  //     response.on('end', function() {
  //       console.log('initial req done');
  //       console.log(process.env.GITHUB_USER);
  //       // console.log(JSON.stringify(response.headers));
  //       // console.log(body);
  //       // getRateLimit();
  //     });
  // });

  // function getRateLimit() {
  //   console.log('getting rate limit')
  //   https.get({
  //     host: 'api.github.com/',
  //     path: '/rate_limit',
  //     method: 'GET',
  //     headers: { 'User-Agent': 'github-watchify' }
  //   }, function(response) {
  //     let body;
  //     response.on('data', function(d) {
  //       body += d;
  //     });
  //     response.on('end', function() {
  //       // console.log(body);
  //     });
  //   });
    
  // }
})();

// module.exports = watchify;