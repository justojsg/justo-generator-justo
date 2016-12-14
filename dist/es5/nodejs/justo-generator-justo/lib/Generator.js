"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(
















































    answers) {
      if (this.select("type") == "Standalone") {
        this.responses.packagejson = true;
        this.list("linter");
      }

      if (this.confirm("packagejson")) {
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
        this.input("gitUrl");
        this.input("bugsHomepage");
        this.input("bugsEmail");
      }
    } }, { key: "pregenerate", value: function pregenerate(




    answers) {
      if (answers.type == "Standalone") {
        var entries = this.getEntryNames(".").sort();

        if (!(entries.length === 0 ||
        entries.length == 1 && entries[0] == ".git" ||
        entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md"))
        {
          return "Destination dir is not empty.";
        }
      }
    } }, { key: "generate", value: function generate(




    answers) {
      if (answers.packagejson) this.template("_package.json", "package.json", answers);

      if (answers.type == "Standalone") {
        this.copy("_editorconfig", ".editorconfig");
        this.copy("_gitignore", ".gitignore");
        this.copy("_travis.yml", ".travis.yml");
        this.copy("index.js");
        this.template("README.md", answers);

        if (answers.linter == "JSHint") this.copy("_jshintrc", ".jshintrc");else
        if (answers.linter == "ESLint") this.copy("_eslintrc", ".eslintrc");

        this.mkdir("lib");
      }

      this.template("Justo.js", answers);
    } }, { key: "desc", get: function get() {return "Generate the files of a Justo.js project.";} }, { key: "params", get: function get() {return { author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", bugsHomepage: "Bugs homepage", bugsEmail: "Bugs email", contributor: "Contributor name", contributorEmail: "Contributor email", contributorHomepage: "Contributor homepage", desc: "Project description", gitUrl: "Git repository URL", homepage: "Project homepage", linter: { title: "Code linter", options: ["<none>", "ESLint", "JSHint"], default: "ESLint" }, packagejson: { title: "Generate the package.json file?", type: "Boolean" }, type: { title: "Project type", options: ["Standalone", "Embedded"], default: "Standalone" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;