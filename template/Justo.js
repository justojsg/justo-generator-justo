//imports
const justo = require("justo");
const catalog = justo.catalog;
{{#if scope.standalone}}
const jshint = require("justo-plugin-jshint");
{{/if}}

//catalog
{{#if scope.standalone}}
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  jshint("Best practices and grammar", {
    output: true,
    src: ["index.js", "Justo.js"]
  });
});
{{/if}}

catalog.macro({name: "default", desc: "Default task."}, [{{#if scope.standalone}}"build"{{/if}}]);
