//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-justo");
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
      gen = new Generator({src: "dist/es5/nodejs/justo-generator-justo/template", dst: DST}, {});
    });

    fin("*", function() {
      DST_DIR.remove();
    });

    test("generate(answers) - packagejson not specified", function() {
      gen.generate({desc: "This is the description", author: "This is the author name"});

      file(DST, "package.json").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
    });

    test("generate(answers) - packagejson:true", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: true});

      file(DST, "package.json").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
    });

    test("generate(answers) - packagejson:false", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: false});

      file(DST, "package.json").must.not.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
    });
  });
})();
