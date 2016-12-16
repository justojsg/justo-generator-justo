"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(







































    answers) {
      if (this.confirm("packagejson")) {
        this.input("name");
        this.input("desc");
        this.input("homepage");
        if (this.input("author")) {
          this.input("authorEmail");
          this.input("authorHomepage");
        }
        if (this.input("contributor")) {
          this.input("contributorEmail");
          this.input("contributorHomepage");
        }
      }
    } }, { key: "generate", value: function generate(




    answers) {
      if (answers.packagejson) this.template("_package-embedded.json", "package.json", answers);
      this.template("Justo-embedded.js", "Justo.js", answers);
    } }, { key: "desc", get: function get() {return "Generate and embed the Justo files into a current project.";} }, { key: "params", get: function get() {return { author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", contributor: "Contributor name", contributorEmail: "Contributor email", contributorHomepage: "Contributor homepage", desc: "Project description", homepage: "Project homepage", name: { title: "Name", default: _path2.default.basename(process.cwd()) }, packagejson: { title: "Generate the package.json file?", type: "Boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;