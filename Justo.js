//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const eslint = require("justo-plugin-eslint");
const npm = require("justo-plugin-npm");

//catalog
const jslint = catalog.simple({
  name: "lint",
  desc: "Parse source code.",
  task: eslint,
  params: {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  }
});

catalog.workflow({name: "build", desc: "Build the package"}, function() {
  jslint("Best practices and grammar (JavaScript)");

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

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-generator-justo/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-generator-justo/lib"
    },
    {
      src: ["package.json", "README.md", "template/"],
      dst: "dist/es5/nodejs/justo-generator-justo/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.simple({
  name: "publish",
  desc: "NPM publish.",
  task: npm.publish,
  params: {
    who: "justojs",
    src: "dist/es5/nodejs/justo-generator-justo"
  }
});

catalog.simple({
  name: "install",
  desc: "Install the generator to test.",
  title: "Install generator globally",
  task: npm.install,
  params: {
    pkg: "dist/es5/nodejs/justo-generator-justo/",
    global: true
  }
});

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
