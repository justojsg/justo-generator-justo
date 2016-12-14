//imports
const justo = require("justo");
const catalog = justo.catalog;
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
      "lib/",
    ]
  }
});

{{/if}}
{{#if (eq scope.type "Standalone")}}
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  {{#if (in scope.linter "ESLint" "JSHint")}}
  jslint("Best practices and grammar (JavaScript)");
  {{/if}}
});

{{/if}}
catalog.macro({name: "default", desc: "Default task."}, [{{#if scope.standalone}}"build"{{/if}}]);
