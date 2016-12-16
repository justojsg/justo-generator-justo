//imports
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
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

    test("Embedded project with packagejson set to true", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: true});

      file(DST, "package.json").must.exist();
      file(DST, "Justo.js").must.exist();
    });

    test("Embedded with packagejson set to false", function() {
      gen.generate({desc: "This is the description", author: "This is the author name", packagejson: false});

      file(DST, "package.json").must.not.exist();
      file(DST, "Justo.js").must.exist();
    });
  });
})();
