//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const npm = require("justo-plugin-npm");
{{#if (eq scope.linter "JSHint")}}
const jslinter = require("justo-plugin-jshint");
{{else if (eq scope.linter "ESLint")}}
const jslinter = require("justo-plugin-eslint");
{{/if}}

//catalog
{{#if (in scope.linter "ESLint" "JSHint")}}
const jslint = catalog.simple({
  name: "jslint",
  desc: "Parse best practices and grammar (JavaScript).",
  task: jslinter,
  params: {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "Justo.dev.js",
      "lib/",
    ]
  }
});

{{/if}}
catalog.workflow({name: "build", desc: "Build the package."}, function(params) {
  var newDist = false;

  //(1) params
  for (let param of params) {
    if (param == "new") newDist = true;
  }

  //(2) tasks
  {{#if (in scope.linter "ESLint" "JSHint")}}
  jslint("Best practices and grammar (JavaScript)");

  {{/if}}
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  if (newDist) {
    clean("Remove dist directory", {
      dirs: ["dist/es5"]
    });
  }

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/{{scope.name}}/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/{{scope.name}}/lib",
      force: true
    },
    {
      src: ["package.json", "README.md", "Justo.js"],
      dst: "dist/es5/nodejs/{{scope.name}}/"
    }
  );
});

catalog.simple({
  name: "publish",
  desc: "NPM publish.",
  task: npm.publish,
  params: {
    who: "{{scope.npmWho}}",
    src: "dist/es5/nodejs/{{scope.name}}"
  }
});

catalog.simple({
  name: "install",
  desc: "Install the module globally for testing.",
  task: npm.install,
  params: {
    pkg: "./dist/es5/nodejs/{{scope.name}}",
    global: true,
    output: false
  }
});

catalog.macro({name: "default", desc: "Build the Justo module."}, ["build"]);
