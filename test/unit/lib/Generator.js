//imports
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-justo").default;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-justo/template", dst: DST}, {});
    });

    fin("*", function() {
      DST_DIR.remove();
    });

    suite("Standalone project", function() {
      suite("JS linter", function() {
        test("ESLint", function() {
          gen.generate({desc: "This is the desc.", author: "This is the author", type: "Standalone", packagejson: true, linter: "ESLint"});

          file(DST, ".editorconfig").must.exist();
          file(DST, ".eslintrc").must.exist();
          file(DST, ".jshintrc").must.not.exist();
          file(DST, ".gitignore").must.exist();
          file(DST, ".travis.yml").must.exist();
          file(DST, "index.js").must.exist();
          file(DST, "Justo.js").must.exist();
          file(DST, "Justo.js").must.contain("justo-plugin-eslint");
          file(DST, "Justo.js").must.not.contain("justo-plugin-jshint");
          file(DST, "package.json").must.exist();
          file(DST, "package.json").must.contain("justo-plugin-eslint");
          file(DST, "package.json").must.not.contain("justo-plugin-jshint");
          file(DST, "README.md").must.exist();
          dir(DST, "lib").must.exist();
        });

        test("JSHint", function() {
          gen.generate({desc: "This is the desc.", author: "This is the author", type: "Standalone", packagejson: true, linter: "JSHint"});

          file(DST, ".editorconfig").must.exist();
          file(DST, ".eslintrc").must.not.exist();
          file(DST, ".jshintrc").must.exist();
          file(DST, ".gitignore").must.exist();
          file(DST, ".travis.yml").must.exist();
          file(DST, "index.js").must.exist();
          file(DST, "Justo.js").must.exist();
          file(DST, "Justo.js").must.not.contain("justo-plugin-eslint");
          file(DST, "Justo.js").must.contain("justo-plugin-jshint");
          file(DST, "package.json").must.exist();
          file(DST, "package.json").must.not.contain("justo-plugin-eslint");
          file(DST, "package.json").must.contain("justo-plugin-jshint");
          file(DST, "README.md").must.exist();
          dir(DST, "lib").must.exist();
        });
      });
    });

    suite("Embedded project", function() {
      test("Embedded project with packagejson set to true", function() {
        gen.generate({desc: "This is the description", author: "This is the author name", type: "Embedded", packagejson: true});

        file(DST, ".editorconfig").must.not.exist();
        file(DST, ".gitignore").must.not.exist();
        file(DST, "package.json").must.exist();
        file(DST, ".travis.yml").must.not.exist();
        file(DST, "index.js").must.not.exist();
        file(DST, "Justo.js").must.exist();
        file(DST, "README.md").must.not.exist();
        dir(DST, "lib").must.not.exist();
      });

      test("Embedded with packagejson set to false", function() {
        gen.generate({desc: "This is the description", author: "This is the author name", type: "Embedded", packagejson: false});

        file(DST, ".editorconfig").must.not.exist();
        file(DST, ".gitignore").must.not.exist();
        file(DST, "package.json").must.not.exist();
        file(DST, ".travis.yml").must.not.exist();
        file(DST, "index.js").must.not.exist();
        file(DST, "Justo.js").must.exist();
        file(DST, "Justp.js").must.not.contain(["justo-plugin-eslint", "justo-plugin-jshint", "lint"]);
        file(DST, "README.md").must.not.exist();
        dir(DST, "lib").must.not.exist();
      });
    });
  });
})();
