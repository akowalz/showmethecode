var githubPage = (function() {
  return {
    user: window.location.pathname.split('/')[1],

    repo: window.location.pathname.split('/')[2],

    sha: (function() {
      var shaLink = $('.sha-block').parent().find('a').attr('href').split('/')
      return shaLink[shaLink.length - 1];
    })(),

    filesAndDirectories: $('.files tr'),

    // TODO
    currentDepth: 0
  };
})();

var githubAPI = (function() {
  var accessToken = '7c57cefa8bfaba6b6ea288314b70e8efa612626d'
  var apiURL = 'https://api.github.com'

  return {
    tree: function(owner,repo,sha) {
      return $.ajax(
        {
          url: apiURL + '/repos/' + owner + '/' + repo + '/git/trees/' + sha,
          data: {
                  'recursive': 1
                  //'access_token': accessToken
                }
        }
      );
    }
  };
})();
