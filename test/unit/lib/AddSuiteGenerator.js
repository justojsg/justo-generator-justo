//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-justo")["add suite"];

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

    test("generate(answers)", function() {
      gen.generate({name: "MySuite", overwrite: true});
      file(gen.dst, "test/unit/lib/MySuite.js").must.exist();
    });
  });
})();
