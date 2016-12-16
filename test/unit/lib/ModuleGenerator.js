//imports
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-justo")["module"];

//suite
suite.only("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init({name: "*", title: "Create tmp dir and generator"}, function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-justo/template", dst: DST}, {});
    });

    fin({name: "*", title: "Delete tmp dir"}, function() {
      DST_DIR.remove();
    });

    suite("JS linter", function() {
      test("ESLint", function() {
        gen.generate({desc: "This is the desc.", author: "This is the author", linter: "ESLint"});

        file(DST, ".editorconfig").must.exist();
        file(DST, ".eslintrc").must.exist();
        file(DST, ".jshintrc").must.not.exist();
        file(DST, ".gitignore").must.exist();
        file(DST, ".travis.yml").must.exist();
        file(DST, "index.js").must.exist();
        file(DST, "Justo.dev.js").must.exist();
        file(DST, "Justo.dev.js").must.contain("justo-plugin-eslint");
        file(DST, "Justo.dev.js").must.not.contain("justo-plugin-jshint");
        file(DST, "Justo.js").must.exist();
        file(DST, "package.json").must.exist();
        file(DST, "package.json").must.contain("justo-plugin-eslint");
        file(DST, "package.json").must.not.contain("justo-plugin-jshint");
        file(DST, "README.md").must.exist();
        dir(DST, "lib").must.exist();
      });

      test("JSHint", function() {
        gen.generate({desc: "This is the desc.", author: "This is the author", linter: "JSHint"});

        file(DST, ".editorconfig").must.exist();
        file(DST, ".eslintrc").must.not.exist();
        file(DST, ".jshintrc").must.exist();
        file(DST, ".gitignore").must.exist();
        file(DST, ".travis.yml").must.exist();
        file(DST, "index.js").must.exist();
        file(DST, "Justo.dev.js").must.exist();
        file(DST, "Justo.dev.js").must.not.contain("justo-plugin-eslint");
        file(DST, "Justo.dev.js").must.contain("justo-plugin-jshint");
        file(DST, "Justo.js").must.exist();
        file(DST, "package.json").must.exist();
        file(DST, "package.json").must.not.contain("justo-plugin-eslint");
        file(DST, "package.json").must.contain("justo-plugin-jshint");
        file(DST, "README.md").must.exist();
        dir(DST, "lib").must.exist();
      });
    });
  });
})();
