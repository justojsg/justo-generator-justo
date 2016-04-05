//imports
const suite = require("justo").suite;
const test = require("justo").test;
const pkg = require("../../dist/es5/nodejs/justo-generator-justo");

//suite
suite("index", function() {
  test("default", function() {
    pkg.default.must.be.instanceOf(Function);
  });

  test("add suite", function() {
    pkg["add suite"].must.be.instanceOf(Function);
  });
})();
