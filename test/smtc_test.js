describe("show me the code", function() {

  describe("sizeOfdirectory", function() {
    beforeEach(function() {
      // page spies
      spyOn(githubPage, "user").andReturn('a_user');
      spyOn(githubPage, "repo").andReturn('a_repo');
      spyOn(githubPage, "sha").andReturn('a_sha');
      spyOn(githubPage, "currentDepth").andReturn(0)
      spyOn(githubAPI, "tree").andReturn(
        { success:
            function() {
              return { tree: [] };
            }
          });
    });

    it("calculates size of a directory", function() {
      var tree = [
        { size: 10, path: 'dir/file1' },
        { size: 20, path: 'dir/file2' },
      ]
      expect(sizeOfDirectory('dir',tree)).toEqual(30);
    });

    it("calcules the size of a nested directory", function() {
      var tree = [
        { size: 10, path: 'dir/dir2/file1' },
        { size: 20, path: 'dir/dir3/file2' },
        { size: 50, path: 'dir/dir2/dir5/file3' },
        { size: 20, path: 'file1' }
      ]
      expect(sizeOfDirectory('dir/dir2', tree)).toEqual(60);
    });

    it("doesn't catch nested directories of the same name", function() {
      var tree = [
        { size: 1, path: 'wrong/right' },
        { size: 1, path: 'right/right' }
      ]
      expect(sizeOfDirectory('right/right',tree)).toEqual(1);
    });
  });

  describe("githubPage", function() {
    describe("currentDepth", function() {
      var path;

      it("returns 0 for the root", function(){
        path = "/user/repo";
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentDepth()).toEqual(0);
      });

      it("returns 1 for a nested directory", function(){
        path = "/user/repo/master/tree/dirname";
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentDepth()).toEqual(1);
      });

      it("returns 1 for a nested directory", function(){
        path = "/user/repo/master/tree/dirname/dirname2";
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentDepth()).toEqual(2);
      });
    });

    describe("currentPath", function() {
      var path;

      it("returns empty string for the root", function(){
        path = "/user/repo"
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentPath()).toEqual('');
      })

      it("returns the nested path for one level", function() {
        path ="/user/repo/master/tree/dirname";
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentPath()).toEqual("dirname");
      });

      it("returns the nested path for two levels", function() {
        path ="/user/repo/master/tree/dirname/dirname2";
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.currentPath()).toEqual("dirname/dirname2");
      });
    });

    describe("user", function() {
      var path;
      it("returns the current user based on the path", function(){
        path = "/foo/repo"
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.user()).toEqual('foo');
      });
    });

    describe("repo", function() {
      var path;
      it("returns the current user based on the path", function(){
        path = "/user/bar"
        spyOn(utils, "location").andReturn({ pathname: path });
        expect(githubPage.repo()).toEqual('bar');
      });
    });
  });
});
