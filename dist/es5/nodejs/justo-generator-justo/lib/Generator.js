"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "init", value: function init() 










































    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "preprompt", value: function preprompt() 





    {} }, { key: "prompt", value: function prompt(






    answers) {
      if (this.confirm("standalone") && !this.responses.hasOwnProperty("packagejson")) this.responses.packagejson = true;
      if (this.confirm("packagejson")) {
        this.input("desc");
        this.input("homepage");
        if (this.input("author")) {
          this.input("authorEmail");
          this.input("authorHomepage");}

        if (this.input("contributor")) {
          this.input("contributorEmail");
          this.input("contributorHomepage");}

        this.input("gitUrl");
        this.input("bugsHomepage");
        this.input("bugsEmail");}} }, { key: "pregenerate", value: function pregenerate(






    answers) {
      if (answers.standalone) {
        var entries = this.getEntryNames(".").sort();

        if (!(entries.length === 0 || 
        entries.length == 1 && entries[0] == ".git" || 
        entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")) 
        {
          return "Destination dir is not empty.";}}} }, { key: "generate", value: function generate(







    answers) {
      this.copyIf(answers.standalone, "_editorconfig", ".editorconfig");
      this.copyIf(answers.standalone, "_gitignore", ".gitignore");
      this.copyIf(answers.standalone, "_jshintrc", ".jshintrc");
      this.templateIf(answers.packagejson, "_package.json", "package.json", answers);
      this.copyIf(answers.standalone, "_travis.yml", ".travis.yml");
      this.copyIf(answers.standalone, "index.js");
      this.template("Justo.js", answers);
      this.copy("Justo.json");
      this.templateIf(answers.standalone, "README.md", answers);} }, { key: "desc", get: function get() {return "Generate the files of a Justo.js project.";} }, { key: "params", get: function get() {return { standalone: { title: "Standalone?", type: "Boolean" }, desc: "Project description", homepage: "Project homepage", author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", contributor: "Contributor name", contributorEmail: "Contributor email", contributorHomepage: "Contributor homepage", gitUrl: "Git repository URL", bugsHomepage: "Bugs homepage", bugsEmail: "Bugs email", packagejson: { title: "Generate the package.json file?", type: "Boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;