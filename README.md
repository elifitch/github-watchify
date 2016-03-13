# Github-Watchify
Github-watchify is a node module that will poll a github repo and notify you of any changed files.  Think of it as a post-commit webhook for repos you don't own.

## Installation
`npm install --save github-watchify`

##Authentication
The library requires the use of personal access tokens for github because it completely removes the need for github passwords to be stored, even in environment vars.  Learn more about creating personal access tokens [here](https://github.com/blog/1509-personal-api-tokens).

## Usage
First things first, require the module and create a new instance.  When creating a watcher, you'll have to supply a user agent string, which github [requires](https://developer.github.com/v3/#user-agent-required) for all API calls, as well as the token mentioned in the Authentication section.

```javascript
const Watchify = require('./github-watchify');

const watcher = new Watchify({
    userAgent: 'github-watchify', //unique user agent string required by github
    token: process.env.GITHUB_TOKEN
});
```

Then we can have some fun.  Here I'm polling `http://github.com/elifitch/test-repo` for changes every 10 seconds.  There's an `onPing` function that executes every time the watcher checks the repo for any new commits and supplies the latest commit sha as an argument.  The fun happens in the `onCommit` function which executes every time the watcher detects a new commit.  The function provides a [commit comparison](https://developer.github.com/v3/repos/commits/#compare-two-commits), as well as a list of all the files that were changed in the commit.
```javascript
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
```


#~Party Time~ ᕕ( ᐛ )ᕗ
