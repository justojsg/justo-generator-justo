//imports
const path = require("path");
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

    test("generate(answers) - standalone project", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", standalone: true, packagejson: "true"});

      file(DST, ".editorconfig").must.exist();
      file(DST, ".gitignore").must.exist();
      file(DST, ".jshintrc").must.exist();
      file(DST, "package.json").must.exist();
      file(DST, ".travis.yml").must.exist();
      file(DST, "index.js").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
      file(DST, "README.md").must.exist();
    });

    test("generate(answers) - embedded with packagejson = true", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: "true"});

      file(DST, "package.json").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
    });

    test("generate(answers) - embedded with packagejson = false", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: "false"});

      file(DST, "package.json").must.not.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
    });
  });
})();
