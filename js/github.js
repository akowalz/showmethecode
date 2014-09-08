var utils = (function() {
  return { location: function()
    { return window.location; }
  };
})()

var githubPage = (function() {
  return {
    user: function() {
      return utils.location().pathname.split('/')[1];
    },

    repo: function() {
      return utils.location().pathname.split('/')[2];
    },

    sha: function() {
      var shaLink = $('.sha-block').parent().find('a').attr('href').split('/');
      return shaLink[shaLink.length - 1];
    },

    filesAndDirectories: function() {
      return $('.files tr');
    },

    currentDepth: function() {
      var uri = utils.location().pathname.split('/');
      if (uri.length === 3) { return 0; }
      else { return uri.length - 5; }
    },

    currentPath: function() {
      return utils.location().pathname.split('/').slice(5).join('/');
    }
  };
})();

var githubAPI = (function() {
  var apiURL = 'https://api.github.com'

  return {
    tree: function(owner,repo,sha) {
      return $.ajax(
        {
          url: apiURL +
               '/repos/' +
               owner +
               '/' + repo + '/git/trees/'
               + sha,
          data: {
                  'recursive': 1
                }
        }
      );
    }
  };
})();
