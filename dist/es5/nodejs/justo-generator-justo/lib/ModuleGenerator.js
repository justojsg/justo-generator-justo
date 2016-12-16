"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(




























































    answers) {
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
      this.input("npmWho");
      if (this.input("gitUrl")) {
        var re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
        this.input({ name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1] });
        this.input({ name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1] });
      }
      this.input("bugsHomepage");
      this.input("bugsEmail");
      this.select("linter");
      this.multiselect("dependencies");
    } }, { key: "pregenerate", value: function pregenerate(




    answers) {
      var entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 ||
      entries.length == 1 && entries[0] == ".git" ||
      entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md"))
      {
        return "Destination dir is not empty.";
      }
    } }, { key: "generate", value: function generate(




    answers) {
      this.copy("_editorconfig", ".editorconfig");
      if (answers.linter == "JSHint") this.copy("_jshintrc", ".jshintrc");else
      if (answers.linter == "ESLint") this.copy("_eslintrc", ".eslintrc");
      this.copy("_gitignore", ".gitignore");
      this.template("_package-module.json", "package.json", answers);
      this.copy("_travis.yml", ".travis.yml");
      this.copy("index.js");
      this.template("Justo.dev.js", answers);
      this.template("Justo-module.js", "Justo.js", answers);
      this.template("README.md", answers);
      this.mkdir("dist");
      this.mkdir("lib");
    } }, { key: "desc", get: function get() {return "Generate the scaffold for a Justo module.";} }, { key: "params", get: function get() {return { author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", bugsHomepage: "Bugs homepage", bugsEmail: "Bugs email", contributor: "Contributor name", contributorEmail: "Contributor email", contributorHomepage: "Contributor homepage", davidDm: "David DM", desc: "Project description", gitUrl: "Git repository URL", homepage: "Project homepage", linter: { title: "Code linter", options: ["<none>", "ESLint", "JSHint"], default: "ESLint" }, name: { title: "Name", default: _path2.default.basename(process.cwd()) }, dependencies: { title: "Dependencies", options: ["getos", "justo-plugin-apt", "justo-plugin-cli", "justo-plugin-download", "justo-plugin-handlebars", "justo-plugin-tar", "justo-plugin-unzip", "justo-plugin-zip", "justo-sync"] }, npmWho: "NPM user to use for publishing", travisCi: "Travis CI" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;