//imports
const suite = require("justo").suite;
const test = require("justo").test;
const Generator = require("../../dist/es5/nodejs/justo-generator-justo");

//suite
suite("index", function() {
  test("Generator", function() {
    Generator.must.be.instanceOf(Function);
  });
})();
