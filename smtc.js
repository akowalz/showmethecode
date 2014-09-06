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

$(function() {
  promise = (githubAPI.tree(githubPage.user,
                            githubPage.repo,
                            githubPage.sha));
  promise.success(function (data) {
    var name, size, filesInDir, treeObj, treeData;
    treeData = data.tree

    githubPage.filesAndDirectories.map(
      function() {
        name  = $(this).find('.js-directory-link').html();
        treeObj = treeData.filter(function(file) { return file.path === name; })[0]

        if (treeObj && treeObj.type === 'blob') {
          size = treeObj.size
        } else {
          size = sizeOfDirectory(name, treeData);
        }

        $(this).append('<td><span class="smtc-size">' +
                       prettySize(size) +
                       'b</span><td>');
      });
    });

  function sizeOfDirectory(name, tree) {
    var files = tree.filter(function(file) {
      dir = file.path.split('/')[githubPage.currentDepth];
      return dir === name;
    });
    var size = 0
    for(var i=0;i<files.length;i++) {
      if (files[i].size) {
        size = size + files[i].size;
      }
    }
    return size;
  }

  // TODO
  function prettySize(size) { return size; }
});
