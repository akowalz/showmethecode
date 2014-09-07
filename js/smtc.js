$(function() {
  githubData = githubAPI.tree(githubPage.user(),
                           githubPage.repo(),
                           githubPage.sha());

  githubData.success(function (data) {
    var name, size, filesInDir, fileObj, tree;
    tree = data.tree

    githubPage.filesAndDirectories().map(
      function() {
        name  = $(this).find('.js-directory-link').html();
        fileObj = tree.filter(
          function(file) {
            return file.path === githubPage.currentPath() + '/' + name;
        })[0]

        if (fileObj && fileObj.type === 'blob') {
          size = fileObj.size
        } else {
          size = sizeOfDirectory(githubPage.currentPath() + name,
                                 tree);
        }
        $(this).append('<td><span class="smtc-size">' +
                       prettySize(size) +
                       '</span><td>');
      });
    });
});

function sizeOfDirectory(path, tree) {
  var files = tree.filter(function(file) {
    var filePath = file.path;
    var searchPath = path;

    return filePath.slice(0, searchPath.length) === searchPath;
  });
  var size = 0;
  for(var i=0;i<files.length;i++) {
    if (files[i].size) {
      size += files[i].size;
    }
  }
  return size;
}

// TODO
function prettySize(size){
  if ( size === 0 ) return '';
  else return size + 'B';
}
