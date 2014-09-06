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
